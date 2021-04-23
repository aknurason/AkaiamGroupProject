import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/types';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  product: Product = {
    id: 0,
    title: 'Default title',
    subtitle: 'Default subtitle',
    description: 'Default description',
    categoryId: 0,
    price: 0,
    imageURL: '',
  };

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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
}
