from django.test import TestCase

from services.models import Service
from specializations.models import Specialization


class ServiceModelTest(TestCase):
    def setUp(self):
        self.specialization = Specialization.objects.create(name="Test Specialization")

    def create_service(self):
        return Service.objects.create(
            name="Test Service",
            specialization=self.specialization,
            bio="Test bio for service",
            logo="logo.jpg",
        )

    def test_retrieve_service(self):
        service = self.create_service()
        retrieved_service = Service.objects.get(name="Test Service")

        self.assertEqual(service.name, retrieved_service.name)
