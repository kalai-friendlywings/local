import requests
from django.conf import settings

MERCHANT_API_BASE = settings.MERCHANT_API_BASE
MERCHANT_API_LOGIN = settings.MERCHANT_API_LOGIN
MERCHANT_API_PASSWORD = settings.MERCHANT_API_PASSWORD

TOKEN_CACHE = {
    "access": None,
    "refresh": None
}

def get_jwt_token():
    global TOKEN_CACHE
    if TOKEN_CACHE["access"]:
        return TOKEN_CACHE["access"]
    url = f"{MERCHANT_API_BASE}/api/token/"
    payload = {"username": MERCHANT_API_LOGIN, "password": MERCHANT_API_PASSWORD}
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        data = response.json()
        TOKEN_CACHE["access"] = data["access"]
        TOKEN_CACHE["refresh"] = data["refresh"]
        return TOKEN_CACHE["access"]
    else:
        raise Exception("Failed to authenticate with Merchant API")

def refresh_jwt_token():
    global TOKEN_CACHE
    url = f"{MERCHANT_API_BASE}/api/token/refresh/"
    payload = {"refresh": TOKEN_CACHE["refresh"]}
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        TOKEN_CACHE["access"] = response.json()["access"]
        return TOKEN_CACHE["access"]
    else:
        TOKEN_CACHE["access"] = None
        return get_jwt_token()

def _request(method, path, **kwargs):
    token = get_jwt_token()
    headers = kwargs.pop("headers", {})
    headers["Authorization"] = f"Bearer {token}"
    url = f"{MERCHANT_API_BASE}{path}"
    response = requests.request(method, url, headers=headers, **kwargs)
    if response.status_code == 401:
        token = refresh_jwt_token()
        headers["Authorization"] = f"Bearer {token}"
        response = requests.request(method, url, headers=headers, **kwargs)
    response.raise_for_status()
    if response.status_code == 204:
        return None
    return response.json()

def merchant_api_get(path, params=None):
    return _request("GET", path, params=params)

def merchant_api_post(path, data=None, json=None, files=None):
    return _request("POST", path, data=data, json=json, files=files)

def merchant_api_put(path, data=None, json=None, files=None):
    return _request("PUT", path, data=data, json=json, files=files)

def merchant_api_delete(path):
    return _request("DELETE", path)


# ------------------------------
# New: Fetch full dataset
# ------------------------------
def fetch_full_dataset():
    """
    Fetch merchants, their products, and categories in a single structure.
    """
    categories = merchant_api_get("/api/categories/")
    merchants = merchant_api_get("/api/merchants/")

    full_data = []
    for merchant in merchants:
        merchant_id = merchant["id"]
        products = merchant_api_get(f"/api/products/?merchant_id={merchant_id}")

        for product in products:
            category_id = product.get("category_id")
            product["category"] = next((cat for cat in categories if cat["id"] == category_id), None)

        merchant["products"] = products
        full_data.append(merchant)

    return full_data
