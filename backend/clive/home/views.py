from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


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
