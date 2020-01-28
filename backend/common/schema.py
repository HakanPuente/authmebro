import graphene
from graphene_django import DjangoObjectType

from .models import Users


class UsersType(DjangoObjectType):
    class Meta:
        model = Users
