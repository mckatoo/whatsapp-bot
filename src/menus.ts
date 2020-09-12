import align from 'align-text-line'
import {
  GET_OPTIONS_MENU_ID,
  GET_OPTIONS_MENU_TITLE,
} from 'graphql/queries/getOptionsMenus'
import { isNumber } from 'utils/isNumber'
import { gqClient } from 'graphql/client'
import { GET_MENUS } from 'graphql/queries/getMenus'

const getMenu = async (search: string): Promise<string> => {
  const optionsMenus = isNumber(search)
    ? await gqClient.request(GET_OPTIONS_MENU_ID, {
        id: search,
      })
    : await gqClient.request(GET_OPTIONS_MENU_TITLE, {
        title: search,
      })
  const dinamicMenu =
    optionsMenus.optionsMenus[0] !== undefined
      ? optionsMenus.optionsMenus
      : (await gqClient.request(GET_MENUS)).menus
  const title = dinamicMenu[0]?.menu?.title || 'principal'
  const lineSize = 27
  let whatsapp_menu = `${align.centralized(
    ` MENU ${title.toUpperCase()} `,
    '-',
    lineSize
  )}\n${align.leftAligned('Escolha uma das opções:', ' ', lineSize)}\n`

  // dinamicMenu pode ser tanto optionsMenus quanto menus
  for (const opc of dinamicMenu || dinamicMenu.menu) {
    const { title, option, id, ...menu } = opc

    if (!option) {
      whatsapp_menu = `${whatsapp_menu}${align.leftRightAligned(
        `${id}`,
        `${title}`,
        '-',
        lineSize
      )}\n`
    } else {
      whatsapp_menu = `${whatsapp_menu}${align.leftRightAligned(
        `${id}-${option}`,
        `R$${parseFloat(menu.price).toFixed(2)}`,
        '-',
        lineSize
      )}\n`
    }
  }
  whatsapp_menu = `\`\`\`${whatsapp_menu}\`\`\``
  return whatsapp_menu
}

export { getMenu }
