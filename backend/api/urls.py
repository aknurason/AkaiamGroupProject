from django.urls import path
from .views import ProductDetails, ProductList, cart_item, category_details, category_list, get_cart, order_view

urlpatterns = [
    path('products/', ProductList.as_view()),
    path('products/<int:id>', ProductDetails.as_view()),
    path('categories/', category_list),
    path('categories/<int:id>', category_details),
    path('cart/', get_cart),
    path('cart/items/', cart_item),
    path('order/', order_view),
]
