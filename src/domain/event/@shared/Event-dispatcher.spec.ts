import { AddressChangedEvent } from "../customer/address-changed.event";
import { CustomerCreatedEvent } from "../customer/customer-created.event";
import { EnviaConsoleLog1Handler } from "../customer/handler/envia-console-log-1.handler";
import { EnviaConsoleLog2Handler } from "../customer/handler/envia-console-log-2.handler";
import { EnviaConsoleLogHandler } from "../customer/handler/envia-console-log.handler";
import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-create.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all events handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
    expect(eventDispatcher.getEventHandlers).toEqual({});
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    const spy = jest.spyOn(eventHandler, "handle");

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "",
      description: "",
      price: 10.1,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spy).toHaveBeenCalled();
  });

  it("should notify all customer events handlers (customer created event & address changed event) ", () => {
    const eventDispatcher = new EventDispatcher();

    const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();
    const enviaConsoleLogHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);
    eventDispatcher.register("AddressChangedEvent", enviaConsoleLogHandler);

    const spy1 = jest.spyOn(enviaConsoleLog1Handler, "handle");
    const spy2 = jest.spyOn(enviaConsoleLog2Handler, "handle");
    const spy3 = jest.spyOn(enviaConsoleLogHandler, "handle");

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(enviaConsoleLog1Handler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(enviaConsoleLog2Handler);
    expect(
      eventDispatcher.getEventHandlers["AddressChangedEvent"][0]
    ).toMatchObject(enviaConsoleLogHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "any_id",
      name: "any_name",
      address: "any_address",
    });

    eventDispatcher.notify(customerCreatedEvent);

    const addressChangedEvent = new AddressChangedEvent({
      id: "any_id",
      name: "any_name",
      address: "any_address",
    });

    eventDispatcher.notify(addressChangedEvent);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });
});
