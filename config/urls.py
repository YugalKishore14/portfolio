"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
import os

def serve_react(request, path):
    # If path refers to a file that exists, serve it
    filepath = settings.BASE_DIR / 'ui/out' / path
    if path and os.path.exists(filepath):
        return serve(request, path, document_root=settings.BASE_DIR / 'ui/out')
    # Otherwise, serve index.html for SPA routing (or if file missing but we want fallback)
    # However, for Next.js static export, usually we want 404 if asset missing, but index.html for routes.
    # Since checking 'is route' is hard, falling back to index.html is standard SPA behavior.
    return serve(request, 'index.html', document_root=settings.BASE_DIR / 'ui/out')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    re_path(r'^(?P<path>.*)$', serve_react),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

