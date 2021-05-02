import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Category, Product } from 'src/types';

const apiURL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getAllProducts() {
    return this.http.get(`${apiURL}/products/`);
  }

  getProducts(categoryId: number) {
    return this.http.get(`${apiURL}/products/?categoryId=${categoryId}`);
  }

  getProduct(id: number) {
    return this.http.get(`${apiURL}/products/${id}`);
  }

  getCategories() {
    return this.http.get(`${apiURL}/categories/`);
  }

  getCategory(id: number) {
    return this.http.get(`${apiURL}/categories/${id}`);
  }

  getCartItems() {
    return this.http.get(`${apiURL}/cart/`);
  }

  addToCart(productId, quantity) {
    return this.http.post(`${apiURL}/cart/items/`, {
      product_id: productId,
      quantity,
    });
  }

  setCartItemQuantity(productId, quantity) {
    return this.http.put(`${apiURL}/cart/items/`, {
      product_id: productId,
      quantity,
    });
  }

  removeCartItem(productId) {
    return this.http.request('delete', `${apiURL}/cart/items/`, {
      body: { product_id: productId },
    });
  }

  createOrder(country: string, city: string, street: string) {
    return this.http.post(`${apiURL}/order/`, { country, city, street });
  }

  constructor(private http: HttpClient) {}
}
