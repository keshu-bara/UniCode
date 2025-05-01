from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
import json

@api_view(['POST'])
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