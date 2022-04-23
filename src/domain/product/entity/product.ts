export class Product {
  constructor(
    private _id: string,
    private _name: string,
    private _price: number
  ) {
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    if (this._price < 0) {
      throw new Error("Price is less than zero");
    }
  }
}
