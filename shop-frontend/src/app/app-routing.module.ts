import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './can-activate-route.guard';
import { OrderPageComponent } from './order-page/order-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'catalog/category/:id', component: CatalogPageComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'order', component: OrderPageComponent },
  { path: 'login', canActivate: [AuthGuard], component: LoginPageComponent },
  {
    path: 'register',
    canActivate: [AuthGuard],
    component: RegisterPageComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
