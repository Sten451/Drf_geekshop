from rest_framework.viewsets import ModelViewSet

from project.models import Project, Todo
from project.serialiazers import ProjectModelSerializer, TodoModelSerializer
from rest_framework.pagination import LimitOffsetPagination
from django_filters import rest_framework as filter
from rest_framework.response import Response
from rest_framework import status


# Пагинация
class ProjectPagination(LimitOffsetPagination):
    default_limit = 10

class TODOPagination(LimitOffsetPagination):
    default_limit = 20

#фильтрация
class ProjectFilter(filter.FilterSet):
    name = filter.CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = ['name']

class TodoFilter(filter.FilterSet):

    class Meta:
        model = Todo
        fields = ['project']

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TODOPagination
    filterset_class = TodoFilter

    """def destroy(self, request, *args, **kwargs):
        todo3 = self.get_object()
        if todo3.is_active == True:
            todo3.is_active = False
            todo3.save()
        return Response(status=status.HTTP_202_ACCEPTED)"""

