import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartBaseUrl = "http://localhost:3000/cart";
  wishlistLength$ = new BehaviorSubject<Number>(0);
  cartIdQuantity$ = new BehaviorSubject<any>([]);

  userSessionId: any;

  constructor(private apiService: ApiService) { }

  // Return user cart details
  // which contains product id and quantiy
  getUserCartData(user_id: any){
    return this.apiService.get(this.cartBaseUrl+'?user_id='+user_id);
  }

  updateCartProductQuantity(cart_id:any, updateCartData: any){
    console.log(this.cartBaseUrl +"/"+ cart_id)
    return this.apiService.patch(this.cartBaseUrl +"/"+ cart_id, updateCartData)
  }
}
