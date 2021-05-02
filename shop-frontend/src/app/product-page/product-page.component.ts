import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from 'src/types';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  product: Product;
  category: Category;
  productId: number;
  addToCartQuantity: number = 1;

  setAddToCartQuantity(val: number) {
    if (val < 1 || val > 99) {
      return;
    }

    this.addToCartQuantity = val;
  }

  limitTextLength(text, length) {
    return text.length > length ? text.substr(0, length) + '...' : text;
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.addToCartQuantity);
  }

  getProductData() {
    this.apiService.getProduct(this.productId).subscribe((data: Product) => {
      this.product = data;

      this.getCategoryData();
    });
  }

  getCategoryData() {
    this.apiService.getCategory(this.product.categoryId);
  }

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.paramMap.subscribe((data) => {
      this.productId = parseInt(data.get('id'));
      this.getProductData();
    });
  }
  ngOnInit(): void {}
}
