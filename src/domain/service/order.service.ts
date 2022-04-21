import { Customer } from "../entiity/customer";
import { Order } from "../entiity/order";
import { OrderItem } from "../entiity/order-item";
import { v4 as uuid } from "uuid";

export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]) {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }
}
