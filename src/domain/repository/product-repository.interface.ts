import { Product } from "../entiity/product";
import { IRepository } from "./repository-interface";

export default interface ProductRepositoryInterface
  extends IRepository<Product> {}
