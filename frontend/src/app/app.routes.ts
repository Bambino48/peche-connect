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
import { PaymentsComponent } from './pages/payments/payments';
import { PaymentsDetailComponent } from './pages/payments-detail/payments-detail';
import { DeliveriesComponent } from './pages/deliveries/deliveries';
import { DeliveryDetailComponent } from './pages/delivery-detail/delivery-detail';
import { DeliverySettingsComponent } from './pages/delivery-settings/delivery-settings';
import { ShopComponent } from './pages/shop/shop';
import { ShopProductComponent } from './pages/shop-product/shop-product';
import { ShopProductDetailComponent } from './pages/shop-product-detail/shop-product-detail';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { MesCommandesComponent } from './pages/mes-commandes/mes-commandes';
import { BuyerOrderDetailComponent } from './pages/buyer-order-detail/buyer-order-detail';
import { BuyerDeliveryDetailComponent } from './pages/buyer-delivery-detail/buyer-delivery-detail';
import { BuyerDashboardComponent } from './pages/buyer-dashboard/buyer-dashboard';
import { BuyerOrderSuccessComponent } from './pages/buyer-order-success/buyer-order-success';
import { BuyerOrdersComponent } from './pages/buyer-orders/buyer-orders';
import { BuyerPaymentComponent } from './pages/buyer-payment/buyer-payment';
import { BuyerPaymentConfirmComponent } from './pages/buyer-payment-confirm/buyer-payment-confirm';
import { BuyerPaymentFailureComponent } from './pages/buyer-payment-failure/buyer-payment-failure';
import { BuyerPaymentsComponent } from './pages/buyer-payments/buyer-payments';
import { BuyerPaymentDetailComponent } from './pages/buyer-payment-detail/buyer-payment-detail';
import { BuyerDeliveriesComponent } from './pages/buyer-deliveries/buyer-deliveries';
import { BuyerNotificationsComponent } from './pages/buyer-notifications/buyer-notifications';

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
    path: 'payments',
    component: PaymentsComponent,
  },
  {
    path: 'payments/:id',
    component: PaymentsDetailComponent,
  },
  {
    path: 'deliveries',
    component: DeliveriesComponent,
  },
  {
    path: 'deliveries/:id',
    component: DeliveryDetailComponent,
  },
  {
    path: 'delivery/settings',
    component: DeliverySettingsComponent,
  },
  {
    path: 'buyer-dashboard',
    component: BuyerDashboardComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'shop/:id',
    component: ShopProductComponent,
  },
  {
    path: 'shop/product/:id',
    component: ShopProductDetailComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'my-orders',
    component: MesCommandesComponent,
  },
  {
    path: 'my-orders/:id',
    component: BuyerOrderDetailComponent,
  },
  {
    path: 'delivery/:orderId',
    component: BuyerDeliveryDetailComponent,
  },
  {
    path: 'order-success/:orderId',
    component: BuyerOrderSuccessComponent,
  },
  {
    path: 'buyer-orders',
    component: BuyerOrdersComponent,
  },
  {
    path: 'payment',
    component: BuyerPaymentComponent,
  },
  {
    path: 'payment/confirm',
    component: BuyerPaymentConfirmComponent,
  },
  {
    path: 'payment-failure',
    component: BuyerPaymentFailureComponent,
  },
  {
    path: 'my-payments',
    component: BuyerPaymentsComponent,
  },
  {
    path: 'my-payments/:id',
    component: BuyerPaymentDetailComponent,
  },
  {
    path: 'my-deliveries',
    component: BuyerDeliveriesComponent,
  },
  {
    path: 'notifications',
    component: BuyerNotificationsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
