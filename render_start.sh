#!/bin/bash
set -e

echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Seeding database..."
python seed_db.py

echo "Creating superuser..."
python create_superuser.py

echo "Starting server..."
daphne -b 0.0.0.0 -p $PORT config.asgi:application
