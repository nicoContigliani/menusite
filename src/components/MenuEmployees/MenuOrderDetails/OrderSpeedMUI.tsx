// import { useState, useEffect } from "react";
// import io from "socket.io-client";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSelector } from "react-redux";
// import Image from "next/image";

// // Material-UI Components
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

// // Material-UI Icons
// import LogoutIcon from '@mui/icons-material/Logout';
// import {
//   Search as SearchIcon,
//   ShoppingCart as ShoppingCartIcon,
//   // AddTaskIcon as InfoIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
//   Delete as DeleteIcon,
//   FilterList as FilterIcon,
//   LocalOffer as PromoIcon,
//   Check,
// } from "@mui/icons-material";
// import AddTaskIcon from '@mui/icons-material/AddTask';

// import { Avatar } from '@mui/material';
// import RoomServiceIcon from '@mui/icons-material/RoomService';



// // Hooks and Services
// import { useMediaQuery } from "../../../../hooks/use-mobile";
// import { RootState } from "../../../../store/store";
// import { sendWhatsAppMessageEmployees } from "../../../services/OrderWathSappServices/ordersWithWhattSappEmployees.services";
// import { clearLocalhostStorage } from "@/services/localstorage.services";
// import useSocketChat from "../../../../hooks/useSocket";
// import { ResponsiveIconMenu } from "@/components/ResponsiveIconMenu/ResponsiveIconMenu";
// import { GenericDrawer } from "@/components/CartDrawer/CartDrawer";
// import OrderAsk from "./orderAsk/OrderAsk";
// import { recordAttendance } from "@/services/attendance.services";
// import { socketHost } from "@/services/socketHost.services";

// // ======================================
// // Type Definitions
// // ======================================
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
//   comments?: any; // Nuevo campo para comentarios específicos del ítem

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

// // Animation variants
// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut"
//     }
//   },
//   exit: { opacity: 0, y: -20 }
// };

// const listVariants = {
//   visible: {
//     transition: {
//       staggerChildren: 0.05,
//       delayChildren: 0.1
//     }
//   }
// };

// const buttonHover = {
//   scale: 1.05,
//   transition: { duration: 0.2 }
// };

// const buttonTap = {
//   scale: 0.95
// };

// const pulseAnimation = {
//   scale: [1, 1.05, 1],
//   transition: {
//     duration: 1.5,
//     repeat: Infinity,
//     ease: "easeInOut"
//   }
// };

// // ======================================
// // Main Component
// // ======================================
// export default function MenuInterface({ menuData, promotionsData = [] }: MenuInterfaceProps) {
//   // ======================================
//   // State Management
//   // ======================================
//   // UI State
//   const [tabValue, setTabValue] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [cartOpen, setCartOpen] = useState<any | null>(false);
//   const [detailsOpen, setDetailsOpen] = useState(false);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [showPromotions, setShowPromotions] = useState(false);
//   const [showConnectionStatus, setShowConnectionStatus] = useState(true);
//   const [displayTitle, setDisplayTitle] = useState(true);

//   // Data State
//   const [filteredData, setFilteredData] = useState<MenuCategory[]>(menuData);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
//   const [selectedExtras, setSelectedExtras] = useState<MenuItemExtra[]>([]);
//   const [menuTitleFilter, setMenuTitleFilter] = useState<string[]>([]);
//   const [infoData, setInfoData] = useState<InfoType | null>(null);

//   // Order State
//   const [orderType, setOrderType] = useState<"mesa" | "para llevar" | "delivery">("mesa");
//   const [tableNumber, setTableNumber] = useState("");
//   const [orderNumber, setOrderNumber] = useState("");
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [comments, setComments] = useState("");

//   // User/Company Data
//   const [userData, setUserData] = useState<any>();
//   const [comapinesData, setCompaniesData] = useState<any>();

//   // ======================================
//   // Hooks and Redux
//   // ======================================
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const theme = useTheme();
//   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: ExcelData });
//   const user: any = useSelector((state: RootState) => state.auth);

//   // Socket Connection
//   // const socket = io("https://socketserver-t4g9.onrender.com", {
//   //   transports: ["websocket"],
//   // });

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
//     // } = useSocketChat('https://socketserver-t4g9.onrender.com');
//   } = useSocketChat(`${socketHost()}`||'https://socketserver-t4g9.onrender.com');

//   // ======================================
//   // Data Initialization Effects
//   // ======================================
//   useEffect(() => {
//     if (user) setUserData(user?.user);
//   }, [user]);

//   useEffect(() => {
//     if (data) setCompaniesData(data);
//   }, [data]);

//   useEffect(() => {
//     if (data?.hojas?.Info?.[0]) {
//       setInfoData(data.hojas.Info[0]);
//     }
//   }, [data]);

//   const channelName = `kitchen-${data.companyName}`;

//   // ======================================
//   // Socket Connection Management
//   // ======================================
//   useEffect(() => {
//     if (user) {
//       setName(user?.user?.email || '');
//     }
//     if (data) {
//       // setRoom(data?.companyName || '');
//       setRoom(channelName);

//     }
//   }, [user, data, setName, setRoom]);

//   useEffect(() => {
//     if (name && room && isConnected) {
//       joinRoom(channelName);
//       console.log(`Unido a la sala: ${room} como ${name}`);
//     }
//   }, [name, room, isConnected, joinRoom]);

//   useEffect(() => {
//     if (isConnected) {
//       const timer = setTimeout(() => {
//         setShowConnectionStatus(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     } else {
//       setShowConnectionStatus(true);
//       const alertTimer = setTimeout(() => {
//         if (!isConnected) {
//           console.warn(`Problemas de conexión. Intentos: ${reconnectAttempts}/5`);
//         }
//       }, 5000);
//       return () => clearTimeout(alertTimer);
//     }
//   }, [isConnected, reconnectAttempts]);

//   // ======================================
//   // Data Filtering Logic
//   // ======================================
//   const currentData = showPromotions ? promotionsData : menuData;

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

//   // ======================================
//   // Helper Functions
//   // ======================================
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

//   const calculateTotal = () => {
//     return cart.reduce((sum, item) => {
//       return sum + (item.price + item.extrasTotal) * item.quantity;
//     }, 0);
//   };

//   // ======================================
//   // UI Handlers
//   // ======================================
//   const togglePromotions = () => {
//     setShowPromotions(!showPromotions);
//     setTabValue(0);
//     setSearchQuery("");
//     setMenuTitleFilter([]);
//   };

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const handleExtraToggle = (extra: MenuItemExtra) => {
//     setSelectedExtras(prev =>
//       prev.some(e => e.name === extra.name)
//         ? prev.filter(e => e.name !== extra.name)
//         : [...prev, extra]
//     );
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

//   // ======================================
//   // Cart Management Functions
//   // ======================================
//   // const addToCart = (item: MenuItemType, extras: MenuItemExtra[] = []) => {
//   //   const price = Number.parseFloat(item.Price.replace("$", ""));
//   //   const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);

//   //   const newItem: CartItem = {
//   //     id: Date.now().toString(),
//   //     itemId: item.Item_id,
//   //     name: item.Name,
//   //     price: price,
//   //     quantity: 1,
//   //     extras: extras,
//   //     extrasTotal: extrasTotal,
//   //     Description: item.Description
//   //   };

//   //   setCart([...cart, newItem]);
//   //   setDetailsOpen(false);
//   //   setSelectedExtras([]);
//   // };


//   const addToCart = (item: MenuItemType, extras: MenuItemExtra[] = [], itemComments: string = "") => {
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
//       Description: item.Description,
//       comments: itemComments // Agregamos los comentarios específicos
//     };

//     setCart([...cart, newItem]);
//     setDetailsOpen(false);
//     setSelectedExtras([]);
//     setComments(""); // Limpiamos el campo de comentarios después de agregar
//   };


//   const openDetails = (item: MenuItemType) => {
//     setSelectedItem(item);
//     setSelectedExtras([]);
//     setDetailsOpen(true);
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

//   // ======================================
//   // Order Submission
//   // ======================================
//   const handleConfirmOrder = async () => {
//     if (!infoData?.whatsapp) return;

//     let dataTypeOrder = "";
//     switch (orderType) {
//       case "mesa": dataTypeOrder = `Mesa: ${tableNumber}`; break;
//       case "para llevar": dataTypeOrder = `Número de Orden: ${orderNumber}`; break;
//       case "delivery": dataTypeOrder = `Dirección de Entrega: ${deliveryAddress}`; break;
//     }

//     const orderDetails: any = {
//       id: Date.now().toString(),
//       orderType,
//       dataTypeOrder,
//       cart,
//       comments,
//       companiesName: comapinesData?.companyName,
//       companiesID: comapinesData?._id,
//       email: userData?.email || "",
//       fullname: userData?.fullname || "",
//       phone: userData?.phone || "",
//       whathsapp: userData?.whatsapp || "",
//       channel: comapinesData?.companyName,
//       name: userData?.email,
//       timestamp: new Date(),
//     };

//     try {
//       // Send via socket
//       const socketSuccess = await sendOrder(orderDetails, "");

//       // Send to API
//       const response = await fetch('/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(orderDetails)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Error al crear la orden');
//       }

//       setCartOpen(false);
//       setCart([]);
//       const createdOrder = await response.json();
//       window.location.reload();
//       return createdOrder;
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleLogout = async () => {
//     clearLocalhostStorage();
//     await recordAttendance('getOut', name, comapinesData?.companyName);
//     window.location.reload();
//   };

//   // ======================================
//   // Animation Effects
//   // ======================================
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayTitle(prev => !prev);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // ======================================
//   // ICONS MENU
//   // ======================================
//   const actionIcons: any[] = [
//     {
//       icon: <FilterIcon />,
//       onClick: setFilterOpen,
//       dividerBefore: true,
//       label: 'filter list',
//     },
//     {
//       icon: <LogoutIcon />,
//       onClick: handleLogout,
//       dividerBefore: true,
//       label: 'Cerrar sesión',
//     },
//   ];

//   // ======================================
//   // Render
//   // ======================================
//   return (
//     <Box sx={{ pb: 0 }}>
//       {/* App Bar */}
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
//           {/* Logo and Title */}
//           <Box sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1,
//             flexGrow: 1,
//             height: '40px',
//             position: 'relative',
//             overflow: 'hidden'
//           }}>
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <Avatar sx={{
//                 width: 28,
//                 height: 28,
//                 flexShrink: 0,
//                 ml: 0.5
//               }}>
//                 <Image
//                   src={"/images/flama.png"}
//                   alt={"LlakaScript"}
//                   width={28}
//                   height={28}
//                   priority
//                   style={{
//                     objectFit: 'contain',
//                     width: '100%',
//                     height: '100%'
//                   }}
//                 />
//               </Avatar>
//             </motion.div>

//             <Box sx={{
//               position: 'relative',
//               width: 'auto',
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
//                     whiteSpace: 'nowrap'
//                   }}
//                 >
//                   <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.1 }}>
//                     {displayTitle ? 'Llakascript' : (showPromotions ? 'Promociones' : 'Menú Principal')}
//                   </Typography>
//                 </motion.div>
//               </AnimatePresence>
//             </Box>
//           </Box>

//           <motion.div whileHover={buttonHover} whileTap={buttonTap}>
//             <IconButton color="inherit" onClick={togglePromotions}>
//               <Badge badgeContent={showPromotions ? null : promotionsData?.length} color="secondary">
//                 <PromoIcon />
//               </Badge>
//             </IconButton>
//           </motion.div>

//           {/* RoomServiceIcon */}



//           <motion.div
//             whileHover={buttonHover}
//             whileTap={buttonTap}
//             animate={cart.length > 0 ? pulseAnimation : {}}
//           >
//             <IconButton color="inherit" onClick={() => setCartOpen(true)}>
//               <Badge badgeContent={cart.length} color="secondary">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>
//           </motion.div>

//           <ResponsiveIconMenu
//             icons={actionIcons}
//             breakpoint="md"
//             menuProps={{
//               sx: {
//                 '& .MuiPaper-root': {
//                   border: '1px solid #ddd',
//                 }
//               }
//             }}
//           />
//         </Toolbar>
//       </AppBar>

//       {/* Connection Status */}
//       <div style={{ textAlign: "center", padding: "5px" }}>
//         {showConnectionStatus && (
//           <Box display="inline-block" minWidth="120px" textAlign="center" my={1}>
//             <AnimatePresence>
//               {!isConnected ? (
//                 <motion.div
//                   key="connecting"
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="text.secondary">
//                     <motion.div
//                       animate={{ opacity: [0.6, 1, 0.6] }}
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
//                           animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
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
//                   <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="success.main">
//                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
//                       <Typography variant="body2">Conectado</Typography>
//                     </motion.div>
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: "spring", stiffness: 500, damping: 15 }}
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

//       {/* Main Content */}
//       <Container maxWidth="md" sx={{ mt: 2 }}>
//         {/* Search Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder={showPromotions ? "Buscar promociones..." : "Buscar platos..."}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ mb: 2 }}
//           />
//         </motion.div>

//         {/* Active Filters */}
//         {menuTitleFilter.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
//               {menuTitleFilter.map((title) => (
//                 <motion.div
//                   key={title}
//                   layout
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   exit={{ scale: 0.8, opacity: 0 }}
//                   transition={{ type: "spring" }}
//                 >
//                   <Chip
//                     label={title}
//                     onDelete={() => handleMenuTitleFilter(title)}
//                     color="primary"
//                     variant="outlined"
//                   />
//                 </motion.div>
//               ))}
//               <motion.div
//                 layout
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ type: "spring" }}
//               >
//                 <Chip label="Limpiar filtros" onClick={() => setMenuTitleFilter([])} variant="outlined" />
//               </motion.div>
//             </Box>
//           </motion.div>
//         )}

//         {/* Category Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//         >
//           <Paper elevation={2} sx={{ mb: 2 }}>
//             <Tabs
//               value={tabValue}
//               onChange={handleTabChange}
//               variant={isMobile ? "scrollable" : "fullWidth"}
//               scrollButtons="auto"
//               allowScrollButtonsMobile
//               textColor="primary"
//               indicatorColor="primary"
//             >
//               {filteredData.map((category) => (
//                 <Tab
//                   key={category.key}
//                   label={category.key}
//                   component={motion.div}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 />
//               ))}
//             </Tabs>
//           </Paper>
//         </motion.div>

//         {/* Menu Items List */}
//         {filteredData.length > 0 && tabValue < filteredData.length ? (
//           <Paper elevation={3} sx={{ p: 2 }}>
//             <List component={motion.div} variants={listVariants} initial="hidden" animate="visible">
//               {filteredData[tabValue].element.map((item) => (
//                 <ListItem
//                   key={item.Item_id}
//                   sx={{
//                     flexDirection: "column",
//                     alignItems: "flex-start",
//                     borderBottom: "1px solid #eee",
//                     py: 2,
//                   }}
//                   component={motion.div}
//                   variants={itemVariants}
//                   layout
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
//                       <motion.div whileHover={buttonHover} whileTap={buttonTap}>
//                         <IconButton color="info" onClick={() => addToCart(item)} size="small">
//                           <AddIcon />
//                         </IconButton>
//                       </motion.div>

//                       {item.extras && item.extras.length > 0 && (
//                         <motion.div whileHover={buttonHover} whileTap={buttonTap}>
//                           <IconButton color="primary" onClick={() => openDetails(item)} size="small">
//                             <AddTaskIcon />
//                           </IconButton>
//                         </motion.div>
//                       )}

//                     </Box>
//                   </Box>
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
//               <Typography variant="h6">
//                 {showPromotions ? "No hay promociones disponibles" : "No se encontraron resultados"}
//               </Typography>
//             </Paper>
//           </motion.div>
//         )}
//       </Container>

//       {/* Item Details Dialog */}

//       {/* TODO TEXT INPUT  */}

//       {/* <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} fullWidth maxWidth="sm">
//         {selectedItem && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.2 }}
//           >
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
//                       <motion.div
//                         key={extra.name}
//                         whileHover={{ x: 5 }}
//                         transition={{ type: "spring", stiffness: 300 }}
//                       >
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               checked={selectedExtras.some(e => e.name === extra.name)}
//                               onChange={() => handleExtraToggle(extra)}
//                             />
//                           }
//                           label={`${extra.name.replace("_", " ")} (+$${extra.price})`}
//                         />
//                       </motion.div>
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
//               <motion.div whileHover={buttonHover} whileTap={buttonTap}>
//                 <Button onClick={() => setDetailsOpen(false)}>Cancelar</Button>
//               </motion.div>
//               <motion.div whileHover={buttonHover} whileTap={buttonTap}>
//                 <Button variant="contained" color="primary" onClick={() => addToCart(selectedItem, selectedExtras)}>
//                   Agregar al pedido
//                 </Button>
//               </motion.div>
//             </DialogActions>
//           </motion.div>
//         )}
//       </Dialog> */}


//       <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} fullWidth maxWidth="sm">
//         {selectedItem && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.2 }}
//           >
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
//                       <motion.div
//                         key={extra.name}
//                         whileHover={{ x: 5 }}
//                         transition={{ type: "spring", stiffness: 300 }}
//                       >
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               checked={selectedExtras.some(e => e.name === extra.name)}
//                               onChange={() => handleExtraToggle(extra)}
//                             />
//                           }
//                           label={`${extra.name.replace("_", " ")} (+$${extra.price})`}
//                         />
//                       </motion.div>
//                     ))}
//                   </FormGroup>
//                 </>
//               )}

//               {/* Campo de comentarios específico para este ítem */}
//               <TextField
//                 fullWidth
//                 label="Comentarios para este plato"
//                 value={comments}
//                 onChange={(e) => setComments(e.target.value)}
//                 sx={{ mt: 2, mb: 1 }}
//                 size="small"
//                 multiline
//                 rows={2}
//                 placeholder="Ej: Sin picante, bien cocido, etc."
//               />

//               {selectedExtras.length > 0 && (
//                 <Box sx={{ mt: 2 }}>
//                   <Typography variant="subtitle2">
//                     Extras seleccionados: ${selectedExtras.reduce((sum, extra) => sum + extra.price, 0)}
//                   </Typography>
//                 </Box>
//               )}
//             </DialogContent>
//             <DialogActions>
//               <motion.div whileHover={buttonHover} whileTap={buttonTap}>
//                 <Button onClick={() => setDetailsOpen(false)}>Cancelar</Button>
//               </motion.div>
//               <motion.div whileHover={buttonHover} whileTap={buttonTap}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => addToCart(selectedItem, selectedExtras, comments)}
//                 >
//                   Agregar al pedido
//                 </Button>
//               </motion.div>
//             </DialogActions>
//           </motion.div>
//         )}
//       </Dialog>



//       {/* Filter Dialog */}
//       <Dialog open={filterOpen} onClose={() => setFilterOpen(false)}>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <DialogTitle>Filtrar por tipo</DialogTitle>
//           <DialogContent>
//             <FormGroup>
//               {uniqueMenuTitles.map((title) => (
//                 <motion.div
//                   key={title}
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={menuTitleFilter.includes(title)}
//                         onChange={() => handleMenuTitleFilter(title)}
//                       />
//                     }
//                     label={title}
//                   />
//                 </motion.div>
//               ))}
//             </FormGroup>
//           </DialogContent>
//           <DialogActions>
//             <motion.div whileHover={buttonHover} whileTap={buttonTap}>
//               <Button onClick={() => setMenuTitleFilter([])}>Limpiar</Button>
//             </motion.div>
//             <motion.div whileHover={buttonHover} whileTap={buttonTap}>
//               <Button onClick={() => setFilterOpen(false)}>Cerrar</Button>
//             </motion.div>
//           </DialogActions>
//         </motion.div>
//       </Dialog>

//       <GenericDrawer
//         isOpen={cartOpen}
//         setCartOpen={setCartOpen}
//         anchor="right"
//         width={400}
//         drawerProps={{
//           PaperProps: {
//             sx: {
//               backgroundColor: '#f0f0f0',
//             },
//           },
//         }}
//       >
//         {true &&
//           <OrderAsk
//             cart={cart}
//             removeFromCart={removeFromCart}
//             addToCart={addToCart}
//             openDetails={openDetails}
//             incrementQuantity={incrementQuantity}
//             decrementQuantity={decrementQuantity}
//             calculateTotal={calculateTotal}
//             comments={comments}
//             setComments={setComments}
//             orderType={orderType}
//             handleOrderTypeChange={handleOrderTypeChange}
//             tableNumber={tableNumber}
//             setTableNumber={setTableNumber}
//             orderNumber={orderNumber}
//             setOrderNumber={setOrderNumber}
//             deliveryAddress={deliveryAddress}
//             setDeliveryAddress={setDeliveryAddress}
//             handleConfirmOrder={handleConfirmOrder}
//           />
//         }
//       </GenericDrawer>
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
  Snackbar,
} from "@mui/material";

// Material-UI Icons
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  LocalOffer as PromoIcon,
  Check,
} from "@mui/icons-material";
import AddTaskIcon from '@mui/icons-material/AddTask';

import { Avatar } from '@mui/material';
import RoomServiceIcon from '@mui/icons-material/RoomService';

// Hooks and Services
import { useMediaQuery } from "../../../../hooks/use-mobile";
import { RootState } from "../../../../store/store";
import { sendWhatsAppMessageEmployees } from "../../../services/OrderWathSappServices/ordersWithWhattSappEmployees.services";
import { clearLocalhostStorage } from "@/services/localstorage.services";
import { ResponsiveIconMenu } from "@/components/ResponsiveIconMenu/ResponsiveIconMenu";
import { GenericDrawer } from "@/components/CartDrawer/CartDrawer";
import OrderAsk from "./orderAsk/OrderAsk";
import { recordAttendance } from "@/services/attendance.services";
import { useOrdersManagementSocketApi } from "../../../../hooks/useOrdersManagementSocketApi";
import { socketHost } from "@/services/socketHost.services";

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
  comments?: string;
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

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { opacity: 0, y: -20 }
};

const listVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

const buttonTap = {
  scale: 0.95
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

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
  const [cartOpen, setCartOpen] = useState<any | null>(false);
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
  const user: any = useSelector((state: RootState) => state.auth) || localStorage.getItem("email");

  // Socket Connection using custom hook
  const {
    isConnected,
    reconnectAttempts,
    sendOrder,
    createOrder,
    successMessage,
    clearMessages,
    parsedMessages,
    room,
    joinRoom,
    name,
    setName,
    fetchHistoricalOrders
  } = useOrdersManagementSocketApi({
    companyName: data?.companyName,
    userEmail: user?.user?.email,
    socketUrl:`${socketHost()}`||'https://socketserver-t4g9.onrender.com'
  });

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

  const channelName = `kitchen-${data?.companyName}`;

  // ======================================
  // Socket Connection Management
  // ======================================
  useEffect(() => {
    if (user) {
      setName(user?.user?.email || '');
    }
    if (data) {
      joinRoom(channelName);
    }
  }, [user, data, setName, joinRoom, channelName]);

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
  const addToCart = (item: MenuItemType, extras: MenuItemExtra[] = [], itemComments: string = "") => {
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
      Description: item.Description,
      comments: itemComments
    };

    setCart([...cart, newItem]);
    setDetailsOpen(false);
    setSelectedExtras([]);
    setComments("");
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
      status: 'pending'
    };

    try {
      // Send via socket
      // await sendOrder(orderDetails, channelName);

      // // Send to API
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(orderDetails)
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.error || 'Error al crear la orden');
      // }

      // setCartOpen(false);
      // setCart([]);
      // const createdOrder = await response.json();
      // window.location.reload();
      // return createdOrder;


      await createOrder(orderDetails);
      setCartOpen(false);
      setCart([]);
      fetchHistoricalOrders(); // <- Actualizar manualmente la lista

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = async () => {
    clearLocalhostStorage();
    await recordAttendance('getOut', name, comapinesData?.companyName);
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
  // ICONS MENU
  // ======================================
  const actionIcons: any[] = [
    {
      icon: <FilterIcon />,
      onClick: setFilterOpen,
      dividerBefore: true,
      label: 'filter list',
    },
    {
      icon: <LogoutIcon />,
      onClick: handleLogout,
      dividerBefore: true,
      label: 'Cerrar sesión',
    },
  ];

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
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
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
            </motion.div>

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
                  <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.1 }}>
                    {displayTitle ? 'Llakascript' : (showPromotions ? 'Promociones' : 'Menú Principal')}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>

          <motion.div whileHover={buttonHover} whileTap={buttonTap}>
            <IconButton color="inherit" onClick={togglePromotions}>
              <Badge badgeContent={showPromotions ? null : promotionsData?.length} color="secondary">
                <PromoIcon />
              </Badge>
            </IconButton>
          </motion.div>

          <motion.div
            whileHover={buttonHover}
            whileTap={buttonTap}
            animate={cart.length > 0 ? pulseAnimation : {}}
          >
            <IconButton color="inherit" onClick={() => setCartOpen(true)}>
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </motion.div>

          <ResponsiveIconMenu
            icons={actionIcons}
            breakpoint="md"
            menuProps={{
              sx: {
                '& .MuiPaper-root': {
                  border: '1px solid #ddd',
                }
              }
            }}
          />
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
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
        </motion.div>

        {/* Active Filters */}
        {menuTitleFilter.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {menuTitleFilter.map((title) => (
                <motion.div
                  key={title}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring" }}
                >
                  <Chip
                    label={title}
                    onDelete={() => handleMenuTitleFilter(title)}
                    color="primary"
                    variant="outlined"
                  />
                </motion.div>
              ))}
              <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring" }}
              >
                <Chip label="Limpiar filtros" onClick={() => setMenuTitleFilter([])} variant="outlined" />
              </motion.div>
            </Box>
          </motion.div>
        )}

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
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
                <Tab
                  key={category.key}
                  label={category.key}
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </Tabs>
          </Paper>
        </motion.div>

        {/* Menu Items List */}
        {filteredData.length > 0 && tabValue < filteredData.length ? (
          <Paper elevation={3} sx={{ p: 2 }}>
            <List component={motion.div} variants={listVariants} initial="hidden" animate="visible">
              {filteredData[tabValue].element.map((item) => (
                <ListItem
                  key={item.Item_id}
                  sx={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderBottom: "1px solid #eee",
                    py: 2,
                  }}
                  component={motion.div}
                  variants={itemVariants}
                  layout
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
                      <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                        <IconButton color="info" onClick={() => addToCart(item)} size="small">
                          <AddIcon />
                        </IconButton>
                      </motion.div>

                      {item.extras && item.extras.length > 0 && (
                        <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                          <IconButton color="primary" onClick={() => openDetails(item)} size="small">
                            <AddTaskIcon />
                          </IconButton>
                        </motion.div>
                      )}

                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6">
                {showPromotions ? "No hay promociones disponibles" : "No se encontraron resultados"}
              </Typography>
            </Paper>
          </motion.div>
        )}
      </Container>

      {/* Item Details Dialog */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} fullWidth maxWidth="sm">
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
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
                      <motion.div
                        key={extra.name}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedExtras.some(e => e.name === extra.name)}
                              onChange={() => handleExtraToggle(extra)}
                            />
                          }
                          label={`${extra.name.replace("_", " ")} (+$${extra.price})`}
                        />
                      </motion.div>
                    ))}
                  </FormGroup>
                </>
              )}

              {/* Campo de comentarios específico para este ítem */}
              <TextField
                fullWidth
                label="Comentarios para este plato"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                sx={{ mt: 2, mb: 1 }}
                size="small"
                multiline
                rows={2}
                placeholder="Ej: Sin picante, bien cocido, etc."
              />

              {selectedExtras.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">
                    Extras seleccionados: ${selectedExtras.reduce((sum, extra) => sum + extra.price, 0)}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                <Button onClick={() => setDetailsOpen(false)}>Cancelar</Button>
              </motion.div>
              <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(selectedItem, selectedExtras, comments)}
                >
                  Agregar al pedido
                </Button>
              </motion.div>
            </DialogActions>
          </motion.div>
        )}
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DialogTitle>Filtrar por tipo</DialogTitle>
          <DialogContent>
            <FormGroup>
              {uniqueMenuTitles.map((title) => (
                <motion.div
                  key={title}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={menuTitleFilter.includes(title)}
                        onChange={() => handleMenuTitleFilter(title)}
                      />
                    }
                    label={title}
                  />
                </motion.div>
              ))}
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Button onClick={() => setMenuTitleFilter([])}>Limpiar</Button>
            </motion.div>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Button onClick={() => setFilterOpen(false)}>Cerrar</Button>
            </motion.div>
          </DialogActions>
        </motion.div>
      </Dialog>

      <GenericDrawer
        isOpen={cartOpen}
        setCartOpen={setCartOpen}
        anchor="right"
        width={400}
        drawerProps={{
          PaperProps: {
            sx: {
              backgroundColor: '#f0f0f0',
            },
          },
        }}
      >
        {true &&
          <OrderAsk
            cart={cart}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
            openDetails={openDetails}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            calculateTotal={calculateTotal}
            comments={comments}
            setComments={setComments}
            orderType={orderType}
            handleOrderTypeChange={handleOrderTypeChange}
            tableNumber={tableNumber}
            setTableNumber={setTableNumber}
            orderNumber={orderNumber}
            setOrderNumber={setOrderNumber}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            handleConfirmOrder={handleConfirmOrder}
          />
        }
      </GenericDrawer>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={clearMessages}
        message={successMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Box>
  );
}