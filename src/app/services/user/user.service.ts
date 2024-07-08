import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:3000';
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService, private router: Router) { }

  loginUser(user: any) {
    // return this.http.post(`${this.baseURL}/api/login`, user);
    return this.apiService.get(this.baseURL + '/user?email=' + user.userEmail + '&password=' + user.userPassword);
  }

  isLoggedIn(){
    if (typeof window !== 'undefined') {
      return !!sessionStorage.getItem("userSessionToken")
    } else {
      return false;
    }
  }

  logoutUser(){
    sessionStorage.removeItem("userSessionToken");
    this.isLoggedIn$.next(false);
    this.router.navigate(['/home'])
  }
}
