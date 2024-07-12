import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {

  userSessionId: any;
  cartId: any;
  cartProductsIdQty: any;

  productQueryString: any = '';
  cartProductCount: number =0;

  cartCheckoutData$ = new BehaviorSubject<any>([]);

  constructor(private cartService: CartService) { }

  getUserCartData(userSesId:any){
    this.cartService.getUserCartData(userSesId).subscribe((res)=>{
      this.cartId = res[0].id;
      this.cartProductsIdQty = res[0].product_id_quantity;
      this.cartService.cartIdQuantity$.next(this.cartProductsIdQty)
    })
  }

  checkProductInCart(productId: number){
    // Check the product is alarya available in cart or not
    // console.log("this.cartProductsIdQty", this.cartProductsIdQty)
    const productExist = this.cartProductsIdQty.some((el: any) => {
      return el.product_id === Number(productId);
    })
    return productExist;
  }


  addItemTocart(productId: any){
    if(!this.checkProductInCart(productId)){
      // Logic to Add the product into the cart
      this.cartProductsIdQty.push({ product_id: Number(productId), quantity: 1 });
      this.cartService.updateCartProductQuantity(this.cartId, {product_id_quantity: this.cartProductsIdQty}).subscribe({
        next: (res)=>{
          this.cartService.cartIdQuantity$.next(res.product_id_quantity)
          console.log("After add to cart::::::", res)
        }
      })
    } else {
      alert("Product already exist in the cart, update the product quntity in cart")
    }
  }


   // http://localhost:3000/products?id=1&id=2
   generateProductQueryString(productIdQuantity: any): Observable<any>{
    productIdQuantity.forEach((element:any, index: number, array: any) => {
      this.productQueryString += "id="+element.product_id+"&";
    });
    return this.productQueryString;
  }
}
