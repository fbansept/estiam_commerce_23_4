interface Product {
  name: string;
  price: number;
  description?: string;
  disable?: boolean;
  discount?: {
    value: number;
    type: 'percent' | 'fixed';
  };
}
