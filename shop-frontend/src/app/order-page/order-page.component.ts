import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  orderData = {
    country: '',
    city: '',
    street: '',
    showError: false,
    error: '',
  };

  onCartIncrement(event, id) {
    event.stopPropagation();
    event.preventDefault();
    this.cartService.incrementQuantity(id);
  }

  onCartDecrement(event, id) {
    event.stopPropagation();
    event.preventDefault();
    this.cartService.decrementQuantity(id);
  }

  submitForm() {
    this.apiService
      .createOrder(
        this.orderData.country,
        this.orderData.city,
        this.orderData.street
      )
      .subscribe((res) => {
        this.router.navigateByUrl('/');
        this.cartService.updateCart();
      });
  }

  constructor(
    public cartService: CartService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
