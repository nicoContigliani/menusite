// types/order.ts
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
  extra?: any[] | any | null
}

export interface Customer {
  email: string;
  name: string;
  phone?: string;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  customer: Customer;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}