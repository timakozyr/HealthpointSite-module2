from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from roles.models import Role
from services.models import Service
from specializations.models import Specialization
from users.models import User


class ServiceViewSetTest(APITestCase):
    def setUp(self):
        self.specialization = Specialization.objects.create(name="Test Specialization")
        self.user_role = Role.objects.create(id=2, name="admin")

        self.service1 = Service.objects.create(
            name="Service 1",
            bio="Bio 1",
            specialization=self.specialization,
            logo="logo.jpg",
        )
        self.service2 = Service.objects.create(
            name="Service 2",
            bio="Bio 2",
            specialization=self.specialization,
            logo="logo.jpg",
        )

        self.user = User.objects.create_superuser(
            email="user@example.com",
            first_name="John",
            last_name="Doe",
            patronymic_name="Patron",
            city="CityName",
            password="password123",
            role=self.user_role,
        )
        self.token = Token.objects.create(user=self.user)

    def test_list_services(self):
        url = reverse("service-list")
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), Service.objects.count())

    def test_create_service(self):
        url = reverse("service-list")
        data = {
            "name": "New Service",
            "specialization": self.specialization.id,
            "bio": "New Bio",
            "logo": "logo.jpg",
        }
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Service.objects.count(), 3)

    def test_update_service(self):
        url = reverse("service-detail", args=[self.service1.id])
        updated_data = {
            "name": "Updated Service",
            "bio": "Updated Bio",
            "logo": "updated_logo.jpg",
            "specialization": self.specialization.id,
        }
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        response = self.client.put(url, updated_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.service1.refresh_from_db()
        self.assertEqual(self.service1.name, "Updated Service")

    def test_delete_service(self):
        url = reverse("service-detail", args=[self.service2.id])
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Service.objects.filter(id=self.service2.id).exists())
