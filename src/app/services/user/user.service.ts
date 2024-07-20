import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:3000';
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService, private router: Router) { }

  checkUserEmail(email: string) {
    // return this.http.post(`${this.baseURL}/api/login`, user);
    return this.apiService.get(this.baseURL + '/user?email=' + email);
  }

  userRegister(userData: any): Observable<any> {
    return this.apiService.post(this.baseURL + '/user', userData);
  }

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

  getUserDetails(userId:any){
    return this.apiService.get(this.baseURL + '/user/'+userId);
  }
}
