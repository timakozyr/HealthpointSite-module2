from rest_framework import serializers

from users.models import Doctor
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            "id",
            "patient",
            "doctor",
            "date",
            "time",
            "cabinet",
            "service",
        ]
