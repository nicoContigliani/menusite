export interface MenuExtra {
    name: string;
    price: number;
}

export interface MenuItem {
    Menu_Title?: string;
    Item_Image?: string;
    Section: string;
    Item_id: string | number;
    Name: string;
    Description: string;
    Price: string | number;
    highlight?: string;
    status?: string;
    extra?: string;
    extras?: MenuExtra[];
}

export interface CartExtra {
    id: string;
    name: string;
    price: number;
}

export type OrderStatus = 'pending' | 'processing' | 'paused' | 'finished' | 'cancelled' | 'delivered';

export interface CartItem {
    id: string;
    itemId: string | number;
    name: string;
    price: number;
    quantity: number;
    extras: CartExtra[];
    comments: string;
    description?: string;
    extrasTotal?: number;
    isPromotion?: boolean;
    originalPrice?: number;
}

export interface Order {
    _id: string;
    id: string;
    orderType: any;
    dataTypeOrder: any;
    cart: CartItem[];
    comments: string;
    companiesName: string;
    companiesID: string;
    email: string;
    fullname: string;
    phone: string;
    whatsapp?: string;
    channel: string;
    name: string;
    timestamp: string;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    version: number;
}

export interface EditOrderModalProps {
    open: boolean;
    handleClose: () => void;
    order: Order;
    onSave: (updatedOrder: Order) => void;
    menuData: {
        mainMenu: MenuItem[];
        promotions: MenuItem[];
    };
}