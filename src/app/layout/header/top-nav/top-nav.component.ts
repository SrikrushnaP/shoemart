import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

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

  ngOnInit(): void {
      this.userService.isLoggedIn$.subscribe(res=>{
        this.isLoggedIn = this.userService.isLoggedIn();
      })
  }

  logOut(){
    this.userService.logoutUser();
  }
}
