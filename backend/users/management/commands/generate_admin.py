from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


User = get_user_model()


class Command(BaseCommand):
    help = "Create a fake superuser with specified details"

    def handle(self, *args, **kwargs):
        user = User.objects.create_superuser(
            email="admin@healthpoint.ru",
            first_name="Admin",
            last_name="Admin",
            patronymic_name="Admin",
            city="FakeCity",
            password="admin",
        )

        self.stdout.write(self.style.SUCCESS(f"Superuser created: {user.email}"))
