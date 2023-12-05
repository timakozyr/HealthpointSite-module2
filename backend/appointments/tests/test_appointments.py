from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from datetime import date, time

from rest_framework.authtoken.models import Token
from roles.models import Role
from services.models import Service
from specializations.models import Specialization
from users.models import Doctor, User
from appointments.models import Appointment


class AppointmentAPITest(APITestCase):
    def setUp(self):
        self.user_role = Role.objects.create(id=1, name='user')
        self.doctor_role = Role.objects.create(id=3, name='doctor')
        self.specialization = Specialization.objects.create(
            name='Test Specialization')

        self.user = User.objects.create_user(
            email='user@example.com',
            first_name='John',
            last_name='Doe',
            patronymic_name='Patron',
            city='CityName',
            password='password123',
            role=self.user_role

        )

        self.doctor = Doctor.objects.create(
            email='doctor@example.com',
            first_name='Doctor',
            last_name='Strange',
            patronymic_name='Patron',
            city='CityName',
            specialization=self.specialization,
            role=self.doctor_role
        )

        self.service = Service.objects.create(
            name='ServiceName',
            specialization=self.specialization,
            bio='Some text',
            logo='logo,jpg'
        )

        self.token = Token.objects.create(user=self.user)

    def test_create_appointment(self):
        url = reverse('appointments-list')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        data = {
            'patient': self.user.id,
            'doctor': self.doctor.id,
            'date': str(date.today()),
            'time': str(time(hour=10, minute=30)),
            'cabinet': 101,
            'service': self.service.id
        }
        self.client.force_login(self.user)
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Appointment.objects.count(), 1)

    def test_retrieve_service(self):
        url = reverse('service-detail', kwargs={'pk': self.service.id})
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.service.name)

    def test_retrieve_own_appointment(self):
        new_user = User.objects.create_user(
            email='newuser@example.com',
            first_name='Alice',
            last_name='Smith',
            patronymic_name='Patron',
            city='CityName',
            password='password123',
            role=self.user_role
        )
        new_user_token = Token.objects.create(user=new_user)

        new_appointment = Appointment.objects.create(
            patient=new_user,
            doctor=self.doctor,
            date=date.today(),
            time=time(hour=10, minute=30),
            cabinet=101,
            service=self.service
        )

        url = reverse('appointments-detail', kwargs={'pk': new_appointment.id})
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
