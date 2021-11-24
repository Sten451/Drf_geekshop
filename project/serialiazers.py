from rest_framework.serializers import HyperlinkedModelSerializer
from project.models import Todo, Project


class ProjectModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Project
        fields = 'name', 'url', 'users'


class TodoModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Todo
        fields = 'project', 'text', 'created_at', 'updated_at', 'user', 'is_active'
