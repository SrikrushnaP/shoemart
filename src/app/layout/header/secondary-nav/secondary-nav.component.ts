import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-secondary-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './secondary-nav.component.html',
  styleUrl: './secondary-nav.component.css'
})
export class SecondaryNavComponent implements OnInit{

  cartQuantity: any = 0;
  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.cartQuantity$.subscribe(res=>{
      this.cartQuantity = res;
    })
  }

}
