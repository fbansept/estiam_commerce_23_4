import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPricePipe } from '../../pipes/product-price.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductPricePipe, MatButtonModule, MatCardModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  now: Date = new Date();

  compteur: number = 20;

  clic() {
    this.compteur++;
  }

  productList: Product[] = [
    {
      name: 'expresso',
      price: 2,
      description: 'super expresso !',
      discount: {
        value: 50,
        type: 'percent',
      },
    },
    {
      name: 'deca',
      price: 2,
    },
    {
      name: 'latte',
      price: 2.4,
      disable: true,
    },
    {
      name: 'cappuccino',
      price: 3.1,
      discount: {
        value: 0.2,
        type: 'fixed',
      },
    },
  ];
}
