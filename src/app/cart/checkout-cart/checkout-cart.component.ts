import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartDataService } from '../../services/cart/cart-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-cart',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './checkout-cart.component.html',
  styleUrl: './checkout-cart.component.css'
})
export class CheckoutCartComponent {
  addAddressForm!: FormGroup;

  userSessionId: any;
  constructor(private fb: FormBuilder, private cartDataService: CartDataService, private router: Router){
    if(this.cartDataService.cartCheckoutData$.value.length == 0){
      this.router.navigate(["/cart-view"]);
      return;
    }
  }


  ngOnInit(): void {
    this.userSessionId = sessionStorage.getItem("userSessionToken");
    this.addAddressForm = this.fb.group({
        fName: ["", Validators.required],
        lName: ["", Validators.required],
        contactNum: ["", [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        line1: ["", Validators.required],
        line2: [""],
        city: ["", Validators.required],
        state: ["", Validators.required],
        postalCode: ["", [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
        transavtionRefNum: ["", [Validators.required]],
      });
  }

  placeOrder(){
    let orderDetails = {
      userId: this.userSessionId,
      fName: this.addAddressForm.value.fName,
      lName: this.addAddressForm.value.lName,
      contact: this.addAddressForm.value.contactNum,
      products: this.cartDataService.cartCheckoutData$.value,
      deliveryAddress: {
        id: 0,
        addLine1: this.addAddressForm.value.line1,
        addLine2: this.addAddressForm.value.line2,
        city: this.addAddressForm.value.city,
        state: this.addAddressForm.value.state,
        zipCode: this.addAddressForm.value.postalCode
      },
      dateTime: Date.now()
    }
    console.log(orderDetails)
  }

  // convenience getter for easy access to form fields "paymentForm.controls as addressFormCtrl"
  get addressFormCtrl() { return this.addAddressForm.controls; }
}
