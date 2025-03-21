"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material"

interface FilterDialogProps {
  open: boolean
  onClose: () => void
  menuTitles: string[]
  selectedFilters: string[]
  onFilterChange: (title: string) => void
  onClearFilters: () => void
}

export default function FilterDialog({
  open,
  onClose,
  menuTitles,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: FilterDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filtrar por tipo</DialogTitle>
      <DialogContent>
        <FormGroup>
          {menuTitles.map((title) => (
            <FormControlLabel
              key={title}
              control={<Checkbox checked={selectedFilters.includes(title)} onChange={() => onFilterChange(title)} />}
              label={title}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClearFilters}>Limpiar</Button>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

