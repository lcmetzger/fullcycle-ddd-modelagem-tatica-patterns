import { Address } from "../entiity/address";
import { Customer } from "../entiity/customer";
import { Order } from "../entiity/order";
import { OrderItem } from "../entiity/order-item";
import { OrderService } from "./order.service";

describe("Order Service unit tests", () => {
  it("should add award to customer", () => {
    const address = new Address("street 1", "city", "state", "89040115");
    const customer = new Customer("c1", "customer 1", address, true);
    const i1 = new OrderItem("i1", "p1", "item 1", 2, 100);
    const i2 = new OrderItem("i2", "p2", "item 2", 2, 200);

    const order: Order = OrderService.placeOrder(customer, [i1, i2]);

    expect(order.total()).toBe(600);
    expect(customer.rewardPoints).toBe(300);
  });
});
