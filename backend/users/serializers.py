from django.utils import timezone

from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from roles.models import Role
from .models import User, Doctor


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "patronymic_name",
            "last_name",
            "city",
            "password",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(
                validated_data['password'])
        return super().update(instance, validated_data)


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password"]


class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Include UserSerializer as a nested serializer

    class Meta:
        model = Doctor
        fields = [
            'user',
            'specialization'
        ]

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            doctor = Doctor.objects.create(user=user, **validated_data)
            return doctor
        else:
            raise serializers.ValidationError(user_serializer.errors)
