from django.db import models

from specializations.models import Specialization
from users.models import User


# Create your models here.
class Doctor(models.Model):
    """Doctor in the system."""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialization = models.ForeignKey(Specialization, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.first_name} {self.user.patronymic_name} {self.user.last_name}"

    def has_perm(self, perm, obj=None):
        return self.user.is_admin or perm == "doctor_perm"

    def has_module_perms(self, app_label):
        return True
