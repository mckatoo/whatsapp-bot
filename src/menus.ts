import { MessageType, WAClient } from '@adiwajshing/baileys'
import align from 'align-text-line'
import clientGrapql from './graphql/client'
import {
  GET_OPTIONS_MENU_ID,
  GET_OPTIONS_MENU_TITLE,
} from './graphql/queries/getOptionsMenus'
import { GET_MENUS } from './graphql/queries/getMenus'
import { OptionsMenusProps, MenusProps } from 'types/api'

export async function sendMenu(
  search: string,
  remoteJid: string,
  client: WAClient,
  type: MessageType
): Promise<void> {
  let optionsMenus: OptionsMenusProps = {
    optionsMenus: [
      {
        id: 0,
        option: '',
        menu: {
          id: 0,
          title: '',
        },
        price: 0,
      },
    ],
  }

  let menus: MenusProps = {
    menus: [
      {
        id: 0,
        title: '',
      },
    ],
  }

  isNumber(search)
    ? ({ ...optionsMenus } = await clientGrapql.request(GET_OPTIONS_MENU_ID, {
        id: search,
      }))
    : ({ ...optionsMenus } = await clientGrapql.request(
        GET_OPTIONS_MENU_TITLE,
        {
          title: search,
        }
      ))

  optionsMenus.optionsMenus[0] == undefined
    ? ({ ...menus } = await clientGrapql.request(GET_MENUS))
    : null
  const dinamicMenu = optionsMenus || menus
  const title = dinamicMenu.optionsMenus[0]?.menu.title || 'PRINCIPAL'

  const lineSize = 27
  const menu = `${align.centralized(
    ` MENU ${title.toUpperCase()} `,
    '-',
    lineSize
  )}\n${align.leftAligned('Escolha uma das opções:', ' ', lineSize)}\n`
  console.log(`menu = ${menu}`)

// dinamicMenu pode ser tanto optionsMenus quanto menus
//   for (const opc of dinamicMenu) {
//     opc.option === undefined
//       ? (menu = `${menu}${align.leftRightAligned(
//           `${opc.id}`,
//           `${opc.title}`,
//           '-',
//           lineSize
//         )}\n`)
//       : (menu = `${menu}${align.leftRightAligned(
//           `${opc.id}-${opc.option}`,
//           `R$${parseFloat(opc.price).toFixed(2)}`,
//           '-',
//           lineSize
//         )}\n`)
//   }
//   menu = `\`\`\`${menu}\`\`\``
//   client.sendMessage(remoteJid, menu, type)
}

function isNumber(text: string): boolean {
  return !isNaN(parseInt(text)) && isFinite(parseInt(text))
}
