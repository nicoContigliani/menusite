"use client"

import { TextField, InputAdornment, Box, Chip } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  menuTitleFilter: string[]
  onMenuTitleFilter: (title: string) => void
  onClearFilters: () => void
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  menuTitleFilter,
  onMenuTitleFilter,
  onClearFilters,
}: SearchBarProps) {
  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar platos..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* Filtros activos */}
      {menuTitleFilter.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {menuTitleFilter.map((title) => (
            <Chip
              key={title}
              label={title}
              onDelete={() => onMenuTitleFilter(title)}
              color="primary"
              variant="outlined"
            />
          ))}
          <Chip label="Limpiar filtros" onClick={onClearFilters} variant="outlined" />
        </Box>
      )}
    </>
  )
}


