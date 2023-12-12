from rest_framework import serializers

from roles.models import Role
from users.models import User
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
            user.role = Role.objects.get(name="doctor")
            user.save()
            doctor = Doctor.objects.create(user=user, **validated_data)
            return doctor
        else:
            raise serializers.ValidationError(user_serializer.errors)

    # def delete(self, instance):
    #     user_id = instance.user_id
    #     print(user_id)
    #     try:
    #         user = User.objects.get(pk=user_id)
    #         user.delete()
    #     except User.DoesNotExist:
    #         pass
    #     instance.delete()
