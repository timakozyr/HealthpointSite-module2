from rest_framework import serializers

from .models import Appointment, TimeBlock


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


class TimeBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeBlock
        fields = ["id", "start_time"]
