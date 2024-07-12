import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseURL = 'http://localhost:3000';

  constructor(private apiService: ApiService) { }

  createOrder(orderData: any): Observable<any> {
    return this.apiService.post(this.baseURL + '/orders', orderData);
  }
}
