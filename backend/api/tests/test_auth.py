# api/tests/test_auth.py

from django.test import TestCase
from django.urls import reverse

class LoginTestCase(TestCase):
    def test_login_page_status_code(self):
        url = reverse('token_obtain_pair')
 # make sure 'login' is the correct URL name
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
