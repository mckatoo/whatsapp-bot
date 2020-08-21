import { MessageType, WAClient } from '@adiwajshing/baileys'
import align from 'align-text-line'
import clientGrapql from './graphql/client'
import {
  GET_OPTIONS_MENU_ID,
  GET_OPTIONS_MENU_TITLE,
} from './graphql/queries/getOptionsMenus'
import { GET_MENUS } from './graphql/queries/getMenus'
import { OptionsMenusProps } from 'types/api'

export async function sendMenu(
  search: string,
  remoteJid: string,
  client: WAClient,
  type: MessageType
): Promise<void> {
  // let parameter = ''
  let optionsMenus: OptionsMenusProps = {
    id: 0,
    option: '',
    menu: {
      id: 0,
      title: '',
    },
    price: 0,
  }
  isNumber(search)
    ? ({ optionsMenus } = await clientGrapql.request(GET_OPTIONS_MENU_ID, {id: search}))
    : ({ optionsMenus } = await clientGrapql.request(GET_OPTIONS_MENU_TITLE, {title: search}))
  console.log(`optionsMenus = ${optionsMenus}`)
  // if (isNumber(search)) {
  //   const { optionsMenus } = await clientGrapql.request(GET_OPTIONS_MENU_ID)
  // } else {
  //   const { optionsMenus } = await clientGrapql.request(GET_OPTIONS_MENU_TITLE)
  // }

  const { menus } = await clientGrapql.request(GET_MENUS)

  // let opcoes = await axios.get(
  //   `http://localhost:1337/options-menus?${parameter}${search}`
  // )
  // if (opcoes.data[0] === undefined) {
  //   { optionsMenus } = await axios.get(`http://localhost:1337/menus`)
  // }
  let title = ''

  menus.menu === undefined ? (title = 'PRINCIPAL') : (title = menus.menu.title)

  const lineSize = 27
  let menu = `${align.centralized(
    ` MENU ${title.toUpperCase()} `,
    '-',
    lineSize
  )}\n${align.leftAligned('Escolha uma das opções:', ' ', lineSize)}\n`
  for (const opc of menus) {
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
