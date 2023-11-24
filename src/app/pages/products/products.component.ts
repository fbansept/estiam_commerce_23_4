import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPricePipe } from '../../pipes/product-price.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductPricePipe,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  now: Date = new Date();
  isSeller: boolean = false;

  productList: Product[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    this.auth._user.subscribe(
      (user) => (this.isSeller = user ? user?.isSeller : false)
    );

    // this.http
    //   .get<Product[]>('https://dummyjson.com/products')
    //   .subscribe((productList) => (this.productList = productList));

    this.http
      .get<any>('https://dummyjson.com/products')
      .subscribe((result) => (this.productList = result.products));
  }
}
