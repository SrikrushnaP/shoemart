import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productBaseUrl = "http://localhost:3000/products"

  constructor(private apiService: ApiService) { }

  viewProduct(id: any) {

    console.log(this.productBaseUrl+"/"+id)
    return this.apiService.get(this.productBaseUrl+"/"+id)
  }
}
