import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css'
})
export class ViewCartComponent {
  cartItemCount: any = 0;
  cartProductList: any = [];
  cartData: any;
  totalPrice: any = 0;

  productsQuantityTobeUpdated: any;
  updatedCartData : any;
  cartProductTobeRemove: any;

  changeCartProductQuantity(cartProductIndex: any, event:any){}


  removeProductFromCart(cartProductIndex: any, productId:any){}
}
