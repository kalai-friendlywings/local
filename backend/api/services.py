import requests

MERCHANT_API_BASE_URL = "http://localhost:8001/api"  # Project B's running URL

def get_merchants():
    """Fetch all merchants from Merchant Dashboard API."""
    try:
        response = requests.get(f"{MERCHANT_API_BASE_URL}/merchants/")
        response.raise_for_status()  # Raise error for non-200
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching merchants: {e}")
        return []

def get_merchant_detail(merchant_id):
    """Fetch single merchant details."""
    try:
        response = requests.get(f"{MERCHANT_API_BASE_URL}/merchants/{merchant_id}/")
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching merchant detail: {e}")
        return None
