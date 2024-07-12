import { Component } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  orderList: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const userSessionId = sessionStorage.getItem("userSessionToken");

    this.orderService.getUserAllOrder(userSessionId).subscribe((res:any)=>{
      // console.log("Res:::", res[0].products.length)
      this.orderList = res;
    })
  }

  viewOrederDetails(){
    if(confirm("TODO: For you reference you can check my simple ui")){
      window.location.href = "https://srikrushnap.github.io/ecommerce-template/pages/orderDetails.html"
    }
  }

  trackOreder(){
    if(confirm("TODO: For you reference you can check my simple ui")){
      window.location.href = "https://srikrushnap.github.io/ecommerce-template/pages/trackOrder.html"
    }
  }
}
