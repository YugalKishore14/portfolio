from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PersonalDataView, SkillCategoryViewSet, ExperienceViewSet, ProjectViewSet, AchievementViewSet, BlogPostViewSet, ChatBotView

router = DefaultRouter()
router.register(r'skills', SkillCategoryViewSet)
router.register(r'experience', ExperienceViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'achievements', AchievementViewSet)
router.register(r'blog', BlogPostViewSet)

urlpatterns = [
    path('personal-data/', PersonalDataView.as_view(), name='personal-data'),
    path('chatbot/', ChatBotView.as_view(), name='chatbot'),
    path('', include(router.urls)),
]

