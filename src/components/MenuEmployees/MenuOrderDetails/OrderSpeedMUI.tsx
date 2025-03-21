"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Paper,
  Container,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
} from "@mui/material"
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Info as InfoIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material"
import { useMediaQuery } from "../../../../hooks/use-mobile"
import type { MenuItem, MenuCategory, CartItem, MenuItemExtra } from "../../../../types/menu-types"

export default function MenuInterface({ menuData }: { menuData: MenuCategory[] }) {
  console.log("🚀 ~ MenuInterface ~ menuData:", menuData)
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState<MenuCategory[]>(menuData)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<MenuItemExtra[]>([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [menuTitleFilter, setMenuTitleFilter] = useState<string[]>([])

  const isMobile = useMediaQuery("(max-width: 768px)")

  // Filtrar datos basados en la búsqueda y filtros
  useEffect(() => {
    let filtered = [...menuData]

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered
        .map((category) => {
          return {
            ...category,
            element: category.element.filter(
              (item) =>
                item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.Description.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
          }
        })
        .filter((category) => category.element.length > 0)
    }

    // Filtrar por Menu_Title si hay filtros activos
    if (menuTitleFilter.length > 0) {
      filtered = filtered
        .map((category) => {
          return {
            ...category,
            element: category.element.filter((item) => !item.Menu_Title || menuTitleFilter.includes(item.Menu_Title)),
          }
        })
        .filter((category) => category.element.length > 0)
    }

    setFilteredData(filtered)

    // Si la categoría actual ya no tiene elementos, cambiar a la primera pestaña
    if (filtered.length > 0 && (tabValue >= filtered.length || filtered[tabValue].element.length === 0)) {
      setTabValue(0)
    }
  }, [searchQuery, menuTitleFilter, tabValue, menuData])

  // Obtener todos los Menu_Title únicos para los filtros
  const getUniqueMenuTitles = () => {
    const titles = new Set<string>()
    menuData.forEach((category) => {
      category.element.forEach((item) => {
        if (item.Menu_Title) titles.add(item.Menu_Title)
      })
    })
    return Array.from(titles)
  }

  const uniqueMenuTitles = getUniqueMenuTitles()

  // Manejar cambio de pestaña
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Agregar item al carrito
  const addToCart = (item: MenuItem, extras: MenuItemExtra[] = []) => {
    const price = Number.parseFloat(item.Price.replace("$", ""))
    const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0)

    const newItem: CartItem = {
      id: Date.now().toString(),
      itemId: item.Item_id,
      name: item.Name,
      price: price,
      quantity: 1,
      extras: extras,
      extrasTotal: extrasTotal,
    }

    setCart([...cart, newItem])
    setDetailsOpen(false)
    setSelectedExtras([])
  }

  // Abrir diálogo de detalles
  const openDetails = (item: MenuItem) => {
    setSelectedItem(item)
    setSelectedExtras([])
    setDetailsOpen(true)
  }

  // Manejar selección de extras
  const handleExtraToggle = (extra: MenuItemExtra) => {
    const currentIndex = selectedExtras.findIndex((e) => e.name === extra.name)
    const newExtras = [...selectedExtras]

    if (currentIndex === -1) {
      newExtras.push(extra)
    } else {
      newExtras.splice(currentIndex, 1)
    }

    setSelectedExtras(newExtras)
  }

  // Incrementar cantidad en el carrito
  const incrementQuantity = (id: string) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  // Decrementar cantidad en el carrito
  const decrementQuantity = (id: string) => {
    setCart(
      cart
        .map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  // Eliminar item del carrito
  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  // Calcular total del carrito
  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      return sum + (item.price + item.extrasTotal) * item.quantity
    }, 0)
  }

  // Manejar filtros de Menu_Title
  const handleMenuTitleFilter = (title: string) => {
    if (menuTitleFilter.includes(title)) {
      setMenuTitleFilter(menuTitleFilter.filter((t) => t !== title))
    } else {
      setMenuTitleFilter([...menuTitleFilter, title])
    }
  }

  return (
    <Box sx={{ pb: 7 }}>
      {/* Barra superior */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Toma de Pedidos
          </Typography>

          <IconButton color="inherit" onClick={() => setFilterOpen(true)} aria-label="filtros">
            <FilterIcon />
          </IconButton>

          <IconButton color="inherit" onClick={() => setCartOpen(true)} aria-label="carrito">
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Buscador */}
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar platos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
                onDelete={() => handleMenuTitleFilter(title)}
                color="primary"
                variant="outlined"
              />
            ))}
            <Chip label="Limpiar filtros" onClick={() => setMenuTitleFilter([])} variant="outlined" />
          </Box>
        )}

        {/* Pestañas de categorías */}
        <Paper elevation={2} sx={{ mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons="auto"
            allowScrollButtonsMobile
            textColor="primary"
            indicatorColor="primary"
          >
            {filteredData.map((category, index) => (
              <Tab key={category.key} label={category.key} />
            ))}
          </Tabs>
        </Paper>

        {/* Lista de platos */}
        {filteredData.length > 0 && tabValue < filteredData.length ? (
          <Paper elevation={3} sx={{ p: 2 }}>
            <List>
              {filteredData[tabValue].element.map((item) => (
                <ListItem
                  key={item.Item_id}
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
                    }}
                  >
                    <Box>
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
                        <IconButton
                          color="primary"
                          onClick={() => openDetails(item)}
                          size="small"
                          aria-label="ver detalles"
                        >
                          <InfoIcon />
                        </IconButton>
                      )}

                      <IconButton
                        color="secondary"
                        onClick={() => addToCart(item)}
                        size="small"
                        aria-label="agregar al pedido"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6">No se encontraron resultados</Typography>
          </Paper>
        )}
      </Container>

      {/* Diálogo de detalles y extras */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} fullWidth maxWidth="sm">
        {selectedItem && (
          <>
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
                            onChange={() => handleExtraToggle(extra)}
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
              <Button onClick={() => setDetailsOpen(false)}>Cancelar</Button>
              <Button variant="contained" color="secondary" onClick={() => addToCart(selectedItem, selectedExtras)}>
                Agregar al pedido
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Diálogo de filtros */}
      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)}>
        <DialogTitle>Filtrar por tipo</DialogTitle>
        <DialogContent>
          <FormGroup>
            {uniqueMenuTitles.map((title) => (
              <FormControlLabel
                key={title}
                control={
                  <Checkbox checked={menuTitleFilter.includes(title)} onChange={() => handleMenuTitleFilter(title)} />
                }
                label={title}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMenuTitleFilter([])}>Limpiar</Button>
          <Button onClick={() => setFilterOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Drawer del carrito */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: 320, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Pedido Actual
          </Typography>

          {cart.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: "center", my: 4 }}>
              El pedido está vacío
            </Typography>
          ) : (
            <>
              <List sx={{ mb: 2 }}>
                {cart.map((item) => (
                  <ListItem
                    key={item.id}
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
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="eliminar"
                      >
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
                        <IconButton
                          size="small"
                          onClick={() => decrementQuantity(item.id)}
                          aria-label="disminuir cantidad"
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => incrementQuantity(item.id)}
                          aria-label="aumentar cantidad"
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Typography variant="body2" fontWeight="bold">
                        ${((item.price + item.extrasTotal) * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  </ListItem>
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
    </Box>
  )
}