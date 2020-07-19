import { MessageType, WAClient } from '@adiwajshing/baileys'
import axios from 'axios'
import align from 'align-text-line'

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
  const lineSize = 42
  let menu = `${align.centralized(` MENU ${title.toUpperCase()} `, '-', lineSize)}\n${align.leftAligned('Escolha uma das opções:', ' ', lineSize)}\n`
  for (const opc of opcoes.data) {
    menu = `${menu}${align.leftRightAligned(`${opc.id} `, `${opc.option} `, '-', lineSize)}\n`
  }
  client.sendMessage(remoteJid, menu, type)
}
