from django.db import models

class Profiles(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    skills = models.CharField(max_length=500, blank=True)
    avatar = models.URLField(max_length=2000)

    def __str__(self):
        return self.name