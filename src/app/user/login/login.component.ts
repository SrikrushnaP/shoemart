import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signInFormValue: any = {};
  user_data: any;

  constructor(private router: Router, private userService: UserService) { }

  onSubmitSignIn() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInFormValue));
    this.userService.loginUser(this.signInFormValue).subscribe({
      next: (data) => {
        this.user_data = data;
        if (this.user_data.length == 1) {
          // TODO: JWT auth implimentation
          sessionStorage.setItem("userSessionId", this.user_data[0].id);
          sessionStorage.setItem("userFname", this.user_data[0].fName);
          this.router.navigate(['/home']);
        } else {
          alert("Invalid")
        }
      },
      error: (error: any) => {
        console.log("My error", error);
      }
    })
  }
}
