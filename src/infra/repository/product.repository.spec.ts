import { Sequelize } from "sequelize-typescript";
import { Product } from "../../domain/entiity/product";
import { ProductModel } from "../db/sequelize/model/product.model";
import { ProductRepository } from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository: ProductRepository = new ProductRepository();
    const product = new Product("any_id", "any_product", 100);

    await productRepository.create(product);

    const producotModel = await ProductModel.findOne({
      where: { id: "any_id" },
    });

    expect(producotModel.toJSON()).toStrictEqual({
      id: "any_id",
      name: "any_product",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository: ProductRepository = new ProductRepository();
    const product = new Product("any_id", "any_product", 100);

    await productRepository.create(product);

    const productModel1 = await ProductModel.findOne({
      where: { id: "any_id" },
    });

    expect(productModel1.toJSON()).toStrictEqual({
      id: "any_id",
      name: "any_product",
      price: 100,
    });

    product.changeName("other_product");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({
      where: { id: "any_id" },
    });

    expect(productModel2.toJSON()).toStrictEqual({
      id: "any_id",
      name: "other_product",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository: ProductRepository = new ProductRepository();
    const product = new Product("any_id", "any_product", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: "any_id" },
    });

    const foundProduct = await productRepository.find("any_id");

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("should find all products", async () => {
    const productRepository: ProductRepository = new ProductRepository();
    const p1 = new Product("any_id", "any_product", 100);
    const p2 = new Product("other_id", "other_product", 100);
    const p3 = new Product("another_id", "another_product", 100);
    const products = [p1, p2, p3];

    await productRepository.create(p1);
    await productRepository.create(p2);
    await productRepository.create(p3);

    const foundProducts = await productRepository.findAll();
    expect(products).toEqual(foundProducts);
  });
});
