import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productBaseUrl = "http://localhost:3000/products"

  constructor(private apiService: ApiService) { }

  viewProduct(id: any) {
    return this.apiService.get(this.productBaseUrl+"/"+id)
  }

  /*
    viewAllProductByParam(paramName, paramValue)
    paramName: It will accept the any key of the product details like category, tag etc
    paramValue: it will accept the value of categoey/ tag like for category it will be men, women, kids etc
    By default it will accept empty value means it will show all product
  */
  viewAllProductByParam(paramName:any = "", paramValue:any = ""){
    return this.apiService.get(this.productBaseUrl+"?"+paramName+"="+paramValue);
  }
}
