from django.core.management.base import BaseCommand
from faker import Faker
import random

from specializations.models import Specialization
from users.models import User, Doctor
from services.models import Service
from appointments.models import Appointment
from django.utils import timezone

fake = Faker()


class Command(BaseCommand):
    help = "Generates dummy data for Appointments"

    def handle(self, *args, **options):
        self.stdout.write("Generating dummy appointments")

        # Generate dummy users, doctors, and services if not already existing
        if not User.objects.exists():
            for _ in range(5):
                User.objects.create_user(
                    email=fake.email(),
                    first_name=fake.first_name(),
                    last_name=fake.last_name(),
                    patronymic_name=fake.first_name(),
                    city=fake.city(),
                    password='password',  # Set default password
                )

        if not Doctor.objects.exists():
            specializations = Specialization.objects.all()
            users = User.objects.all()
            for user in users:
                Doctor.objects.create(
                    user=user,
                    specialization=random.choice(specializations),
                )

        if not Service.objects.exists():
            specializations = Specialization.objects.all()
            for specialization in specializations:
                services = ['Service A', 'Service B', 'Service C']
                for service_name in services:
                    Service.objects.create(
                        name=service_name,
                        specialization=specialization,
                        bio=fake.text(),
                    )

        users = User.objects.all()
        doctors = Doctor.objects.all()
        services = Service.objects.all()

        for _ in range(10):
            random_user = random.choice(users)
            random_doctor = random.choice(doctors)
            random_service = random.choice(services)
            appointment_date = fake.date_between(start_date='+1d',
                                                 end_date='+30d')
            appointment_time = fake.time(pattern='%H:%M:%S', end_datetime=None)
            cabinet_number = fake.random_int(min=1, max=10)

            Appointment.objects.create(
                patient=random_user,
                doctor=random_doctor,
                date=appointment_date,
                time=appointment_time,
                cabinet=cabinet_number,
                service=random_service,
            )

        self.stdout.write(
            self.style.SUCCESS("Dummy appointments generated successfully!"))
