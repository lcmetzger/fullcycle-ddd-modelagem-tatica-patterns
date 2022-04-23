import { IRepository } from "../../@shared/repository/repository-interface";
import { Customer } from "../entity/customer";

export default interface CustomerRepositoryInterface
  extends IRepository<Customer> {}
