export const GET_OPTIONS_MENU_ID = /* GraphQL */ `
  query GET_OPTIONS_MENU_ID($id: ID!) {
    optionsMenus(where: { menu: { id: $id } }) {
      id
      option
      menu {
        id
        title
      }
      price
    }
  }
`
export const GET_OPTIONS_MENU_TITLE = /* GraphQL */ `
  query GET_OPTIONS_MENU_TITLE($title: String!) {
    optionsMenus(where: { menu: { title_contains: $title } }) {
      id
      option
      menu {
        id
        title
      }
      price
    }
  }
`
