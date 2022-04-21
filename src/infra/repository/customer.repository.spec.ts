import { Sequelize } from "sequelize-typescript";
import { Address } from "../../domain/entiity/address";
import { Customer } from "../../domain/entiity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import { CustomerRepository } from "./customer.repository";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository: CustomerRepository = new CustomerRepository();
    const address = new Address(
      "any_street",
      "any_city",
      "any_state",
      "12345-678"
    );
    const customer = new Customer("any_id", "any_name", address, true, 0);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "any_id" },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "any_id",
      name: "any_name",
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      active: true,
      rewardPoints: 0,
    });
  });

  it("should update a customer", async () => {
    const customerRepository: CustomerRepository = new CustomerRepository();
    const address = new Address(
      "any_street",
      "any_city",
      "any_state",
      "12345-678"
    );
    const customer = new Customer("any_id", "any_name", address, true, 0);

    await customerRepository.create(customer);

    const customerModel1 = await CustomerModel.findOne({
      where: { id: "any_id" },
    });

    expect(customerModel1.toJSON()).toStrictEqual({
      id: "any_id",
      name: "any_name",
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      active: true,
      rewardPoints: 0,
    });

    customer.changeName("other_name");

    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({
      where: { id: "any_id" },
    });

    expect(customerModel2.toJSON()).toStrictEqual({
      id: "any_id",
      name: "other_name",
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      active: true,
      rewardPoints: 0,
    });
  });

  it("should find a customer", async () => {
    const customerRepository: CustomerRepository = new CustomerRepository();
    const address = new Address(
      "any_street",
      "any_city",
      "any_state",
      "12345-678"
    );
    const customer = new Customer("any_id", "any_name", address, true, 0);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "any_id" },
    });

    const foundCustomer = await customerRepository.find("any_id");

    expect(customerModel.toJSON()).toStrictEqual({
      id: "any_id",
      name: "any_name",
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      active: true,
      rewardPoints: 0,
    });
  });

  it("should find all customers", async () => {
    const customerRepository: CustomerRepository = new CustomerRepository();
    const a1 = new Address("street1", "city1", "state1", "12345-678");
    const a2 = new Address("street2", "city2", "state2", "12345-678");
    const a3 = new Address("street3", "city3", "state3", "12345-678");
    const c1 = new Customer("c1", "name1", a1, true, 0);
    const c2 = new Customer("c2", "name2", a2, true, 0);
    const c3 = new Customer("c3", "name3", a3, true, 0);

    const customers = [c1, c2, c3];

    await customerRepository.create(c1);
    await customerRepository.create(c2);
    await customerRepository.create(c3);

    const foundCustomers = await customerRepository.findAll();
    expect(customers).toEqual(foundCustomers);
  });
});
