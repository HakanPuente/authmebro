import json
from django.test import TestCase
from users.models import Users

def test_db():

    testUser = Users.objects.create(
        username = "TestUser1",
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

    #SignUp

    def test_signup(self):
        print("-SignUp-")

        numOfUserBefore = len(Users.objects.all())
        # print("numOfUSER-Before create : ", numOfUserBefore)

        query = '''
            mutation SIGNUP{signUp(data:{
                firstName:"John"
                lastName:"Doe"
                username:"TestUser2"
                password:"ankara2020"
                email:"hakan@atxanka.io"
                }
                )
                {
                    user{
                            id
                            username
                        }
                }
            }
        '''       
        self.client.login(username='TestUser1', password='ankara2020')
        response = self.client.post('/graphql/', {'query': query,})
        # print("---response create user ", response.content)

        self.assertEqual(response.status_code, 200)

        decoded = json.loads(response.content)
        # print('decoded---------- ********** ', decoded)
        numOfUserAfter = len(Users.objects.all())
        # print("numOfUSER-After create : ", numOfUserAfter)
        self.assertEqual(numOfUserBefore +1, numOfUserAfter)
        self.assertEqual(decoded['data']['signUp']['user']['username'], 'TestUser2')
