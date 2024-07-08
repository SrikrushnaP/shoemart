import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { ProfileComponent } from './user/profile/profile.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductViewComponent } from './products/product-view/product-view.component';
import { ViewCartComponent } from './cart/view-cart/view-cart.component';
import { CheckoutCartComponent } from './cart/checkout-cart/checkout-cart.component';
import { PolicyInfoComponent } from './pages/policy-info/policy-info.component';


export const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'policy', component: PolicyInfoComponent },
  { path: 'contact', component: ContactUsComponent },

  { path: 'products-list', component: ProductsListComponent },
  { path: 'product-view/:id', component: ProductViewComponent },

  { path: 'cart-view', component: ViewCartComponent },
  { path: 'cart-checkout', component: CheckoutCartComponent },
  { path: 'wishlist', component:  ViewCartComponent},

  { path: 'profile', component: ProfileComponent },
  // { path: 'orders', component: LoginComponent },
  // { path: 'wish-list', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "**", component: PageNotFoundComponent }
];
