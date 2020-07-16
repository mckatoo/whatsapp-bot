import { MessageType, WAClient } from "@adiwajshing/baileys";
import axios from 'axios'

export async function sendMenu (
  menuTitle: string,
  remoteJid: string,
  client: WAClient,
  type: MessageType
): Promise<void> {
  const opcoes = await axios.get('http://localhost:1337/options-menus')
  client.sendMessage(
    remoteJid,
    `
              ----- MENU ${menuTitle.toUpperCase()} -----
              Escolha uma das opções:
              ${opcoes}
              `,
    type
  );
}

