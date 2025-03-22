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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import type { MenuItem as MenuItemType, MenuCategory, CartItem, MenuItemExtra } from "../../../../types/menu-types"
import { useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import { Info } from "lucide-react"
import { sendWhatsAppMessageEmployees } from "../../../services//OrderWathSappServices/ordersWithWhattSappEmployees.services"

type InfoType = {
  whathsapp: string;
  // Otras propiedades que pueda tener Info
};


export default function MenuInterface({ menuData }: { menuData: MenuCategory[] }) {
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState<MenuCategory[]>(menuData)
  const [cart, setCart] = useState<CartItem[]>([])
  console.log("🚀 ~ MenuInterface ~ cart:", cart)
  const [cartOpen, setCartOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<MenuItemExtra[]>([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [menuTitleFilter, setMenuTitleFilter] = useState<string[]>([])
  const [infoData, setInfoData] = useState<any[] | any | undefined>(null)

  const isMobile = useMediaQuery("(max-width: 768px)")

  const [orderType, setOrderType] = useState<"mesa" | "para llevar" | "delivery">("mesa");
  console.log("🚀 ~ MenuInterface ~ orderType:", orderType)

  const [tableNumber, setTableNumber] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [comments, setComments] = useState("");

  // Manejar cambio en el tipo de pedido
  const handleOrderTypeChange = (event: any) => {
    setOrderType(event.target.value as "mesa" | "para llevar" | "delivery");
  };




  const { ok, data, error, message } = useSelector((state: RootState) => state.chExcelData);

  useEffect(() => {
    if (data) {
      const { hojas: { Info } } = data;
      console.log("🚀 ~ useEffect ~ Info:", Info);

      if (Info !== null && Info !== undefined) {
        // Asegúrate de que Info[0] tenga la estructura correcta
        const infoData = Info[0] as InfoType; // Tipado correcto
        setInfoData(infoData); // Asigna el objeto completo
      }
    }
  }, [data]);

  // const handleConfirmOrder = () => {
  //   if (infoData) {
  //     let dataTypeOrder
  //     switch (orderType) {
  //       case "mesa":
  //         dataTypeOrder = tableNumber
  //         break;
  //       case "para llevar":
  //         dataTypeOrder = orderNumber
  //         break;
  //       case "delivery":
  //         dataTypeOrder = deliveryAddress
  //         break;
  //     }
  //     console.log("🚀 ~ handleConfirmOrder ~ dataTypeOrder:", dataTypeOrder)

  //     const messageSent = sendWhatsAppMessageEmployees(cart, infoData.whatsapp); // Accede a infoData.whathsapp
  //     if (messageSent) {
  //       console.log("Mensaje enviado correctamente");
  //     } else {
  //       console.log("Error al enviar el mensaje");
  //     }
  //   } else {
  //     console.error("No se encontró el número de WhatsApp en infoData");
  //   }
  // };

  const handleConfirmOrder = () => {
    if (infoData) {
      let dataTypeOrder: string;

      // Determinar el valor de dataTypeOrder según el tipo de pedido
      switch (orderType) {
        case "mesa":
          dataTypeOrder = `Mesa: ${tableNumber}`;
          break;
        case "para llevar":
          dataTypeOrder = `Número de Orden: ${orderNumber}`;
          break;
        case "delivery":
          dataTypeOrder = `Dirección de Entrega: ${deliveryAddress}`;
          break;
        default:
          dataTypeOrder = "Tipo de pedido no especificado";
          break;
      }

      console.log("🚀 ~ handleConfirmOrder ~ dataTypeOrder:", dataTypeOrder);

      // Crear el objeto con los detalles del pedido
      const orderDetails: any = {
        orderType, // Tipo de pedido (mesa, para llevar, delivery)
        dataTypeOrder, // Información adicional según el tipo de pedido
        cart, // Lista de ítems en el carrito
        comments, // Comentarios adicionales
      };

      // Enviar el mensaje de WhatsApp
      const messageSent = sendWhatsAppMessageEmployees(orderDetails, infoData.whatsapp);

      if (messageSent) {
        console.log("Mensaje enviado correctamente");
      } else {
        console.log("Error al enviar el mensaje");
      }
    } else {
      console.error("No se encontró el número de WhatsApp en infoData");
    }
  };







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
  const addToCart = (item: MenuItemType, extras: MenuItemExtra[] = []) => {
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
  const openDetails = (item: MenuItemType) => {
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
          <hr />


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


              <hr />
              <Box sx={{ maxWidth: 300, margin: "auto", mt: 2 }}>

                <Typography variant="h6" gutterBottom>
                  Comentarios
                </Typography>
                <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>

                  <TextField
                    fullWidth
                    label="Comentarios"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    sx={{ mb: 1 }}
                    size="small"
                  />
                </FormControl>

                <Typography variant="h6" gutterBottom>
                  Seleccione el tipo de pedido
                </Typography>

                {/* Selector de tipo de pedido */}
                <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                  <InputLabel>Tipo de Pedido</InputLabel>
                  <Select
                    value={orderType}
                    onChange={handleOrderTypeChange}
                    label="Tipo de Pedido"
                    size="small"
                  >
                    <MenuItem value="mesa">Mesa</MenuItem>
                    <MenuItem value="para llevar">Para Llevar</MenuItem>
                    <MenuItem value="delivery">Delivery</MenuItem>
                  </Select>
                </FormControl>

                {/* Campos adicionales según el tipo de pedido */}
                {orderType === "mesa" && (
                  <TextField
                    fullWidth
                    label="Número de Mesa"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    sx={{ mb: 1 }}
                    size="small"
                  />
                )}

                {orderType === "para llevar" && (
                  <TextField
                    fullWidth
                    label="Número de Orden"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    sx={{ mb: 1 }}
                    size="small"
                  />
                )}

                {orderType === "delivery" && (
                  <TextField
                    fullWidth
                    label="Dirección de Entrega (Calle y Número)"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    sx={{ mb: 1 }}
                    size="small"
                  />
                )}

                {/* Mostrar los valores guardados en el estado */}
                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                  <span>Tipo de Pedido:</span> {orderType}
                </Typography>
                {orderType === "mesa" && (
                  <span>Número de Mesa: {tableNumber}</span>
                  // <Typography variant="body1">
                  // </Typography>
                )}
                {orderType === "para llevar" && (
                  <span>Número de Orden: {orderNumber}</span>
                  // <Typography variant="body1">
                  // </Typography>
                )}
                {orderType === "delivery" && (
                  <span>Dirección de Entrega:{deliveryAddress}</span>
                  // <Typography variant="body1">
                  // </Typography>
                )}
              </Box>
              <hr />





              <Button variant="contained" color="primary" fullWidth size="large" onClick={handleConfirmOrder}>
                Confirmar Pedido
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  )
}