from django.core.management.base import BaseCommand
from faker import Faker

from roles.models import Role


fake = Faker()


class Command(BaseCommand):
    help = "Generates dummy data for Roles"

    def handle(self, *args, **options):
        self.stdout.write("Generating dummy specializations")

        ROLES_CHOICES = [
            "user",
            "admin",
            "doctor",
        ]

        for _ in range(len(ROLES_CHOICES)):
            name = ROLES_CHOICES[_]

            Role.objects.create(name=name)
