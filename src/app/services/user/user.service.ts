import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:3000';

  constructor(private apiService: ApiService) { }

  loginUser(user: any) {
    // return this.http.post(`${this.baseURL}/api/login`, user);
    return this.apiService.get(this.baseURL + '/user?email=' + user.userEmail + '&password=' + user.userPassword);
  }
}
