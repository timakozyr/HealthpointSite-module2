from django.db import models

from specializations.models import Specialization


class Service(models.Model):
    name = models.CharField(max_length=50, unique=True)
    specialization = models.ForeignKey(Specialization, on_delete=models.CASCADE)
    bio = models.TextField(null=True, blank=True)
    logo = models.ImageField(blank=True, upload_to="profile_pic", default="logo.jpg")

    def __str__(self):
        return self.name
