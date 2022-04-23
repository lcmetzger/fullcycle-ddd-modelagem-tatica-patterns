import { Address } from "../vo/address";
import { Customer } from "./customer";

describe("Customer Test", () => {
  it("should throw error id is empty", () => {
    const address: Address = new Address(
      "any_streen",
      "any_city",
      "any_state",
      "any_zipcode"
    );
    expect(() => {
      const customer: Customer = new Customer("", "any_name", address, true);
    }).toThrowError("Id is required");
  });

  it("should throw error name is empty", () => {
    const address: Address = new Address(
      "any_streen",
      "any_city",
      "any_state",
      "any_zipcode"
    );
    expect(() => {
      let customer: Customer = new Customer("any_id", "", address, true);
    }).toThrowError("Name is required");
  });

  it("should change the name", () => {
    const address: Address = new Address(
      "any_streen",
      "any_city",
      "any_state",
      "any_zipcode"
    );
    const customer: Customer = new Customer(
      "any_id",
      "any_name",
      address,
      true
    );
    customer.changeName("Maria");
    expect(customer.name).toBe("Maria");
  });

  it("should change to active", () => {
    const address: Address = new Address(
      "any_streen",
      "any_city",
      "any_state",
      "any_zipcode"
    );
    const customer: Customer = new Customer(
      "any_id",
      "any_name",
      address,
      false
    );
    customer.activate();
    expect(customer.isActive).toBeTruthy();
  });

  it("should change to deactive", () => {
    const address: Address = new Address(
      "any_streen",
      "any_city",
      "any_state",
      "any_zipcode"
    );
    const customer: Customer = new Customer(
      "any_id",
      "any_name",
      address,
      true
    );
    customer.deactivate();
    expect(customer.isActive).toBeFalsy();
  });
});
