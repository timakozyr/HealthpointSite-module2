from django.test import TestCase

from roles.models import Role
from specializations.models import Specialization
from users.models import Doctor, User


class UserModelTest(TestCase):
    def setUp(self):
        self.user_role = Role.objects.create(id=1, name="user")
        self.doctor_role = Role.objects.create(id=3, name="doctor")
        self.specialization = Specialization.objects.create(
            name="Test Specialization")

    def create_user(self):
        return User.objects.create_user(
            email="user@test.com",
            first_name="John",
            last_name="Doe",
            patronymic_name="Patron",
            city="TestCity",
            role=self.user_role,
        )

    def create_doctor(self, user):
        return Doctor.objects.create(
            user=user,
            specialization=self.specialization,
        )

    def test_retrieve_user(self):
        self.user = self.create_user()
        retrieved_user = User.objects.get(email="user@test.com")

        self.assertEqual(self.user.first_name, retrieved_user.first_name)

    def test_retrieve_doctor(self):
        self.user = self.create_user()
        doctor = self.create_doctor(self.user)
        retrieved_doctor = Doctor.objects.get(user_id=self.user.id)

        self.assertEqual(doctor.user.first_name,
                         retrieved_doctor.user.first_name)
