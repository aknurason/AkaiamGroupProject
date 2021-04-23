import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from 'src/backendData';
import { Product } from 'src/types';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  products: Product[];

  constructor(private apiService: ApiService) {
    apiService
      .getAllProducts()
      .subscribe((data: Product[]) => (this.products = data));
  }

  ngOnInit(): void {}
}
