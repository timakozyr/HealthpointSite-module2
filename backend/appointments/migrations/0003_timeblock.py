# Generated by Django 4.2.7 on 2024-01-17 09:29

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("appointments", "0002_alter_appointment_doctor"),
    ]

    operations = [
        migrations.CreateModel(
            name="TimeBlock",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("start_time", models.TimeField()),
            ],
        ),
    ]
