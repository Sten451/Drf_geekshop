from rest_framework.serializers import ModelSerializer
from .models import Users

class UsersModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = 'id', 'username', 'first_name', 'last_name', 'email'

class UsersModelSerializerNewVersion(ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')