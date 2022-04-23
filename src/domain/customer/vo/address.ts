export class Address {
  constructor(
    private _street: string,
    private _city: string,
    private _state: string,
    private _zipcode: string
  ) {}

  get street(): string {
    return this._street;
  }
  get city(): string {
    return this._city;
  }
  get state(): string {
    return this._state;
  }
  get zipCode(): string {
    return this._zipcode;
  }
}
