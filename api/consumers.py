
import os
import json
import asyncio
from google import genai
from google.genai import types
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from dotenv import load_dotenv
from .models import PersonalData, SkillCategory, Experience, Project, Achievement

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.chat = None
        self.client = genai.Client(api_key=GEMINI_API_KEY)

    async def connect(self):
        await self.accept()
        # Initialize chat session asynchronously
        await self.initialize_session()

    async def disconnect(self, close_code):
        pass

    async def initialize_session(self):
        try:
            context = await self.get_portfolio_context()
            system_prompt = f"""
            You are Jarvis, a highly advanced AI assistant for Aniket Verma.
            Your persona is professional, intelligent, and helpful, similar to J.A.R.V.I.S from Iron Man.
            You have access to Aniket's live portfolio data from the database.
            
            PORTFOLIO DATA:
            {context}

            INSTRUCTIONS:
            1. You are engaging in a live chat. Keep responses concise, engaging, and professional.
            2. Use the provided portfolio data to answer questions accurately.
            3. If a user asks about something not in the data, gently steer them back to Aniket's professional skills and experience.
            4. Do not hallucinatel; if you don't know, say you don't have that information.
            """
            
            # Use gemini-2.0-flash if available, otherwise gemini-1.5-flash. 
            # We'll use 2.0-flash as it is the latest generally available/experimental model suited for this.
            self.chat = self.client.chats.create(
                model='gemini-2.0-flash', 
                history=[
                    types.Content(
                        role="user", 
                        parts=[types.Part(text=system_prompt)]
                    ),
                    types.Content(
                        role="model", 
                        parts=[types.Part(text="Hello! I am Jarvis, Aniket's digital assistant. How can I help you learn more about his work today?")]
                    )
                ]
            )
        except Exception as e:
            print(f"Error initializing chat session: {e}")

    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            user_query = text_data_json.get('message')

            if not user_query:
                return

            if not self.chat:
                await self.initialize_session()

            # Send start signal
            await self.send(text_data=json.dumps({"type": "start"}))

            # Run the streaming generation in a separate thread to avoid blocking the event loop
            await self.stream_response(user_query)
            
            # Send end signal
            await self.send(text_data=json.dumps({"type": "end"}))

        except Exception as e:
            await self.send(text_data=json.dumps({
                'type': 'error',
                'error': str(e)
            }))

    async def stream_response(self, query):
        def _get_stream():
            # send_message_stream returns a generator in the new SDK
            return self.chat.send_message_stream(query)

        try:
            # We use sync_to_async because send_message_stream (in the sync client) is blocking/sync
            response_stream = await sync_to_async(_get_stream)()

            for chunk in response_stream:
                if chunk.text:
                    await self.send(text_data=json.dumps({
                        "type": "chunk",
                        "content": chunk.text
                    }))
                    # Small yield to let loop breathe if needed
                    await asyncio.sleep(0)
                    
        except Exception as e:
             await self.send(text_data=json.dumps({
                'type': 'error',
                'error': str(e)
            }))

    @sync_to_async
    def get_portfolio_context(self):
        personal_data = PersonalData.objects.first()
        
        # Serialize related data
        skills = []
        for category in SkillCategory.objects.all():
            skills.append({
                "category": category.name,
                "items": category.items
            })
            
        experiences = []
        for exp in Experience.objects.all():
            experiences.append({
                "company": exp.company,
                "role": exp.role,
                "period": exp.period,
                "description": exp.description,
                "achievements": exp.achievements
            })
            
        projects = []
        for proj in Project.objects.all():
            projects.append({
                "title": proj.title,
                "category": proj.category,
                "description": proj.description,
                "tech": proj.tech,
                "link": proj.link
            })
            
        achievements = []
        for ach in Achievement.objects.all():
            achievements.append({
                "label": ach.label,
                "metric": ach.metric,
                "description": ach.description
            })

        pd_dict = {
            "name": personal_data.name if personal_data else "Aniket Verma",
            "role": personal_data.role if personal_data else "N/A",
            "about": personal_data.about_description if personal_data else [],
            "mission": personal_data.mission if personal_data else "",
            "values": personal_data.about_values if personal_data else [],
            "contact": {
                "email": personal_data.email if personal_data else "",
                "linkedin": personal_data.linkedin if personal_data else "",
                "github": personal_data.github if personal_data else ""
            }
        } if personal_data else {}

        context_str = f"Personal Info: {json.dumps(pd_dict)}\n"
        context_str += f"Skills: {json.dumps(skills)}\n"
        context_str += f"Experience: {json.dumps(experiences)}\n"
        context_str += f"Projects: {json.dumps(projects)}\n"
        context_str += f"Achievements: {json.dumps(achievements)}"
        
        return context_str
