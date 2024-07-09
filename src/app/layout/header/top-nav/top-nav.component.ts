import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { WishlistService } from '../../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent implements OnInit {

  userService = inject(UserService) // Service inject without constructor
  isLoggedIn: boolean = false;
  wishlistLength: any = 0;

  constructor(private wishlistService: WishlistService){}
  ngOnInit(): void {
      this.userService.isLoggedIn$.subscribe(res=>{
        this.isLoggedIn = this.userService.isLoggedIn();
      })
      this.wishlistService.wishlistLength$.subscribe(res=>{
        this.wishlistLength = res;
      })
  }

  logOut(){
    this.userService.logoutUser();
  }
}
