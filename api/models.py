from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    title = models.CharField(max_length=200, default='Untitled')
    author = models.CharField(max_length=200)
    status = models.CharField(max_length=50, choices=[
        ('Want to Read', 'Want to Read'),
        ('Reading', 'Reading'),
        ('Read', 'Read'),
    ])
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title