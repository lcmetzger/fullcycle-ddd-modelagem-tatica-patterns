import { OrderItem } from "./order-item";

export class Order {
  constructor(
    private _id: string,
    private _customerId: string,
    private _items: OrderItem[]
  ) {
    this.validate();
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.total, 0);
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }

    if (this._items.length === 0) {
      throw new Error("Item qtd must be greater than zero");
    }

    if (this._items.some((item) => item.qtd <= 0)) {
      throw new Error("Quantity must be greater than zero");
    }

    if (this._items.some((item) => item.price <= 0)) {
      throw new Error("Price must be greater than zero");
    }
  }
}
