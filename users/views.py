from django.shortcuts import render

from rest_framework.viewsets import GenericViewSet
from .models import Users
from .serialiazers import UsersModelSerializer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin

class UsersModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer
