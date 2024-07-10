import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {

  userSessionId: any;
  cartId: any;
  cartProductsIdQty: any;

  constructor(private cartService: CartService) { }

  getUserCartData(userSesId:any){
    this.cartService.getUserCartData(userSesId).subscribe((res)=>{
      this.cartId = res[0].id;
      this.cartProductsIdQty = res[0].product_id_quantity;
      this.cartService.cartQuantity$.next(this.cartProductsIdQty.length)
    })
  }

  checkProductInCart(productId: number){
    // Check the product is alarya available in cart or not
    console.log("this.cartProductsIdQty", this.cartProductsIdQty)
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
          this.cartService.cartQuantity$.next(res.product_id_quantity.length)
          console.log("After add to cart::::::", res)
        }
      })
    } else {
      alert("Product already exist in the cart, update the product quntity in cart")
    }
  }
}
