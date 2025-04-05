import { useState } from 'react';

type MenuItemType = {
  Item_id: string;
  Name: string;
  Price: string;
  Description: string;
};

type MenuItemExtra = {
  id: string;
  name: string;
  price: number;
};

type CartItem = {
  id: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  extras: MenuItemExtra[];
  extrasTotal: number;
  Description: string;
};

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<MenuItemExtra[]>([]);

  const addToCart = (item: MenuItemType, extras: MenuItemExtra[] = []) => {
    const price = Number.parseFloat(item.Price.replace("$", ""));
    const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);

    const newItem: CartItem = {
      id: Date.now().toString(),
      itemId: item.Item_id,
      name: item.Name,
      price: price,
      quantity: 1,
      extras: extras,
      extrasTotal: extrasTotal,
      Description: item.Description
    };

    setCart([...cart, newItem]);
    setDetailsOpen(false);
    setSelectedExtras([]);
  };

  const openDetails = (item: MenuItemType) => {
    setSelectedItem(item);
    setSelectedExtras([]);
    setDetailsOpen(true);
  };

  const incrementQuantity = (id: string) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (id: string) => {
    setCart(cart
      .map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price + item.extrasTotal) * item.quantity;
    }, 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    detailsOpen,
    selectedItem,
    selectedExtras,
    setSelectedExtras,
    addToCart,
    openDetails,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    getCartTotal,
    getItemCount,
    setDetailsOpen
  };
};

export default useCart;