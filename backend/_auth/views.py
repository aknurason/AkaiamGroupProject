from _auth.serializers import UserSerializer
from api.models import Cart, Product
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt import views as jwt_views


@api_view(['POST'])
def register_user(request):
    ser = UserSerializer(data=request.data)
    if (ser.is_valid()):
        ser.save()
        cart = Cart.objects.create(user=ser.instance)
        return Response(ser.data, status=status.HTTP_201_CREATED)
    return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginViewJWT(jwt_views.ObtainJSONWebToken):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            try:
                user = User.objects.get(username=request.data['username'])
                ser = UserSerializer(user)
                response.data.update(
                    {**ser.data, 'expiresIn': '1000000'})
            except User.DoesNotExist as e:
                return Response({'error': str(e)}, status=400)
        return response


class RefreshTokenViewJWT(jwt_views.RefreshJSONWebToken):

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
