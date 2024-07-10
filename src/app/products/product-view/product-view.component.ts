import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { NgClass } from '@angular/common';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [NgClass],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  productList: any;
  productId: Number = 0;
  userSessionId: any;
  productDetails: any;
  userWishList: any = [];
  isInWishList: boolean = false;
  toggWishlistMsg: String = "";
  wishListId: any;

  // userCart: any;
  cartId: any;
  cartProductsIdQty: any;

  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private wishlistService: WishlistService, private cartService: CartService ) { }

  ngOnInit() {
    this.userSessionId = sessionStorage.getItem("userSessionToken");

    this.activeRoute.params.subscribe(data => {
      this.productId = data['id'];
      this.getProductDetailsById(this.productId);
    })

    this.getUserWishlistData();

    this.getUserCartData();
  }

  getProductDetailsById(productId: Number){
    this.productService.viewProduct(productId).subscribe((res)=>{
      this.productDetails=res;
    })
  }

/*...............................||
|| Wishlist Realted Logic: Start ||
||...............................*/
  getUserWishlistData(){
    this.wishlistService.getUserWishlist(this.userSessionId).subscribe((res)=>{
      this.userWishList = res[0].products_id;
      this.wishListId = res[0].id;
      this.wishlistService.wishlistLength$.next(this.userWishList.length)
      this.checkProductInWishlist();
    })
  }

  checkProductInWishlist(){
    if(this.userWishList.indexOf(Number(this.productId)) !== -1){
      this.isInWishList = true;
    } else {
      this.isInWishList = false;
    }
  }

  toggleItemInWishlist(id: any){
    if(!this.isInWishList){
      this.userWishList.push(id)
      this.isInWishList = true;
      this.toggWishlistMsg = "Added to your Wishlist";
    }else{
      this.userWishList.splice(this.userWishList.indexOf(Number(this.productId)), 1);
      this.isInWishList = false;
      this.toggWishlistMsg = "Removed from your Wishlist";
    }
    this.wishlistService.updatewishlist(this.wishListId, {products_id:this.userWishList}).subscribe({
      next: (res)=>{
        this.wishlistService.wishlistLength$.next(res.products_id.length)
      },
      error: (err)=>{

      },
      complete:()=>{
        console.log(this.toggWishlistMsg)
      }
    })
  }
/*.............................||
|| Wishlist Realted Logic: End ||
||.............................*/


/*...........................||
|| Cart Realted Logic: Start ||
||...........................*/

getUserCartData(){
  this.cartService.getUserCartData(this.userSessionId).subscribe((res)=>{
    this.cartId = res[0].id;
    this.cartProductsIdQty = res[0].product_id_quantity;
    this.cartService.cartQuantity$.next(this.cartProductsIdQty.length)
  })
}

checkProductInCart(productId: number){
  // Check the product is alarya available in cart or not
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


/*.........................||
|| Cart Realted Logic: End ||
||.........................*/
}
