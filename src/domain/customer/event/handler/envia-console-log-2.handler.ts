//
// O primeiro evento deverá acontecer quando um novo Customer é criado. Nesse ponto, crie 2 handlers exibindo um "console.log".
//
// Handler1: EnviaConsoleLog1Handler. Mensagem: "Esse é o primeiro console.log do evento: CustomerCreated".
// Handler2: EnviaConsoleLog2Handler. Mensagem: "Esse é o segundo console.log do evento: CustomerCreated".
//
// os testes devem ser realizados para garantir o bom funcionamento dos eventos.

import { EventHandlerInterface } from "../../../@shared/event/event-handler.interface";
import { EventInterface } from "../../../@shared/event/event.interface";

//
export class EnviaConsoleLog2Handler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
