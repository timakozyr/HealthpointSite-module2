from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from roles.models import Role


User = get_user_model()


class LoginSignupAPITestCase(APITestCase):
    def setUp(self):
        self.login_url = reverse("login")
        self.signup_url = reverse("signup")
        self.user_data = {
            "email": "user@test.com",
            "first_name": "string",
            "patronymic_name": "string",
            "last_name": "string",
            "city": "string",
            "password": "string",
        }

    def test_signup_api(self):
        role_user, _ = Role.objects.get_or_create(name="user")
        response = self.client.post(self.signup_url, data=self.user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn("user", response.data)
        self.assertIn("email", response.data["user"])
        self.assertEqual(
            response.data["user"]["email"], self.user_data["email"]
        )

    def test_login_api(self):
        response = self.client.post(self.signup_url, data=self.user_data)
        user_data = {"email": "user@test.com", "password": "string"}
        response = self.client.post(self.login_url, user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn("user", response.data)
        self.assertIn("email", response.data["user"])
        self.assertEqual(response.data["user"]["email"], user_data["email"])

    def test_invalid_signup(self):
        response = self.client.post(self.signup_url, data=self.user_data)

        invalid_data = {"email": "user1@test.com", "password": "string"}
        response = self.client.post(self.login_url, data=invalid_data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        self.assertNotIn("email", response.data)
