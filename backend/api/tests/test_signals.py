from django.test import TestCase
from django.contrib.auth import get_user_model
from api.models import Profile, UserSettings

User = get_user_model()

class SignalTestCase(TestCase):
    def test_profile_and_settings_created_on_user_creation(self):
        user = User.objects.create_user(username="signaluser", password="testpass123")
        self.assertTrue(Profile.objects.filter(user=user).exists())
        self.assertTrue(UserSettings.objects.filter(user=user).exists())
