export interface MenuItemExtra {
    name: string
    price: number
  }
  
  export interface MenuItem {
    Menu_Title?: string
    Item_Image: string
    Section: string
    Item_id: number
    Name: string
    Description: string
    Price: string
    extra?: string
    extras?: MenuItemExtra[]
  }
  
  export interface MenuCategory {
    key: string
    element: MenuItem[]
  }
  
  export interface CartItem {
    id: string
    itemId: number
    name: string
    price: number
    quantity: number
    extras: MenuItemExtra[]
    extrasTotal: number
  }
  
  