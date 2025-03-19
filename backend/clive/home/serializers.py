from rest_framework import serializers
from .models import Profile, Skill, Project
from django.contrib.auth.models import User
import uuid

class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.CharField(required=False)  # Allow string representation
    repoUrl = serializers.URLField(source='repo_url', required=False, allow_blank=True)
    demoUrl = serializers.URLField(source='demo_url', required=False, allow_blank=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'repoUrl', 'demoUrl']
    
    def to_representation(self, instance):
        """Format data for frontend consumption"""
        return {
            'id': str(instance.id),
            'title': instance.title,
            'description': instance.description or '',
            'repoUrl': instance.repo_url or '',
            'demoUrl': instance.demo_url or ''
        }
    
    def create(self, validated_data):
        """Handle creation with proper ID conversion"""
        if 'id' in validated_data and validated_data['id']:
            try:
                validated_data['id'] = uuid.UUID(validated_data['id'])
            except (ValueError, AttributeError):
                # If invalid UUID format, generate a new one
                validated_data['id'] = uuid.uuid4()
        else:
            # Ensure we have a UUID
            validated_data['id'] = uuid.uuid4()
            
        return super().create(validated_data)

class ProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    skills = serializers.SerializerMethodField()
    projects = serializers.SerializerMethodField()
    
    # Original fields with snake_case
    bio = serializers.CharField(required=False, allow_blank=True)
    leetcode_profile = serializers.URLField(required=False, allow_blank=True)
    github_profile = serializers.URLField(required=False, allow_blank=True)
    linkedin_profile = serializers.URLField(required=False, allow_blank=True)
    profile_image = serializers.ImageField(required=False)
    is_public = serializers.BooleanField(required=False)
    
    # CamelCase versions for frontend
    leetCodeProfile = serializers.SerializerMethodField()
    githubProfile = serializers.SerializerMethodField()
    linkedinProfile = serializers.SerializerMethodField()
    profileImageUrl = serializers.SerializerMethodField()
    isPublic = serializers.BooleanField(source='is_public', required=False)
    
    class Meta:
        model = Profile
        fields = [
            'full_name', 'username', 'email', 'bio', 
            'leetcode_profile', 'github_profile', 'linkedin_profile', 'profile_image',
            'leetCodeProfile', 'githubProfile', 'linkedinProfile', 'profileImageUrl',
            'skills', 'projects','is_public', 'isPublic'
        ]
    
    def get_full_name(self, obj):
        first_name = obj.user.first_name or ""
        last_name = obj.user.last_name or ""
        if first_name and last_name:
            return f"{first_name} {last_name}"
        return first_name or obj.user.username
    
    def get_email(self, obj):
        return obj.user.email
    
    def get_username(self, obj):
        return obj.user.username
    
    def get_leetCodeProfile(self, obj):
        return obj.leetcode_profile
    
    def get_githubProfile(self, obj):
        return obj.github_profile
    
    def get_linkedinProfile(self, obj):
        return obj.linkedin_profile
    
    def get_profileImageUrl(self, obj):
        if obj.profile_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None
    def get_ispublic(self,obj):
        return obj.is_public
    
    def get_skills(self, obj):
        return [skill.name for skill in obj.skills.all()]
    
    def get_projects(self, obj):
        projects = obj.projects.all()
        return ProjectSerializer(projects, many=True).data
    
    def update(self, instance, validated_data):
        """Update profile with frontend data"""
        # Extract request data and files
        request = self.context.get('request')
        request_data = request.data if request else {}
        
        # Handle user info
        if 'full_name' in request_data:
            full_name = request_data.get('full_name')
            if full_name:
                parts = full_name.split(' ', 1)
                instance.user.first_name = parts[0]
                instance.user.last_name = parts[1] if len(parts) > 1 else ''
                instance.user.save()
        
        if 'email' in request_data:
            email = request_data.get('email')
            if email:
                instance.user.email = email
                instance.user.save()
        
        # Update profile fields
        if 'bio' in request_data:
            instance.bio = request_data.get('bio', '')
        
        # Handle profile URLs - check both snake_case and camelCase
        if 'leetcode_profile' in request_data or 'leetCodeProfile' in request_data:
            instance.leetcode_profile = request_data.get('leetcode_profile', 
                                          request_data.get('leetCodeProfile', ''))
        
        if 'github_profile' in request_data or 'githubProfile' in request_data:
            instance.github_profile = request_data.get('github_profile', 
                                       request_data.get('githubProfile', ''))
        
        if 'linkedin_profile' in request_data or 'linkedinProfile' in request_data:
            instance.linkedin_profile = request_data.get('linkedin_profile', 
                                         request_data.get('linkedinProfile', ''))
        
        # Handle profile image upload
        if 'profile_image' in request.FILES:
            instance.profile_image = request.FILES['profile_image']
        
        

        if 'is_public' in request_data or 'isPublic' in request_data:
            instance.is_public = request_data.get('is_public', 
                                      request_data.get('isPublic', True))
        instance.save()
        
        # Process skills (array of strings)
        if 'skills' in request_data:
            skills_data = request_data.get('skills', [])
            # Clear existing skills
            instance.skills.all().delete()
            # Create new skills
            for skill_name in skills_data:
                if skill_name and isinstance(skill_name, str) and skill_name.strip():
                    Skill.objects.create(profile=instance, name=skill_name.strip())
        
        # Process projects (array of objects)
        if 'projects' in request_data:
            projects_data = request_data.get('projects', [])
            # Clear existing projects
            instance.projects.all().delete()
            
            # Create new projects
            for project_data in projects_data:
                if isinstance(project_data, dict) and 'title' in project_data:
                    # Handle UUID conversion safely
                    project_id = None
                    if 'id' in project_data:
                        try:
                            project_id = uuid.UUID(str(project_data['id']))
                        except (ValueError, AttributeError):
                            project_id = uuid.uuid4()
                    else:
                        project_id = uuid.uuid4()
                    
                    Project.objects.create(
                        id=project_id,
                        profile=instance,
                        title=project_data.get('title', ''),
                        description=project_data.get('description', ''),
                        repo_url=project_data.get('repoUrl', ''),
                        demo_url=project_data.get('demoUrl', '')
                    )
        
        return instance