import logging
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import UserSettings

logger = logging.getLogger(__name__)
User = get_user_model()

@receiver(post_save, sender=User)
def create_user_settings(sender, instance, created, **kwargs):
    if created:
        try:
            UserSettings.objects.create(user=instance)
        except Exception as e:
            logger.error(f"[Signal Error] Failed to create UserSettings for user {instance.id}: {str(e)}")
