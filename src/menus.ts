import WhatsAppWebMessages from "@adiwajshing/baileys/lib/WAClient/Messages";
import { MessageType } from "@adiwajshing/baileys";

export function Principal(
  remoteJid: string,
  msg: WhatsAppWebMessages,
  type: MessageType
): void {
  msg.sendMessage(
    remoteJid,
    `
              ----- MENU PRINCIPAL -----
              Escolha uma das opções:
              1 - Pizzas
              2 - Lanches
              3 - Porções
              4 - Fazer uma sugestão, reclamação ou elogio
              `,
    type
  );
}

export function Pizzas(
  remoteJid: string,
  msg: WhatsAppWebMessages,
  type: MessageType
): void {
  msg.sendMessage(
    remoteJid,
    `
              ----- PIZZAS -----
              1 ou 2 Sabores?
              `,
    type
  );
}
export function Lanches(
  remoteJid: string,
  msg: WhatsAppWebMessages,
  type: MessageType
): void {
  msg.sendMessage(
    remoteJid,
    `
              ----- PIZZAS -----
              Digite de 1 a 4 para escolher as opções:
              1 - X-Salada
              2 - X-Salada Bacon
              3 - X-Burger
              4 - Voltar ao menu principal
              `,
    type
  );
}
export function NotaAtendimento(
  remoteJid: string,
  msg: WhatsAppWebMessages,
  type: MessageType
): void {
  msg.sendMessage(
    remoteJid,
    `
              ----- PIZZAS -----
              Digite de 1 a 4 para escolher as opções:
              1 - Ótimo
              2 - Bom
              3 - Ruim
              4 - Péssimo
              `,
    type
  );
}
