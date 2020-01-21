import graphene
from graphene_django import DjangoObjectType

from .models import Users
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.db import transaction
import copy

class UsersType(DjangoObjectType):
    class Meta:
        model = Users

def check_and_set_field(input_data, instance, field_name):
    value = input_data.get(field_name, None)
    if value is not None:
        setattr(instance, field_name, value)

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

class CreateUser(graphene.Mutation):
    user = graphene.Field(UsersType)

    class Arguments:
        userInput = InputUser(required=True)

    def mutate(self, info, userInput):
        user = Users(
            username = userInput['username'],
            first_name = userInput['firstName'],
            last_name = userInput['lastName'],
            email = userInput['email'],
        )
        user.set_password(userInput['password'])
        user.save()

        return CreateUser(user=user)

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
            raise Exception("Not logged in :(")

        model = get_user_model()
        user_detail = get_object_or_404(model, pk=user_id)
        copy_user_detail = copy.copy(user_detail)

        user_detail.delete()
        
        return DeleteUser(
            copy_user_detail
        )


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()
