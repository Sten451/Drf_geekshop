from users.models import Users

super_user = Users.objects.create_superuser(username='sten451', email='rgka17@gmail.com', password='1')
user1 = Users.objects.create_user(username='max', email='sdf@mail.ru', password='12')
user2 = Users.objects.create_user(username='vlad', email='sd2f@mail.ru', password='13')
user3 = Users.objects.create_user(username='katy', email='sdf3@mail.ru', password='12')
