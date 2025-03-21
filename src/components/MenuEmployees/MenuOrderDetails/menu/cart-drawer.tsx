"use client"

import { Drawer, Box, Typography, List, Divider, Button } from "@mui/material"
import CartItemComponent from "./cart-item"
import type { CartItem } from "@/types/menu-types"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  cartItems: CartItem[]
  onRemoveItem: (id: string) => void
  onIncrementItem: (id: string) => void
  onDecrementItem: (id: string) => void
}

export default function CartDrawer({
  open,
  onClose,
  cartItems,
  onRemoveItem,
  onIncrementItem,
  onDecrementItem,
}: CartDrawerProps) {
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.price + item.extrasTotal) * item.quantity
    }, 0)
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Pedido Actual
        </Typography>

        {cartItems.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", my: 4 }}>
            El pedido está vacío
          </Typography>
        ) : (
          <>
            <List sx={{ mb: 2 }}>
              {cartItems.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onRemove={onRemoveItem}
                  onIncrement={onIncrementItem}
                  onDecrement={onDecrementItem}
                />
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${calculateTotal().toFixed(2)}</Typography>
            </Box>

            <Button variant="contained" color="primary" fullWidth size="large">
              Confirmar Pedido
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  )
}

