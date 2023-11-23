import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPricePipe } from '../../pipes/product-price.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductPricePipe, MatButtonModule, MatCardModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  now: Date = new Date();

  productList: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.http
    //   .get<Product[]>('https://dummyjson.com/products')
    //   .subscribe((productList) => (this.productList = productList));

    this.http
      .get<any>('https://dummyjson.com/products')
      .subscribe((result) => (this.productList = result.products));
  }
}
