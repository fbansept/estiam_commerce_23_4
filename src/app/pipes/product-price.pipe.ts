import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productPrice',
  standalone: true,
})
export class ProductPricePipe implements PipeTransform {
  transform(product: Product): number {
    if (product.discount) {
      if (product.discount.type == 'fixed') {
        return product.price - product.discount.value;
      } else {
        return product.price - (product.price * product.discount.value) / 100;
      }
    }

    return product.price;
  }
}
