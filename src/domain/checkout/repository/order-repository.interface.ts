import { IRepository } from "../../@shared/repository/repository-interface";
import { Order } from "../entity/order";

export interface OrderRepositoryInterface extends IRepository<Order> {}
