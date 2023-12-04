from django.core.management.base import BaseCommand

from faker import Faker
from specializations.models import Specialization

fake = Faker()


class Command(BaseCommand):
    help = 'Generates dummy data for Services'

    def handle(self, *args, **options):
        self.stdout.write("Generating dummy specializations")

        SPECIALIZATION_CHOICES = [
            'Кардиология',
            'Онкология',
            'Педиатрия',
            'Неврология',
            'Гастроэнтерология',
            'Ортопедия и травматология',
            'Гинекология',
            'Эндокринология',
            'Психиатрия',
            'Ревматология',
        ]

        for _ in range(len(SPECIALIZATION_CHOICES)):
            name = SPECIALIZATION_CHOICES[_]
            description = fake.text()

            Specialization.objects.create(
                name=name,
                description=description
            )
