from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(email=self.normalize_email(email),)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        
        user = self.create_user(email,password=password,)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        if self.pk is None:
            self.set_password(self.password) #Encripta la contraseña
        super().save(*args, **kwargs)
