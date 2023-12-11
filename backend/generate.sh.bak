#!/bin/bash

rm db.sqlite3

python manage.py makemigrations

python manage.py migrate

python manage.py generate_roles

python manage.py generate_specializations

python manage.py generate_services

python manage.py generate_appointments

python manage.py generate_admin

echo "All commands executed."
