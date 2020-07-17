import { MessageType, WAClient } from '@adiwajshing/baileys'
import axios from 'axios'

export async function sendMenu(
  menuTitle: string,
  remoteJid: string,
  client: WAClient,
  type: MessageType
): Promise<void> {
  let opcoes = await axios.get(
    `http://localhost:1337/options-menus?menu.title_contains=${menuTitle}`
  )
  if (opcoes.data[0] === undefined) {
    opcoes = await axios.get(
      `http://localhost:1337/options-menus?menu.title_contains=principal`
    )
  }
  const title: string = opcoes.data[0].menu.title
  let menu = `----- MENU ${title.toUpperCase()} -----\nEscolha uma das opções:\n`
  for (const opc of opcoes.data) {
    menu = `${menu}${opc.id} - ${opc.option}\n`
  }
  client.sendMessage(remoteJid, menu, type)
}
