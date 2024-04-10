#!/bin/bash

rm db.sqlite3

python3 manage.py makemigrations

python3 manage.py migrate

python3 manage.py generate_roles

python3 manage.py generate_specializations

python3 manage.py generate_services

python3 manage.py generate_appointments

python3 manage.py generate_admin

echo "All commands executed."
