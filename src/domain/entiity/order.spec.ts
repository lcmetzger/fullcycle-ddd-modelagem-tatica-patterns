import { Order } from "./order";
import { OrderItem } from "./order-item";

const makeOrderItem = (): OrderItem => {
  const item = new OrderItem("any_item_id", "any_product_id", 2, 100);
  return item;
};

const makeOrderItem2 = (): OrderItem => {
  const item = new OrderItem("other_item_id", "other_product_id", 3, 15);
  return item;
};

describe("Customer Test", () => {
  it("should throw error if id is empty", () => {
    expect(() => {
      const order = new Order("", "any_customer_id", [makeOrderItem()]);
    }).toThrowError("Id is required");
  });

  it("should throw error if customer_id is empty", () => {
    expect(() => {
      const order = new Order("any_order_id", "", [makeOrderItem()]);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error if items count is equal to zero", () => {
    expect(() => {
      const order = new Order("any_order_id", "any_customer_id", []);
    }).toThrowError("Item qtd must be greater than zero");
  });

  it("should calculate Total", () => {
    const order = new Order("any_order_id", "any_customer_id", [
      makeOrderItem(),
      makeOrderItem2(),
    ]);
    expect(order.total()).toBe(245);
  });

  it("should throw error when item qtd is greater than zero", () => {
    expect(() => {
      const item = new OrderItem("1", "1", 0, 100);
      const order = new Order("any_order_id", "any_customer_id", [item]);
    }).toThrowError("Quantity must be greater than zero");
  });

  it("should throw error when item price qtd is greater than zero", () => {
    expect(() => {
      const item = new OrderItem("1", "1", 1, 0);
      const order = new Order("any_order_id", "any_customer_id", [item]);
    }).toThrowError("Price must be greater than zero");
  });
});
