"use client"

import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material"
import { ShoppingCart as ShoppingCartIcon, FilterList as FilterIcon } from "@mui/icons-material"

interface MenuHeaderProps {
  cartItemCount: number
  onCartOpen: () => void
  onFilterOpen: () => void
}

export default function MenuHeader({ cartItemCount, onCartOpen, onFilterOpen }: MenuHeaderProps) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Toma de Pedidos
        </Typography>

        <IconButton color="inherit" onClick={onFilterOpen} aria-label="filtros">
          <FilterIcon />
        </IconButton>

        <IconButton color="inherit" onClick={onCartOpen} aria-label="carrito">
          <Badge badgeContent={cartItemCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

