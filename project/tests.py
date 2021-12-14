from django.test import TestCase
from rest_framework import status

from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User

from project.views import TodoModelViewSet, ProjectModelViewSet
from project.models import Project, Todo
from users.models import Users


class TestTodoProject(TestCase):

    def setUp(self) -> None:
        self.name = 'Sten'
        self.email = 'Sten451@list.ru'
        self.password = 'qwerty'
        self.todo_url = 'api/todo'
        self.project_url = 'api/project'
        self.url = '/api/users/'
        self.administrator = Users.objects.create_superuser(self.name, self.email, self.password)
        self.data = { "project": "http://127.0.0.1:8000/api/project/6/", "text": "заметка", "user": "http://127.0.0.1:8000/api/users/5/", "is_active": "false"}
        self.data_change = { "project": "http://127.0.0.1:8000/api/project/6/", "text": "заметка new", "user": "http://127.0.0.1:8000/api/users/5/", "is_active": "false"}
        self.data_u = {'username': 'test', 'password': '1', 'email': 'rgka7@gmail.ru', 'first_name': 'gray', 'last_name': 'tom'}
        self.data_put_u = {'username': 'test', 'email': 'lvv_1@mail.ru', 'first_name': 'klive', 'last_name': 'T'}

    def test_todo_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.todo_url)
        view = TodoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_project_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.project_url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_user(self):
        client = APIClient()
        user = Users.objects.create(**self.data_u)
        response = client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_client_todo_list(self):
        todo = mixer.blend(Todo)
        client = APIClient()
        response = client.get(f'{self.todo_url}{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_edit_admin(self):
        client = APIClient()
        user = Users.objects.create(**self.data_u)
        client.login(username='test', password='1')
        response = client.put(f'{self.url}{user.id}/', self.data_put_u)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_updated = Users.objects.get(id=user.id)
        self.assertEqual(user_updated.username, 'test')
        self.assertEqual(user_updated.email, 'lvv_1@mail.ru')
        self.assertEqual(user_updated.first_name, 'klive')
        self.assertEqual(user_updated.last_name, 'T')
        client.logout()

    def tearDown(self) -> None:
        pass


class TestTodoProjectAPITestCase(APITestCase):
    def setUp(self):
        self.todo_url = '/api/todo/'
        self.project_url = '/api/project/'
        self.admin = Users.objects.create_superuser('sten', 'rgka17@gmail.com', '1')
        self.username = 'sten'
        self.password = '1'
        self.test_data_project = {'name': 'project_test', 'url': 'http://127.0.0.1:8000/api/todo/46/', "users": [1]}

    def test_get_todo(self):
        response = self.client.get(self.todo_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.post(self.project_url, self.test_data_project)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)