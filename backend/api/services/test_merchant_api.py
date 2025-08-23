# api/services/test_merchant_api.py
import os
import django
import json
import requests
from django.contrib.auth import get_user_model
from django.conf import settings

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "merchant_backend.settings")
django.setup()

User = get_user_model()

# --- CONFIG ---
BASE_URL = "http://127.0.0.1:8000"  # Change if your server runs elsewhere
TEST_USER_EMAIL = "merchant@example.com"
TEST_USER_PASSWORD = "testpass123"

# List of GET endpoints to test (relative to BASE_URL)
GET_ENDPOINTS = [
    "/api/merchant/profile/",
    "/api/merchant/products/",
    "/api/merchant/orders/",
    "/api/merchant/dashboard/",
    # Add more GET endpoints here
]

def get_auth_token():
    """Get JWT token for CustomUser."""
    from rest_framework_simplejwt.tokens import RefreshToken

    try:
        user = User.objects.get(email=TEST_USER_EMAIL)
    except User.DoesNotExist:
        print(f"❌ Test user {TEST_USER_EMAIL} not found. Please create it.")
        return None

    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token)

def test_get_endpoints():
    token = get_auth_token()
    if not token:
        return

    headers = {"Authorization": f"Bearer {token}"}

    for endpoint in GET_ENDPOINTS:
        url = f"{BASE_URL}{endpoint}"
        try:
            res = requests.get(url, headers=headers)
            print(f"\n🔹 GET {endpoint} — Status: {res.status_code}")
            try:
                print(json.dumps(res.json(), indent=2))
            except Exception:
                print("Response is not JSON:", res.text[:200])
        except Exception as e:
            print(f"❌ Error calling {endpoint}: {e}")

if __name__ == "__main__":
    test_get_endpoints()
