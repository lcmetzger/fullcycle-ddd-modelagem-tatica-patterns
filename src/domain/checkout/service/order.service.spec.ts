import { Customer } from "../../customer/entity/customer";
import { Address } from "../../customer/vo/address";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";
import { OrderService } from "./order.service";

describe("Order Service unit tests", () => {
  it("should add any order", () => {
    const address = new Address("street 1", "city", "state", "89040115");
    const customer = new Customer("c1", "customer 1", address, true);
    const i1 = new OrderItem("i1", "p1", 2, 100);
    const i2 = new OrderItem("i2", "p2", 2, 200);

    const order: Order = OrderService.placeOrder(customer, [i1, i2]);

    expect(order.total()).toBe(600);
    expect(customer.rewardPoints).toBe(300);
  });
  it("should throws when add order without any item", () => {
    const address = new Address("street 1", "city", "state", "89040115");
    const customer = new Customer("c1", "customer 1", address, true);

    expect(() => {
      const order: Order = OrderService.placeOrder(customer, []);
    }).toThrowError("Order must have at least one item");
  });
});
