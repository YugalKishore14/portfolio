from django.db import models

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
    resume_url = models.CharField(max_length=500)

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
