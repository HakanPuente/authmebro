import json
from django.test import TestCase
from users.models import Users


def test_db():

    testUser = Users.objects.create(
        username="TestUser1",
        first_name="John",
        last_name="Doe",
        email="authmebro@yandex.com",
    )
    testUser.set_password("ankara2020")
    testUser.save()
    # print("testUser details ", testUser.id, testUser.username)


class UserCrudTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_db()

    ######################################

    # ForgotPassword

    def test_forgot_password(self):
        print("-ForgotPassword-")

        query = """
            mutation FORGOT_PASSWORD{forgotPassword(
                data:{
                    email:"authmebro@yandex.com"
                }
            )
                {
                    userDetails
                    }
                }
            """

        self.client.login(username="TestUser1", password="ankara2020")
        response = self.client.post("/graphql/", {"query": query,})
        # print("---response create user ", response.content)

        self.assertEqual(response.status_code, 200)
