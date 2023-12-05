from django.db import models

from services.models import Service
from users.models import Doctor, User


class Appointment(models.Model):
    patient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="patient_appointments"
    )
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, related_name="doctor_appointments"
    )
    date = models.DateField()
    time = models.TimeField()
    cabinet = models.IntegerField()
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
