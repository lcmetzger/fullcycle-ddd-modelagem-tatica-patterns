import { Address } from "./address";

export class Customer {
  constructor(
    private _id: string,
    private _name: string,
    private _address: Address,
    private _active: boolean
  ) {}

  changeName(name: string) {
    this._name = name;
  }

  activated() {
    this._active = true;
  }

  deactivated() {
    this._active = false;
  }
}
