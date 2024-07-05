import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-row',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products-row.component.html',
  styleUrl: './products-row.component.css'
})
export class ProductsRowComponent {

}
