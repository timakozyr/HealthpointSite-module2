from datetime import date, time

from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from appointments.models import Appointment
from doctors.models import Doctor
from roles.models import Role
from services.models import Service
from specializations.models import Specialization
from users.models import User


class AppointmentAPITest(APITestCase):
    def setUp(self):
        self.user_role = Role.objects.create(id=1, name="user")
        self.doctor_role = Role.objects.create(id=3, name="doctor")
        self.admin_role = Role.objects.create(id=2, name="admin")
        self.specialization = Specialization.objects.create(name="Test Specialization")

        self.user = User.objects.create_user(
            email="user@example.com",
            first_name="John",
            last_name="Doe",
            patronymic_name="Patron",
            city="CityName",
            password="password123",
            role=self.user_role,
        )

        self.user2 = User.objects.create_user(
            email="user3@example.com",
            first_name="John",
            last_name="Doe",
            patronymic_name="Patron",
            city="CityName",
            password="password123",
            role=self.user_role,
        )

        self.doctor = Doctor.objects.create(
            user=self.user2,
            specialization=self.specialization,
        )

        self.service = Service.objects.create(
            name="ServiceName",
            specialization=self.specialization,
            bio="Some text",
            logo="logo,jpg",
        )

        self.token = Token.objects.create(user=self.user)

    def test_create_appointment(self):
        url = reverse("appointments-list")
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        data = {
            "patient": self.user.id,
            "doctor": self.doctor.id,
            "date": str(date.today()),
            "time": str(time(hour=10, minute=30)),
            "cabinet": 101,
            "service": self.service.id,
        }
        self.client.force_login(self.user)
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Appointment.objects.count(), 1)
        for key, value in data.items():
            self.assertEqual(response.data[key], value)

    def test_retrieve_appointments(self):
        url = reverse("appointments-list")
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        data = {
            "patient": self.user.id,
            "doctor": self.doctor.id,
            "date": str(date.today()),
            "time": str(time(hour=10, minute=30)),
            "cabinet": 101,
            "service": self.service.id,
        }
        self.client.force_login(self.user)
        response1 = self.client.post(url, data, format="json")

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_appointment(self):
        url = reverse("appointments-list")
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        data = {
            "patient": self.user.id,
            "doctor": self.doctor.id,
            "date": str(date.today()),
            "time": str(time(hour=10, minute=30)),
            "cabinet": 101,
            "service": self.service.id,
        }
        self.client.force_login(self.user)
        response1 = self.client.post(url, data, format="json")

        url = reverse("appointments-detail", kwargs={"pk": response1.data["id"]})
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for key, value in data.items():
            self.assertEqual(response.data[key], value)

    def test_retrieve_own_appointment(self):
        new_user = User.objects.create_user(
            email="newuser@example.com",
            first_name="Alice",
            last_name="Smith",
            patronymic_name="Patron",
            city="CityName",
            password="password123",
            role=self.user_role,
        )
        new_user_token = Token.objects.create(user=new_user)

        new_appointment = Appointment.objects.create(
            patient=new_user,
            doctor=self.doctor,
            date=date.today(),
            time=time(hour=10, minute=30),
            cabinet=101,
            service=self.service,
        )

        url = reverse("appointments-detail", kwargs={"pk": new_appointment.id})
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_admin_appointments(self):
        admin = User.objects.create_superuser(
            email="admin@healthpoint.ru",
            first_name="Admin",
            last_name="Admin",
            patronymic_name="Admin",
            city="FakeCity",
            password="admin",
        )

        self.assertTrue(admin.is_admin)
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)
        self.assertTrue(admin.is_active)
        self.assertEqual(admin.email, "admin@healthpoint.ru")

        url = reverse("appointments-list")
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        data = {
            "patient": self.user.id,
            "doctor": self.doctor.id,
            "date": str(date.today()),
            "time": str(time(hour=10, minute=30)),
            "cabinet": 101,
            "service": self.service.id,
        }
        self.client.force_login(self.user)
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.token_admin = Token.objects.create(user=admin)

        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token_admin.key)

        url = reverse("appointments-detail", kwargs={"pk": response.data["id"]})

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for key, value in data.items():
            self.assertEqual(response.data[key], value)
