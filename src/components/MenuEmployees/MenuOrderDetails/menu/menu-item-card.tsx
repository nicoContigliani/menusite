"use client"

import { ListItem, Box, Typography, IconButton } from "@mui/material"
import { Info as InfoIcon, Add as AddIcon } from "@mui/icons-material"
import type { MenuItem } from "../../../../../types/menu-types"


interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
  onOpenDetails: (item: MenuItem) => void
}

export default function MenuItemCard({ item, onAddToCart, onOpenDetails }: MenuItemCardProps) {
  return (
    <ListItem
      sx={{
        flexDirection: "column",
        alignItems: "flex-start",
        borderBottom: "1px solid #eee",
        py: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        {item.Item_Image && (
          <Box sx={{ width: 80, height: 80, position: "relative", borderRadius: 1, overflow: "hidden" }}>
            <img
              src={item.Item_Image || "/placeholder.svg"}
              alt={item.Name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" component="div">
            {item.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {item.Description}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {item.Price}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {item.extras && item.extras.length > 0 && (
            <IconButton color="primary" onClick={() => onOpenDetails(item)} size="small" aria-label="ver detalles">
              <InfoIcon />
            </IconButton>
          )}

          <IconButton color="secondary" onClick={() => onAddToCart(item)} size="small" aria-label="agregar al pedido">
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </ListItem>
  )
}

