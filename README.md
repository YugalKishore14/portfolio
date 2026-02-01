# 🚀 Aniket Verma - Personal Portfolio

A modern, cinematic portfolio website with an Avengers-inspired design, featuring an AI-powered chatbot, dynamic blog system, and a powerful Django REST API backend.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Django](https://img.shields.io/badge/Django-5.2.8-green) ![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black) ![Python](https://img.shields.io/badge/Python-3.11+-blue)

## 🌟 Features

### Frontend (Next.js 16)
- **Cinematic Design** - Avengers/Iron Man themed UI with glassmorphism, gradients, and micro-animations
- **Responsive Layout** - Fully optimized for mobile, tablet, and desktop
- **Dynamic Blog** - Dedicated blog page with category filtering, search, and individual post pages
- **AI Chatbot (J.A.R.V.I.S.)** - Real-time WebSocket-powered assistant using Google Gemini AI
- **Smooth Animations** - Framer Motion powered transitions and effects

### Backend (Django REST Framework)
- **REST API** - Full CRUD operations for portfolio data
- **Admin Panel** - Manage all content including resume uploads, blog posts, and personal data
- **CKEditor Integration** - Rich text editing for blog posts with code snippet support
- **WebSocket Support** - Real-time chat via Django Channels & Daphne
- **Static Export Support** - Next.js static export served through Django

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Django 5.2.8 | Web Framework |
| Django REST Framework | API Development |
| Django Channels | WebSocket Support |
| Daphne | ASGI Server |
| SQLite | Development Database |
| Google Gemini AI | AI Chatbot |
| CKEditor | Rich Text Editor |
| Whitenoise | Static Files |

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 16 | React Framework |
| TypeScript | Type Safety |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |

## 📁 Project Structure

```
portfolio/
├── api/                    # Django REST API app
│   ├── models.py          # Database models
│   ├── serializers.py     # DRF serializers
│   ├── views.py           # API views
│   ├── urls.py            # API routes
│   ├── consumers.py       # WebSocket consumers
│   └── admin.py           # Admin configuration
├── config/                 # Django project settings
│   ├── settings.py        # Main settings
│   ├── urls.py            # Root URL configuration
│   └── asgi.py            # ASGI configuration
├── ui/                     # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   │   ├── page.tsx   # Homepage
│   │   │   ├── blog/      # Blog pages
│   │   │   └── layout.tsx # Root layout
│   │   ├── components/    # React components
│   │   └── lib/           # Utilities & types
│   └── out/               # Static export output
├── media/                  # Uploaded files
├── staticfiles/           # Collected static files
├── requirements.txt       # Python dependencies
└── render_start.sh        # Production start script
```

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/aniketverma/portfolio.git
   cd portfolio
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   # or
   venv\Scripts\activate     # Windows
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Seed the database (optional)**
   ```bash
   python seed_db.py
   python seed_blog.py
   ```

7. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

8. **Start the development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to UI directory**
   ```bash
   cd ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/chat/
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/personal-data/` | GET | Get personal information |
| `/api/skills/` | GET | List all skill categories |
| `/api/experience/` | GET | List work experience |
| `/api/projects/` | GET | List projects |
| `/api/achievements/` | GET | List achievements |
| `/api/blog/` | GET | List published blog posts |
| `/api/blog/{slug}/` | GET | Get single blog post |
| `/api/blog/categories/` | GET | List blog categories |
| `/api/chatbot/` | POST | Send message to AI chatbot |
| `/ws/chat/` | WebSocket | Real-time chat connection |

## ⚙️ Admin Panel

Access the admin panel at `/admin/` to manage:
- **Personal Data** - Name, role, about section, resume upload
- **Skills** - Skill categories and items
- **Experience** - Work history
- **Projects** - Portfolio projects
- **Achievements** - Metrics and accomplishments
- **Blog Posts** - Full blog management with rich text editor

## 🌐 Deployment

### Production Build

1. **Build the frontend**
   ```bash
   cd ui
   npm run build
   ```

2. **Collect static files**
   ```bash
   python manage.py collectstatic --noinput
   ```

3. **Start with Daphne (production)**
   ```bash
   daphne -b 0.0.0.0 -p 8000 config.asgi:application
   ```

### Environment Variables for Production

```bash
# Django
DEBUG=False
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=yourdomain.com

# API
GEMINI_API_KEY=your-gemini-api-key

# Frontend (in ui/.env)
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/api
NEXT_PUBLIC_WS_URL=wss://yourdomain.com/ws/chat/
```

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Aniket Verma**
- Website: [aniketverma.xyz](https://aniketverma.xyz)
- LinkedIn: [linkedin.com/in/aniketverma](https://linkedin.com/in/aniketverma)
- GitHub: [github.com/aniketverma](https://github.com/aniketverma)

---

*Built with ❤️ using Django, Next.js, and a touch of Stark Industries technology*
