import { OrderItem } from "./order-item";

export class Order {
  constructor(
    private _id: string,
    private _customerId: string,
    private _items: OrderItem[]
  ) {}

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
