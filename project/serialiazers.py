from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from project.models import Todo, Project


class ProjectModelSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = 'id', 'name', 'url', 'users'


class TodoModelSerializer(ModelSerializer):

    class Meta:
        model = Todo
        fields = 'id', 'project', 'text', 'created_at', 'updated_at', 'user', 'is_active'
