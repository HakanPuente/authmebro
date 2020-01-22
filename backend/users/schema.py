import graphene
from graphene_django import DjangoObjectType
from .models import Users
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.db import transaction
import copy
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .tokens import TokenGenerator
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.conf import settings
import html2text


class UsersType(DjangoObjectType):
    class Meta:
        model = Users

def check_and_set_field(input_data, instance, field_name):
    value = input_data.get(field_name, None)
    if value is not None:
        setattr(instance, field_name, value)

class EmailNotification:
    
    email_from = settings.EMAIL_HOST_USER

    def send(self, recipient_list, subject, message):
        send_mail(subject, html2text.html2text(message), 'Family Economy <fameco2020@yandex.com.tr>', recipient_list, html_message=message)

class Query(graphene.ObjectType):
    users = graphene.List(UsersType)

    def resolve_users(self, info, **kwargs):
        user = info.context.user or None
        if user.is_anonymous:
            raise Exception('Please log in!..')

        return Users.objects.all()

class InputUser(graphene.InputObjectType):
        id=graphene.ID()
        username = graphene.String()
        firstName = graphene.String()
        lastName = graphene.String()
        password = graphene.String()
        email = graphene.String()

class SignUp(graphene.Mutation):
    user = graphene.Field(UsersType)

    class Arguments:
        data = InputUser(required=True)

    def mutate(self, info, data):
        user = Users.objects.create(
            username=data.get('username', None),
            first_name=data.get('firstName', None),
            last_name=data.get('lastName', None),
            email=data.get('email', None)
        )
        password = data.get('password', None)
        if password is not None:
            user.set_password(password)

        user.save()

        domain = 'http://localhost:8000'
        mail_subject = 'Auth Me Bro | Activate Your Account'
        account_activation_token = PasswordResetTokenGenerator()
        uid = user.id 
        token = account_activation_token.make_token(user)
        message = render_to_string('acc_active_email.html', {
            'user': user,
            'url': f'{domain}/auth/activate?uid={uid}&token={token}'
        })
        recipient_list = [user.email]
        EmailNotification().send(recipient_list, mail_subject, message)

        return SignUp(user)

class UpdateUser(graphene.Mutation):
    id = graphene.ID(required=True)
    firstName = graphene.String()
    lastName = graphene.String()
    username = graphene.String()
    email = graphene.String()
    
    class Arguments:
        data = InputUser(required=True)

    def mutate(self, info, data):
        user = info.context.user or None
        if user.is_anonymous:
            raise Exception('Please log in!')
        
        model = get_user_model()
        with transaction.atomic():
            user_detail = get_object_or_404(model, id=data["id"])

            check_and_set_field(data, user_detail, 'firstName')
            check_and_set_field(data, user_detail, 'lastName')
            check_and_set_field(data, user_detail, 'username')
            check_and_set_field(data, user_detail, 'email')

            password = data.get('password', None)
            if password is not None:
                user_detail.set_password(password)

            user_detail.save()

        return UpdateUser(
            id = user_detail.id,
            firstName = user_detail.first_name,
            lastName = user_detail.last_name,
            username = user_detail.username,
            email = user_detail.email,
        )

class DeleteUser(graphene.Mutation):
    user = graphene.Field(UsersType)

    class Arguments:
        user_id = graphene.ID(required=True)

    def mutate(self, info, user_id):
        user = info.context.user or None
        if user.is_anonymous:
            raise Exception("Not logged in!")

        model = get_user_model()
        user_detail = get_object_or_404(model, pk=user_id)
        copy_user_detail = copy.copy(user_detail)

        user_detail.delete()
        
        return DeleteUser(
            copy_user_detail
        )

class ForgotPasswordInput(graphene.InputObjectType):
    email = graphene.String()

class ForgotPassword(graphene.Mutation):
    userDetails = graphene.String(required=True)

    class Arguments:
        data = ForgotPasswordInput(required=True)

    def mutate(self, info, data):
        user = get_object_or_404(Users, email=data.email)

        user.save()

        domain = "https://localhost:8000"
        mail_subject = 'Reset Password'
        account_activation_token = TokenGenerator()
        uid = user.id
        token = account_activation_token.make_token(user)
        message = render_to_string('acc_forgotten_password.html', {
            'user' : user,
            'url' : f'{domain}/auth/new_password?uid={uid}&token={token}'
        })
        recipient_list = [user.email]
        EmailNotification().send(recipient_list, mail_subject, message)

        return ForgotPassword(user)

class ConfirmNewPasswordInput(graphene.InputObjectType):
    uid = graphene.String()
    token = graphene.String()
    password = graphene.String()
    username = graphene.String(required=True)

class ConfirmNewPassword(graphene.Mutation):
    uid = graphene.String()
    email = graphene.String()
    token = graphene.String()
    password = graphene.String()
    username = graphene.String()

    class Arguments:
        data = ConfirmNewPasswordInput(required=True)

    def mutate(self, info, data):
        user = get_object_or_404(Users, id=data.uid)
    
        if user is not None:
            if TokenGenerator().check_token(user, data.token):
                password = data.get('password', None)
                if password is not None:
                    user.set_password(password)

            user.save()
            return user    
        
        raise GraphQLError("User is None, please check!..")


class Mutation(graphene.ObjectType):
    sign_up = SignUp.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()
    forgot_password = ForgotPassword.Field()
    confirm_new_password = ConfirmNewPassword.Field()