from django.contrib import admin
from .models import Profile, Skill, Project

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1

class ProjectInline(admin.TabularInline):
    model = Project
    extra = 1
    readonly_fields = ('id',)  # Make ID read-only in admin

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio_preview', 'github_profile', 'linkedin_profile', 'created_at')
    search_fields = ('user__username', 'user__email')
    inlines = [SkillInline, ProjectInline]
    
    def bio_preview(self, obj):
        if obj.bio:
            return obj.bio[:50] + "..." if len(obj.bio) > 50 else obj.bio
        return "-"
    bio_preview.short_description = "Bio"

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'profile', 'repo_url', 'created_at')
    search_fields = ('title', 'description', 'profile__user__username')
    readonly_fields = ('id',)  # Make ID read-only in admin