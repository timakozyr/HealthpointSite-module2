import random
from datetime import datetime, timedelta

from django.core.management.base import BaseCommand
from faker import Faker
from russian_names import RussianNames

from appointments.models import Appointment, TimeBlock
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
            first_name, patronymic_name, last_name = (
                RussianNames().get_person().split(" ")
            )

            User.objects.create_user(
                email=fake.email(),
                first_name=first_name,
                last_name=last_name,
                patronymic_name=patronymic_name,
                city=fake.city(),
                password="password",
            )

        total_users_count = User.objects.count()

        offset = random.randint(0, total_users_count - 20)
        users = User.objects.all()[offset : offset + 20]

        if not Doctor.objects.exists():
            specializations = Specialization.objects.all()
            for user in users:
                user.role = Role.objects.get(name="doctor")
                user.save()
                Doctor.objects.create(
                    user=user,
                    specialization=random.choice(specializations),
                )

        users = User.objects.filter(role=Role.objects.get(name="user"))
        doctors = Doctor.objects.all()

        start_time = datetime.strptime("10:00", "%H:%M").time()
        end_time = datetime.strptime("17:00", "%H:%M").time()
        current_time = datetime.combine(datetime.today(), start_time)
        interval = timedelta(minutes=30)

        while current_time.time() <= end_time:
            TimeBlock.objects.create(start_time=current_time.time())
            current_time += interval

        for _ in range(100):
            random_user = random.choice(users)
            random_doctor = random.choice(doctors)
            services = Service.objects.filter(
                specialization=random_doctor.specialization
            )
            random_service = random.choice(services)
            appointment_date = fake.date_between(
                start_date="+1d", end_date="+30d"
            )
            appointment_time = TimeBlock.objects.order_by("?").first()
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
