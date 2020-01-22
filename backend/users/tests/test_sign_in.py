import json
from django.test import TestCase
from users.models import Users

def test_db():

    testUser = Users.objects.create(
        username = "TestUser",
        first_name = "John",
        last_name = "Doe",
        email = "authmebro@yandex.com"
    )
    testUser.set_password("ankara2020")
    testUser.save()
    # print("testUser details ", testUser.id, testUser.username)

class UserCrudTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_db() 
   
   ######################################

    #SignIn