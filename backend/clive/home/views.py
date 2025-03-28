from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.core.paginator import Paginator
from .models import Profile, Skill, Project
from .serializers import ProfileSerializer


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
            serializer = ProfileSerializer(
                profile, 
                data=request.data, 
                partial=True, 
                context={'request': request}
                
            )
            print(serializer)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            print(f"Error updating profile: {e}")
            return Response({
                'message': 'Error updating profile',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

