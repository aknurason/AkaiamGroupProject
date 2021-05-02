from django.urls import path
from .views import UserLoginViewJWT, RefreshTokenViewJWT, register_user

urlpatterns = [
    path('login/', UserLoginViewJWT.as_view()),
    path('refresh/', RefreshTokenViewJWT.as_view()),
    path('register/', register_user)
]
