import { Product } from "../entity/product";

export class ProductService {
  static changeAllPrices(products: Product[], percent: number): void {
    products.forEach((p) => p.changePrice((p.price * percent) / 100 + p.price));
  }
}
