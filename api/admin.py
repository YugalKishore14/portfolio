from django.contrib import admin
from django.utils import timezone
from .models import PersonalData, SkillCategory, Experience, Project, Achievement, BlogPost, AdminOTP, ServiceQuery

@admin.register(ServiceQuery)
class ServiceQueryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at',)

@admin.register(AdminOTP)
class AdminOTPAdmin(admin.ModelAdmin):
    list_display = ('user', 'otp', 'created_at')

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

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'status', 'views', 'created_at', 'published_at')
    list_filter = ('status', 'category', 'created_at', 'published_at')
    search_fields = ('title', 'excerpt', 'content', 'author')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('views', 'created_at', 'updated_at')
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'author', 'category', 'status')
        }),
        ('Content', {
            'fields': ('excerpt', 'content', 'featured_image')
        }),
        ('Metadata', {
            'fields': ('tags', 'read_time', 'views')
        }),
        ('SEO', {
            'fields': ('meta_description', 'meta_keywords'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'published_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['publish_posts', 'unpublish_posts']
    
    def publish_posts(self, request, queryset):
        updated = queryset.update(status='published', published_at=timezone.now())
        self.message_user(request, f'{updated} post(s) successfully published.')
    publish_posts.short_description = "Publish selected posts"
    
    def unpublish_posts(self, request, queryset):
        updated = queryset.update(status='draft', published_at=None)
        self.message_user(request, f'{updated} post(s) unpublished.')
    unpublish_posts.short_description = "Unpublish selected posts"

