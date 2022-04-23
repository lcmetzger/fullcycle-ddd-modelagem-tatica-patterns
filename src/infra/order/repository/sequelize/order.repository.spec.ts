import { Sequelize } from "sequelize-typescript";
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/order-item";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/vo/address";
import { Product } from "../../../../domain/product/entity/product";
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import { ProductModel } from "../../../product/repository/sequelize/product.model";
import { ProductRepository } from "../../../product/repository/sequelize/product.repository";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";
import { OrderRepository } from "./order.repository";

const makeAddress = () =>
  new Address("any_street", "any_city", "any_state", "12345-678");

const makeCustomer = () =>
  new Customer("any_id", "any_name", makeAddress(), true, 0);

const makeProduct = (value: number) =>
  new Product(`p${value}`, `product${value}`, 100 * value);

const makeOrderItem = (value: number): OrderItem =>
  new OrderItem(`oi${value}`, makeProduct(value).id, value, value * 100);

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create any order", async () => {
    const customerRepository = new CustomerRepository();
    await customerRepository.create(makeCustomer());

    const productRepository = new ProductRepository();
    await productRepository.create(makeProduct(1));
    await productRepository.create(makeProduct(2));
    await productRepository.create(makeProduct(3));

    const orderRepository = new OrderRepository();
    const orderItems = [makeOrderItem(1), makeOrderItem(2), makeOrderItem(3)];
    const order = new Order("o1", makeCustomer().id, orderItems);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "o1",
      customerId: makeCustomer().id,
      items: orderItems.map((item) => ({
        id: item.id,
        price: item.price,
        productId: item.productId,
        qtd: item.qtd,
        orderId: order.id,
      })),
      total: 1400,
    });
  });

  it("should update any order", async () => {
    const customerRepository = new CustomerRepository();
    await customerRepository.create(makeCustomer());

    const productRepository = new ProductRepository();
    await productRepository.create(makeProduct(1));
    await productRepository.create(makeProduct(2));
    await productRepository.create(makeProduct(3));
    await productRepository.create(makeProduct(4));

    const orderRepository = new OrderRepository();
    const orderItems = [makeOrderItem(1), makeOrderItem(2), makeOrderItem(3)];
    const order = new Order("o1", makeCustomer().id, orderItems);

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "o1",
      customerId: makeCustomer().id,
      items: orderItems.map((item) => ({
        id: item.id,
        price: item.price,
        productId: item.productId,
        qtd: item.qtd,
        orderId: order.id,
      })),
      total: 1400,
    });

    order.items.push(makeOrderItem(4));

    await orderRepository.update(order);

    const updatedOrderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(updatedOrderModel.toJSON()).toStrictEqual({
      id: "o1",
      customerId: makeCustomer().id,
      items: order.items.map((item) => ({
        id: item.id,
        orderId: order.id,
        price: item.price,
        productId: item.productId,
        qtd: item.qtd,
      })),
      total: 3000,
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    await customerRepository.create(makeCustomer());

    const productRepository = new ProductRepository();
    await productRepository.create(makeProduct(1));
    await productRepository.create(makeProduct(2));
    await productRepository.create(makeProduct(3));

    const orderRepository = new OrderRepository();
    const orderItems = [makeOrderItem(1), makeOrderItem(2), makeOrderItem(3)];
    const order = new Order("o1", makeCustomer().id, orderItems);

    await orderRepository.create(order);

    const findedOrder = await orderRepository.find(order.id);
    expect(findedOrder).toStrictEqual(order);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    await customerRepository.create(makeCustomer());

    const productRepository = new ProductRepository();
    await productRepository.create(makeProduct(1));
    await productRepository.create(makeProduct(2));
    await productRepository.create(makeProduct(3));

    const orderRepository = new OrderRepository();

    const order1 = new Order("o1", makeCustomer().id, [makeOrderItem(1)]);
    await orderRepository.create(order1);

    const order2 = new Order("o2", makeCustomer().id, [
      makeOrderItem(2),
      makeOrderItem(3),
    ]);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();

    expect([order1, order2]).toEqual(foundOrders);
  });
});
