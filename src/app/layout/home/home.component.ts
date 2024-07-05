import { Component } from '@angular/core';
import { ProductsRowComponent } from './products-row/products-row.component';
import { OffersBannerComponent } from './offers-banner/offers-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsRowComponent, OffersBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
