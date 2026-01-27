from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PersonalDataView, SkillCategoryViewSet, ExperienceViewSet, ProjectViewSet, AchievementViewSet

router = DefaultRouter()
router.register(r'skills', SkillCategoryViewSet)
router.register(r'experience', ExperienceViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'achievements', AchievementViewSet)

urlpatterns = [
    path('personal-data/', PersonalDataView.as_view(), name='personal-data'),
    path('', include(router.urls)),
]
