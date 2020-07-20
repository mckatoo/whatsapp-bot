import { MessageType, WAClient } from '@adiwajshing/baileys'
import axios from 'axios'
import align from 'align-text-line'

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

  const lineSize = 27
  let menu = `${align.centralized(
    ` MENU ${title.toUpperCase()} `,
    '-',
    lineSize
  )}\n${align.leftAligned('Escolha uma das opções:', ' ', lineSize)}\n`
  for (const opc of opcoes.data) {
    opc.option === undefined
      ? (menu = `${menu}${align.leftRightAligned(
          `${opc.id}`,
          `${opc.title}`,
          '-',
          lineSize
        )}\n`)
      : (menu = `${menu}${align.leftRightAligned(
          `${opc.id}-${opc.option}`,
          `R$${parseFloat(opc.price).toFixed(2)}`,
          '-',
          lineSize
        )}\n`)
  }
  menu = `\`\`\`${menu}\`\`\``
  client.sendMessage(remoteJid, menu, type)
}

function isNumber(text: string): boolean {
  return !isNaN(parseInt(text)) && isFinite(parseInt(text))
}
