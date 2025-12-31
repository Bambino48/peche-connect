import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProfileComponent } from './pages/profile/profile';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit';
import { ActionsComponent } from './pages/actions/actions';
import { ProductsComponent } from './pages/products/products';
import { AddProductComponent } from './pages/add-product/add-product';
import { ProductEditComponent } from './pages/product-edit/product-edit';
import { OrdersComponent } from './pages/orders/orders';
import { SellerOrderDetailComponent } from './pages/seller-order-detail/seller-order-detail';
import { StockComponent } from './pages/stock/stock';
import { StockEditComponent } from './pages/stock-edit/stock-edit';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile-edit',
    component: ProfileEditComponent
  },
  {
    path: 'actions',
    component: ActionsComponent
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/add',
    component: AddProductComponent,
  },
  {
    path: 'products/edit/:id',
    component: ProductEditComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'orders/:id',
    component: SellerOrderDetailComponent,
  },
  {
    path: 'stock',
    component: StockComponent,
  },
  {
    path: 'stock/edit/:id',
    component: StockEditComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
