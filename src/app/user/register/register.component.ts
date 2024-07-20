import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signUpFormValue: any = {};
  user_data: any;

  constructor(private userService: UserService,private router: Router){

  }

  onSubmitSignUp(){
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signUpFormValue));
    // check User Email is already registered or not
    this.userService.checkUserEmail(this.signUpFormValue.email).subscribe((res)=>{
      if(res.length){
        alert("Email already registered")
      } else {
        this.userService.userRegister(this.signUpFormValue).subscribe((data)=>{
          this.router.navigate(["/login"]);
        })
      }
    })

  }
}
