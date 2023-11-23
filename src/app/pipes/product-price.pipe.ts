import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productPrice',
  standalone: true,
})
export class ProductPricePipe implements PipeTransform {
  transform(product: Product): number {
    if (product.discountPercentage) {
      return product.price - (product.price * product.discountPercentage) / 100;
    }

    return product.price;
  }
}
