from rest_framework import serializers
from .models import PersonalData, SkillCategory, Experience, Project, Achievement

class PersonalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalData
        fields = ['name', 'role', 'tagline', 'mission']

    def to_representation(self, instance):
        repr = super().to_representation(instance)
        repr['about'] = {
            'title': instance.about_title,
            'description': instance.about_description,
            'values': instance.about_values
        }
        repr['contact'] = {
            'email': instance.email,
            'linkedin': instance.linkedin,
            'github': instance.github,
            'resumeUrl': instance.resume_url
        }
        return repr

class SkillCategorySerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='name') # Map model field 'name' to 'category' for UI
    
    class Meta:
        model = SkillCategory
        fields = ['category', 'items']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'
