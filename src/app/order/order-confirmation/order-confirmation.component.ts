import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css',
})
export class OrderConfirmationComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    // do init at here for current route.

    setTimeout(() => {
      this.router.navigate(['/orders']);
    }, 5000); //5s
  }
}
