import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import BlogPost
from django.utils import timezone

def create_sample_blog_posts():
    """Create sample blog posts for testing"""
    
    sample_posts = [
        {
            'title': 'Building Scalable Microservices with Django and Docker',
            'excerpt': 'Learn how to architect and deploy production-ready microservices using Django REST Framework and Docker containers.',
            'content': '''
                <h2>Introduction to Microservices</h2>
                <p>Microservices architecture has become the de facto standard for building scalable applications. In this post, we'll explore how to leverage Django and Docker to create robust microservices.</p>
                
                <h3>Why Microservices?</h3>
                <ul>
                    <li>Independent deployment and scaling</li>
                    <li>Technology diversity</li>
                    <li>Fault isolation</li>
                    <li>Better team organization</li>
                </ul>
                
                <h3>Setting Up Django for Microservices</h3>
                <p>First, let's create a lightweight Django service:</p>
                
                <pre><code class="language-python">
# settings.py
INSTALLED_APPS = [
    'rest_framework',
    'corsheaders',
    'your_app',
]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}
                </code></pre>
                
                <h3>Dockerizing Your Service</h3>
                <p>Create a Dockerfile for your Django service:</p>
                
                <pre><code class="language-dockerfile">
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
                </code></pre>
                
                <h3>Conclusion</h3>
                <p>Microservices with Django and Docker provide a powerful combination for building modern applications. Start small, iterate, and scale as needed.</p>
            ''',
            'category': 'Backend Development',
            'tags': ['Django', 'Docker', 'Microservices', 'Python'],
            'read_time': 8,
            'status': 'published',
            'published_at': timezone.now(),
        },
        {
            'title': 'AI-Powered Chatbots: From Concept to Production',
            'excerpt': 'A comprehensive guide to building intelligent chatbots using Google Gemini API and modern web technologies.',
            'content': '''
                <h2>The Rise of AI Chatbots</h2>
                <p>AI chatbots have revolutionized customer service and user engagement. Let's build one from scratch using Google's Gemini API.</p>
                
                <h3>Architecture Overview</h3>
                <p>Our chatbot will consist of:</p>
                <ul>
                    <li>Frontend: React/Next.js with WebSocket support</li>
                    <li>Backend: Django with Channels for real-time communication</li>
                    <li>AI: Google Gemini API for natural language processing</li>
                </ul>
                
                <h3>Implementing the Backend</h3>
                <pre><code class="language-python">
from google import genai
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        
    async def receive(self, text_data):
        message = json.loads(text_data)
        response = await self.get_ai_response(message['text'])
        await self.send(text_data=json.dumps({'response': response}))
                </code></pre>
                
                <h3>Best Practices</h3>
                <ol>
                    <li>Implement rate limiting to prevent abuse</li>
                    <li>Add context management for better conversations</li>
                    <li>Handle errors gracefully</li>
                    <li>Monitor API usage and costs</li>
                </ol>
            ''',
            'category': 'AI & Machine Learning',
            'tags': ['AI', 'Chatbot', 'Gemini', 'WebSocket', 'Django'],
            'read_time': 10,
            'status': 'published',
            'published_at': timezone.now(),
        },
        {
            'title': 'Next.js 14: Server Components and App Router Deep Dive',
            'excerpt': 'Explore the latest features in Next.js 14 including Server Components, streaming, and the new App Router.',
            'content': '''
                <h2>Next.js 14: A Game Changer</h2>
                <p>Next.js 14 introduces revolutionary features that change how we build React applications. Let's explore the most impactful ones.</p>
                
                <h3>Server Components</h3>
                <p>Server Components allow you to render components on the server, reducing JavaScript bundle size:</p>
                
                <pre><code class="language-typescript">
// app/page.tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
                </code></pre>
                
                <h3>App Router Benefits</h3>
                <ul>
                    <li>Nested layouts and templates</li>
                    <li>Improved data fetching</li>
                    <li>Streaming and Suspense support</li>
                    <li>Built-in error handling</li>
                </ul>
                
                <h3>Performance Optimization</h3>
                <p>Use the new Image component with automatic optimization:</p>
                
                <pre><code class="language-typescript">
import Image from 'next/image'

export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={600}
      priority
    />
  )
}
                </code></pre>
            ''',
            'category': 'Frontend Development',
            'tags': ['Next.js', 'React', 'TypeScript', 'Performance'],
            'read_time': 7,
            'status': 'published',
            'published_at': timezone.now(),
        },
    ]
    
    created_count = 0
    for post_data in sample_posts:
        post, created = BlogPost.objects.get_or_create(
            title=post_data['title'],
            defaults=post_data
        )
        if created:
            created_count += 1
            print(f"✓ Created: {post.title}")
        else:
            print(f"- Already exists: {post.title}")
    
    print(f"\n{created_count} new blog post(s) created!")
    print(f"Total blog posts: {BlogPost.objects.count()}")

if __name__ == '__main__':
    create_sample_blog_posts()
