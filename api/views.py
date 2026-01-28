
import os
from dotenv import load_dotenv
import google.generativeai as genai
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from .models import PersonalData, SkillCategory, Experience, Project, Achievement
from .serializers import PersonalDataSerializer, SkillCategorySerializer, ExperienceSerializer, ProjectSerializer, AchievementSerializer

# Configure Gemini
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

class PersonalDataView(APIView):
    def get(self, request):
        data = PersonalData.objects.first()
        if data:
            serializer = PersonalDataSerializer(data)
            return Response(serializer.data)
        return Response({})

class SkillCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer

class ChatBotView(APIView):
    def post(self, request):
        user_query = request.data.get('query')
        if not user_query:
            return Response({"error": "Query is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Read resume content
            resume_path = os.path.join(settings.BASE_DIR, 'resume.txt')
            with open(resume_path, 'r') as f:
                resume_content = f.read()

            # Construct prompt
            system_prompt = f"""
            You are Jarvis, a highly advanced AI assistant for Aniket Verma.
            Your persona is professional, intelligent, and helpful, similar to J.A.R.V.IS from Iron Man.
            You are requested to answer questions based on Aniket's resume.
            
            Resume Context:
            {resume_content}

            Rules:
            1. Always answer in the persona of Jarvis ("Sir", "Processing", etc. are good, but keep it concise).
            2. Only answer questions related to Aniket's professional background, skills, and resume.
            3. If the question is unrelated, politely decline and steer back to Aniket.
            4. Keep answers brief and to the point suitable for a chat interface.
            """
            
            model = genai.GenerativeModel('gemini-2.5-flash')
            chat = model.start_chat(history=[
                {"role": "user", "parts": [system_prompt]},
                {"role": "model", "parts": ["Hello Sir, I am online and ready to assist you with inquiries regarding Mr. Verma's portfolio."]}
            ])
            
            response = chat.send_message(user_query)
            return Response({"response": response.text})

        except Exception as e:
            print(f"Gemini Error: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
