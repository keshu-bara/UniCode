from rest_framework import serializers
from .models import Profiles

class ProfilesSerializer(serializers.ModelSerializer):
    skills = serializers.ListField(child=serializers.CharField())

    class Meta:
        model = Profiles
        fields = ['id', 'name', 'role','skills', 'avatar']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['skills'] = instance.skills.split(',')
        return representation

    def to_internal_value(self, data):
        internal_value = super().to_internal_value(data)
        internal_value['skills'] = ','.join(data['skills'])
        return internal_value