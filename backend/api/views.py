from re import I
from api.models import Cart, CartItem, Category, Order, Product
from rest_framework_jwt import views as jwt_views
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.contrib.auth.models import User
from .serializers import CartItemSerializer, CartSerializer, CategorySerializer, OrderSerializer, ProductSerializer


# Create your views here.

@api_view(['GET', 'POST'])
def category_list(request):
    if (request.method == 'GET'):
        categories = Category.objects.all()
        ser = CategorySerializer(categories, many=True)
        return Response(ser.data)
    elif (request.method == 'POST'):
        ser = CategorySerializer(data=request.data)
        if (ser.is_valid()):
            ser.save()
            return Response(ser.data, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


def get_category_object(id):
    try:
        return Category.objects.get(id=id)
    except Category.DoesNotExist:
        raise Http404


@api_view(['GET', 'PUT', 'DELETE'])
def category_details(request, id):

    if (request.method == 'GET'):
        category = get_category_object(id)
        ser = CategorySerializer(category)
        return Response(ser.data)
    elif (request.method == 'PUT'):
        category = get_category_object(id)
        ser = CategorySerializer(category, data=request.data)
        if (ser.is_valid()):
            ser.save()
            return Response(ser.data, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
    elif (request.method == 'DELETE'):
        category = get_category_object(id)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


class ProductList(APIView):
    def get(self, request, format=None):
        category_id = request.query_params.get('categoryId')
        products = Product.objects.all()
        if (category_id != None):
            products = Product.objects.filter(category__id=category_id)
        serializer = ProductSerializer(
            products, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProductSerializer(
            data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetails(APIView):

    def get_obj(self, id):
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        product = self.get_obj(id)
        serializer = ProductSerializer(product, context={"request": request})
        return Response(serializer.data)

    def put(self, request, id, format=None):
        product = self.get_obj(id)
        serializer = ProductSerializer(
            product, data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        product = self.get_obj(id)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    user = request.user
    try:
        cart = Cart.objects.get(user=user, ordered=False)
        items = CartItem.objects.filter(cart=cart)
        ser = CartItemSerializer(items, many=True)
        return Response(ser.data)
    except Cart.DoesNotExist:
        cart = Cart.objects.create(user=user)
        items = CartItem.objects.filter(cart=cart)
        ser = CartItemSerializer(items, many=True)
        return Response(ser.data, status=status.HTTP_201_CREATED)


@api_view(['POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def cart_item(request):
    user = request.user
    try:
        product = Product.objects.get(id=request.data.get('product_id'))
        cart = Cart.objects.get(user=user, ordered=False)
    except Cart.DoesNotExist:
        cart = Cart.objects.create(user=user)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if (request.method == 'DELETE'):
        try:
            cart_item = CartItem.objects.get(cart=cart, product=product)
            cart_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        cart_item = CartItem.objects.get(cart=cart, product=product)
        ser = CartItemSerializer(
            cart_item, data={'product_id': request.data.get('product_id'), 'quantity': request.data['quantity']})
        if (ser.is_valid()):
            ser.save()
            return Response(ser.data, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
    except CartItem.DoesNotExist:
        cart_item = CartItem.objects.create(
            cart=cart, product=product, quantity=request.data['quantity'])
        ser = CartItemSerializer(cart_item)
        return Response(ser.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def order_view(request):
    user = request.user
    try:
        cart = Cart.objects.get(user=user, ordered=False)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    data = request.data

    data.update(cart_id=cart.id, user_id=user.id)

    ser = OrderSerializer(data=data)

    if (ser.is_valid()):
        ser.save()
        Cart.objects.filter(user=user, id=cart.id).update(ordered=True)

        return Response(ser.data, status=status.HTTP_201_CREATED)
    return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
