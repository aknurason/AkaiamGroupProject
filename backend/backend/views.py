from rest_framework_jwt import views as jwt_views
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User


@permission_classes([AllowAny])
class UserLoginViewJWT(jwt_views.ObtainJSONWebToken):
    # user_serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            try:
                user = User.objects.get(username=request.data['username'])
                response.data.update(
                    {'username': user.username, 'expiresIn': '1000000'})
            except User.DoesNotExist as e:
                return Response({'error': str(e)}, status=400)
        return response


@permission_classes([AllowAny])
class RefreshTokenViewJWT(jwt_views.RefreshJSONWebToken):
    # user_serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            try:
                user = User.objects.get(username=request.data['username'])
                response.data.update(
                    {'username': user.username, 'expiresIn': '1000000'})
            except User.DoesNotExist as e:
                return Response({'error': str(e)}, status=400)
        return response
