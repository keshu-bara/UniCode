from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.core.paginator import Paginator
from django.db import transaction
from .models import Profile, Skill, Project
from .serializers import ProfileSerializer
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
import json

# Create your views here.

class MomentsApi(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self,request):
        try:
            data = request.data
            user = data['username']
            response = f"Hey {user} you have login sucessfully"
            return Response({
                'message':response
            },status= status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                'message':'error in fetching data'
            },status = status.HTTP_400_BAD_REQUEST)


class serveron(APIView):
    def get(self,request):
        return Response({
            "message":"developer is coding now"
        },status = status.HTTP_200_OK)
#this will show the public profiles at the home page 
class ProfilesApi(APIView):
    def get(self, request):
        try:
            profiles = Profile.objects.filter(is_public=True).order_by('?')[:3]#using order_by to randomize the profiles
            # limiting the fetched profile to 2 at a time
            serializer = ProfileSerializer(profiles, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                'message': 'error in fetching data'
            }, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = [JSONParser, MultiPartParser, FormParser]  # Support file uploads
    
    def get(self, request):
        """Get the user's profile with skills and projects"""
        try:
            profile = get_object_or_404(Profile, user=request.user)
            serializer = ProfileSerializer(profile, context={'request': request})
            return Response(serializer.data)
        except Exception as e:
            print(f"Error fetching profile: {e}")
            return Response({
                'message': 'Error retrieving profile data',
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        """Update the user's profile including skills and projects"""
        try:
            profile = get_object_or_404(Profile, user=request.user)
            print("Updating profile for:", profile.user.username)
            
            with transaction.atomic():
                # Handle basic profile data
                serializer = ProfileSerializer(
                    profile, 
                    data=request.data, 
                    partial=True, 
                    context={'request': request}
                )
                
                if not serializer.is_valid():
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
                # Save basic profile data
                profile = serializer.save()
                
                # Handle skills update
                if 'skills' in request.data:
                    skills_raw = request.data.get('skills', '[]')
                    print(f"Processing skills: {skills_raw}")
                    
                    try:
                        # Parse skills data
                        skills_data = json.loads(skills_raw) if isinstance(skills_raw, str) else skills_raw
                        
                        # Ensure we have a list
                        if not isinstance(skills_data, list):
                            return Response({
                                'error': 'Skills must be a list format'
                            }, status=400)
                        
                        # Clear existing skills first
                        profile.skills.all().delete()
                        
                        # Create new skills using a set for uniqueness
                        unique_skills = set()
                        for skill in skills_data:
                            if isinstance(skill, str) and skill.strip():
                                unique_skills.add(skill.strip())
                        
                        # Bulk create skills
                        new_skills = [
                            Skill(profile=profile, name=skill_name)
                            for skill_name in unique_skills
                        ]
                        Skill.objects.bulk_create(new_skills)
                        
                    except json.JSONDecodeError as e:
                        return Response({
                            'error': f'Invalid skills format: {str(e)}'
                        }, status=400)
                
                # Return updated profile
                updated_serializer = ProfileSerializer(profile, context={'request': request})
                return Response(updated_serializer.data)
                
        except Exception as e:
            print(f"Error updating profile: {e}")
            return Response({
                'message': 'Error updating profile',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat_completion(request):
    try:
        messages = request.data.get('messages', [])
        
        # For now, return predetermined responses based on input
        user_message = messages[-1]['content'].lower()
        
        if 'roadmap' in user_message:
            career = next((s for s in ['frontend', 'backend', 'full stack', 'devops', 'machine learning', 'mobile', 'cybersecurity'] 
                         if s in user_message.lower()), 'software')
            return Response({
                'message': generateRoadmap(career)
            })
        elif 'skill' in user_message:
            return Response({
                'message': generateSkillsAdvice()
            })
        elif 'interview' in user_message:
            return Response({
                'message': generateInterviewTips()
            })
        else:
            return Response({
                'message': generateGeneralAdvice()
            })
            
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=500)

def generateRoadmap(career):
    # Add your roadmap content here
    return f"Here's a roadmap for becoming a {career} developer..."

def generateSkillsAdvice():
    return "Here are the essential skills to focus on..."

def generateInterviewTips():
    return "Here are some interview preparation tips..."

def generateGeneralAdvice():
    return "Here's some general career advice..."