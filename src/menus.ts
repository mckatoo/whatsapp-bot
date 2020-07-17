import { MessageType, WAClient } from '@adiwajshing/baileys'
import axios from 'axios'

export async function sendMenu(
  search: string,
  remoteJid: string,
  client: WAClient,
  type: MessageType
): Promise<void> {
  let parameter = ''
  isNumber(search)
    ? (parameter = 'menu.id=')
    : (parameter = 'menu.title_contains=')
  let opcoes = await axios.get(
    `http://localhost:1337/options-menus?${parameter}${search}`
  )
  if (opcoes.data[0] === undefined) {
    opcoes = await axios.get(`http://localhost:1337/menus`)
  }
  let title = ''

  opcoes.data[0].menu === undefined
    ? (title = 'PRINCIPAL')
    : (title = opcoes.data[0].menu.title)

  let menu = `----- MENU ${title.toUpperCase()} -----\nEscolha uma das opções:\n`
  for (const opc of opcoes.data) {
    opc.option === undefined
      ? (menu = `${menu}*${opc.id}* - ${opc.title}\n`)
      : (menu = `${menu}*${opc.id}* - ${opc.option}\n`)
  }
  client.sendMessage(remoteJid, menu, type)
}

function isNumber(text: string): boolean {
  return !isNaN(parseInt(text)) && isFinite(parseInt(text))
}
