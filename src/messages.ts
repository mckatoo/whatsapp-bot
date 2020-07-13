import fs from "fs";
import {
  getNotificationType,
  MessageType,
  decodeMediaMessage,
  Presence,
  MessageOptions,
  Mimetype,
  WALocationMessage,
  WAClient,
} from "@adiwajshing/baileys";
import { Principal } from "./menus";

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
        // MENU ENTRA AQUI
        // Principal(sender, MessageType.text);
        console.log(sender + " Enviou: " + text);
      }
    });
  }
}

export default new Messages();
