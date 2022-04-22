import { Order } from "../../domain/entiity/order";
import { OrderItem } from "../../domain/entiity/order-item";
import { OrderRepositoryInterface } from "../../domain/repository/order-repository.interface";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";
import { ProductModel } from "../db/sequelize/model/product.model";

export class OrderRepository implements OrderRepositoryInterface {
  //
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        items: entity.items.map((item) => ({
          id: item.id,
          price: item.price,
          productId: item.productId,
          qtd: item.qtd,
        })),
        total: entity.total(),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  //
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );

    OrderItemModel.destroy({
      where: { orderId: entity.id },
    });

    entity.items.forEach(async (item) => {
      OrderItemModel.create(
        {
          id: item.id,
          price: item.price,
          productId: item.productId,
          qtd: item.qtd,
          orderId: entity.id,
        },
        {
          include: [{ model: ProductModel }],
        }
      );
    });
  }

  //
  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id: id },
      include: [{ model: OrderItemModel }],
    });
    return new Order(
      orderModel.id,
      orderModel.customerId,
      orderModel.items.map(
        (item) => new OrderItem(item.id, item.productId, item.qtd, item.price)
      )
    );
  }

  //
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return orderModels.map(
      (order) =>
        new Order(
          order.id,
          order.customerId,
          order.items.map(
            (item) =>
              new OrderItem(item.id, item.productId, item.qtd, item.price)
          )
        )
    );
  }
}
