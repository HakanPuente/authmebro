from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class Users(AbstractUser):
    # pass
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.CharField(max_length=100, null=True, unique=True)

    def __str__(self):
        return '{} {}'.format(self.id, self.username)
