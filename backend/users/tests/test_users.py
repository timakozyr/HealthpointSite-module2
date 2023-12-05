from django.test import TestCase
from users.models import User, Doctor
from roles.models import Role
from specializations.models import Specialization


class UserModelTest(TestCase):
    def setUp(self):
        self.user_role = Role.objects.create(id=1, name='user')
        self.doctor_role = Role.objects.create(id=3, name='doctor')
        self.specialization = Specialization.objects.create(
            name='Test Specialization')

    def create_user(self):
        return User.objects.create_user(
            email='user@test.com',
            first_name='John',
            last_name='Doe',
            patronymic_name='Patron',
            city='TestCity',
            role=self.user_role
        )

    def create_doctor(self):
        return Doctor.objects.create(
            email='doctor@test.com',
            first_name='Doctor',
            last_name='Doe',
            patronymic_name='Patron',
            city='TestCity',
            role=self.doctor_role,
            specialization=self.specialization
        )

    def test_retrieve_user(self):
        user = self.create_user()
        retrieved_user = User.objects.get(email='user@test.com')

        self.assertEqual(user.first_name, retrieved_user.first_name)

    def test_retrieve_doctor(self):
        doctor = self.create_doctor()
        retrieved_doctor = Doctor.objects.get(email='doctor@test.com')

        self.assertEqual(doctor.first_name, retrieved_doctor.first_name)
