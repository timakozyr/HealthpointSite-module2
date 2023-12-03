from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save

from rest_framework.authtoken.models import Token

from specializations.models import Specialization


class UserManager(BaseUserManager):
    """User manager in the system for the User model."""

    def create_user(
            self,
            email,
            first_name,
            last_name,
            patronymic_name,
            city,
            profile_pic,
            password=None,
            **extra_fields
    ):
        """Creates and saves a User with the given email and password."""
        if not email:
            raise ValueError("Email must be specified.")
        if not first_name:
            raise ValueError("First name must be specified.")
        if not last_name:
            raise ValueError("Last name must be specified.")
        if not patronymic_name:
            raise ValueError("Patronymic name must be specified.")
        if not city:
            raise ValueError("City must be specified.")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            profile_pic=profile_pic,
            city=city,
            patronymic_name=patronymic_name,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(
            self,
            email,
            first_name,
            last_name,
            patronymic_name,
            profile_pic,
            city,
            password=None,
            **extra_fields
    ):
        """Creates and saves a superuser with the given email and password."""

        if not email:
            raise ValueError("Email must be specified.")
        if not first_name:
            raise ValueError("First name must be specified.")
        if not last_name:
            raise ValueError("Last name must be specified.")
        if not patronymic_name:
            raise ValueError("Patronymic name must be specified.")
        if not city:
            raise ValueError("City must be specified.")

        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            first_name=first_name,
            last_name=last_name,
            profile_pic=profile_pic,
            city=city,
            patronymic_name=patronymic_name,
            **extra_fields
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)

        return user


class User(AbstractBaseUser):
    """User in the system."""

    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    patronymic_name = models.CharField(max_length=30)
    city = models.CharField(max_length=50)
    profile_pic = models.ImageField(
        blank=True, upload_to='profile_pic', default='default-pfp.jpg')
    date_joined = models.DateField(
        verbose_name="date joined", auto_now_add=True
    )

    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "patronymic_name",
                       "profile_pic", "city"]

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.patronymic_name}"

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class Doctor(User):
    """Doctor in the system."""

    specialization = models.OneToOneField(Specialization,
                                          on_delete=models.CASCADE)

    is_staff = True

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.patronymic_name} - {self.specialization}"

    def has_perm(self, perm, obj=None):
        return self.is_admin or perm == 'doctor_perm'

    def has_module_perms(self, app_label):
        return True
