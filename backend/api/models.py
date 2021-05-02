from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class Category(models.Model):
    name = models.CharField(verbose_name='Title', max_length=250)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    title = models.CharField(verbose_name='Title', max_length=250)
    subtitle = models.CharField(verbose_name='Subtitle', max_length=250)
    description = models.TextField(verbose_name='Description', max_length=1000)
    price = models.PositiveIntegerField(verbose_name='Price')
    image = models.ImageField(verbose_name='Image', upload_to='products')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def __str__(self):
        return self.title


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ordered = models.BooleanField(verbose_name='Ordered', default=False)

    class Meta:
        verbose_name = 'Cart'
        verbose_name_plural = 'Carts'

    def __str__(self):
        return '%s: %s\'s cart' % ('completed' if self.ordered else 'active', self.user.username)


class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    quantity = models.IntegerField(verbose_name='Quantity', default=1)

    class Meta:
        verbose_name = 'Cart item'
        verbose_name_plural = 'Cart items'

    def __str__(self):
        return '%s x %i at %s' % (self.product.title, self.quantity, self.cart)


class Order(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name='User')
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    country = models.CharField(max_length=255, verbose_name='Country')
    city = models.CharField(max_length=255, verbose_name='City')
    street = models.CharField(max_length=255, verbose_name='Street')
    date = models.DateTimeField(
        auto_now_add=True, verbose_name='Created at')

    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __str__(self):
        return '%s\'s order at %s' % (self.user.username, self.date.strftime('%Y-%m-%d %H:%M'))
