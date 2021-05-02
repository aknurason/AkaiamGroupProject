import { Injectable } from '@angular/core';
import { CartItem, Product } from 'src/types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: CartItem[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;

  removeFromCart(productId: number) {
    this.apiService.removeCartItem(productId).subscribe(() => {
      this.items = this.items.filter((item) => item.product.id !== productId);
      this.totalItems--;
    });
  }

  decrementQuantity(productId: number) {
    const [item] = this.items.filter((item) => item.product.id === productId);

    if (!item) {
      return;
    }

    if (item.quantity <= 1) {
      this.removeFromCart(productId);
    } else {
      this.apiService
        .setCartItemQuantity(productId, item.quantity - 1)
        .subscribe((res) => {
          console.log(res);

          this.items = this.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        });
    }
    this.totalPrice -= item.product.price;
  }

  incrementQuantity(productId: number, by: number = 1) {
    const [item] = this.items.filter((item) => item.product.id === productId);

    if (!item) {
      return;
    }

    if (item.quantity + by <= 99) {
      return;
    }

    this.apiService
      .setCartItemQuantity(productId, item.quantity + by)
      .subscribe((res) => {
        console.log(res);

        this.items = this.items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + by }
            : item
        );
      });

    this.totalPrice += item.product.price * by;
  }

  addToCart(product: Product, quantity: number) {
    const existingItems = this.items.filter(
      (currentItem) => currentItem.product.id === product.id
    );

    if (existingItems.length > 0) {
      this.incrementQuantity(product.id, quantity);
    } else {
      this.apiService.addToCart(product.id, quantity).subscribe((res) => {
        console.log(res);

        this.items.push({ product, quantity, product_id: product.id });
        this.totalItems++;
      });
    }
  }

  updateCart() {
    this.apiService.getCartItems().subscribe((res: CartItem[]) => {
      this.items = res.map((item) => ({
        ...item,
        product: {
          ...item.product,
          image: 'http://localhost:8000' + item.product.image,
        },
      }));
      this.totalItems = res.length;
      let price = 0;

      res.forEach((item) => (price += item.product.price * item.quantity));

      this.totalPrice = price;
    });
  }

  constructor(private apiService: ApiService) {
    this.updateCart();
  }
}
