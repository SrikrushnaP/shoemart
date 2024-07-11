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
      this.cartService.getUserCartData(this.userSessionId).subscribe((res)=>{
        this.cartData = res[0];
        this.cartProductIdQty = res[0].product_id_quantity;
        this.cartProductIdQty.sort((a:any, b:any) => (a.product_id > b.product_id ? 1 : -1));
        this.productsQueryString = this.cartDataService.generateProductQueryString(this.cartProductIdQty);
        this.getCartProductsWithDetail(this.productsQueryString)
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
    let totalCartQtyTemp=0, totalCartPriceTemp=0, totalCartMrpPriceTemp=0;
    for(let i=0; i<productIdQty.length; i++){
      totalCartQtyTemp += productIdQty[i].quantity;
      totalCartPriceTemp += productIdQty[i].quantity*productsDeatil[i].dp;
      totalCartMrpPriceTemp += productIdQty[i].quantity*productsDeatil[i].mrp;
    }

    this.totalCartQty = totalCartQtyTemp;
    this.totalCartPrice= totalCartPriceTemp;
    this.totalCartMrpPrice = totalCartMrpPriceTemp;
  }



  changeCartProductQuantity(cartProductIndex: any, event:any){}


  removeProductFromCart(cartProductIndex: any, productId:any){
    this.cartProductTobeRemove = [...this.cartProductIdQty]
    this.cartProductTobeRemove.splice(cartProductIndex, 1);
    this.cartService.updateCartProductQuantity(this.cartData.id, {product_id_quantity: this.cartProductTobeRemove}).subscribe((res)=>{
      this.cartProductIdQty = res.product_id_quantity;

      // After update in db change in frontend without calling backend API
      this.cartProductList.splice(cartProductIndex, 1);
      // this.cartProductIdQty.splice(cartProductIndex, 1);
      this.toalCartProductQuantity(this.cartProductTobeRemove, this.cartProductList);
      this.cartData.product_id_quantity = this.cartProductTobeRemove;
      this.cartService.cartIdQuantity$.next(this.cartProductTobeRemove)

    })
  }
}
