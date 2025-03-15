from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required = True)
    full_name = serializers.CharField()
    username = serializers.CharField(required = True)
    password = serializers.CharField(required = True)


    def validate(self, data):
        if User.objects.filter(username = data['username']).exists():
            raise serializers.ValidationError('username already taken')
        return data
    def create(self, validated_data):
        full_name = validated_data.pop('full_name')
        name_parts = full_name.split()
        first_name = name_parts[0]
        last_name = " ".join(name_parts[1:]) if len(name_parts) > 1 else ""

        user = User.objects.create(username = validated_data['username'],first_name =first_name,email = validated_data['email'],last_name = last_name)
        user.set_password(validated_data['password'])
        user.save()
        validated_data['full_name'] = full_name
        return validated_data
    
class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        if not User.objects.filter(username = data['username']).exists():
            raise serializers.ValidationError('username not exists')
        return data
    
    def get_jwt_token(self,data):
        
        user = authenticate(username = data['username'],password = data['password'])
        

        if not user:
            return {'message': 'invalid_credentials','data':{}}
        
        refresh = RefreshToken.for_user(user)

        return {'messge':'login success','data':{
            'refresh': str(refresh),
        'access': str(refresh.access_token)
        }}

        
        