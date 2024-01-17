from django.db import models

from doctors.models import Doctor
from services.models import Service
from users.models import User


class TimeBlock(models.Model):
    start_time = models.TimeField()


class Appointment(models.Model):
    patient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="patient_appointments"
    )
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, related_name="doctor_appointments"
    )
    date = models.DateField()
    time = models.ForeignKey(TimeBlock, on_delete=models.CASCADE)
    cabinet = models.IntegerField()
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
