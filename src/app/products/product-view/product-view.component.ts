import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  productList: any;
  productId = 0;
  productDetails: any;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private productService: ProductService ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(data => {
      this.productId = data['id'];
      this.getProductDetailsById(this.productId);
    })
  }

  getProductDetailsById(productId: number){
    this.productService.viewProduct(productId).subscribe((res)=>{
      this.productDetails=res;
    })
  }
  addItemTocart(productId: any){}
}
