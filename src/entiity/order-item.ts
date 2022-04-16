export class OrderItem {
  constructor(
    private _id: string,
    private _name: string,
    private _price: number
  ) {}

  get price(): number {
    return this._price;
  }
}
