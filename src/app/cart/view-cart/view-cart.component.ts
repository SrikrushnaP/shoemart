import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartDataService } from '../../services/cart/cart-data.service';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-view-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css'
})
export class ViewCartComponent implements OnInit {
  userSessionId: any;

  cartItemCount: any = 0;
  cartProductIdQty: any;
  cartProductList: any = [];
  cartData: any;
  totalCartPrice: any = 0;
  totalCartQty: any = 0
  totalCartMrpPrice: any = 0

  productsQuantityTobeUpdated: any;
  updatedCartData : any;
  cartProductTobeRemove: any;

  productsQueryString:any;

  constructor(
    private cartService: CartService,
    private cartDataService: CartDataService,
    private productService: ProductService
  ){}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.userSessionId = sessionStorage.getItem("userSessionToken");
      this.cartDataService.getUserCartData(this.userSessionId);
      this.cartService.cartIdQuantity$.subscribe((res)=>{
        if(res.length){
          this.cartProductIdQty = res;
          this.cartProductIdQty.sort((a:any, b:any) => (a.product_id > b.product_id ? 1 : -1));
          this.productsQueryString = this.cartDataService.generateProductQueryString(this.cartProductIdQty);
          this.getCartProductsWithDetail(this.productsQueryString)
        }
      })
    }
  }

  getCartProductsWithDetail(productsQueryString:any){
    this.productService.viewAllProductByParam(productsQueryString).subscribe({
      next: (res)=>{
        this.cartProductList = res;
        this.toalCartProductQuantity(this.cartProductIdQty, this.cartProductList)
      }
    })
  }

  toalCartProductQuantity(productIdQty: any, productsDeatil: any){
    for(let i=0; i<productIdQty.length; i++){
      this.totalCartQty += productIdQty[i].quantity;
      this.totalCartPrice += productIdQty[i].quantity*productsDeatil[i].dp;
      this.totalCartMrpPrice += productIdQty[i].quantity*productsDeatil[i].mrp;
    }
  }



  changeCartProductQuantity(cartProductIndex: any, event:any){}


  removeProductFromCart(cartProductIndex: any, productId:any){}
}
