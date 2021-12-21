import graphene
from graphene import String, Int, List, ID
from graphene_django import DjangoObjectType

from users.models import Users
from project.models import  Project, Todo

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class UserType(DjangoObjectType):
    class Meta:
        model = Users
        fields = '__all__'

class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'

class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)
    all_project = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    user_by_username = graphene.Field(UserType, username=String(required=True))
    todo_delete = graphene.List(TodoType, id=Int(required=True))

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return Users.objects.all()

    def resolve_user_by_username(self, info, username):
        try:
            return Users.objects.get(username=username)
        except Users.DoesNotExist:
            return None

    def resolve_todo_delete(self, info, id):
        try:
            todo = Todo.objects.get(id=id).delete()
        except Todo.DoesNotExist:
            return Todo.objects.all()
        return Todo.objects.all()


#создание
class TodoCreateMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=True)
        project = graphene.String(required=True)
        from_user_id = graphene.Int(required=True)
        is_active = graphene.Boolean(required=True)

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, text, name, from_user_id, is_active):
        project = Project.objects.get(name=name)
        from_user = Users.objects.get(id=from_user_id)
        todo = Todo.objects.create(text=text, project=project, user=from_user, is_active=is_active)
        return TodoCreateMutation(todo=todo)

#создание проекта
class ProjectCreateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        url = graphene.String(required=True)
        users = graphene.List(String)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, url, users):
        project = Project.objects.create(name=name, url=url)
        project.users.set(users)
        return ProjectCreateMutation(project=project)

#апдейт
class TodoUpdMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        text = graphene.String(required=True)

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, text, id):
        todo = Todo.objects.get(id=id)
        todo.text = text
        todo.save()
        return TodoUpdMutation(todo=todo)


#общее
class Mutation(graphene.ObjectType):
    update_todo = TodoUpdMutation.Field()
    create_todo = TodoCreateMutation.Field()
    project_create = ProjectCreateMutation.Field()


schema = graphene.Schema(query=Query,mutation=Mutation)