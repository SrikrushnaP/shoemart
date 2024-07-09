import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { NgClass } from '@angular/common';
import { WishlistService } from '../../services/wishlist/wishlist.service';

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

  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private wishlistService: WishlistService ) { }

  ngOnInit() {
    this.userSessionId = sessionStorage.getItem("userSessionToken");

    this.activeRoute.params.subscribe(data => {
      this.productId = data['id'];
      this.getProductDetailsById(this.productId);
    })

    this.getUserWishlistData();
  }

  getProductDetailsById(productId: Number){
    this.productService.viewProduct(productId).subscribe((res)=>{
      this.productDetails=res;
    })
  }

  getUserWishlistData(){
    this.wishlistService.getUserWishlist(this.userSessionId).subscribe((res)=>{
      this.userWishList = res[0].products_id;
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

  addItemTocart(id: any){}

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
    this.wishlistService.updatewishlist(this.userSessionId, {products_id:this.userWishList}).subscribe({
      next: ()=>{

      },
      error: ()=>{

      },
      complete:()=>{
        console.log(this.toggWishlistMsg)
      }
    })
  }
}
