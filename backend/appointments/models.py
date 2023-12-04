from django.db import models

from users.models import User, Doctor


class Appointment(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    cabinet = models.IntegerField()
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
