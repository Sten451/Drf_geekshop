from django.core.management.base import BaseCommand

from project.models import Project
from users.models import Users

class Command(BaseCommand):
    def handle(self, *args, **options):
        Users.objects.all().delete()
        super_user = Users.objects.create_superuser(username='sten451', email='rgka17@gmail.com', password='1')
        #Project.objects.create(name='test678', url='https://wonder-day.com/raskraski-kukly-lol/', users='[sten451,]')
