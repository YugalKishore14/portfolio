from django.contrib import admin
from .models import PersonalData, SkillCategory, Experience, Project, Achievement

@admin.register(PersonalData)
class PersonalDataAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'email')

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company', 'period')
    list_filter = ('company',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category')
    list_filter = ('category',)

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('metric', 'label')
