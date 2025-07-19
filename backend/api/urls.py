# api/urls.py
from django.urls import path,  include
from rest_framework.routers import DefaultRouter
from .views import AddressViewSet
from .views import UserDeleteView,OrderListView, RateOrderView
from . import views  # Make sure you import views
from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    ProfileView,
    UserSettingsView,
    AddressViewSet, 
    VerifyTokenView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'addresses', AddressViewSet, basename='address')


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', ProfileView.as_view()),
    path("signup/", RegisterView.as_view(), name="signup"),
    path('settings/', UserSettingsView.as_view(), name='settings'),
    path('addresses/set_default/', views.SetDefaultAddress.as_view(), name='set-default-address'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('users/me/', UserDeleteView.as_view(), name='user-delete'),
     path('orders/', OrderListView.as_view(), name='order-list'),
     path('verify-token/', VerifyTokenView.as_view(), name='verify-token'),
    path('orders/<int:pk>/rate/', RateOrderView.as_view(), name='rate-order'),
] + router.urls


