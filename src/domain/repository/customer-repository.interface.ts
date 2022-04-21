import { Customer } from "../entiity/customer";
import { IRepository } from "./repository-interface";

export default interface CustomerRepositoryInterface
  extends IRepository<Customer> {}
