from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
from .views import MerchantProductList
router = DefaultRouter()
router.register(r'addresses', views.AddressViewSet, basename='address')

urlpatterns = [
    # Auth / user management
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.CustomTokenObtainPairView.as_view(), name='custom_login'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('settings/', views.UserSettingsView.as_view(), name='settings'),
    path('users/me/', views.UserDeleteView.as_view(), name='user-delete'),

    # JWT official endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Addresses
    path('addresses/set_default/', views.SetDefaultAddress.as_view(), name='set-default-address'),

    # Orders
    path('orders/', views.OrderListView.as_view(), name='order-list'),
    path('orders/<int:pk>/rate/', views.RateOrderView.as_view(), name='rate-order'),
    path('create-order/', views.create_order_view, name='create-order'),

    # Merchants & Products
    

    # Token verification
    path('verify-token/', views.VerifyTokenView.as_view(), name='verify-token'),

    path('merchant-products/', MerchantProductList.as_view(), name="merchant-products"),
] + router.urls
