import { Address } from "./address";

export class Customer {
  constructor(
    private _id: string,
    private _name: string,
    private _address: Address,
    private _active: boolean,
    private _rewardPoints: number = 0
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

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get isActive(): boolean {
    return this._active;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
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
