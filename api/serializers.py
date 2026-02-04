from rest_framework import serializers
from .models import PersonalData, SkillCategory, Experience, Project, Achievement, BlogPost, ServiceQuery, ValentineResponse

class ServiceQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceQuery
        fields = '__all__'

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
        request = self.context.get('request')
        resume_url = None
        if instance.resume:
            if request:
                resume_url = request.build_absolute_uri(instance.resume.url)
            else:
                resume_url = instance.resume.url

        repr['contact'] = {
            'email': instance.email,
            'linkedin': instance.linkedin,
            'github': instance.github,
            'resumeUrl': resume_url
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

class BlogPostListSerializer(serializers.ModelSerializer):
    """Serializer for blog post list view"""
    featured_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'featured_image_url', 'author', 
                  'category', 'tags', 'read_time', 'views', 'created_at', 'published_at']
    
    def get_featured_image_url(self, obj):
        if obj.featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
        return None

class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Serializer for blog post detail view"""
    featured_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'content', 'featured_image_url', 
                  'author', 'category', 'tags', 'read_time', 'views', 'created_at', 
                  'updated_at', 'published_at', 'meta_description', 'meta_keywords']
    
    def get_featured_image_url(self, obj):
        if obj.featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
        return None


class ValentineResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValentineResponse
        fields = ['response', 'device_model', 'message']

