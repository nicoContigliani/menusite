import { useState, useEffect } from "react";
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
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Info as InfoIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  LocalOffer as PromoIcon,
} from "@mui/icons-material";
import { Avatar } from '@mui/material';
import { useMediaQuery } from "../../../../hooks/use-mobile";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { sendWhatsAppMessageEmployees } from "../../../services/OrderWathSappServices/ordersWithWhattSappEmployees.services";
import Image from "next/image";
import { clearLocalhostStorage } from "@/services/localstorage.services";

// Definición de tipos
type MenuItemExtra = {
  name: string;
  price: number;
};

type MenuItemType = {
  Item_id: string;
  Name: string;
  Description: string;
  Price: string;
  Menu_Title?: string;
  extras?: MenuItemExtra[];
};

type MenuCategory = {
  key: string;
  element: MenuItemType[];
};

type CartItem = {
  id: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  extras: MenuItemExtra[];
  extrasTotal: number;
  Description: any;
};

type InfoType = {
  whatsapp: string;
  [key: string]: any;
};

type ExcelData = {
  hojas?: {
    Info?: InfoType[];
    [key: string]: any;
  };
  [key: string]: any;
};

interface MenuInterfaceProps {
  menuData: MenuCategory[];
  promotionsData?: MenuCategory[];
}

export default function MenuInterface({ menuData, promotionsData = [] }: MenuInterfaceProps) {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<MenuCategory[]>(menuData);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<MenuItemExtra[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [menuTitleFilter, setMenuTitleFilter] = useState<string[]>([]);
  const [infoData, setInfoData] = useState<InfoType | null>(null);
  const [showPromotions, setShowPromotions] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [orderType, setOrderType] = useState<"mesa" | "para llevar" | "delivery">("mesa");
  const [tableNumber, setTableNumber] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [comments, setComments] = useState("");

  const [userData, setUserData] = useState<any>()
  const [comapinesData, setCompaniesData] = useState<any>()

  const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: ExcelData });
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) setUserData(user?.user)
  }, [user])
  useEffect(() => {
    if (data) setCompaniesData(data)
  }, [data])



  // Datos actuales a mostrar (menú o promociones)
  const currentData = showPromotions ? promotionsData : menuData;

  useEffect(() => {
    if (data?.hojas?.Info?.[0]) {
      setInfoData(data.hojas.Info[0]);
    }
  }, [data]);

  useEffect(() => {
    let filtered = [...currentData];

    if (searchQuery) {
      filtered = filtered
        .map((category) => ({
          ...category,
          element: category.element.filter(
            item =>
              item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.Description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }))
        .filter(category => category.element.length > 0);
    }

    if (menuTitleFilter.length > 0) {
      filtered = filtered
        .map((category) => ({
          ...category,
          element: category.element.filter(
            item => !item.Menu_Title || menuTitleFilter.includes(item.Menu_Title)
          )
        }))
        .filter(category => category.element.length > 0);
    }

    setFilteredData(filtered);

    if (filtered.length > 0 && (tabValue >= filtered.length || filtered[tabValue].element.length === 0)) {
      setTabValue(0);
    }
  }, [searchQuery, menuTitleFilter, tabValue, currentData]);

  const getUniqueMenuTitles = () => {
    const titles = new Set<string>();
    currentData.forEach((category) => {
      category.element.forEach((item) => {
        if (item.Menu_Title) titles.add(item.Menu_Title);
      });
    });
    return Array.from(titles);
  };

  const uniqueMenuTitles = getUniqueMenuTitles();

  const togglePromotions = () => {
    setShowPromotions(!showPromotions);
    setTabValue(0);
    setSearchQuery("");
    setMenuTitleFilter([]);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const addToCart = (item: MenuItemType, extras: MenuItemExtra[] = []) => {
    const price = Number.parseFloat(item.Price.replace("$", ""));
    const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);

    const newItem: CartItem = {
      id: Date.now().toString(),
      itemId: item.Item_id,
      name: item.Name,
      price: price,
      quantity: 1,
      extras: extras,
      extrasTotal: extrasTotal,
      Description: item.Description
    };

    setCart([...cart, newItem]);
    setDetailsOpen(false);
    setSelectedExtras([]);
  };

  const openDetails = (item: MenuItemType) => {
    setSelectedItem(item);
    setSelectedExtras([]);
    setDetailsOpen(true);
  };

  const handleExtraToggle = (extra: MenuItemExtra) => {
    setSelectedExtras(prev =>
      prev.some(e => e.name === extra.name)
        ? prev.filter(e => e.name !== extra.name)
        : [...prev, extra]
    );
  };

  const incrementQuantity = (id: string) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (id: string) => {
    setCart(cart
      .map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      return sum + (item.price + item.extrasTotal) * item.quantity;
    }, 0);
  };

  const handleMenuTitleFilter = (title: string) => {
    setMenuTitleFilter(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const handleOrderTypeChange = async (event: any) => {
    setOrderType(event.target.value as "mesa" | "para llevar" | "delivery");
  };



  const handleConfirmOrder = async () => {
    if (infoData?.whatsapp) {
      let dataTypeOrder = "";
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
      }

      const orderDetails = {
        id: Date.now().toString(),
        orderType,
        dataTypeOrder,
        cart,
        comments,
        companies:{
          companiesName:comapinesData?.companyName,
          companiesID:comapinesData?._id


        },
        user: {
          email: userData?.email || "",
          fullname: userData?.fullname || "",
          phone: userData?.phone || "",
          whathsapp: userData?.whatsapp || "",

        }

      };



      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Si necesitas autenticación:
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(orderDetails)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al crear la orden');
        }
        setCartOpen(false)
        setCart([])
        const createdOrder = await response.json();

        return createdOrder;
      } catch (error) {
        console.error('Error:', error);

      }

      // sendWhatsAppMessageEmployees(orderDetails, infoData.whatsapp);
    }
  };

  const handleLogout = () => {
    clearLocalhostStorage();
    window.location.reload();
  };

  return (
    <Box sx={{ pb: 7 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <Avatar sx={{ width: 50, height: 50 }}>
              <Image
                src={"/images/flama.png"}
                alt={"LlakaScript"}
                width={50}
                height={50}
                priority
                style={{ objectFit: 'contain' }}
              />
            </Avatar>
            Llakascript
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {showPromotions ? 'Promociones' : 'Menú Principal'}
          </Typography>

          <IconButton color="inherit" onClick={togglePromotions}>
            <Badge badgeContent={showPromotions ? null : promotionsData?.length} color="secondary">
              <PromoIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={() => setFilterOpen(true)}>
            <FilterIcon />
          </IconButton>

          <IconButton color="inherit" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={showPromotions ? "Buscar promociones..." : "Buscar platos..."}
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
            {filteredData.map((category) => (
              <Tab key={category.key} label={category.key} />
            ))}
          </Tabs>
        </Paper>

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
                  <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="h6">{item.Name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {item.Description}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.Price}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      {item.extras && item.extras.length > 0 && (
                        <IconButton color="primary" onClick={() => openDetails(item)} size="small">
                          <InfoIcon />
                        </IconButton>
                      )}
                      <IconButton color="secondary" onClick={() => addToCart(item)} size="small">
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
            <Typography variant="h6">
              {showPromotions ? "No hay promociones disponibles" : "No se encontraron resultados"}
            </Typography>
          </Paper>
        )}
      </Container>

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
                            checked={selectedExtras.some(e => e.name === extra.name)}
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

      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)}>
        <DialogTitle>Filtrar por tipo</DialogTitle>
        <DialogContent>
          <FormGroup>
            {uniqueMenuTitles.map((title) => (
              <FormControlLabel
                key={title}
                control={
                  <Checkbox
                    checked={menuTitleFilter.includes(title)}
                    onChange={() => handleMenuTitleFilter(title)}
                  />
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

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: 320, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Pedido Actual
          </Typography>
          <Divider sx={{ mb: 2 }} />

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
                    <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body1">{item.name}</Typography>
                      <IconButton size="small" color="error" onClick={() => removeFromCart(item.id)}>
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

                    <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton size="small" onClick={() => decrementQuantity(item.id)}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => incrementQuantity(item.id)}>
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

              <Box sx={{ maxWidth: 300, margin: "auto", mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Comentarios
                </Typography>
                <TextField
                  fullWidth
                  label="Comentarios"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  sx={{ mb: 1 }}
                  size="small"
                />

                <Typography variant="h6" gutterBottom>
                  Tipo de pedido
                </Typography>
                <FormControl fullWidth sx={{ mb: 1 }} size="small">
                  <InputLabel>Tipo de Pedido</InputLabel>
                  <Select value={orderType} onChange={handleOrderTypeChange} label="Tipo de Pedido">
                    <MenuItem value="mesa">Mesa</MenuItem>
                    <MenuItem value="para llevar">Para Llevar</MenuItem>
                    <MenuItem value="delivery">Delivery</MenuItem>
                  </Select>
                </FormControl>

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
                    label="Dirección de Entrega"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    sx={{ mb: 1 }}
                    size="small"
                  />
                )}
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleConfirmOrder}
                sx={{ mt: 2 }}
              >
                Confirmar Pedido
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}