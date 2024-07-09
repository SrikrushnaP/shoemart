import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistBaseUrl = "http://localhost:3000/wishlist";
  wishlistLength$ = new BehaviorSubject<Number>(0);

  constructor(private apiService: ApiService) { }

  getUserWishlist(userId: any){
    return this.apiService.get(this.wishlistBaseUrl+'?user_id='+userId);
  }

  updatewishlist(userId:any, updateWishlistData: any){
    return this.apiService.patch(this.wishlistBaseUrl+"/"+userId, updateWishlistData)
  }

  viewWishlistProducts(queryParam: any){
    // return this.apiService.get(this.productBaseUrl+"?"+queryParam)
  }
}
