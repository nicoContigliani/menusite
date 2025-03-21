"use client"

import { Paper, List, Typography } from "@mui/material"
import MenuItemCard from "./menu-item-card"
import type { MenuItem, MenuCategory } from ".../../../types/menu-types"

interface MenuListProps {
  categories: MenuCategory[]
  tabValue: number
  onAddToCart: (item: MenuItem) => void
  onOpenDetails: (item: MenuItem) => void
}

export default function MenuList({ categories, tabValue, onAddToCart, onOpenDetails }: MenuListProps) {
  // Check if categories is valid
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">No se encontraron resultados</Typography>
      </Paper>
    )
  }

  // Check if tabValue is valid
  if (tabValue < 0 || tabValue >= categories.length) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">Categoría no válida</Typography>
      </Paper>
    )
  }

  const currentCategory = categories[tabValue]

  // Check if the current category has elements
  if (
    !currentCategory ||
    !currentCategory.element ||
    !Array.isArray(currentCategory.element) ||
    currentCategory.element.length === 0
  ) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">No hay elementos en esta categoría</Typography>
      </Paper>
    )
  }

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <List>
        {currentCategory.element.map((item) => (
          <MenuItemCard
            key={item.Item_id || Math.random().toString()}
            item={item}
            onAddToCart={onAddToCart}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </List>
    </Paper>
  )
}

