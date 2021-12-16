from django.shortcuts import render

from rest_framework.viewsets import GenericViewSet
from .models import Users
from .serialiazers import UsersModelSerializer, UsersModelSerializerNewVersion
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin

class UsersModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'ver2':
            return UsersModelSerializerNewVersion
        return UsersModelSerializer