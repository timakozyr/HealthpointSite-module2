import random

from django.core.management.base import BaseCommand
from faker import Faker

from appointments.models import Appointment
from doctors.models import Doctor
from roles.models import Role
from services.models import Service
from specializations.models import Specialization
from users.models import User

fake = Faker("ru_RU")


class Command(BaseCommand):
    help = "Generates dummy data for Appointments"

    def handle(self, *args, **options):
        self.stdout.write("Generating dummy appointments")

        for _ in range(40):
            User.objects.create_user(
                email=fake.email(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                patronymic_name=fake.first_name(),
                city=fake.city(),
                password="password",
            )

        total_users_count = User.objects.count()

        offset = random.randint(0, total_users_count - 20)
        users = User.objects.all()[offset: offset + 20]

        if not Doctor.objects.exists():
            specializations = Specialization.objects.all()
            for user in users:
                user.role = Role.objects.get(name="doctor")
                user.save()
                Doctor.objects.create(
                    user=user,
                    specialization=random.choice(specializations),
                )

        users = User.objects.all()
        doctors = Doctor.objects.all()
        services = Service.objects.all()

        for _ in range(10):
            random_user = random.choice(users)
            random_doctor = random.choice(doctors)
            random_service = random.choice(services)
            appointment_date = fake.date_between(start_date="+1d",
                                                 end_date="+30d")
            appointment_time = fake.time(pattern="%H:%M:%S", end_datetime=None)
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
            self.style.SUCCESS("Dummy appointments generated successfully!")
        )
