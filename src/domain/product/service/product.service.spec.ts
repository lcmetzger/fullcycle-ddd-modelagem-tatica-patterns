import { Product } from "../entity/product";
import { ProductService } from "../service/product.service";

describe("Product service unit test", () => {
  it("should change prices with percent", () => {
    const p1 = new Product("any_product_id", "any_name", 100);
    const p2 = new Product("other_product_id", "other_name", 200);
    const products: Product[] = [p1, p2];

    ProductService.changeAllPrices(products, 100);

    expect(p1.price).toBe(200);
    expect(p2.price).toBe(400);
  });
});
