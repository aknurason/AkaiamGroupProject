import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CATEGORIES, PRODUCTS } from 'src/backendData';
import { Category, Product, User } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService extends InMemoryDbService {
  createDb() {
    const products: Product[] = [...PRODUCTS];
    const categories: Category[] = [...CATEGORIES];

    return { products, categories };
  }
}
