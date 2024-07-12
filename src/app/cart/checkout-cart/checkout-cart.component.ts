import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartDataService } from '../../services/cart/cart-data.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { OrderService } from '../../services/order/order.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-checkout-cart',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './checkout-cart.component.html',
  styleUrl: './checkout-cart.component.css'
})
export class CheckoutCartComponent {
  addAddressForm!: FormGroup;
  userDetailedData: any;

  userSessionId: any;
  constructor(private fb: FormBuilder, private cartDataService: CartDataService, private router: Router, private userService: UserService, private orderService: OrderService, private cartService: CartService){
    if(this.cartDataService.cartCheckoutData$.value.length == 0 || this.cartDataService.cartId$.value == 0){
      this.router.navigate(["/cart-view"]);
      return;
    }
  }


  ngOnInit(): void {
    this.userSessionId = sessionStorage.getItem("userSessionToken");
    this.addAddressForm = this.fb.group({
        fName: ["", Validators.required],
        lName: ["", Validators.required],
        mobNumber: ["", [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        line1: ["", Validators.required],
        line2: [""],
        city: ["", Validators.required],
        state: ["", Validators.required],
        postalCode: ["", [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
        transavtionRefNum: ["", [Validators.required]],
      });

      this.getUserDetails();
  }

  getUserDetails(){
    this.userService.getUserDetails(this.userSessionId).subscribe({
      next: res =>{
        // Here We required only address
        // console.log(res.address)
        this.userDetailedData = res.address;
        this.addAddressForm.patchValue({
          fName: res.fName,
          lName: res.lName,
          mobNumber: res.mobNumber,
          line1: res.address.line1,
          line2: res.address.line1,
          city: res.address.city,
          state: res.address.state,
          postalCode: res.address.postalCode
        });
      }
    })
  }

  placeOrder(){
    let orderDetails = {
      userId: this.userSessionId,
      fName: this.addAddressForm.value.fName,
      lName: this.addAddressForm.value.lName,
      mobNumber: this.addAddressForm.value.mobNumber,
      products: this.cartDataService.cartCheckoutData$.value,
      deliveryAddress: {
        id:Math.floor( Math.random() * Date.now()),
        line1: this.addAddressForm.value.line1,
        line2: this.addAddressForm.value.line2,
        city: this.addAddressForm.value.city,
        state: this.addAddressForm.value.state,
        postalCode: this.addAddressForm.value.postalCode
      },
      dateTime: Date.now()
    }
    this.orderService.createOrder(orderDetails).subscribe({
      next: (res) => {

      },
      complete: () => {
        // Remove item from cart
        this.cartService.updateCartProductQuantity(this.cartDataService.cartId$.value, {product_id_quantity: []}).subscribe((data)=>{
          // console.log("cart updated", data);
          this.cartService.cartIdQuantity$.next(data.product_id_quantity)
          this.router.navigate(['/orders'])
        })
      }
    })
    console.log(orderDetails)
  }

  // convenience getter for easy access to form fields "paymentForm.controls as addressFormCtrl"
  get addressFormCtrl() { return this.addAddressForm.controls; }
}
