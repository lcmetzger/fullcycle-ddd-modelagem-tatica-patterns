import { Product } from "./product";

describe("Product Test", () => {
  it("should throw error if id is empty", () => {
    expect(() => {
      new Product("", "any_name", 15);
    }).toThrowError("Id is required");
  });

  it("should throw error if name is empty", () => {
    expect(() => {
      new Product("any_product_id", "", 15);
    }).toThrowError("Name is required");
  });

  it("should throw error if price is less than zero", () => {
    expect(() => {
      new Product("any_product_id", "any-name", -15);
    }).toThrowError("Price is less than zero");
  });

  it("should change name", () => {
    const product = new Product("any_product_id", "any-name", 15);
    product.changeName("other_name");
    expect(product.name).toBe("other_name");
  });

  it("should change price", () => {
    const product = new Product("any_product_id", "any-name", 15);
    product.changePrice(155.55);
    expect(product.price).toBe(155.55);
  });
});
