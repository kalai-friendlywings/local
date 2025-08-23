# backend/api/views.py
from rest_framework import generics, permissions, viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse  # Add this import
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model
from django.conf import settings 
import requests   
from .models import UserSettings, Address
from .serializers import (
    RegisterSerializer,
    UserProfileSerializer,
    UserSettingsSerializer,
    AddressSerializer,
    CustomTokenObtainPairSerializer,
    CustomUserSerializer
)
from .models import Order
from .serializers import OrderSerializer
import logging
import razorpay
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

logger = logging.getLogger(__name__)
User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': serializer.data,
        })


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# api/views.py
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = CustomUserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = CustomUserSerializer(
            request.user, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class UserSettingsView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSettingsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        settings, _ = UserSettings.objects.get_or_create(user=self.request.user)
        return settings

    def get_serializer_context(self):
        return {'request': self.request}


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

        if serializer.validated_data.get('default', False):
            Address.objects.filter(user=self.request.user, default=True) \
                .exclude(pk=serializer.instance.pk).update(default=False)


class SetDefaultAddress(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        new_default_id = request.data.get('new_default_id')
        if not new_default_id:
            return Response(
                {"detail": "new_default_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            Address.objects.filter(user=request.user, default=True).update(default=False)
            new_default = Address.objects.get(pk=new_default_id, user=request.user)
            new_default.default = True
            new_default.save()
            return Response({"detail": "Default address updated"}, status=status.HTTP_200_OK)

        except Address.DoesNotExist:
            return Response(
                {"detail": "Address not found or doesn't belong to user"},
                status=status.HTTP_404_NOT_FOUND
            )


class UserDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        try:
            request.user.delete()
            return Response(
                {"detail": "Account deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class OrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

class RateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk, user=request.user)
            if order.status != 'completed':
                return Response(
                    {"detail": "Only completed orders can be rated"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            rating = request.data.get('rating')
            if not rating or not (1 <= rating <= 5):
                return Response(
                    {"detail": "Rating must be between 1 and 5"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            order.rating = rating
            order.save()
            return Response(
                {"detail": "Rating submitted successfully"},
                status=status.HTTP_200_OK
            )
            
        except Order.DoesNotExist:
            return Response(
                {"detail": "Order not found"},
                status=status.HTTP_404_NOT_FOUND
            )

class VerifyTokenView(APIView):
    def get(self, request):
        try:
            auth = JWTAuthentication()
            user, _ = auth.authenticate(request)
            return Response({
                "valid": True,
                "user": user.username
            })
        except Exception as e:
            return Response({
                "valid": False,
                "error": str(e)
            }, status=401)

    
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order_view(request):
    try:
        data = json.loads(request.body)
        amount = int(data.get("amount", 0)) * 100  # amount in paise

        if amount <= 0:
            return JsonResponse({'error': 'Amount must be greater than zero'}, status=400)

        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        razorpay_order = client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": "1"
        })

        return JsonResponse({
            "order_id": razorpay_order["id"],
            "currency": razorpay_order["currency"],
            "key_id": settings.RAZORPAY_KEY_ID
        })

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

from rest_framework.views import APIView
from rest_framework.response import Response
from .services.merchant_api import merchant_api_get

class MerchantListView(APIView):
    def get(self, request):
        merchants = merchant_api_get("/api/merchants/")
        return Response(merchants)

class MerchantDetailView(APIView):
    def get(self, request, merchant_id):
        merchant = merchant_api_get(f"/api/merchants/{merchant_id}/")
        return Response(merchant)

class ProductListView(APIView):
    def get(self, request):
        try:
            response = requests.get(f"{settings.MERCHANT_API_BASE}/api/merchant/products/")
            response.raise_for_status()
            products = response.json()
            return Response(products)
        except requests.RequestException as e:
            return Response({"error": f"Failed to fetch products: {str(e)}"}, status=500)

MERCHANT_API_URL = "http://localhost:8001/api/products/"

class MerchantProductList(APIView):
    def get(self, request):
        query = request.query_params.get("query", "")
        loc = request.query_params.get("location", "")

        params = {}
        if query:
            params["search"] = query
        if loc:
            params["location"] = loc

        response = requests.get(MERCHANT_API_URL, params=params)
        return Response(response.json())