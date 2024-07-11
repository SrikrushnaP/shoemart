import { Injectable } from '@angular/core';
import { WishlistService } from './wishlist.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistDataService {

  userWishList: any = [];
  isInWishList: Boolean = false;
  toggWishlistMsg: String = "";
  wishListId: any;

  constructor(private wishlistService: WishlistService) {}

  getUserWishlistData(userSesId:any){
    this.wishlistService.getUserWishlist(userSesId).subscribe((res)=>{
      this.userWishList = res[0].products_id;
      this.wishListId = res[0].id;
      this.wishlistService.wishlistLength$.next(this.userWishList.length)
    })
  }

  checkProductInWishlist(productId: Number){
    return this.userWishList.includes(Number(productId))
  }

  toggleItemInWishlist(id: any){
    if(!this.checkProductInWishlist(id)){
      this.userWishList.push(id)
      this.isInWishList = true;
      this.toggWishlistMsg = "Added to your Wishlist";
    }else{
      this.userWishList.splice(this.userWishList.indexOf(Number(id)), 1);
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

  generateProductQueryString(productIdQuantity: any): Observable<any>{
    let productQueryString: any = "";
    productIdQuantity.forEach((element:any) => {
      productQueryString+="id="+element+"&";
    });
    return productQueryString;
  }
}
