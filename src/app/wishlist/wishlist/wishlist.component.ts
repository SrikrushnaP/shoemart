import { Component } from '@angular/core';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { WishlistDataService } from '../../services/wishlist/wishlist-data.service';
import { ProductService } from '../../services/product/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  userSessionId: any;
  wishlistData: any;
  wishlistProductId:any;
  productsQueryString: any;
  wishlistProductList: any;

  constructor(
    private wishlistService: WishlistService,
    private wishlistDataService: WishlistDataService,
    private productService: ProductService
  ){}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.userSessionId = sessionStorage.getItem("userSessionToken");
      this.wishlistService.getUserWishlist(this.userSessionId).subscribe((res)=>{
        this.wishlistData = res[0];
        this.wishlistProductId = res[0].products_id.sort();
        this.productsQueryString = this.wishlistDataService.generateProductQueryString(this.wishlistProductId);
        this.getWishlistProductsWithDetail(this.productsQueryString)
      })
    }
  }


  getWishlistProductsWithDetail(productsQueryString:any){
    this.productService.viewAllProductByParam(productsQueryString).subscribe({
      next: (res)=>{
        this.wishlistProductList = res;
      }
    })
  }

  removeProductFromWishlist(productId:any, index:any){
    let wishlistProductTobeRemoveTemp = [...this.wishlistProductId]
    wishlistProductTobeRemoveTemp.splice(index, 1);
    this.wishlistService.updatewishlist(this.wishlistData.id, {products_id:wishlistProductTobeRemoveTemp}).subscribe(res=>{
      this.wishlistProductId = res.products_id;

      // After update in db change in frontend without calling backend API
      this.wishlistProductList.splice(index, 1);
      this.wishlistService.wishlistLength$.next(this.wishlistProductId.length)
    })
  }

  addToCart(){
    alert("This funtionality not available now")
  }
}
