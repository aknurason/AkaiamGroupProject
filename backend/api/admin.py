from django.contrib import admin
from .models import CartItem, Category, Order, Product, Cart

# Register your models here.

admin.site.register(Category)
admin.site.register(Product)


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1


class CartAdmin(admin.ModelAdmin):
    inlines = [
        CartItemInline,
    ]


admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem)
admin.site.register(Order)
