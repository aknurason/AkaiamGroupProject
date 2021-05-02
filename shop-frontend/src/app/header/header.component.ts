import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartItem, Category, Product } from 'src/types';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  categories: Category[];

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

  constructor(
    private apiService: ApiService,
    public cartService: CartService,
    public authService: AuthService
  ) {
    apiService
      .getCategories()
      .subscribe((data: Category[]) => (this.categories = data));
  }

  ngOnInit(): void {}
}
