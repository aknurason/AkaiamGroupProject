import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from 'src/types';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit {
  categoryId = null;
  category: Category;
  products: Product[];

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  getProducts() {
    if (
      this.categoryId === null ||
      this.categoryId === undefined ||
      this.categoryId === NaN
    ) {
      this.apiService
        .getAllProducts()
        .subscribe((data: Product[]) => (this.products = data));
      return;
    }

    this.apiService
      .getProducts(this.categoryId)
      .subscribe((data: Product[]) => (this.products = data));
  }

  getCategory() {
    this.apiService.getCategory(this.categoryId).subscribe((data: Category) => {
      this.category = data;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      const id = map.get('id');

      if (id === null) {
        this.getProducts();
        return;
      }

      this.categoryId = parseInt(id);
      this.getCategory();
      this.getProducts();
    });
  }
}
