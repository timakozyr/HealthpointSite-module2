# Generated by Django 4.2.7 on 2024-01-17 09:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("appointments", "0003_timeblock"),
    ]

    operations = [
        migrations.AlterField(
            model_name="appointment",
            name="time",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="appointments.timeblock",
            ),
        ),
    ]