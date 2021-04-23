import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PRODUCTS } from 'src/backendData';
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
    return this.http.get(`${apiURL}/categories/?id=${id}`);
  }

  constructor(private http: HttpClient) {}
}
