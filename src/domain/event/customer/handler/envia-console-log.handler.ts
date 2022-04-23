import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { EventInterface } from "../../@shared/event.interface";

//
// O segundo evento deverá ser disparado quando o endereço do Customer é trocado (método changeAddress()). Nesse caso, o ID, Nome, bem como os dados do endereço devem ser passados ao evento.
//
// Handler: EnviaConsoleLogHandler. Mensagem: "Endereço do cliente: {id}, {nome} alterado para: {endereco}".
//
export class EnviaConsoleLogHandler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    console.log(
      `Endereço do cliente: "${event.eventData.id}", "${event.eventData.name}" alterado para: "${event.eventData.address}"`
    );
  }
}
