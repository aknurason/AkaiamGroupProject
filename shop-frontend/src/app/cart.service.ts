import { Injectable } from '@angular/core';
import { CartItem, Product } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: CartItem[] = [];
  totalItems: number = 0;

  removeFromCart(productId: number) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.totalItems--;
  }

  decrementQuantity(productId: number) {
    const [item] = this.items.filter((item) => item.product.id === productId);

    if (!item) {
      return;
    }

    if (item.quantity <= 1) {
      this.removeFromCart(productId);
    } else {
      this.items = this.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  }

  incrementQuantity(productId: number, by?: number) {
    const [item] = this.items.filter((item) => item.product.id === productId);

    if (!item) {
      return;
    }

    if (item.quantity >= 99) {
      return;
    }

    this.items = this.items.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  addToCart(product: Product, quantity: number) {
    const existingItems = this.items.filter(
      (currentItem) => currentItem.product.id === product.id
    );

    if (existingItems.length > 0) {
      this.incrementQuantity(product.id, quantity);
    } else {
      this.items.push({ product, quantity });
      this.totalItems++;
    }
  }

  constructor() {}
}
