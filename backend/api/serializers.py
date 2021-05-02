from django.contrib.auth.models import User
from rest_framework.serializers import Serializer, ModelSerializer, ImageField, IntegerField, PrimaryKeyRelatedField
from .models import Cart, CartItem, Category, Order, Product
from _auth.serializers import UserSerializer


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(ModelSerializer):
    image = ImageField()
    category_detail = CategorySerializer(source='category', read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, product):
        request = self.context.get('request')
        image_url = product.image.url
        return request.build_absolute_uri(image_url)


class CartItemSerializer(Serializer):
    product = ProductSerializer(read_only=True)
    product_id = IntegerField(write_only=True)
    quantity = IntegerField()

    def create(self, request, validated_data):
        product = Product.objects.get(id=validated_data.get('product_id'))
        return CartItem.objects.create(product=product, quantity=validated_data.get('quantity'), cart=validated_data.get('cart'))

    def update(self, instance, validated_data):
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance


class CartSerializer(Serializer):
    user = UserSerializer()
    items = CartItemSerializer(many=True, read_only=True)

    def create(self, validated_data):
        return Cart.objects.create(**validated_data)

    def update(self, instance, validated_data):
        return instance


class OrderSerializer(ModelSerializer):
    cart = CartSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    cart_id = IntegerField(write_only=True)
    user_id = IntegerField(write_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.get(id=validated_data.get('user_id'))
        cart = Cart.objects.get(user=user, id=validated_data.get('cart_id'))

        order = Order.objects.create(
            cart=cart, user=user, country=validated_data['country'], city=validated_data['city'], street=validated_data['street'])

        return order
