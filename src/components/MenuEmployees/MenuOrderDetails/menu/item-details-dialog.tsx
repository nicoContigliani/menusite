"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
} from "@mui/material"
import type { MenuItem, MenuItemExtra } from "@/types/menu-types"

interface ItemDetailsDialogProps {
  open: boolean
  onClose: () => void
  selectedItem: MenuItem | null
  selectedExtras: MenuItemExtra[]
  onExtraToggle: (extra: MenuItemExtra) => void
  onAddToCart: (item: MenuItem, extras: MenuItemExtra[]) => void
}

export default function ItemDetailsDialog({
  open,
  onClose,
  selectedItem,
  selectedExtras,
  onExtraToggle,
  onAddToCart,
}: ItemDetailsDialogProps) {
  if (!selectedItem) return null

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{selectedItem.Name}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" paragraph>
          {selectedItem.Description}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {selectedItem.Price}
        </Typography>

        {selectedItem.extras && selectedItem.extras.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Extras disponibles:
            </Typography>
            <FormGroup>
              {selectedItem.extras.map((extra) => (
                <FormControlLabel
                  key={extra.name}
                  control={
                    <Checkbox
                      checked={selectedExtras.some((e) => e.name === extra.name)}
                      onChange={() => onExtraToggle(extra)}
                    />
                  }
                  label={`${extra.name.replace("_", " ")} (+$${extra.price})`}
                />
              ))}
            </FormGroup>
          </>
        )}

        {selectedExtras.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">
              Extras seleccionados: ${selectedExtras.reduce((sum, extra) => sum + extra.price, 0)}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="secondary" onClick={() => onAddToCart(selectedItem, selectedExtras)}>
          Agregar al pedido
        </Button>
      </DialogActions>
    </Dialog>
  )
}

