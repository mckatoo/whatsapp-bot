import { MessageType, WAClient, WASendMessageResponse } from "@adiwajshing/baileys";

export function send (
  remoteJid: string,
  client: WAClient,
  type: MessageType
): Promise<WASendMessageResponse> {
  return client.sendMessage(
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

