import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productList: Product[] = [
    {
      name: 'expresso',
      price: 2,
      description: 'super expresso !',
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

  calculatePrice(product: Product): number {
    return product.price - 
        (product.discount ? product.discount.value : 0);
  }
}
