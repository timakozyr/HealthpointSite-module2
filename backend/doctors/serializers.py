from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from users.serializers import UserSerializer

from .models import Doctor


class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Doctor
        fields = ["id", "user", "specialization"]

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            doctor = Doctor.objects.create(user=user, **validated_data)
            return doctor
        else:
            raise serializers.ValidationError(user_serializer.errors)
