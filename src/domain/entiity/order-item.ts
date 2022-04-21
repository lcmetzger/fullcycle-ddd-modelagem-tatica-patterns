export class OrderItem {
  constructor(
    private _id: string,
    private _productId: string,
    private _name: string,
    private _qtd: number,
    private _price: number
  ) {}

  get price(): number {
    return this._price;
  }

  get qtd(): number {
    return this._qtd;
  }

  get total(): number {
    return this._qtd * this._price;
  }
}
