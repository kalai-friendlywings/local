from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.utils import timezone
from django.contrib.auth import get_user_model

User = settings.AUTH_USER_MODEL


# Custom User model
class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    contact = models.CharField(max_length=20, unique=True, null=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # Last profile update

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username


# Address model
class Address(models.Model):
    ADDRESS_TYPES = [
        ('Home', 'Home'),
        ('Work', 'Work'),
        ('Other', 'Other'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='addresses')
    type = models.CharField(max_length=5, choices=ADDRESS_TYPES)
    username = models.CharField(max_length=100)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=15)
    houseNo = models.CharField(max_length=255)
    state = models.CharField(max_length=100, default='Tamil Nadu')
    city = models.CharField(max_length=100)
    village = models.CharField(max_length=100, blank=True)
    pinCode = models.CharField(max_length=10)
    default = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # If this address is being set as default, unset others
        if self.default:
            Address.objects.filter(user=self.user, default=True).exclude(pk=self.pk).update(default=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.type} - {self.houseNo}, {self.city}, {self.pinCode}"


# User Settings model
class UserSettings(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='settings')
    dark_mode = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username}'s Settings"


# Order model
User = get_user_model()

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order #{self.id} - {self.user.email}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product_id = models.PositiveIntegerField()
    product_name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity}x {self.product_name} (Order #{self.order.id})"
