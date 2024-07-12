import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userSessionId: any;
  userDetails: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSessionId = sessionStorage.getItem("userSessionToken");
    this.userService.getUserDetails(this.userSessionId).subscribe((data)=>{
      // console.log("User data", data);
      this.userDetails = data;
    })
  }

  editProfile(){
    if(confirm("TODO: For you reference you can check my simple ui")){
      window.location.href = "https://srikrushnap.github.io/ecommerce-template/pages/editProfile.html"
    }
  }

  viewSavedAddress(){
    if(confirm("TODO: For you reference you can check my simple ui")){
      window.location.href = "https://srikrushnap.github.io/ecommerce-template/pages/viewAddress.html"
    }
  }
}
