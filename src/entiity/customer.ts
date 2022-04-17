import { Address } from "./address";

export class Customer {
  constructor(
    private _id: string,
    private _name: string,
    private _address: Address,
    private _active: boolean
  ) {
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  get name(): string {
    return this._name;
  }

  get isActive(): boolean {
    return this._active;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    this._active = true;
    this.validate();
  }

  deactivate() {
    this._active = false;
    this.validate();
  }
}
