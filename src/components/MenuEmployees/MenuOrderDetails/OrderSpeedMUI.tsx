// import { useState, useEffect } from "react";
// import io from "socket.io-client";
// import { motion, AnimatePresence } from "framer-motion";

// import {
//   Box,
//   Tabs,
//   Tab,
//   TextField,
//   InputAdornment,
//   Paper,
//   Container,
//   Typography,
//   Divider,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Badge,
//   Drawer,
//   List,
//   ListItem,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Chip,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   useTheme,
// } from "@mui/material";
// import LogoutIcon from '@mui/icons-material/Logout';
// import {
//   Search as SearchIcon,
//   ShoppingCart as ShoppingCartIcon,
//   Info as InfoIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
//   Delete as DeleteIcon,
//   FilterList as FilterIcon,
//   LocalOffer as PromoIcon,
//   Check,
// } from "@mui/icons-material";
// import { Avatar } from '@mui/material';
// import { useMediaQuery } from "../../../../hooks/use-mobile";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../store/store";
// import { sendWhatsAppMessageEmployees } from "../../../services/OrderWathSappServices/ordersWithWhattSappEmployees.services";
// import Image from "next/image";
// import { clearLocalhostStorage } from "@/services/localstorage.services";
// import useSocketChat from "../../../../hooks/useSocket";

// // Definición de tipos
// type MenuItemExtra = {
//   name: string;
//   price: number;
// };

// type MenuItemType = {
//   Item_id: string;
//   Name: string;
//   Description: string;
//   Price: string;
//   Menu_Title?: string;
//   extras?: MenuItemExtra[];
// };

// type MenuCategory = {
//   key: string;
//   element: MenuItemType[];
// };

// type CartItem = {
//   id: string;
//   itemId: string;
//   name: string;
//   price: number;
//   quantity: number;
//   extras: MenuItemExtra[];
//   extrasTotal: number;
//   Description: any;
// };

// type InfoType = {
//   whatsapp: string;
//   [key: string]: any;
// };

// type ExcelData = {
//   hojas?: {
//     Info?: InfoType[];
//     [key: string]: any;
//   };
//   [key: string]: any;
// };

// interface MenuInterfaceProps {
//   menuData: MenuCategory[];
//   promotionsData?: MenuCategory[];
// }

// export default function MenuInterface({ menuData, promotionsData = [] }: MenuInterfaceProps) {
//   const [tabValue, setTabValue] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredData, setFilteredData] = useState<MenuCategory[]>(menuData);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [detailsOpen, setDetailsOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
//   const [selectedExtras, setSelectedExtras] = useState<MenuItemExtra[]>([]);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [menuTitleFilter, setMenuTitleFilter] = useState<string[]>([]);
//   const [infoData, setInfoData] = useState<InfoType | null>(null);
//   const [showPromotions, setShowPromotions] = useState(false);

//   const isMobile = useMediaQuery("(max-width: 768px)");

//   const [orderType, setOrderType] = useState<"mesa" | "para llevar" | "delivery">("mesa");
//   const [tableNumber, setTableNumber] = useState("");
//   const [orderNumber, setOrderNumber] = useState("");
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [comments, setComments] = useState("");

//   const [userData, setUserData] = useState<any>()
//   const [comapinesData, setCompaniesData] = useState<any>()

//   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: ExcelData });
//   const user = useSelector((state: RootState) => state.auth);
//   const [showConnectionStatus, setShowConnectionStatus] = useState(true);


//   const socket = io("https://socketserver-t4g9.onrender.com", {
//     transports: ["websocket"], // Fuerza el uso de WebSockets
//   });


//   useEffect(() => {
//     if (user) setUserData(user?.user)
//   }, [user])
//   useEffect(() => {
//     if (data) setCompaniesData(data)
//   }, [data])



//   // const {
//   //   name,
//   //   setName,
//   //   room,
//   //   setRoom,
//   //   parsedMessages,
//   //   joinRoom,
//   //   isConnected
//   // } = useSocketChat('https://socketserver-t4g9.onrender.com');

//   // useEffect(() => {
//   //   if (user) {
//   //     setName(user?.user?.email || '');
//   //   }
//   //   if (data) {
//   //     setRoom(data?.companyName || '');
//   //   }
//   // }, [user, data, setName, setRoom]);

//   // useEffect(() => {
//   //   if (name && room && isConnected) {
//   //     joinRoom();
//   //   }
//   // }, [name, room, isConnected, joinRoom]);

//   // useEffect(() => {
//   //   if (isConnected) {
//   //     const timer = setTimeout(() => {
//   //       setShowConnectionStatus(false);
//   //     }, 2000);
//   //     return () => clearTimeout(timer);
//   //   } else {
//   //     setShowConnectionStatus(true);
//   //   }
//   // }, [isConnected]);



//   const {
//     name,
//     setName,
//     room,
//     setRoom,
//     message,
//     setMessage,
//     messages,
//     joinRoom,
//     sendMessage,
//     sendOrder,
//     parsedMessages,
//     isConnected,
//     reconnectAttempts,
//    } = useSocketChat('https://socketserver-t4g9.onrender.com');

//   // Configuración inicial del nombre y sala
//   useEffect(() => {
//     if (user) {
//       setName(user?.user?.email || '');
//     }
//     if (data) {
//       setRoom(data?.companyName || '');
//     }
//   }, [user, data, setName, setRoom]);

//   // Unirse a la sala cuando esté todo listo
//   useEffect(() => {
//     if (name && room && isConnected) {
//       joinRoom();
//       console.log(`Unido a la sala: ${room} como ${name}`);
//     }
//   }, [name, room, isConnected, joinRoom]);

//   // Manejo del estado de conexión con feedback visual mejorado
//   useEffect(() => {
//     if (isConnected) {
//       const timer = setTimeout(() => {
//         setShowConnectionStatus(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     } else {
//       setShowConnectionStatus(true);

//       // Mostrar alerta si hay problemas de conexión después de 5 segundos
//       const alertTimer = setTimeout(() => {
//         if (!isConnected) {
//           console.warn(`Problemas de conexión. Intentos: ${reconnectAttempts}/5`);
//         }
//       }, 5000);

//       return () => clearTimeout(alertTimer);
//     }
//   }, [isConnected, reconnectAttempts]);







//   // Datos actuales a mostrar (menú o promociones)
//   const currentData = showPromotions ? promotionsData : menuData;

//   useEffect(() => {
//     if (data?.hojas?.Info?.[0]) {
//       setInfoData(data.hojas.Info[0]);
//     }
//   }, [data]);

//   useEffect(() => {
//     let filtered = [...currentData];

//     if (searchQuery) {
//       filtered = filtered
//         .map((category) => ({
//           ...category,
//           element: category.element.filter(
//             item =>
//               item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//               item.Description.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//         }))
//         .filter(category => category.element.length > 0);
//     }

//     if (menuTitleFilter.length > 0) {
//       filtered = filtered
//         .map((category) => ({
//           ...category,
//           element: category.element.filter(
//             item => !item.Menu_Title || menuTitleFilter.includes(item.Menu_Title)
//           )
//         }))
//         .filter(category => category.element.length > 0);
//     }

//     setFilteredData(filtered);

//     if (filtered.length > 0 && (tabValue >= filtered.length || filtered[tabValue].element.length === 0)) {
//       setTabValue(0);
//     }
//   }, [searchQuery, menuTitleFilter, tabValue, currentData]);

//   const getUniqueMenuTitles = () => {
//     const titles = new Set<string>();
//     currentData.forEach((category) => {
//       category.element.forEach((item) => {
//         if (item.Menu_Title) titles.add(item.Menu_Title);
//       });
//     });
//     return Array.from(titles);
//   };

//   const uniqueMenuTitles = getUniqueMenuTitles();

//   const togglePromotions = () => {
//     setShowPromotions(!showPromotions);
//     setTabValue(0);
//     setSearchQuery("");
//     setMenuTitleFilter([]);
//   };

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const addToCart = (item: MenuItemType, extras: MenuItemExtra[] = []) => {
//     const price = Number.parseFloat(item.Price.replace("$", ""));
//     const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);

//     const newItem: CartItem = {
//       id: Date.now().toString(),
//       itemId: item.Item_id,
//       name: item.Name,
//       price: price,
//       quantity: 1,
//       extras: extras,
//       extrasTotal: extrasTotal,
//       Description: item.Description
//     };

//     setCart([...cart, newItem]);
//     setDetailsOpen(false);
//     setSelectedExtras([]);
//   };

//   const openDetails = (item: MenuItemType) => {
//     setSelectedItem(item);
//     setSelectedExtras([]);
//     setDetailsOpen(true);
//   };

//   const handleExtraToggle = (extra: MenuItemExtra) => {
//     setSelectedExtras(prev =>
//       prev.some(e => e.name === extra.name)
//         ? prev.filter(e => e.name !== extra.name)
//         : [...prev, extra]
//     );
//   };

//   const incrementQuantity = (id: string) => {
//     setCart(cart.map(item =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     ));
//   };

//   const decrementQuantity = (id: string) => {
//     setCart(cart
//       .map(item =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//       .filter(item => item.quantity > 0)
//     );
//   };

//   const removeFromCart = (id: string) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   const calculateTotal = () => {
//     return cart.reduce((sum, item) => {
//       return sum + (item.price + item.extrasTotal) * item.quantity;
//     }, 0);
//   };

//   const handleMenuTitleFilter = (title: string) => {
//     setMenuTitleFilter(prev =>
//       prev.includes(title)
//         ? prev.filter(t => t !== title)
//         : [...prev, title]
//     );
//   };

//   const handleOrderTypeChange = async (event: any) => {
//     setOrderType(event.target.value as "mesa" | "para llevar" | "delivery");
//   };



//   const handleConfirmOrder = async () => {
//     if (infoData?.whatsapp) {
//       let dataTypeOrder = "";
//       switch (orderType) {
//         case "mesa":
//           dataTypeOrder = `Mesa: ${tableNumber}`;
//           break;
//         case "para llevar":
//           dataTypeOrder = `Número de Orden: ${orderNumber}`;
//           break;
//         case "delivery":
//           dataTypeOrder = `Dirección de Entrega: ${deliveryAddress}`;
//           break;
//       }

//       const orderDetails: any = {
//         id: Date.now().toString(),
//         orderType,
//         dataTypeOrder,
//         cart,
//         comments,
//         companiesName: comapinesData?.companyName,
//         companiesID: comapinesData?._id,
//         email: userData?.email || "",
//         fullname: userData?.fullname || "",
//         phone: userData?.phone || "",
//         whathsapp: userData?.whatsapp || "",
//         channel: comapinesData?.companyName,
//         name: userData?.email,
//         timestamp: new Date(),
//       };


//       //canal
//       //usuario
//       //mensdaje

//       // const orderDetailsString = JSON.stringify(orderDetails);

//       // socket.emit("send_message", {
//       //   channel: comapinesData?.companyName,
//       //   name: userData?.email,
//       //   message: JSON.stringify(orderDetailsString) // Envía la orden como string
//       // });
//       try {
//         const socketSuccess = await sendOrder(orderDetails);

//       } catch (error) {
//         console.log("🚀 ~ handleConfirmOrder ~ error:", error)

//       }




//       try {
//         const response = await fetch('/api/orders', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             // Si necesitas autenticación:
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           },
//           body: JSON.stringify(orderDetails)
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || 'Error al crear la orden');
//         }
//         setCartOpen(false)
//         setCart([])
//         const createdOrder = await response.json();
//         window.location.reload()

//         return createdOrder;
//       } catch (error) {
//         console.error('Error:', error);

//       }

//       // sendWhatsAppMessageEmployees(orderDetails, infoData.whatsapp);

//     }
//   };

//   const handleLogout = () => {
//     clearLocalhostStorage();
//     window.location.reload();
//   };

//   const [displayTitle, setDisplayTitle] = useState(true); // true = Llakascript, false = Menú/Promo

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayTitle(prev => !prev); // Alternar cada 5 segundos
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const theme = useTheme();



//   return (
//     <Box sx={{ pb: 0 }}>

//       <AppBar position="static"
//         component={motion.div}
//         initial={false}
//         animate={{
//           backgroundColor: showPromotions
//             ? theme.palette.info.dark
//             : theme.palette.primary.main
//         }}
//         transition={{ duration: 0.7 }}

//       >
//         <Toolbar>
//           <Box sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1,
//             flexGrow: 1,
//             height: '40px', // Aumenté la altura para mejor acomodo
//             position: 'relative',
//             overflow: 'hidden' // Para contener las animaciones
//           }}>
//             {/* Avatar con mejor alineación */}
//             <Avatar sx={{
//               width: 28,
//               height: 28,
//               flexShrink: 0, // Evita que se reduzca
//               ml: 0.5 // Pequeño margen izquierdo
//             }}>
//               <Image
//                 src={"/images/flama.png"}
//                 alt={"LlakaScript"}
//                 width={28}
//                 height={28}
//                 priority
//                 style={{
//                   objectFit: 'contain',
//                   width: '100%',
//                   height: '100%'
//                 }}
//               />
//             </Avatar>

//             {/* Contenedor de texto con mejor posicionamiento */}
//             <Box sx={{
//               position: 'relative',
//               width: 'auto', // Ancho automático
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               flexGrow: 1
//             }}>
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={displayTitle ? 'llakascript' : 'menu-title'}
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 10 }}
//                   transition={{ duration: 0.3 }}
//                   style={{
//                     position: 'absolute',
//                     left: 0,
//                     whiteSpace: 'nowrap' // Evita saltos de línea
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontWeight: 600,
//                       lineHeight: 1.2
//                     }}
//                   >
//                     {displayTitle ? 'Llakascript' : (showPromotions ? 'Promociones' : 'Menú Principal')}
//                   </Typography>
//                 </motion.div>
//               </AnimatePresence>
//             </Box>
//           </Box>


//           <IconButton color="inherit" onClick={togglePromotions}>
//             <Badge badgeContent={showPromotions ? null : promotionsData?.length} color="secondary">
//               <PromoIcon />
//             </Badge>
//           </IconButton>

//           <IconButton color="inherit" onClick={() => setFilterOpen(true)}>
//             <FilterIcon />
//           </IconButton>

//           <IconButton color="inherit" onClick={() => setCartOpen(true)}>
//             <Badge badgeContent={cart.length} color="secondary">
//               <ShoppingCartIcon />
//             </Badge>
//           </IconButton>

//           <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

//           <IconButton color="inherit" onClick={handleLogout}>
//             <LogoutIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>



//       <div style={{ textAlign: "center", padding: "5px" }}>
//         {showConnectionStatus && (
//           <Box
//             display="inline-block"
//             minWidth="120px"
//             textAlign="center"
//             my={1}
//           >
//             <AnimatePresence>
//               {!isConnected ? (
//                 <motion.div
//                   key="connecting"
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Box
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="text.secondary"
//                   >
//                     <motion.div
//                       animate={{
//                         opacity: [0.6, 1, 0.6],
//                       }}
//                       transition={{
//                         repeat: Infinity,
//                         duration: 1.5,
//                         ease: "easeInOut"
//                       }}
//                     >
//                       <Typography variant="body2">Conectando...</Typography>
//                     </motion.div>

//                     <Box display="flex">
//                       {[...Array(3)]?.map((_, i) => (
//                         <motion.div
//                           key={i}
//                           animate={{
//                             y: [0, -5, 0],
//                             opacity: [0.3, 1, 0.3]
//                           }}
//                           transition={{
//                             repeat: Infinity,
//                             duration: 1.2,
//                             delay: i * 0.2
//                           }}
//                         >
//                           <Typography variant="body2" fontWeight="bold" color="primary">.</Typography>
//                         </motion.div>
//                       ))}
//                     </Box>
//                   </Box>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="connected"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.5 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <Box
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="success.main"
//                   >
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.1 }}
//                     >
//                       <Typography variant="body2">Conectado</Typography>
//                     </motion.div>

//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 500,
//                         damping: 15
//                       }}
//                     >
//                       <Check color="success" fontSize="small" />
//                     </motion.div>
//                   </Box>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </Box>
//         )}
//       </div>



//       <Container maxWidth="md" sx={{ mt: 2 }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder={showPromotions ? "Buscar promociones..." : "Buscar platos..."}
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ mb: 2 }}
//         />

//         {menuTitleFilter.length > 0 && (
//           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
//             {menuTitleFilter.map((title) => (
//               <Chip
//                 key={title}
//                 label={title}
//                 onDelete={() => handleMenuTitleFilter(title)}
//                 color="primary"
//                 variant="outlined"
//               />
//             ))}
//             <Chip label="Limpiar filtros" onClick={() => setMenuTitleFilter([])} variant="outlined" />
//           </Box>
//         )}

//         <Paper elevation={2} sx={{ mb: 2 }}>
//           <Tabs
//             value={tabValue}
//             onChange={handleTabChange}
//             variant={isMobile ? "scrollable" : "fullWidth"}
//             scrollButtons="auto"
//             allowScrollButtonsMobile
//             textColor="primary"
//             indicatorColor="primary"
//           >
//             {filteredData.map((category) => (
//               <Tab key={category.key} label={category.key} />
//             ))}
//           </Tabs>
//         </Paper>

//         {filteredData.length > 0 && tabValue < filteredData.length ? (
//           <Paper elevation={3} sx={{ p: 2 }}>
//             <List>
//               {filteredData[tabValue].element.map((item) => (
//                 <ListItem
//                   key={item.Item_id}
//                   sx={{
//                     flexDirection: "column",
//                     alignItems: "flex-start",
//                     borderBottom: "1px solid #eee",
//                     py: 2,
//                   }}
//                 >
//                   <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-start" }}>
//                     <Box>
//                       <Typography variant="h6">{item.Name}</Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                         {item.Description}
//                       </Typography>
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         {item.Price}
//                       </Typography>
//                     </Box>

//                     <Box sx={{ display: "flex", gap: 1 }}>
//                       {item.extras && item.extras.length > 0 && (
//                         <IconButton color="primary" onClick={() => openDetails(item)} size="small">
//                           <InfoIcon />
//                         </IconButton>
//                       )}
//                       <IconButton color="secondary" onClick={() => addToCart(item)} size="small">
//                         <AddIcon />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         ) : (
//           <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
//             <Typography variant="h6">
//               {showPromotions ? "No hay promociones disponibles" : "No se encontraron resultados"}
//             </Typography>
//           </Paper>
//         )}
//       </Container>

//       <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} fullWidth maxWidth="sm">
//         {selectedItem && (
//           <>
//             <DialogTitle>{selectedItem.Name}</DialogTitle>
//             <DialogContent dividers>
//               <Typography variant="body1" paragraph>
//                 {selectedItem.Description}
//               </Typography>
//               <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//                 {selectedItem.Price}
//               </Typography>

//               {selectedItem.extras && selectedItem.extras.length > 0 && (
//                 <>
//                   <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
//                     Extras disponibles:
//                   </Typography>
//                   <FormGroup>
//                     {selectedItem.extras.map((extra) => (
//                       <FormControlLabel
//                         key={extra.name}
//                         control={
//                           <Checkbox
//                             checked={selectedExtras.some(e => e.name === extra.name)}
//                             onChange={() => handleExtraToggle(extra)}
//                           />
//                         }
//                         label={`${extra.name.replace("_", " ")} (+$${extra.price})`}
//                       />
//                     ))}
//                   </FormGroup>
//                 </>
//               )}

//               {selectedExtras.length > 0 && (
//                 <Box sx={{ mt: 2 }}>
//                   <Typography variant="subtitle2">
//                     Extras seleccionados: ${selectedExtras.reduce((sum, extra) => sum + extra.price, 0)}
//                   </Typography>
//                 </Box>
//               )}
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setDetailsOpen(false)}>Cancelar</Button>
//               <Button variant="contained" color="secondary" onClick={() => addToCart(selectedItem, selectedExtras)}>
//                 Agregar al pedido
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>

//       <Dialog open={filterOpen} onClose={() => setFilterOpen(false)}>
//         <DialogTitle>Filtrar por tipo</DialogTitle>
//         <DialogContent>
//           <FormGroup>
//             {uniqueMenuTitles.map((title) => (
//               <FormControlLabel
//                 key={title}
//                 control={
//                   <Checkbox
//                     checked={menuTitleFilter.includes(title)}
//                     onChange={() => handleMenuTitleFilter(title)}
//                   />
//                 }
//                 label={title}
//               />
//             ))}
//           </FormGroup>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setMenuTitleFilter([])}>Limpiar</Button>
//           <Button onClick={() => setFilterOpen(false)}>Cerrar</Button>
//         </DialogActions>
//       </Dialog>

//       <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
//         <Box sx={{ width: 320, p: 2 }}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Pedido Actual
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           {cart.length === 0 ? (
//             <Typography variant="body1" sx={{ textAlign: "center", my: 4 }}>
//               El pedido está vacío
//             </Typography>
//           ) : (
//             <>
//               <List sx={{ mb: 2 }}>
//                 {cart.map((item) => (
//                   <ListItem
//                     key={item.id}
//                     sx={{
//                       flexDirection: "column",
//                       alignItems: "flex-start",
//                       borderBottom: "1px solid #eee",
//                       py: 1,
//                     }}
//                   >
//                     <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
//                       <Typography variant="body1">{item.name}</Typography>
//                       <IconButton size="small" color="error" onClick={() => removeFromCart(item.id)}>
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </Box>

//                     {item.extras.length > 0 && (
//                       <Box sx={{ ml: 2, mb: 1 }}>
//                         {item.extras.map((extra) => (
//                           <Typography key={extra.name} variant="body2" color="text.secondary">
//                             + {extra.name.replace("_", " ")} (${extra.price})
//                           </Typography>
//                         ))}
//                       </Box>
//                     )}

//                     <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <IconButton size="small" onClick={() => decrementQuantity(item.id)}>
//                           <RemoveIcon fontSize="small" />
//                         </IconButton>
//                         <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
//                         <IconButton size="small" onClick={() => incrementQuantity(item.id)}>
//                           <AddIcon fontSize="small" />
//                         </IconButton>
//                       </Box>
//                       <Typography variant="body2" fontWeight="bold">
//                         ${((item.price + item.extrasTotal) * item.quantity).toFixed(2)}
//                       </Typography>
//                     </Box>
//                   </ListItem>
//                 ))}
//               </List>

//               <Divider sx={{ my: 2 }} />

//               <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
//                 <Typography variant="h6">Total:</Typography>
//                 <Typography variant="h6">${calculateTotal().toFixed(2)}</Typography>
//               </Box>

//               <Box sx={{ maxWidth: 300, margin: "auto", mt: 2 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Comentarios
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   label="Comentarios"
//                   value={comments}
//                   onChange={(e) => setComments(e.target.value)}
//                   sx={{ mb: 1 }}
//                   size="small"
//                 />

//                 <Typography variant="h6" gutterBottom>
//                   Tipo de pedido
//                 </Typography>
//                 <FormControl fullWidth sx={{ mb: 1 }} size="small">
//                   <InputLabel>Tipo de Pedido</InputLabel>
//                   <Select value={orderType} onChange={handleOrderTypeChange} label="Tipo de Pedido">
//                     <MenuItem value="mesa">Mesa</MenuItem>
//                     <MenuItem value="para llevar">Para Llevar</MenuItem>
//                     <MenuItem value="delivery">Delivery</MenuItem>
//                   </Select>
//                 </FormControl>

//                 {orderType === "mesa" && (
//                   <TextField
//                     fullWidth
//                     label="Número de Mesa"
//                     value={tableNumber}
//                     onChange={(e) => setTableNumber(e.target.value)}
//                     sx={{ mb: 1 }}
//                     size="small"
//                   />
//                 )}

//                 {orderType === "para llevar" && (
//                   <TextField
//                     fullWidth
//                     label="Número de Orden"
//                     value={orderNumber}
//                     onChange={(e) => setOrderNumber(e.target.value)}
//                     sx={{ mb: 1 }}
//                     size="small"
//                   />
//                 )}

//                 {orderType === "delivery" && (
//                   <TextField
//                     fullWidth
//                     label="Dirección de Entrega"
//                     value={deliveryAddress}
//                     onChange={(e) => setDeliveryAddress(e.target.value)}
//                     sx={{ mb: 1 }}
//                     size="small"
//                   />
//                 )}
//               </Box>

//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 size="large"
//                 onClick={handleConfirmOrder}
//                 sx={{ mt: 2 }}
//               >
//                 Confirmar Pedido
//               </Button>
//             </>
//           )}
//         </Box>
//       </Drawer>
//     </Box>
//   );
// }





import { useState, useEffect } from "react";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import Image from "next/image";

// Material-UI Components
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
  useTheme,
} from "@mui/material";

// Material-UI Icons
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
  Check,
} from "@mui/icons-material";
import { Avatar } from '@mui/material';

// Hooks and Services
import { useMediaQuery } from "../../../../hooks/use-mobile";
import { RootState } from "../../../../store/store";
import { sendWhatsAppMessageEmployees } from "../../../services/OrderWathSappServices/ordersWithWhattSappEmployees.services";
import { clearLocalhostStorage } from "@/services/localstorage.services";
import useSocketChat from "../../../../hooks/useSocket";

// ======================================
// Type Definitions
// ======================================
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

// ======================================
// Main Component
// ======================================
export default function MenuInterface({ menuData, promotionsData = [] }: MenuInterfaceProps) {
  // ======================================
  // State Management
  // ======================================
  // UI State
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showPromotions, setShowPromotions] = useState(false);
  const [showConnectionStatus, setShowConnectionStatus] = useState(true);
  const [displayTitle, setDisplayTitle] = useState(true);

  // Data State
  const [filteredData, setFilteredData] = useState<MenuCategory[]>(menuData);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<MenuItemExtra[]>([]);
  const [menuTitleFilter, setMenuTitleFilter] = useState<string[]>([]);
  const [infoData, setInfoData] = useState<InfoType | null>(null);
  
  // Order State
  const [orderType, setOrderType] = useState<"mesa" | "para llevar" | "delivery">("mesa");
  const [tableNumber, setTableNumber] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [comments, setComments] = useState("");

  // User/Company Data
  const [userData, setUserData] = useState<any>();
  const [comapinesData, setCompaniesData] = useState<any>();

  // ======================================
  // Hooks and Redux
  // ======================================
  const isMobile = useMediaQuery("(max-width: 768px)");
  const theme = useTheme();
  const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: ExcelData });
  const user = useSelector((state: RootState) => state.auth);

  // Socket Connection
  const socket = io("https://socketserver-t4g9.onrender.com", {
    transports: ["websocket"],
  });

  const {
    name,
    setName,
    room,
    setRoom,
    message,
    setMessage,
    messages,
    joinRoom,
    sendMessage,
    sendOrder,
    parsedMessages,
    isConnected,
    reconnectAttempts,
  } = useSocketChat('https://socketserver-t4g9.onrender.com');

  // ======================================
  // Data Initialization Effects
  // ======================================
  useEffect(() => {
    if (user) setUserData(user?.user);
  }, [user]);

  useEffect(() => {
    if (data) setCompaniesData(data);
  }, [data]);

  useEffect(() => {
    if (data?.hojas?.Info?.[0]) {
      setInfoData(data.hojas.Info[0]);
    }
  }, [data]);

  // ======================================
  // Socket Connection Management
  // ======================================
  useEffect(() => {
    if (user) {
      setName(user?.user?.email || '');
    }
    if (data) {
      setRoom(data?.companyName || '');
    }
  }, [user, data, setName, setRoom]);

  useEffect(() => {
    if (name && room && isConnected) {
      joinRoom();
      console.log(`Unido a la sala: ${room} como ${name}`);
    }
  }, [name, room, isConnected, joinRoom]);

  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => {
        setShowConnectionStatus(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowConnectionStatus(true);
      const alertTimer = setTimeout(() => {
        if (!isConnected) {
          console.warn(`Problemas de conexión. Intentos: ${reconnectAttempts}/5`);
        }
      }, 5000);
      return () => clearTimeout(alertTimer);
    }
  }, [isConnected, reconnectAttempts]);

  // ======================================
  // Data Filtering Logic
  // ======================================
  const currentData = showPromotions ? promotionsData : menuData;

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

  // ======================================
  // Helper Functions
  // ======================================
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

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      return sum + (item.price + item.extrasTotal) * item.quantity;
    }, 0);
  };

  // ======================================
  // UI Handlers
  // ======================================
  const togglePromotions = () => {
    setShowPromotions(!showPromotions);
    setTabValue(0);
    setSearchQuery("");
    setMenuTitleFilter([]);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleExtraToggle = (extra: MenuItemExtra) => {
    setSelectedExtras(prev =>
      prev.some(e => e.name === extra.name)
        ? prev.filter(e => e.name !== extra.name)
        : [...prev, extra]
    );
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

  // ======================================
  // Cart Management Functions
  // ======================================
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

  // ======================================
  // Order Submission
  // ======================================
  const handleConfirmOrder = async () => {
    if (!infoData?.whatsapp) return;

    let dataTypeOrder = "";
    switch (orderType) {
      case "mesa": dataTypeOrder = `Mesa: ${tableNumber}`; break;
      case "para llevar": dataTypeOrder = `Número de Orden: ${orderNumber}`; break;
      case "delivery": dataTypeOrder = `Dirección de Entrega: ${deliveryAddress}`; break;
    }

    const orderDetails: any = {
      id: Date.now().toString(),
      orderType,
      dataTypeOrder,
      cart,
      comments,
      companiesName: comapinesData?.companyName,
      companiesID: comapinesData?._id,
      email: userData?.email || "",
      fullname: userData?.fullname || "",
      phone: userData?.phone || "",
      whathsapp: userData?.whatsapp || "",
      channel: comapinesData?.companyName,
      name: userData?.email,
      timestamp: new Date(),
    };

    try {
      // Send via socket
      const socketSuccess = await sendOrder(orderDetails,"");

      // Send to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderDetails)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear la orden');
      }

      setCartOpen(false);
      setCart([]);
      const createdOrder = await response.json();
      window.location.reload();
      return createdOrder;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    clearLocalhostStorage();
    window.location.reload();
  };

  // ======================================
  // Animation Effects
  // ======================================
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTitle(prev => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ======================================
  // Render
  // ======================================
  return (
    <Box sx={{ pb: 0 }}>
      {/* App Bar */}
      <AppBar position="static"
        component={motion.div}
        initial={false}
        animate={{
          backgroundColor: showPromotions
            ? theme.palette.info.dark
            : theme.palette.primary.main
        }}
        transition={{ duration: 0.7 }}
      >
        <Toolbar>
          {/* Logo and Title */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexGrow: 1,
            height: '40px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Avatar sx={{
              width: 28,
              height: 28,
              flexShrink: 0,
              ml: 0.5
            }}>
              <Image
                src={"/images/flama.png"}
                alt={"LlakaScript"}
                width={28}
                height={28}
                priority
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
              />
            </Avatar>

            <Box sx={{
              position: 'relative',
              width: 'auto',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayTitle ? 'llakascript' : 'menu-title'}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {displayTitle ? 'Llakascript' : (showPromotions ? 'Promociones' : 'Menú Principal')}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>

          {/* Action Buttons */}
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

      {/* Connection Status */}
      <div style={{ textAlign: "center", padding: "5px" }}>
        {showConnectionStatus && (
          <Box display="inline-block" minWidth="120px" textAlign="center" my={1}>
            <AnimatePresence>
              {!isConnected ? (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="text.secondary">
                    <motion.div
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                    >
                      <Typography variant="body2">Conectando...</Typography>
                    </motion.div>

                    <Box display="flex">
                      {[...Array(3)]?.map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            delay: i * 0.2
                          }}
                        >
                          <Typography variant="body2" fontWeight="bold" color="primary">.</Typography>
                        </motion.div>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="success.main">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                      <Typography variant="body2">Conectado</Typography>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Check color="success" fontSize="small" />
                    </motion.div>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        )}
      </div>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 2 }}>
        {/* Search Bar */}
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

        {/* Active Filters */}
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

        {/* Category Tabs */}
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

        {/* Menu Items List */}
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

      {/* Item Details Dialog */}
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

      {/* Filter Dialog */}
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

      {/* Shopping Cart Drawer */}
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

              {/* Order Details Form */}
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