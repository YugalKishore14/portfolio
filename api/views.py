from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import PersonalData, SkillCategory, Experience, Project, Achievement
from .serializers import PersonalDataSerializer, SkillCategorySerializer, ExperienceSerializer, ProjectSerializer, AchievementSerializer

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
