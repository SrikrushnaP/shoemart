import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { NgClass } from '@angular/common';
import { CartDataService } from '../../services/cart/cart-data.service';
import { WishlistDataService } from '../../services/wishlist/wishlist-data.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [NgClass],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {

  productId: Number = 0;
  userSessionId: any;
  productDetails: any;

  isInWishList: Boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private cartDataService: CartDataService,
    private wishlistDataService: WishlistDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.userSessionId = sessionStorage.getItem("userSessionToken");

      this.activeRoute.params.subscribe(data => {
        this.productId = data['id'];
        this.getProductDetailsById(this.productId);
      })

      this.wishlistDataService.getUserWishlistData(this.userSessionId)

      this.cartDataService.getUserCartData(this.userSessionId);
    }
  }

  ngAfterViewChecked(){
    this.isInWishList = this.wishlistDataService.checkProductInWishlist(this.productId);
    this.changeDetectorRef.detectChanges();
  }

  getProductDetailsById(productId: Number){
    this.productService.viewProduct(productId).subscribe((res)=>{
      this.productDetails=res;
    })
  }

/*...............................||
|| Wishlist Realted Logic: Start ||
||...............................*/


toggleProductInWishlist(productId:any){
  this.wishlistDataService.toggleItemInWishlist(productId)
}

/*.............................||
|| Wishlist Realted Logic: End ||
||.............................*/


/*...........................||
|| Cart Realted Logic: Start ||
||...........................*/

addProductTocart(productId:any){
  this.cartDataService.addItemTocart(productId)
}

/*.........................||
|| Cart Realted Logic: End ||
||.........................*/
}
