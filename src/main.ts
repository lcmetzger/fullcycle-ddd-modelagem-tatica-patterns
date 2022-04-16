import { Address } from "./entiity/address";
import { Customer } from "./entiity/customer";
import { Order } from "./entiity/order";
import { OrderItem } from "./entiity/order-item";

const customer = new Customer(
  "123",
  "Luiz Carlos",
  new Address("Rua XV, 123", "Blumenau", "SC", "89100"),
  true
);

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 15);
const order = new Order("1", "123", [item1, item2]);

console.log(`\n\nAmount: ${order.total()}\n\n`);
