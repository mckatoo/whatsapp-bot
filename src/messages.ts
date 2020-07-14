import {
  getNotificationType,
  MessageType,
  WAClient,
} from "@adiwajshing/baileys";
import { Principal, Pizzas, Lanches, Porcoes } from "./menus";

class Messages {
  async verifyMessages(client: WAClient) {
    client.setOnUnreadMessage(true, async (m) => {
      const [notificationType, messageType] = getNotificationType(m);
      console.log("Recebeu notificação do tipo: " + notificationType);

      if (notificationType !== "message") {
        return;
      }
      if (m.key.fromMe) {
        console.log("Retransmitiu minha própria mensagem.");
        return;
      }

      let sender = m.key.remoteJid;

      if (m.key.participant) {
        sender += " (" + m.key.participant + ")";
      }

      if (messageType === MessageType.text && sender != null) {
        const text = m.message?.conversation;
        console.log(sender + " Enviou: " + text);
        if (text != "") {
            Principal(sender, client, MessageType.text);
        }
        switch (text) {
          case "menu":
            Principal(sender, client, MessageType.text);
            break;
          case "lanches":
            Lanches(sender, client, MessageType.text);
            break;
          case "pizza":
            Pizzas(sender, client, MessageType.text);
            break;
          case "porcoes":
            Porcoes(sender, client, MessageType.text);
            break;
          default:
            break;
        }
      }
    });
  }
}

export default new Messages();
