import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  productList: any;
  categoryValue:any;

  constructor( private activeRoute: ActivatedRoute, private productService: ProductService){}
  ngOnInit(){
    this.activeRoute.params.subscribe(data => {
      this.categoryValue = data['categoryName'];
      this.getProductDetailsCategoryName("category", this.categoryValue);
    })
  }


  getProductDetailsCategoryName(category:any, categoryValue:any){
    this.productService.viewAllProductByParam(category, categoryValue).subscribe(res=>{
      this.productList = res
    })
  }

  addProductTocart(productId:any){
    alert("TODO")
  }
}
