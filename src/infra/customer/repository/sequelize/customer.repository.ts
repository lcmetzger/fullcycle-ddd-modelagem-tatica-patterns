import { Customer } from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import { Address } from "../../../../domain/customer/vo/address";
import { CustomerModel } from "./customer.model";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive,
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      city: entity.address.city,
      state: entity.address.state,
      zipCode: entity.address.zipCode,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        active: entity.isActive,
        rewardPoints: entity.rewardPoints,
        street: entity.address.street,
        city: entity.address.city,
        state: entity.address.state,
        zipCode: entity.address.zipCode,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    const productModel = await CustomerModel.findOne({ where: { id: id } });
    const address = new Address(
      productModel.street,
      productModel.city,
      productModel.state,
      productModel.zipCode
    );
    return new Customer(
      productModel.id,
      productModel.name,
      address,
      productModel.active,
      productModel.rewardPoints
    );
  }

  async findAll(): Promise<Customer[]> {
    const productsModel = await CustomerModel.findAll();

    return productsModel.map((cm) => {
      const address: Address = new Address(
        cm.street,
        cm.city,
        cm.state,
        cm.zipCode
      );
      return new Customer(cm.id, cm.name, address, cm.active, cm.rewardPoints);
    });
  }
}
