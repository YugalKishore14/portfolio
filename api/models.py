from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from django.utils.text import slugify

class PersonalData(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    tagline = models.CharField(max_length=500)
    mission = models.TextField()
    about_title = models.CharField(max_length=255)
    about_description = models.JSONField(default=list)
    about_values = models.JSONField(default=list)
    email = models.EmailField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)

    def __str__(self):
        return self.name

class SkillCategory(models.Model):
    name = models.CharField(max_length=255) # This maps to 'category' in JSON
    items = models.JSONField(default=list)

    def __str__(self):
        return self.name

class Experience(models.Model):
    company = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    period = models.CharField(max_length=255)
    color = models.CharField(max_length=50)
    description = models.TextField()
    achievements = models.JSONField(default=list)

    def __str__(self):
        return f"{self.role} at {self.company}"

class Project(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    description = models.TextField()
    tech = models.JSONField(default=list)
    link = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return self.title

class Achievement(models.Model):
    metric = models.CharField(max_length=50)
    label = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.label

class BlogPost(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]
    
    title = models.CharField(max_length=255, help_text="Blog post title")
    slug = models.SlugField(max_length=255, unique=True, blank=True, help_text="URL-friendly version of title")
    excerpt = models.TextField(max_length=500, help_text="Short description for preview")
    content = RichTextUploadingField(config_name='blog', help_text="Main blog content with rich text formatting")
    featured_image = models.ImageField(upload_to='blog/featured/', blank=True, null=True, help_text="Featured image for blog post")
    author = models.CharField(max_length=255, default="Aniket Verma")
    tags = models.JSONField(default=list, help_text="List of tags (e.g., ['Python', 'Django', 'AI'])")
    category = models.CharField(max_length=100, default="Technology", help_text="Blog category")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    read_time = models.IntegerField(default=5, help_text="Estimated read time in minutes")
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    
    # SEO fields
    meta_description = models.CharField(max_length=160, blank=True, help_text="SEO meta description")
    meta_keywords = models.CharField(max_length=255, blank=True, help_text="SEO keywords")
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.meta_description:
            self.meta_description = self.excerpt[:160]
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title

class AdminOTP(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, related_name='otp')
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now=True)

    def is_valid(self):
        # OTP is valid for 5 minutes
        from django.utils import timezone
        from datetime import timedelta
        return self.created_at >= timezone.now() - timedelta(minutes=5)

    def __str__(self):
        return f"OTP for {self.user.username}"


class ServiceQuery(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Query from {self.name} - {self.subject}"


class ValentineResponse(models.Model):
    response = models.CharField(max_length=10)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    device_model = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=500, null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.response} from {self.ip_address} at {self.created_at}"
