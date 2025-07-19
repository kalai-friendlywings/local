from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.http import HttpResponse
from django.http import JsonResponse

def mock_profile(request):
    if request.method == "GET":
        return JsonResponse({
            "username": request.user.username,
            "email": request.user.email,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "date_joined": request.user.date_joined.isoformat(),
        })
    return JsonResponse({}, status=404)


urlpatterns = [
     path('', lambda request: HttpResponse("Hello World")),  # or use a real view
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/profile/', mock_profile),
    path("api/signup/", include("api.urls")),
    
    
    # Auth endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
