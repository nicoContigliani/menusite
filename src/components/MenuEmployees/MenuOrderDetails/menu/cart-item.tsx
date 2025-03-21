"use client"

import { ListItem, Box, Typography, IconButton } from "@mui/material"
import { Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material"
import type { CartItem } from "@/types/menu-types"

interface CartItemProps {
  item: CartItem
  onRemove: (id: string) => void
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
}

export default function CartItemComponent({ item, onRemove, onIncrement, onDecrement }: CartItemProps) {
  return (
    <ListItem
      sx={{
        flexDirection: "column",
        alignItems: "flex-start",
        borderBottom: "1px solid #eee",
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">{item.name}</Typography>
        <IconButton size="small" color="error" onClick={() => onRemove(item.id)} aria-label="eliminar">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      {item.extras.length > 0 && (
        <Box sx={{ ml: 2, mb: 1 }}>
          {item.extras.map((extra) => (
            <Typography key={extra.name} variant="body2" color="text.secondary">
              + {extra.name.replace("_", " ")} (${extra.price})
            </Typography>
          ))}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton size="small" onClick={() => onDecrement(item.id)} aria-label="disminuir cantidad">
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
          <IconButton size="small" onClick={() => onIncrement(item.id)} aria-label="aumentar cantidad">
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="body2" fontWeight="bold">
          ${((item.price + item.extrasTotal) * item.quantity).toFixed(2)}
        </Typography>
      </Box>
    </ListItem>
  )
}

