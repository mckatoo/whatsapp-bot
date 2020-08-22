export type OptionsMenusProps = {
  optionsMenus: [
    {
      id: number
      option: string
      menu: {
        id: number
        title: string
      }
      price: number
    }
  ]
}

export type MenusProps = {
  menus: [
    {
      id: number
      title: string
    }
  ]
}
