from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from .models import Users
from .serialiazers import UsersModelSerializer

class UsersModelViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer
