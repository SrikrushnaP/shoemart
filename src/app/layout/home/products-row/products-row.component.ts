import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products-row',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products-row.component.html',
  styleUrl: './products-row.component.css'
})
export class ProductsRowComponent {
  productList: any;
  tagName: string = "tags";
  tagValue: string = "tranding";

  constructor(private productService: ProductService ) { }

  ngOnInit() {
    this.getProductDetailsByTagName(this.tagName, this.tagValue);
  }

  getProductDetailsByTagName(tagName:any, tagValue:any){
    this.productService.viewAllProductByParam(tagName, tagValue).subscribe((res)=>{
      this.productList=res;
    })
  }

  addProductTocart(productId:any){
    alert("TODO")
  }
}
