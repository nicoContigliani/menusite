// // // // // // // // // // // // // // import React, { useMemo, useState, useEffect } from 'react';
// // // // // // // // // // // // // // import { useSelector } from 'react-redux';
// // // // // // // // // // // // // // import { RootState } from "../../../store/store";
// // // // // // // // // // // // // // import {
// // // // // // // // // // // // // //   Box,
// // // // // // // // // // // // // //   Button,
// // // // // // // // // // // // // //   Chip,
// // // // // // // // // // // // // //   CircularProgress,
// // // // // // // // // // // // // //   Paper,
// // // // // // // // // // // // // //   Typography,
// // // // // // // // // // // // // //   Snackbar,
// // // // // // // // // // // // // //   Alert,
// // // // // // // // // // // // // //   Grid,
// // // // // // // // // // // // // //   List,
// // // // // // // // // // // // // //   ListItem,
// // // // // // // // // // // // // //   ListItemText,
// // // // // // // // // // // // // //   ListItemAvatar,
// // // // // // // // // // // // // //   Avatar,
// // // // // // // // // // // // // //   ListItemSecondaryAction,
// // // // // // // // // // // // // //   IconButton,
// // // // // // // // // // // // // //   Collapse,
// // // // // // // // // // // // // //   Card,
// // // // // // // // // // // // // //   CardContent,
// // // // // // // // // // // // // //   CardActions,
// // // // // // // // // // // // // //   Divider,
// // // // // // // // // // // // // //   TextField,
// // // // // // // // // // // // // //   Badge,
// // // // // // // // // // // // // //   Tooltip,
// // // // // // // // // // // // // //   AppBar,
// // // // // // // // // // // // // //   Toolbar,
// // // // // // // // // // // // // //   useMediaQuery,
// // // // // // // // // // // // // //   useTheme
// // // // // // // // // // // // // // } from '@mui/material';
// // // // // // // // // // // // // // import {
// // // // // // // // // // // // // //   Delete as DeleteIcon,
// // // // // // // // // // // // // //   Edit as EditIcon,
// // // // // // // // // // // // // //   Refresh as RefreshIcon,
// // // // // // // // // // // // // //   ExpandMore as ExpandMoreIcon,
// // // // // // // // // // // // // //   ExpandLess as ExpandLessIcon,
// // // // // // // // // // // // // //   CheckCircle as CheckCircleIcon,
// // // // // // // // // // // // // //   PauseCircle as PauseCircleIcon,
// // // // // // // // // // // // // //   Cancel as CancelIcon,
// // // // // // // // // // // // // //   DeliveryDining as DeliveryIcon,
// // // // // // // // // // // // // //   PlayCircle as PlayIcon,
// // // // // // // // // // // // // //   Add as AddIcon,
// // // // // // // // // // // // // //   Warning as WarningIcon,
// // // // // // // // // // // // // //   Info as InfoIcon,
// // // // // // // // // // // // // //   ViewList as ViewListIcon,
// // // // // // // // // // // // // //   ViewColumn as ViewColumnIcon,
// // // // // // // // // // // // // //   Logout as LogoutIcon,
// // // // // // // // // // // // // //   Update as UpdateIcon
// // // // // // // // // // // // // // } from '@mui/icons-material';
// // // // // // // // // // // // // // import { FixedSizeList } from 'react-window';
// // // // // // // // // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // // // // import { clearLocalhostStorage } from "@/services/localstorage.services";
// // // // // // // // // // // // // // import { recordAttendance } from "@/services/attendance.services";
// // // // // // // // // // // // // // import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog";
// // // // // // // // // // // // // // import { useOrdersManagementSocketApi } from '../../../hooks/useOrdersManagementSocketApi';

// // // // // // // // // // // // // // const OrderSpeedGeneric = () => {
// // // // // // // // // // // // // //   const theme = useTheme();
// // // // // // // // // // // // // //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// // // // // // // // // // // // // //   const isTablet = useMediaQuery(theme.breakpoints.down("md"));
// // // // // // // // // // // // // //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile);
// // // // // // // // // // // // // //   const [displayTitle, setDisplayTitle] = useState(false);
// // // // // // // // // // // // // //   const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column");
// // // // // // // // // // // // // //   const [openPendingDialog, setOpenPendingDialog] = useState(false);

// // // // // // // // // // // // // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any });
// // // // // // // // // // // // // //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email");

// // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // //     allOrders,
// // // // // // // // // // // // // //     ordersByStatus,
// // // // // // // // // // // // // //     isConnected,
// // // // // // // // // // // // // //     isLoading,
// // // // // // // // // // // // // //     isUpdating,
// // // // // // // // // // // // // //     error,
// // // // // // // // // // // // // //     successMessage,
// // // // // // // // // // // // // //     reconnectAttempts,
// // // // // // // // // // // // // //     lastRefresh,
// // // // // // // // // // // // // //     socketMessages,
// // // // // // // // // // // // // //     messages,
// // // // // // // // // // // // // //     fetchHistoricalOrders,
// // // // // // // // // // // // // //     handleOrderAction,
// // // // // // // // // // // // // //     updateOrder,
// // // // // // // // // // // // // //     deleteOrder,
// // // // // // // // // // // // // //     createOrder,
// // // // // // // // // // // // // //     clearMessages,
// // // // // // // // // // // // // //     reconnectSocket,
// // // // // // // // // // // // // //     cleanSocket,
// // // // // // // // // // // // // //     sendMessage,
// // // // // // // // // // // // // //     message,
// // // // // // // // // // // // // //     setMessage,
// // // // // // // // // // // // // //     room
// // // // // // // // // // // // // //   } = useOrdersManagementSocketApi({
// // // // // // // // // // // // // //     companyName: data?.companyName || "LlakaScript",
// // // // // // // // // // // // // //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// // // // // // // // // // // // // //     orderLimit: 50
// // // // // // // // // // // // // //   });
// // // // // // // // // // // // // //     console.log("🚀 ~ OrderSpeedGeneric ~ ordersByStatus:", ordersByStatus)
// // // // // // // // // // // // // //   console.log("🚀 ~ OrderSpeedGeneric ~ ordersByStatus:", ordersByStatus)

// // // // // // // // // // // // // //   const [expandedOrder, setExpandedOrder] = React.useState<string | null>(null);
// // // // // // // // // // // // // //   const [newMessageText, setNewMessageText] = React.useState('');
// // // // // // // // // // // // // //   const [newOrderForm, setNewOrderForm] = React.useState<Partial<any>>({
// // // // // // // // // // // // // //     fullname: '',
// // // // // // // // // // // // // //     orderType: 'delivery',
// // // // // // // // // // // // // //     cart: [{ id: '1', itemId: 1, name: '', price: 0, quantity: 1, Description: '' }]
// // // // // // // // // // // // // //   });

// // // // // // // // // // // // // //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0);
// // // // // // // // // // // // // //   const pendingCount = ordersByStatus.pending?.length || 0;
// // // // // // // // // // // // // //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0);
// // // // // // // // // // // // // //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0);

// // // // // // // // // // // // // //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed);
// // // // // // // // // // // // // //   const toggleViewMode = () => setViewMode(viewMode === "column" ? "list" : "column");

// // // // // // // // // // // // // //   const handleLogout = async () => {
// // // // // // // // // // // // // //     clearLocalhostStorage();
// // // // // // // // // // // // // //     await recordAttendance('getOut', user?.user?.email, data?.companyName);
// // // // // // // // // // // // // //     window.location.reload();
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // Ordenar órdenes por fecha (más recientes primero)
// // // // // // // // // // // // // //   const sortedOrders = useMemo(() => {
// // // // // // // // // // // // // //     return [...allOrders].sort((a, b) => {
// // // // // // // // // // // // // //       const dateA = new Date(a.createdAt || a.timestamp || 0);
// // // // // // // // // // // // // //       const dateB = new Date(b.createdAt || b.timestamp || 0);
// // // // // // // // // // // // // //       return dateB.getTime() - dateA.getTime();
// // // // // // // // // // // // // //     });
// // // // // // // // // // // // // //   }, [allOrders]);

// // // // // // // // // // // // // //   // Filtrar mensajes de órdenes para el log
// // // // // // // // // // // // // //   const orderMessages = useMemo(() => {
// // // // // // // // // // // // // //     return messages.filter(msg => msg.isOrder);
// // // // // // // // // // // // // //   }, [messages]);

// // // // // // // // // // // // // //   // Title animation effect
// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     const interval = setInterval(() => {
// // // // // // // // // // // // // //       setDisplayTitle((prev) => !prev);
// // // // // // // // // // // // // //     }, 5000);
// // // // // // // // // // // // // //     return () => clearInterval(interval);
// // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // //   // Update view mode when screen size changes
// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     setViewMode(isMobile ? "list" : "column");
// // // // // // // // // // // // // //   }, [isMobile]);

// // // // // // // // // // // // // //   // Crear orden de prueba
// // // // // // // // // // // // // //   const handleCreateTestOrder = () => {
// // // // // // // // // // // // // //     const testOrder: any = {
// // // // // // // // // // // // // //       _id: `test-${Date.now()}`,
// // // // // // // // // // // // // //       fullname: `Cliente ${Math.floor(Math.random() * 1000)}`,
// // // // // // // // // // // // // //       orderType: ['delivery', 'pickup', 'dine-in'][Math.floor(Math.random() * 3)] as any,
// // // // // // // // // // // // // //       dataTypeOrder: 'food',
// // // // // // // // // // // // // //       cart: [
// // // // // // // // // // // // // //         {
// // // // // // // // // // // // // //           id: `item-${Date.now()}`,
// // // // // // // // // // // // // //           itemId: Math.floor(Math.random() * 1000),
// // // // // // // // // // // // // //           name: ['Pizza', 'Hamburguesa', 'Ensalada'][Math.floor(Math.random() * 3)] as string,
// // // // // // // // // // // // // //           price: Math.floor(Math.random() * 30) + 5,
// // // // // // // // // // // // // //           quantity: Math.floor(Math.random() * 3) + 1,
// // // // // // // // // // // // // //           Description: ''
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //       ],
// // // // // // // // // // // // // //       status: 'pending',
// // // // // // // // // // // // // //       createdAt: new Date().toISOString(),
// // // // // // // // // // // // // //       updatedAt: new Date().toISOString()
// // // // // // // // // // // // // //     };

// // // // // // // // // // // // // //     createOrder(testOrder).catch(console.error);
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // Enviar mensaje de chat
// // // // // // // // // // // // // //   const handleSendMessage = () => {
// // // // // // // // // // // // // //     if (newMessageText.trim()) {
// // // // // // // // // // // // // //       setMessage(newMessageText);
// // // // // // // // // // // // // //       sendMessage();
// // // // // // // // // // // // // //       setNewMessageText('');
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // Renderizar filas para la lista virtualizada
// // // // // // // // // // // // // //   const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
// // // // // // // // // // // // // //     const order = sortedOrders[index];
// // // // // // // // // // // // // //     const isExpanded = expandedOrder === order._id;
// // // // // // // // // // // // // //     const isPending = order.status === 'pending';
// // // // // // // // // // // // // //     const isProcessing = order.status === 'processing';

// // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // //       <ListItem
// // // // // // // // // // // // // //         style={style}
// // // // // // // // // // // // // //         key={order._id}
// // // // // // // // // // // // // //         sx={{
// // // // // // // // // // // // // //           bgcolor: isExpanded ? 'action.hover' : 'inherit',
// // // // // // // // // // // // // //           borderLeft: isProcessing ? '4px solid #1976d2' : isPending ? '4px solid #9e9e9e' : 'none'
// // // // // // // // // // // // // //         }}
// // // // // // // // // // // // // //       >
// // // // // // // // // // // // // //         <ListItemAvatar>
// // // // // // // // // // // // // //           <Badge
// // // // // // // // // // // // // //             overlap="circular"
// // // // // // // // // // // // // //             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// // // // // // // // // // // // // //             badgeContent={
// // // // // // // // // // // // // //               orderMessages.filter(m => m.orderData?._id === order._id).length > 0 ? (
// // // // // // // // // // // // // //                 <Tooltip title="Tiene actualizaciones recientes">
// // // // // // // // // // // // // //                   <InfoIcon color="primary" fontSize="small" />
// // // // // // // // // // // // // //                 </Tooltip>
// // // // // // // // // // // // // //               ) : null
// // // // // // // // // // // // // //             }
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             <Avatar sx={{
// // // // // // // // // // // // // //               bgcolor: {
// // // // // // // // // // // // // //                 pending: 'grey.500',
// // // // // // // // // // // // // //                 processing: 'primary.main',
// // // // // // // // // // // // // //                 paused: 'warning.main',
// // // // // // // // // // // // // //                 finished: 'success.main',
// // // // // // // // // // // // // //                 cancelled: 'error.main',
// // // // // // // // // // // // // //                 delivered: 'success.dark'
// // // // // // // // // // // // // //               }[order.status]
// // // // // // // // // // // // // //             }}>
// // // // // // // // // // // // // //               {order.status === 'pending' && <PlayIcon />}
// // // // // // // // // // // // // //               {order.status === 'processing' && <PlayIcon />}
// // // // // // // // // // // // // //               {order.status === 'paused' && <PauseCircleIcon />}
// // // // // // // // // // // // // //               {order.status === 'finished' && <CheckCircleIcon />}
// // // // // // // // // // // // // //               {order.status === 'cancelled' && <CancelIcon />}
// // // // // // // // // // // // // //               {order.status === 'delivered' && <DeliveryIcon />}
// // // // // // // // // // // // // //             </Avatar>
// // // // // // // // // // // // // //           </Badge>
// // // // // // // // // // // // // //         </ListItemAvatar>
// // // // // // // // // // // // // //         <ListItemText
// // // // // // // // // // // // // //           primary={`#${order.id || order._id.slice(-4)} - ${order.fullname}`}
// // // // // // // // // // // // // //           secondary={
// // // // // // // // // // // // // //             <>
// // // // // // // // // // // // // //               <Typography component="span" variant="body2" color="text.primary">
// // // // // // // // // // // // // //                 {order.status.toUpperCase()}
// // // // // // // // // // // // // //               </Typography>
// // // // // // // // // // // // // //               {` — ${new Date(order.createdAt || order.timestamp || '').toLocaleString()}`}
// // // // // // // // // // // // // //               {order.orderType && ` — ${order.orderType.toUpperCase()}`}
// // // // // // // // // // // // // //             </>
// // // // // // // // // // // // // //           }
// // // // // // // // // // // // // //         />
// // // // // // // // // // // // // //         <ListItemSecondaryAction>
// // // // // // // // // // // // // //           <IconButton
// // // // // // // // // // // // // //             edge="end"
// // // // // // // // // // // // // //             onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
// // // // // // // // // // // // // //             aria-label={isExpanded ? "Ocultar detalles" : "Mostrar detalles"}
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
// // // // // // // // // // // // // //           </IconButton>
// // // // // // // // // // // // // //         </ListItemSecondaryAction>
// // // // // // // // // // // // // //       </ListItem>
// // // // // // // // // // // // // //     );
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // Agregar item al formulario de nueva orden
// // // // // // // // // // // // // //   const addCartItem = () => {
// // // // // // // // // // // // // //     setNewOrderForm((prev: any) => ({
// // // // // // // // // // // // // //       ...prev,
// // // // // // // // // // // // // //       cart: [
// // // // // // // // // // // // // //         ...prev.cart,
// // // // // // // // // // // // // //         { id: `${Date.now()}`, itemId: prev.cart.length + 1, name: '', price: 0, quantity: 1, Description: '' }
// // // // // // // // // // // // // //       ]
// // // // // // // // // // // // // //     }));
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // Crear nueva orden desde el formulario
// // // // // // // // // // // // // //   const handleCreateOrder = () => {
// // // // // // // // // // // // // //     if (!newOrderForm.fullname || newOrderForm.cart.some((item: any) => !item.name)) {
// // // // // // // // // // // // // //       setError('Nombre del cliente y todos los ítems son requeridos');
// // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     const newOrder: Partial<any> = {
// // // // // // // // // // // // // //       ...newOrderForm,
// // // // // // // // // // // // // //       status: 'pending',
// // // // // // // // // // // // // //       dataTypeOrder: 'food',
// // // // // // // // // // // // // //       createdAt: new Date().toISOString()
// // // // // // // // // // // // // //     };

// // // // // // // // // // // // // //     createOrder(newOrder)
// // // // // // // // // // // // // //       .then(() => {
// // // // // // // // // // // // // //         setNewOrderForm({
// // // // // // // // // // // // // //           fullname: '',
// // // // // // // // // // // // // //           orderType: 'delivery',
// // // // // // // // // // // // // //           cart: [{ id: '1', itemId: 1, name: '', price: 0, quantity: 1, Description: '' }]
// // // // // // // // // // // // // //         });
// // // // // // // // // // // // // //       })
// // // // // // // // // // // // // //       .catch(console.error);
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <Box
// // // // // // // // // // // // // //       sx={{
// // // // // // // // // // // // // //         height: "100vh",
// // // // // // // // // // // // // //         overflow: "hidden",
// // // // // // // // // // // // // //         bgcolor: theme.palette.background.default,
// // // // // // // // // // // // // //         display: "flex",
// // // // // // // // // // // // // //         flexDirection: "column",
// // // // // // // // // // // // // //       }}
// // // // // // // // // // // // // //     >
// // // // // // // // // // // // // //       {/* Custom AppBar */}
// // // // // // // // // // // // // //       <AppBar
// // // // // // // // // // // // // //         position="static"
// // // // // // // // // // // // // //         component={motion.div}
// // // // // // // // // // // // // //         initial={false}
// // // // // // // // // // // // // //         transition={{ duration: 0.7 }}
// // // // // // // // // // // // // //         elevation={0}
// // // // // // // // // // // // // //         sx={{
// // // // // // // // // // // // // //           bgcolor: "background.paper",
// // // // // // // // // // // // // //           color: "text.primary",
// // // // // // // // // // // // // //           borderBottom: 1,
// // // // // // // // // // // // // //           borderColor: "divider",
// // // // // // // // // // // // // //         }}
// // // // // // // // // // // // // //       >
// // // // // // // // // // // // // //         <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
// // // // // // // // // // // // // //           {/* Logo and Title */}
// // // // // // // // // // // // // //           <Box
// // // // // // // // // // // // // //             sx={{
// // // // // // // // // // // // // //               display: "flex",
// // // // // // // // // // // // // //               alignItems: "center",
// // // // // // // // // // // // // //               gap: 1,
// // // // // // // // // // // // // //               flexGrow: 1,
// // // // // // // // // // // // // //               height: "40px",
// // // // // // // // // // // // // //               position: "relative",
// // // // // // // // // // // // // //               overflow: "hidden",
// // // // // // // // // // // // // //             }}
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // // // // // // // // // // // // //               <Avatar
// // // // // // // // // // // // // //                 sx={{
// // // // // // // // // // // // // //                   width: 28,
// // // // // // // // // // // // // //                   height: 28,
// // // // // // // // // // // // // //                   flexShrink: 0,
// // // // // // // // // // // // // //                   ml: 0.5,
// // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // //               >
// // // // // // // // // // // // // //                 <Image
// // // // // // // // // // // // // //                   src={"/images/flama.png"}
// // // // // // // // // // // // // //                   alt={"LlakaScript"}
// // // // // // // // // // // // // //                   width={28}
// // // // // // // // // // // // // //                   height={28}
// // // // // // // // // // // // // //                   priority
// // // // // // // // // // // // // //                   style={{
// // // // // // // // // // // // // //                     objectFit: "contain",
// // // // // // // // // // // // // //                     width: "100%",
// // // // // // // // // // // // // //                     height: "100%",
// // // // // // // // // // // // // //                   }}
// // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // //               </Avatar>
// // // // // // // // // // // // // //             </motion.div>

// // // // // // // // // // // // // //             <Box
// // // // // // // // // // // // // //               sx={{
// // // // // // // // // // // // // //                 position: "relative",
// // // // // // // // // // // // // //                 width: "auto",
// // // // // // // // // // // // // //                 height: "100%",
// // // // // // // // // // // // // //                 display: "flex",
// // // // // // // // // // // // // //                 alignItems: "center",
// // // // // // // // // // // // // //                 flexGrow: 1,
// // // // // // // // // // // // // //               }}
// // // // // // // // // // // // // //             >
// // // // // // // // // // // // // //               <AnimatePresence mode="wait">
// // // // // // // // // // // // // //                 <motion.div
// // // // // // // // // // // // // //                   key={displayTitle ? "LlakaScript" : "Admin de panel de ordenes"}
// // // // // // // // // // // // // //                   initial={{ opacity: 0, x: -10 }}
// // // // // // // // // // // // // //                   animate={{ opacity: 1, x: 0 }}
// // // // // // // // // // // // // //                   exit={{ opacity: 0, x: 10 }}
// // // // // // // // // // // // // //                   transition={{ duration: 0.3 }}
// // // // // // // // // // // // // //                   style={{
// // // // // // // // // // // // // //                     position: "absolute",
// // // // // // // // // // // // // //                     left: 0,
// // // // // // // // // // // // // //                     whiteSpace: "nowrap",
// // // // // // // // // // // // // //                   }}
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   <Typography
// // // // // // // // // // // // // //                     variant={isMobile ? "subtitle1" : "h6"}
// // // // // // // // // // // // // //                     sx={{
// // // // // // // // // // // // // //                       fontWeight: 600,
// // // // // // // // // // // // // //                       lineHeight: 1.1,
// // // // // // // // // // // // // //                       fontSize: isMobile ? "1rem" : undefined,
// // // // // // // // // // // // // //                     }}
// // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // //                     {displayTitle ? "LlakaScript" : "Admin Panel de Órdenes"}
// // // // // // // // // // // // // //                   </Typography>
// // // // // // // // // // // // // //                 </motion.div>
// // // // // // // // // // // // // //               </AnimatePresence>
// // // // // // // // // // // // // //             </Box>
// // // // // // // // // // // // // //           </Box>

// // // // // // // // // // // // // //           {/* Right side controls */}
// // // // // // // // // // // // // //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// // // // // // // // // // // // // //             {/* Connection status indicator */}
// // // // // // // // // // // // // //             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
// // // // // // // // // // // // // //               <Box
// // // // // // // // // // // // // //                 sx={{
// // // // // // // // // // // // // //                   width: 10,
// // // // // // // // // // // // // //                   height: 10,
// // // // // // // // // // // // // //                   borderRadius: '50%',
// // // // // // // // // // // // // //                   bgcolor: isConnected ? 'success.main' : 'error.main',
// // // // // // // // // // // // // //                   mr: 1,
// // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // //               />
// // // // // // // // // // // // // //             </Tooltip>

// // // // // // // // // // // // // //             {/* Order count badge */}
// // // // // // // // // // // // // //             {isMobile && totalOrders > 0 && (
// // // // // // // // // // // // // //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// // // // // // // // // // // // // //                 <Box sx={{ width: 4, height: 4 }} />
// // // // // // // // // // // // // //               </Badge>
// // // // // // // // // // // // // //             )}

// // // // // // // // // // // // // //             {/* Last refresh time */}
// // // // // // // // // // // // // //             {lastRefresh && !isMobile && (
// // // // // // // // // // // // // //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// // // // // // // // // // // // // //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// // // // // // // // // // // // // //               </Typography>
// // // // // // // // // // // // // //             )}

// // // // // // // // // // // // // //             {/* Refresh button */}
// // // // // // // // // // // // // //             <Tooltip title="Actualizar">
// // // // // // // // // // // // // //               <IconButton
// // // // // // // // // // // // // //                 color="primary"
// // // // // // // // // // // // // //                 size="small"
// // // // // // // // // // // // // //                 onClick={fetchHistoricalOrders}
// // // // // // // // // // // // // //                 disabled={isLoading || isUpdating}
// // // // // // // // // // // // // //               >
// // // // // // // // // // // // // //                 <RefreshIcon fontSize="small" />
// // // // // // // // // // // // // //               </IconButton>
// // // // // // // // // // // // // //             </Tooltip>

// // // // // // // // // // // // // //             {/* View mode toggle (mobile only) */}
// // // // // // // // // // // // // //             {isMobile && (
// // // // // // // // // // // // // //               <Tooltip title={viewMode === "column" ? "Vista lista" : "Vista columnas"}>
// // // // // // // // // // // // // //                 <IconButton size="small" onClick={toggleViewMode} color="default">
// // // // // // // // // // // // // //                   {viewMode === "column" ? <ViewListIcon fontSize="small" /> : <ViewColumnIcon fontSize="small" />}
// // // // // // // // // // // // // //                 </IconButton>
// // // // // // // // // // // // // //               </Tooltip>
// // // // // // // // // // // // // //             )}

// // // // // // // // // // // // // //             {/* Header collapse toggle (mobile only) */}
// // // // // // // // // // // // // //             {isMobile && (
// // // // // // // // // // // // // //               <IconButton size="small" onClick={toggleHeader}>
// // // // // // // // // // // // // //                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
// // // // // // // // // // // // // //               </IconButton>
// // // // // // // // // // // // // //             )}
// // // // // // // // // // // // // //             <Tooltip title="Salir">
// // // // // // // // // // // // // //               <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // // // // // // // // // // // // //                 <IconButton
// // // // // // // // // // // // // //                   size="small"
// // // // // // // // // // // // // //                   onClick={handleLogout}
// // // // // // // // // // // // // //                   color="default"
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   <LogoutIcon fontSize="small" />
// // // // // // // // // // // // // //                 </IconButton>
// // // // // // // // // // // // // //               </motion.div>
// // // // // // // // // // // // // //             </Tooltip>
// // // // // // // // // // // // // //           </Box>
// // // // // // // // // // // // // //         </Toolbar>
// // // // // // // // // // // // // //       </AppBar>

// // // // // // // // // // // // // //       {/* Main content */}
// // // // // // // // // // // // // //       <Box
// // // // // // // // // // // // // //         sx={{
// // // // // // // // // // // // // //           p: { xs: 0.5, sm: 2 },
// // // // // // // // // // // // // //           flex: 1,
// // // // // // // // // // // // // //           overflow: "hidden",
// // // // // // // // // // // // // //           display: "flex",
// // // // // // // // // // // // // //           flexDirection: "column",
// // // // // // // // // // // // // //         }}
// // // // // // // // // // // // // //       >
// // // // // // // // // // // // // //         <Paper
// // // // // // // // // // // // // //           elevation={isMobile ? 1 : 3}
// // // // // // // // // // // // // //           sx={{
// // // // // // // // // // // // // //             height: "100%",
// // // // // // // // // // // // // //             display: "flex",
// // // // // // // // // // // // // //             flexDirection: "column",
// // // // // // // // // // // // // //             overflow: "hidden",
// // // // // // // // // // // // // //             borderRadius: { xs: 1, sm: 2 },
// // // // // // // // // // // // // //           }}
// // // // // // // // // // // // // //         >
// // // // // // // // // // // // // //           {/* Status header - collapsible on mobile */}
// // // // // // // // // // // // // //           <Box
// // // // // // // // // // // // // //             sx={{
// // // // // // // // // // // // // //               display: "flex",
// // // // // // // // // // // // // //               flexDirection: "column",
// // // // // // // // // // // // // //               borderBottom: 1,
// // // // // // // // // // // // // //               borderColor: "divider",
// // // // // // // // // // // // // //               transition: "all 0.3s ease",
// // // // // // // // // // // // // //               maxHeight: headerCollapsed ? "0px" : "200px",
// // // // // // // // // // // // // //               overflow: "hidden",
// // // // // // // // // // // // // //             }}
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             {/* Status chips */}
// // // // // // // // // // // // // //             <Box
// // // // // // // // // // // // // //               sx={{
// // // // // // // // // // // // // //                 display: "flex",
// // // // // // // // // // // // // //                 gap: 1,
// // // // // // // // // // // // // //                 flexWrap: "wrap",
// // // // // // // // // // // // // //                 p: { xs: 1, sm: 2 },
// // // // // // // // // // // // // //                 justifyContent: "center",
// // // // // // // // // // // // // //               }}
// // // // // // // // // // // // // //             >
// // // // // // // // // // // // // //               <Chip size="small" color="default" label={`${totalOrders} órdenes`} variant="outlined" />

// // // // // // // // // // // // // //               {pendingCount > 0 && (
// // // // // // // // // // // // // //                 <Chip size="small" color="warning" label={`${pendingCount} pendientes`} variant="outlined" />
// // // // // // // // // // // // // //               )}

// // // // // // // // // // // // // //               {processingCount > 0 && (
// // // // // // // // // // // // // //                 <Chip size="small" color="info" label={`${processingCount} en proceso`} variant="outlined" />
// // // // // // // // // // // // // //               )}

// // // // // // // // // // // // // //               {completedCount > 0 && (
// // // // // // // // // // // // // //                 <Chip size="small" color="success" label={`${completedCount} completadas`} variant="outlined" />
// // // // // // // // // // // // // //               )}

// // // // // // // // // // // // // //               <Chip
// // // // // // // // // // // // // //                 size="small"
// // // // // // // // // // // // // //                 color="warning"
// // // // // // // // // // // // // //                 label={`Actualizar Ordene Viejas`}
// // // // // // // // // // // // // //                 variant="outlined"
// // // // // // // // // // // // // //                 icon={<UpdateIcon />}
// // // // // // // // // // // // // //                 onClick={() => setOpenPendingDialog(true)}
// // // // // // // // // // // // // //               />

// // // // // // // // // // // // // //               <PendingOrdersDialog
// // // // // // // // // // // // // //                 open={openPendingDialog}
// // // // // // // // // // // // // //                 onClose={() => setOpenPendingDialog(false)}
// // // // // // // // // // // // // //               />
// // // // // // // // // // // // // //             </Box>

// // // // // // // // // // // // // //             {/* Status indicators */}
// // // // // // // // // // // // // //             {(isLoading || isUpdating) && (
// // // // // // // // // // // // // //               <Box
// // // // // // // // // // // // // //                 sx={{
// // // // // // // // // // // // // //                   display: "flex",
// // // // // // // // // // // // // //                   alignItems: "center",
// // // // // // // // // // // // // //                   gap: 1,
// // // // // // // // // // // // // //                   p: 1,
// // // // // // // // // // // // // //                   mx: { xs: 1, sm: 2 },
// // // // // // // // // // // // // //                   mb: { xs: 1, sm: 2 },
// // // // // // // // // // // // // //                   backgroundColor: "action.hover",
// // // // // // // // // // // // // //                   borderRadius: 1,
// // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // //               >
// // // // // // // // // // // // // //                 <CircularProgress size={16} />
// // // // // // // // // // // // // //                 <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// // // // // // // // // // // // // //                   {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// // // // // // // // // // // // // //                 </Typography>
// // // // // // // // // // // // // //               </Box>
// // // // // // // // // // // // // //             )}
// // // // // // // // // // // // // //           </Box>

// // // // // // // // // // // // // //           {/* Error messages */}
// // // // // // // // // // // // // //           <Box
// // // // // // // // // // // // // //             sx={{
// // // // // // // // // // // // // //               px: { xs: 1, sm: 2 },
// // // // // // // // // // // // // //               pt: { xs: 1, sm: 1 },
// // // // // // // // // // // // // //               overflow: "auto",
// // // // // // // // // // // // // //               flexShrink: 0,
// // // // // // // // // // // // // //             }}
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             {/* {error && (
// // // // // // // // // // // // // //               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
// // // // // // // // // // // // // //                 <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 1 }}>
// // // // // // // // // // // // // //                   {error}
// // // // // // // // // // // // // //                 </Alert>
// // // // // // // // // // // // // //               </motion.div>
// // // // // // // // // // // // // //             )} */}
// // // // // // // // // // // // // //           </Box>

// // // // // // // // // // // // // //           {/* Main content area */}
// // // // // // // // // // // // // //           <Box sx={{ p: 3, flex: 1, overflow: 'auto' }}>
// // // // // // // // // // // // // //             {/* Panel de creación de órdenes */}
// // // // // // // // // // // // // //             <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
// // // // // // // // // // // // // //               <Typography variant="h5" gutterBottom>
// // // // // // // // // // // // // //                 Crear Nueva Orden
// // // // // // // // // // // // // //               </Typography>

// // // // // // // // // // // // // //               <Grid container spacing={2}>
// // // // // // // // // // // // // //                 <Grid item xs={12} md={6}>
// // // // // // // // // // // // // //                   <TextField
// // // // // // // // // // // // // //                     fullWidth
// // // // // // // // // // // // // //                     label="Nombre del Cliente"
// // // // // // // // // // // // // //                     value={newOrderForm.fullname}
// // // // // // // // // // // // // //                     onChange={(e) => setNewOrderForm({ ...newOrderForm, fullname: e.target.value })}
// // // // // // // // // // // // // //                     margin="normal"
// // // // // // // // // // // // // //                     required
// // // // // // // // // // // // // //                   />

// // // // // // // // // // // // // //                   <TextField
// // // // // // // // // // // // // //                     select
// // // // // // // // // // // // // //                     fullWidth
// // // // // // // // // // // // // //                     label="Tipo de Orden"
// // // // // // // // // // // // // //                     value={newOrderForm.orderType}
// // // // // // // // // // // // // //                     onChange={(e) => setNewOrderForm({ ...newOrderForm, orderType: e.target.value as any })}
// // // // // // // // // // // // // //                     margin="normal"
// // // // // // // // // // // // // //                     SelectProps={{
// // // // // // // // // // // // // //                       native: true,
// // // // // // // // // // // // // //                     }}
// // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // //                     <option value="delivery">Delivery</option>
// // // // // // // // // // // // // //                     <option value="pickup">Recoger</option>
// // // // // // // // // // // // // //                     <option value="dine-in">Comer aquí</option>
// // // // // // // // // // // // // //                   </TextField>
// // // // // // // // // // // // // //                 </Grid>

// // // // // // // // // // // // // //                 <Grid item xs={12} md={6}>
// // // // // // // // // // // // // //                   <Typography variant="subtitle1" gutterBottom>
// // // // // // // // // // // // // //                     Ítems del Pedido
// // // // // // // // // // // // // //                   </Typography>

// // // // // // // // // // // // // //                   {newOrderForm.cart.map((item: any, index: any) => (
// // // // // // // // // // // // // //                     <Box key={item.id} display="flex" gap={2} mb={2}>
// // // // // // // // // // // // // //                       <TextField
// // // // // // // // // // // // // //                         fullWidth
// // // // // // // // // // // // // //                         label="Nombre"
// // // // // // // // // // // // // //                         value={item.name}
// // // // // // // // // // // // // //                         onChange={(e) => {
// // // // // // // // // // // // // //                           const newCart = [...newOrderForm.cart];
// // // // // // // // // // // // // //                           newCart[index].name = e.target.value;
// // // // // // // // // // // // // //                           setNewOrderForm({ ...newOrderForm, cart: newCart });
// // // // // // // // // // // // // //                         }}
// // // // // // // // // // // // // //                         size="small"
// // // // // // // // // // // // // //                         required
// // // // // // // // // // // // // //                       />

// // // // // // // // // // // // // //                       <TextField
// // // // // // // // // // // // // //                         label="Precio"
// // // // // // // // // // // // // //                         type="number"
// // // // // // // // // // // // // //                         value={item.price}
// // // // // // // // // // // // // //                         onChange={(e) => {
// // // // // // // // // // // // // //                           const newCart = [...newOrderForm.cart];
// // // // // // // // // // // // // //                           newCart[index].price = Number(e.target.value);
// // // // // // // // // // // // // //                           setNewOrderForm({ ...newOrderForm, cart: newCart });
// // // // // // // // // // // // // //                         }}
// // // // // // // // // // // // // //                         size="small"
// // // // // // // // // // // // // //                         sx={{ width: 100 }}
// // // // // // // // // // // // // //                       />

// // // // // // // // // // // // // //                       <TextField
// // // // // // // // // // // // // //                         label="Cantidad"
// // // // // // // // // // // // // //                         type="number"
// // // // // // // // // // // // // //                         value={item.quantity}
// // // // // // // // // // // // // //                         onChange={(e) => {
// // // // // // // // // // // // // //                           const newCart = [...newOrderForm.cart];
// // // // // // // // // // // // // //                           newCart[index].quantity = Number(e.target.value);
// // // // // // // // // // // // // //                           setNewOrderForm({ ...newOrderForm, cart: newCart });
// // // // // // // // // // // // // //                         }}
// // // // // // // // // // // // // //                         size="small"
// // // // // // // // // // // // // //                         sx={{ width: 100 }}
// // // // // // // // // // // // // //                       />
// // // // // // // // // // // // // //                     </Box>
// // // // // // // // // // // // // //                   ))}

// // // // // // // // // // // // // //                   <Button
// // // // // // // // // // // // // //                     startIcon={<AddIcon />}
// // // // // // // // // // // // // //                     onClick={addCartItem}
// // // // // // // // // // // // // //                     variant="outlined"
// // // // // // // // // // // // // //                     size="small"
// // // // // // // // // // // // // //                     sx={{ mr: 2 }}
// // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // //                     Agregar Ítem
// // // // // // // // // // // // // //                   </Button>

// // // // // // // // // // // // // //                   <Button
// // // // // // // // // // // // // //                     variant="contained"
// // // // // // // // // // // // // //                     onClick={handleCreateOrder}
// // // // // // // // // // // // // //                     disabled={isUpdating}
// // // // // // // // // // // // // //                     startIcon={isUpdating ? <CircularProgress size={20} /> : null}
// // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // //                     Crear Orden
// // // // // // // // // // // // // //                   </Button>
// // // // // // // // // // // // // //                 </Grid>

// // // // // // // // // // // // // //                 <Grid item xs={12}>
// // // // // // // // // // // // // //                   <Button
// // // // // // // // // // // // // //                     variant="outlined"
// // // // // // // // // // // // // //                     onClick={handleCreateTestOrder}
// // // // // // // // // // // // // //                     disabled={isUpdating}
// // // // // // // // // // // // // //                     fullWidth
// // // // // // // // // // // // // //                     startIcon={<PlayIcon />}
// // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // //                     Crear Orden Aleatoria (Para pruebas)
// // // // // // // // // // // // // //                   </Button>
// // // // // // // // // // // // // //                 </Grid>
// // // // // // // // // // // // // //               </Grid>
// // // // // // // // // // // // // //             </Paper>

// // // // // // // // // // // // // //             {/* Panel de órdenes por estado */}
// // // // // // // // // // // // // //             <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
// // // // // // // // // // // // // //               <Typography variant="h5" gutterBottom>
// // // // // // // // // // // // // //                 Órdenes por Estado
// // // // // // // // // // // // // //               </Typography>

// // // // // // // // // // // // // //               <Grid container spacing={2}>
// // // // // // // // // // // // // //                 {Object.entries(ordersByStatus).map(([status, orders]) => {
// // // // // // // // // // // // // //                   const statusConfig: any = {
// // // // // // // // // // // // // //                       pending: {icon: <PlayIcon color="disabled" />, color: 'grey.500', actions: ['start'] },
// // // // // // // // // // // // // //                     processing: {icon: <PlayIcon color="primary" />, color: 'primary.main', actions: ['pause', 'complete'] },
// // // // // // // // // // // // // //                     paused: {icon: <PauseCircleIcon color="warning" />, color: 'warning.main', actions: ['resume', 'complete'] },
// // // // // // // // // // // // // //                     finished: {icon: <CheckCircleIcon color="success" />, color: 'success.main', actions: ['deliver'] },
// // // // // // // // // // // // // //                     cancelled: {icon: <CancelIcon color="error" />, color: 'error.main', actions: ['reopen'] },
// // // // // // // // // // // // // //                     delivered: {icon: <DeliveryIcon color="success" />, color: 'success.dark', actions: [] }
// // // // // // // // // // // // // //                   }[status];

// // // // // // // // // // // // // //                     return (
// // // // // // // // // // // // // //                     <Grid item xs={12} sm={6} md={4} key={status}>
// // // // // // // // // // // // // //                       <Card sx={{ borderTop: `4px solid`, borderColor: statusConfig.color }}>
// // // // // // // // // // // // // //                         <CardContent>
// // // // // // // // // // // // // //                           <Box display="flex" alignItems="center" gap={1} mb={2}>
// // // // // // // // // // // // // //                             {statusConfig.icon}
// // // // // // // // // // // // // //                             <Typography variant="h6">
// // // // // // // // // // // // // //                               {status.toUpperCase()} ({orders.length})
// // // // // // // // // // // // // //                             </Typography>
// // // // // // // // // // // // // //                           </Box>

// // // // // // // // // // // // // //                           {orders.length > 0 ? (
// // // // // // // // // // // // // //                             <>
// // // // // // // // // // // // // //                               {statusConfig?.actions?.map((action: any) => (
// // // // // // // // // // // // // //                                 <div>
// // // // // // // // // // // // // //                                   {orders[0]._id} <br />
// // // // // // // // // // // // // //                                   {orders[0].id}
// // // // // // // // // // // // // //                                   <Button
// // // // // // // // // // // // // //                                     key={action}
// // // // // // // // // // // // // //                                     size="small"
// // // // // // // // // // // // // //                                     variant="outlined"
// // // // // // // // // // // // // //                                     onClick={() => handleOrderAction(action, orders[0])}
// // // // // // // // // // // // // //                                     disabled={isUpdating}
// // // // // // // // // // // // // //                                     fullWidth
// // // // // // // // // // // // // //                                     sx={{ mb: 1 }}
// // // // // // // // // // // // // //                                   >
// // // // // // // // // // // // // //                                     {action === 'start' && 'Iniciar'}
// // // // // // // // // // // // // //                                     {action === 'pause' && 'Pausar'}
// // // // // // // // // // // // // //                                     {action === 'resume' && 'Reanudar'}
// // // // // // // // // // // // // //                                     {action === 'complete' && 'Completar'}
// // // // // // // // // // // // // //                                     {action === 'deliver' && 'Marcar como Entregada'}
// // // // // // // // // // // // // //                                     {action === 'reopen' && 'Reabrir'}
// // // // // // // // // // // // // //                                   </Button>
// // // // // // // // // // // // // //                                 </div>

// // // // // // // // // // // // // //                               ))}

// // // // // // // // // // // // // //                               <Button
// // // // // // // // // // // // // //                                 size="small"
// // // // // // // // // // // // // //                                 variant="outlined"
// // // // // // // // // // // // // //                                 color="error"
// // // // // // // // // // // // // //                                 onClick={() => handleOrderAction('cancel', orders[0])}
// // // // // // // // // // // // // //                                 disabled={isUpdating || status === 'cancelled'}
// // // // // // // // // // // // // //                                 fullWidth
// // // // // // // // // // // // // //                               >
// // // // // // // // // // // // // //                                 Cancelar
// // // // // // // // // // // // // //                               </Button>
// // // // // // // // // // // // // //                             </>
// // // // // // // // // // // // // //                           ) : (
// // // // // // // // // // // // // //                             <Typography variant="body2" color="text.secondary">
// // // // // // // // // // // // // //                               No hay órdenes en este estado
// // // // // // // // // // // // // //                             </Typography>
// // // // // // // // // // // // // //                           )}
// // // // // // // // // // // // // //                         </CardContent>
// // // // // // // // // // // // // //                       </Card>
// // // // // // // // // // // // // //                     </Grid>
// // // // // // // // // // // // // //                     );
// // // // // // // // // // // // // //                 })}
// // // // // // // // // // // // // //               </Grid>
// // // // // // // // // // // // // //             </Paper>

// // // // // // // // // // // // // //             {/* Lista completa de órdenes */}
// // // // // // // // // // // // // //             <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
// // // // // // // // // // // // // //               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// // // // // // // // // // // // // //                 <Typography variant="h5">
// // // // // // // // // // // // // //                   Todas las Órdenes ({sortedOrders.length})
// // // // // // // // // // // // // //                 </Typography>
// // // // // // // // // // // // // //                 <Chip
// // // // // // // // // // // // // //                   label="Tiempo Real"
// // // // // // // // // // // // // //                   color="primary"
// // // // // // // // // // // // // //                   variant="outlined"
// // // // // // // // // // // // // //                   icon={<PlayIcon fontSize="small" />}
// // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // //               </Box>

// // // // // // // // // // // // // //               <Box sx={{ height: 400, width: '100%', mb: 2 }}>
// // // // // // // // // // // // // //                 <FixedSizeList
// // // // // // // // // // // // // //                   height={400}
// // // // // // // // // // // // // //                   width="100%"
// // // // // // // // // // // // // //                   itemSize={70}
// // // // // // // // // // // // // //                   itemCount={sortedOrders.length}
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   {renderRow}
// // // // // // // // // // // // // //                 </FixedSizeList>
// // // // // // // // // // // // // //               </Box>

// // // // // // // // // // // // // //               {sortedOrders.map(order => (
// // // // // // // // // // // // // //                 <Collapse in={expandedOrder === order._id} key={`details-${order._id}`}>
// // // // // // // // // // // // // //                   <Card sx={{
// // // // // // // // // // // // // //                     mt: 1, mb: 2, borderLeft: `4px solid`, borderColor: {
// // // // // // // // // // // // // //                       pending: 'grey.500',
// // // // // // // // // // // // // //                       processing: 'primary.main',
// // // // // // // // // // // // // //                       paused: 'warning.main',
// // // // // // // // // // // // // //                       finished: 'success.main',
// // // // // // // // // // // // // //                       cancelled: 'error.main',
// // // // // // // // // // // // // //                       delivered: 'success.dark'
// // // // // // // // // // // // // //                     }[order.status]
// // // // // // // // // // // // // //                   }}>
// // // // // // // // // // // // // //                     <CardContent>
// // // // // // // // // // // // // //                       <Typography variant="h6" gutterBottom>
// // // // // // // // // // // // // //                         Detalles de Orden #{order.id || order._id.slice(-4)}
// // // // // // // // // // // // // //                       </Typography>

// // // // // // // // // // // // // //                       <Grid container spacing={2}>
// // // // // // // // // // // // // //                         <Grid item xs={12} md={6}>
// // // // // // // // // // // // // //                           <Typography><strong>Cliente:</strong> {order.fullname}</Typography>
// // // // // // // // // // // // // //                           <Typography><strong>Tipo:</strong> {order.orderType}</Typography>
// // // // // // // // // // // // // //                           <Typography><strong>Estado:</strong> {order.status}</Typography>
// // // // // // // // // // // // // //                           <Typography><strong>Fecha:</strong> {new Date(order.createdAt || order.timestamp || '').toLocaleString()}</Typography>
// // // // // // // // // // // // // //                           {order.comments && (
// // // // // // // // // // // // // //                             <Typography><strong>Comentarios:</strong> {order.comments}</Typography>
// // // // // // // // // // // // // //                           )}
// // // // // // // // // // // // // //                         </Grid>

// // // // // // // // // // // // // //                         <Grid item xs={12} md={6}>
// // // // // // // // // // // // // //                           <Typography variant="subtitle1" gutterBottom>
// // // // // // // // // // // // // //                             <strong>Productos:</strong>
// // // // // // // // // // // // // //                           </Typography>
// // // // // // // // // // // // // //                           <List dense>
// // // // // // // // // // // // // //                             {order.cart.map((item, index) => (
// // // // // // // // // // // // // //                               <ListItem key={index} sx={{ py: 0 }}>
// // // // // // // // // // // // // //                                 <ListItemText
// // // // // // // // // // // // // //                                   primary={`${item.quantity}x ${item.name}`}
// // // // // // // // // // // // // //                                   secondary={`$${item.price} c/u - Total: $${(item.price * item.quantity).toFixed(2)}`}
// // // // // // // // // // // // // //                                 />
// // // // // // // // // // // // // //                               </ListItem>
// // // // // // // // // // // // // //                             ))}
// // // // // // // // // // // // // //                           </List>
// // // // // // // // // // // // // //                         </Grid>
// // // // // // // // // // // // // //                       </Grid>
// // // // // // // // // // // // // //                     </CardContent>
// // // // // // // // // // // // // //                     <CardActions sx={{ justifyContent: 'flex-end' }}>
// // // // // // // // // // // // // //                       <Button
// // // // // // // // // // // // // //                         size="small"
// // // // // // // // // // // // // //                         startIcon={<EditIcon />}
// // // // // // // // // // // // // //                         onClick={() => {
// // // // // // // // // // // // // //                           const newNote = prompt('Agregar nota:', order.comments || '');
// // // // // // // // // // // // // //                           if (newNote !== null) {
// // // // // // // // // // // // // //                             updateOrder(order._id, { comments: newNote });
// // // // // // // // // // // // // //                           }
// // // // // // // // // // // // // //                         }}
// // // // // // // // // // // // // //                         disabled={isUpdating}
// // // // // // // // // // // // // //                       >
// // // // // // // // // // // // // //                         Editar Nota
// // // // // // // // // // // // // //                       </Button>

// // // // // // // // // // // // // //                       {order.status === 'processing' && (
// // // // // // // // // // // // // //                         <Button
// // // // // // // // // // // // // //                           size="small"
// // // // // // // // // // // // // //                           color="warning"
// // // // // // // // // // // // // //                           startIcon={<PauseCircleIcon />}
// // // // // // // // // // // // // //                           onClick={() => handleOrderAction('pause', order)}
// // // // // // // // // // // // // //                           disabled={isUpdating}
// // // // // // // // // // // // // //                         >
// // // // // // // // // // // // // //                           Pausar
// // // // // // // // // // // // // //                         </Button>
// // // // // // // // // // // // // //                       )}

// // // // // // // // // // // // // //                       {order.status === 'paused' && (
// // // // // // // // // // // // // //                         <Button
// // // // // // // // // // // // // //                           size="small"
// // // // // // // // // // // // // //                           color="primary"
// // // // // // // // // // // // // //                           startIcon={<PlayIcon />}
// // // // // // // // // // // // // //                           onClick={() => handleOrderAction('resume', order)}
// // // // // // // // // // // // // //                           disabled={isUpdating}
// // // // // // // // // // // // // //                         >
// // // // // // // // // // // // // //                           Reanudar
// // // // // // // // // // // // // //                         </Button>
// // // // // // // // // // // // // //                       )}

// // // // // // // // // // // // // //                       {['pending', 'processing', 'paused'].includes(order.status) && (
// // // // // // // // // // // // // //                         <Button
// // // // // // // // // // // // // //                           size="small"
// // // // // // // // // // // // // //                           color="success"
// // // // // // // // // // // // // //                           startIcon={<CheckCircleIcon />}
// // // // // // // // // // // // // //                           onClick={() => handleOrderAction('complete', order)}
// // // // // // // // // // // // // //                           disabled={isUpdating}
// // // // // // // // // // // // // //                         >
// // // // // // // // // // // // // //                           Completar
// // // // // // // // // // // // // //                         </Button>
// // // // // // // // // // // // // //                       )}

// // // // // // // // // // // // // //                       {order.status === 'finished' && (
// // // // // // // // // // // // // //                         <Button
// // // // // // // // // // // // // //                           size="small"
// // // // // // // // // // // // // //                           color="success"
// // // // // // // // // // // // // //                           startIcon={<DeliveryIcon />}
// // // // // // // // // // // // // //                           onClick={() => handleOrderAction('deliver', order)}
// // // // // // // // // // // // // //                           disabled={isUpdating}
// // // // // // // // // // // // // //                         >
// // // // // // // // // // // // // //                           Entregar
// // // // // // // // // // // // // //                         </Button>
// // // // // // // // // // // // // //                       )}

// // // // // // // // // // // // // //                       {order.status !== 'cancelled' && (
// // // // // // // // // // // // // //                         <Button
// // // // // // // // // // // // // //                           size="small"
// // // // // // // // // // // // // //                           color="error"
// // // // // // // // // // // // // //                           startIcon={<CancelIcon />}
// // // // // // // // // // // // // //                           onClick={() => handleOrderAction('cancel', order)}
// // // // // // // // // // // // // //                           disabled={isUpdating}
// // // // // // // // // // // // // //                         >
// // // // // // // // // // // // // //                           Cancelar
// // // // // // // // // // // // // //                         </Button>
// // // // // // // // // // // // // //                       )}

// // // // // // // // // // // // // //                       {order.status === 'cancelled' && (
// // // // // // // // // // // // // //                         <Button
// // // // // // // // // // // // // //                           size="small"
// // // // // // // // // // // // // //                           color="primary"
// // // // // // // // // // // // // //                           startIcon={<PlayIcon />}
// // // // // // // // // // // // // //                           onClick={() => handleOrderAction('reopen', order)}
// // // // // // // // // // // // // //                           disabled={isUpdating}
// // // // // // // // // // // // // //                         >
// // // // // // // // // // // // // //                           Reabrir
// // // // // // // // // // // // // //                         </Button>
// // // // // // // // // // // // // //                       )}

// // // // // // // // // // // // // //                       <Button
// // // // // // // // // // // // // //                         size="small"
// // // // // // // // // // // // // //                         color="error"
// // // // // // // // // // // // // //                         startIcon={<DeleteIcon />}
// // // // // // // // // // // // // //                         onClick={() => {
// // // // // // // // // // // // // //                           if (window.confirm('¿Estás seguro de eliminar esta orden?')) {
// // // // // // // // // // // // // //                             deleteOrder(order._id);
// // // // // // // // // // // // // //                           }
// // // // // // // // // // // // // //                         }}
// // // // // // // // // // // // // //                         disabled={isUpdating}
// // // // // // // // // // // // // //                       >
// // // // // // // // // // // // // //                         Eliminar
// // // // // // // // // // // // // //                       </Button>
// // // // // // // // // // // // // //                     </CardActions>
// // // // // // // // // // // // // //                   </Card>
// // // // // // // // // // // // // //                 </Collapse>
// // // // // // // // // // // // // //               ))}
// // // // // // // // // // // // // //             </Paper>

// // // // // // // // // // // // // //             {/* Panel de chat y logs */}
// // // // // // // // // // // // // //             <Grid container spacing={3}>
// // // // // // // // // // // // // //               <Grid item xs={12} md={6}>
// // // // // // // // // // // // // //                 <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
// // // // // // // // // // // // // //                   <Typography variant="h5" gutterBottom>
// // // // // // // // // // // // // //                     Chat en Tiempo Real
// // // // // // // // // // // // // //                   </Typography>

// // // // // // // // // // // // // //                   <Box sx={{ height: 300, overflowY: 'auto', mb: 2, p: 1, bgcolor: 'background.default' }}>
// // // // // // // // // // // // // //                     {messages.slice().reverse().map((msg, index) => (
// // // // // // // // // // // // // //                       <Box key={msg.id || index} mb={2}>
// // // // // // // // // // // // // //                         <Typography variant="subtitle2" color="text.secondary">
// // // // // // // // // // // // // //                           {msg.name} - {new Date(msg.timestamp).toLocaleTimeString()}
// // // // // // // // // // // // // //                         </Typography>
// // // // // // // // // // // // // //                         <Typography
// // // // // // // // // // // // // //                           variant="body1"
// // // // // // // // // // // // // //                           sx={{
// // // // // // // // // // // // // //                             p: 1,
// // // // // // // // // // // // // //                             bgcolor: msg.isOrder ? 'action.selected' : 'background.paper',
// // // // // // // // // // // // // //                             borderRadius: 1
// // // // // // // // // // // // // //                           }}
// // // // // // // // // // // // // //                         >
// // // // // // // // // // // // // //                           {msg.message}
// // // // // // // // // // // // // //                         </Typography>
// // // // // // // // // // // // // //                         <Divider sx={{ my: 1 }} />
// // // // // // // // // // // // // //                       </Box>
// // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // //                   </Box>

// // // // // // // // // // // // // //                   <Grid container spacing={1}>
// // // // // // // // // // // // // //                     <Grid item xs={9}>
// // // // // // // // // // // // // //                       <TextField
// // // // // // // // // // // // // //                         fullWidth
// // // // // // // // // // // // // //                         value={newMessageText}
// // // // // // // // // // // // // //                         onChange={(e) => setNewMessageText(e.target.value)}
// // // // // // // // // // // // // //                         placeholder="Escribe un mensaje..."
// // // // // // // // // // // // // //                         onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// // // // // // // // // // // // // //                         size="small"
// // // // // // // // // // // // // //                       />
// // // // // // // // // // // // // //                     </Grid>
// // // // // // // // // // // // // //                     <Grid item xs={3}>
// // // // // // // // // // // // // //                       <Button
// // // // // // // // // // // // // //                         fullWidth
// // // // // // // // // // // // // //                         variant="contained"
// // // // // // // // // // // // // //                         onClick={handleSendMessage}
// // // // // // // // // // // // // //                         disabled={!newMessageText.trim()}
// // // // // // // // // // // // // //                       >
// // // // // // // // // // // // // //                         Enviar
// // // // // // // // // // // // // //                       </Button>
// // // // // // // // // // // // // //                     </Grid>
// // // // // // // // // // // // // //                   </Grid>
// // // // // // // // // // // // // //                 </Paper>
// // // // // // // // // // // // // //               </Grid>

// // // // // // // // // // // // // //               <Grid item xs={12} md={6}>
// // // // // // // // // // // // // //                 <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
// // // // // // // // // // // // // //                   <Typography variant="h5" gutterBottom>
// // // // // // // // // // // // // //                     Logs de Eventos
// // // // // // // // // // // // // //                   </Typography>
// // // // // // // // // // // // // //                   <List sx={{ height: 370, overflowY: 'auto', bgcolor: 'background.default' }}>
// // // // // // // // // // // // // //                     {socketMessages.slice().reverse().map((msg, index) => (
// // // // // // // // // // // // // //                       <ListItem key={index} sx={{ py: 0.5 }}>
// // // // // // // // // // // // // //                         <ListItemText
// // // // // // // // // // // // // //                           primary={
// // // // // // // // // // // // // //                             <Typography
// // // // // // // // // // // // // //                               variant="body2"
// // // // // // // // // // // // // //                               color={
// // // // // // // // // // // // // //                                 msg.event.includes('error') ? 'error' :
// // // // // // // // // // // // // //                                   msg.event.includes('connect') ? 'primary' :
// // // // // // // // // // // // // //                                     'text.primary'
// // // // // // // // // // // // // //                               }
// // // // // // // // // // // // // //                               sx={{ fontFamily: 'monospace' }}
// // // // // // // // // // // // // //                             >
// // // // // // // // // // // // // //                               {msg.event}
// // // // // // // // // // // // // //                             </Typography>
// // // // // // // // // // // // // //                           }
// // // // // // // // // // // // // //                           secondary={
// // // // // // // // // // // // // //                             <>
// // // // // // // // // // // // // //                               <Typography variant="caption" color="text.secondary">
// // // // // // // // // // // // // //                                 {new Date(msg.timestamp).toLocaleTimeString()}
// // // // // // // // // // // // // //                               </Typography>
// // // // // // // // // // // // // //                               <Typography variant="caption" display="block" sx={{ wordBreak: 'break-all' }}>
// // // // // // // // // // // // // //                                 {JSON.stringify(msg.data)}
// // // // // // // // // // // // // //                               </Typography>
// // // // // // // // // // // // // //                             </>
// // // // // // // // // // // // // //                           }
// // // // // // // // // // // // // //                         />
// // // // // // // // // // // // // //                       </ListItem>
// // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // //                   </List>
// // // // // // // // // // // // // //                 </Paper>
// // // // // // // // // // // // // //               </Grid>
// // // // // // // // // // // // // //             </Grid>
// // // // // // // // // // // // // //           </Box>
// // // // // // // // // // // // // //         </Paper>
// // // // // // // // // // // // // //       </Box>

// // // // // // // // // // // // // //       {/* Success notification */}
// // // // // // // // // // // // // //       <Snackbar
// // // // // // // // // // // // // //         open={!!successMessage}
// // // // // // // // // // // // // //         autoHideDuration={3000}
// // // // // // // // // // // // // //         onClose={clearMessages}
// // // // // // // // // // // // // //         message={successMessage}
// // // // // // // // // // // // // //         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// // // // // // // // // // // // // //       />
// // // // // // // // // // // // // //     </Box>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export default OrderSpeedGeneric;

// // // // // // // // // // // // // // function setError(arg0: string) {
// // // // // // // // // // // // // //   throw new Error('Function not implemented.');
// // // // // // // // // // // // // // }







// // // // // // // // // // // // // import React, { useMemo, useState, useEffect } from 'react';
// // // // // // // // // // // // // import { useSelector } from 'react-redux';
// // // // // // // // // // // // // import { RootState } from "../../../store/store";
// // // // // // // // // // // // // import {
// // // // // // // // // // // // //   Box,
// // // // // // // // // // // // //   Button,
// // // // // // // // // // // // //   Chip,
// // // // // // // // // // // // //   CircularProgress,
// // // // // // // // // // // // //   Paper,
// // // // // // // // // // // // //   Typography,
// // // // // // // // // // // // //   Snackbar,
// // // // // // // // // // // // //   Alert,
// // // // // // // // // // // // //   Grid,
// // // // // // // // // // // // //   List,
// // // // // // // // // // // // //   ListItem,
// // // // // // // // // // // // //   ListItemText,
// // // // // // // // // // // // //   ListItemAvatar,
// // // // // // // // // // // // //   Avatar,
// // // // // // // // // // // // //   ListItemSecondaryAction,
// // // // // // // // // // // // //   IconButton,
// // // // // // // // // // // // //   Collapse,
// // // // // // // // // // // // //   Card,
// // // // // // // // // // // // //   CardContent,
// // // // // // // // // // // // //   CardActions,
// // // // // // // // // // // // //   Divider,
// // // // // // // // // // // // //   TextField,
// // // // // // // // // // // // //   Badge,
// // // // // // // // // // // // //   Tooltip,
// // // // // // // // // // // // //   AppBar,
// // // // // // // // // // // // //   Toolbar,
// // // // // // // // // // // // //   useMediaQuery,
// // // // // // // // // // // // //   useTheme,
// // // // // // // // // // // // //   Stack,
// // // // // // // // // // // // //   Accordion,
// // // // // // // // // // // // //   AccordionSummary,
// // // // // // // // // // // // //   AccordionDetails
// // // // // // // // // // // // // } from '@mui/material';
// // // // // // // // // // // // // import {
// // // // // // // // // // // // //   Delete as DeleteIcon,
// // // // // // // // // // // // //   Edit as EditIcon,
// // // // // // // // // // // // //   Refresh as RefreshIcon,
// // // // // // // // // // // // //   ExpandMore as ExpandMoreIcon,
// // // // // // // // // // // // //   ExpandLess as ExpandLessIcon,
// // // // // // // // // // // // //   CheckCircle as CheckCircleIcon,
// // // // // // // // // // // // //   PauseCircle as PauseCircleIcon,
// // // // // // // // // // // // //   Cancel as CancelIcon,
// // // // // // // // // // // // //   DeliveryDining as DeliveryIcon,
// // // // // // // // // // // // //   PlayCircle as PlayIcon,
// // // // // // // // // // // // //   Add as AddIcon,
// // // // // // // // // // // // //   Warning as WarningIcon,
// // // // // // // // // // // // //   Info as InfoIcon,
// // // // // // // // // // // // //   ViewList as ViewListIcon,
// // // // // // // // // // // // //   ViewColumn as ViewColumnIcon,
// // // // // // // // // // // // //   Logout as LogoutIcon,
// // // // // // // // // // // // //   Update as UpdateIcon,
// // // // // // // // // // // // //   AccessTime,
// // // // // // // // // // // // //   Person,
// // // // // // // // // // // // //   ShoppingCart,
// // // // // // // // // // // // //   LocalShipping,
// // // // // // // // // // // // //   Pending,
// // // // // // // // // // // // //   PlayArrow,
// // // // // // // // // // // // //   Pause,
// // // // // // // // // // // // //   LocalDining
// // // // // // // // // // // // // } from '@mui/icons-material';
// // // // // // // // // // // // // import { useOrdersManagementSocketApi } from '../../../hooks/useOrdersManagementSocketApi';
// // // // // // // // // // // // // import EditOrderModal from '../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal';

// // // // // // // // // // // // // // Configuración de estados
// // // // // // // // // // // // // const statusConfig = {
// // // // // // // // // // // // //   pending: {
// // // // // // // // // // // // //     color: "default",
// // // // // // // // // // // // //     icon: <Pending color="disabled" />,
// // // // // // // // // // // // //     actions: [
// // // // // // // // // // // // //       { action: 'start', label: 'Iniciar', color: 'primary', icon: <PlayArrow /> }
// // // // // // // // // // // // //     ]
// // // // // // // // // // // // //   },
// // // // // // // // // // // // //   processing: {
// // // // // // // // // // // // //     color: "primary",
// // // // // // // // // // // // //     icon: <PlayArrow color="primary" />,
// // // // // // // // // // // // //     actions: [
// // // // // // // // // // // // //       { action: 'pause', label: 'Pausar', color: 'warning', icon: <Pause /> },
// // // // // // // // // // // // //       { action: 'complete', label: 'Completar', color: 'success', icon: <CheckCircleIcon /> }
// // // // // // // // // // // // //     ]
// // // // // // // // // // // // //   },
// // // // // // // // // // // // //   paused: {
// // // // // // // // // // // // //     color: "warning",
// // // // // // // // // // // // //     icon: <Pause color="warning" />,
// // // // // // // // // // // // //     actions: [
// // // // // // // // // // // // //       { action: 'resume', label: 'Reanudar', color: 'primary', icon: <PlayArrow /> },
// // // // // // // // // // // // //       { action: 'complete', label: 'Completar', color: 'success', icon: <CheckCircleIcon /> }
// // // // // // // // // // // // //     ]
// // // // // // // // // // // // //   },
// // // // // // // // // // // // //   finished: {
// // // // // // // // // // // // //     color: "success",
// // // // // // // // // // // // //     icon: <CheckCircleIcon color="success" />,
// // // // // // // // // // // // //     actions: [
// // // // // // // // // // // // //       { action: 'deliver', label: 'Entregar', color: 'success', icon: <LocalShipping /> }
// // // // // // // // // // // // //     ]
// // // // // // // // // // // // //   },
// // // // // // // // // // // // //   cancelled: {
// // // // // // // // // // // // //     color: "error",
// // // // // // // // // // // // //     icon: <CancelIcon color="error" />,
// // // // // // // // // // // // //     actions: [
// // // // // // // // // // // // //       { action: 'reopen', label: 'Reabrir', color: 'primary', icon: <PlayArrow /> }
// // // // // // // // // // // // //     ]
// // // // // // // // // // // // //   },
// // // // // // // // // // // // //   delivered: {
// // // // // // // // // // // // //     color: "success",
// // // // // // // // // // // // //     icon: <LocalShipping color="success" />,
// // // // // // // // // // // // //     actions: []
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // const OrderSpeedGeneric = () => {
// // // // // // // // // // // // //   const theme = useTheme();
// // // // // // // // // // // // //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// // // // // // // // // // // // //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile);
// // // // // // // // // // // // //   const [displayTitle, setDisplayTitle] = useState(false);
// // // // // // // // // // // // //   const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column");
// // // // // // // // // // // // //   const [openPendingDialog, setOpenPendingDialog] = useState(false);

// // // // // // // // // // // // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any });
// // // // // // // // // // // // //   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } };

// // // // // // // // // // // // //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email");

// // // // // // // // // // // // //   const {
// // // // // // // // // // // // //     allOrders,
// // // // // // // // // // // // //     ordersByStatus,
// // // // // // // // // // // // //     isConnected,
// // // // // // // // // // // // //     isLoading,
// // // // // // // // // // // // //     isUpdating,
// // // // // // // // // // // // //     error,
// // // // // // // // // // // // //     successMessage,
// // // // // // // // // // // // //     lastRefresh,
// // // // // // // // // // // // //     messages,
// // // // // // // // // // // // //     fetchHistoricalOrders,
// // // // // // // // // // // // //     handleOrderAction,
// // // // // // // // // // // // //     updateOrder,
// // // // // // // // // // // // //     deleteOrder,
// // // // // // // // // // // // //     createOrder,
// // // // // // // // // // // // //     clearMessages
// // // // // // // // // // // // //   } = useOrdersManagementSocketApi({
// // // // // // // // // // // // //     companyName: data?.companyName || "LlakaScript",
// // // // // // // // // // // // //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// // // // // // // // // // // // //     orderLimit: 50
// // // // // // // // // // // // //   });

// // // // // // // // // // // // //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0);
// // // // // // // // // // // // //   const pendingCount = ordersByStatus.pending?.length || 0;
// // // // // // // // // // // // //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0);
// // // // // // // // // // // // //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0);

// // // // // // // // // // // // //   // Ordenar órdenes por fecha (más recientes primero)
// // // // // // // // // // // // //   const sortedOrders = useMemo(() => {
// // // // // // // // // // // // //     return [...allOrders].sort((a, b) => {
// // // // // // // // // // // // //       const dateA = new Date(a.createdAt || a.timestamp || 0);
// // // // // // // // // // // // //       const dateB = new Date(b.createdAt || b.timestamp || 0);
// // // // // // // // // // // // //       return dateB.getTime() - dateA.getTime();
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   }, [allOrders]);

// // // // // // // // // // // // //   // Componente para renderizar cada orden
// // // // // // // // // // // // //   const OrderCard = ({ order }: { order: any }) => {
// // // // // // // // // // // // //     const theme = useTheme();
// // // // // // // // // // // // //     const [open, setOpen] = useState(false);

// // // // // // // // // // // // //     const status = order.status;
// // // // // // // // // // // // //     const config = statusConfig[status as keyof typeof statusConfig];
// // // // // // // // // // // // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0);
// // // // // // // // // // // // //     const total = order.cart.reduce((sum: any, item: any) => {
// // // // // // // // // // // // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0;
// // // // // // // // // // // // //       return sum + item.price * item.quantity + extrasTotal;
// // // // // // // // // // // // //     }, 0);

// // // // // // // // // // // // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // // // // // // // // // //       hour: "2-digit",
// // // // // // // // // // // // //       minute: "2-digit",
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette];

// // // // // // // // // // // // //     const [isModalOpen, setIsModalOpen] = useState(false);

// // // // // // // // // // // // //     const handleOpenModal = () => {
// // // // // // // // // // // // //       setIsModalOpen(true);
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     const handleCloseModal = () => {
// // // // // // // // // // // // //       setIsModalOpen(false);
// // // // // // // // // // // // //     };



// // // // // // // // // // // // //     const saveUpdateData = async (updatedOrder: any) => {
// // // // // // // // // // // // //       try {
// // // // // // // // // // // // //         await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder);
// // // // // // // // // // // // //         // Optionally show success message
// // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // //         console.error("Failed to update order:", error);
// // // // // // // // // // // // //         // Optionally show error message
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //       <Card sx={{ borderLeft: '4px solid', borderColor: paletteColor?.main || 'grey' }} >
// // // // // // // // // // // // //         <CardContent>
// // // // // // // // // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
// // // // // // // // // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // // // // // // // // //               #{order.id || order._id.slice(-4)}
// // // // // // // // // // // // //             </Typography>
// // // // // // // // // // // // //             <Chip
// // // // // // // // // // // // //               size="small"
// // // // // // // // // // // // //               label={order.orderType}
// // // // // // // // // // // // //               color={config.color as any}
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //           </Box>

// // // // // // // // // // // // //           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
// // // // // // // // // // // // //             <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // // // // // // //             <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // // // // // // // // //               {order.fullname}
// // // // // // // // // // // // //             </Typography>
// // // // // // // // // // // // //             <Box sx={{ flexGrow: 1 }} />
// // // // // // // // // // // // //             <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // // // // // // //             <Typography variant="body2">{formattedTime}</Typography>
// // // // // // // // // // // // //           </Box>

// // // // // // // // // // // // //           <Divider sx={{ my: 1 }} />

// // // // // // // // // // // // //           <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
// // // // // // // // // // // // //             Items ({totalItems})
// // // // // // // // // // // // //           </Typography>

// // // // // // // // // // // // //           <List dense disablePadding>
// // // // // // // // // // // // //             {order.cart.map((item: any) => (
// // // // // // // // // // // // //               <ListItem key={item.id} disablePadding sx={{ py: 0.25 }}>
// // // // // // // // // // // // //                 <ListItemText
// // // // // // // // // // // // //                   primary={
// // // // // // // // // // // // //                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // // // // // // //                       <Typography variant="body2">
// // // // // // // // // // // // //                         <strong>{item.quantity}x</strong> {item.name}
// // // // // // // // // // // // //                       </Typography>
// // // // // // // // // // // // //                       <Typography variant="body2" sx={{ ml: 1 }}>
// // // // // // // // // // // // //                         ${item.price.toFixed(2)}
// // // // // // // // // // // // //                       </Typography>
// // // // // // // // // // // // //                     </Box>
// // // // // // // // // // // // //                   }
// // // // // // // // // // // // //                   secondary={
// // // // // // // // // // // // //                     item.extras?.length > 0 && (
// // // // // // // // // // // // //                       <List dense disablePadding sx={{ ml: 2 }}>
// // // // // // // // // // // // //                         {item.extras.map((extra: any, idx: number) => (
// // // // // // // // // // // // //                           <ListItem key={idx} disablePadding sx={{ py: 0 }}>
// // // // // // // // // // // // //                             <ListItemText
// // // // // // // // // // // // //                               primary={
// // // // // // // // // // // // //                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // // // // // // //                                   <Typography variant="caption">+ {extra.name}</Typography>
// // // // // // // // // // // // //                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // // // // // // // // // // //                                 </Box>
// // // // // // // // // // // // //                               }
// // // // // // // // // // // // //                             />
// // // // // // // // // // // // //                           </ListItem>
// // // // // // // // // // // // //                         ))}
// // // // // // // // // // // // //                       </List>
// // // // // // // // // // // // //                     )
// // // // // // // // // // // // //                   }
// // // // // // // // // // // // //                 />
// // // // // // // // // // // // //               </ListItem>
// // // // // // // // // // // // //             ))}
// // // // // // // // // // // // //           </List>

// // // // // // // // // // // // //           <Divider sx={{ my: 1 }} />

// // // // // // // // // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // // // // // // // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // // // // // // // // //               Total: ${total.toFixed(2)}
// // // // // // // // // // // // //             </Typography>

// // // // // // // // // // // // //             <Stack direction="row" spacing={1}>
// // // // // // // // // // // // //               {config.actions.map((action: any) => (
// // // // // // // // // // // // //                 <Button
// // // // // // // // // // // // //                   key={action.action}
// // // // // // // // // // // // //                   size="small"
// // // // // // // // // // // // //                   variant="contained"
// // // // // // // // // // // // //                   color={action.color as any}
// // // // // // // // // // // // //                   startIcon={action.icon}
// // // // // // // // // // // // //                   onClick={() => handleOrderAction(action.action, order)}
// // // // // // // // // // // // //                   disabled={isUpdating}
// // // // // // // // // // // // //                 >
// // // // // // // // // // // // //                   {action.label}
// // // // // // // // // // // // //                 </Button>
// // // // // // // // // // // // //               ))}

// // // // // // // // // // // // //             </Stack>
// // // // // // // // // // // // //             {/* 
// // // // // // // // // // // // //             <EditOrderModal
// // // // // // // // // // // // //               open={open}
// // // // // // // // // // // // //               order={order}
// // // // // // // // // // // // //               onSave={(updatedOrder) => {
// // // // // // // // // // // // //                 // Implementar lógica para guardar los cambios
// // // // // // // // // // // // //                 saveUpdateData(updatedOrder);
// // // // // // // // // // // // //                 // console.log("Orden actualizada:", updatedOrder);
// // // // // // // // // // // // //               }}
// // // // // // // // // // // // //               menuData={{
// // // // // // // // // // // // //                 mainMenu: hojas?.Hoja1 || [],
// // // // // // // // // // // // //                 promotions: hojas?.Promotion || []
// // // // // // // // // // // // //               }}
// // // // // // // // // // // // //               onClose={handleClose}

// // // // // // // // // // // // //             /> */}

// // // // // // // // // // // // //             {/* <Button
// // // // // // // // // // // // //               size="small"
// // // // // // // // // // // // //               variant="outlined"
// // // // // // // // // // // // //               color="primary"
// // // // // // // // // // // // //               startIcon={<EditIcon />}
// // // // // // // // // // // // //               onClick={handleClickOpen}
// // // // // // // // // // // // //               disabled={isUpdating}
// // // // // // // // // // // // //             >
// // // // // // // // // // // // //               Editar
// // // // // // // // // // // // //             </Button> */}

// // // // // // // // // // // // //             <Button
// // // // // // // // // // // // //               size="small"
// // // // // // // // // // // // //               variant="outlined"
// // // // // // // // // // // // //               color="primary"
// // // // // // // // // // // // //               startIcon={<EditIcon />}
// // // // // // // // // // // // //               onClick={(e) => {
// // // // // // // // // // // // //                 e.stopPropagation();
// // // // // // // // // // // // //                 handleOpenModal();
// // // // // // // // // // // // //               }}
// // // // // // // // // // // // //               disabled={isUpdating}
// // // // // // // // // // // // //             >
// // // // // // // // // // // // //               Editar
// // // // // // // // // // // // //             </Button>



// // // // // // // // // // // // //           </Box>
// // // // // // // // // // // // //           {isModalOpen && (
// // // // // // // // // // // // //             <EditOrderModal
// // // // // // // // // // // // //               open={isModalOpen}
// // // // // // // // // // // // //               order={order}
// // // // // // // // // // // // //               onSave={(updatedOrder) => {
// // // // // // // // // // // // //                 saveUpdateData(updatedOrder);
// // // // // // // // // // // // //                 handleCloseModal();
// // // // // // // // // // // // //               }}
// // // // // // // // // // // // //               menuData={{
// // // // // // // // // // // // //                 mainMenu: hojas?.Hoja1 || [],
// // // // // // // // // // // // //                 promotions: hojas?.Promotion || []
// // // // // // // // // // // // //               }}
// // // // // // // // // // // // //               onClose={handleCloseModal}
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //           )}
// // // // // // // // // // // // //         </CardContent>
// // // // // // // // // // // // //       </Card>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Render por estado
// // // // // // // // // // // // //   const renderOrdersByStatus = () => {
// // // // // // // // // // // // //     return Object.entries(ordersByStatus).map(([status, orders]) => {
// // // // // // // // // // // // //       if (!orders || orders.length === 0) return null;

// // // // // // // // // // // // //       const config = statusConfig[status as keyof typeof statusConfig];

// // // // // // // // // // // // //       return (
// // // // // // // // // // // // //         <Grid item xs={12} md={6} lg={4} key={status}>
// // // // // // // // // // // // //           <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
// // // // // // // // // // // // //             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// // // // // // // // // // // // //               {config.icon}
// // // // // // // // // // // // //               <Typography variant="h6" sx={{ ml: 1 }}>
// // // // // // // // // // // // //                 {status.toUpperCase()} ({orders.length})
// // // // // // // // // // // // //               </Typography>
// // // // // // // // // // // // //             </Box>

// // // // // // // // // // // // //             <Box sx={{ maxHeight: '600px', overflowY: 'auto' }}>
// // // // // // // // // // // // //               {orders.map((order: any) => (
// // // // // // // // // // // // //                 <OrderCard key={order._id} order={order} />
// // // // // // // // // // // // //               ))}
// // // // // // // // // // // // //             </Box>
// // // // // // // // // // // // //           </Paper>
// // // // // // // // // // // // //         </Grid>
// // // // // // // // // // // // //       );
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <Box sx={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
// // // // // // // // // // // // //       {/* Header y Toolbar (similar al original) */}

// // // // // // // // // // // // //       {/* Contenido principal */}
// // // // // // // // // // // // //       <Box sx={{ flex: 1, overflow: "hidden", p: 2 }}>
// // // // // // // // // // // // //         <Grid container spacing={3}>
// // // // // // // // // // // // //           {renderOrdersByStatus()}
// // // // // // // // // // // // //         </Grid>
// // // // // // // // // // // // //       </Box>
// // // // // // // // // // // // //     </Box>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default OrderSpeedGeneric;




// // // // // // // // // // // // import React, { useMemo, useState, useEffect } from 'react';
// // // // // // // // // // // // import { useSelector } from 'react-redux';
// // // // // // // // // // // // import { RootState } from "../../../store/store";
// // // // // // // // // // // // import {
// // // // // // // // // // // //   Box,
// // // // // // // // // // // //   Button,
// // // // // // // // // // // //   Chip,
// // // // // // // // // // // //   CircularProgress,
// // // // // // // // // // // //   Paper,
// // // // // // // // // // // //   Typography,
// // // // // // // // // // // //   Snackbar,
// // // // // // // // // // // //   Alert,
// // // // // // // // // // // //   Grid,
// // // // // // // // // // // //   List,
// // // // // // // // // // // //   ListItem,
// // // // // // // // // // // //   ListItemText,
// // // // // // // // // // // //   ListItemAvatar,
// // // // // // // // // // // //   Avatar,
// // // // // // // // // // // //   ListItemSecondaryAction,
// // // // // // // // // // // //   IconButton,
// // // // // // // // // // // //   Collapse,
// // // // // // // // // // // //   Card,
// // // // // // // // // // // //   CardContent,
// // // // // // // // // // // //   CardActions,
// // // // // // // // // // // //   Divider,
// // // // // // // // // // // //   TextField,
// // // // // // // // // // // //   Badge,
// // // // // // // // // // // //   Tooltip,
// // // // // // // // // // // //   AppBar,
// // // // // // // // // // // //   Toolbar,
// // // // // // // // // // // //   useMediaQuery,
// // // // // // // // // // // //   useTheme,
// // // // // // // // // // // //   Stack,
// // // // // // // // // // // //   Accordion,
// // // // // // // // // // // //   AccordionSummary,
// // // // // // // // // // // //   AccordionDetails
// // // // // // // // // // // // } from '@mui/material';
// // // // // // // // // // // // import {
// // // // // // // // // // // //   Delete as DeleteIcon,
// // // // // // // // // // // //   Edit as EditIcon,
// // // // // // // // // // // //   Refresh as RefreshIcon,
// // // // // // // // // // // //   ExpandMore as ExpandMoreIcon,
// // // // // // // // // // // //   ExpandLess as ExpandLessIcon,
// // // // // // // // // // // //   CheckCircle as CheckCircleIcon,
// // // // // // // // // // // //   PauseCircle as PauseCircleIcon,
// // // // // // // // // // // //   Cancel as CancelIcon,
// // // // // // // // // // // //   DeliveryDining as DeliveryIcon,
// // // // // // // // // // // //   PlayCircle as PlayIcon,
// // // // // // // // // // // //   Add as AddIcon,
// // // // // // // // // // // //   Warning as WarningIcon,
// // // // // // // // // // // //   Info as InfoIcon,
// // // // // // // // // // // //   ViewList as ViewListIcon,
// // // // // // // // // // // //   ViewColumn as ViewColumnIcon,
// // // // // // // // // // // //   Logout as LogoutIcon,
// // // // // // // // // // // //   Update as UpdateIcon,
// // // // // // // // // // // //   AccessTime,
// // // // // // // // // // // //   Person,
// // // // // // // // // // // //   ShoppingCart,
// // // // // // // // // // // //   LocalShipping,
// // // // // // // // // // // //   Pending,
// // // // // // // // // // // //   PlayArrow,
// // // // // // // // // // // //   Pause,
// // // // // // // // // // // //   LocalDining
// // // // // // // // // // // // } from '@mui/icons-material';
// // // // // // // // // // // // import { useOrdersManagementSocketApi } from '../../../hooks/useOrdersManagementSocketApi';
// // // // // // // // // // // // import EditOrderModal from '../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal';
// // // // // // // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // // import { clearLocalhostStorage } from "@/services/localstorage.services";
// // // // // // // // // // // // import { recordAttendance } from "@/services/attendance.services";
// // // // // // // // // // // // import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog";

// // // // // // // // // // // // // Configuración de estados
// // // // // // // // // // // // const statusConfig = {
// // // // // // // // // // // //   pending: {
// // // // // // // // // // // //     color: "default",
// // // // // // // // // // // //     icon: <Pending color="disabled" />,
// // // // // // // // // // // //     actions: [
// // // // // // // // // // // //       { action: 'start', label: 'Iniciar', color: 'primary', icon: <PlayArrow /> }
// // // // // // // // // // // //     ]
// // // // // // // // // // // //   },
// // // // // // // // // // // //   processing: {
// // // // // // // // // // // //     color: "primary",
// // // // // // // // // // // //     icon: <PlayArrow color="primary" />,
// // // // // // // // // // // //     actions: [
// // // // // // // // // // // //       { action: 'pause', label: 'Pausar', color: 'warning', icon: <Pause /> },
// // // // // // // // // // // //       { action: 'complete', label: 'Completar', color: 'success', icon: <CheckCircleIcon /> }
// // // // // // // // // // // //     ]
// // // // // // // // // // // //   },
// // // // // // // // // // // //   paused: {
// // // // // // // // // // // //     color: "warning",
// // // // // // // // // // // //     icon: <Pause color="warning" />,
// // // // // // // // // // // //     actions: [
// // // // // // // // // // // //       { action: 'resume', label: 'Reanudar', color: 'primary', icon: <PlayArrow /> },
// // // // // // // // // // // //       { action: 'complete', label: 'Completar', color: 'success', icon: <CheckCircleIcon /> }
// // // // // // // // // // // //     ]
// // // // // // // // // // // //   },
// // // // // // // // // // // //   finished: {
// // // // // // // // // // // //     color: "success",
// // // // // // // // // // // //     icon: <CheckCircleIcon color="success" />,
// // // // // // // // // // // //     actions: [
// // // // // // // // // // // //       { action: 'deliver', label: 'Entregar', color: 'success', icon: <LocalShipping /> }
// // // // // // // // // // // //     ]
// // // // // // // // // // // //   },
// // // // // // // // // // // //   cancelled: {
// // // // // // // // // // // //     color: "error",
// // // // // // // // // // // //     icon: <CancelIcon color="error" />,
// // // // // // // // // // // //     actions: [
// // // // // // // // // // // //       { action: 'reopen', label: 'Reabrir', color: 'primary', icon: <PlayArrow /> }
// // // // // // // // // // // //     ]
// // // // // // // // // // // //   },
// // // // // // // // // // // //   delivered: {
// // // // // // // // // // // //     color: "success",
// // // // // // // // // // // //     icon: <LocalShipping color="success" />,
// // // // // // // // // // // //     actions: []
// // // // // // // // // // // //   }
// // // // // // // // // // // // };

// // // // // // // // // // // // const OrderSpeedGeneric = () => {
// // // // // // // // // // // //   const theme = useTheme();
// // // // // // // // // // // //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// // // // // // // // // // // //   const isTablet = useMediaQuery(theme.breakpoints.down("md"));
// // // // // // // // // // // //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile);
// // // // // // // // // // // //   const [displayTitle, setDisplayTitle] = useState(false);
// // // // // // // // // // // //   const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column");
// // // // // // // // // // // //   const [openPendingDialog, setOpenPendingDialog] = useState(false);

// // // // // // // // // // // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any });
// // // // // // // // // // // //   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } };

// // // // // // // // // // // //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email");

// // // // // // // // // // // //   const {
// // // // // // // // // // // //     allOrders,
// // // // // // // // // // // //     ordersByStatus,
// // // // // // // // // // // //     isConnected,
// // // // // // // // // // // //     isLoading,
// // // // // // // // // // // //     isUpdating,
// // // // // // // // // // // //     error,
// // // // // // // // // // // //     successMessage,
// // // // // // // // // // // //     lastRefresh,
// // // // // // // // // // // //     messages,
// // // // // // // // // // // //     fetchHistoricalOrders,
// // // // // // // // // // // //     handleOrderAction,
// // // // // // // // // // // //     updateOrder,
// // // // // // // // // // // //     deleteOrder,
// // // // // // // // // // // //     createOrder,
// // // // // // // // // // // //     clearMessages
// // // // // // // // // // // //   } = useOrdersManagementSocketApi({
// // // // // // // // // // // //     companyName: data?.companyName || "LlakaScript",
// // // // // // // // // // // //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// // // // // // // // // // // //     orderLimit: 50
// // // // // // // // // // // //   });

// // // // // // // // // // // //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0);
// // // // // // // // // // // //   const pendingCount = ordersByStatus.pending?.length || 0;
// // // // // // // // // // // //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0);
// // // // // // // // // // // //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0);

// // // // // // // // // // // //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed);
// // // // // // // // // // // //   const toggleViewMode = () => setViewMode(viewMode === "column" ? "list" : "column");

// // // // // // // // // // // //   const handleLogout = async () => {
// // // // // // // // // // // //     clearLocalhostStorage();
// // // // // // // // // // // //     await recordAttendance('getOut', user?.user?.email, data?.companyName);
// // // // // // // // // // // //     window.location.reload();
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Title animation effect
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const interval = setInterval(() => {
// // // // // // // // // // // //       setDisplayTitle((prev) => !prev);
// // // // // // // // // // // //     }, 5000);
// // // // // // // // // // // //     return () => clearInterval(interval);
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   // Update view mode when screen size changes
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     setViewMode(isMobile ? "list" : "column");
// // // // // // // // // // // //   }, [isMobile]);

// // // // // // // // // // // //   // Ordenar órdenes por fecha (más recientes primero)
// // // // // // // // // // // //   const sortedOrders = useMemo(() => {
// // // // // // // // // // // //     return [...allOrders].sort((a, b) => {
// // // // // // // // // // // //       const dateA = new Date(a.createdAt || a.timestamp || 0);
// // // // // // // // // // // //       const dateB = new Date(b.createdAt || b.timestamp || 0);
// // // // // // // // // // // //       return dateB.getTime() - dateA.getTime();
// // // // // // // // // // // //     });
// // // // // // // // // // // //   }, [allOrders]);

// // // // // // // // // // // //   // Componente para renderizar cada orden
// // // // // // // // // // // //   const OrderCard = ({ order }: { order: any }) => {
// // // // // // // // // // // //     const theme = useTheme();
// // // // // // // // // // // //     const [isModalOpen, setIsModalOpen] = useState(false);

// // // // // // // // // // // //     const status = order.status;
// // // // // // // // // // // //     const config = statusConfig[status as keyof typeof statusConfig];
// // // // // // // // // // // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0);
// // // // // // // // // // // //     const total = order.cart.reduce((sum: any, item: any) => {
// // // // // // // // // // // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0;
// // // // // // // // // // // //       return sum + item.price * item.quantity + extrasTotal;
// // // // // // // // // // // //     }, 0);

// // // // // // // // // // // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // // // // // // // // //       hour: "2-digit",
// // // // // // // // // // // //       minute: "2-digit",
// // // // // // // // // // // //     });

// // // // // // // // // // // //     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette];

// // // // // // // // // // // //     const handleOpenModal = () => {
// // // // // // // // // // // //       setIsModalOpen(true);
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const handleCloseModal = () => {
// // // // // // // // // // // //       setIsModalOpen(false);
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const saveUpdateData = async (updatedOrder: any) => {
// // // // // // // // // // // //       try {
// // // // // // // // // // // //         await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder);
// // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // //         console.error("Failed to update order:", error);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     }

// // // // // // // // // // // //     return (
// // // // // // // // // // // //       <Card sx={{ 
// // // // // // // // // // // //         borderLeft: '4px solid', 
// // // // // // // // // // // //         borderColor: paletteColor?.main || 'grey',
// // // // // // // // // // // //         height: '100%',
// // // // // // // // // // // //         display: 'flex',
// // // // // // // // // // // //         flexDirection: 'column'
// // // // // // // // // // // //       }}>
// // // // // // // // // // // //         <CardContent sx={{ flexGrow: 1 }}>
// // // // // // // // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
// // // // // // // // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // // // // // // // //               #{order.id || order._id.slice(-4)}
// // // // // // // // // // // //             </Typography>
// // // // // // // // // // // //             <Chip
// // // // // // // // // // // //               size="small"
// // // // // // // // // // // //               label={order.orderType}
// // // // // // // // // // // //               color={config.color as any}
// // // // // // // // // // // //             />
// // // // // // // // // // // //           </Box>

// // // // // // // // // // // //           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
// // // // // // // // // // // //             <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // // // // // //             <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // // // // // // // //               {order.fullname}
// // // // // // // // // // // //             </Typography>
// // // // // // // // // // // //             <Box sx={{ flexGrow: 1 }} />
// // // // // // // // // // // //             <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // // // // // //             <Typography variant="body2">{formattedTime}</Typography>
// // // // // // // // // // // //           </Box>

// // // // // // // // // // // //           <Divider sx={{ my: 1 }} />

// // // // // // // // // // // //           <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
// // // // // // // // // // // //             Items ({totalItems})
// // // // // // // // // // // //           </Typography>

// // // // // // // // // // // //           <List dense disablePadding>
// // // // // // // // // // // //             {order.cart.map((item: any) => (
// // // // // // // // // // // //               <ListItem key={item.id} disablePadding sx={{ py: 0.25 }}>
// // // // // // // // // // // //                 <ListItemText
// // // // // // // // // // // //                   primary={
// // // // // // // // // // // //                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // // // // // //                       <Typography variant="body2">
// // // // // // // // // // // //                         <strong>{item.quantity}x</strong> {item.name}
// // // // // // // // // // // //                       </Typography>
// // // // // // // // // // // //                       <Typography variant="body2" sx={{ ml: 1 }}>
// // // // // // // // // // // //                         ${item.price.toFixed(2)}
// // // // // // // // // // // //                       </Typography>
// // // // // // // // // // // //                     </Box>
// // // // // // // // // // // //                   }
// // // // // // // // // // // //                   secondary={
// // // // // // // // // // // //                     item.extras?.length > 0 && (
// // // // // // // // // // // //                       <List dense disablePadding sx={{ ml: 2 }}>
// // // // // // // // // // // //                         {item.extras.map((extra: any, idx: number) => (
// // // // // // // // // // // //                           <ListItem key={idx} disablePadding sx={{ py: 0 }}>
// // // // // // // // // // // //                             <ListItemText
// // // // // // // // // // // //                               primary={
// // // // // // // // // // // //                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // // // // // //                                   <Typography variant="caption">+ {extra.name}</Typography>
// // // // // // // // // // // //                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // // // // // // // // // //                                 </Box>
// // // // // // // // // // // //                               }
// // // // // // // // // // // //                             />
// // // // // // // // // // // //                           </ListItem>
// // // // // // // // // // // //                         ))}
// // // // // // // // // // // //                       </List>
// // // // // // // // // // // //                     )
// // // // // // // // // // // //                   }
// // // // // // // // // // // //                 />
// // // // // // // // // // // //               </ListItem>
// // // // // // // // // // // //             ))}
// // // // // // // // // // // //           </List>

// // // // // // // // // // // //           <Divider sx={{ my: 1 }} />

// // // // // // // // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // // // // // // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // // // // // // // //               Total: ${total.toFixed(2)}
// // // // // // // // // // // //             </Typography>

// // // // // // // // // // // //             <Stack direction="row" spacing={1}>
// // // // // // // // // // // //               {config.actions.map((action: any) => (
// // // // // // // // // // // //                 <Button
// // // // // // // // // // // //                   key={action.action}
// // // // // // // // // // // //                   size="small"
// // // // // // // // // // // //                   variant="contained"
// // // // // // // // // // // //                   color={action.color as any}
// // // // // // // // // // // //                   startIcon={action.icon}
// // // // // // // // // // // //                   onClick={(e) => {
// // // // // // // // // // // //                     e.stopPropagation();
// // // // // // // // // // // //                     handleOrderAction(action.action, order);
// // // // // // // // // // // //                   }}
// // // // // // // // // // // //                   disabled={isUpdating}
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                   {action.label}
// // // // // // // // // // // //                 </Button>
// // // // // // // // // // // //               ))}

// // // // // // // // // // // //               <Button
// // // // // // // // // // // //                 size="small"
// // // // // // // // // // // //                 variant="outlined"
// // // // // // // // // // // //                 color="primary"
// // // // // // // // // // // //                 startIcon={<EditIcon />}
// // // // // // // // // // // //                 onClick={(e) => {
// // // // // // // // // // // //                   e.stopPropagation();
// // // // // // // // // // // //                   handleOpenModal();
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //                 disabled={isUpdating}
// // // // // // // // // // // //               >
// // // // // // // // // // // //                 Editar
// // // // // // // // // // // //               </Button>
// // // // // // // // // // // //             </Stack>
// // // // // // // // // // // //           </Box>
// // // // // // // // // // // //         </CardContent>

// // // // // // // // // // // //         {isModalOpen && (
// // // // // // // // // // // //           <EditOrderModal
// // // // // // // // // // // //             open={isModalOpen}
// // // // // // // // // // // //             order={order}
// // // // // // // // // // // //             onSave={(updatedOrder) => {
// // // // // // // // // // // //               saveUpdateData(updatedOrder);
// // // // // // // // // // // //               handleCloseModal();
// // // // // // // // // // // //             }}
// // // // // // // // // // // //             menuData={{
// // // // // // // // // // // //               mainMenu: hojas?.Hoja1 || [],
// // // // // // // // // // // //               promotions: hojas?.Promotion || []
// // // // // // // // // // // //             }}
// // // // // // // // // // // //             onClose={handleCloseModal}
// // // // // // // // // // // //           />
// // // // // // // // // // // //         )}
// // // // // // // // // // // //       </Card>
// // // // // // // // // // // //     );
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Render por estado en vista de columnas
// // // // // // // // // // // //   const renderOrdersByStatus = () => {
// // // // // // // // // // // //     return Object.entries(ordersByStatus).map(([status, orders]) => {
// // // // // // // // // // // //       if (!orders || orders.length === 0) return null;

// // // // // // // // // // // //       const config = statusConfig[status as keyof typeof statusConfig];

// // // // // // // // // // // //       return (
// // // // // // // // // // // //         <Grid item xs={12} md={6} lg={4} key={status}>
// // // // // // // // // // // //           <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
// // // // // // // // // // // //             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// // // // // // // // // // // //               {config.icon}
// // // // // // // // // // // //               <Typography variant="h6" sx={{ ml: 1 }}>
// // // // // // // // // // // //                 {status.toUpperCase()} ({orders.length})
// // // // // // // // // // // //               </Typography>
// // // // // // // // // // // //             </Box>

// // // // // // // // // // // //             <Box sx={{ maxHeight: '600px', overflowY: 'auto' }}>
// // // // // // // // // // // //               {orders.map((order: any) => (
// // // // // // // // // // // //                 <Box key={order._id} sx={{ mb: 2 }}>
// // // // // // // // // // // //                   <OrderCard order={order} />
// // // // // // // // // // // //                 </Box>
// // // // // // // // // // // //               ))}
// // // // // // // // // // // //             </Box>
// // // // // // // // // // // //           </Paper>
// // // // // // // // // // // //         </Grid>
// // // // // // // // // // // //       );
// // // // // // // // // // // //     });
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Render en vista de lista
// // // // // // // // // // // //   const renderOrdersList = () => {
// // // // // // // // // // // //     return (
// // // // // // // // // // // //       <Grid item xs={12}>
// // // // // // // // // // // //         <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
// // // // // // // // // // // //           <Box sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
// // // // // // // // // // // //             <Grid container spacing={2}>
// // // // // // // // // // // //               {sortedOrders.map((order: any) => (
// // // // // // // // // // // //                 <Grid item xs={12} key={order._id}>
// // // // // // // // // // // //                   <OrderCard order={order} />
// // // // // // // // // // // //                 </Grid>
// // // // // // // // // // // //               ))}
// // // // // // // // // // // //             </Grid>
// // // // // // // // // // // //           </Box>
// // // // // // // // // // // //         </Paper>
// // // // // // // // // // // //       </Grid>
// // // // // // // // // // // //     );
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <Box sx={{ 
// // // // // // // // // // // //       height: "100vh", 
// // // // // // // // // // // //       overflow: "hidden", 
// // // // // // // // // // // //       bgcolor: theme.palette.background.default,
// // // // // // // // // // // //       display: "flex", 
// // // // // // // // // // // //       flexDirection: "column" 
// // // // // // // // // // // //     }}>
// // // // // // // // // // // //       {/* Custom AppBar */}
// // // // // // // // // // // //       <AppBar
// // // // // // // // // // // //         position="static"
// // // // // // // // // // // //         component={motion.div}
// // // // // // // // // // // //         initial={false}
// // // // // // // // // // // //         transition={{ duration: 0.7 }}
// // // // // // // // // // // //         elevation={0}
// // // // // // // // // // // //         sx={{
// // // // // // // // // // // //           bgcolor: "background.paper",
// // // // // // // // // // // //           color: "text.primary",
// // // // // // // // // // // //           borderBottom: 1,
// // // // // // // // // // // //           borderColor: "divider",
// // // // // // // // // // // //         }}
// // // // // // // // // // // //       >
// // // // // // // // // // // //         <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
// // // // // // // // // // // //           {/* Logo and Title */}
// // // // // // // // // // // //           <Box
// // // // // // // // // // // //             sx={{
// // // // // // // // // // // //               display: "flex",
// // // // // // // // // // // //               alignItems: "center",
// // // // // // // // // // // //               gap: 1,
// // // // // // // // // // // //               flexGrow: 1,
// // // // // // // // // // // //               height: "40px",
// // // // // // // // // // // //               position: "relative",
// // // // // // // // // // // //               overflow: "hidden",
// // // // // // // // // // // //             }}
// // // // // // // // // // // //           >
// // // // // // // // // // // //             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // // // // // // // // // // //               <Avatar
// // // // // // // // // // // //                 sx={{
// // // // // // // // // // // //                   width: 28,
// // // // // // // // // // // //                   height: 28,
// // // // // // // // // // // //                   flexShrink: 0,
// // // // // // // // // // // //                   ml: 0.5,
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //               >
// // // // // // // // // // // //                 <Image
// // // // // // // // // // // //                   src={"/images/flama.png"}
// // // // // // // // // // // //                   alt={"LlakaScript"}
// // // // // // // // // // // //                   width={28}
// // // // // // // // // // // //                   height={28}
// // // // // // // // // // // //                   priority
// // // // // // // // // // // //                   style={{
// // // // // // // // // // // //                     objectFit: "contain",
// // // // // // // // // // // //                     width: "100%",
// // // // // // // // // // // //                     height: "100%",
// // // // // // // // // // // //                   }}
// // // // // // // // // // // //                 />
// // // // // // // // // // // //               </Avatar>
// // // // // // // // // // // //             </motion.div>

// // // // // // // // // // // //             <Box
// // // // // // // // // // // //               sx={{
// // // // // // // // // // // //                 position: "relative",
// // // // // // // // // // // //                 width: "auto",
// // // // // // // // // // // //                 height: "100%",
// // // // // // // // // // // //                 display: "flex",
// // // // // // // // // // // //                 alignItems: "center",
// // // // // // // // // // // //                 flexGrow: 1,
// // // // // // // // // // // //               }}
// // // // // // // // // // // //             >
// // // // // // // // // // // //               <AnimatePresence mode="wait">
// // // // // // // // // // // //                 <motion.div
// // // // // // // // // // // //                   key={displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // // // // // // // //                   initial={{ opacity: 0, x: -10 }}
// // // // // // // // // // // //                   animate={{ opacity: 1, x: 0 }}
// // // // // // // // // // // //                   exit={{ opacity: 0, x: 10 }}
// // // // // // // // // // // //                   transition={{ duration: 0.3 }}
// // // // // // // // // // // //                   style={{
// // // // // // // // // // // //                     position: "absolute",
// // // // // // // // // // // //                     left: 0,
// // // // // // // // // // // //                     whiteSpace: "nowrap",
// // // // // // // // // // // //                   }}
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                   <Typography
// // // // // // // // // // // //                     variant={isMobile ? "subtitle1" : "h6"}
// // // // // // // // // // // //                     sx={{
// // // // // // // // // // // //                       fontWeight: 600,
// // // // // // // // // // // //                       lineHeight: 1.1,
// // // // // // // // // // // //                       fontSize: isMobile ? "1rem" : undefined,
// // // // // // // // // // // //                     }}
// // // // // // // // // // // //                   >
// // // // // // // // // // // //                     {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // // // // // // // //                   </Typography>
// // // // // // // // // // // //                 </motion.div>
// // // // // // // // // // // //               </AnimatePresence>
// // // // // // // // // // // //             </Box>
// // // // // // // // // // // //           </Box>

// // // // // // // // // // // //           {/* Right side controls */}
// // // // // // // // // // // //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// // // // // // // // // // // //             {/* Connection status indicator */}
// // // // // // // // // // // //             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
// // // // // // // // // // // //               <Box
// // // // // // // // // // // //                 sx={{
// // // // // // // // // // // //                   width: 10,
// // // // // // // // // // // //                   height: 10,
// // // // // // // // // // // //                   borderRadius: '50%',
// // // // // // // // // // // //                   bgcolor: isConnected ? 'success.main' : 'error.main',
// // // // // // // // // // // //                   mr: 1,
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //               />
// // // // // // // // // // // //             </Tooltip>

// // // // // // // // // // // //             {/* Order count badge */}
// // // // // // // // // // // //             {isMobile && totalOrders > 0 && (
// // // // // // // // // // // //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// // // // // // // // // // // //                 <Box sx={{ width: 4, height: 4 }} />
// // // // // // // // // // // //               </Badge>
// // // // // // // // // // // //             )}

// // // // // // // // // // // //             {/* Last refresh time */}
// // // // // // // // // // // //             {lastRefresh && !isMobile && (
// // // // // // // // // // // //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// // // // // // // // // // // //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// // // // // // // // // // // //               </Typography>
// // // // // // // // // // // //             )}

// // // // // // // // // // // //             {/* Refresh button */}
// // // // // // // // // // // //             <Tooltip title="Actualizar">
// // // // // // // // // // // //               <IconButton
// // // // // // // // // // // //                 color="primary"
// // // // // // // // // // // //                 size="small"
// // // // // // // // // // // //                 onClick={fetchHistoricalOrders}
// // // // // // // // // // // //                 disabled={isLoading || isUpdating}
// // // // // // // // // // // //               >
// // // // // // // // // // // //                 <RefreshIcon fontSize="small" />
// // // // // // // // // // // //               </IconButton>
// // // // // // // // // // // //             </Tooltip>

// // // // // // // // // // // //             {/* View mode toggle */}
// // // // // // // // // // // //             <Tooltip title={viewMode === "column" ? "Vista lista" : "Vista columnas"}>
// // // // // // // // // // // //               <IconButton size="small" onClick={toggleViewMode} color="default">
// // // // // // // // // // // //                 {viewMode === "column" ? <ViewListIcon fontSize="small" /> : <ViewColumnIcon fontSize="small" />}
// // // // // // // // // // // //               </IconButton>
// // // // // // // // // // // //             </Tooltip>

// // // // // // // // // // // //             {/* Header collapse toggle (mobile only) */}
// // // // // // // // // // // //             {isMobile && (
// // // // // // // // // // // //               <IconButton size="small" onClick={toggleHeader}>
// // // // // // // // // // // //                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
// // // // // // // // // // // //               </IconButton>
// // // // // // // // // // // //             )}

// // // // // // // // // // // //             <Tooltip title="Salir">
// // // // // // // // // // // //               <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // // // // // // // // // // //                 <IconButton
// // // // // // // // // // // //                   size="small"
// // // // // // // // // // // //                   onClick={handleLogout}
// // // // // // // // // // // //                   color="default"
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                   <LogoutIcon fontSize="small" />
// // // // // // // // // // // //                 </IconButton>
// // // // // // // // // // // //               </motion.div>
// // // // // // // // // // // //             </Tooltip>
// // // // // // // // // // // //           </Box>
// // // // // // // // // // // //         </Toolbar>
// // // // // // // // // // // //       </AppBar>

// // // // // // // // // // // //       {/* Main content */}
// // // // // // // // // // // //       <Box
// // // // // // // // // // // //         sx={{
// // // // // // // // // // // //           p: { xs: 0.5, sm: 2 },
// // // // // // // // // // // //           flex: 1,
// // // // // // // // // // // //           overflow: "hidden",
// // // // // // // // // // // //           display: "flex",
// // // // // // // // // // // //           flexDirection: "column",
// // // // // // // // // // // //         }}
// // // // // // // // // // // //       >
// // // // // // // // // // // //         <Paper
// // // // // // // // // // // //           elevation={isMobile ? 1 : 3}
// // // // // // // // // // // //           sx={{
// // // // // // // // // // // //             height: "100%",
// // // // // // // // // // // //             display: "flex",
// // // // // // // // // // // //             flexDirection: "column",
// // // // // // // // // // // //             overflow: "hidden",
// // // // // // // // // // // //             borderRadius: { xs: 1, sm: 2 },
// // // // // // // // // // // //           }}
// // // // // // // // // // // //         >
// // // // // // // // // // // //           {/* Status header - collapsible on mobile */}
// // // // // // // // // // // //           <Box
// // // // // // // // // // // //             sx={{
// // // // // // // // // // // //               display: "flex",
// // // // // // // // // // // //               flexDirection: "column",
// // // // // // // // // // // //               borderBottom: 1,
// // // // // // // // // // // //               borderColor: "divider",
// // // // // // // // // // // //               transition: "all 0.3s ease",
// // // // // // // // // // // //               maxHeight: headerCollapsed ? "0px" : "200px",
// // // // // // // // // // // //               overflow: "hidden",
// // // // // // // // // // // //             }}
// // // // // // // // // // // //           >
// // // // // // // // // // // //             {/* Status chips */}
// // // // // // // // // // // //             <Box
// // // // // // // // // // // //               sx={{
// // // // // // // // // // // //                 display: "flex",
// // // // // // // // // // // //                 gap: 1,
// // // // // // // // // // // //                 flexWrap: "wrap",
// // // // // // // // // // // //                 p: { xs: 1, sm: 2 },
// // // // // // // // // // // //                 justifyContent: "center",
// // // // // // // // // // // //               }}
// // // // // // // // // // // //             >
// // // // // // // // // // // //               <Chip size="small" color="default" label={`${totalOrders} órdenes`} variant="outlined" />

// // // // // // // // // // // //               {pendingCount > 0 && (
// // // // // // // // // // // //                 <Chip size="small" color="warning" label={`${pendingCount} pendientes`} variant="outlined" />
// // // // // // // // // // // //               )}

// // // // // // // // // // // //               {processingCount > 0 && (
// // // // // // // // // // // //                 <Chip size="small" color="info" label={`${processingCount} en proceso`} variant="outlined" />
// // // // // // // // // // // //               )}

// // // // // // // // // // // //               {completedCount > 0 && (
// // // // // // // // // // // //                 <Chip size="small" color="success" label={`${completedCount} completadas`} variant="outlined" />
// // // // // // // // // // // //               )}

// // // // // // // // // // // //               <Chip
// // // // // // // // // // // //                 size="small"
// // // // // // // // // // // //                 color="warning"
// // // // // // // // // // // //                 label={`Actualizar Ordenes Viejas`}
// // // // // // // // // // // //                 variant="outlined"
// // // // // // // // // // // //                 icon={<UpdateIcon />}
// // // // // // // // // // // //                 onClick={() => setOpenPendingDialog(true)}
// // // // // // // // // // // //               />

// // // // // // // // // // // //               <PendingOrdersDialog
// // // // // // // // // // // //                 open={openPendingDialog}
// // // // // // // // // // // //                 onClose={() => setOpenPendingDialog(false)}
// // // // // // // // // // // //               />
// // // // // // // // // // // //             </Box>

// // // // // // // // // // // //             {/* Status indicators */}
// // // // // // // // // // // //             {(isLoading || isUpdating) && (
// // // // // // // // // // // //               <Box
// // // // // // // // // // // //                 sx={{
// // // // // // // // // // // //                   display: "flex",
// // // // // // // // // // // //                   alignItems: "center",
// // // // // // // // // // // //                   gap: 1,
// // // // // // // // // // // //                   p: 1,
// // // // // // // // // // // //                   mx: { xs: 1, sm: 2 },
// // // // // // // // // // // //                   mb: { xs: 1, sm: 2 },
// // // // // // // // // // // //                   backgroundColor: "action.hover",
// // // // // // // // // // // //                   borderRadius: 1,
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //               >
// // // // // // // // // // // //                 <CircularProgress size={16} />
// // // // // // // // // // // //                 <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// // // // // // // // // // // //                   {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// // // // // // // // // // // //                 </Typography>
// // // // // // // // // // // //               </Box>
// // // // // // // // // // // //             )}
// // // // // // // // // // // //           </Box>

// // // // // // // // // // // //           {/* Error messages */}
// // // // // // // // // // // //           <Box
// // // // // // // // // // // //             sx={{
// // // // // // // // // // // //               px: { xs: 1, sm: 2 },
// // // // // // // // // // // //               pt: { xs: 1, sm: 1 },
// // // // // // // // // // // //               overflow: "auto",
// // // // // // // // // // // //               flexShrink: 0,
// // // // // // // // // // // //             }}
// // // // // // // // // // // //           >
// // // // // // // // // // // //             {error && (
// // // // // // // // // // // //               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
// // // // // // // // // // // //                 <Alert severity="error" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// // // // // // // // // // // //                   {error}
// // // // // // // // // // // //                 </Alert>
// // // // // // // // // // // //               </motion.div>
// // // // // // // // // // // //             )}

// // // // // // // // // // // //             {successMessage && (
// // // // // // // // // // // //               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
// // // // // // // // // // // //                 <Alert severity="success" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// // // // // // // // // // // //                   {successMessage}
// // // // // // // // // // // //                 </Alert>
// // // // // // // // // // // //               </motion.div>
// // // // // // // // // // // //             )}
// // // // // // // // // // // //           </Box>

// // // // // // // // // // // //           {/* Main content - takes all available space */}
// // // // // // // // // // // //           <Box
// // // // // // // // // // // //             sx={{
// // // // // // // // // // // //               flex: 1,
// // // // // // // // // // // //               overflow: "hidden",
// // // // // // // // // // // //               display: "flex",
// // // // // // // // // // // //               flexDirection: "column",
// // // // // // // // // // // //               p: { xs: 1, sm: 2 }
// // // // // // // // // // // //             }}
// // // // // // // // // // // //           >
// // // // // // // // // // // //             <Grid container spacing={3} sx={{ height: '100%' }}>
// // // // // // // // // // // //               {viewMode === "column" ? renderOrdersByStatus() : renderOrdersList()}
// // // // // // // // // // // //             </Grid>
// // // // // // // // // // // //           </Box>
// // // // // // // // // // // //         </Paper>
// // // // // // // // // // // //       </Box>
// // // // // // // // // // // //     </Box>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default OrderSpeedGeneric;




// // // // // // // // // // // import React, { useMemo, useState, useEffect } from 'react';
// // // // // // // // // // // import { useSelector } from 'react-redux';
// // // // // // // // // // // import { RootState } from "../../../store/store";
// // // // // // // // // // // import {
// // // // // // // // // // //   Box,
// // // // // // // // // // //   Button,
// // // // // // // // // // //   Chip,
// // // // // // // // // // //   CircularProgress,
// // // // // // // // // // //   Paper,
// // // // // // // // // // //   Typography,
// // // // // // // // // // //   Snackbar,
// // // // // // // // // // //   Alert,
// // // // // // // // // // //   Grid,
// // // // // // // // // // //   List,
// // // // // // // // // // //   ListItem,
// // // // // // // // // // //   ListItemText,
// // // // // // // // // // //   Avatar,
// // // // // // // // // // //   IconButton,
// // // // // // // // // // //   Card,
// // // // // // // // // // //   CardContent,
// // // // // // // // // // //   Divider,
// // // // // // // // // // //   Badge,
// // // // // // // // // // //   Tooltip,
// // // // // // // // // // //   AppBar,
// // // // // // // // // // //   Toolbar,
// // // // // // // // // // //   useMediaQuery,
// // // // // // // // // // //   useTheme,
// // // // // // // // // // //   Stack,
// // // // // // // // // // //   useScrollTrigger,
// // // // // // // // // // //   Fab,
// // // // // // // // // // //   Zoom
// // // // // // // // // // // } from '@mui/material';
// // // // // // // // // // // import {
// // // // // // // // // // //   Edit as EditIcon,
// // // // // // // // // // //   Refresh as RefreshIcon,
// // // // // // // // // // //   ExpandMore as ExpandMoreIcon,
// // // // // // // // // // //   ExpandLess as ExpandLessIcon,
// // // // // // // // // // //   CheckCircle as CheckCircleIcon,
// // // // // // // // // // //   PauseCircle as PauseCircleIcon,
// // // // // // // // // // //   Cancel as CancelIcon,
// // // // // // // // // // //   DeliveryDining as DeliveryIcon,
// // // // // // // // // // //   PlayArrow,
// // // // // // // // // // //   Pause,
// // // // // // // // // // //   ViewList as ViewListIcon,
// // // // // // // // // // //   ViewColumn as ViewColumnIcon,
// // // // // // // // // // //   Logout as LogoutIcon,
// // // // // // // // // // //   Update as UpdateIcon,
// // // // // // // // // // //   AccessTime,
// // // // // // // // // // //   Person,
// // // // // // // // // // //   KeyboardArrowUp
// // // // // // // // // // // } from '@mui/icons-material';
// // // // // // // // // // // import { useOrdersManagementSocketApi } from '../../../hooks/useOrdersManagementSocketApi';
// // // // // // // // // // // import EditOrderModal from '../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal';
// // // // // // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // import { clearLocalhostStorage } from "@/services/localstorage.services";
// // // // // // // // // // // import { recordAttendance } from "@/services/attendance.services";
// // // // // // // // // // // import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog";

// // // // // // // // // // // // Configuración de estados
// // // // // // // // // // // const statusConfig = {
// // // // // // // // // // //   pending: {
// // // // // // // // // // //     color: "default",
// // // // // // // // // // //     icon: <PauseCircleIcon color="disabled" />,
// // // // // // // // // // //     actions: [
// // // // // // // // // // //       { action: 'start', label: 'Iniciar', color: 'primary', icon: <PlayArrow /> }
// // // // // // // // // // //     ]
// // // // // // // // // // //   },
// // // // // // // // // // //   processing: {
// // // // // // // // // // //     color: "primary",
// // // // // // // // // // //     icon: <PlayArrow color="primary" />,
// // // // // // // // // // //     actions: [
// // // // // // // // // // //       { action: 'pause', label: 'Pausar', color: 'warning', icon: <Pause /> },
// // // // // // // // // // //       { action: 'complete', label: 'Completar', color: 'success', icon: <CheckCircleIcon /> }
// // // // // // // // // // //     ]
// // // // // // // // // // //   },
// // // // // // // // // // //   paused: {
// // // // // // // // // // //     color: "warning",
// // // // // // // // // // //     icon: <Pause color="warning" />,
// // // // // // // // // // //     actions: [
// // // // // // // // // // //       { action: 'resume', label: 'Reanudar', color: 'primary', icon: <PlayArrow /> },
// // // // // // // // // // //       { action: 'complete', label: 'Completar', color: 'success', icon: <CheckCircleIcon /> }
// // // // // // // // // // //     ]
// // // // // // // // // // //   },
// // // // // // // // // // //   finished: {
// // // // // // // // // // //     color: "success",
// // // // // // // // // // //     icon: <CheckCircleIcon color="success" />,
// // // // // // // // // // //     actions: [
// // // // // // // // // // //       { action: 'deliver', label: 'Entregar', color: 'success', icon: <DeliveryIcon /> }
// // // // // // // // // // //     ]
// // // // // // // // // // //   },
// // // // // // // // // // //   cancelled: {
// // // // // // // // // // //     color: "error",
// // // // // // // // // // //     icon: <CancelIcon color="error" />,
// // // // // // // // // // //     actions: [
// // // // // // // // // // //       { action: 'reopen', label: 'Reabrir', color: 'primary', icon: <PlayArrow /> }
// // // // // // // // // // //     ]
// // // // // // // // // // //   },
// // // // // // // // // // //   delivered: {
// // // // // // // // // // //     color: "success",
// // // // // // // // // // //     icon: <DeliveryIcon color="success" />,
// // // // // // // // // // //     actions: []
// // // // // // // // // // //   }
// // // // // // // // // // // };

// // // // // // // // // // // const OrderSpeedGeneric = () => {
// // // // // // // // // // //   const theme = useTheme();
// // // // // // // // // // //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// // // // // // // // // // //   const isTablet = useMediaQuery(theme.breakpoints.down("md"));
// // // // // // // // // // //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile);
// // // // // // // // // // //   const [displayTitle, setDisplayTitle] = useState(false);
// // // // // // // // // // //   const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column");
// // // // // // // // // // //   const [openPendingDialog, setOpenPendingDialog] = useState(false);
// // // // // // // // // // //   const [selectedOrder, setSelectedOrder] = useState<any>(null);
// // // // // // // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

// // // // // // // // // // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any });
// // // // // // // // // // //   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } };

// // // // // // // // // // //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email");

// // // // // // // // // // //   const {
// // // // // // // // // // //     allOrders,
// // // // // // // // // // //     ordersByStatus,
// // // // // // // // // // //     isConnected,
// // // // // // // // // // //     isLoading,
// // // // // // // // // // //     isUpdating,
// // // // // // // // // // //     error,
// // // // // // // // // // //     successMessage,
// // // // // // // // // // //     lastRefresh,
// // // // // // // // // // //     fetchHistoricalOrders,
// // // // // // // // // // //     handleOrderAction,
// // // // // // // // // // //     updateOrder,
// // // // // // // // // // //     clearMessages
// // // // // // // // // // //   } = useOrdersManagementSocketApi({
// // // // // // // // // // //     companyName: data?.companyName || "LlakaScript",
// // // // // // // // // // //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// // // // // // // // // // //     orderLimit: 50
// // // // // // // // // // //   });

// // // // // // // // // // //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0);
// // // // // // // // // // //   const pendingCount = ordersByStatus.pending?.length || 0;
// // // // // // // // // // //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0);
// // // // // // // // // // //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0);

// // // // // // // // // // //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed);
// // // // // // // // // // //   const toggleViewMode = () => setViewMode(viewMode === "column" ? "list" : "column");

// // // // // // // // // // //   const handleLogout = async () => {
// // // // // // // // // // //     clearLocalhostStorage();
// // // // // // // // // // //     await recordAttendance('getOut', user?.user?.email, data?.companyName);
// // // // // // // // // // //     window.location.reload();
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleOpenEditModal = (order: any) => {
// // // // // // // // // // //     setSelectedOrder(order);
// // // // // // // // // // //     setIsEditModalOpen(true);
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleCloseEditModal = () => {
// // // // // // // // // // //     setIsEditModalOpen(false);
// // // // // // // // // // //     setSelectedOrder(null);
// // // // // // // // // // //   };

// // // // // // // // // // //   const saveUpdateData = async (updatedOrder: any) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder);
// // // // // // // // // // //       handleCloseEditModal();
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Failed to update order:", error);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Title animation effect
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const interval = setInterval(() => {
// // // // // // // // // // //       setDisplayTitle((prev) => !prev);
// // // // // // // // // // //     }, 5000);
// // // // // // // // // // //     return () => clearInterval(interval);
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // Update view mode when screen size changes
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     setViewMode(isMobile ? "list" : "column");
// // // // // // // // // // //   }, [isMobile]);

// // // // // // // // // // //   // Ordenar órdenes por fecha (más recientes primero)
// // // // // // // // // // //   const sortedOrders = useMemo(() => {
// // // // // // // // // // //     return [...allOrders].sort((a, b) => {
// // // // // // // // // // //       const dateA = new Date(a.createdAt || a.timestamp || 0);
// // // // // // // // // // //       const dateB = new Date(b.createdAt || b.timestamp || 0);
// // // // // // // // // // //       return dateB.getTime() - dateA.getTime();
// // // // // // // // // // //     });
// // // // // // // // // // //   }, [allOrders]);

// // // // // // // // // // //   // Scroll to top button logic
// // // // // // // // // // //   const trigger = useScrollTrigger({
// // // // // // // // // // //     threshold: 100,
// // // // // // // // // // //   });

// // // // // // // // // // //   const scrollToTop = () => {
// // // // // // // // // // //     window.scrollTo({
// // // // // // // // // // //       top: 0,
// // // // // // // // // // //       behavior: 'smooth',
// // // // // // // // // // //     });
// // // // // // // // // // //   };

// // // // // // // // // // //   // Componente para renderizar cada orden
// // // // // // // // // // //   const OrderCard = ({ order }: { order: any }) => {
// // // // // // // // // // //     const status = order.status;
// // // // // // // // // // //     const config = statusConfig[status as keyof typeof statusConfig];
// // // // // // // // // // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0);
// // // // // // // // // // //     const total = order.cart.reduce((sum: any, item: any) => {
// // // // // // // // // // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0;
// // // // // // // // // // //       return sum + item.price * item.quantity + extrasTotal;
// // // // // // // // // // //     }, 0);

// // // // // // // // // // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // // // // // // // //       hour: "2-digit",
// // // // // // // // // // //       minute: "2-digit",
// // // // // // // // // // //     });

// // // // // // // // // // //     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette];

// // // // // // // // // // //     return (
// // // // // // // // // // //       <motion.div
// // // // // // // // // // //         initial={{ opacity: 0, y: 20 }}
// // // // // // // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // //         transition={{ duration: 0.3 }}
// // // // // // // // // // //         whileHover={{ scale: isMobile ? 1 : 1.02 }}
// // // // // // // // // // //       >
// // // // // // // // // // //         <Card sx={{ 
// // // // // // // // // // //           borderLeft: '4px solid', 
// // // // // // // // // // //           borderColor: paletteColor?.main || 'grey',
// // // // // // // // // // //           mb: 2,
// // // // // // // // // // //           position: 'relative'
// // // // // // // // // // //         }}>
// // // // // // // // // // //           <CardContent>
// // // // // // // // // // //             <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
// // // // // // // // // // //               <Typography variant="subtitle1" fontWeight="bold">
// // // // // // // // // // //                 #{order.id || order._id.slice(-4)}
// // // // // // // // // // //               </Typography>
// // // // // // // // // // //               <Chip
// // // // // // // // // // //                 size="small"
// // // // // // // // // // //                 label={order.orderType}
// // // // // // // // // // //                 color={config.color as any}
// // // // // // // // // // //                 icon={config.icon}
// // // // // // // // // // //               />
// // // // // // // // // // //             </Box>

// // // // // // // // // // //             <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
// // // // // // // // // // //               <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // // // // //               <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // // // // // // //                 {order.fullname}
// // // // // // // // // // //               </Typography>
// // // // // // // // // // //               <Box sx={{ flexGrow: 1 }} />
// // // // // // // // // // //               <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // // // // //               <Typography variant="body2">{formattedTime}</Typography>
// // // // // // // // // // //             </Box>

// // // // // // // // // // //             <Divider sx={{ my: 1 }} />

// // // // // // // // // // //             <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
// // // // // // // // // // //               Items ({totalItems})
// // // // // // // // // // //             </Typography>

// // // // // // // // // // //             <List dense disablePadding>
// // // // // // // // // // //               {order.cart.slice(0, isMobile ? 2 : undefined).map((item: any) => (
// // // // // // // // // // //                 <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.25 }}>
// // // // // // // // // // //                   <ListItemText
// // // // // // // // // // //                     primary={
// // // // // // // // // // //                       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // // // // //                         <Typography variant="body2">
// // // // // // // // // // //                           <strong>{item.quantity}x</strong> {item.name}
// // // // // // // // // // //                         </Typography>
// // // // // // // // // // //                         <Typography variant="body2" sx={{ ml: 1 }}>
// // // // // // // // // // //                           ${item.price.toFixed(2)}
// // // // // // // // // // //                         </Typography>
// // // // // // // // // // //                       </Box>
// // // // // // // // // // //                     }
// // // // // // // // // // //                     secondary={
// // // // // // // // // // //                       item.extras?.length > 0 && (
// // // // // // // // // // //                         <List dense disablePadding sx={{ ml: 2 }}>
// // // // // // // // // // //                           {item.extras.slice(0, isMobile ? 1 : undefined).map((extra: any, idx: number) => (
// // // // // // // // // // //                             <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0 }}>
// // // // // // // // // // //                               <ListItemText
// // // // // // // // // // //                                 primary={
// // // // // // // // // // //                                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // // // // //                                     <Typography variant="caption">+ {extra.name}</Typography>
// // // // // // // // // // //                                     <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // // // // // // // // //                                   </Box>
// // // // // // // // // // //                                 }
// // // // // // // // // // //                               />
// // // // // // // // // // //                             </ListItem>
// // // // // // // // // // //                           ))}
// // // // // // // // // // //                         </List>
// // // // // // // // // // //                       )
// // // // // // // // // // //                     }
// // // // // // // // // // //                   />
// // // // // // // // // // //                 </ListItem>
// // // // // // // // // // //               ))}
// // // // // // // // // // //               {isMobile && order.cart.length > 2 && (
// // // // // // // // // // //                 <Typography variant="caption" color="text.secondary">
// // // // // // // // // // //                   +{order.cart.length - 2} más...
// // // // // // // // // // //                 </Typography>
// // // // // // // // // // //               )}
// // // // // // // // // // //             </List>

// // // // // // // // // // //             <Divider sx={{ my: 1 }} />

// // // // // // // // // // //             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // // // // // // // // //               <Typography variant="subtitle1" fontWeight="bold">
// // // // // // // // // // //                 Total: ${total.toFixed(2)}
// // // // // // // // // // //               </Typography>

// // // // // // // // // // //               {!isMobile && (
// // // // // // // // // // //                 <Stack direction="row" spacing={1}>
// // // // // // // // // // //                   {config.actions.map((action: any, idx: number) => (
// // // // // // // // // // //                     <Button
// // // // // // // // // // //                       key={`${action.action}-${idx}`}
// // // // // // // // // // //                       size="small"
// // // // // // // // // // //                       variant="contained"
// // // // // // // // // // //                       color={action.color as any}
// // // // // // // // // // //                       startIcon={action.icon}
// // // // // // // // // // //                       onClick={(e) => {
// // // // // // // // // // //                         e.stopPropagation();
// // // // // // // // // // //                         handleOrderAction(action.action, order);
// // // // // // // // // // //                       }}
// // // // // // // // // // //                       disabled={isUpdating}
// // // // // // // // // // //                     >
// // // // // // // // // // //                       {action.label}
// // // // // // // // // // //                     </Button>
// // // // // // // // // // //                   ))}

// // // // // // // // // // //                   <Button
// // // // // // // // // // //                     size="small"
// // // // // // // // // // //                     variant="outlined"
// // // // // // // // // // //                     color="primary"
// // // // // // // // // // //                     startIcon={<EditIcon />}
// // // // // // // // // // //                     onClick={(e) => {
// // // // // // // // // // //                       e.stopPropagation();
// // // // // // // // // // //                       handleOpenEditModal(order);
// // // // // // // // // // //                     }}
// // // // // // // // // // //                     disabled={isUpdating}
// // // // // // // // // // //                   >
// // // // // // // // // // //                     Editar
// // // // // // // // // // //                   </Button>
// // // // // // // // // // //                 </Stack>
// // // // // // // // // // //               )}
// // // // // // // // // // //             </Box>

// // // // // // // // // // //             {isMobile && (
// // // // // // // // // // //               <Box sx={{ mt: 1 }}>
// // // // // // // // // // //                 <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
// // // // // // // // // // //                   {config.actions.slice(0, 2).map((action: any, idx: number) => (
// // // // // // // // // // //                     <Button
// // // // // // // // // // //                       key={`mobile-${action.action}-${idx}`}
// // // // // // // // // // //                       size="small"
// // // // // // // // // // //                       variant="contained"
// // // // // // // // // // //                       color={action.color as any}
// // // // // // // // // // //                       startIcon={action.icon}
// // // // // // // // // // //                       onClick={(e) => {
// // // // // // // // // // //                         e.stopPropagation();
// // // // // // // // // // //                         handleOrderAction(action.action, order);
// // // // // // // // // // //                       }}
// // // // // // // // // // //                       disabled={isUpdating}
// // // // // // // // // // //                       sx={{ mb: 1 }}
// // // // // // // // // // //                     >
// // // // // // // // // // //                       {action.label}
// // // // // // // // // // //                     </Button>
// // // // // // // // // // //                   ))}

// // // // // // // // // // //                   <Button
// // // // // // // // // // //                     size="small"
// // // // // // // // // // //                     variant="outlined"
// // // // // // // // // // //                     color="primary"
// // // // // // // // // // //                     startIcon={<EditIcon />}
// // // // // // // // // // //                     onClick={(e) => {
// // // // // // // // // // //                       e.stopPropagation();
// // // // // // // // // // //                       handleOpenEditModal(order);
// // // // // // // // // // //                     }}
// // // // // // // // // // //                     disabled={isUpdating}
// // // // // // // // // // //                     sx={{ mb: 1 }}
// // // // // // // // // // //                   >
// // // // // // // // // // //                     Editar
// // // // // // // // // // //                   </Button>

// // // // // // // // // // //                   {config.actions.length > 2 && (
// // // // // // // // // // //                     <Button
// // // // // // // // // // //                       size="small"
// // // // // // // // // // //                       variant="outlined"
// // // // // // // // // // //                       color="secondary"
// // // // // // // // // // //                       onClick={(e) => {
// // // // // // // // // // //                         e.stopPropagation();
// // // // // // // // // // //                         handleOpenEditModal(order);
// // // // // // // // // // //                       }}
// // // // // // // // // // //                       disabled={isUpdating}
// // // // // // // // // // //                       sx={{ mb: 1 }}
// // // // // // // // // // //                     >
// // // // // // // // // // //                       Más acciones
// // // // // // // // // // //                     </Button>
// // // // // // // // // // //                   )}
// // // // // // // // // // //                 </Stack>
// // // // // // // // // // //               </Box>
// // // // // // // // // // //             )}
// // // // // // // // // // //           </CardContent>
// // // // // // // // // // //         </Card>
// // // // // // // // // // //       </motion.div>
// // // // // // // // // // //     );
// // // // // // // // // // //   };

// // // // // // // // // // //   // Render por estado en vista de columnas
// // // // // // // // // // //   const renderOrdersByStatus = () => {
// // // // // // // // // // //     return Object.entries(ordersByStatus).map(([status, orders]) => {
// // // // // // // // // // //       if (!orders || orders.length === 0) return null;

// // // // // // // // // // //       const config = statusConfig[status as keyof typeof statusConfig];

// // // // // // // // // // //       return (
// // // // // // // // // // //         <Grid item xs={12} md={6} lg={4} key={status}>
// // // // // // // // // // //           <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
// // // // // // // // // // //             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// // // // // // // // // // //               {config.icon}
// // // // // // // // // // //               <Typography variant="h6" sx={{ ml: 1 }}>
// // // // // // // // // // //                 {status.toUpperCase()} ({orders.length})
// // // // // // // // // // //               </Typography>
// // // // // // // // // // //             </Box>

// // // // // // // // // // //             <Box sx={{ maxHeight: '600px', overflowY: 'auto' }}>
// // // // // // // // // // //               <motion.div
// // // // // // // // // // //                 initial="hidden"
// // // // // // // // // // //                 animate="visible"
// // // // // // // // // // //                 variants={{
// // // // // // // // // // //                   hidden: { opacity: 0 },
// // // // // // // // // // //                   visible: {
// // // // // // // // // // //                     opacity: 1,
// // // // // // // // // // //                     transition: {
// // // // // // // // // // //                       staggerChildren: 0.1
// // // // // // // // // // //                     }
// // // // // // // // // // //                   }
// // // // // // // // // // //                 }}
// // // // // // // // // // //               >
// // // // // // // // // // //                 {orders.map((order: any) => (
// // // // // // // // // // //                   <motion.div
// // // // // // // // // // //                     key={order._id || order.id}
// // // // // // // // // // //                     variants={{
// // // // // // // // // // //                       hidden: { opacity: 0, y: 20 },
// // // // // // // // // // //                       visible: { opacity: 1, y: 0 }
// // // // // // // // // // //                     }}
// // // // // // // // // // //                   >
// // // // // // // // // // //                     <OrderCard order={order} />
// // // // // // // // // // //                   </motion.div>
// // // // // // // // // // //                 ))}
// // // // // // // // // // //               </motion.div>
// // // // // // // // // // //             </Box>
// // // // // // // // // // //           </Paper>
// // // // // // // // // // //         </Grid>
// // // // // // // // // // //       );
// // // // // // // // // // //     });
// // // // // // // // // // //   };

// // // // // // // // // // //   // Render en vista de lista
// // // // // // // // // // //   const renderOrdersList = () => {
// // // // // // // // // // //     return (
// // // // // // // // // // //       <Grid item xs={12}>
// // // // // // // // // // //         <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
// // // // // // // // // // //           <Box sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
// // // // // // // // // // //             <motion.div
// // // // // // // // // // //               initial="hidden"
// // // // // // // // // // //               animate="visible"
// // // // // // // // // // //               variants={{
// // // // // // // // // // //                 hidden: { opacity: 0 },
// // // // // // // // // // //                 visible: {
// // // // // // // // // // //                   opacity: 1,
// // // // // // // // // // //                   transition: {
// // // // // // // // // // //                     staggerChildren: 0.05
// // // // // // // // // // //                   }
// // // // // // // // // // //                 }
// // // // // // // // // // //               }}
// // // // // // // // // // //             >
// // // // // // // // // // //               {sortedOrders.map((order: any) => (
// // // // // // // // // // //                 <motion.div
// // // // // // // // // // //                   key={order._id || order.id}
// // // // // // // // // // //                   variants={{
// // // // // // // // // // //                     hidden: { opacity: 0, y: 20 },
// // // // // // // // // // //                     visible: { opacity: 1, y: 0 }
// // // // // // // // // // //                   }}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <OrderCard order={order} />
// // // // // // // // // // //                 </motion.div>
// // // // // // // // // // //               ))}
// // // // // // // // // // //             </motion.div>
// // // // // // // // // // //           </Box>
// // // // // // // // // // //         </Paper>
// // // // // // // // // // //       </Grid>
// // // // // // // // // // //     );
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <Box sx={{ 
// // // // // // // // // // //       height: "100vh", 
// // // // // // // // // // //       overflow: "hidden", 
// // // // // // // // // // //       bgcolor: theme.palette.background.default,
// // // // // // // // // // //       display: "flex", 
// // // // // // // // // // //       flexDirection: "column" 
// // // // // // // // // // //     }}>
// // // // // // // // // // //       {/* Custom AppBar */}
// // // // // // // // // // //       <AppBar
// // // // // // // // // // //         position="sticky"
// // // // // // // // // // //         component={motion.div}
// // // // // // // // // // //         initial={{ y: -20, opacity: 0 }}
// // // // // // // // // // //         animate={{ y: 0, opacity: 1 }}
// // // // // // // // // // //         transition={{ duration: 0.5 }}
// // // // // // // // // // //         elevation={0}
// // // // // // // // // // //         sx={{
// // // // // // // // // // //           bgcolor: "background.paper",
// // // // // // // // // // //           color: "text.primary",
// // // // // // // // // // //           borderBottom: 1,
// // // // // // // // // // //           borderColor: "divider",
// // // // // // // // // // //         }}
// // // // // // // // // // //       >
// // // // // // // // // // //         <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
// // // // // // // // // // //           {/* Logo and Title */}
// // // // // // // // // // //           <Box
// // // // // // // // // // //             sx={{
// // // // // // // // // // //               display: "flex",
// // // // // // // // // // //               alignItems: "center",
// // // // // // // // // // //               gap: 1,
// // // // // // // // // // //               flexGrow: 1,
// // // // // // // // // // //               height: "40px",
// // // // // // // // // // //               position: "relative",
// // // // // // // // // // //               overflow: "hidden",
// // // // // // // // // // //             }}
// // // // // // // // // // //           >
// // // // // // // // // // //             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // // // // // // // // // //               <Avatar
// // // // // // // // // // //                 sx={{
// // // // // // // // // // //                   width: 28,
// // // // // // // // // // //                   height: 28,
// // // // // // // // // // //                   flexShrink: 0,
// // // // // // // // // // //                   ml: 0.5,
// // // // // // // // // // //                 }}
// // // // // // // // // // //               >
// // // // // // // // // // //                 <Image
// // // // // // // // // // //                   src={"/images/flama.png"}
// // // // // // // // // // //                   alt={"LlakaScript"}
// // // // // // // // // // //                   width={28}
// // // // // // // // // // //                   height={28}
// // // // // // // // // // //                   priority
// // // // // // // // // // //                   style={{
// // // // // // // // // // //                     objectFit: "contain",
// // // // // // // // // // //                     width: "100%",
// // // // // // // // // // //                     height: "100%",
// // // // // // // // // // //                   }}
// // // // // // // // // // //                 />
// // // // // // // // // // //               </Avatar>
// // // // // // // // // // //             </motion.div>

// // // // // // // // // // //             <Box
// // // // // // // // // // //               sx={{
// // // // // // // // // // //                 position: "relative",
// // // // // // // // // // //                 width: "auto",
// // // // // // // // // // //                 height: "100%",
// // // // // // // // // // //                 display: "flex",
// // // // // // // // // // //                 alignItems: "center",
// // // // // // // // // // //                 flexGrow: 1,
// // // // // // // // // // //               }}
// // // // // // // // // // //             >
// // // // // // // // // // //               <AnimatePresence mode="wait">
// // // // // // // // // // //                 <motion.div
// // // // // // // // // // //                   key={displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // // // // // // //                   initial={{ opacity: 0, x: -10 }}
// // // // // // // // // // //                   animate={{ opacity: 1, x: 0 }}
// // // // // // // // // // //                   exit={{ opacity: 0, x: 10 }}
// // // // // // // // // // //                   transition={{ duration: 0.3 }}
// // // // // // // // // // //                   style={{
// // // // // // // // // // //                     position: "absolute",
// // // // // // // // // // //                     left: 0,
// // // // // // // // // // //                     whiteSpace: "nowrap",
// // // // // // // // // // //                   }}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <Typography
// // // // // // // // // // //                     variant={isMobile ? "subtitle1" : "h6"}
// // // // // // // // // // //                     sx={{
// // // // // // // // // // //                       fontWeight: 600,
// // // // // // // // // // //                       lineHeight: 1.1,
// // // // // // // // // // //                       fontSize: isMobile ? "1rem" : undefined,
// // // // // // // // // // //                     }}
// // // // // // // // // // //                   >
// // // // // // // // // // //                     {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // // // // // // //                   </Typography>
// // // // // // // // // // //                 </motion.div>
// // // // // // // // // // //               </AnimatePresence>
// // // // // // // // // // //             </Box>
// // // // // // // // // // //           </Box>

// // // // // // // // // // //           {/* Right side controls */}
// // // // // // // // // // //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// // // // // // // // // // //             {/* Connection status indicator */}
// // // // // // // // // // //             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
// // // // // // // // // // //               <motion.div
// // // // // // // // // // //                 animate={{
// // // // // // // // // // //                   scale: isConnected ? [1, 1.2, 1] : 1,
// // // // // // // // // // //                   transition: isConnected ? { repeat: Infinity, duration: 2 } : {}
// // // // // // // // // // //                 }}
// // // // // // // // // // //               >
// // // // // // // // // // //                 <Box
// // // // // // // // // // //                   sx={{
// // // // // // // // // // //                     width: 10,
// // // // // // // // // // //                     height: 10,
// // // // // // // // // // //                     borderRadius: '50%',
// // // // // // // // // // //                     bgcolor: isConnected ? 'success.main' : 'error.main',
// // // // // // // // // // //                     mr: 1,
// // // // // // // // // // //                   }}
// // // // // // // // // // //                 />
// // // // // // // // // // //               </motion.div>
// // // // // // // // // // //             </Tooltip>

// // // // // // // // // // //             {/* Order count badge */}
// // // // // // // // // // //             {isMobile && totalOrders > 0 && (
// // // // // // // // // // //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// // // // // // // // // // //                 <Box sx={{ width: 4, height: 4 }} />
// // // // // // // // // // //               </Badge>
// // // // // // // // // // //             )}

// // // // // // // // // // //             {/* Last refresh time */}
// // // // // // // // // // //             {lastRefresh && !isMobile && (
// // // // // // // // // // //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// // // // // // // // // // //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// // // // // // // // // // //               </Typography>
// // // // // // // // // // //             )}

// // // // // // // // // // //             {/* Refresh button */}
// // // // // // // // // // //             <Tooltip title="Actualizar">
// // // // // // // // // // //               <motion.div whileHover={{ rotate: 90 }} transition={{ type: 'spring' }}>
// // // // // // // // // // //                 <IconButton
// // // // // // // // // // //                   color="primary"
// // // // // // // // // // //                   size="small"
// // // // // // // // // // //                   onClick={fetchHistoricalOrders}
// // // // // // // // // // //                   disabled={isLoading || isUpdating}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <RefreshIcon fontSize="small" />
// // // // // // // // // // //                 </IconButton>
// // // // // // // // // // //               </motion.div>
// // // // // // // // // // //             </Tooltip>

// // // // // // // // // // //             {/* View mode toggle */}
// // // // // // // // // // //             <Tooltip title={viewMode === "column" ? "Vista lista" : "Vista columnas"}>
// // // // // // // // // // //               <motion.div whileHover={{ scale: 1.1 }}>
// // // // // // // // // // //                 <IconButton 
// // // // // // // // // // //                   size="small" 
// // // // // // // // // // //                   onClick={toggleViewMode} 
// // // // // // // // // // //                   color="default"
// // // // // // // // // // //                 >
// // // // // // // // // // //                   {viewMode === "column" ? <ViewListIcon fontSize="small" /> : <ViewColumnIcon fontSize="small" />}
// // // // // // // // // // //                 </IconButton>
// // // // // // // // // // //               </motion.div>
// // // // // // // // // // //             </Tooltip>

// // // // // // // // // // //             {/* Header collapse toggle (mobile only) */}
// // // // // // // // // // //             {isMobile && (
// // // // // // // // // // //               <IconButton size="small" onClick={toggleHeader}>
// // // // // // // // // // //                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
// // // // // // // // // // //               </IconButton>
// // // // // // // // // // //             )}

// // // // // // // // // // //             <Tooltip title="Salir">
// // // // // // // // // // //               <motion.div 
// // // // // // // // // // //                 whileHover={{ scale: 1.1 }} 
// // // // // // // // // // //                 whileTap={{ scale: 0.9 }}
// // // // // // // // // // //                 transition={{ type: 'spring', stiffness: 400, damping: 10 }}
// // // // // // // // // // //               >
// // // // // // // // // // //                 <IconButton
// // // // // // // // // // //                   size="small"
// // // // // // // // // // //                   onClick={handleLogout}
// // // // // // // // // // //                   color="default"
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <LogoutIcon fontSize="small" />
// // // // // // // // // // //                 </IconButton>
// // // // // // // // // // //               </motion.div>
// // // // // // // // // // //             </Tooltip>
// // // // // // // // // // //           </Box>
// // // // // // // // // // //         </Toolbar>
// // // // // // // // // // //       </AppBar>

// // // // // // // // // // //       {/* Main content */}
// // // // // // // // // // //       <Box
// // // // // // // // // // //         component="main"
// // // // // // // // // // //         sx={{
// // // // // // // // // // //           p: { xs: 0.5, sm: 2 },
// // // // // // // // // // //           flex: 1,
// // // // // // // // // // //           overflow: "auto",
// // // // // // // // // // //           display: "flex",
// // // // // // // // // // //           flexDirection: "column",
// // // // // // // // // // //         }}
// // // // // // // // // // //       >
// // // // // // // // // // //         <Paper
// // // // // // // // // // //           elevation={isMobile ? 1 : 3}
// // // // // // // // // // //           sx={{
// // // // // // // // // // //             height: "100%",
// // // // // // // // // // //             display: "flex",
// // // // // // // // // // //             flexDirection: "column",
// // // // // // // // // // //             overflow: "hidden",
// // // // // // // // // // //             borderRadius: { xs: 1, sm: 2 },
// // // // // // // // // // //           }}
// // // // // // // // // // //         >
// // // // // // // // // // //           {/* Status header - collapsible on mobile */}
// // // // // // // // // // //           <motion.div
// // // // // // // // // // //             initial={false}
// // // // // // // // // // //             animate={{
// // // // // // // // // // //               maxHeight: headerCollapsed ? 0 : 200,
// // // // // // // // // // //               opacity: headerCollapsed ? 0 : 1
// // // // // // // // // // //             }}
// // // // // // // // // // //             transition={{ type: 'spring', damping: 25 }}
// // // // // // // // // // //             style={{
// // // // // // // // // // //               display: "flex",
// // // // // // // // // // //               flexDirection: "column",
// // // // // // // // // // //               borderBottom: '1px solid',
// // // // // // // // // // //               borderColor: theme.palette.divider,
// // // // // // // // // // //               overflow: "hidden",
// // // // // // // // // // //             }}
// // // // // // // // // // //           >
// // // // // // // // // // //             {/* Status chips */}
// // // // // // // // // // //             <Box
// // // // // // // // // // //               sx={{
// // // // // // // // // // //                 display: "flex",
// // // // // // // // // // //                 gap: 1,
// // // // // // // // // // //                 flexWrap: "wrap",
// // // // // // // // // // //                 p: { xs: 1, sm: 2 },
// // // // // // // // // // //                 justifyContent: "center",
// // // // // // // // // // //               }}
// // // // // // // // // // //               component={motion.div}
// // // // // // // // // // //               initial="hidden"
// // // // // // // // // // //               animate="visible"
// // // // // // // // // // //               variants={{
// // // // // // // // // // //                 hidden: { opacity: 0 },
// // // // // // // // // // //                 visible: {
// // // // // // // // // // //                   opacity: 1,
// // // // // // // // // // //                   transition: {
// // // // // // // // // // //                     staggerChildren: 0.1
// // // // // // // // // // //                   }
// // // // // // // // // // //                 }
// // // // // // // // // // //               }}
// // // // // // // // // // //             >
// // // // // // // // // // //               <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
// // // // // // // // // // //                 <Chip size="small" color="default" label={`${totalOrders} órdenes`} variant="outlined" />
// // // // // // // // // // //               </motion.div>

// // // // // // // // // // //               {pendingCount > 0 && (
// // // // // // // // // // //                 <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
// // // // // // // // // // //                   <Chip size="small" color="warning" label={`${pendingCount} pendientes`} variant="outlined" />
// // // // // // // // // // //                 </motion.div>
// // // // // // // // // // //               )}

// // // // // // // // // // //               {processingCount > 0 && (
// // // // // // // // // // //                 <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
// // // // // // // // // // //                   <Chip size="small" color="info" label={`${processingCount} en proceso`} variant="outlined" />
// // // // // // // // // // //                 </motion.div>
// // // // // // // // // // //               )}

// // // // // // // // // // //               {completedCount > 0 && (
// // // // // // // // // // //                 <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
// // // // // // // // // // //                   <Chip size="small" color="success" label={`${completedCount} completadas`} variant="outlined" />
// // // // // // // // // // //                 </motion.div>
// // // // // // // // // // //               )}

// // // // // // // // // // //               <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
// // // // // // // // // // //                 <Chip
// // // // // // // // // // //                   size="small"
// // // // // // // // // // //                   color="warning"
// // // // // // // // // // //                   label={`Actualizar Ordenes Viejas`}
// // // // // // // // // // //                   variant="outlined"
// // // // // // // // // // //                   icon={<UpdateIcon />}
// // // // // // // // // // //                   onClick={() => setOpenPendingDialog(true)}
// // // // // // // // // // //                   component={motion.div}
// // // // // // // // // // //                   whileHover={{ scale: 1.05 }}
// // // // // // // // // // //                   whileTap={{ scale: 0.95 }}
// // // // // // // // // // //                 />
// // // // // // // // // // //               </motion.div>
// // // // // // // // // // //             </Box>

// // // // // // // // // // //             {/* Status indicators */}
// // // // // // // // // // //             {(isLoading || isUpdating) && (
// // // // // // // // // // //               <motion.div
// // // // // // // // // // //                 initial={{ opacity: 0, y: -10 }}
// // // // // // // // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // //                 exit={{ opacity: 0, y: -10 }}
// // // // // // // // // // //                 style={{
// // // // // // // // // // //                   display: "flex",
// // // // // // // // // // //                   alignItems: "center",
// // // // // // // // // // //                   gap: 8,
// // // // // // // // // // //                   padding: 8,
// // // // // // // // // // //                   margin: '0 8px 8px',
// // // // // // // // // // //                   backgroundColor: theme.palette.action.hover,
// // // // // // // // // // //                   borderRadius: 4,
// // // // // // // // // // //                 }}
// // // // // // // // // // //               >
// // // // // // // // // // //                 <CircularProgress size={16} />
// // // // // // // // // // //                 <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// // // // // // // // // // //                   {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// // // // // // // // // // //                 </Typography>
// // // // // // // // // // //               </motion.div>
// // // // // // // // // // //             )}
// // // // // // // // // // //           </motion.div>

// // // // // // // // // // //           {/* Error messages */}
// // // // // // // // // // //           <Box
// // // // // // // // // // //             sx={{
// // // // // // // // // // //               px: { xs: 1, sm: 2 },
// // // // // // // // // // //               pt: { xs: 1, sm: 1 },
// // // // // // // // // // //               overflow: "auto",
// // // // // // // // // // //               flexShrink: 0,
// // // // // // // // // // //             }}
// // // // // // // // // // //           >
// // // // // // // // // // //             <AnimatePresence>
// // // // // // // // // // //               {error && (
// // // // // // // // // // //                 <motion.div
// // // // // // // // // // //                   initial={{ opacity: 0, y: -20 }}
// // // // // // // // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // //                   exit={{ opacity: 0, y: -20 }}
// // // // // // // // // // //                   transition={{ type: 'spring' }}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <Alert 
// // // // // // // // // // //                     severity="error" 
// // // // // // // // // // //                     onClose={() => clearMessages()} 
// // // // // // // // // // //                     sx={{ mb: 1 }}
// // // // // // // // // // //                   >
// // // // // // // // // // //                     {error}
// // // // // // // // // // //                   </Alert>
// // // // // // // // // // //                 </motion.div>
// // // // // // // // // // //               )}
// // // // // // // // // // //             </AnimatePresence>

// // // // // // // // // // //             <AnimatePresence>
// // // // // // // // // // //               {successMessage && (
// // // // // // // // // // //                 <motion.div
// // // // // // // // // // //                   initial={{ opacity: 0, y: -20 }}
// // // // // // // // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // //                   exit={{ opacity: 0, y: -20 }}
// // // // // // // // // // //                   transition={{ type: 'spring' }}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <Alert 
// // // // // // // // // // //                     severity="success" 
// // // // // // // // // // //                     onClose={() => clearMessages()} 
// // // // // // // // // // //                     sx={{ mb: 1 }}
// // // // // // // // // // //                   >
// // // // // // // // // // //                     {successMessage}
// // // // // // // // // // //                   </Alert>
// // // // // // // // // // //                 </motion.div>
// // // // // // // // // // //               )}
// // // // // // // // // // //             </AnimatePresence>
// // // // // // // // // // //           </Box>

// // // // // // // // // // //           {/* Main content - takes all available space */}
// // // // // // // // // // //           <Box
// // // // // // // // // // //             sx={{
// // // // // // // // // // //               flex: 1,
// // // // // // // // // // //               overflow: "auto",
// // // // // // // // // // //               display: "flex",
// // // // // // // // // // //               flexDirection: "column",
// // // // // // // // // // //               p: { xs: 1, sm: 2 }
// // // // // // // // // // //             }}
// // // // // // // // // // //           >
// // // // // // // // // // //             <PendingOrdersDialog
// // // // // // // // // // //               open={openPendingDialog}
// // // // // // // // // // //               onClose={() => setOpenPendingDialog(false)}
// // // // // // // // // // //             />

// // // // // // // // // // //             <Grid container spacing={isMobile ? 1 : 3} sx={{ height: '100%' }}>
// // // // // // // // // // //               {viewMode === "column" ? renderOrdersByStatus() : renderOrdersList()}
// // // // // // // // // // //             </Grid>
// // // // // // // // // // //           </Box>
// // // // // // // // // // //         </Paper>

// // // // // // // // // // //         {/* Scroll to top button */}
// // // // // // // // // // //         <Zoom in={trigger}>
// // // // // // // // // // //           <Box
// // // // // // // // // // //             onClick={scrollToTop}
// // // // // // // // // // //             role="presentation"
// // // // // // // // // // //             sx={{
// // // // // // // // // // //               position: 'fixed',
// // // // // // // // // // //               bottom: 16,
// // // // // // // // // // //               right: 16,
// // // // // // // // // // //               zIndex: 1000,
// // // // // // // // // // //             }}
// // // // // // // // // // //           >
// // // // // // // // // // //             <Fab color="primary" size="small" aria-label="scroll back to top">
// // // // // // // // // // //               <KeyboardArrowUp />
// // // // // // // // // // //             </Fab>
// // // // // // // // // // //           </Box>
// // // // // // // // // // //         </Zoom>
// // // // // // // // // // //       </Box>

// // // // // // // // // // //       {/* Edit Order Modal */}
// // // // // // // // // // //       <AnimatePresence>
// // // // // // // // // // //         {isEditModalOpen && selectedOrder && (
// // // // // // // // // // //           <EditOrderModal
// // // // // // // // // // //             open={isEditModalOpen}
// // // // // // // // // // //             order={selectedOrder}
// // // // // // // // // // //             onSave={saveUpdateData}
// // // // // // // // // // //             menuData={{
// // // // // // // // // // //               mainMenu: hojas?.Hoja1 || [],
// // // // // // // // // // //               promotions: hojas?.Promotion || []
// // // // // // // // // // //             }}
// // // // // // // // // // //             onClose={handleCloseEditModal}
// // // // // // // // // // //           />
// // // // // // // // // // //         )}
// // // // // // // // // // //       </AnimatePresence>
// // // // // // // // // // //     </Box>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default OrderSpeedGeneric;


// // // // // // // // // // import React, { useMemo, useState, useEffect } from 'react';
// // // // // // // // // // import { useSelector } from 'react-redux';
// // // // // // // // // // import { RootState } from "../../../store/store";
// // // // // // // // // // import {
// // // // // // // // // //   Box,
// // // // // // // // // //   Button,
// // // // // // // // // //   Chip,
// // // // // // // // // //   CircularProgress,
// // // // // // // // // //   Paper,
// // // // // // // // // //   Typography,
// // // // // // // // // //   Alert,
// // // // // // // // // //   Grid,
// // // // // // // // // //   List,
// // // // // // // // // //   ListItem,
// // // // // // // // // //   ListItemText,
// // // // // // // // // //   Avatar,
// // // // // // // // // //   IconButton,
// // // // // // // // // //   Card,
// // // // // // // // // //   CardContent,
// // // // // // // // // //   Divider,
// // // // // // // // // //   Badge,
// // // // // // // // // //   Tooltip,
// // // // // // // // // //   AppBar,
// // // // // // // // // //   Toolbar,
// // // // // // // // // //   useMediaQuery,
// // // // // // // // // //   useTheme,
// // // // // // // // // //   Stack,
// // // // // // // // // //   useScrollTrigger,
// // // // // // // // // //   Fab,
// // // // // // // // // //   Zoom,
// // // // // // // // // //   TextField,
// // // // // // // // // //   InputAdornment,
// // // // // // // // // //   Pagination,
// // // // // // // // // //   Tabs,
// // // // // // // // // //   Tab
// // // // // // // // // // } from '@mui/material';
// // // // // // // // // // import {
// // // // // // // // // //   Edit as EditIcon,
// // // // // // // // // //   Refresh as RefreshIcon,
// // // // // // // // // //   ExpandMore as ExpandMoreIcon,
// // // // // // // // // //   ExpandLess as ExpandLessIcon,
// // // // // // // // // //   CheckCircle as CheckCircleIcon,
// // // // // // // // // //   PauseCircle as PauseCircleIcon,
// // // // // // // // // //   Cancel as CancelIcon,
// // // // // // // // // //   DeliveryDining as DeliveryIcon,
// // // // // // // // // //   PlayArrow,
// // // // // // // // // //   Pause,
// // // // // // // // // //   ViewList as ViewListIcon,
// // // // // // // // // //   ViewColumn as ViewColumnIcon,
// // // // // // // // // //   Logout as LogoutIcon,
// // // // // // // // // //   Update as UpdateIcon,
// // // // // // // // // //   AccessTime,
// // // // // // // // // //   Person,
// // // // // // // // // //   KeyboardArrowUp,
// // // // // // // // // //   Search as SearchIcon,
// // // // // // // // // //   Clear as ClearIcon
// // // // // // // // // // } from '@mui/icons-material';
// // // // // // // // // // import { useOrdersManagementSocketApi } from '../../../hooks/useOrdersManagementSocketApi';
// // // // // // // // // // import EditOrderModal from '../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal';
// // // // // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // // // // import Image from "next/image";
// // // // // // // // // // import { clearLocalhostStorage } from "@/services/localstorage.services";
// // // // // // // // // // import { recordAttendance } from "@/services/attendance.services";
// // // // // // // // // // import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog";

// // // // // // // // // // // Status configuration
// // // // // // // // // // const statusConfig = {
// // // // // // // // // //   pending: {
// // // // // // // // // //     color: "default",
// // // // // // // // // //     icon: <PauseCircleIcon color="disabled" />,
// // // // // // // // // //     label: "Pendientes",
// // // // // // // // // //     actions: [
// // // // // // // // // //       { action: 'start', label: 'Iniciar', color: 'primary', icon: <PlayArrow /> }
// // // // // // // // // //     ]
// // // // // // // // // //   },
// // // // // // // // // //   processing: {
// // // // // // // // // //     color: "primary",
// // // // // // // // // //     icon: <PlayArrow color="primary" />,
// // // // // // // // // //     label: "En Proceso",
// // // // // // // // // //     actions: [
// // // // // // // // // //       { action: 'pause', label: 'Pausar', color: 'warning', icon: <Pause /> },
// // // // // // // // // //       { action: 'complete', label: 'Completar', color: 'success', icon: <CheckCircleIcon /> }
// // // // // // // // // //     ]
// // // // // // // // // //   },
// // // // // // // // // //   paused: {
// // // // // // // // // //     color: "warning",
// // // // // // // // // //     icon: <Pause color="warning" />,
// // // // // // // // // //     label: "Pausadas",
// // // // // // // // // //     actions: [
// // // // // // // // // //       { action: 'resume', label: 'Reanudar', color: 'primary', icon: <PlayArrow /> },
// // // // // // // // // //       { action: 'complete', label: 'Completar', color: 'success', icon: <CheckCircleIcon /> }
// // // // // // // // // //     ]
// // // // // // // // // //   },
// // // // // // // // // //   finished: {
// // // // // // // // // //     color: "success",
// // // // // // // // // //     icon: <CheckCircleIcon color="success" />,
// // // // // // // // // //     label: "Terminadas",
// // // // // // // // // //     actions: [
// // // // // // // // // //       { action: 'deliver', label: 'Entregar', color: 'success', icon: <DeliveryIcon /> }
// // // // // // // // // //     ]
// // // // // // // // // //   },
// // // // // // // // // //   cancelled: {
// // // // // // // // // //     color: "error",
// // // // // // // // // //     icon: <CancelIcon color="error" />,
// // // // // // // // // //     label: "Canceladas",
// // // // // // // // // //     actions: [
// // // // // // // // // //       { action: 'reopen', label: 'Reabrir', color: 'primary', icon: <PlayArrow /> }
// // // // // // // // // //     ]
// // // // // // // // // //   },
// // // // // // // // // //   delivered: {
// // // // // // // // // //     color: "success",
// // // // // // // // // //     icon: <DeliveryIcon color="success" />,
// // // // // // // // // //     label: "Entregadas",
// // // // // // // // // //     actions: []
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // const statusOptions = Object.keys(statusConfig);

// // // // // // // // // // const OrderSpeedGeneric = () => {
// // // // // // // // // //   const theme = useTheme();
// // // // // // // // // //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// // // // // // // // // //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile);
// // // // // // // // // //   const [displayTitle, setDisplayTitle] = useState(false);
// // // // // // // // // //   const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column");
// // // // // // // // // //   const [openPendingDialog, setOpenPendingDialog] = useState(false);
// // // // // // // // // //   const [selectedOrder, setSelectedOrder] = useState<any>(null);
// // // // // // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // // // // // // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // // // // // // //   const [activeStatus, setActiveStatus] = useState("all");
// // // // // // // // // //   const [currentPages, setCurrentPages] = useState<Record<string, number>>(
// // // // // // // // // //     statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 })
// // // // // // // // // //   );
// // // // // // // // // //   const ordersPerPage = isMobile ? 5 : 10;

// // // // // // // // // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any });
// // // // // // // // // //   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } };

// // // // // // // // // //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email");

// // // // // // // // // //   const {
// // // // // // // // // //     allOrders,
// // // // // // // // // //     ordersByStatus,
// // // // // // // // // //     isConnected,
// // // // // // // // // //     isLoading,
// // // // // // // // // //     isUpdating,
// // // // // // // // // //     error,
// // // // // // // // // //     successMessage,
// // // // // // // // // //     lastRefresh,
// // // // // // // // // //     fetchHistoricalOrders,
// // // // // // // // // //     handleOrderAction,
// // // // // // // // // //     updateOrder,
// // // // // // // // // //     clearMessages
// // // // // // // // // //   } = useOrdersManagementSocketApi({
// // // // // // // // // //     companyName: data?.companyName || "LlakaScript",
// // // // // // // // // //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// // // // // // // // // //     orderLimit: 50
// // // // // // // // // //   });

// // // // // // // // // //   // Calculate totals
// // // // // // // // // //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0);
// // // // // // // // // //   const pendingCount = ordersByStatus.pending?.length || 0;
// // // // // // // // // //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0);
// // // // // // // // // //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0);

// // // // // // // // // //   // Filter and search orders
// // // // // // // // // //   const filteredOrders = useMemo(() => {
// // // // // // // // // //     let filtered = [...allOrders];

// // // // // // // // // //     // Filter by status
// // // // // // // // // //     if (activeStatus !== "all") {
// // // // // // // // // //       filtered = filtered.filter(order => order.status === activeStatus);
// // // // // // // // // //     }

// // // // // // // // // //     // Search filter
// // // // // // // // // //     if (searchQuery) {
// // // // // // // // // //       const query = searchQuery.toLowerCase();
// // // // // // // // // //       filtered = filtered.filter(order => {
// // // // // // // // // //         return (
// // // // // // // // // //           order.fullname?.toLowerCase().includes(query) ||
// // // // // // // // // //           order.id?.toString().includes(query) ||
// // // // // // // // // //           order._id?.toString().includes(query) ||
// // // // // // // // // //           order.orderType?.toLowerCase().includes(query) ||
// // // // // // // // // //           order.cart.some((item: any) => 
// // // // // // // // // //             item.name.toLowerCase().includes(query) ||
// // // // // // // // // //             item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query))
// // // // // // // // // //           )
// // // // // // // // // //         );
// // // // // // // // // //       });
// // // // // // // // // //     }

// // // // // // // // // //     // Sort by date (newest first)
// // // // // // // // // //     return filtered.sort((a, b) => {
// // // // // // // // // //       const dateA = new Date(a.createdAt || a.timestamp || 0);
// // // // // // // // // //       const dateB = new Date(b.createdAt || b.timestamp || 0);
// // // // // // // // // //       return dateB.getTime() - dateA.getTime();
// // // // // // // // // //     });
// // // // // // // // // //   }, [allOrders, activeStatus, searchQuery]);

// // // // // // // // // //   // Paginate orders
// // // // // // // // // //   const paginatedOrders = useMemo(() => {
// // // // // // // // // //     const startIndex = (currentPages[activeStatus] - 1) * ordersPerPage;
// // // // // // // // // //     return filteredOrders.slice(startIndex, startIndex + ordersPerPage);
// // // // // // // // // //   }, [filteredOrders, currentPages, activeStatus, ordersPerPage]);

// // // // // // // // // //   // Calculate page count for current status
// // // // // // // // // //   const pageCount = Math.ceil(filteredOrders.length / ordersPerPage);

// // // // // // // // // //   // Handle page change
// // // // // // // // // //   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
// // // // // // // // // //     setCurrentPages(prev => ({
// // // // // // // // // //       ...prev,
// // // // // // // // // //       [activeStatus]: value
// // // // // // // // // //     }));
// // // // // // // // // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // // // // // // // // //   };

// // // // // // // // // //   // Toggle functions
// // // // // // // // // //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed);
// // // // // // // // // //   const toggleViewMode = () => setViewMode(viewMode === "column" ? "list" : "column");

// // // // // // // // // //   // Action handlers
// // // // // // // // // //   const handleLogout = async () => {
// // // // // // // // // //     clearLocalhostStorage();
// // // // // // // // // //     await recordAttendance('getOut', user?.user?.email, data?.companyName);
// // // // // // // // // //     window.location.reload();
// // // // // // // // // //   };

// // // // // // // // // //   const handleOpenEditModal = (order: any) => {
// // // // // // // // // //     setSelectedOrder(order);
// // // // // // // // // //     setIsEditModalOpen(true);
// // // // // // // // // //   };

// // // // // // // // // //   const handleCloseEditModal = () => {
// // // // // // // // // //     setIsEditModalOpen(false);
// // // // // // // // // //     setSelectedOrder(null);
// // // // // // // // // //   };

// // // // // // // // // //   const saveUpdateData = async (updatedOrder: any) => {
// // // // // // // // // //     try {
// // // // // // // // // //       await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder);
// // // // // // // // // //       handleCloseEditModal();
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Failed to update order:", error);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
// // // // // // // // // //     setActiveStatus(newValue);
// // // // // // // // // //     setCurrentPages(prev => ({
// // // // // // // // // //       ...prev,
// // // // // // // // // //       [newValue]: 1
// // // // // // // // // //     }));
// // // // // // // // // //   };

// // // // // // // // // //   const clearSearch = () => {
// // // // // // // // // //     setSearchQuery("");
// // // // // // // // // //   };

// // // // // // // // // //   // Effects
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const interval = setInterval(() => {
// // // // // // // // // //       setDisplayTitle((prev) => !prev);
// // // // // // // // // //     }, 5000);
// // // // // // // // // //     return () => clearInterval(interval);
// // // // // // // // // //   }, []);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     setViewMode(isMobile ? "list" : "column");
// // // // // // // // // //   }, [isMobile]);

// // // // // // // // // //   // Scroll to top button logic
// // // // // // // // // //   const trigger = useScrollTrigger({
// // // // // // // // // //     threshold: 100,
// // // // // // // // // //   });

// // // // // // // // // //   const scrollToTop = () => {
// // // // // // // // // //     window.scrollTo({
// // // // // // // // // //       top: 0,
// // // // // // // // // //       behavior: 'smooth',
// // // // // // // // // //     });
// // // // // // // // // //   };

// // // // // // // // // //   // Order Card Component
// // // // // // // // // //   const OrderCard = React.memo(({ order }: { order: any }) => {
// // // // // // // // // //     const status = order.status;
// // // // // // // // // //     const config = statusConfig[status as keyof typeof statusConfig];
// // // // // // // // // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0);
// // // // // // // // // //     const total = order.cart.reduce((sum: any, item: any) => {
// // // // // // // // // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0;
// // // // // // // // // //       return sum + item.price * item.quantity + extrasTotal;
// // // // // // // // // //     }, 0);

// // // // // // // // // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // // // // // // //       hour: "2-digit",
// // // // // // // // // //       minute: "2-digit",
// // // // // // // // // //     });

// // // // // // // // // //     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette];

// // // // // // // // // //     return (
// // // // // // // // // //       <Card 
// // // // // // // // // //         sx={{ 
// // // // // // // // // //           borderLeft: '4px solid', 
// // // // // // // // // //           borderColor: paletteColor?.main || 'grey',
// // // // // // // // // //           mb: 2,
// // // // // // // // // //           position: 'relative',
// // // // // // // // // //           transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
// // // // // // // // // //           '&:hover': {
// // // // // // // // // //             transform: isMobile ? 'none' : 'translateY(-2px)',
// // // // // // // // // //             boxShadow: isMobile ? 'none' : theme.shadows[4]
// // // // // // // // // //           }
// // // // // // // // // //         }}
// // // // // // // // // //         component={motion.div}
// // // // // // // // // //         initial={{ opacity: 0, y: 10 }}
// // // // // // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // // // // // //         transition={{ duration: 0.2 }}
// // // // // // // // // //         exit={{ opacity: 0 }}
// // // // // // // // // //         layout
// // // // // // // // // //       >
// // // // // // // // // //         <CardContent>
// // // // // // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
// // // // // // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // // // // // //               #{order.id || order._id.slice(-4)}
// // // // // // // // // //             </Typography>
// // // // // // // // // //             <Chip
// // // // // // // // // //               size="small"
// // // // // // // // // //               label={order.orderType}
// // // // // // // // // //               color={config.color as any}
// // // // // // // // // //               icon={config.icon}
// // // // // // // // // //             />
// // // // // // // // // //           </Box>

// // // // // // // // // //           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
// // // // // // // // // //             <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // // // //             <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // // // // // //               {order.fullname}
// // // // // // // // // //             </Typography>
// // // // // // // // // //             <Box sx={{ flexGrow: 1 }} />
// // // // // // // // // //             <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // // // //             <Typography variant="body2">{formattedTime}</Typography>
// // // // // // // // // //           </Box>

// // // // // // // // // //           <Divider sx={{ my: 1 }} />

// // // // // // // // // //           <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
// // // // // // // // // //             Items ({totalItems})
// // // // // // // // // //           </Typography>

// // // // // // // // // //           <List dense disablePadding>
// // // // // // // // // //             {order.cart.slice(0, isMobile ? 2 : undefined).map((item: any) => (
// // // // // // // // // //               <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.25 }}>
// // // // // // // // // //                 <ListItemText
// // // // // // // // // //                   primary={
// // // // // // // // // //                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // // // //                       <Typography variant="body2">
// // // // // // // // // //                         <strong>{item.quantity}x</strong> {item.name}
// // // // // // // // // //                       </Typography>
// // // // // // // // // //                       <Typography variant="body2" sx={{ ml: 1 }}>
// // // // // // // // // //                         ${item.price.toFixed(2)}
// // // // // // // // // //                       </Typography>
// // // // // // // // // //                     </Box>
// // // // // // // // // //                   }
// // // // // // // // // //                   secondary={
// // // // // // // // // //                     item.extras?.length > 0 && (
// // // // // // // // // //                       <List dense disablePadding sx={{ ml: 2 }}>
// // // // // // // // // //                         {item.extras.slice(0, isMobile ? 1 : undefined).map((extra: any, idx: number) => (
// // // // // // // // // //                           <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0 }}>
// // // // // // // // // //                             <ListItemText
// // // // // // // // // //                               primary={
// // // // // // // // // //                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // // // //                                   <Typography variant="caption">+ {extra.name}</Typography>
// // // // // // // // // //                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // // // // // // // //                                 </Box>
// // // // // // // // // //                               }
// // // // // // // // // //                             />
// // // // // // // // // //                           </ListItem>
// // // // // // // // // //                         ))}
// // // // // // // // // //                       </List>
// // // // // // // // // //                     )
// // // // // // // // // //                   }
// // // // // // // // // //                 />
// // // // // // // // // //               </ListItem>
// // // // // // // // // //             ))}
// // // // // // // // // //             {isMobile && order.cart.length > 2 && (
// // // // // // // // // //               <Typography variant="caption" color="text.secondary">
// // // // // // // // // //                 +{order.cart.length - 2} más...
// // // // // // // // // //               </Typography>
// // // // // // // // // //             )}
// // // // // // // // // //           </List>

// // // // // // // // // //           <Divider sx={{ my: 1 }} />

// // // // // // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // // // // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // // // // // //               Total: ${total.toFixed(2)}
// // // // // // // // // //             </Typography>

// // // // // // // // // //             {!isMobile && (
// // // // // // // // // //               <Stack direction="row" spacing={1}>
// // // // // // // // // //                 {config.actions.map((action: any, idx: number) => (
// // // // // // // // // //                   <Button
// // // // // // // // // //                     key={`${action.action}-${idx}`}
// // // // // // // // // //                     size="small"
// // // // // // // // // //                     variant="contained"
// // // // // // // // // //                     color={action.color as any}
// // // // // // // // // //                     startIcon={action.icon}
// // // // // // // // // //                     onClick={(e) => {
// // // // // // // // // //                       e.stopPropagation();
// // // // // // // // // //                       handleOrderAction(action.action, order);
// // // // // // // // // //                     }}
// // // // // // // // // //                     disabled={isUpdating}
// // // // // // // // // //                   >
// // // // // // // // // //                     {action.label}
// // // // // // // // // //                   </Button>
// // // // // // // // // //                 ))}

// // // // // // // // // //                 <Button
// // // // // // // // // //                   size="small"
// // // // // // // // // //                   variant="outlined"
// // // // // // // // // //                   color="primary"
// // // // // // // // // //                   startIcon={<EditIcon />}
// // // // // // // // // //                   onClick={(e) => {
// // // // // // // // // //                     e.stopPropagation();
// // // // // // // // // //                     handleOpenEditModal(order);
// // // // // // // // // //                   }}
// // // // // // // // // //                   disabled={isUpdating}
// // // // // // // // // //                 >
// // // // // // // // // //                   Editar
// // // // // // // // // //                 </Button>
// // // // // // // // // //               </Stack>
// // // // // // // // // //             )}
// // // // // // // // // //           </Box>

// // // // // // // // // //           {isMobile && (
// // // // // // // // // //             <Box sx={{ mt: 1 }}>
// // // // // // // // // //               <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
// // // // // // // // // //                 {config.actions.slice(0, 2).map((action: any, idx: number) => (
// // // // // // // // // //                   <Button
// // // // // // // // // //                     key={`mobile-${action.action}-${idx}`}
// // // // // // // // // //                     size="small"
// // // // // // // // // //                     variant="contained"
// // // // // // // // // //                     color={action.color as any}
// // // // // // // // // //                     startIcon={action.icon}
// // // // // // // // // //                     onClick={(e) => {
// // // // // // // // // //                       e.stopPropagation();
// // // // // // // // // //                       handleOrderAction(action.action, order);
// // // // // // // // // //                     }}
// // // // // // // // // //                     disabled={isUpdating}
// // // // // // // // // //                     sx={{ mb: 1 }}
// // // // // // // // // //                   >
// // // // // // // // // //                     {action.label}
// // // // // // // // // //                   </Button>
// // // // // // // // // //                 ))}

// // // // // // // // // //                 <Button
// // // // // // // // // //                   size="small"
// // // // // // // // // //                   variant="outlined"
// // // // // // // // // //                   color="primary"
// // // // // // // // // //                   startIcon={<EditIcon />}
// // // // // // // // // //                   onClick={(e) => {
// // // // // // // // // //                     e.stopPropagation();
// // // // // // // // // //                     handleOpenEditModal(order);
// // // // // // // // // //                   }}
// // // // // // // // // //                   disabled={isUpdating}
// // // // // // // // // //                   sx={{ mb: 1 }}
// // // // // // // // // //                 >
// // // // // // // // // //                   Editar
// // // // // // // // // //                 </Button>

// // // // // // // // // //                 {config.actions.length > 2 && (
// // // // // // // // // //                   <Button
// // // // // // // // // //                     size="small"
// // // // // // // // // //                     variant="outlined"
// // // // // // // // // //                     color="secondary"
// // // // // // // // // //                     onClick={(e) => {
// // // // // // // // // //                       e.stopPropagation();
// // // // // // // // // //                       handleOpenEditModal(order);
// // // // // // // // // //                     }}
// // // // // // // // // //                     disabled={isUpdating}
// // // // // // // // // //                     sx={{ mb: 1 }}
// // // // // // // // // //                   >
// // // // // // // // // //                     Más acciones
// // // // // // // // // //                   </Button>
// // // // // // // // // //                 )}
// // // // // // // // // //               </Stack>
// // // // // // // // // //             </Box>
// // // // // // // // // //           )}
// // // // // // // // // //         </CardContent>
// // // // // // // // // //       </Card>
// // // // // // // // // //     );
// // // // // // // // // //   });

// // // // // // // // // //   // Main render
// // // // // // // // // //   return (
// // // // // // // // // //     <Box sx={{ 
// // // // // // // // // //       height: "100vh", 
// // // // // // // // // //       overflow: "hidden", 
// // // // // // // // // //       bgcolor: theme.palette.background.default,
// // // // // // // // // //       display: "flex", 
// // // // // // // // // //       flexDirection: "column" 
// // // // // // // // // //     }}>
// // // // // // // // // //       {/* Custom AppBar */}
// // // // // // // // // //       <AppBar
// // // // // // // // // //         position="sticky"
// // // // // // // // // //         elevation={0}
// // // // // // // // // //         sx={{
// // // // // // // // // //           bgcolor: "background.paper",
// // // // // // // // // //           color: "text.primary",
// // // // // // // // // //           borderBottom: 1,
// // // // // // // // // //           borderColor: "divider",
// // // // // // // // // //         }}
// // // // // // // // // //       >
// // // // // // // // // //         <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
// // // // // // // // // //           {/* Logo and Title */}
// // // // // // // // // //           <Box
// // // // // // // // // //             sx={{
// // // // // // // // // //               display: "flex",
// // // // // // // // // //               alignItems: "center",
// // // // // // // // // //               gap: 1,
// // // // // // // // // //               flexGrow: 1,
// // // // // // // // // //               height: "40px",
// // // // // // // // // //               position: "relative",
// // // // // // // // // //               overflow: "hidden",
// // // // // // // // // //             }}
// // // // // // // // // //           >
// // // // // // // // // //             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // // // // // // // // //               <Avatar
// // // // // // // // // //                 sx={{
// // // // // // // // // //                   width: 28,
// // // // // // // // // //                   height: 28,
// // // // // // // // // //                   flexShrink: 0,
// // // // // // // // // //                   ml: 0.5,
// // // // // // // // // //                 }}
// // // // // // // // // //               >
// // // // // // // // // //                 <Image
// // // // // // // // // //                   src={"/images/flama.png"}
// // // // // // // // // //                   alt={"LlakaScript"}
// // // // // // // // // //                   width={28}
// // // // // // // // // //                   height={28}
// // // // // // // // // //                   priority
// // // // // // // // // //                   style={{
// // // // // // // // // //                     objectFit: "contain",
// // // // // // // // // //                     width: "100%",
// // // // // // // // // //                     height: "100%",
// // // // // // // // // //                   }}
// // // // // // // // // //                 />
// // // // // // // // // //               </Avatar>
// // // // // // // // // //             </motion.div>

// // // // // // // // // //             <Box
// // // // // // // // // //               sx={{
// // // // // // // // // //                 position: "relative",
// // // // // // // // // //                 width: "auto",
// // // // // // // // // //                 height: "100%",
// // // // // // // // // //                 display: "flex",
// // // // // // // // // //                 alignItems: "center",
// // // // // // // // // //                 flexGrow: 1,
// // // // // // // // // //               }}
// // // // // // // // // //             >
// // // // // // // // // //               <AnimatePresence mode="wait">
// // // // // // // // // //                 <motion.div
// // // // // // // // // //                   key={displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // // // // // //                   initial={{ opacity: 0, x: -10 }}
// // // // // // // // // //                   animate={{ opacity: 1, x: 0 }}
// // // // // // // // // //                   exit={{ opacity: 0, x: 10 }}
// // // // // // // // // //                   transition={{ duration: 0.3 }}
// // // // // // // // // //                   style={{
// // // // // // // // // //                     position: "absolute",
// // // // // // // // // //                     left: 0,
// // // // // // // // // //                     whiteSpace: "nowrap",
// // // // // // // // // //                   }}
// // // // // // // // // //                 >
// // // // // // // // // //                   <Typography
// // // // // // // // // //                     variant={isMobile ? "subtitle1" : "h6"}
// // // // // // // // // //                     sx={{
// // // // // // // // // //                       fontWeight: 600,
// // // // // // // // // //                       lineHeight: 1.1,
// // // // // // // // // //                       fontSize: isMobile ? "1rem" : undefined,
// // // // // // // // // //                     }}
// // // // // // // // // //                   >
// // // // // // // // // //                     {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // // // // // //                   </Typography>
// // // // // // // // // //                 </motion.div>
// // // // // // // // // //               </AnimatePresence>
// // // // // // // // // //             </Box>
// // // // // // // // // //           </Box>

// // // // // // // // // //           {/* Right side controls */}
// // // // // // // // // //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// // // // // // // // // //             {/* Connection status indicator */}
// // // // // // // // // //             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
// // // // // // // // // //               <motion.div
// // // // // // // // // //                 animate={{
// // // // // // // // // //                   scale: isConnected ? [1, 1.2, 1] : 1,
// // // // // // // // // //                   transition: isConnected ? { repeat: Infinity, duration: 2 } : {}
// // // // // // // // // //                 }}
// // // // // // // // // //               >
// // // // // // // // // //                 <Box
// // // // // // // // // //                   sx={{
// // // // // // // // // //                     width: 10,
// // // // // // // // // //                     height: 10,
// // // // // // // // // //                     borderRadius: '50%',
// // // // // // // // // //                     bgcolor: isConnected ? 'success.main' : 'error.main',
// // // // // // // // // //                     mr: 1,
// // // // // // // // // //                   }}
// // // // // // // // // //                 />
// // // // // // // // // //               </motion.div>
// // // // // // // // // //             </Tooltip>

// // // // // // // // // //             {/* Order count badge */}
// // // // // // // // // //             {isMobile && totalOrders > 0 && (
// // // // // // // // // //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// // // // // // // // // //                 <Box sx={{ width: 4, height: 4 }} />
// // // // // // // // // //               </Badge>
// // // // // // // // // //             )}

// // // // // // // // // //             {/* Last refresh time */}
// // // // // // // // // //             {lastRefresh && !isMobile && (
// // // // // // // // // //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// // // // // // // // // //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// // // // // // // // // //               </Typography>
// // // // // // // // // //             )}

// // // // // // // // // //             {/* Refresh button */}
// // // // // // // // // //             <Tooltip title="Actualizar">
// // // // // // // // // //               <motion.div whileHover={{ rotate: 90 }} transition={{ type: 'spring' }}>
// // // // // // // // // //                 <IconButton
// // // // // // // // // //                   color="primary"
// // // // // // // // // //                   size="small"
// // // // // // // // // //                   onClick={fetchHistoricalOrders}
// // // // // // // // // //                   disabled={isLoading || isUpdating}
// // // // // // // // // //                 >
// // // // // // // // // //                   <RefreshIcon fontSize="small" />
// // // // // // // // // //                 </IconButton>
// // // // // // // // // //               </motion.div>
// // // // // // // // // //             </Tooltip>

// // // // // // // // // //             {/* View mode toggle */}
// // // // // // // // // //             <Tooltip title={viewMode === "column" ? "Vista lista" : "Vista columnas"}>
// // // // // // // // // //               <motion.div whileHover={{ scale: 1.1 }}>
// // // // // // // // // //                 <IconButton 
// // // // // // // // // //                   size="small" 
// // // // // // // // // //                   onClick={toggleViewMode} 
// // // // // // // // // //                   color="default"
// // // // // // // // // //                 >
// // // // // // // // // //                   {viewMode === "column" ? <ViewListIcon fontSize="small" /> : <ViewColumnIcon fontSize="small" />}
// // // // // // // // // //                 </IconButton>
// // // // // // // // // //               </motion.div>
// // // // // // // // // //             </Tooltip>

// // // // // // // // // //             {/* Header collapse toggle (mobile only) */}
// // // // // // // // // //             {isMobile && (
// // // // // // // // // //               <IconButton size="small" onClick={toggleHeader}>
// // // // // // // // // //                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
// // // // // // // // // //               </IconButton>
// // // // // // // // // //             )}

// // // // // // // // // //             <Tooltip title="Salir">
// // // // // // // // // //               <motion.div 
// // // // // // // // // //                 whileHover={{ scale: 1.1 }} 
// // // // // // // // // //                 whileTap={{ scale: 0.9 }}
// // // // // // // // // //                 transition={{ type: 'spring', stiffness: 400, damping: 10 }}
// // // // // // // // // //               >
// // // // // // // // // //                 <IconButton
// // // // // // // // // //                   size="small"
// // // // // // // // // //                   onClick={handleLogout}
// // // // // // // // // //                   color="default"
// // // // // // // // // //                 >
// // // // // // // // // //                   <LogoutIcon fontSize="small" />
// // // // // // // // // //                 </IconButton>
// // // // // // // // // //               </motion.div>
// // // // // // // // // //             </Tooltip>
// // // // // // // // // //           </Box>
// // // // // // // // // //         </Toolbar>
// // // // // // // // // //       </AppBar>

// // // // // // // // // //       {/* Main content */}
// // // // // // // // // //       <Box
// // // // // // // // // //         component="main"
// // // // // // // // // //         sx={{
// // // // // // // // // //           p: { xs: 0.5, sm: 2 },
// // // // // // // // // //           flex: 1,
// // // // // // // // // //           overflow: "auto",
// // // // // // // // // //           display: "flex",
// // // // // // // // // //           flexDirection: "column",
// // // // // // // // // //         }}
// // // // // // // // // //       >
// // // // // // // // // //         <Paper
// // // // // // // // // //           elevation={isMobile ? 1 : 3}
// // // // // // // // // //           sx={{
// // // // // // // // // //             height: "100%",
// // // // // // // // // //             display: "flex",
// // // // // // // // // //             flexDirection: "column",
// // // // // // // // // //             overflow: "hidden",
// // // // // // // // // //             borderRadius: { xs: 1, sm: 2 },
// // // // // // // // // //           }}
// // // // // // // // // //         >
// // // // // // // // // //           {/* Status header - collapsible on mobile */}
// // // // // // // // // //           <motion.div
// // // // // // // // // //             initial={false}
// // // // // // // // // //             animate={{
// // // // // // // // // //               height: headerCollapsed ? 0 : 'auto',
// // // // // // // // // //               opacity: headerCollapsed ? 0 : 1
// // // // // // // // // //             }}
// // // // // // // // // //             transition={{ type: 'spring', damping: 25 }}
// // // // // // // // // //             style={{
// // // // // // // // // //               display: "flex",
// // // // // // // // // //               flexDirection: "column",
// // // // // // // // // //               borderBottom: '1px solid',
// // // // // // // // // //               borderColor: theme.palette.divider,
// // // // // // // // // //               overflow: "hidden",
// // // // // // // // // //             }}
// // // // // // // // // //           >
// // // // // // // // // //             {/* Search bar */}
// // // // // // // // // //             <Box sx={{ p: 2, pb: 0 }}>
// // // // // // // // // //               <TextField
// // // // // // // // // //                 fullWidth
// // // // // // // // // //                 variant="outlined"
// // // // // // // // // //                 placeholder="Buscar órdenes..."
// // // // // // // // // //                 value={searchQuery}
// // // // // // // // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // // // // // // // //                 InputProps={{
// // // // // // // // // //                   startAdornment: (
// // // // // // // // // //                     <InputAdornment position="start">
// // // // // // // // // //                       <SearchIcon />
// // // // // // // // // //                     </InputAdornment>
// // // // // // // // // //                   ),
// // // // // // // // // //                   endAdornment: searchQuery && (
// // // // // // // // // //                     <InputAdornment position="end">
// // // // // // // // // //                       <IconButton onClick={clearSearch} size="small">
// // // // // // // // // //                         <ClearIcon fontSize="small" />
// // // // // // // // // //                       </IconButton>
// // // // // // // // // //                     </InputAdornment>
// // // // // // // // // //                   ),
// // // // // // // // // //                 }}
// // // // // // // // // //               />
// // // // // // // // // //             </Box>

// // // // // // // // // //             {/* Status tabs */}
// // // // // // // // // //             <Box sx={{ px: 2, pt: 1 }}>
// // // // // // // // // //               <Tabs
// // // // // // // // // //                 value={activeStatus}
// // // // // // // // // //                 onChange={handleStatusChange}
// // // // // // // // // //                 variant="scrollable"
// // // // // // // // // //                 scrollButtons="auto"
// // // // // // // // // //                 allowScrollButtonsMobile
// // // // // // // // // //               >
// // // // // // // // // //                 <Tab label="Todas" value="all" />
// // // // // // // // // //                 {statusOptions.map(status => (
// // // // // // // // // //                   <Tab 
// // // // // // // // // //                     key={status}
// // // // // // // // // //                     label={statusConfig[status as keyof typeof statusConfig].label}
// // // // // // // // // //                     value={status}
// // // // // // // // // //                     icon={statusConfig[status as keyof typeof statusConfig].icon}
// // // // // // // // // //                     iconPosition="start"
// // // // // // // // // //                   />
// // // // // // // // // //                 ))}
// // // // // // // // // //               </Tabs>
// // // // // // // // // //             </Box>

// // // // // // // // // //             {/* Status indicators */}
// // // // // // // // // //             {(isLoading || isUpdating) && (
// // // // // // // // // //               <Box
// // // // // // // // // //                 sx={{
// // // // // // // // // //                   display: "flex",
// // // // // // // // // //                   alignItems: "center",
// // // // // // // // // //                   gap: 1,
// // // // // // // // // //                   p: 1,
// // // // // // // // // //                   mx: 1,
// // // // // // // // // //                   mb: 1,
// // // // // // // // // //                   backgroundColor: theme.palette.action.hover,
// // // // // // // // // //                   borderRadius: 1,
// // // // // // // // // //                 }}
// // // // // // // // // //               >
// // // // // // // // // //                 <CircularProgress size={16} />
// // // // // // // // // //                 <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// // // // // // // // // //                   {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// // // // // // // // // //                 </Typography>
// // // // // // // // // //               </Box>
// // // // // // // // // //             )}
// // // // // // // // // //           </motion.div>

// // // // // // // // // //           {/* Error messages */}
// // // // // // // // // //           <Box
// // // // // // // // // //             sx={{
// // // // // // // // // //               px: { xs: 1, sm: 2 },
// // // // // // // // // //               pt: { xs: 1, sm: 1 },
// // // // // // // // // //               overflow: "auto",
// // // // // // // // // //               flexShrink: 0,
// // // // // // // // // //             }}
// // // // // // // // // //           >
// // // // // // // // // //             <AnimatePresence>
// // // // // // // // // //               {error && (
// // // // // // // // // //                 <motion.div
// // // // // // // // // //                   initial={{ opacity: 0, y: -20 }}
// // // // // // // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // // // // // // //                   exit={{ opacity: 0, y: -20 }}
// // // // // // // // // //                   transition={{ type: 'spring' }}
// // // // // // // // // //                 >
// // // // // // // // // //                   <Alert 
// // // // // // // // // //                     severity="error" 
// // // // // // // // // //                     onClose={() => clearMessages()} 
// // // // // // // // // //                     sx={{ mb: 1 }}
// // // // // // // // // //                   >
// // // // // // // // // //                     {error}
// // // // // // // // // //                   </Alert>
// // // // // // // // // //                 </motion.div>
// // // // // // // // // //               )}
// // // // // // // // // //             </AnimatePresence>

// // // // // // // // // //             <AnimatePresence>
// // // // // // // // // //               {successMessage && (
// // // // // // // // // //                 <motion.div
// // // // // // // // // //                   initial={{ opacity: 0, y: -20 }}
// // // // // // // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // // // // // // //                   exit={{ opacity: 0, y: -20 }}
// // // // // // // // // //                   transition={{ type: 'spring' }}
// // // // // // // // // //                 >
// // // // // // // // // //                   <Alert 
// // // // // // // // // //                     severity="success" 
// // // // // // // // // //                     onClose={() => clearMessages()} 
// // // // // // // // // //                     sx={{ mb: 1 }}
// // // // // // // // // //                   >
// // // // // // // // // //                     {successMessage}
// // // // // // // // // //                   </Alert>
// // // // // // // // // //                 </motion.div>
// // // // // // // // // //               )}
// // // // // // // // // //             </AnimatePresence>
// // // // // // // // // //           </Box>

// // // // // // // // // //           {/* Main content - takes all available space */}
// // // // // // // // // //           <Box
// // // // // // // // // //             sx={{
// // // // // // // // // //               flex: 1,
// // // // // // // // // //               overflow: "auto",
// // // // // // // // // //               display: "flex",
// // // // // // // // // //               flexDirection: "column",
// // // // // // // // // //               p: { xs: 1, sm: 2 }
// // // // // // // // // //             }}
// // // // // // // // // //           >
// // // // // // // // // //             <PendingOrdersDialog
// // // // // // // // // //               open={openPendingDialog}
// // // // // // // // // //               onClose={() => setOpenPendingDialog(false)}
// // // // // // // // // //             />

// // // // // // // // // //             {/* Orders list */}
// // // // // // // // // //             <Box sx={{ flex: 1 }}>
// // // // // // // // // //               <AnimatePresence mode="wait">
// // // // // // // // // //                 <motion.div
// // // // // // // // // //                   key={activeStatus + searchQuery}
// // // // // // // // // //                   initial={{ opacity: 0 }}
// // // // // // // // // //                   animate={{ opacity: 1 }}
// // // // // // // // // //                   exit={{ opacity: 0 }}
// // // // // // // // // //                   transition={{ duration: 0.2 }}
// // // // // // // // // //                 >
// // // // // // // // // //                   {filteredOrders.length === 0 ? (
// // // // // // // // // //                     <Box sx={{ 
// // // // // // // // // //                       display: 'flex', 
// // // // // // // // // //                       justifyContent: 'center', 
// // // // // // // // // //                       alignItems: 'center', 
// // // // // // // // // //                       height: '200px',
// // // // // // // // // //                       flexDirection: 'column',
// // // // // // // // // //                       gap: 2
// // // // // // // // // //                     }}>
// // // // // // // // // //                       <Typography variant="h6" color="text.secondary">
// // // // // // // // // //                         No se encontraron órdenes
// // // // // // // // // //                       </Typography>
// // // // // // // // // //                       <Button 
// // // // // // // // // //                         variant="outlined" 
// // // // // // // // // //                         onClick={() => {
// // // // // // // // // //                           setSearchQuery("");
// // // // // // // // // //                           setActiveStatus("all");
// // // // // // // // // //                         }}
// // // // // // // // // //                       >
// // // // // // // // // //                         Limpiar filtros
// // // // // // // // // //                       </Button>
// // // // // // // // // //                     </Box>
// // // // // // // // // //                   ) : (
// // // // // // // // // //                     <>
// // // // // // // // // //                       <Grid container spacing={isMobile ? 1 : 3}>
// // // // // // // // // //                         {paginatedOrders.map((order: any) => (
// // // // // // // // // //                           <Grid item xs={12} key={order._id || order.id}>
// // // // // // // // // //                             <OrderCard order={order} />
// // // // // // // // // //                           </Grid>
// // // // // // // // // //                         ))}
// // // // // // // // // //                       </Grid>

// // // // // // // // // //                       {/* Pagination */}
// // // // // // // // // //                       {pageCount > 1 && (
// // // // // // // // // //                         <Box sx={{ 
// // // // // // // // // //                           display: 'flex', 
// // // // // // // // // //                           justifyContent: 'center', 
// // // // // // // // // //                           mt: 3,
// // // // // // // // // //                           pb: 2
// // // // // // // // // //                         }}>
// // // // // // // // // //                           <Pagination
// // // // // // // // // //                             count={pageCount}
// // // // // // // // // //                             page={currentPages[activeStatus]}
// // // // // // // // // //                             onChange={handlePageChange}
// // // // // // // // // //                             color="primary"
// // // // // // // // // //                             size={isMobile ? "small" : "medium"}
// // // // // // // // // //                           />
// // // // // // // // // //                         </Box>
// // // // // // // // // //                       )}
// // // // // // // // // //                     </>
// // // // // // // // // //                   )}
// // // // // // // // // //                 </motion.div>
// // // // // // // // // //               </AnimatePresence>
// // // // // // // // // //             </Box>
// // // // // // // // // //           </Box>
// // // // // // // // // //         </Paper>

// // // // // // // // // //         {/* Scroll to top button */}
// // // // // // // // // //         <Zoom in={trigger}>
// // // // // // // // // //           <Box
// // // // // // // // // //             onClick={scrollToTop}
// // // // // // // // // //             role="presentation"
// // // // // // // // // //             sx={{
// // // // // // // // // //               position: 'fixed',
// // // // // // // // // //               bottom: 16,
// // // // // // // // // //               right: 16,
// // // // // // // // // //               zIndex: 1000,
// // // // // // // // // //             }}
// // // // // // // // // //           >
// // // // // // // // // //             <Fab color="primary" size="small" aria-label="scroll back to top">
// // // // // // // // // //               <KeyboardArrowUp />
// // // // // // // // // //             </Fab>
// // // // // // // // // //           </Box>
// // // // // // // // // //         </Zoom>
// // // // // // // // // //       </Box>

// // // // // // // // // //       {/* Edit Order Modal */}
// // // // // // // // // //       <AnimatePresence>
// // // // // // // // // //         {isEditModalOpen && selectedOrder && (
// // // // // // // // // //           <EditOrderModal
// // // // // // // // // //             open={isEditModalOpen}
// // // // // // // // // //             order={selectedOrder}
// // // // // // // // // //             onSave={saveUpdateData}
// // // // // // // // // //             menuData={{
// // // // // // // // // //               mainMenu: hojas?.Hoja1 || [],
// // // // // // // // // //               promotions: hojas?.Promotion || []
// // // // // // // // // //             }}
// // // // // // // // // //             onClose={handleCloseEditModal}
// // // // // // // // // //           />
// // // // // // // // // //         )}
// // // // // // // // // //       </AnimatePresence>
// // // // // // // // // //     </Box>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default OrderSpeedGeneric;



// // // // // // // // // import React, { useMemo, useState, useEffect } from 'react';
// // // // // // // // // import { useSelector } from 'react-redux';
// // // // // // // // // import { RootState } from "../../../store/store";
// // // // // // // // // import {
// // // // // // // // //   Box,
// // // // // // // // //   Button,
// // // // // // // // //   Chip,
// // // // // // // // //   CircularProgress,
// // // // // // // // //   Paper,
// // // // // // // // //   Typography,
// // // // // // // // //   Alert,
// // // // // // // // //   Grid,
// // // // // // // // //   List,
// // // // // // // // //   ListItem,
// // // // // // // // //   ListItemText,
// // // // // // // // //   Avatar,
// // // // // // // // //   IconButton,
// // // // // // // // //   Card,
// // // // // // // // //   CardContent,
// // // // // // // // //   Divider,
// // // // // // // // //   Badge,
// // // // // // // // //   Tooltip,
// // // // // // // // //   AppBar,
// // // // // // // // //   Toolbar,
// // // // // // // // //   useMediaQuery,
// // // // // // // // //   useTheme,
// // // // // // // // //   Stack,
// // // // // // // // //   useScrollTrigger,
// // // // // // // // //   Fab,
// // // // // // // // //   Zoom,
// // // // // // // // //   TextField,
// // // // // // // // //   InputAdornment,
// // // // // // // // //   Pagination,
// // // // // // // // //   Tabs,
// // // // // // // // //   Tab,
// // // // // // // // //   Table,
// // // // // // // // //   TableBody,
// // // // // // // // //   TableCell,
// // // // // // // // //   TableContainer,
// // // // // // // // //   TableHead,
// // // // // // // // //   TableRow
// // // // // // // // // } from '@mui/material';
// // // // // // // // // import {
// // // // // // // // //   Edit as EditIcon,
// // // // // // // // //   Refresh as RefreshIcon,
// // // // // // // // //   ExpandMore as ExpandMoreIcon,
// // // // // // // // //   ExpandLess as ExpandLessIcon,
// // // // // // // // //   CheckCircle as CheckCircleIcon,
// // // // // // // // //   PauseCircle as PauseCircleIcon,
// // // // // // // // //   Cancel as CancelIcon,
// // // // // // // // //   DeliveryDining as DeliveryIcon,
// // // // // // // // //   PlayArrow,
// // // // // // // // //   Pause,
// // // // // // // // //   ViewList as ViewListIcon,
// // // // // // // // //   ViewColumn as ViewColumnIcon,
// // // // // // // // //   Logout as LogoutIcon,
// // // // // // // // //   Update as UpdateIcon,
// // // // // // // // //   AccessTime,
// // // // // // // // //   Person,
// // // // // // // // //   KeyboardArrowUp,
// // // // // // // // //   Search as SearchIcon,
// // // // // // // // //   Clear as ClearIcon
// // // // // // // // // } from '@mui/icons-material';
// // // // // // // // // import { useOrdersManagementSocketApi } from '../../../hooks/useOrdersManagementSocketApi';
// // // // // // // // // import EditOrderModal from '../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal';
// // // // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // // // import Image from "next/image";
// // // // // // // // // import { clearLocalhostStorage } from "@/services/localstorage.services";
// // // // // // // // // import { recordAttendance } from "@/services/attendance.services";
// // // // // // // // // import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog";

// // // // // // // // // // Status configuration
// // // // // // // // // const statusConfig = {
// // // // // // // // //   pending: {
// // // // // // // // //     color: "default",
// // // // // // // // //     icon: <PauseCircleIcon color="disabled" />,
// // // // // // // // //     label: "Pendientes",
// // // // // // // // //     actions: [
// // // // // // // // //       { action: 'start', label: 'Iniciar', color: 'primary', icon: <PlayArrow /> }
// // // // // // // // //     ]
// // // // // // // // //   },
// // // // // // // // //   processing: {
// // // // // // // // //     color: "primary",
// // // // // // // // //     icon: <PlayArrow color="primary" />,
// // // // // // // // //     label: "En Proceso",
// // // // // // // // //     actions: [
// // // // // // // // //       { action: 'pause', label: 'Pausar', color: 'warning', icon: <Pause /> },
// // // // // // // // //       { action: 'complete', label: 'Completar', color: 'success', icon: <CheckCircleIcon /> }
// // // // // // // // //     ]
// // // // // // // // //   },
// // // // // // // // //   paused: {
// // // // // // // // //     color: "warning",
// // // // // // // // //     icon: <Pause color="warning" />,
// // // // // // // // //     label: "Pausadas",
// // // // // // // // //     actions: [
// // // // // // // // //       { action: 'resume', label: 'Reanudar', color: 'primary', icon: <PlayArrow /> },
// // // // // // // // //       { action: 'complete', label: 'Completar', color: 'success', icon: <CheckCircleIcon /> }
// // // // // // // // //     ]
// // // // // // // // //   },
// // // // // // // // //   finished: {
// // // // // // // // //     color: "success",
// // // // // // // // //     icon: <CheckCircleIcon color="success" />,
// // // // // // // // //     label: "Terminadas",
// // // // // // // // //     actions: [
// // // // // // // // //       { action: 'deliver', label: 'Entregar', color: 'success', icon: <DeliveryIcon /> }
// // // // // // // // //     ]
// // // // // // // // //   },
// // // // // // // // //   cancelled: {
// // // // // // // // //     color: "error",
// // // // // // // // //     icon: <CancelIcon color="error" />,
// // // // // // // // //     label: "Canceladas",
// // // // // // // // //     actions: [
// // // // // // // // //       { action: 'reopen', label: 'Reabrir', color: 'primary', icon: <PlayArrow /> }
// // // // // // // // //     ]
// // // // // // // // //   },
// // // // // // // // //   delivered: {
// // // // // // // // //     color: "success",
// // // // // // // // //     icon: <DeliveryIcon color="success" />,
// // // // // // // // //     label: "Entregadas",
// // // // // // // // //     actions: []
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // const statusOptions = Object.keys(statusConfig);

// // // // // // // // // const OrderSpeedGeneric = () => {
// // // // // // // // //   const theme = useTheme();
// // // // // // // // //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// // // // // // // // //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile);
// // // // // // // // //   const [displayTitle, setDisplayTitle] = useState(false);
// // // // // // // // //   const [viewMode, setViewMode] = useState<"card" | "list">(isMobile ? "card" : "card");
// // // // // // // // //   const [openPendingDialog, setOpenPendingDialog] = useState(false);
// // // // // // // // //   const [selectedOrder, setSelectedOrder] = useState<any>(null);
// // // // // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // // // // // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // // // // // //   const [activeStatus, setActiveStatus] = useState("all");
// // // // // // // // //   const [currentPages, setCurrentPages] = useState<Record<string, number>>(
// // // // // // // // //     statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 })
// // // // // // // // //   );
// // // // // // // // //   const ordersPerPage = isMobile ? 5 : 10;

// // // // // // // // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any });
// // // // // // // // //   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } };

// // // // // // // // //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email");

// // // // // // // // //   const {
// // // // // // // // //     allOrders,
// // // // // // // // //     ordersByStatus,
// // // // // // // // //     isConnected,
// // // // // // // // //     isLoading,
// // // // // // // // //     isUpdating,
// // // // // // // // //     error,
// // // // // // // // //     successMessage,
// // // // // // // // //     lastRefresh,
// // // // // // // // //     fetchHistoricalOrders,
// // // // // // // // //     handleOrderAction,
// // // // // // // // //     updateOrder,
// // // // // // // // //     clearMessages
// // // // // // // // //   } = useOrdersManagementSocketApi({
// // // // // // // // //     companyName: data?.companyName || "LlakaScript",
// // // // // // // // //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// // // // // // // // //     orderLimit: 50
// // // // // // // // //   });

// // // // // // // // //   // Calculate totals
// // // // // // // // //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0);
// // // // // // // // //   const pendingCount = ordersByStatus.pending?.length || 0;
// // // // // // // // //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0);
// // // // // // // // //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0);

// // // // // // // // //   // Filter and search orders
// // // // // // // // //   const filteredOrders = useMemo(() => {
// // // // // // // // //     let filtered = [...allOrders];

// // // // // // // // //     // Filter by status
// // // // // // // // //     if (activeStatus !== "all") {
// // // // // // // // //       filtered = filtered.filter(order => order.status === activeStatus);
// // // // // // // // //     }

// // // // // // // // //     // Search filter
// // // // // // // // //     if (searchQuery) {
// // // // // // // // //       const query = searchQuery.toLowerCase();
// // // // // // // // //       filtered = filtered.filter(order => {
// // // // // // // // //         return (
// // // // // // // // //           order.fullname?.toLowerCase().includes(query) ||
// // // // // // // // //           order.id?.toString().includes(query) ||
// // // // // // // // //           order._id?.toString().includes(query) ||
// // // // // // // // //           order.orderType?.toLowerCase().includes(query) ||
// // // // // // // // //           order.cart.some((item: any) => 
// // // // // // // // //             item.name.toLowerCase().includes(query) ||
// // // // // // // // //             item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query))
// // // // // // // // //         ))
// // // // // // // // //       });
// // // // // // // // //     }

// // // // // // // // //     // Sort by date (newest first)
// // // // // // // // //     return filtered.sort((a, b) => {
// // // // // // // // //       const dateA = new Date(a.createdAt || a.timestamp || 0);
// // // // // // // // //       const dateB = new Date(b.createdAt || b.timestamp || 0);
// // // // // // // // //       return dateB.getTime() - dateA.getTime();
// // // // // // // // //     });
// // // // // // // // //   }, [allOrders, activeStatus, searchQuery]);

// // // // // // // // //   // Paginate orders
// // // // // // // // //   const paginatedOrders = useMemo(() => {
// // // // // // // // //     const startIndex = (currentPages[activeStatus] - 1) * ordersPerPage;
// // // // // // // // //     return filteredOrders.slice(startIndex, startIndex + ordersPerPage);
// // // // // // // // //   }, [filteredOrders, currentPages, activeStatus, ordersPerPage]);

// // // // // // // // //   // Calculate page count for current status
// // // // // // // // //   const pageCount = Math.ceil(filteredOrders.length / ordersPerPage);

// // // // // // // // //   // Handle page change
// // // // // // // // //   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
// // // // // // // // //     setCurrentPages(prev => ({
// // // // // // // // //       ...prev,
// // // // // // // // //       [activeStatus]: value
// // // // // // // // //     }));
// // // // // // // // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // // // // // // // //   };

// // // // // // // // //   // Toggle functions
// // // // // // // // //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed);
// // // // // // // // //   const toggleViewMode = () => setViewMode(viewMode === "card" ? "list" : "card");

// // // // // // // // //   // Action handlers
// // // // // // // // //   const handleLogout = async () => {
// // // // // // // // //     clearLocalhostStorage();
// // // // // // // // //     await recordAttendance('getOut', user?.user?.email, data?.companyName);
// // // // // // // // //     window.location.reload();
// // // // // // // // //   };

// // // // // // // // //   const handleOpenEditModal = (order: any) => {
// // // // // // // // //     setSelectedOrder(order);
// // // // // // // // //     setIsEditModalOpen(true);
// // // // // // // // //   };

// // // // // // // // //   const handleCloseEditModal = () => {
// // // // // // // // //     setIsEditModalOpen(false);
// // // // // // // // //     setSelectedOrder(null);
// // // // // // // // //   };

// // // // // // // // //   const saveUpdateData = async (updatedOrder: any) => {
// // // // // // // // //     try {
// // // // // // // // //       await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder);
// // // // // // // // //       handleCloseEditModal();
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Failed to update order:", error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
// // // // // // // // //     setActiveStatus(newValue);
// // // // // // // // //     setCurrentPages(prev => ({
// // // // // // // // //       ...prev,
// // // // // // // // //       [newValue]: 1
// // // // // // // // //     }));
// // // // // // // // //   };

// // // // // // // // //   const clearSearch = () => {
// // // // // // // // //     setSearchQuery("");
// // // // // // // // //   };

// // // // // // // // //   // Effects
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const interval = setInterval(() => {
// // // // // // // // //       setDisplayTitle((prev) => !prev);
// // // // // // // // //     }, 5000);
// // // // // // // // //     return () => clearInterval(interval);
// // // // // // // // //   }, []);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     setViewMode(isMobile ? "card" : "card");
// // // // // // // // //   }, [isMobile]);

// // // // // // // // //   // Scroll to top button logic
// // // // // // // // //   const trigger = useScrollTrigger({
// // // // // // // // //     threshold: 100,
// // // // // // // // //   });

// // // // // // // // //   const scrollToTop = () => {
// // // // // // // // //     window.scrollTo({
// // // // // // // // //       top: 0,
// // // // // // // // //       behavior: 'smooth',
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   // Order Card Component
// // // // // // // // //   const OrderCard = React.memo(({ order }: { order: any }) => {
// // // // // // // // //     const status = order.status;
// // // // // // // // //     const config = statusConfig[status as keyof typeof statusConfig];
// // // // // // // // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0);
// // // // // // // // //     const total = order.cart.reduce((sum: any, item: any) => {
// // // // // // // // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0;
// // // // // // // // //       return sum + item.price * item.quantity + extrasTotal;
// // // // // // // // //     }, 0);

// // // // // // // // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // // // // // //       hour: "2-digit",
// // // // // // // // //       minute: "2-digit",
// // // // // // // // //     });

// // // // // // // // //     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette];

// // // // // // // // //     return (
// // // // // // // // //       <Card 
// // // // // // // // //         sx={{ 
// // // // // // // // //           borderLeft: '4px solid', 
// // // // // // // // //           borderColor: paletteColor?.main || 'grey',
// // // // // // // // //           mb: 2,
// // // // // // // // //           position: 'relative',
// // // // // // // // //           transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
// // // // // // // // //           '&:hover': {
// // // // // // // // //             transform: isMobile ? 'none' : 'translateY(-2px)',
// // // // // // // // //             boxShadow: isMobile ? 'none' : theme.shadows[4]
// // // // // // // // //           }
// // // // // // // // //         }}
// // // // // // // // //         component={motion.div}
// // // // // // // // //         initial={{ opacity: 0, y: 10 }}
// // // // // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // // // // //         transition={{ duration: 0.2 }}
// // // // // // // // //         exit={{ opacity: 0 }}
// // // // // // // // //         layout
// // // // // // // // //       >
// // // // // // // // //         <CardContent>
// // // // // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
// // // // // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // // // // //               #{order.id || order._id.slice(-4)}
// // // // // // // // //             </Typography>
// // // // // // // // //             <Chip
// // // // // // // // //               size="small"
// // // // // // // // //               label={order.orderType}
// // // // // // // // //               color={config.color as any}
// // // // // // // // //               icon={config.icon}
// // // // // // // // //             />
// // // // // // // // //           </Box>

// // // // // // // // //           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
// // // // // // // // //             <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // // //             <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // // // // //               {order.fullname}
// // // // // // // // //             </Typography>
// // // // // // // // //             <Box sx={{ flexGrow: 1 }} />
// // // // // // // // //             <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // // //             <Typography variant="body2">{formattedTime}</Typography>
// // // // // // // // //           </Box>

// // // // // // // // //           <Divider sx={{ my: 1 }} />

// // // // // // // // //           <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
// // // // // // // // //             Items ({totalItems})
// // // // // // // // //           </Typography>

// // // // // // // // //           <List dense disablePadding>
// // // // // // // // //             {order.cart.slice(0, isMobile ? 2 : undefined).map((item: any) => (
// // // // // // // // //               <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.25 }}>
// // // // // // // // //                 <ListItemText
// // // // // // // // //                   primary={
// // // // // // // // //                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // // //                       <Typography variant="body2">
// // // // // // // // //                         <strong>{item.quantity}x</strong> {item.name}
// // // // // // // // //                       </Typography>
// // // // // // // // //                       <Typography variant="body2" sx={{ ml: 1 }}>
// // // // // // // // //                         ${item.price.toFixed(2)}
// // // // // // // // //                       </Typography>
// // // // // // // // //                     </Box>
// // // // // // // // //                   }
// // // // // // // // //                   secondary={
// // // // // // // // //                     item.extras?.length > 0 && (
// // // // // // // // //                       <List dense disablePadding sx={{ ml: 2 }}>
// // // // // // // // //                         {item.extras.slice(0, isMobile ? 1 : undefined).map((extra: any, idx: number) => (
// // // // // // // // //                           <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0 }}>
// // // // // // // // //                             <ListItemText
// // // // // // // // //                               primary={
// // // // // // // // //                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // // //                                   <Typography variant="caption">+ {extra.name}</Typography>
// // // // // // // // //                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // // // // // // //                                 </Box>
// // // // // // // // //                               }
// // // // // // // // //                             />
// // // // // // // // //                           </ListItem>
// // // // // // // // //                         ))}
// // // // // // // // //                       </List>
// // // // // // // // //                     )
// // // // // // // // //                   }
// // // // // // // // //                 />
// // // // // // // // //               </ListItem>
// // // // // // // // //             ))}
// // // // // // // // //             {isMobile && order.cart.length > 2 && (
// // // // // // // // //               <Typography variant="caption" color="text.secondary">
// // // // // // // // //                 +{order.cart.length - 2} más...
// // // // // // // // //               </Typography>
// // // // // // // // //             )}
// // // // // // // // //           </List>

// // // // // // // // //           <Divider sx={{ my: 1 }} />

// // // // // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // // // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // // // // //               Total: ${total.toFixed(2)}
// // // // // // // // //             </Typography>

// // // // // // // // //             <Stack direction="row" spacing={1}>
// // // // // // // // //               {config.actions.map((action: any, idx: number) => (
// // // // // // // // //                 <Button
// // // // // // // // //                   key={`${action.action}-${idx}`}
// // // // // // // // //                   size="small"
// // // // // // // // //                   variant="contained"
// // // // // // // // //                   color={action.color as any}
// // // // // // // // //                   startIcon={action.icon}
// // // // // // // // //                   onClick={(e) => {
// // // // // // // // //                     e.stopPropagation();
// // // // // // // // //                     handleOrderAction(action.action, order);
// // // // // // // // //                   }}
// // // // // // // // //                   disabled={isUpdating}
// // // // // // // // //                 >
// // // // // // // // //                   {action.label}
// // // // // // // // //                 </Button>
// // // // // // // // //               ))}

// // // // // // // // //               <Button
// // // // // // // // //                 size="small"
// // // // // // // // //                 variant="outlined"
// // // // // // // // //                 color="primary"
// // // // // // // // //                 startIcon={<EditIcon />}
// // // // // // // // //                 onClick={(e) => {
// // // // // // // // //                   e.stopPropagation();
// // // // // // // // //                   handleOpenEditModal(order);
// // // // // // // // //                 }}
// // // // // // // // //                 disabled={isUpdating}
// // // // // // // // //               >
// // // // // // // // //                 Editar
// // // // // // // // //               </Button>
// // // // // // // // //             </Stack>
// // // // // // // // //           </Box>
// // // // // // // // //         </CardContent>
// // // // // // // // //       </Card>
// // // // // // // // //     );
// // // // // // // // //   });

// // // // // // // // //   // Order List Row Component
// // // // // // // // //   const OrderRow = React.memo(({ order }: { order: any }) => {
// // // // // // // // //     const status = order.status;
// // // // // // // // //     const config = statusConfig[status as keyof typeof statusConfig];
// // // // // // // // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0);
// // // // // // // // //     const total = order.cart.reduce((sum: any, item: any) => {
// // // // // // // // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0;
// // // // // // // // //       return sum + item.price * item.quantity + extrasTotal;
// // // // // // // // //     }, 0);

// // // // // // // // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // // // // // //       hour: "2-digit",
// // // // // // // // //       minute: "2-digit",
// // // // // // // // //     });

// // // // // // // // //     return (
// // // // // // // // //       <TableRow
// // // // // // // // //         component={motion.tr}
// // // // // // // // //         initial={{ opacity: 0 }}
// // // // // // // // //         animate={{ opacity: 1 }}
// // // // // // // // //         transition={{ duration: 0.2 }}
// // // // // // // // //         hover
// // // // // // // // //         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
// // // // // // // // //       >
// // // // // // // // //         <TableCell>
// // // // // // // // //           <Typography variant="body2" fontWeight="bold">
// // // // // // // // //             #{order.id || order._id.slice(-4)}
// // // // // // // // //           </Typography>
// // // // // // // // //         </TableCell>
// // // // // // // // //         <TableCell>
// // // // // // // // //           <Box sx={{ display: "flex", alignItems: "center" }}>
// // // // // // // // //             <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // // //             <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // // // // //               {order.fullname}
// // // // // // // // //             </Typography>
// // // // // // // // //           </Box>
// // // // // // // // //         </TableCell>
// // // // // // // // //         <TableCell>
// // // // // // // // //           <Chip
// // // // // // // // //             size="small"
// // // // // // // // //             label={order.orderType}
// // // // // // // // //             color={config.color as any}
// // // // // // // // //             icon={config.icon}
// // // // // // // // //           />
// // // // // // // // //         </TableCell>
// // // // // // // // //         <TableCell>
// // // // // // // // //           <Typography variant="body2">{totalItems} items</Typography>
// // // // // // // // //         </TableCell>
// // // // // // // // //         <TableCell>
// // // // // // // // //           <Typography variant="body2" fontWeight="bold">
// // // // // // // // //             ${total.toFixed(2)}
// // // // // // // // //           </Typography>
// // // // // // // // //         </TableCell>
// // // // // // // // //         <TableCell>
// // // // // // // // //           <Typography variant="body2">{formattedTime}</Typography>
// // // // // // // // //         </TableCell>
// // // // // // // // //         <TableCell>
// // // // // // // // //           <Stack direction="row" spacing={1}>
// // // // // // // // //             {config.actions.map((action: any, idx: number) => (
// // // // // // // // //               <Tooltip key={`${action.action}-${idx}`} title={action.label}>
// // // // // // // // //                 <IconButton
// // // // // // // // //                   size="small"
// // // // // // // // //                   color={action.color as any}
// // // // // // // // //                   onClick={(e) => {
// // // // // // // // //                     e.stopPropagation();
// // // // // // // // //                     handleOrderAction(action.action, order);
// // // // // // // // //                   }}
// // // // // // // // //                   disabled={isUpdating}
// // // // // // // // //                 >
// // // // // // // // //                   {action.icon}
// // // // // // // // //                 </IconButton>
// // // // // // // // //               </Tooltip>
// // // // // // // // //             ))}
// // // // // // // // //             <Tooltip title="Editar">
// // // // // // // // //               <IconButton
// // // // // // // // //                 size="small"
// // // // // // // // //                 color="primary"
// // // // // // // // //                 onClick={(e) => {
// // // // // // // // //                   e.stopPropagation();
// // // // // // // // //                   handleOpenEditModal(order);
// // // // // // // // //                 }}
// // // // // // // // //                 disabled={isUpdating}
// // // // // // // // //               >
// // // // // // // // //                 <EditIcon fontSize="small" />
// // // // // // // // //               </IconButton>
// // // // // // // // //             </Tooltip>
// // // // // // // // //           </Stack>
// // // // // // // // //         </TableCell>
// // // // // // // // //       </TableRow>
// // // // // // // // //     );
// // // // // // // // //   });

// // // // // // // // //   // Main render
// // // // // // // // //   return (
// // // // // // // // //     <Box sx={{ 
// // // // // // // // //       height: "100vh", 
// // // // // // // // //       overflow: "hidden", 
// // // // // // // // //       bgcolor: theme.palette.background.default,
// // // // // // // // //       display: "flex", 
// // // // // // // // //       flexDirection: "column" 
// // // // // // // // //     }}>
// // // // // // // // //       {/* Custom AppBar */}
// // // // // // // // //       <AppBar
// // // // // // // // //         position="sticky"
// // // // // // // // //         elevation={0}
// // // // // // // // //         sx={{
// // // // // // // // //           bgcolor: "background.paper",
// // // // // // // // //           color: "text.primary",
// // // // // // // // //           borderBottom: 1,
// // // // // // // // //           borderColor: "divider",
// // // // // // // // //         }}
// // // // // // // // //       >
// // // // // // // // //         <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
// // // // // // // // //           {/* Logo and Title */}
// // // // // // // // //           <Box
// // // // // // // // //             sx={{
// // // // // // // // //               display: "flex",
// // // // // // // // //               alignItems: "center",
// // // // // // // // //               gap: 1,
// // // // // // // // //               flexGrow: 1,
// // // // // // // // //               height: "40px",
// // // // // // // // //               position: "relative",
// // // // // // // // //               overflow: "hidden",
// // // // // // // // //             }}
// // // // // // // // //           >
// // // // // // // // //             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // // // // // // // //               <Avatar
// // // // // // // // //                 sx={{
// // // // // // // // //                   width: 28,
// // // // // // // // //                   height: 28,
// // // // // // // // //                   flexShrink: 0,
// // // // // // // // //                   ml: 0.5,
// // // // // // // // //                 }}
// // // // // // // // //               >
// // // // // // // // //                 <Image
// // // // // // // // //                   src={"/images/flama.png"}
// // // // // // // // //                   alt={"LlakaScript"}
// // // // // // // // //                   width={28}
// // // // // // // // //                   height={28}
// // // // // // // // //                   priority
// // // // // // // // //                   style={{
// // // // // // // // //                     objectFit: "contain",
// // // // // // // // //                     width: "100%",
// // // // // // // // //                     height: "100%",
// // // // // // // // //                   }}
// // // // // // // // //                 />
// // // // // // // // //               </Avatar>
// // // // // // // // //             </motion.div>

// // // // // // // // //             <Box
// // // // // // // // //               sx={{
// // // // // // // // //                 position: "relative",
// // // // // // // // //                 width: "auto",
// // // // // // // // //                 height: "100%",
// // // // // // // // //                 display: "flex",
// // // // // // // // //                 alignItems: "center",
// // // // // // // // //                 flexGrow: 1,
// // // // // // // // //               }}
// // // // // // // // //             >
// // // // // // // // //               <AnimatePresence mode="wait">
// // // // // // // // //                 <motion.div
// // // // // // // // //                   key={displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // // // // //                   initial={{ opacity: 0, x: -10 }}
// // // // // // // // //                   animate={{ opacity: 1, x: 0 }}
// // // // // // // // //                   exit={{ opacity: 0, x: 10 }}
// // // // // // // // //                   transition={{ duration: 0.3 }}
// // // // // // // // //                   style={{
// // // // // // // // //                     position: "absolute",
// // // // // // // // //                     left: 0,
// // // // // // // // //                     whiteSpace: "nowrap",
// // // // // // // // //                   }}
// // // // // // // // //                 >
// // // // // // // // //                   <Typography
// // // // // // // // //                     variant={isMobile ? "subtitle1" : "h6"}
// // // // // // // // //                     sx={{
// // // // // // // // //                       fontWeight: 600,
// // // // // // // // //                       lineHeight: 1.1,
// // // // // // // // //                       fontSize: isMobile ? "1rem" : undefined,
// // // // // // // // //                     }}
// // // // // // // // //                   >
// // // // // // // // //                     {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // // // // //                   </Typography>
// // // // // // // // //                 </motion.div>
// // // // // // // // //               </AnimatePresence>
// // // // // // // // //             </Box>
// // // // // // // // //           </Box>

// // // // // // // // //           {/* Right side controls */}
// // // // // // // // //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// // // // // // // // //             {/* View mode toggle */}
// // // // // // // // //             <Tooltip title={viewMode === "card" ? "Vista lista" : "Vista tarjetas"}>
// // // // // // // // //               <motion.div whileHover={{ scale: 1.1 }}>
// // // // // // // // //                 <IconButton 
// // // // // // // // //                   size="small" 
// // // // // // // // //                   onClick={toggleViewMode} 
// // // // // // // // //                   color="default"
// // // // // // // // //                 >
// // // // // // // // //                   {viewMode === "card" ? <ViewListIcon fontSize="small" /> : <ViewColumnIcon fontSize="small" />}
// // // // // // // // //                 </IconButton>
// // // // // // // // //               </motion.div>
// // // // // // // // //             </Tooltip>

// // // // // // // // //             {/* Connection status indicator */}
// // // // // // // // //             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
// // // // // // // // //               <motion.div
// // // // // // // // //                 animate={{
// // // // // // // // //                   scale: isConnected ? [1, 1.2, 1] : 1,
// // // // // // // // //                   transition: isConnected ? { repeat: Infinity, duration: 2 } : {}
// // // // // // // // //                 }}
// // // // // // // // //               >
// // // // // // // // //                 <Box
// // // // // // // // //                   sx={{
// // // // // // // // //                     width: 10,
// // // // // // // // //                     height: 10,
// // // // // // // // //                     borderRadius: '50%',
// // // // // // // // //                     bgcolor: isConnected ? 'success.main' : 'error.main',
// // // // // // // // //                     mr: 1,
// // // // // // // // //                   }}
// // // // // // // // //                 />
// // // // // // // // //               </motion.div>
// // // // // // // // //             </Tooltip>

// // // // // // // // //             {/* Order count badge */}
// // // // // // // // //             {isMobile && totalOrders > 0 && (
// // // // // // // // //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// // // // // // // // //                 <Box sx={{ width: 4, height: 4 }} />
// // // // // // // // //               </Badge>
// // // // // // // // //             )}

// // // // // // // // //             {/* Last refresh time */}
// // // // // // // // //             {lastRefresh && !isMobile && (
// // // // // // // // //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// // // // // // // // //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// // // // // // // // //               </Typography>
// // // // // // // // //             )}

// // // // // // // // //             {/* Refresh button */}
// // // // // // // // //             <Tooltip title="Actualizar">
// // // // // // // // //               <motion.div whileHover={{ rotate: 90 }} transition={{ type: 'spring' }}>
// // // // // // // // //                 <IconButton
// // // // // // // // //                   color="primary"
// // // // // // // // //                   size="small"
// // // // // // // // //                   onClick={fetchHistoricalOrders}
// // // // // // // // //                   disabled={isLoading || isUpdating}
// // // // // // // // //                 >
// // // // // // // // //                   <RefreshIcon fontSize="small" />
// // // // // // // // //                 </IconButton>
// // // // // // // // //               </motion.div>
// // // // // // // // //             </Tooltip>

// // // // // // // // //             {/* Header collapse toggle (mobile only) */}
// // // // // // // // //             {isMobile && (
// // // // // // // // //               <IconButton size="small" onClick={toggleHeader}>
// // // // // // // // //                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
// // // // // // // // //               </IconButton>
// // // // // // // // //             )}

// // // // // // // // //             <Tooltip title="Salir">
// // // // // // // // //               <motion.div 
// // // // // // // // //                 whileHover={{ scale: 1.1 }} 
// // // // // // // // //                 whileTap={{ scale: 0.9 }}
// // // // // // // // //                 transition={{ type: 'spring', stiffness: 400, damping: 10 }}
// // // // // // // // //               >
// // // // // // // // //                 <IconButton
// // // // // // // // //                   size="small"
// // // // // // // // //                   onClick={handleLogout}
// // // // // // // // //                   color="default"
// // // // // // // // //                 >
// // // // // // // // //                   <LogoutIcon fontSize="small" />
// // // // // // // // //                 </IconButton>
// // // // // // // // //               </motion.div>
// // // // // // // // //             </Tooltip>
// // // // // // // // //           </Box>
// // // // // // // // //         </Toolbar>
// // // // // // // // //       </AppBar>

// // // // // // // // //       {/* Main content */}
// // // // // // // // //       <Box
// // // // // // // // //         component="main"
// // // // // // // // //         sx={{
// // // // // // // // //           p: { xs: 0.5, sm: 2 },
// // // // // // // // //           flex: 1,
// // // // // // // // //           overflow: "auto",
// // // // // // // // //           display: "flex",
// // // // // // // // //           flexDirection: "column",
// // // // // // // // //         }}
// // // // // // // // //       >
// // // // // // // // //         <Paper
// // // // // // // // //           elevation={isMobile ? 1 : 3}
// // // // // // // // //           sx={{
// // // // // // // // //             height: "100%",
// // // // // // // // //             display: "flex",
// // // // // // // // //             flexDirection: "column",
// // // // // // // // //             overflow: "hidden",
// // // // // // // // //             borderRadius: { xs: 1, sm: 2 },
// // // // // // // // //           }}
// // // // // // // // //         >
// // // // // // // // //           {/* Status header - collapsible on mobile */}
// // // // // // // // //           <motion.div
// // // // // // // // //             initial={false}
// // // // // // // // //             animate={{
// // // // // // // // //               height: headerCollapsed ? 0 : 'auto',
// // // // // // // // //               opacity: headerCollapsed ? 0 : 1
// // // // // // // // //             }}
// // // // // // // // //             transition={{ type: 'spring', damping: 25 }}
// // // // // // // // //             style={{
// // // // // // // // //               display: "flex",
// // // // // // // // //               flexDirection: "column",
// // // // // // // // //               borderBottom: '1px solid',
// // // // // // // // //               borderColor: theme.palette.divider,
// // // // // // // // //               overflow: "hidden",
// // // // // // // // //             }}
// // // // // // // // //           >
// // // // // // // // //             {/* Search bar */}
// // // // // // // // //             <Box sx={{ p: 2, pb: 0 }}>
// // // // // // // // //               <TextField
// // // // // // // // //                 fullWidth
// // // // // // // // //                 variant="outlined"
// // // // // // // // //                 placeholder="Buscar órdenes..."
// // // // // // // // //                 value={searchQuery}
// // // // // // // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // // // // // // //                 InputProps={{
// // // // // // // // //                   startAdornment: (
// // // // // // // // //                     <InputAdornment position="start">
// // // // // // // // //                       <SearchIcon />
// // // // // // // // //                     </InputAdornment>
// // // // // // // // //                   ),
// // // // // // // // //                   endAdornment: searchQuery && (
// // // // // // // // //                     <InputAdornment position="end">
// // // // // // // // //                       <IconButton onClick={clearSearch} size="small">
// // // // // // // // //                         <ClearIcon fontSize="small" />
// // // // // // // // //                       </IconButton>
// // // // // // // // //                     </InputAdornment>
// // // // // // // // //                   ),
// // // // // // // // //                 }}
// // // // // // // // //               />
// // // // // // // // //             </Box>

// // // // // // // // //             {/* Status tabs */}
// // // // // // // // //             <Box sx={{ px: 2, pt: 1 }}>
// // // // // // // // //               <Tabs
// // // // // // // // //                 value={activeStatus}
// // // // // // // // //                 onChange={handleStatusChange}
// // // // // // // // //                 variant="scrollable"
// // // // // // // // //                 scrollButtons="auto"
// // // // // // // // //                 allowScrollButtonsMobile
// // // // // // // // //               >
// // // // // // // // //                 <Tab label="Todas" value="all" />
// // // // // // // // //                 {statusOptions.map(status => (
// // // // // // // // //                   <Tab 
// // // // // // // // //                     key={status}
// // // // // // // // //                     label={statusConfig[status as keyof typeof statusConfig].label}
// // // // // // // // //                     value={status}
// // // // // // // // //                     icon={statusConfig[status as keyof typeof statusConfig].icon}
// // // // // // // // //                     iconPosition="start"
// // // // // // // // //                   />
// // // // // // // // //                 ))}
// // // // // // // // //               </Tabs>
// // // // // // // // //             </Box>

// // // // // // // // //             {/* Status indicators */}
// // // // // // // // //             {(isLoading || isUpdating) && (
// // // // // // // // //               <Box
// // // // // // // // //                 sx={{
// // // // // // // // //                   display: "flex",
// // // // // // // // //                   alignItems: "center",
// // // // // // // // //                   gap: 1,
// // // // // // // // //                   p: 1,
// // // // // // // // //                   mx: 1,
// // // // // // // // //                   mb: 1,
// // // // // // // // //                   backgroundColor: theme.palette.action.hover,
// // // // // // // // //                   borderRadius: 1,
// // // // // // // // //                 }}
// // // // // // // // //               >
// // // // // // // // //                 <CircularProgress size={16} />
// // // // // // // // //                 <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// // // // // // // // //                   {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// // // // // // // // //                 </Typography>
// // // // // // // // //               </Box>
// // // // // // // // //             )}
// // // // // // // // //           </motion.div>

// // // // // // // // //           {/* Error messages */}
// // // // // // // // //           <Box
// // // // // // // // //             sx={{
// // // // // // // // //               px: { xs: 1, sm: 2 },
// // // // // // // // //               pt: { xs: 1, sm: 1 },
// // // // // // // // //               overflow: "auto",
// // // // // // // // //               flexShrink: 0,
// // // // // // // // //             }}
// // // // // // // // //           >
// // // // // // // // //             <AnimatePresence>
// // // // // // // // //               {error && (
// // // // // // // // //                 <motion.div
// // // // // // // // //                   initial={{ opacity: 0, y: -20 }}
// // // // // // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // // // // // //                   exit={{ opacity: 0, y: -20 }}
// // // // // // // // //                   transition={{ type: 'spring' }}
// // // // // // // // //                 >
// // // // // // // // //                   <Alert 
// // // // // // // // //                     severity="error" 
// // // // // // // // //                     onClose={() => clearMessages()} 
// // // // // // // // //                     sx={{ mb: 1 }}
// // // // // // // // //                   >
// // // // // // // // //                     {error}
// // // // // // // // //                   </Alert>
// // // // // // // // //                 </motion.div>
// // // // // // // // //               )}
// // // // // // // // //             </AnimatePresence>

// // // // // // // // //             <AnimatePresence>
// // // // // // // // //               {successMessage && (
// // // // // // // // //                 <motion.div
// // // // // // // // //                   initial={{ opacity: 0, y: -20 }}
// // // // // // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // // // // // //                   exit={{ opacity: 0, y: -20 }}
// // // // // // // // //                   transition={{ type: 'spring' }}
// // // // // // // // //                 >
// // // // // // // // //                   <Alert 
// // // // // // // // //                     severity="success" 
// // // // // // // // //                     onClose={() => clearMessages()} 
// // // // // // // // //                     sx={{ mb: 1 }}
// // // // // // // // //                   >
// // // // // // // // //                     {successMessage}
// // // // // // // // //                   </Alert>
// // // // // // // // //                 </motion.div>
// // // // // // // // //               )}
// // // // // // // // //             </AnimatePresence>
// // // // // // // // //           </Box>

// // // // // // // // //           {/* Main content - takes all available space */}
// // // // // // // // //           <Box
// // // // // // // // //             sx={{
// // // // // // // // //               flex: 1,
// // // // // // // // //               overflow: "auto",
// // // // // // // // //               display: "flex",
// // // // // // // // //               flexDirection: "column",
// // // // // // // // //               p: { xs: 1, sm: 2 }
// // // // // // // // //             }}
// // // // // // // // //           >
// // // // // // // // //             <PendingOrdersDialog
// // // // // // // // //               open={openPendingDialog}
// // // // // // // // //               onClose={() => setOpenPendingDialog(false)}
// // // // // // // // //             />

// // // // // // // // //             {/* Orders list */}
// // // // // // // // //             <Box sx={{ flex: 1 }}>
// // // // // // // // //               <AnimatePresence mode="wait">
// // // // // // // // //                 <motion.div
// // // // // // // // //                   key={`${activeStatus}-${searchQuery}-${viewMode}`}
// // // // // // // // //                   initial={{ opacity: 0 }}
// // // // // // // // //                   animate={{ opacity: 1 }}
// // // // // // // // //                   exit={{ opacity: 0 }}
// // // // // // // // //                   transition={{ duration: 0.2 }}
// // // // // // // // //                 >
// // // // // // // // //                   {filteredOrders.length === 0 ? (
// // // // // // // // //                     <Box sx={{ 
// // // // // // // // //                       display: 'flex', 
// // // // // // // // //                       justifyContent: 'center', 
// // // // // // // // //                       alignItems: 'center', 
// // // // // // // // //                       height: '200px',
// // // // // // // // //                       flexDirection: 'column',
// // // // // // // // //                       gap: 2
// // // // // // // // //                     }}>
// // // // // // // // //                       <Typography variant="h6" color="text.secondary">
// // // // // // // // //                         No se encontraron órdenes
// // // // // // // // //                       </Typography>
// // // // // // // // //                       <Button 
// // // // // // // // //                         variant="outlined" 
// // // // // // // // //                         onClick={() => {
// // // // // // // // //                           setSearchQuery("");
// // // // // // // // //                           setActiveStatus("all");
// // // // // // // // //                         }}
// // // // // // // // //                       >
// // // // // // // // //                         Limpiar filtros
// // // // // // // // //                       </Button>
// // // // // // // // //                     </Box>
// // // // // // // // //                   ) : viewMode === "card" ? (
// // // // // // // // //                     <>
// // // // // // // // //                       <Grid container spacing={isMobile ? 1 : 3}>
// // // // // // // // //                         {paginatedOrders.map((order: any) => (
// // // // // // // // //                           <Grid item xs={12} key={order._id || order.id}>
// // // // // // // // //                             <OrderCard order={order} />
// // // // // // // // //                           </Grid>
// // // // // // // // //                         ))}
// // // // // // // // //                       </Grid>

// // // // // // // // //                       {/* Pagination */}
// // // // // // // // //                       {pageCount > 1 && (
// // // // // // // // //                         <Box sx={{ 
// // // // // // // // //                           display: 'flex', 
// // // // // // // // //                           justifyContent: 'center', 
// // // // // // // // //                           mt: 3,
// // // // // // // // //                           pb: 2
// // // // // // // // //                         }}>
// // // // // // // // //                           <Pagination
// // // // // // // // //                             count={pageCount}
// // // // // // // // //                             page={currentPages[activeStatus]}
// // // // // // // // //                             onChange={handlePageChange}
// // // // // // // // //                             color="primary"
// // // // // // // // //                             size={isMobile ? "small" : "medium"}
// // // // // // // // //                           />
// // // // // // // // //                         </Box>
// // // // // // // // //                       )}
// // // // // // // // //                     </>
// // // // // // // // //                   ) : (
// // // // // // // // //                     <>
// // // // // // // // //                       <TableContainer component={Paper} elevation={0}>
// // // // // // // // //                         <Table size={isMobile ? "small" : "medium"}>
// // // // // // // // //                           <TableHead>
// // // // // // // // //                             <TableRow>
// // // // // // // // //                               <TableCell>ID</TableCell>
// // // // // // // // //                               <TableCell>Cliente</TableCell>
// // // // // // // // //                               <TableCell>Estado</TableCell>
// // // // // // // // //                               <TableCell>Items</TableCell>
// // // // // // // // //                               <TableCell>Total</TableCell>
// // // // // // // // //                               <TableCell>Hora</TableCell>
// // // // // // // // //                               <TableCell>Acciones</TableCell>
// // // // // // // // //                             </TableRow>
// // // // // // // // //                           </TableHead>
// // // // // // // // //                           <TableBody>
// // // // // // // // //                             {paginatedOrders.map((order: any) => (
// // // // // // // // //                               <OrderRow key={order._id || order.id} order={order} />
// // // // // // // // //                             ))}
// // // // // // // // //                           </TableBody>
// // // // // // // // //                         </Table>
// // // // // // // // //                       </TableContainer>

// // // // // // // // //                       {/* Pagination */}
// // // // // // // // //                       {pageCount > 1 && (
// // // // // // // // //                         <Box sx={{ 
// // // // // // // // //                           display: 'flex', 
// // // // // // // // //                           justifyContent: 'center', 
// // // // // // // // //                           mt: 3,
// // // // // // // // //                           pb: 2
// // // // // // // // //                         }}>
// // // // // // // // //                           <Pagination
// // // // // // // // //                             count={pageCount}
// // // // // // // // //                             page={currentPages[activeStatus]}
// // // // // // // // //                             onChange={handlePageChange}
// // // // // // // // //                             color="primary"
// // // // // // // // //                             size={isMobile ? "small" : "medium"}
// // // // // // // // //                           />
// // // // // // // // //                         </Box>
// // // // // // // // //                       )}
// // // // // // // // //                     </>
// // // // // // // // //                   )}
// // // // // // // // //                 </motion.div>
// // // // // // // // //               </AnimatePresence>
// // // // // // // // //             </Box>
// // // // // // // // //           </Box>
// // // // // // // // //         </Paper>

// // // // // // // // //         {/* Scroll to top button */}
// // // // // // // // //         <Zoom in={trigger}>
// // // // // // // // //           <Box
// // // // // // // // //             onClick={scrollToTop}
// // // // // // // // //             role="presentation"
// // // // // // // // //             sx={{
// // // // // // // // //               position: 'fixed',
// // // // // // // // //               bottom: 16,
// // // // // // // // //               right: 16,
// // // // // // // // //               zIndex: 1000,
// // // // // // // // //             }}
// // // // // // // // //           >
// // // // // // // // //             <Fab color="primary" size="small" aria-label="scroll back to top">
// // // // // // // // //               <KeyboardArrowUp />
// // // // // // // // //             </Fab>
// // // // // // // // //           </Box>
// // // // // // // // //         </Zoom>
// // // // // // // // //       </Box>

// // // // // // // // //       {/* Edit Order Modal */}
// // // // // // // // //       <AnimatePresence>
// // // // // // // // //         {isEditModalOpen && selectedOrder && (
// // // // // // // // //           <EditOrderModal
// // // // // // // // //             open={isEditModalOpen}
// // // // // // // // //             order={selectedOrder}
// // // // // // // // //             onSave={saveUpdateData}
// // // // // // // // //             menuData={{
// // // // // // // // //               mainMenu: hojas?.Hoja1 || [],
// // // // // // // // //               promotions: hojas?.Promotion || []
// // // // // // // // //             }}
// // // // // // // // //             onClose={handleCloseEditModal}
// // // // // // // // //           />
// // // // // // // // //         )}
// // // // // // // // //       </AnimatePresence>
// // // // // // // // //     </Box>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default OrderSpeedGeneric;


// // // // // // // // import React, { useMemo, useState, useEffect } from 'react';
// // // // // // // // import { useSelector } from 'react-redux';
// // // // // // // // import { RootState } from "../../../store/store";
// // // // // // // // import {
// // // // // // // //   Box,
// // // // // // // //   Button,
// // // // // // // //   Chip,
// // // // // // // //   CircularProgress,
// // // // // // // //   Paper,
// // // // // // // //   Typography,
// // // // // // // //   Alert,
// // // // // // // //   Grid,
// // // // // // // //   List,
// // // // // // // //   ListItem,
// // // // // // // //   ListItemText,
// // // // // // // //   Avatar,
// // // // // // // //   IconButton,
// // // // // // // //   Card,
// // // // // // // //   CardContent,
// // // // // // // //   Divider,
// // // // // // // //   Badge,
// // // // // // // //   Tooltip,
// // // // // // // //   AppBar,
// // // // // // // //   Toolbar,
// // // // // // // //   useMediaQuery,
// // // // // // // //   useTheme,
// // // // // // // //   Stack,
// // // // // // // //   useScrollTrigger,
// // // // // // // //   Fab,
// // // // // // // //   Zoom,
// // // // // // // //   TextField,
// // // // // // // //   InputAdornment,
// // // // // // // //   Pagination,
// // // // // // // //   Tabs,
// // // // // // // //   Tab,
// // // // // // // //   Table,
// // // // // // // //   TableBody,
// // // // // // // //   TableCell,
// // // // // // // //   TableContainer,
// // // // // // // //   TableHead,
// // // // // // // //   TableRow,
// // // // // // // //   MenuItem,
// // // // // // // //   Select,
// // // // // // // //   FormControl
// // // // // // // // } from '@mui/material';
// // // // // // // // import {
// // // // // // // //   Edit as EditIcon,
// // // // // // // //   Refresh as RefreshIcon,
// // // // // // // //   ExpandMore as ExpandMoreIcon,
// // // // // // // //   ExpandLess as ExpandLessIcon,
// // // // // // // //   CheckCircle as CheckCircleIcon,
// // // // // // // //   PauseCircle as PauseCircleIcon,
// // // // // // // //   Cancel as CancelIcon,
// // // // // // // //   DeliveryDining as DeliveryIcon,
// // // // // // // //   PlayArrow,
// // // // // // // //   Pause,
// // // // // // // //   ViewList as ViewListIcon,
// // // // // // // //   ViewColumn as ViewColumnIcon,
// // // // // // // //   Logout as LogoutIcon,
// // // // // // // //   Update as UpdateIcon,
// // // // // // // //   AccessTime,
// // // // // // // //   Person,
// // // // // // // //   KeyboardArrowUp,
// // // // // // // //   Search as SearchIcon,
// // // // // // // //   Clear as ClearIcon,
// // // // // // // //   FirstPage,
// // // // // // // //   LastPage,
// // // // // // // //   NavigateBefore,
// // // // // // // //   NavigateNext
// // // // // // // // } from '@mui/icons-material';
// // // // // // // // import { useOrdersManagementSocketApi } from '../../../hooks/useOrdersManagementSocketApi';
// // // // // // // // import EditOrderModal from '../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal';
// // // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // // import Image from "next/image";
// // // // // // // // import { clearLocalhostStorage } from "@/services/localstorage.services";
// // // // // // // // import { recordAttendance } from "@/services/attendance.services";
// // // // // // // // import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog";

// // // // // // // // // Status configuration
// // // // // // // // const statusConfig = {
// // // // // // // //   pending: {
// // // // // // // //     color: "default",
// // // // // // // //     icon: <PauseCircleIcon color="disabled" />,
// // // // // // // //     label: "Pendientes",
// // // // // // // //     actions: [
// // // // // // // //       { action: 'start', label: 'Iniciar', color: 'primary', icon: <PlayArrow /> }
// // // // // // // //     ]
// // // // // // // //   },
// // // // // // // //   processing: {
// // // // // // // //     color: "primary",
// // // // // // // //     icon: <PlayArrow color="primary" />,
// // // // // // // //     label: "En Proceso",
// // // // // // // //     actions: [
// // // // // // // //       { action: 'pause', label: 'Pausar', color: 'warning', icon: <Pause /> },
// // // // // // // //       { action: 'complete', label: 'Completar', color: 'success', icon: <CheckCircleIcon /> }
// // // // // // // //     ]
// // // // // // // //   },
// // // // // // // //   paused: {
// // // // // // // //     color: "warning",
// // // // // // // //     icon: <Pause color="warning" />,
// // // // // // // //     label: "Pausadas",
// // // // // // // //     actions: [
// // // // // // // //       { action: 'resume', label: 'Reanudar', color: 'primary', icon: <PlayArrow /> },
// // // // // // // //       { action: 'complete', label: 'Completar', color: 'success', icon: <CheckCircleIcon /> }
// // // // // // // //     ]
// // // // // // // //   },
// // // // // // // //   finished: {
// // // // // // // //     color: "success",
// // // // // // // //     icon: <CheckCircleIcon color="success" />,
// // // // // // // //     label: "Terminadas",
// // // // // // // //     actions: [
// // // // // // // //       { action: 'deliver', label: 'Entregar', color: 'success', icon: <DeliveryIcon /> }
// // // // // // // //     ]
// // // // // // // //   },
// // // // // // // //   cancelled: {
// // // // // // // //     color: "error",
// // // // // // // //     icon: <CancelIcon color="error" />,
// // // // // // // //     label: "Canceladas",
// // // // // // // //     actions: [
// // // // // // // //       { action: 'reopen', label: 'Reabrir', color: 'primary', icon: <PlayArrow /> }
// // // // // // // //     ]
// // // // // // // //   },
// // // // // // // //   delivered: {
// // // // // // // //     color: "success",
// // // // // // // //     icon: <DeliveryIcon color="success" />,
// // // // // // // //     label: "Entregadas",
// // // // // // // //     actions: []
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // const statusOptions = Object.keys(statusConfig);
// // // // // // // // const pageSizeOptions = [5, 10, 20, 50];

// // // // // // // // const OrderSpeedGeneric = () => {
// // // // // // // //   const theme = useTheme();
// // // // // // // //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// // // // // // // //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile);
// // // // // // // //   const [displayTitle, setDisplayTitle] = useState(false);
// // // // // // // //   const [viewMode, setViewMode] = useState<"card" | "list">(isMobile ? "card" : "card");
// // // // // // // //   const [openPendingDialog, setOpenPendingDialog] = useState(false);
// // // // // // // //   const [selectedOrder, setSelectedOrder] = useState<any>(null);
// // // // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // // // // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // // // // //   const [activeStatus, setActiveStatus] = useState("all");
// // // // // // // //   const [currentPages, setCurrentPages] = useState<Record<string, number>>(
// // // // // // // //     statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 })
// // // // // // // //   );

// // // // // // // //   const [isTapped, setIsTapped] = useState(false);


// // // // // // // //   const [pageSize, setPageSize] = useState(isMobile ? 5 : 10);

// // // // // // // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any });
// // // // // // // //   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } };

// // // // // // // //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email");

// // // // // // // //   const {
// // // // // // // //     allOrders,
// // // // // // // //     ordersByStatus,
// // // // // // // //     isConnected,
// // // // // // // //     isLoading,
// // // // // // // //     isUpdating,
// // // // // // // //     error,
// // // // // // // //     successMessage,
// // // // // // // //     lastRefresh,
// // // // // // // //     fetchHistoricalOrders,
// // // // // // // //     handleOrderAction,
// // // // // // // //     updateOrder,
// // // // // // // //     clearMessages
// // // // // // // //   } = useOrdersManagementSocketApi({
// // // // // // // //     companyName: data?.companyName || "LlakaScript",
// // // // // // // //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// // // // // // // //     orderLimit: 50
// // // // // // // //   });

// // // // // // // //   // Calculate totals
// // // // // // // //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0);
// // // // // // // //   const pendingCount = ordersByStatus.pending?.length || 0;
// // // // // // // //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0);
// // // // // // // //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0);

// // // // // // // //   // Filter and search orders
// // // // // // // //   const filteredOrders = useMemo(() => {
// // // // // // // //     let filtered = [...allOrders];

// // // // // // // //     if (activeStatus !== "all") {
// // // // // // // //       filtered = filtered.filter(order => order.status === activeStatus);
// // // // // // // //     }

// // // // // // // //     if (searchQuery) {
// // // // // // // //       const query = searchQuery.toLowerCase();
// // // // // // // //       filtered = filtered.filter(order => {
// // // // // // // //         return (
// // // // // // // //           order.fullname?.toLowerCase().includes(query) ||
// // // // // // // //           order.id?.toString().includes(query) ||
// // // // // // // //           order._id?.toString().includes(query) ||
// // // // // // // //           order.orderType?.toLowerCase().includes(query) ||
// // // // // // // //           order.cart.some((item: any) =>
// // // // // // // //             item.name.toLowerCase().includes(query) ||
// // // // // // // //             item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query))
// // // // // // // //           )
// // // // // // // //         );
// // // // // // // //       });
// // // // // // // //     }

// // // // // // // //     return filtered.sort((a, b) => {
// // // // // // // //       const dateA = new Date(a.createdAt || a.timestamp || 0);
// // // // // // // //       const dateB = new Date(b.createdAt || b.timestamp || 0);
// // // // // // // //       return dateB.getTime() - dateA.getTime();
// // // // // // // //     });
// // // // // // // //   }, [allOrders, activeStatus, searchQuery]);

// // // // // // // //   // Paginate orders
// // // // // // // //   const paginatedOrders = useMemo(() => {
// // // // // // // //     const startIndex = (currentPages[activeStatus] - 1) * pageSize;
// // // // // // // //     return filteredOrders.slice(startIndex, startIndex + pageSize);
// // // // // // // //   }, [filteredOrders, currentPages, activeStatus, pageSize]);

// // // // // // // //   // Calculate page count for current status
// // // // // // // //   const pageCount = Math.ceil(filteredOrders.length / pageSize);

// // // // // // // //   // Handle page change
// // // // // // // //   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
// // // // // // // //     setCurrentPages(prev => ({
// // // // // // // //       ...prev,
// // // // // // // //       [activeStatus]: value
// // // // // // // //     }));
// // // // // // // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // // // // // // //   };

// // // // // // // //   // Handle page size change
// // // // // // // //   const handlePageSizeChange = (event: any) => {
// // // // // // // //     const newSize = event.target.value;
// // // // // // // //     setPageSize(newSize);
// // // // // // // //     // Recalculate current page to avoid empty pages
// // // // // // // //     const newPage = Math.floor(((currentPages[activeStatus] - 1) * pageSize) / newSize) + 1;
// // // // // // // //     setCurrentPages(prev => ({
// // // // // // // //       ...prev,
// // // // // // // //       [activeStatus]: newPage
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   // Toggle functions
// // // // // // // //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed);
// // // // // // // //   const toggleViewMode = () => setViewMode(viewMode === "card" ? "list" : "card");

// // // // // // // //   // Action handlers
// // // // // // // //   const handleLogout = async () => {
// // // // // // // //     clearLocalhostStorage();
// // // // // // // //     await recordAttendance('getOut', user?.user?.email, data?.companyName);
// // // // // // // //     window.location.reload();
// // // // // // // //   };

// // // // // // // //   const handleOpenEditModal = (order: any) => {
// // // // // // // //     setSelectedOrder(order);
// // // // // // // //     setIsEditModalOpen(true);
// // // // // // // //   };

// // // // // // // //   const handleCloseEditModal = () => {
// // // // // // // //     setIsEditModalOpen(false);
// // // // // // // //     setSelectedOrder(null);
// // // // // // // //   };

// // // // // // // //   const saveUpdateData = async (updatedOrder: any) => {
// // // // // // // //     try {
// // // // // // // //       await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder);
// // // // // // // //       handleCloseEditModal();
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Failed to update order:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
// // // // // // // //     setActiveStatus(newValue);
// // // // // // // //     setCurrentPages(prev => ({
// // // // // // // //       ...prev,
// // // // // // // //       [newValue]: 1
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const clearSearch = () => {
// // // // // // // //     setSearchQuery("");
// // // // // // // //   };

// // // // // // // //   // Effects
// // // // // // // //   useEffect(() => {
// // // // // // // //     const interval = setInterval(() => {
// // // // // // // //       setDisplayTitle((prev) => !prev);
// // // // // // // //     }, 5000);
// // // // // // // //     return () => clearInterval(interval);
// // // // // // // //   }, []);

// // // // // // // //   useEffect(() => {
// // // // // // // //     setViewMode(isMobile ? "card" : "card");
// // // // // // // //     setPageSize(isMobile ? 5 : 10);
// // // // // // // //   }, [isMobile]);

// // // // // // // //   // Scroll to top button logic
// // // // // // // //   const trigger = useScrollTrigger({
// // // // // // // //     threshold: 100,
// // // // // // // //   });

// // // // // // // //   const scrollToTop = () => {
// // // // // // // //     window.scrollTo({
// // // // // // // //       top: 0,
// // // // // // // //       behavior: 'smooth',
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   // Order Card Component
// // // // // // // //   const OrderCard = React.memo(({ order }: { order: any }) => {
// // // // // // // //     const status = order.status;
// // // // // // // //     const config = statusConfig[status as keyof typeof statusConfig];
// // // // // // // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0);
// // // // // // // //     const total = order.cart.reduce((sum: any, item: any) => {
// // // // // // // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0;
// // // // // // // //       return sum + item.price * item.quantity + extrasTotal;
// // // // // // // //     }, 0);

// // // // // // // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // // // // //       hour: "2-digit",
// // // // // // // //       minute: "2-digit",
// // // // // // // //     });

// // // // // // // //     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette];

// // // // // // // //     return (
// // // // // // // //       <Card
// // // // // // // //         sx={{
// // // // // // // //           borderLeft: '4px solid',
// // // // // // // //           borderColor: paletteColor?.main || 'grey',
// // // // // // // //           mb: 2,
// // // // // // // //           position: 'relative',
// // // // // // // //           transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
// // // // // // // //           '&:hover': {
// // // // // // // //             transform: isMobile ? 'none' : 'translateY(-2px)',
// // // // // // // //             boxShadow: isMobile ? 'none' : theme.shadows[4]
// // // // // // // //           }
// // // // // // // //         }}
// // // // // // // //         component={motion.div}
// // // // // // // //         initial={{ opacity: 0, y: 10 }}
// // // // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // // // //         transition={{ duration: 0.2 }}
// // // // // // // //         exit={{ opacity: 0 }}
// // // // // // // //         layout
// // // // // // // //       >
// // // // // // // //         <CardContent>
// // // // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
// // // // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // // // //               #{order.id || order._id.slice(-4)}
// // // // // // // //             </Typography>
// // // // // // // //             <Chip
// // // // // // // //               size="small"
// // // // // // // //               label={order.orderType}
// // // // // // // //               color={config.color as any}
// // // // // // // //               icon={config.icon}
// // // // // // // //             />
// // // // // // // //           </Box>

// // // // // // // //           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
// // // // // // // //             <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // //             <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // // // //               {order.fullname}
// // // // // // // //             </Typography>
// // // // // // // //             <Box sx={{ flexGrow: 1 }} />
// // // // // // // //             <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // //             <Typography variant="body2">{formattedTime}</Typography>
// // // // // // // //           </Box>

// // // // // // // //           <Divider sx={{ my: 1 }} />

// // // // // // // //           <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
// // // // // // // //             Items ({totalItems})
// // // // // // // //           </Typography>

// // // // // // // //           <List dense disablePadding>
// // // // // // // //             {order.cart.slice(0, isMobile ? 2 : undefined).map((item: any) => (
// // // // // // // //               <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.25 }}>
// // // // // // // //                 <ListItemText
// // // // // // // //                   primary={
// // // // // // // //                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // //                       <Typography variant="body2">
// // // // // // // //                         <strong>{item.quantity}x</strong> {item.name}
// // // // // // // //                       </Typography>
// // // // // // // //                       <Typography variant="body2" sx={{ ml: 1 }}>
// // // // // // // //                         ${item.price.toFixed(2)}
// // // // // // // //                       </Typography>
// // // // // // // //                     </Box>
// // // // // // // //                   }
// // // // // // // //                   secondary={
// // // // // // // //                     item.extras?.length > 0 && (
// // // // // // // //                       <List dense disablePadding sx={{ ml: 2 }}>
// // // // // // // //                         {item.extras.slice(0, isMobile ? 1 : undefined).map((extra: any, idx: number) => (
// // // // // // // //                           <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0 }}>
// // // // // // // //                             <ListItemText
// // // // // // // //                               primary={
// // // // // // // //                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // //                                   <Typography variant="caption">+ {extra.name}</Typography>
// // // // // // // //                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // // // // // //                                 </Box>
// // // // // // // //                               }
// // // // // // // //                             />
// // // // // // // //                           </ListItem>
// // // // // // // //                         ))}
// // // // // // // //                       </List>
// // // // // // // //                     )
// // // // // // // //                   }
// // // // // // // //                 />
// // // // // // // //               </ListItem>
// // // // // // // //             ))}
// // // // // // // //             {isMobile && order.cart.length > 2 && (
// // // // // // // //               <Typography variant="caption" color="text.secondary">
// // // // // // // //                 +{order.cart.length - 2} más...
// // // // // // // //               </Typography>
// // // // // // // //             )}
// // // // // // // //           </List>

// // // // // // // //           <Divider sx={{ my: 1 }} />

// // // // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // // // //               Total: ${total.toFixed(2)}
// // // // // // // //             </Typography>

// // // // // // // //             <Stack direction="row" spacing={1}>
// // // // // // // //               {config.actions.map((action: any, idx: number) => (
// // // // // // // //                 <Button
// // // // // // // //                   key={`${action.action}-${idx}`}
// // // // // // // //                   size="small"
// // // // // // // //                   variant="contained"
// // // // // // // //                   color={action.color as any}
// // // // // // // //                   startIcon={action.icon}
// // // // // // // //                   onClick={(e) => {
// // // // // // // //                     e.stopPropagation();
// // // // // // // //                     handleOrderAction(action.action, order);
// // // // // // // //                   }}
// // // // // // // //                   disabled={isUpdating}
// // // // // // // //                 >
// // // // // // // //                   {action.label}
// // // // // // // //                 </Button>
// // // // // // // //               ))}

// // // // // // // //               <Button
// // // // // // // //                 size="small"
// // // // // // // //                 variant="outlined"
// // // // // // // //                 color="primary"
// // // // // // // //                 startIcon={<EditIcon />}
// // // // // // // //                 onClick={(e) => {
// // // // // // // //                   e.stopPropagation();
// // // // // // // //                   handleOpenEditModal(order);
// // // // // // // //                 }}
// // // // // // // //                 disabled={isUpdating}
// // // // // // // //               >
// // // // // // // //                 Editar
// // // // // // // //               </Button>
// // // // // // // //             </Stack>
// // // // // // // //           </Box>
// // // // // // // //         </CardContent>
// // // // // // // //       </Card>
// // // // // // // //     );
// // // // // // // //   });


// // // // // // // //   const OrderRow = React.memo(({ order }: { order: any }) => {
// // // // // // // //     const status = order.status;
// // // // // // // //     const config = statusConfig[status as keyof typeof statusConfig];
// // // // // // // //     const [expanded, setExpanded] = useState(false);
// // // // // // // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0);
// // // // // // // //     const total = order.cart.reduce((sum: any, item: any) => {
// // // // // // // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0;
// // // // // // // //       return sum + item.price * item.quantity + extrasTotal;
// // // // // // // //     }, 0);

// // // // // // // //     const commentsOrderGeneral = order?.comments;
// // // // // // // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // // // // //       hour: "2-digit",
// // // // // // // //       minute: "2-digit",
// // // // // // // //     });

// // // // // // // //     return (
// // // // // // // //       <>
// // // // // // // //         <TableRow
// // // // // // // //           component={motion.tr}
// // // // // // // //           // initial={{ opacity: 0 }}
// // // // // // // //           // animate={{ opacity: 1 }}
// // // // // // // //           // transition={{ duration: 0.2 }}
// // // // // // // //           // hover
// // // // // // // //           sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
// // // // // // // //           onClick={() => setExpanded(!expanded)}
// // // // // // // //         >
// // // // // // // //           <TableCell>
// // // // // // // //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // // // // // // //               <IconButton size="small" onClick={(e) => {
// // // // // // // //                 e.stopPropagation();
// // // // // // // //                 setExpanded(!expanded);
// // // // // // // //               }}>
// // // // // // // //                 {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
// // // // // // // //               </IconButton>
// // // // // // // //               <Typography variant="body2" fontWeight="bold">
// // // // // // // //                 #{order.id || order._id.slice(-4)}
// // // // // // // //               </Typography>
// // // // // // // //             </Box>
// // // // // // // //           </TableCell>
// // // // // // // //           <TableCell>
// // // // // // // //             <Box sx={{ display: "flex", alignItems: "center" }}>
// // // // // // // //               <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // // //               <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // // // //                 {order.fullname}
// // // // // // // //               </Typography>
// // // // // // // //             </Box>
// // // // // // // //           </TableCell>
// // // // // // // //           <TableCell>
// // // // // // // //             <Chip
// // // // // // // //               size="small"
// // // // // // // //               label={order.orderType}
// // // // // // // //               color={config.color as any}
// // // // // // // //               icon={config.icon}
// // // // // // // //             />
// // // // // // // //           </TableCell>
// // // // // // // //           <TableCell>
// // // // // // // //             <Typography variant="body2">{totalItems} items</Typography>
// // // // // // // //           </TableCell>
// // // // // // // //           <TableCell>
// // // // // // // //             <Typography variant="body2" fontWeight="bold">
// // // // // // // //               ${total.toFixed(2)}
// // // // // // // //             </Typography>
// // // // // // // //           </TableCell>
// // // // // // // //           <TableCell>
// // // // // // // //             <Typography variant="body2">{formattedTime}</Typography>
// // // // // // // //           </TableCell>
// // // // // // // //           <TableCell>
// // // // // // // //             <Tooltip title={commentsOrderGeneral || 'Sin comentarios'} arrow>
// // // // // // // //               <Typography variant="body2" noWrap sx={{ maxWidth: '150px' }}>
// // // // // // // //                 {commentsOrderGeneral || '-'}
// // // // // // // //               </Typography>
// // // // // // // //             </Tooltip>
// // // // // // // //           </TableCell>
// // // // // // // //           <TableCell>
// // // // // // // //             <Stack direction="row" spacing={1}>
// // // // // // // //               {config.actions.map((action: any, idx: number) => (
// // // // // // // //                 <Tooltip key={`${action.action}-${idx}`} title={action.label}>
// // // // // // // //                   <IconButton
// // // // // // // //                     size="small"
// // // // // // // //                     color={action.color as any}
// // // // // // // //                     onClick={(e) => {
// // // // // // // //                       e.stopPropagation();
// // // // // // // //                       handleOrderAction(action.action, order);
// // // // // // // //                     }}
// // // // // // // //                     disabled={isUpdating}
// // // // // // // //                   >
// // // // // // // //                     {action.icon}
// // // // // // // //                   </IconButton>
// // // // // // // //                 </Tooltip>
// // // // // // // //               ))}
// // // // // // // //               <Tooltip title="Editar">
// // // // // // // //                 <IconButton
// // // // // // // //                   size="small"
// // // // // // // //                   color="primary"
// // // // // // // //                   onClick={(e) => {
// // // // // // // //                     e.stopPropagation();
// // // // // // // //                     handleOpenEditModal(order);
// // // // // // // //                   }}
// // // // // // // //                   disabled={isUpdating}
// // // // // // // //                 >
// // // // // // // //                   <EditIcon fontSize="small" />
// // // // // // // //                 </IconButton>
// // // // // // // //               </Tooltip>
// // // // // // // //             </Stack>
// // // // // // // //           </TableCell>
// // // // // // // //         </TableRow>

// // // // // // // //         {/* Expanded details row */}
// // // // // // // //         <TableRow>
// // // // // // // //           <TableCell style={{ padding: 0 }} colSpan={8}>
// // // // // // // //             <motion.div
// // // // // // // //               initial={{ opacity: 0, height: 0 }}
// // // // // // // //               animate={{
// // // // // // // //                 opacity: expanded ? 1 : 0,
// // // // // // // //                 height: expanded ? 'auto' : 0
// // // // // // // //               }}
// // // // // // // //               transition={{ duration: 0.3, ease: 'easeInOut' }}
// // // // // // // //               style={{ overflow: 'hidden' }}
// // // // // // // //             >
// // // // // // // //               <Box sx={{
// // // // // // // //                 p: 3,
// // // // // // // //                 backgroundColor: theme.palette.mode === 'dark'
// // // // // // // //                   ? theme.palette.grey[900]
// // // // // // // //                   : theme.palette.grey[50],
// // // // // // // //                 borderBottom: `1px solid ${theme.palette.divider}`
// // // // // // // //               }}>
// // // // // // // //                 <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
// // // // // // // //                   Detalles de la Orden
// // // // // // // //                 </Typography>

// // // // // // // //                 <Grid container spacing={2}>
// // // // // // // //                   <Grid item xs={12} md={6}>
// // // // // // // //                     <Typography variant="subtitle2" gutterBottom>
// // // // // // // //                       Productos:
// // // // // // // //                     </Typography>
// // // // // // // //                     <List dense disablePadding>
// // // // // // // //                       {order.cart.map((item: any, index: number) => (
// // // // // // // //                         <motion.div
// // // // // // // //                           key={`${item.id}-${index}`}
// // // // // // // //                           initial={{ opacity: 0, x: -10 }}
// // // // // // // //                           animate={{ opacity: 1, x: 0 }}
// // // // // // // //                           transition={{ delay: index * 0.05 }}
// // // // // // // //                         >
// // // // // // // //                           <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // // // //                             <ListItemText
// // // // // // // //                               primary={
// // // // // // // //                                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
// // // // // // // //                                   <Typography variant="body2">
// // // // // // // //                                     <strong>{item.quantity}x</strong> {item.name}
// // // // // // // //                                   </Typography>
// // // // // // // //                                   <Typography variant="body2">
// // // // // // // //                                     ${(item.price * item.quantity).toFixed(2)}
// // // // // // // //                                   </Typography>
// // // // // // // //                                 </Box>
// // // // // // // //                               }
// // // // // // // //                               secondary={
// // // // // // // //                                 item.extras?.length > 0 && (
// // // // // // // //                                   <List dense disablePadding sx={{ ml: 2, mt: 0.5 }}>
// // // // // // // //                                     {item.extras.map((extra: any, idx: number) => (
// // // // // // // //                                       <motion.div
// // // // // // // //                                         key={`${item.id}-extra-${idx}`}
// // // // // // // //                                         initial={{ opacity: 0, x: -10 }}
// // // // // // // //                                         animate={{ opacity: 1, x: 0 }}
// // // // // // // //                                         transition={{ delay: (index + 1) * 0.05 + idx * 0.03 }}
// // // // // // // //                                       >
// // // // // // // //                                         <ListItem disablePadding sx={{ py: 0 }}>
// // // // // // // //                                           <ListItemText
// // // // // // // //                                             primary={
// // // // // // // //                                               <Box sx={{
// // // // // // // //                                                 display: 'flex',
// // // // // // // //                                                 justifyContent: 'space-between',
// // // // // // // //                                                 alignItems: 'center'
// // // // // // // //                                               }}>
// // // // // // // //                                                 <Typography variant="caption">
// // // // // // // //                                                   + {extra.name}
// // // // // // // //                                                 </Typography>
// // // // // // // //                                                 <Typography variant="caption">
// // // // // // // //                                                   ${extra.price.toFixed(2)}
// // // // // // // //                                                 </Typography>
// // // // // // // //                                               </Box>
// // // // // // // //                                             }
// // // // // // // //                                           />
// // // // // // // //                                         </ListItem>
// // // // // // // //                                       </motion.div>
// // // // // // // //                                     ))}
// // // // // // // //                                   </List>
// // // // // // // //                                 )
// // // // // // // //                               }
// // // // // // // //                             />
// // // // // // // //                           </ListItem>
// // // // // // // //                           <Divider sx={{ my: 0.5 }} />
// // // // // // // //                         </motion.div>
// // // // // // // //                       ))}
// // // // // // // //                     </List>
// // // // // // // //                   </Grid>

// // // // // // // //                   <Grid item xs={12} md={6}>
// // // // // // // //                     <Typography variant="subtitle2" gutterBottom>
// // // // // // // //                       Información Adicional:
// // // // // // // //                     </Typography>
// // // // // // // //                     <List dense disablePadding>
// // // // // // // //                       <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // // // //                         <ListItemText
// // // // // // // //                           primary={
// // // // // // // //                             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
// // // // // // // //                               <Typography variant="body2">
// // // // // // // //                                 <strong>Estado:</strong>
// // // // // // // //                               </Typography>
// // // // // // // //                               <Chip
// // // // // // // //                                 size="small"
// // // // // // // //                                 label={config.label}
// // // // // // // //                                 color={config.color as any}
// // // // // // // //                                 icon={config.icon}
// // // // // // // //                               />
// // // // // // // //                             </Box>
// // // // // // // //                           }
// // // // // // // //                         />
// // // // // // // //                       </ListItem>
// // // // // // // //                       <Divider sx={{ my: 0.5 }} />

// // // // // // // //                       <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // // // //                         <ListItemText
// // // // // // // //                           primary={
// // // // // // // //                             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
// // // // // // // //                               <Typography variant="body2">
// // // // // // // //                                 <strong>Total:</strong>
// // // // // // // //                               </Typography>
// // // // // // // //                               <Typography variant="body2" fontWeight="bold">
// // // // // // // //                                 ${total.toFixed(2)}
// // // // // // // //                               </Typography>
// // // // // // // //                             </Box>
// // // // // // // //                           }
// // // // // // // //                         />
// // // // // // // //                       </ListItem>
// // // // // // // //                       <Divider sx={{ my: 0.5 }} />

// // // // // // // //                       {commentsOrderGeneral && (
// // // // // // // //                         <>
// // // // // // // //                           <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // // // //                             <ListItemText
// // // // // // // //                               primary={
// // // // // // // //                                 <Box>
// // // // // // // //                                   <Typography variant="body2">
// // // // // // // //                                     <strong>Comentarios:</strong>
// // // // // // // //                                   </Typography>
// // // // // // // //                                   <Typography variant="body2" sx={{ mt: 0.5 }}>
// // // // // // // //                                     {commentsOrderGeneral}
// // // // // // // //                                   </Typography>
// // // // // // // //                                 </Box>
// // // // // // // //                               }
// // // // // // // //                             />
// // // // // // // //                           </ListItem>
// // // // // // // //                           <Divider sx={{ my: 0.5 }} />
// // // // // // // //                         </>
// // // // // // // //                       )}

// // // // // // // //                       <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // // // //                         <ListItemText
// // // // // // // //                           primary={
// // // // // // // //                             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
// // // // // // // //                               <Typography variant="body2">
// // // // // // // //                                 <strong>Hora:</strong>
// // // // // // // //                               </Typography>
// // // // // // // //                               <Typography variant="body2">
// // // // // // // //                                 {formattedTime}
// // // // // // // //                               </Typography>
// // // // // // // //                             </Box>
// // // // // // // //                           }
// // // // // // // //                         />
// // // // // // // //                       </ListItem>
// // // // // // // //                     </List>
// // // // // // // //                   </Grid>
// // // // // // // //                 </Grid>
// // // // // // // //               </Box>
// // // // // // // //             </motion.div>
// // // // // // // //           </TableCell>
// // // // // // // //         </TableRow>
// // // // // // // //       </>
// // // // // // // //     );
// // // // // // // //   });






// // // // // // // //   // Custom Pagination Controls
// // // // // // // //   const PaginationControls = () => (
// // // // // // // //     <Box sx={{
// // // // // // // //       display: 'flex',
// // // // // // // //       justifyContent: 'space-between',
// // // // // // // //       alignItems: 'center',
// // // // // // // //       mt: 3,
// // // // // // // //       pb: 2,
// // // // // // // //       flexDirection: isMobile ? 'column' : 'row',
// // // // // // // //       gap: isMobile ? 2 : 0
// // // // // // // //     }}>
// // // // // // // //       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // // // // // // //         <Typography variant="body2" color="text.secondary">
// // // // // // // //           Órdenes por página:
// // // // // // // //         </Typography>
// // // // // // // //         <FormControl size="small" variant="outlined">
// // // // // // // //           <Select
// // // // // // // //             value={pageSize}
// // // // // // // //             onChange={handlePageSizeChange}
// // // // // // // //             sx={{ height: '36px' }}
// // // // // // // //           >
// // // // // // // //             {pageSizeOptions.map(size => (
// // // // // // // //               <MenuItem key={size} value={size}>{size}</MenuItem>
// // // // // // // //             ))}
// // // // // // // //           </Select>
// // // // // // // //         </FormControl>
// // // // // // // //       </Box>

// // // // // // // //       <Pagination
// // // // // // // //         count={pageCount}
// // // // // // // //         page={currentPages[activeStatus]}
// // // // // // // //         onChange={handlePageChange}
// // // // // // // //         color="primary"
// // // // // // // //         size={isMobile ? "small" : "medium"}
// // // // // // // //         showFirstButton
// // // // // // // //         showLastButton
// // // // // // // //         siblingCount={isMobile ? 0 : 1}
// // // // // // // //         boundaryCount={isMobile ? 1 : 2}
// // // // // // // //       />

// // // // // // // //       <Typography variant="body2" color="text.secondary">
// // // // // // // //         Mostrando {((currentPages[activeStatus] - 1) * pageSize + 1)}-
// // // // // // // //         {Math.min(currentPages[activeStatus] * pageSize, filteredOrders.length)} de {filteredOrders.length} órdenes
// // // // // // // //       </Typography>
// // // // // // // //     </Box>
// // // // // // // //   );

// // // // // // // //   // Main render
// // // // // // // //   return (
// // // // // // // //     <Box sx={{
// // // // // // // //       height: "100vh",
// // // // // // // //       overflow: "hidden",
// // // // // // // //       bgcolor: theme.palette.background.default,
// // // // // // // //       display: "flex",
// // // // // // // //       flexDirection: "column"
// // // // // // // //     }}>
// // // // // // // //       {/* Custom AppBar */}
// // // // // // // //       <AppBar
// // // // // // // //         position="sticky"
// // // // // // // //         elevation={0}
// // // // // // // //         sx={{
// // // // // // // //           bgcolor: "background.paper",
// // // // // // // //           color: "text.primary",
// // // // // // // //           borderBottom: 1,
// // // // // // // //           borderColor: "divider",
// // // // // // // //         }}
// // // // // // // //       >
// // // // // // // //         <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
// // // // // // // //           {/* Logo and Title */}
// // // // // // // //           <Box
// // // // // // // //             sx={{
// // // // // // // //               display: "flex",
// // // // // // // //               alignItems: "center",
// // // // // // // //               gap: 1,
// // // // // // // //               flexGrow: 1,
// // // // // // // //               height: "40px",
// // // // // // // //               position: "relative",
// // // // // // // //               overflow: "hidden",
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // // // // // // //               <Avatar
// // // // // // // //                 sx={{
// // // // // // // //                   width: 28,
// // // // // // // //                   height: 28,
// // // // // // // //                   flexShrink: 0,
// // // // // // // //                   ml: 0.5,
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <Image
// // // // // // // //                   src={"/images/flama.png"}
// // // // // // // //                   alt={"LlakaScript"}
// // // // // // // //                   width={28}
// // // // // // // //                   height={28}
// // // // // // // //                   priority
// // // // // // // //                   style={{
// // // // // // // //                     objectFit: "contain",
// // // // // // // //                     width: "100%",
// // // // // // // //                     height: "100%",
// // // // // // // //                   }}
// // // // // // // //                 />
// // // // // // // //               </Avatar>
// // // // // // // //             </motion.div>

// // // // // // // //             <Box
// // // // // // // //               sx={{
// // // // // // // //                 position: "relative",
// // // // // // // //                 width: "auto",
// // // // // // // //                 height: "100%",
// // // // // // // //                 display: "flex",
// // // // // // // //                 alignItems: "center",
// // // // // // // //                 flexGrow: 1,
// // // // // // // //               }}
// // // // // // // //             >
// // // // // // // //               <AnimatePresence mode="wait">
// // // // // // // //                 <motion.div
// // // // // // // //                   key={displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // // // //                   initial={{ opacity: 0, x: -10 }}
// // // // // // // //                   animate={{ opacity: 1, x: 0 }}
// // // // // // // //                   exit={{ opacity: 0, x: 10 }}
// // // // // // // //                   transition={{ duration: 0.3 }}
// // // // // // // //                   style={{
// // // // // // // //                     position: "absolute",
// // // // // // // //                     left: 0,
// // // // // // // //                     whiteSpace: "nowrap",
// // // // // // // //                   }}
// // // // // // // //                 >
// // // // // // // //                   <Typography
// // // // // // // //                     variant={isMobile ? "subtitle1" : "h6"}
// // // // // // // //                     sx={{
// // // // // // // //                       fontWeight: 600,
// // // // // // // //                       lineHeight: 1.1,
// // // // // // // //                       fontSize: isMobile ? "1rem" : undefined,
// // // // // // // //                     }}
// // // // // // // //                   >
// // // // // // // //                     {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // // // //                   </Typography>
// // // // // // // //                 </motion.div>
// // // // // // // //               </AnimatePresence>
// // // // // // // //             </Box>
// // // // // // // //           </Box>

// // // // // // // //           {/* Right side controls */}
// // // // // // // //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// // // // // // // //             {/* View mode toggle */}
// // // // // // // //             <Tooltip title={viewMode === "card" ? "Vista lista" : "Vista tarjetas"}>
// // // // // // // //               <motion.div whileHover={{ scale: 1.1 }}>
// // // // // // // //                 <IconButton
// // // // // // // //                   size="small"
// // // // // // // //                   onClick={toggleViewMode}
// // // // // // // //                   color="default"
// // // // // // // //                 >
// // // // // // // //                   {viewMode === "card" ? <ViewListIcon fontSize="small" /> : <ViewColumnIcon fontSize="small" />}
// // // // // // // //                 </IconButton>
// // // // // // // //               </motion.div>
// // // // // // // //             </Tooltip>

// // // // // // // //             {/* Connection status indicator */}
// // // // // // // //             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
// // // // // // // //               <motion.div
// // // // // // // //                 animate={{
// // // // // // // //                   scale: isConnected ? [1, 1.2, 1] : 1,
// // // // // // // //                   transition: isConnected ? { repeat: Infinity, duration: 2 } : {}
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <Box
// // // // // // // //                   sx={{
// // // // // // // //                     width: 10,
// // // // // // // //                     height: 10,
// // // // // // // //                     borderRadius: '50%',
// // // // // // // //                     bgcolor: isConnected ? 'success.main' : 'error.main',
// // // // // // // //                     mr: 1,
// // // // // // // //                   }}
// // // // // // // //                 />
// // // // // // // //               </motion.div>
// // // // // // // //             </Tooltip>

// // // // // // // //             {/* Order count badge */}
// // // // // // // //             {isMobile && totalOrders > 0 && (
// // // // // // // //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// // // // // // // //                 <Box sx={{ width: 4, height: 4 }} />
// // // // // // // //               </Badge>
// // // // // // // //             )}

// // // // // // // //             {/* Last refresh time */}
// // // // // // // //             {lastRefresh && !isMobile && (
// // // // // // // //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// // // // // // // //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// // // // // // // //               </Typography>
// // // // // // // //             )}

// // // // // // // //             {/* Refresh button */}
// // // // // // // //             <Tooltip title="Actualizar">
// // // // // // // //               <motion.div whileHover={{ rotate: 90 }} transition={{ type: 'spring' }}>
// // // // // // // //                 <IconButton
// // // // // // // //                   color="primary"
// // // // // // // //                   size="small"
// // // // // // // //                   onClick={fetchHistoricalOrders}
// // // // // // // //                   disabled={isLoading || isUpdating}
// // // // // // // //                 >
// // // // // // // //                   <RefreshIcon fontSize="small" />
// // // // // // // //                 </IconButton>
// // // // // // // //               </motion.div>
// // // // // // // //             </Tooltip>

// // // // // // // //             {/* Header collapse toggle (mobile only) */}
// // // // // // // //             {isMobile && (
// // // // // // // //               <IconButton size="small" onClick={toggleHeader}>
// // // // // // // //                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
// // // // // // // //               </IconButton>
// // // // // // // //             )}

// // // // // // // //             <Tooltip title="Salir">
// // // // // // // //               <motion.div
// // // // // // // //                 whileHover={{ scale: 1.1 }}
// // // // // // // //                 whileTap={{ scale: 0.9 }}
// // // // // // // //                 transition={{ type: 'spring', stiffness: 400, damping: 10 }}
// // // // // // // //               >
// // // // // // // //                 <IconButton
// // // // // // // //                   size="small"
// // // // // // // //                   onClick={handleLogout}
// // // // // // // //                   color="default"
// // // // // // // //                 >
// // // // // // // //                   <LogoutIcon fontSize="small" />
// // // // // // // //                 </IconButton>
// // // // // // // //               </motion.div>
// // // // // // // //             </Tooltip>
// // // // // // // //           </Box>
// // // // // // // //         </Toolbar>
// // // // // // // //       </AppBar>

// // // // // // // //       {/* Main content */}
// // // // // // // //       <Box
// // // // // // // //         component="main"
// // // // // // // //         sx={{
// // // // // // // //           p: { xs: 0.5, sm: 2 },
// // // // // // // //           flex: 1,
// // // // // // // //           overflow: "auto",
// // // // // // // //           display: "flex",
// // // // // // // //           flexDirection: "column",
// // // // // // // //         }}
// // // // // // // //       >
// // // // // // // //         <Paper
// // // // // // // //           elevation={isMobile ? 1 : 3}
// // // // // // // //           sx={{
// // // // // // // //             height: "100%",
// // // // // // // //             display: "flex",
// // // // // // // //             flexDirection: "column",
// // // // // // // //             overflow: "hidden",
// // // // // // // //             borderRadius: { xs: 1, sm: 2 },
// // // // // // // //           }}
// // // // // // // //         >
// // // // // // // //           {/* Status header - collapsible on mobile */}
// // // // // // // //           <motion.div
// // // // // // // //             initial={false}
// // // // // // // //             animate={{
// // // // // // // //               height: headerCollapsed ? 0 : 'auto',
// // // // // // // //               opacity: headerCollapsed ? 0 : 1
// // // // // // // //             }}
// // // // // // // //             transition={{ type: 'spring', damping: 25 }}
// // // // // // // //             style={{
// // // // // // // //               display: "flex",
// // // // // // // //               flexDirection: "column",
// // // // // // // //               borderBottom: '1px solid',
// // // // // // // //               borderColor: theme.palette.divider,
// // // // // // // //               overflow: "hidden",
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             {/* Search bar */}
// // // // // // // //             <Box sx={{ p: 2, pb: 0 }}>
// // // // // // // //               <TextField
// // // // // // // //                 fullWidth
// // // // // // // //                 variant="outlined"
// // // // // // // //                 placeholder="Buscar órdenes..."
// // // // // // // //                 value={searchQuery}
// // // // // // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // // // // // //                 InputProps={{
// // // // // // // //                   startAdornment: (
// // // // // // // //                     <InputAdornment position="start">
// // // // // // // //                       <SearchIcon />
// // // // // // // //                     </InputAdornment>
// // // // // // // //                   ),
// // // // // // // //                   endAdornment: searchQuery && (
// // // // // // // //                     <InputAdornment position="end">
// // // // // // // //                       <IconButton onClick={clearSearch} size="small">
// // // // // // // //                         <ClearIcon fontSize="small" />
// // // // // // // //                       </IconButton>
// // // // // // // //                     </InputAdornment>
// // // // // // // //                   ),
// // // // // // // //                 }}
// // // // // // // //               />
// // // // // // // //             </Box>

// // // // // // // //             {/* Status tabs */}
// // // // // // // //             <Box sx={{ px: 2, pt: 1 }}>
// // // // // // // //               <Tabs
// // // // // // // //                 value={activeStatus}
// // // // // // // //                 onChange={handleStatusChange}
// // // // // // // //                 variant="scrollable"
// // // // // // // //                 scrollButtons="auto"
// // // // // // // //                 allowScrollButtonsMobile
// // // // // // // //               >
// // // // // // // //                 <Tab label="Todas" value="all" />
// // // // // // // //                 {statusOptions.map(status => (
// // // // // // // //                   <Tab
// // // // // // // //                     key={status}
// // // // // // // //                     label={statusConfig[status as keyof typeof statusConfig].label}
// // // // // // // //                     value={status}
// // // // // // // //                     icon={statusConfig[status as keyof typeof statusConfig].icon}
// // // // // // // //                     iconPosition="start"
// // // // // // // //                   />
// // // // // // // //                 ))}
// // // // // // // //               </Tabs>
// // // // // // // //             </Box>

// // // // // // // //             {/* Status indicators */}
// // // // // // // //             {(isLoading || isUpdating) && (
// // // // // // // //               <Box
// // // // // // // //                 sx={{
// // // // // // // //                   display: "flex",
// // // // // // // //                   alignItems: "center",
// // // // // // // //                   gap: 1,
// // // // // // // //                   p: 1,
// // // // // // // //                   mx: 1,
// // // // // // // //                   mb: 1,
// // // // // // // //                   backgroundColor: theme.palette.action.hover,
// // // // // // // //                   borderRadius: 1,
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <CircularProgress size={16} />
// // // // // // // //                 <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// // // // // // // //                   {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// // // // // // // //                 </Typography>
// // // // // // // //               </Box>
// // // // // // // //             )}
// // // // // // // //           </motion.div>

// // // // // // // //           {/* Error messages */}
// // // // // // // //           <Box
// // // // // // // //             sx={{
// // // // // // // //               px: { xs: 1, sm: 2 },
// // // // // // // //               pt: { xs: 1, sm: 1 },
// // // // // // // //               overflow: "auto",
// // // // // // // //               flexShrink: 0,
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             <AnimatePresence>
// // // // // // // //               {error && (
// // // // // // // //                 <motion.div
// // // // // // // //                   initial={{ opacity: 0, y: -20 }}
// // // // // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // // // // //                   exit={{ opacity: 0, y: -20 }}
// // // // // // // //                   transition={{ type: 'spring' }}
// // // // // // // //                 >
// // // // // // // //                   <Alert
// // // // // // // //                     severity="error"
// // // // // // // //                     onClose={() => clearMessages()}
// // // // // // // //                     sx={{ mb: 1 }}
// // // // // // // //                   >
// // // // // // // //                     {error}
// // // // // // // //                   </Alert>
// // // // // // // //                 </motion.div>
// // // // // // // //               )}
// // // // // // // //             </AnimatePresence>

// // // // // // // //             <AnimatePresence>
// // // // // // // //               {successMessage && (
// // // // // // // //                 <motion.div
// // // // // // // //                   initial={{ opacity: 0, y: -20 }}
// // // // // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // // // // //                   exit={{ opacity: 0, y: -20 }}
// // // // // // // //                   transition={{ type: 'spring' }}
// // // // // // // //                 >
// // // // // // // //                   <Alert
// // // // // // // //                     severity="success"
// // // // // // // //                     onClose={() => clearMessages()}
// // // // // // // //                     sx={{ mb: 1 }}
// // // // // // // //                   >
// // // // // // // //                     {successMessage}
// // // // // // // //                   </Alert>
// // // // // // // //                 </motion.div>
// // // // // // // //               )}
// // // // // // // //             </AnimatePresence>
// // // // // // // //           </Box>

// // // // // // // //           {/* Main content - takes all available space */}
// // // // // // // //           <Box
// // // // // // // //             sx={{
// // // // // // // //               flex: 1,
// // // // // // // //               overflow: "auto",
// // // // // // // //               display: "flex",
// // // // // // // //               flexDirection: "column",
// // // // // // // //               p: { xs: 1, sm: 2 }
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             <PendingOrdersDialog
// // // // // // // //               open={openPendingDialog}
// // // // // // // //               onClose={() => setOpenPendingDialog(false)}
// // // // // // // //             />

// // // // // // // //             {/* Orders list */}
// // // // // // // //             <Box sx={{ flex: 1 }}>
// // // // // // // //               <AnimatePresence mode="wait">
// // // // // // // //                 <motion.div
// // // // // // // //                   key={`${activeStatus}-${searchQuery}-${viewMode}`}
// // // // // // // //                   initial={{ opacity: 0 }}
// // // // // // // //                   animate={{ opacity: 1 }}
// // // // // // // //                   exit={{ opacity: 0 }}
// // // // // // // //                   transition={{ duration: 0.2 }}
// // // // // // // //                 >
// // // // // // // //                   {filteredOrders.length === 0 ? (
// // // // // // // //                     <Box sx={{
// // // // // // // //                       display: 'flex',
// // // // // // // //                       justifyContent: 'center',
// // // // // // // //                       alignItems: 'center',
// // // // // // // //                       height: '200px',
// // // // // // // //                       flexDirection: 'column',
// // // // // // // //                       gap: 2
// // // // // // // //                     }}>
// // // // // // // //                       <Typography variant="h6" color="text.secondary">
// // // // // // // //                         No se encontraron órdenes
// // // // // // // //                       </Typography>
// // // // // // // //                       <Button
// // // // // // // //                         variant="outlined"
// // // // // // // //                         onClick={() => {
// // // // // // // //                           setSearchQuery("");
// // // // // // // //                           setActiveStatus("all");
// // // // // // // //                         }}
// // // // // // // //                       >
// // // // // // // //                         Limpiar filtros
// // // // // // // //                       </Button>
// // // // // // // //                     </Box>
// // // // // // // //                   ) : viewMode === "card" ? (
// // // // // // // //                     <>
// // // // // // // //                       <Grid container spacing={isMobile ? 1 : 3}>
// // // // // // // //                         {paginatedOrders.map((order: any) => (
// // // // // // // //                           <Grid item xs={12} key={order._id || order.id}>
// // // // // // // //                             <OrderCard order={order} />
// // // // // // // //                           </Grid>
// // // // // // // //                         ))}
// // // // // // // //                       </Grid>
// // // // // // // //                       <PaginationControls />
// // // // // // // //                     </>
// // // // // // // //                   ) : (
// // // // // // // //                     <>
// // // // // // // //                       <TableContainer
// // // // // // // //                         component={Paper}
// // // // // // // //                         elevation={0}
// // // // // // // //                         sx={{
// // // // // // // //                           position: 'relative',
// // // // // // // //                           overflow: 'hidden',
// // // // // // // //                           '&:before': {
// // // // // // // //                             content: '""',
// // // // // // // //                             position: 'absolute',
// // // // // // // //                             top: 0,
// // // // // // // //                             left: 0,
// // // // // // // //                             right: 0,
// // // // // // // //                             height: '4px',
// // // // // // // //                             background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
// // // // // // // //                             zIndex: 1
// // // // // // // //                           }
// // // // // // // //                         }}
// // // // // // // //                       >
// // // // // // // //                         <motion.div
// // // // // // // //                           initial={{ opacity: 0 }}
// // // // // // // //                           animate={{ opacity: 1 }}
// // // // // // // //                           transition={{ duration: 0.5 }}
// // // // // // // //                         >
// // // // // // // //                           <Table size={isMobile ? "small" : "medium"}>
// // // // // // // //                             <TableHead>
// // // // // // // //                               <TableRow>
// // // // // // // //                                 <TableCell>ID</TableCell>
// // // // // // // //                                 <TableCell>Cliente</TableCell>
// // // // // // // //                                 <TableCell>Estado</TableCell>
// // // // // // // //                                 <TableCell>Items</TableCell>
// // // // // // // //                                 <TableCell>Total</TableCell>
// // // // // // // //                                 <TableCell>Hora</TableCell>
// // // // // // // //                                 <TableCell>Comentarios</TableCell>
// // // // // // // //                                 <TableCell>Acciones</TableCell>
// // // // // // // //                               </TableRow>
// // // // // // // //                             </TableHead>
// // // // // // // //                             <TableBody>
// // // // // // // //                               {paginatedOrders.map((order: any) => (
// // // // // // // //                                 <OrderRow key={order._id || order.id} order={order} />
// // // // // // // //                               ))}
// // // // // // // //                             </TableBody>
// // // // // // // //                           </Table>
// // // // // // // //                         </motion.div>
// // // // // // // //                       </TableContainer>
// // // // // // // //                       <PaginationControls />
// // // // // // // //                     </>
// // // // // // // //                   )}
// // // // // // // //                 </motion.div>
// // // // // // // //               </AnimatePresence>
// // // // // // // //             </Box>
// // // // // // // //           </Box>
// // // // // // // //         </Paper>

// // // // // // // //         {/* Scroll to top button */}
// // // // // // // //         <Zoom in={trigger}>
// // // // // // // //           <Box
// // // // // // // //             onClick={scrollToTop}
// // // // // // // //             role="presentation"
// // // // // // // //             sx={{
// // // // // // // //               position: 'fixed',
// // // // // // // //               bottom: 16,
// // // // // // // //               right: 16,
// // // // // // // //               zIndex: 1000,
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             <Fab color="primary" size="small" aria-label="scroll back to top">
// // // // // // // //               <KeyboardArrowUp />
// // // // // // // //             </Fab>
// // // // // // // //           </Box>
// // // // // // // //         </Zoom>
// // // // // // // //       </Box >

// // // // // // // //       {/* Edit Order Modal */}
// // // // // // // //       <AnimatePresence>
// // // // // // // //         {
// // // // // // // //           isEditModalOpen && selectedOrder && (
// // // // // // // //             <EditOrderModal
// // // // // // // //               open={isEditModalOpen}
// // // // // // // //               order={selectedOrder}
// // // // // // // //               onSave={saveUpdateData}
// // // // // // // //               menuData={{
// // // // // // // //                 mainMenu: hojas?.Hoja1 || [],
// // // // // // // //                 promotions: hojas?.Promotion || []
// // // // // // // //               }}
// // // // // // // //               onClose={handleCloseEditModal}
// // // // // // // //             />
// // // // // // // //           )
// // // // // // // //         }
// // // // // // // //       </AnimatePresence >
// // // // // // // //     </Box >
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default OrderSpeedGeneric;

// // // // // // // "use client"

// // // // // // // import React, { useMemo, useState, useEffect } from "react"
// // // // // // // import { useSelector } from "react-redux"
// // // // // // // import type { RootState } from "../../../store/store"
// // // // // // // import {
// // // // // // //   Box,
// // // // // // //   Button,
// // // // // // //   Chip,
// // // // // // //   CircularProgress,
// // // // // // //   Paper,
// // // // // // //   Typography,
// // // // // // //   Alert,
// // // // // // //   Grid,
// // // // // // //   List,
// // // // // // //   ListItem,
// // // // // // //   ListItemText,
// // // // // // //   Avatar,
// // // // // // //   IconButton,
// // // // // // //   Card,
// // // // // // //   CardContent,
// // // // // // //   Divider,
// // // // // // //   Badge,
// // // // // // //   Tooltip,
// // // // // // //   AppBar,
// // // // // // //   Toolbar,
// // // // // // //   useMediaQuery,
// // // // // // //   useTheme,
// // // // // // //   Stack,
// // // // // // //   useScrollTrigger,
// // // // // // //   Fab,
// // // // // // //   Zoom,
// // // // // // //   TextField,
// // // // // // //   InputAdornment,
// // // // // // //   Pagination,
// // // // // // //   Tabs,
// // // // // // //   Tab,
// // // // // // //   Table,
// // // // // // //   TableBody,
// // // // // // //   TableCell,
// // // // // // //   TableContainer,
// // // // // // //   TableHead,
// // // // // // //   TableRow,
// // // // // // //   MenuItem,
// // // // // // //   Select,
// // // // // // //   FormControl,
// // // // // // // } from "@mui/material"
// // // // // // // import {
// // // // // // //   Edit as EditIcon,
// // // // // // //   Refresh as RefreshIcon,
// // // // // // //   ExpandMore as ExpandMoreIcon,
// // // // // // //   ExpandLess as ExpandLessIcon,
// // // // // // //   CheckCircle as CheckCircleIcon,
// // // // // // //   PauseCircle as PauseCircleIcon,
// // // // // // //   Cancel as CancelIcon,
// // // // // // //   DeliveryDining as DeliveryIcon,
// // // // // // //   PlayArrow,
// // // // // // //   Pause,
// // // // // // //   ViewList as ViewListIcon,
// // // // // // //   ViewColumn as ViewColumnIcon,
// // // // // // //   Logout as LogoutIcon,
// // // // // // //   AccessTime,
// // // // // // //   Person,
// // // // // // //   KeyboardArrowUp,
// // // // // // //   Search as SearchIcon,
// // // // // // //   Clear as ClearIcon,
// // // // // // // } from "@mui/icons-material"
// // // // // // // import { useOrdersManagementSocketApi } from "../../../hooks/useOrdersManagementSocketApi"
// // // // // // // import EditOrderModal from "../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal"
// // // // // // // import { motion, AnimatePresence } from "framer-motion"
// // // // // // // import Image from "next/image"
// // // // // // // import { clearLocalhostStorage } from "@/services/localstorage.services"
// // // // // // // import { recordAttendance } from "@/services/attendance.services"
// // // // // // // import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog"

// // // // // // // // Status configuration
// // // // // // // const statusConfig = {
// // // // // // //   pending: {
// // // // // // //     color: "default",
// // // // // // //     icon: <PauseCircleIcon color="disabled" />,
// // // // // // //     label: "Pendientes",
// // // // // // //     actions: [{ action: "start", label: "Iniciar", color: "primary", icon: <PlayArrow /> }],
// // // // // // //   },
// // // // // // //   processing: {
// // // // // // //     color: "primary",
// // // // // // //     icon: <PlayArrow color="primary" />,
// // // // // // //     label: "En Proceso",
// // // // // // //     actions: [
// // // // // // //       { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
// // // // // // //       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
// // // // // // //     ],
// // // // // // //   },
// // // // // // //   paused: {
// // // // // // //     color: "warning",
// // // // // // //     icon: <Pause color="warning" />,
// // // // // // //     label: "Pausadas",
// // // // // // //     actions: [
// // // // // // //       { action: "resume", label: "Reanudar", color: "primary", icon: <PlayArrow /> },
// // // // // // //       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
// // // // // // //     ],
// // // // // // //   },
// // // // // // //   finished: {
// // // // // // //     color: "success",
// // // // // // //     icon: <CheckCircleIcon color="success" />,
// // // // // // //     label: "Terminadas",
// // // // // // //     actions: [{ action: "deliver", label: "Entregar", color: "success", icon: <DeliveryIcon /> }],
// // // // // // //   },
// // // // // // //   cancelled: {
// // // // // // //     color: "error",
// // // // // // //     icon: <CancelIcon color="error" />,
// // // // // // //     label: "Canceladas",
// // // // // // //     actions: [{ action: "reopen", label: "Reabrir", color: "primary", icon: <PlayArrow /> }],
// // // // // // //   },
// // // // // // //   delivered: {
// // // // // // //     color: "success",
// // // // // // //     icon: <DeliveryIcon color="success" />,
// // // // // // //     label: "Entregadas",
// // // // // // //     actions: [],
// // // // // // //   },
// // // // // // // }

// // // // // // // const statusOptions = Object.keys(statusConfig)
// // // // // // // const pageSizeOptions = [5, 10, 20, 50]

// // // // // // // const OrderSpeedGeneric = () => {
// // // // // // //   const theme = useTheme()
// // // // // // //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
// // // // // // //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
// // // // // // //   const [displayTitle, setDisplayTitle] = useState(false)
// // // // // // //   const [viewMode, setViewMode] = useState<"card" | "list">(isMobile ? "card" : "card")
// // // // // // //   const [openPendingDialog, setOpenPendingDialog] = useState(false)
// // // // // // //   const [selectedOrder, setSelectedOrder] = useState<any>(null)
// // // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
// // // // // // //   const [searchQuery, setSearchQuery] = useState("")
// // // // // // //   const [activeStatus, setActiveStatus] = useState("all")
// // // // // // //   const [currentPages, setCurrentPages] = useState<Record<string, number>>(
// // // // // // //     statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 }),
// // // // // // //   )

// // // // // // //   const [isTapped, setIsTapped] = useState(false)
// // // // // // //   const [expandedRows, setExpandedRows] = useState<string[]>([])

// // // // // // //   const [pageSize, setPageSize] = useState(isMobile ? 5 : 10)

// // // // // // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
// // // // // // //   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } }

// // // // // // //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email")

// // // // // // //   const {
// // // // // // //     allOrders,
// // // // // // //     ordersByStatus,
// // // // // // //     isConnected,
// // // // // // //     isLoading,
// // // // // // //     isUpdating,
// // // // // // //     error,
// // // // // // //     successMessage,
// // // // // // //     lastRefresh,
// // // // // // //     fetchHistoricalOrders,
// // // // // // //     handleOrderAction,
// // // // // // //     updateOrder,
// // // // // // //     clearMessages,
// // // // // // //   } = useOrdersManagementSocketApi({
// // // // // // //     companyName: data?.companyName || "LlakaScript",
// // // // // // //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// // // // // // //     orderLimit: 50,
// // // // // // //   })

// // // // // // //   // Calculate totals
// // // // // // //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)
// // // // // // //   const pendingCount = ordersByStatus.pending?.length || 0
// // // // // // //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
// // // // // // //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

// // // // // // //   // Filter and search orders
// // // // // // //   const filteredOrders = useMemo(() => {
// // // // // // //     let filtered = [...allOrders]

// // // // // // //     if (activeStatus !== "all") {
// // // // // // //       filtered = filtered.filter((order) => order.status === activeStatus)
// // // // // // //     }

// // // // // // //     if (searchQuery) {
// // // // // // //       const query = searchQuery.toLowerCase()
// // // // // // //       filtered = filtered.filter((order) => {
// // // // // // //         return (
// // // // // // //           order.fullname?.toLowerCase().includes(query) ||
// // // // // // //           order.id?.toString().includes(query) ||
// // // // // // //           order._id?.toString().includes(query) ||
// // // // // // //           order.orderType?.toLowerCase().includes(query) ||
// // // // // // //           order.cart.some(
// // // // // // //             (item: any) =>
// // // // // // //               item.name.toLowerCase().includes(query) ||
// // // // // // //               item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query)),
// // // // // // //           )
// // // // // // //         )
// // // // // // //       })
// // // // // // //     }

// // // // // // //     return filtered.sort((a, b) => {
// // // // // // //       const dateA = new Date(a.createdAt || a.timestamp || 0)
// // // // // // //       const dateB = new Date(b.createdAt || b.timestamp || 0)
// // // // // // //       return dateB.getTime() - dateA.getTime()
// // // // // // //     })
// // // // // // //   }, [allOrders, activeStatus, searchQuery])

// // // // // // //   // Paginate orders
// // // // // // //   const paginatedOrders = useMemo(() => {
// // // // // // //     const startIndex = (currentPages[activeStatus] - 1) * pageSize
// // // // // // //     return filteredOrders.slice(startIndex, startIndex + pageSize)
// // // // // // //   }, [filteredOrders, currentPages, activeStatus, pageSize])

// // // // // // //   // Calculate page count for current status
// // // // // // //   const pageCount = Math.ceil(filteredOrders.length / pageSize)

// // // // // // //   // Handle page change
// // // // // // //   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
// // // // // // //     setCurrentPages((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       [activeStatus]: value,
// // // // // // //     }))
// // // // // // //     window.scrollTo({ top: 0, behavior: "smooth" })
// // // // // // //   }

// // // // // // //   // Handle page size change
// // // // // // //   const handlePageSizeChange = (event: any) => {
// // // // // // //     const newSize = event.target.value
// // // // // // //     setPageSize(newSize)
// // // // // // //     // Recalculate current page to avoid empty pages
// // // // // // //     const newPage = Math.floor(((currentPages[activeStatus] - 1) * pageSize) / newSize) + 1
// // // // // // //     setCurrentPages((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       [activeStatus]: newPage,
// // // // // // //     }))
// // // // // // //   }

// // // // // // //   // Toggle functions
// // // // // // //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
// // // // // // //   const toggleViewMode = () => setViewMode(viewMode === "card" ? "list" : "card")

// // // // // // //   // Action handlers
// // // // // // //   const handleLogout = async () => {
// // // // // // //     clearLocalhostStorage()
// // // // // // //     await recordAttendance("getOut", user?.user?.email, data?.companyName)
// // // // // // //     window.location.reload()
// // // // // // //   }

// // // // // // //   const handleOpenEditModal = (order: any) => {
// // // // // // //     setSelectedOrder(order)
// // // // // // //     setIsEditModalOpen(true)
// // // // // // //   }

// // // // // // //   const handleCloseEditModal = () => {
// // // // // // //     setIsEditModalOpen(false)
// // // // // // //     setSelectedOrder(null)
// // // // // // //   }

// // // // // // //   const saveUpdateData = async (updatedOrder: any) => {
// // // // // // //     try {
// // // // // // //       await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder)
// // // // // // //       handleCloseEditModal()
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Failed to update order:", error)
// // // // // // //     }
// // // // // // //   }

// // // // // // //   const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
// // // // // // //     setActiveStatus(newValue)
// // // // // // //     setCurrentPages((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       [newValue]: 1,
// // // // // // //     }))
// // // // // // //   }

// // // // // // //   const clearSearch = () => {
// // // // // // //     setSearchQuery("")
// // // // // // //   }

// // // // // // //   // Effects
// // // // // // //   useEffect(() => {
// // // // // // //     const interval = setInterval(() => {
// // // // // // //       setDisplayTitle((prev) => !prev)
// // // // // // //     }, 5000)
// // // // // // //     return () => clearInterval(interval)
// // // // // // //   }, [])

// // // // // // //   useEffect(() => {
// // // // // // //     setViewMode(isMobile ? "card" : "card")
// // // // // // //     setPageSize(isMobile ? 5 : 10)
// // // // // // //   }, [isMobile])

// // // // // // //   // Scroll to top button logic
// // // // // // //   const trigger = useScrollTrigger({
// // // // // // //     threshold: 100,
// // // // // // //   })

// // // // // // //   const scrollToTop = () => {
// // // // // // //     window.scrollTo({
// // // // // // //       top: 0,
// // // // // // //       behavior: "smooth",
// // // // // // //     })
// // // // // // //   }

// // // // // // //   // Order Card Component
// // // // // // //   const OrderCard = React.memo(({ order }: { order: any }) => {
// // // // // // //     const status = order.status
// // // // // // //     const config = statusConfig[status as keyof typeof statusConfig]
// // // // // // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
// // // // // // //     const total = order.cart.reduce((sum: any, item: any) => {
// // // // // // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
// // // // // // //       return sum + item.price * item.quantity + extrasTotal
// // // // // // //     }, 0)

// // // // // // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // // // //       hour: "2-digit",
// // // // // // //       minute: "2-digit",
// // // // // // //     })

// // // // // // //     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette]

// // // // // // //     return (
// // // // // // //       <Card
// // // // // // //         sx={{
// // // // // // //           borderLeft: "4px solid",
// // // // // // //           borderColor: paletteColor?.main || "grey",
// // // // // // //           mb: 2,
// // // // // // //           position: "relative",
// // // // // // //           transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
// // // // // // //           "&:hover": {
// // // // // // //             transform: isMobile ? "none" : "translateY(-2px)",
// // // // // // //             boxShadow: isMobile ? "none" : theme.shadows[4],
// // // // // // //           },
// // // // // // //         }}
// // // // // // //         component={motion.div}
// // // // // // //         initial={{ opacity: 0, y: 10 }}
// // // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // // //         transition={{ duration: 0.2 }}
// // // // // // //         exit={{ opacity: 0 }}
// // // // // // //         layout
// // // // // // //       >
// // // // // // //         <CardContent>
// // // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
// // // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // // //               #{order.id || order._id.slice(-4)}
// // // // // // //             </Typography>
// // // // // // //             <Chip size="small" label={order.orderType} color={config.color as any} icon={config.icon} />
// // // // // // //           </Box>

// // // // // // //           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
// // // // // // //             <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // //             <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // // //               {order.fullname}
// // // // // // //             </Typography>
// // // // // // //             <Box sx={{ flexGrow: 1 }} />
// // // // // // //             <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // //             <Typography variant="body2">{formattedTime}</Typography>
// // // // // // //           </Box>

// // // // // // //           <Divider sx={{ my: 1 }} />

// // // // // // //           <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
// // // // // // //             Items ({totalItems})
// // // // // // //           </Typography>

// // // // // // //           <List dense disablePadding>
// // // // // // //             {order.cart.slice(0, isMobile ? 2 : undefined).map((item: any) => (
// // // // // // //               <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.25 }}>
// // // // // // //                 <ListItemText
// // // // // // //                   primary={
// // // // // // //                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // //                       <Typography variant="body2">
// // // // // // //                         <strong>{item.quantity}x</strong> {item.name}
// // // // // // //                       </Typography>
// // // // // // //                       <Typography variant="body2" sx={{ ml: 1 }}>
// // // // // // //                         ${item.price.toFixed(2)}
// // // // // // //                       </Typography>
// // // // // // //                     </Box>
// // // // // // //                   }
// // // // // // //                   secondary={
// // // // // // //                     item.extras?.length > 0 && (
// // // // // // //                       <List dense disablePadding sx={{ ml: 2 }}>
// // // // // // //                         {item.extras.slice(0, isMobile ? 1 : undefined).map((extra: any, idx: number) => (
// // // // // // //                           <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0 }}>
// // // // // // //                             <ListItemText
// // // // // // //                               primary={
// // // // // // //                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // //                                   <Typography variant="caption">+ {extra.name}</Typography>
// // // // // // //                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // // // // //                                 </Box>
// // // // // // //                               }
// // // // // // //                             />
// // // // // // //                           </ListItem>
// // // // // // //                         ))}
// // // // // // //                       </List>
// // // // // // //                     )
// // // // // // //                   }
// // // // // // //                 />
// // // // // // //               </ListItem>
// // // // // // //             ))}
// // // // // // //             {isMobile && order.cart.length > 2 && (
// // // // // // //               <Typography variant="caption" color="text.secondary">
// // // // // // //                 +{order.cart.length - 2} más...
// // // // // // //               </Typography>
// // // // // // //             )}
// // // // // // //           </List>

// // // // // // //           <Divider sx={{ my: 1 }} />

// // // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // // //               Total: ${total.toFixed(2)}
// // // // // // //             </Typography>

// // // // // // //             <Stack direction="row" spacing={1}>
// // // // // // //               {config.actions.map((action: any, idx: number) => (
// // // // // // //                 <Button
// // // // // // //                   key={`${action.action}-${idx}`}
// // // // // // //                   size="small"
// // // // // // //                   variant="contained"
// // // // // // //                   color={action.color as any}
// // // // // // //                   startIcon={action.icon}
// // // // // // //                   onClick={(e) => {
// // // // // // //                     e.stopPropagation()
// // // // // // //                     handleOrderAction(action.action, order)
// // // // // // //                   }}
// // // // // // //                   disabled={isUpdating}
// // // // // // //                 >
// // // // // // //                   {action.label}
// // // // // // //                 </Button>
// // // // // // //               ))}

// // // // // // //               <Button
// // // // // // //                 size="small"
// // // // // // //                 variant="outlined"
// // // // // // //                 color="primary"
// // // // // // //                 startIcon={<EditIcon />}
// // // // // // //                 onClick={(e) => {
// // // // // // //                   e.stopPropagation()
// // // // // // //                   handleOpenEditModal(order)
// // // // // // //                 }}
// // // // // // //                 disabled={isUpdating}
// // // // // // //               >
// // // // // // //                 Editar
// // // // // // //               </Button>
// // // // // // //             </Stack>
// // // // // // //           </Box>
// // // // // // //         </CardContent>
// // // // // // //       </Card>
// // // // // // //     )
// // // // // // //   })

// // // // // // //   const handleToggleExpand = (orderId: string) => {
// // // // // // //     setExpandedRows((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
// // // // // // //   }

// // // // // // //   const OrderRow = React.memo(
// // // // // // //     ({
// // // // // // //       order,
// // // // // // //       expandedRows,
// // // // // // //       onToggleExpand,
// // // // // // //     }: {
// // // // // // //       order: any
// // // // // // //       expandedRows: string[]
// // // // // // //       onToggleExpand: (id: string) => void
// // // // // // //     }) => {
// // // // // // //       const status = order.status
// // // // // // //       const config = statusConfig[status as keyof typeof statusConfig]
// // // // // // //       const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
// // // // // // //       const total = order.cart.reduce((sum: any, item: any) => {
// // // // // // //         const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
// // // // // // //         return sum + item.price * item.quantity + extrasTotal
// // // // // // //       }, 0)

// // // // // // //       const commentsOrderGeneral = order?.comments
// // // // // // //       const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // // // //         hour: "2-digit",
// // // // // // //         minute: "2-digit",
// // // // // // //       })

// // // // // // //       // Use the order ID to maintain expanded state
// // // // // // //       const orderId = order._id || order.id
// // // // // // //       const [expanded, setExpanded] = useState(false)

// // // // // // //       // Use useEffect to persist expanded state when component updates
// // // // // // //       useEffect(() => {
// // // // // // //         // Check if this order ID is in the parent's expandedRows state
// // // // // // //         const isExpanded = expandedRows.includes(orderId)
// // // // // // //         if (expanded !== isExpanded) {
// // // // // // //           setExpanded(isExpanded)
// // // // // // //         }
// // // // // // //       }, [expandedRows, orderId, expanded])

// // // // // // //       // When toggling, update the parent's state
// // // // // // //       const toggleExpand = (e) => {
// // // // // // //         e.stopPropagation()
// // // // // // //         onToggleExpand(orderId)
// // // // // // //       }

// // // // // // //       return (
// // // // // // //         <>
// // // // // // //           <TableRow
// // // // // // //             component={motion.tr}
// // // // // // //             // initial={{ opacity: 0 }}
// // // // // // //             // animate={{ opacity: 1 }}
// // // // // // //             // transition={{ duration: 0.2 }}
// // // // // // //             // hover
// // // // // // //             sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
// // // // // // //             onClick={() => toggleExpand(event)}
// // // // // // //           >
// // // // // // //             <TableCell>
// // // // // // //               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // // // //                 <IconButton
// // // // // // //                   size="small"
// // // // // // //                   onClick={(e) => {
// // // // // // //                     toggleExpand(e)
// // // // // // //                   }}
// // // // // // //                 >
// // // // // // //                   {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
// // // // // // //                 </IconButton>
// // // // // // //                 <Typography variant="body2" fontWeight="bold">
// // // // // // //                   #{order.id || order._id.slice(-4)}
// // // // // // //                 </Typography>
// // // // // // //               </Box>
// // // // // // //             </TableCell>
// // // // // // //             <TableCell>
// // // // // // //               <Box sx={{ display: "flex", alignItems: "center" }}>
// // // // // // //                 <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // // //                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // // //                   {order.fullname}
// // // // // // //                 </Typography>
// // // // // // //               </Box>
// // // // // // //             </TableCell>
// // // // // // //             <TableCell>
// // // // // // //               <Chip size="small" label={order.orderType} color={config.color as any} icon={config.icon} />
// // // // // // //             </TableCell>
// // // // // // //             <TableCell>
// // // // // // //               <Typography variant="body2">{totalItems} items</Typography>
// // // // // // //             </TableCell>
// // // // // // //             <TableCell>
// // // // // // //               <Typography variant="body2" fontWeight="bold">
// // // // // // //                 ${total.toFixed(2)}
// // // // // // //               </Typography>
// // // // // // //             </TableCell>
// // // // // // //             <TableCell>
// // // // // // //               <Typography variant="body2">{formattedTime}</Typography>
// // // // // // //             </TableCell>
// // // // // // //             <TableCell>
// // // // // // //               <Tooltip title={commentsOrderGeneral || "Sin comentarios"} arrow>
// // // // // // //                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // // //                   {commentsOrderGeneral || "-"}
// // // // // // //                 </Typography>
// // // // // // //               </Tooltip>
// // // // // // //             </TableCell>
// // // // // // //             <TableCell>
// // // // // // //               <Stack direction="row" spacing={1}>
// // // // // // //                 {config.actions.map((action: any, idx: number) => (
// // // // // // //                   <Tooltip key={`${action.action}-${idx}`} title={action.label}>
// // // // // // //                     <IconButton
// // // // // // //                       size="small"
// // // // // // //                       color={action.color as any}
// // // // // // //                       onClick={(e) => {
// // // // // // //                         e.stopPropagation()
// // // // // // //                         handleOrderAction(action.action, order)
// // // // // // //                       }}
// // // // // // //                       disabled={isUpdating}
// // // // // // //                     >
// // // // // // //                       {action.icon}
// // // // // // //                     </IconButton>
// // // // // // //                   </Tooltip>
// // // // // // //                 ))}
// // // // // // //                 <Tooltip title="Editar">
// // // // // // //                   <IconButton
// // // // // // //                     size="small"
// // // // // // //                     color="primary"
// // // // // // //                     onClick={(e) => {
// // // // // // //                       e.stopPropagation()
// // // // // // //                       handleOpenEditModal(order)
// // // // // // //                     }}
// // // // // // //                     disabled={isUpdating}
// // // // // // //                   >
// // // // // // //                     <EditIcon fontSize="small" />
// // // // // // //                   </IconButton>
// // // // // // //                 </Tooltip>
// // // // // // //               </Stack>
// // // // // // //             </TableCell>
// // // // // // //           </TableRow>

// // // // // // //           {/* Expanded details row */}
// // // // // // //           <TableRow>
// // // // // // //             <TableCell style={{ padding: 0 }} colSpan={8}>
// // // // // // //               <motion.div
// // // // // // //                 initial={{ opacity: 0, height: 0 }}
// // // // // // //                 animate={{
// // // // // // //                   opacity: expanded ? 1 : 0,
// // // // // // //                   height: expanded ? "auto" : 0,
// // // // // // //                 }}
// // // // // // //                 transition={{ duration: 0.3, ease: "easeInOut" }}
// // // // // // //                 style={{ overflow: "hidden" }}
// // // // // // //               >
// // // // // // //                 <Box
// // // // // // //                   sx={{
// // // // // // //                     p: 3,
// // // // // // //                     backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
// // // // // // //                     borderBottom: `1px solid ${theme.palette.divider}`,
// // // // // // //                   }}
// // // // // // //                 >
// // // // // // //                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
// // // // // // //                     Detalles de la Orden
// // // // // // //                   </Typography>

// // // // // // //                   <Grid container spacing={2}>
// // // // // // //                     <Grid item xs={12} md={6}>
// // // // // // //                       <Typography variant="subtitle2" gutterBottom>
// // // // // // //                         Productos:
// // // // // // //                       </Typography>
// // // // // // //                       <List dense disablePadding>
// // // // // // //                         {order.cart.map((item: any, index: number) => (
// // // // // // //                           <motion.div
// // // // // // //                             key={`${item.id}-${index}`}
// // // // // // //                             initial={{ opacity: 0, x: -10 }}
// // // // // // //                             animate={{ opacity: 1, x: 0 }}
// // // // // // //                             transition={{ delay: index * 0.05 }}
// // // // // // //                           >
// // // // // // //                             <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // // //                               <ListItemText
// // // // // // //                                 primary={
// // // // // // //                                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // //                                     <Typography variant="body2">
// // // // // // //                                       <strong>{item.quantity}x</strong> {item.name}
// // // // // // //                                     </Typography>
// // // // // // //                                     <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
// // // // // // //                                   </Box>
// // // // // // //                                 }
// // // // // // //                                 secondary={
// // // // // // //                                   item.extras?.length > 0 && (
// // // // // // //                                     <List dense disablePadding sx={{ ml: 2, mt: 0.5 }}>
// // // // // // //                                       {item.extras.map((extra: any, idx: number) => (
// // // // // // //                                         <motion.div
// // // // // // //                                           key={`${item.id}-extra-${idx}`}
// // // // // // //                                           initial={{ opacity: 0, x: -10 }}
// // // // // // //                                           animate={{ opacity: 1, x: 0 }}
// // // // // // //                                           transition={{ delay: (index + 1) * 0.05 + idx * 0.03 }}
// // // // // // //                                         >
// // // // // // //                                           <ListItem disablePadding sx={{ py: 0 }}>
// // // // // // //                                             <ListItemText
// // // // // // //                                               primary={
// // // // // // //                                                 <Box
// // // // // // //                                                   sx={{
// // // // // // //                                                     display: "flex",
// // // // // // //                                                     justifyContent: "space-between",
// // // // // // //                                                     alignItems: "center",
// // // // // // //                                                   }}
// // // // // // //                                                 >
// // // // // // //                                                   <Typography variant="caption">+ {extra.name}</Typography>
// // // // // // //                                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // // // // //                                                 </Box>
// // // // // // //                                               }
// // // // // // //                                             />
// // // // // // //                                           </ListItem>
// // // // // // //                                         </motion.div>
// // // // // // //                                       ))}
// // // // // // //                                     </List>
// // // // // // //                                   )
// // // // // // //                                 }
// // // // // // //                               />
// // // // // // //                             </ListItem>
// // // // // // //                             <Divider sx={{ my: 0.5 }} />
// // // // // // //                           </motion.div>
// // // // // // //                         ))}
// // // // // // //                       </List>
// // // // // // //                     </Grid>

// // // // // // //                     <Grid item xs={12} md={6}>
// // // // // // //                       <Typography variant="subtitle2" gutterBottom>
// // // // // // //                         Información Adicional:
// // // // // // //                       </Typography>
// // // // // // //                       <List dense disablePadding>
// // // // // // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // // //                           <ListItemText
// // // // // // //                             primary={
// // // // // // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // //                                 <Typography variant="body2">
// // // // // // //                                   <strong>Estado:</strong>
// // // // // // //                                 </Typography>
// // // // // // //                                 <Chip
// // // // // // //                                   size="small"
// // // // // // //                                   label={config.label}
// // // // // // //                                   color={config.color as any}
// // // // // // //                                   icon={config.icon}
// // // // // // //                                 />
// // // // // // //                               </Box>
// // // // // // //                             }
// // // // // // //                           />
// // // // // // //                         </ListItem>
// // // // // // //                         <Divider sx={{ my: 0.5 }} />

// // // // // // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // // //                           <ListItemText
// // // // // // //                             primary={
// // // // // // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // //                                 <Typography variant="body2">
// // // // // // //                                   <strong>Total:</strong>
// // // // // // //                                 </Typography>
// // // // // // //                                 <Typography variant="body2" fontWeight="bold">
// // // // // // //                                   ${total.toFixed(2)}
// // // // // // //                                 </Typography>
// // // // // // //                               </Box>
// // // // // // //                             }
// // // // // // //                           />
// // // // // // //                         </ListItem>
// // // // // // //                         <Divider sx={{ my: 0.5 }} />

// // // // // // //                         {commentsOrderGeneral && (
// // // // // // //                           <>
// // // // // // //                             <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // // //                               <ListItemText
// // // // // // //                                 primary={
// // // // // // //                                   <Box>
// // // // // // //                                     <Typography variant="body2">
// // // // // // //                                       <strong>Comentarios:</strong>
// // // // // // //                                     </Typography>
// // // // // // //                                     <Typography variant="body2" sx={{ mt: 0.5 }}>
// // // // // // //                                       {commentsOrderGeneral}
// // // // // // //                                     </Typography>
// // // // // // //                                   </Box>
// // // // // // //                                 }
// // // // // // //                               />
// // // // // // //                             </ListItem>
// // // // // // //                             <Divider sx={{ my: 0.5 }} />
// // // // // // //                           </>
// // // // // // //                         )}

// // // // // // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // // //                           <ListItemText
// // // // // // //                             primary={
// // // // // // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // //                                 <Typography variant="body2">
// // // // // // //                                   <strong>Hora:</strong>
// // // // // // //                                 </Typography>
// // // // // // //                                 <Typography variant="body2">{formattedTime}</Typography>
// // // // // // //                               </Box>
// // // // // // //                             }
// // // // // // //                           />
// // // // // // //                         </ListItem>
// // // // // // //                       </List>
// // // // // // //                     </Grid>
// // // // // // //                   </Grid>
// // // // // // //                 </Box>
// // // // // // //               </motion.div>
// // // // // // //             </TableCell>
// // // // // // //           </TableRow>
// // // // // // //         </>
// // // // // // //       )
// // // // // // //     },
// // // // // // //   )

// // // // // // //   // Custom Pagination Controls
// // // // // // //   const PaginationControls = () => (
// // // // // // //     <Box
// // // // // // //       sx={{
// // // // // // //         display: "flex",
// // // // // // //         justifyContent: "space-between",
// // // // // // //         alignItems: "center",
// // // // // // //         mt: 3,
// // // // // // //         pb: 2,
// // // // // // //         flexDirection: isMobile ? "column" : "row",
// // // // // // //         gap: isMobile ? 2 : 0,
// // // // // // //       }}
// // // // // // //     >
// // // // // // //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // // // //         <Typography variant="body2" color="text.secondary">
// // // // // // //           Órdenes por página:
// // // // // // //         </Typography>
// // // // // // //         <FormControl size="small" variant="outlined">
// // // // // // //           <Select value={pageSize} onChange={handlePageSizeChange} sx={{ height: "36px" }}>
// // // // // // //             {pageSizeOptions.map((size) => (
// // // // // // //               <MenuItem key={size} value={size}>
// // // // // // //                 {size}
// // // // // // //               </MenuItem>
// // // // // // //             ))}
// // // // // // //           </Select>
// // // // // // //         </FormControl>
// // // // // // //       </Box>

// // // // // // //       <Pagination
// // // // // // //         count={pageCount}
// // // // // // //         page={currentPages[activeStatus]}
// // // // // // //         onChange={handlePageChange}
// // // // // // //         color="primary"
// // // // // // //         size={isMobile ? "small" : "medium"}
// // // // // // //         showFirstButton
// // // // // // //         showLastButton
// // // // // // //         siblingCount={isMobile ? 0 : 1}
// // // // // // //         boundaryCount={isMobile ? 1 : 2}
// // // // // // //       />

// // // // // // //       <Typography variant="body2" color="text.secondary">
// // // // // // //         Mostrando {(currentPages[activeStatus] - 1) * pageSize + 1}-
// // // // // // //         {Math.min(currentPages[activeStatus] * pageSize, filteredOrders.length)} de {filteredOrders.length} órdenes
// // // // // // //       </Typography>
// // // // // // //     </Box>
// // // // // // //   )

// // // // // // //   // Main render
// // // // // // //   return (
// // // // // // //     <Box
// // // // // // //       sx={{
// // // // // // //         height: "100vh",
// // // // // // //         overflow: "hidden",
// // // // // // //         bgcolor: theme.palette.background.default,
// // // // // // //         display: "flex",
// // // // // // //         flexDirection: "column",
// // // // // // //       }}
// // // // // // //     >
// // // // // // //       {/* Custom AppBar */}
// // // // // // //       <AppBar
// // // // // // //         position="sticky"
// // // // // // //         elevation={0}
// // // // // // //         sx={{
// // // // // // //           bgcolor: "background.paper",
// // // // // // //           color: "text.primary",
// // // // // // //           borderBottom: 1,
// // // // // // //           borderColor: "divider",
// // // // // // //         }}
// // // // // // //       >
// // // // // // //         <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
// // // // // // //           {/* Logo and Title */}
// // // // // // //           <Box
// // // // // // //             sx={{
// // // // // // //               display: "flex",
// // // // // // //               alignItems: "center",
// // // // // // //               gap: 1,
// // // // // // //               flexGrow: 1,
// // // // // // //               height: "40px",
// // // // // // //               position: "relative",
// // // // // // //               overflow: "hidden",
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // // // // // //               <Avatar
// // // // // // //                 sx={{
// // // // // // //                   width: 28,
// // // // // // //                   height: 28,
// // // // // // //                   flexShrink: 0,
// // // // // // //                   ml: 0.5,
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <Image
// // // // // // //                   src={"/images/flama.png"}
// // // // // // //                   alt={"LlakaScript"}
// // // // // // //                   width={28}
// // // // // // //                   height={28}
// // // // // // //                   priority
// // // // // // //                   style={{
// // // // // // //                     objectFit: "contain",
// // // // // // //                     width: "100%",
// // // // // // //                     height: "100%",
// // // // // // //                   }}
// // // // // // //                 />
// // // // // // //               </Avatar>
// // // // // // //             </motion.div>

// // // // // // //             <Box
// // // // // // //               sx={{
// // // // // // //                 position: "relative",
// // // // // // //                 width: "auto",
// // // // // // //                 height: "100%",
// // // // // // //                 display: "flex",
// // // // // // //                 alignItems: "center",
// // // // // // //                 flexGrow: 1,
// // // // // // //               }}
// // // // // // //             >
// // // // // // //               <AnimatePresence mode="wait">
// // // // // // //                 <motion.div
// // // // // // //                   key={displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // // //                   initial={{ opacity: 0, x: -10 }}
// // // // // // //                   animate={{ opacity: 1, x: 0 }}
// // // // // // //                   exit={{ opacity: 0, x: 10 }}
// // // // // // //                   transition={{ duration: 0.3 }}
// // // // // // //                   style={{
// // // // // // //                     position: "absolute",
// // // // // // //                     left: 0,
// // // // // // //                     whiteSpace: "nowrap",
// // // // // // //                   }}
// // // // // // //                 >
// // // // // // //                   <Typography
// // // // // // //                     variant={isMobile ? "subtitle1" : "h6"}
// // // // // // //                     sx={{
// // // // // // //                       fontWeight: 600,
// // // // // // //                       lineHeight: 1.1,
// // // // // // //                       fontSize: isMobile ? "1rem" : undefined,
// // // // // // //                     }}
// // // // // // //                   >
// // // // // // //                     {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // // //                   </Typography>
// // // // // // //                 </motion.div>
// // // // // // //               </AnimatePresence>
// // // // // // //             </Box>
// // // // // // //           </Box>

// // // // // // //           {/* Right side controls */}
// // // // // // //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// // // // // // //             {/* View mode toggle */}
// // // // // // //             <Tooltip title={viewMode === "card" ? "Vista lista" : "Vista tarjetas"}>
// // // // // // //               <motion.div whileHover={{ scale: 1.1 }}>
// // // // // // //                 <IconButton size="small" onClick={toggleViewMode} color="default">
// // // // // // //                   {viewMode === "card" ? <ViewListIcon fontSize="small" /> : <ViewColumnIcon fontSize="small" />}
// // // // // // //                 </IconButton>
// // // // // // //               </motion.div>
// // // // // // //             </Tooltip>

// // // // // // //             {/* Connection status indicator */}
// // // // // // //             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
// // // // // // //               <motion.div
// // // // // // //                 animate={{
// // // // // // //                   scale: isConnected ? [1, 1.2, 1] : 1,
// // // // // // //                   transition: isConnected ? { repeat: Number.POSITIVE_INFINITY, duration: 2 } : {},
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <Box
// // // // // // //                   sx={{
// // // // // // //                     width: 10,
// // // // // // //                     height: 10,
// // // // // // //                     borderRadius: "50%",
// // // // // // //                     bgcolor: isConnected ? "success.main" : "error.main",
// // // // // // //                     mr: 1,
// // // // // // //                   }}
// // // // // // //                 />
// // // // // // //               </motion.div>
// // // // // // //             </Tooltip>

// // // // // // //             {/* Order count badge */}
// // // // // // //             {isMobile && totalOrders > 0 && (
// // // // // // //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// // // // // // //                 <Box sx={{ width: 4, height: 4 }} />
// // // // // // //               </Badge>
// // // // // // //             )}

// // // // // // //             {/* Last refresh time */}
// // // // // // //             {lastRefresh && !isMobile && (
// // // // // // //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// // // // // // //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// // // // // // //               </Typography>
// // // // // // //             )}

// // // // // // //             {/* Refresh button */}
// // // // // // //             <Tooltip title="Actualizar">
// // // // // // //               <motion.div whileHover={{ rotate: 90 }} transition={{ type: "spring" }}>
// // // // // // //                 <IconButton
// // // // // // //                   color="primary"
// // // // // // //                   size="small"
// // // // // // //                   onClick={fetchHistoricalOrders}
// // // // // // //                   disabled={isLoading || isUpdating}
// // // // // // //                 >
// // // // // // //                   <RefreshIcon fontSize="small" />
// // // // // // //                 </IconButton>
// // // // // // //               </motion.div>
// // // // // // //             </Tooltip>

// // // // // // //             {/* Header collapse toggle (mobile only) */}
// // // // // // //             {isMobile && (
// // // // // // //               <IconButton size="small" onClick={toggleHeader}>
// // // // // // //                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
// // // // // // //               </IconButton>
// // // // // // //             )}

// // // // // // //             <Tooltip title="Salir">
// // // // // // //               <motion.div
// // // // // // //                 whileHover={{ scale: 1.1 }}
// // // // // // //                 whileTap={{ scale: 0.9 }}
// // // // // // //                 transition={{ type: "spring", stiffness: 400, damping: 10 }}
// // // // // // //               >
// // // // // // //                 <IconButton size="small" onClick={handleLogout} color="default">
// // // // // // //                   <LogoutIcon fontSize="small" />
// // // // // // //                 </IconButton>
// // // // // // //               </motion.div>
// // // // // // //             </Tooltip>
// // // // // // //           </Box>
// // // // // // //         </Toolbar>
// // // // // // //       </AppBar>

// // // // // // //       {/* Main content */}
// // // // // // //       <Box
// // // // // // //         component="main"
// // // // // // //         sx={{
// // // // // // //           p: { xs: 0.5, sm: 2 },
// // // // // // //           flex: 1,
// // // // // // //           overflow: "auto",
// // // // // // //           display: "flex",
// // // // // // //           flexDirection: "column",
// // // // // // //         }}
// // // // // // //       >
// // // // // // //         <Paper
// // // // // // //           elevation={isMobile ? 1 : 3}
// // // // // // //           sx={{
// // // // // // //             height: "100%",
// // // // // // //             display: "flex",
// // // // // // //             flexDirection: "column",
// // // // // // //             overflow: "hidden",
// // // // // // //             borderRadius: { xs: 1, sm: 2 },
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           {/* Status header - collapsible on mobile */}
// // // // // // //           <motion.div
// // // // // // //             initial={false}
// // // // // // //             animate={{
// // // // // // //               height: headerCollapsed ? 0 : "auto",
// // // // // // //               opacity: headerCollapsed ? 0 : 1,
// // // // // // //             }}
// // // // // // //             transition={{ type: "spring", damping: 25 }}
// // // // // // //             style={{
// // // // // // //               display: "flex",
// // // // // // //               flexDirection: "column",
// // // // // // //               borderBottom: "1px solid",
// // // // // // //               borderColor: theme.palette.divider,
// // // // // // //               overflow: "hidden",
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             {/* Search bar */}
// // // // // // //             <Box sx={{ p: 2, pb: 0 }}>
// // // // // // //               <TextField
// // // // // // //                 fullWidth
// // // // // // //                 variant="outlined"
// // // // // // //                 placeholder="Buscar órdenes..."
// // // // // // //                 value={searchQuery}
// // // // // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // // // // //                 InputProps={{
// // // // // // //                   startAdornment: (
// // // // // // //                     <InputAdornment position="start">
// // // // // // //                       <SearchIcon />
// // // // // // //                     </InputAdornment>
// // // // // // //                   ),
// // // // // // //                   endAdornment: searchQuery && (
// // // // // // //                     <InputAdornment position="end">
// // // // // // //                       <IconButton onClick={clearSearch} size="small">
// // // // // // //                         <ClearIcon fontSize="small" />
// // // // // // //                       </IconButton>
// // // // // // //                     </InputAdornment>
// // // // // // //                   ),
// // // // // // //                 }}
// // // // // // //               />
// // // // // // //             </Box>

// // // // // // //             {/* Status tabs */}
// // // // // // //             <Box sx={{ px: 2, pt: 1 }}>
// // // // // // //               <Tabs
// // // // // // //                 value={activeStatus}
// // // // // // //                 onChange={handleStatusChange}
// // // // // // //                 variant="scrollable"
// // // // // // //                 scrollButtons="auto"
// // // // // // //                 allowScrollButtonsMobile
// // // // // // //               >
// // // // // // //                 <Tab label="Todas" value="all" />
// // // // // // //                 {statusOptions.map((status) => (
// // // // // // //                   <Tab
// // // // // // //                     key={status}
// // // // // // //                     label={statusConfig[status as keyof typeof statusConfig].label}
// // // // // // //                     value={status}
// // // // // // //                     icon={statusConfig[status as keyof typeof statusConfig].icon}
// // // // // // //                     iconPosition="start"
// // // // // // //                   />
// // // // // // //                 ))}
// // // // // // //               </Tabs>
// // // // // // //             </Box>

// // // // // // //             {/* Status indicators */}
// // // // // // //             {(isLoading || isUpdating) && (
// // // // // // //               <Box
// // // // // // //                 sx={{
// // // // // // //                   display: "flex",
// // // // // // //                   alignItems: "center",
// // // // // // //                   gap: 1,
// // // // // // //                   p: 1,
// // // // // // //                   mx: 1,
// // // // // // //                   mb: 1,
// // // // // // //                   backgroundColor: theme.palette.action.hover,
// // // // // // //                   borderRadius: 1,
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <CircularProgress size={16} />
// // // // // // //                 <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// // // // // // //                   {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// // // // // // //                 </Typography>
// // // // // // //               </Box>
// // // // // // //             )}
// // // // // // //           </motion.div>

// // // // // // //           {/* Error messages */}
// // // // // // //           <Box
// // // // // // //             sx={{
// // // // // // //               px: { xs: 1, sm: 2 },
// // // // // // //               pt: { xs: 1, sm: 1 },
// // // // // // //               overflow: "auto",
// // // // // // //               flexShrink: 0,
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <AnimatePresence>
// // // // // // //               {error && (
// // // // // // //                 <motion.div
// // // // // // //                   initial={{ opacity: 0, y: -20 }}
// // // // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // // // //                   exit={{ opacity: 0, y: -20 }}
// // // // // // //                   transition={{ type: "spring" }}
// // // // // // //                 >
// // // // // // //                   <Alert severity="error" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// // // // // // //                     {error}
// // // // // // //                   </Alert>
// // // // // // //                 </motion.div>
// // // // // // //               )}
// // // // // // //             </AnimatePresence>

// // // // // // //             <AnimatePresence>
// // // // // // //               {successMessage && (
// // // // // // //                 <motion.div
// // // // // // //                   initial={{ opacity: 0, y: -20 }}
// // // // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // // // //                   exit={{ opacity: 0, y: -20 }}
// // // // // // //                   transition={{ type: "spring" }}
// // // // // // //                 >
// // // // // // //                   <Alert severity="success" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// // // // // // //                     {successMessage}
// // // // // // //                   </Alert>
// // // // // // //                 </motion.div>
// // // // // // //               )}
// // // // // // //             </AnimatePresence>
// // // // // // //           </Box>

// // // // // // //           {/* Main content - takes all available space */}
// // // // // // //           <Box
// // // // // // //             sx={{
// // // // // // //               flex: 1,
// // // // // // //               overflow: "auto",
// // // // // // //               display: "flex",
// // // // // // //               flexDirection: "column",
// // // // // // //               p: { xs: 1, sm: 2 },
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <PendingOrdersDialog open={openPendingDialog} onClose={() => setOpenPendingDialog(false)} />

// // // // // // //             {/* Orders list */}
// // // // // // //             <Box sx={{ flex: 1 }}>
// // // // // // //               <AnimatePresence mode="wait">
// // // // // // //                 <motion.div
// // // // // // //                   key={`${activeStatus}-${searchQuery}-${viewMode}`}
// // // // // // //                   initial={{ opacity: 0 }}
// // // // // // //                   animate={{ opacity: 1 }}
// // // // // // //                   exit={{ opacity: 0 }}
// // // // // // //                   transition={{ duration: 0.2 }}
// // // // // // //                 >
// // // // // // //                   {filteredOrders.length === 0 ? (
// // // // // // //                     <Box
// // // // // // //                       sx={{
// // // // // // //                         display: "flex",
// // // // // // //                         justifyContent: "center",
// // // // // // //                         alignItems: "center",
// // // // // // //                         height: "200px",
// // // // // // //                         flexDirection: "column",
// // // // // // //                         gap: 2,
// // // // // // //                       }}
// // // // // // //                     >
// // // // // // //                       <Typography variant="h6" color="text.secondary">
// // // // // // //                         No se encontraron órdenes
// // // // // // //                       </Typography>
// // // // // // //                       <Button
// // // // // // //                         variant="outlined"
// // // // // // //                         onClick={() => {
// // // // // // //                           setSearchQuery("")
// // // // // // //                           setActiveStatus("all")
// // // // // // //                         }}
// // // // // // //                       >
// // // // // // //                         Limpiar filtros
// // // // // // //                       </Button>
// // // // // // //                     </Box>
// // // // // // //                   ) : viewMode === "card" ? (
// // // // // // //                     <>
// // // // // // //                       <Grid container spacing={isMobile ? 1 : 3}>
// // // // // // //                         {paginatedOrders.map((order: any) => (
// // // // // // //                           <Grid item xs={12} key={order._id || order.id}>
// // // // // // //                             <OrderCard order={order} />
// // // // // // //                           </Grid>
// // // // // // //                         ))}
// // // // // // //                       </Grid>
// // // // // // //                       <PaginationControls />
// // // // // // //                     </>
// // // // // // //                   ) : (
// // // // // // //                     <>
// // // // // // //                       <TableContainer
// // // // // // //                         component={Paper}
// // // // // // //                         elevation={0}
// // // // // // //                         sx={{
// // // // // // //                           position: "relative",
// // // // // // //                           overflow: "hidden",
// // // // // // //                           "&:before": {
// // // // // // //                             content: '""',
// // // // // // //                             position: "absolute",
// // // // // // //                             top: 0,
// // // // // // //                             left: 0,
// // // // // // //                             right: 0,
// // // // // // //                             height: "4px",
// // // // // // //                             background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
// // // // // // //                             zIndex: 1,
// // // // // // //                           },
// // // // // // //                         }}
// // // // // // //                       >
// // // // // // //                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// // // // // // //                           <Table size={isMobile ? "small" : "medium"}>
// // // // // // //                             <TableHead>
// // // // // // //                               <TableRow>
// // // // // // //                                 <TableCell>ID</TableCell>
// // // // // // //                                 <TableCell>Cliente</TableCell>
// // // // // // //                                 <TableCell>Estado</TableCell>
// // // // // // //                                 <TableCell>Items</TableCell>
// // // // // // //                                 <TableCell>Total</TableCell>
// // // // // // //                                 <TableCell>Hora</TableCell>
// // // // // // //                                 <TableCell>Comentarios</TableCell>
// // // // // // //                                 <TableCell>Acciones</TableCell>
// // // // // // //                               </TableRow>
// // // // // // //                             </TableHead>
// // // // // // //                             <TableBody>
// // // // // // //                               {paginatedOrders.map((order: any) => (
// // // // // // //                                 <OrderRow
// // // // // // //                                   key={order._id || order.id}
// // // // // // //                                   order={order}
// // // // // // //                                   expandedRows={expandedRows}
// // // // // // //                                   onToggleExpand={handleToggleExpand}
// // // // // // //                                 />
// // // // // // //                               ))}
// // // // // // //                             </TableBody>
// // // // // // //                           </Table>
// // // // // // //                         </motion.div>
// // // // // // //                       </TableContainer>
// // // // // // //                       <PaginationControls />
// // // // // // //                     </>
// // // // // // //                   )}
// // // // // // //                 </motion.div>
// // // // // // //               </AnimatePresence>
// // // // // // //             </Box>
// // // // // // //           </Box>
// // // // // // //         </Paper>

// // // // // // //         {/* Scroll to top button */}
// // // // // // //         <Zoom in={trigger}>
// // // // // // //           <Box
// // // // // // //             onClick={scrollToTop}
// // // // // // //             role="presentation"
// // // // // // //             sx={{
// // // // // // //               position: "fixed",
// // // // // // //               bottom: 16,
// // // // // // //               right: 16,
// // // // // // //               zIndex: 1000,
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <Fab color="primary" size="small" aria-label="scroll back to top">
// // // // // // //               <KeyboardArrowUp />
// // // // // // //             </Fab>
// // // // // // //           </Box>
// // // // // // //         </Zoom>
// // // // // // //       </Box>

// // // // // // //       {/* Edit Order Modal */}
// // // // // // //       <AnimatePresence>
// // // // // // //         {isEditModalOpen && selectedOrder && (
// // // // // // //           <EditOrderModal
// // // // // // //             open={isEditModalOpen}
// // // // // // //             order={selectedOrder}
// // // // // // //             onSave={saveUpdateData}
// // // // // // //             menuData={{
// // // // // // //               mainMenu: hojas?.Hoja1 || [],
// // // // // // //               promotions: hojas?.Promotion || [],
// // // // // // //             }}
// // // // // // //             onClose={handleCloseEditModal}
// // // // // // //           />
// // // // // // //         )}
// // // // // // //       </AnimatePresence>
// // // // // // //     </Box>
// // // // // // //   )
// // // // // // // }

// // // // // // // export default OrderSpeedGeneric


// // // // // // "use client"

// // // // // // import React, { useMemo, useState, useEffect } from "react"
// // // // // // import { useSelector } from "react-redux"
// // // // // // import type { RootState } from "../../../store/store"
// // // // // // import {
// // // // // //   Box,
// // // // // //   Button,
// // // // // //   Chip,
// // // // // //   CircularProgress,
// // // // // //   Paper,
// // // // // //   Typography,
// // // // // //   Alert,
// // // // // //   Grid,
// // // // // //   List,
// // // // // //   ListItem,
// // // // // //   ListItemText,
// // // // // //   Avatar,
// // // // // //   IconButton,
// // // // // //   Card,
// // // // // //   CardContent,
// // // // // //   Divider,
// // // // // //   Badge,
// // // // // //   Tooltip,
// // // // // //   AppBar,
// // // // // //   Toolbar,
// // // // // //   useMediaQuery,
// // // // // //   useTheme,
// // // // // //   Stack,
// // // // // //   useScrollTrigger,
// // // // // //   Fab,
// // // // // //   Zoom,
// // // // // //   TextField,
// // // // // //   InputAdornment,
// // // // // //   Pagination,
// // // // // //   Tabs,
// // // // // //   Tab,
// // // // // //   Table,
// // // // // //   TableBody,
// // // // // //   TableCell,
// // // // // //   TableContainer,
// // // // // //   TableHead,
// // // // // //   TableRow,
// // // // // //   MenuItem,
// // // // // //   Select,
// // // // // //   FormControl,
// // // // // //   Collapse,
// // // // // // } from "@mui/material"
// // // // // // import {
// // // // // //   Edit as EditIcon,
// // // // // //   Refresh as RefreshIcon,
// // // // // //   ExpandMore as ExpandMoreIcon,
// // // // // //   ExpandLess as ExpandLessIcon,
// // // // // //   CheckCircle as CheckCircleIcon,
// // // // // //   PauseCircle as PauseCircleIcon,
// // // // // //   Cancel as CancelIcon,
// // // // // //   DeliveryDining as DeliveryIcon,
// // // // // //   PlayArrow,
// // // // // //   Pause,
// // // // // //   ViewList as ViewListIcon,
// // // // // //   ViewColumn as ViewColumnIcon,
// // // // // //   Logout as LogoutIcon,
// // // // // //   AccessTime,
// // // // // //   Person,
// // // // // //   KeyboardArrowUp,
// // // // // //   Search as SearchIcon,
// // // // // //   Clear as ClearIcon,
// // // // // // } from "@mui/icons-material"
// // // // // // import { useOrdersManagementSocketApi } from "../../../hooks/useOrdersManagementSocketApi"
// // // // // // import EditOrderModal from "../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal"
// // // // // // import Image from "next/image"
// // // // // // import { clearLocalhostStorage } from "@/services/localstorage.services"
// // // // // // import { recordAttendance } from "@/services/attendance.services"
// // // // // // import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog"

// // // // // // // Status configuration
// // // // // // const statusConfig = {
// // // // // //   pending: {
// // // // // //     color: "default",
// // // // // //     icon: <PauseCircleIcon color="disabled" />,
// // // // // //     label: "Pendientes",
// // // // // //     actions: [{ action: "start", label: "Iniciar", color: "primary", icon: <PlayArrow /> }],
// // // // // //   },
// // // // // //   processing: {
// // // // // //     color: "primary",
// // // // // //     icon: <PlayArrow color="primary" />,
// // // // // //     label: "En Proceso",
// // // // // //     actions: [
// // // // // //       { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
// // // // // //       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
// // // // // //     ],
// // // // // //   },
// // // // // //   paused: {
// // // // // //     color: "warning",
// // // // // //     icon: <Pause color="warning" />,
// // // // // //     label: "Pausadas",
// // // // // //     actions: [
// // // // // //       { action: "resume", label: "Reanudar", color: "primary", icon: <PlayArrow /> },
// // // // // //       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
// // // // // //     ],
// // // // // //   },
// // // // // //   finished: {
// // // // // //     color: "success",
// // // // // //     icon: <CheckCircleIcon color="success" />,
// // // // // //     label: "Terminadas",
// // // // // //     actions: [{ action: "deliver", label: "Entregar", color: "success", icon: <DeliveryIcon /> }],
// // // // // //   },
// // // // // //   cancelled: {
// // // // // //     color: "error",
// // // // // //     icon: <CancelIcon color="error" />,
// // // // // //     label: "Canceladas",
// // // // // //     actions: [{ action: "reopen", label: "Reabrir", color: "primary", icon: <PlayArrow /> }],
// // // // // //   },
// // // // // //   delivered: {
// // // // // //     color: "success",
// // // // // //     icon: <DeliveryIcon color="success" />,
// // // // // //     label: "Entregadas",
// // // // // //     actions: [],
// // // // // //   },
// // // // // // }

// // // // // // const statusOptions = Object.keys(statusConfig)
// // // // // // const pageSizeOptions = [5, 10, 20, 50]

// // // // // // const OrderSpeedGeneric = () => {
// // // // // //   const theme = useTheme()
// // // // // //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
// // // // // //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
// // // // // //   const [displayTitle, setDisplayTitle] = useState(false)
// // // // // //   const [viewMode, setViewMode] = useState<"card" | "list">(isMobile ? "card" : "card")
// // // // // //   const [openPendingDialog, setOpenPendingDialog] = useState(false)
// // // // // //   const [selectedOrder, setSelectedOrder] = useState<any>(null)
// // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
// // // // // //   const [searchQuery, setSearchQuery] = useState("")
// // // // // //   const [activeStatus, setActiveStatus] = useState("all")
// // // // // //   const [currentPages, setCurrentPages] = useState<Record<string, number>>(
// // // // // //     statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 }),
// // // // // //   )

// // // // // //   const [isTapped, setIsTapped] = useState(false)
// // // // // //   const [expandedRows, setExpandedRows] = useState<string[]>([])

// // // // // //   const [pageSize, setPageSize] = useState(isMobile ? 5 : 10)

// // // // // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
// // // // // //   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } }

// // // // // //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email")

// // // // // //   const {
// // // // // //     allOrders,
// // // // // //     ordersByStatus,
// // // // // //     isConnected,
// // // // // //     isLoading,
// // // // // //     isUpdating,
// // // // // //     error,
// // // // // //     successMessage,
// // // // // //     lastRefresh,
// // // // // //     fetchHistoricalOrders,
// // // // // //     handleOrderAction,
// // // // // //     updateOrder,
// // // // // //     clearMessages,
// // // // // //   } = useOrdersManagementSocketApi({
// // // // // //     companyName: data?.companyName || "LlakaScript",
// // // // // //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// // // // // //     orderLimit: 50,
// // // // // //   })

// // // // // //   // Calculate totals
// // // // // //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)
// // // // // //   const pendingCount = ordersByStatus.pending?.length || 0
// // // // // //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
// // // // // //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

// // // // // //   // Filter and search orders
// // // // // //   const filteredOrders = useMemo(() => {
// // // // // //     let filtered = [...allOrders]

// // // // // //     if (activeStatus !== "all") {
// // // // // //       filtered = filtered.filter((order) => order.status === activeStatus)
// // // // // //     }

// // // // // //     if (searchQuery) {
// // // // // //       const query = searchQuery.toLowerCase()
// // // // // //       filtered = filtered.filter((order) => {
// // // // // //         return (
// // // // // //           order.fullname?.toLowerCase().includes(query) ||
// // // // // //           order.id?.toString().includes(query) ||
// // // // // //           order._id?.toString().includes(query) ||
// // // // // //           order.orderType?.toLowerCase().includes(query) ||
// // // // // //           order.cart.some(
// // // // // //             (item: any) =>
// // // // // //               item.name.toLowerCase().includes(query) ||
// // // // // //               item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query)),
// // // // // //           )
// // // // // //         )
// // // // // //       })
// // // // // //     }

// // // // // //     return filtered.sort((a, b) => {
// // // // // //       const dateA = new Date(a.createdAt || a.timestamp || 0)
// // // // // //       const dateB = new Date(b.createdAt || b.timestamp || 0)
// // // // // //       return dateB.getTime() - dateA.getTime()
// // // // // //     })
// // // // // //   }, [allOrders, activeStatus, searchQuery])

// // // // // //   // Paginate orders
// // // // // //   const paginatedOrders = useMemo(() => {
// // // // // //     const startIndex = (currentPages[activeStatus] - 1) * pageSize
// // // // // //     return filteredOrders.slice(startIndex, startIndex + pageSize)
// // // // // //   }, [filteredOrders, currentPages, activeStatus, pageSize])

// // // // // //   // Calculate page count for current status
// // // // // //   const pageCount = Math.ceil(filteredOrders.length / pageSize)

// // // // // //   // Handle page change
// // // // // //   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
// // // // // //     setCurrentPages((prev) => ({
// // // // // //       ...prev,
// // // // // //       [activeStatus]: value,
// // // // // //     }))
// // // // // //     window.scrollTo({ top: 0, behavior: "smooth" })
// // // // // //   }

// // // // // //   // Handle page size change
// // // // // //   const handlePageSizeChange = (event: any) => {
// // // // // //     const newSize = event.target.value
// // // // // //     setPageSize(newSize)
// // // // // //     // Recalculate current page to avoid empty pages
// // // // // //     const newPage = Math.floor(((currentPages[activeStatus] - 1) * pageSize) / newSize) + 1
// // // // // //     setCurrentPages((prev) => ({
// // // // // //       ...prev,
// // // // // //       [activeStatus]: newPage,
// // // // // //     }))
// // // // // //   }

// // // // // //   // Toggle functions
// // // // // //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
// // // // // //   const toggleViewMode = () => setViewMode(viewMode === "card" ? "list" : "card")

// // // // // //   // Action handlers
// // // // // //   const handleLogout = async () => {
// // // // // //     clearLocalhostStorage()
// // // // // //     await recordAttendance("getOut", user?.user?.email, data?.companyName)
// // // // // //     window.location.reload()
// // // // // //   }

// // // // // //   const handleOpenEditModal = (order: any) => {
// // // // // //     setSelectedOrder(order)
// // // // // //     setIsEditModalOpen(true)
// // // // // //   }

// // // // // //   const handleCloseEditModal = () => {
// // // // // //     setIsEditModalOpen(false)
// // // // // //     setSelectedOrder(null)
// // // // // //   }

// // // // // //   const saveUpdateData = async (updatedOrder: any) => {
// // // // // //     try {
// // // // // //       await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder)
// // // // // //       handleCloseEditModal()
// // // // // //     } catch (error) {
// // // // // //       console.error("Failed to update order:", error)
// // // // // //     }
// // // // // //   }

// // // // // //   const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
// // // // // //     setActiveStatus(newValue)
// // // // // //     setCurrentPages((prev) => ({
// // // // // //       ...prev,
// // // // // //       [newValue]: 1,
// // // // // //     }))
// // // // // //   }

// // // // // //   const clearSearch = () => {
// // // // // //     setSearchQuery("")
// // // // // //   }

// // // // // //   // Effects
// // // // // //   useEffect(() => {
// // // // // //     const interval = setInterval(() => {
// // // // // //       setDisplayTitle((prev) => !prev)
// // // // // //     }, 5000)
// // // // // //     return () => clearInterval(interval)
// // // // // //   }, [])

// // // // // //   useEffect(() => {
// // // // // //     setViewMode(isMobile ? "card" : "card")
// // // // // //     setPageSize(isMobile ? 5 : 10)
// // // // // //   }, [isMobile])

// // // // // //   // Scroll to top button logic
// // // // // //   const trigger = useScrollTrigger({
// // // // // //     threshold: 100,
// // // // // //   })

// // // // // //   const scrollToTop = () => {
// // // // // //     window.scrollTo({
// // // // // //       top: 0,
// // // // // //       behavior: "smooth",
// // // // // //     })
// // // // // //   }

// // // // // //   // Order Card Component
// // // // // //   const OrderCard = React.memo(({ order }: { order: any }) => {
// // // // // //     console.log("**************************", order)
// // // // // //     const status = order.status
// // // // // //     const config = statusConfig[status as keyof typeof statusConfig]
// // // // // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
// // // // // //     const total = order.cart.reduce((sum: any, item: any) => {
// // // // // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
// // // // // //       return sum + item.price * item.quantity + extrasTotal
// // // // // //     }, 0)


// // // // // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // // //       hour: "2-digit",
// // // // // //       minute: "2-digit",
// // // // // //     })

// // // // // //     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette]

// // // // // //     return (
// // // // // //       <Card
// // // // // //         sx={{
// // // // // //           borderLeft: "4px solid",
// // // // // //           borderColor: paletteColor?.main || "grey",
// // // // // //           mb: 2,
// // // // // //           position: "relative",
// // // // // //           transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
// // // // // //           "&:hover": {
// // // // // //             transform: isMobile ? "none" : "translateY(-2px)",
// // // // // //             boxShadow: isMobile ? "none" : theme.shadows[4],
// // // // // //           },
// // // // // //         }}
// // // // // //       >
// // // // // //         <CardContent>
// // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
// // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // //               #{order.id || order._id.slice(-4)}
// // // // // //             </Typography>
// // // // // //             <Chip size="small" label={order.orderType} color={config.color as any} icon={config.icon} />
// // // // // //           </Box>

// // // // // //           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
// // // // // //             <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // //             <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // //               {order.fullname}
// // // // // //             </Typography>
// // // // // //             <Box sx={{ flexGrow: 1 }} />
// // // // // //             <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // //             <Typography variant="body2">{formattedTime}</Typography>
// // // // // //           </Box>

// // // // // //           <Divider sx={{ my: 1 }} />

// // // // // //           <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
// // // // // //             Items ({totalItems})
// // // // // //           </Typography>

// // // // // //           <List dense disablePadding>
// // // // // //             {order.cart.slice(0, isMobile ? 2 : undefined).map((item: any) => (
// // // // // //               <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.25 }}>
// // // // // //                 <ListItemText
// // // // // //                   primary={
// // // // // //                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // //                       <Typography variant="body2">
// // // // // //                         <strong>{item.quantity}x</strong> {item.name}
// // // // // //                       </Typography>
// // // // // //                       <Typography variant="body2" sx={{ ml: 1 }}>
// // // // // //                         ${item.price.toFixed(2)}
// // // // // //                       </Typography>
// // // // // //                     </Box>
// // // // // //                   }
// // // // // //                   secondary={
// // // // // //                     item.extras?.length > 0 && (
// // // // // //                       <List dense disablePadding sx={{ ml: 2 }}>
// // // // // //                         {item.extras.slice(0, isMobile ? 1 : undefined).map((extra: any, idx: number) => (
// // // // // //                           <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0 }}>
// // // // // //                             <ListItemText
// // // // // //                               primary={
// // // // // //                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // //                                   <Typography variant="caption">+ {extra.name}</Typography>
// // // // // //                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>

// // // // // //                                 </Box>
// // // // // //                               }

// // // // // //                             />
// // // // // //                           </ListItem>
// // // // // //                         ))}

// // // // // //                         <ListItemText
// // // // // //                           primary={
// // // // // //                             <Box sx={{ display: "flex", justifyContent: "space-between" }}>

// // // // // //                               <Typography variant="caption"> <strong>Comentario </strong>  {item?.comments}</Typography>
// // // // // //                             </Box>
// // // // // //                           }
// // // // // //                         />

// // // // // //                       </List>
// // // // // //                     )
// // // // // //                   }
// // // // // //                 />
// // // // // //               </ListItem>
// // // // // //             ))}
// // // // // //             {isMobile && order.cart.length > 2 && (
// // // // // //               <Typography variant="caption" color="text.secondary">
// // // // // //                 +{order.cart.length - 2} más...
// // // // // //               </Typography>
// // // // // //             )}
// // // // // //           </List>



// // // // // //           <Divider sx={{ my: 1 }} />
// // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // // // //             <Typography variant="caption"> <strong>Comentario General </strong> {order?.comments}</Typography>
// // // // // //           </Box>
// // // // // //           <Divider sx={{ my: 1 }} />



// // // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // // //               Total: ${total.toFixed(2)}
// // // // // //             </Typography>

// // // // // //             <Stack direction="row" spacing={1}>
// // // // // //               {config.actions.map((action: any, idx: number) => (
// // // // // //                 <Button
// // // // // //                   key={`${action.action}-${idx}`}
// // // // // //                   size="small"
// // // // // //                   variant="contained"
// // // // // //                   color={action.color as any}
// // // // // //                   startIcon={action.icon}
// // // // // //                   onClick={(e) => {
// // // // // //                     e.stopPropagation()
// // // // // //                     handleOrderAction(action.action, order)
// // // // // //                   }}
// // // // // //                   disabled={isUpdating}
// // // // // //                 >
// // // // // //                   {action.label}
// // // // // //                 </Button>
// // // // // //               ))}

// // // // // //               <Button
// // // // // //                 size="small"
// // // // // //                 variant="outlined"
// // // // // //                 color="primary"
// // // // // //                 startIcon={<EditIcon />}
// // // // // //                 onClick={(e) => {
// // // // // //                   e.stopPropagation()
// // // // // //                   handleOpenEditModal(order)
// // // // // //                 }}
// // // // // //                 disabled={isUpdating}
// // // // // //               >
// // // // // //                 Editar
// // // // // //               </Button>
// // // // // //             </Stack>
// // // // // //           </Box>
// // // // // //         </CardContent>
// // // // // //       </Card>
// // // // // //     )
// // // // // //   })

// // // // // //   const handleToggleExpand = (orderId: string) => {
// // // // // //     setExpandedRows((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
// // // // // //   }

// // // // // //   const OrderRow = React.memo(
// // // // // //     ({
// // // // // //       order,
// // // // // //       expandedRows,
// // // // // //       onToggleExpand,
// // // // // //     }: {
// // // // // //       order: any
// // // // // //       expandedRows: string[]
// // // // // //       onToggleExpand: (id: string) => void
// // // // // //     }) => {
// // // // // //       const status = order.status
// // // // // //       const config = statusConfig[status as keyof typeof statusConfig]
// // // // // //       const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
// // // // // //       const total = order.cart.reduce((sum: any, item: any) => {
// // // // // //         const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
// // // // // //         return sum + item.price * item.quantity + extrasTotal
// // // // // //       }, 0)

// // // // // //       const commentsOrderGeneral = order?.comments
// // // // // //       const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // // //         hour: "2-digit",
// // // // // //         minute: "2-digit",
// // // // // //       })

// // // // // //       // Use the order ID to maintain expanded state
// // // // // //       const orderId = order._id || order.id
// // // // // //       const isExpanded = expandedRows.includes(orderId)

// // // // // //       // When toggling, update the parent's state
// // // // // //       const toggleExpand = (e: React.MouseEvent) => {
// // // // // //         e.stopPropagation()
// // // // // //         onToggleExpand(orderId)
// // // // // //       }

// // // // // //       return (
// // // // // //         <>
// // // // // //           <TableRow
// // // // // //             sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
// // // // // //             onClick={toggleExpand}
// // // // // //           >
// // // // // //             <TableCell>
// // // // // //               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // // //                 <IconButton size="small" onClick={toggleExpand}>
// // // // // //                   {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
// // // // // //                 </IconButton>
// // // // // //                 <Typography variant="body2" fontWeight="bold">
// // // // // //                   #{order.id || order._id.slice(-4)}
// // // // // //                 </Typography>
// // // // // //               </Box>
// // // // // //             </TableCell>
// // // // // //             <TableCell>
// // // // // //               <Box sx={{ display: "flex", alignItems: "center" }}>
// // // // // //                 <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // // //                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // //                   {order.fullname}
// // // // // //                 </Typography>
// // // // // //               </Box>
// // // // // //             </TableCell>
// // // // // //             <TableCell>
// // // // // //               <Chip size="small" label={order.orderType} color={config.color as any} icon={config.icon} />
// // // // // //             </TableCell>
// // // // // //             <TableCell>
// // // // // //               <Typography variant="body2">{totalItems} items</Typography>
// // // // // //             </TableCell>
// // // // // //             <TableCell>
// // // // // //               <Typography variant="body2" fontWeight="bold">
// // // // // //                 ${total.toFixed(2)}
// // // // // //               </Typography>
// // // // // //             </TableCell>
// // // // // //             <TableCell>
// // // // // //               <Typography variant="body2">{formattedTime}</Typography>
// // // // // //             </TableCell>
// // // // // //             <TableCell>
// // // // // //               <Tooltip title={commentsOrderGeneral || "Sin comentarios"} arrow>
// // // // // //                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // // //                   {commentsOrderGeneral || "-"}
// // // // // //                 </Typography>
// // // // // //               </Tooltip>
// // // // // //             </TableCell>
// // // // // //             <TableCell>
// // // // // //               <Stack direction="row" spacing={1}>
// // // // // //                 {config.actions.map((action: any, idx: number) => (
// // // // // //                   <Tooltip key={`${action.action}-${idx}`} title={action.label}>
// // // // // //                     <IconButton
// // // // // //                       size="small"
// // // // // //                       color={action.color as any}
// // // // // //                       onClick={(e) => {
// // // // // //                         e.stopPropagation()
// // // // // //                         handleOrderAction(action.action, order)
// // // // // //                       }}
// // // // // //                       disabled={isUpdating}
// // // // // //                     >
// // // // // //                       {action.icon}
// // // // // //                     </IconButton>
// // // // // //                   </Tooltip>
// // // // // //                 ))}
// // // // // //                 <Tooltip title="Editar">
// // // // // //                   <IconButton
// // // // // //                     size="small"
// // // // // //                     color="primary"
// // // // // //                     onClick={(e) => {
// // // // // //                       e.stopPropagation()
// // // // // //                       handleOpenEditModal(order)
// // // // // //                     }}
// // // // // //                     disabled={isUpdating}
// // // // // //                   >
// // // // // //                     <EditIcon fontSize="small" />
// // // // // //                   </IconButton>
// // // // // //                 </Tooltip>
// // // // // //               </Stack>
// // // // // //             </TableCell>
// // // // // //           </TableRow>

// // // // // //           {/* Expanded details row */}
// // // // // //           <TableRow>
// // // // // //             <TableCell style={{ padding: 0 }} colSpan={8}>
// // // // // //               <Collapse in={isExpanded} timeout="auto" unmountOnExit>
// // // // // //                 <Box
// // // // // //                   sx={{
// // // // // //                     p: 3,
// // // // // //                     backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
// // // // // //                     borderBottom: `1px solid ${theme.palette.divider}`,
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
// // // // // //                     Detalles de la Orden
// // // // // //                   </Typography>

// // // // // //                   <Grid container spacing={2}>
// // // // // //                     <Grid item xs={12} md={6}>
// // // // // //                       <Typography variant="subtitle2" gutterBottom>
// // // // // //                         Productos:
// // // // // //                       </Typography>
// // // // // //                       <List dense disablePadding>
// // // // // //                         {order.cart.map((item: any, index: number) => (
// // // // // //                           <React.Fragment key={`${item.id}-${index}`}>
// // // // // //                             <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // //                               <ListItemText
// // // // // //                                 primary={
// // // // // //                                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // //                                     <Typography variant="body2">
// // // // // //                                       <strong>{item.quantity}x</strong> {item.name}
// // // // // //                                     </Typography>
// // // // // //                                     <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>

// // // // // //                                     <Typography variant="body2">
// // // // // //                                       <strong>Comentario General: </strong> {commentsOrderGeneral}
// // // // // //                                     </Typography>

// // // // // //                                   </Box>
// // // // // //                                 }
// // // // // //                                 secondary={
// // // // // //                                   < div>
// // // // // //                                     {
// // // // // //                                       item.extras?.length > 0 && (
// // // // // //                                         <List dense disablePadding sx={{ ml: 2, mt: 0.5 }}>

// // // // // //                                           {item?.extras?.map((extra: any, idx: number) => (
// // // // // //                                             <ListItem key={`${item.id}-extra-${idx}`} disablePadding sx={{ py: 0 }}>
// // // // // //                                               <ListItemText
// // // // // //                                                 primary={
// // // // // //                                                   <Box
// // // // // //                                                     sx={{
// // // // // //                                                       display: "flex",
// // // // // //                                                       justifyContent: "space-between",
// // // // // //                                                       alignItems: "center",
// // // // // //                                                     }}
// // // // // //                                                   >
// // // // // //                                                     <Typography variant="caption">+ {extra.name}</Typography>
// // // // // //                                                     <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // // // //                                                   </Box>
// // // // // //                                                 }
// // // // // //                                               />
// // // // // //                                             </ListItem>
// // // // // //                                           ))}
// // // // // //                                         </List>
// // // // // //                                       )
// // // // // //                                     }
// // // // // //                                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>

// // // // // //                                     </Box>
// // // // // //                                     <Typography variant="caption">Comentarios: {item?.comments}</Typography>
// // // // // //                                   </div>
// // // // // //                                 }
// // // // // //                               />
// // // // // //                             </ListItem>
// // // // // //                             <Divider sx={{ my: 0.5 }} />
// // // // // //                           </React.Fragment>
// // // // // //                         ))}
// // // // // //                       </List>
// // // // // //                     </Grid>

// // // // // //                     <Grid item xs={12} md={6}>
// // // // // //                       <Typography variant="subtitle2" gutterBottom>
// // // // // //                         Información Adicional:
// // // // // //                       </Typography>
// // // // // //                       <List dense disablePadding>
// // // // // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // //                           <ListItemText
// // // // // //                             primary={
// // // // // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // //                                 <Typography variant="body2">
// // // // // //                                   <strong>Estado:</strong>
// // // // // //                                 </Typography>
// // // // // //                                 <Chip
// // // // // //                                   size="small"
// // // // // //                                   label={config.label}
// // // // // //                                   color={config.color as any}
// // // // // //                                   icon={config.icon}
// // // // // //                                 />
// // // // // //                               </Box>
// // // // // //                             }
// // // // // //                           />
// // // // // //                         </ListItem>
// // // // // //                         <Divider sx={{ my: 0.5 }} />

// // // // // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // //                           <ListItemText
// // // // // //                             primary={
// // // // // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // //                                 <Typography variant="body2">
// // // // // //                                   <strong>Total:</strong>
// // // // // //                                 </Typography>
// // // // // //                                 <Typography variant="body2" fontWeight="bold">
// // // // // //                                   ${total.toFixed(2)}
// // // // // //                                 </Typography>
// // // // // //                               </Box>
// // // // // //                             }
// // // // // //                           />
// // // // // //                         </ListItem>
// // // // // //                         <Divider sx={{ my: 0.5 }} />

// // // // // //                         {commentsOrderGeneral && (
// // // // // //                           <>
// // // // // //                             <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // //                               <ListItemText
// // // // // //                                 primary={
// // // // // //                                   <Box>
// // // // // //                                     <Typography variant="body2">
// // // // // //                                       <strong>Comentarios:</strong>
// // // // // //                                     </Typography>
// // // // // //                                     <Typography variant="body2" sx={{ mt: 0.5 }}>
// // // // // //                                       {commentsOrderGeneral}
// // // // // //                                     </Typography>
// // // // // //                                   </Box>
// // // // // //                                 }
// // // // // //                               />
// // // // // //                             </ListItem>
// // // // // //                             <Divider sx={{ my: 0.5 }} />
// // // // // //                           </>
// // // // // //                         )}

// // // // // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // // //                           <ListItemText
// // // // // //                             primary={
// // // // // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // //                                 <Typography variant="body2">
// // // // // //                                   <strong>Hora:</strong>
// // // // // //                                 </Typography>
// // // // // //                                 <Typography variant="body2">{formattedTime}</Typography>
// // // // // //                               </Box>
// // // // // //                             }
// // // // // //                           />
// // // // // //                         </ListItem>
// // // // // //                       </List>
// // // // // //                     </Grid>
// // // // // //                   </Grid>
// // // // // //                 </Box>
// // // // // //               </Collapse>
// // // // // //             </TableCell>
// // // // // //           </TableRow>
// // // // // //         </>
// // // // // //       )
// // // // // //     },
// // // // // //   )

// // // // // //   // Custom Pagination Controls
// // // // // //   const PaginationControls = () => (
// // // // // //     <Box
// // // // // //       sx={{
// // // // // //         display: "flex",
// // // // // //         justifyContent: "space-between",
// // // // // //         alignItems: "center",
// // // // // //         mt: 3,
// // // // // //         pb: 2,
// // // // // //         flexDirection: isMobile ? "column" : "row",
// // // // // //         gap: isMobile ? 2 : 0,
// // // // // //       }}
// // // // // //     >
// // // // // //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // // //         <Typography variant="body2" color="text.secondary">
// // // // // //           Órdenes por página:
// // // // // //         </Typography>
// // // // // //         <FormControl size="small" variant="outlined">
// // // // // //           <Select value={pageSize} onChange={handlePageSizeChange} sx={{ height: "36px" }}>
// // // // // //             {pageSizeOptions.map((size) => (
// // // // // //               <MenuItem key={size} value={size}>
// // // // // //                 {size}
// // // // // //               </MenuItem>
// // // // // //             ))}
// // // // // //           </Select>
// // // // // //         </FormControl>
// // // // // //       </Box>

// // // // // //       <Pagination
// // // // // //         count={pageCount}
// // // // // //         page={currentPages[activeStatus]}
// // // // // //         onChange={handlePageChange}
// // // // // //         color="primary"
// // // // // //         size={isMobile ? "small" : "medium"}
// // // // // //         showFirstButton
// // // // // //         showLastButton
// // // // // //         siblingCount={isMobile ? 0 : 1}
// // // // // //         boundaryCount={isMobile ? 1 : 2}
// // // // // //       />

// // // // // //       <Typography variant="body2" color="text.secondary">
// // // // // //         Mostrando {(currentPages[activeStatus] - 1) * pageSize + 1}-
// // // // // //         {Math.min(currentPages[activeStatus] * pageSize, filteredOrders.length)} de {filteredOrders.length} órdenes
// // // // // //       </Typography>
// // // // // //     </Box>
// // // // // //   )

// // // // // //   // Main render
// // // // // //   return (
// // // // // //     <Box
// // // // // //       sx={{
// // // // // //         height: "100vh",
// // // // // //         overflow: "hidden",
// // // // // //         bgcolor: theme.palette.background.default,
// // // // // //         display: "flex",
// // // // // //         flexDirection: "column",
// // // // // //       }}
// // // // // //     >
// // // // // //       {/* Custom AppBar */}
// // // // // //       <AppBar
// // // // // //         position="sticky"
// // // // // //         elevation={0}
// // // // // //         sx={{
// // // // // //           bgcolor: "background.paper",
// // // // // //           color: "text.primary",
// // // // // //           borderBottom: 1,
// // // // // //           borderColor: "divider",
// // // // // //         }}
// // // // // //       >
// // // // // //         <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
// // // // // //           {/* Logo and Title */}
// // // // // //           <Box
// // // // // //             sx={{
// // // // // //               display: "flex",
// // // // // //               alignItems: "center",
// // // // // //               gap: 1,
// // // // // //               flexGrow: 1,
// // // // // //               height: "40px",
// // // // // //               position: "relative",
// // // // // //               overflow: "hidden",
// // // // // //             }}
// // // // // //           >
// // // // // //             <Avatar
// // // // // //               sx={{
// // // // // //                 width: 28,
// // // // // //                 height: 28,
// // // // // //                 flexShrink: 0,
// // // // // //                 ml: 0.5,
// // // // // //               }}
// // // // // //             >
// // // // // //               <Image
// // // // // //                 src={"/images/flama.png"}
// // // // // //                 alt={"LlakaScript"}
// // // // // //                 width={28}
// // // // // //                 height={28}
// // // // // //                 priority
// // // // // //                 style={{
// // // // // //                   objectFit: "contain",
// // // // // //                   width: "100%",
// // // // // //                   height: "100%",
// // // // // //                 }}
// // // // // //               />
// // // // // //             </Avatar>

// // // // // //             <Box
// // // // // //               sx={{
// // // // // //                 position: "relative",
// // // // // //                 width: "auto",
// // // // // //                 height: "100%",
// // // // // //                 display: "flex",
// // // // // //                 alignItems: "center",
// // // // // //                 flexGrow: 1,
// // // // // //               }}
// // // // // //             >
// // // // // //               <Typography
// // // // // //                 variant={isMobile ? "subtitle1" : "h6"}
// // // // // //                 sx={{
// // // // // //                   fontWeight: 600,
// // // // // //                   lineHeight: 1.1,
// // // // // //                   fontSize: isMobile ? "1rem" : undefined,
// // // // // //                 }}
// // // // // //               >
// // // // // //                 {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // // //               </Typography>
// // // // // //             </Box>
// // // // // //           </Box>

// // // // // //           {/* Right side controls */}
// // // // // //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// // // // // //             {/* View mode toggle */}
// // // // // //             <Tooltip title={viewMode === "card" ? "Vista lista" : "Vista tarjetas"}>
// // // // // //               <IconButton size="small" onClick={toggleViewMode} color="default">
// // // // // //                 {viewMode === "card" ? <ViewListIcon fontSize="small" /> : <ViewColumnIcon fontSize="small" />}
// // // // // //               </IconButton>
// // // // // //             </Tooltip>

// // // // // //             {/* Connection status indicator */}
// // // // // //             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
// // // // // //               <Box
// // // // // //                 sx={{
// // // // // //                   width: 10,
// // // // // //                   height: 10,
// // // // // //                   borderRadius: "50%",
// // // // // //                   bgcolor: isConnected ? "success.main" : "error.main",
// // // // // //                   mr: 1,
// // // // // //                 }}
// // // // // //               />
// // // // // //             </Tooltip>

// // // // // //             {/* Order count badge */}
// // // // // //             {isMobile && totalOrders > 0 && (
// // // // // //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// // // // // //                 <Box sx={{ width: 4, height: 4 }} />
// // // // // //               </Badge>
// // // // // //             )}

// // // // // //             {/* Last refresh time */}
// // // // // //             {lastRefresh && !isMobile && (
// // // // // //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// // // // // //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// // // // // //               </Typography>
// // // // // //             )}

// // // // // //             {/* Refresh button */}
// // // // // //             <Tooltip title="Actualizar">
// // // // // //               <IconButton
// // // // // //                 color="primary"
// // // // // //                 size="small"
// // // // // //                 onClick={fetchHistoricalOrders}
// // // // // //                 disabled={isLoading || isUpdating}
// // // // // //               >
// // // // // //                 <RefreshIcon fontSize="small" />
// // // // // //               </IconButton>
// // // // // //             </Tooltip>

// // // // // //             {/* Header collapse toggle (mobile only) */}
// // // // // //             {isMobile && (
// // // // // //               <IconButton size="small" onClick={toggleHeader}>
// // // // // //                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
// // // // // //               </IconButton>
// // // // // //             )}

// // // // // //             <Tooltip title="Salir">
// // // // // //               <IconButton size="small" onClick={handleLogout} color="default">
// // // // // //                 <LogoutIcon fontSize="small" />
// // // // // //               </IconButton>
// // // // // //             </Tooltip>
// // // // // //           </Box>
// // // // // //         </Toolbar>
// // // // // //       </AppBar>

// // // // // //       {/* Main content */}
// // // // // //       <Box
// // // // // //         component="main"
// // // // // //         sx={{
// // // // // //           p: { xs: 0.5, sm: 2 },
// // // // // //           flex: 1,
// // // // // //           overflow: "auto",
// // // // // //           display: "flex",
// // // // // //           flexDirection: "column",
// // // // // //         }}
// // // // // //       >
// // // // // //         <Paper
// // // // // //           elevation={isMobile ? 1 : 3}
// // // // // //           sx={{
// // // // // //             height: "100%",
// // // // // //             display: "flex",
// // // // // //             flexDirection: "column",
// // // // // //             overflow: "hidden",
// // // // // //             borderRadius: { xs: 1, sm: 2 },
// // // // // //           }}
// // // // // //         >
// // // // // //           {/* Status header - collapsible on mobile */}
// // // // // //           <Collapse in={!headerCollapsed} timeout="auto">
// // // // // //             <Box
// // // // // //               sx={{
// // // // // //                 display: "flex",
// // // // // //                 flexDirection: "column",
// // // // // //                 borderBottom: "1px solid",
// // // // // //                 borderColor: theme.palette.divider,
// // // // // //                 overflow: "hidden",
// // // // // //               }}
// // // // // //             >
// // // // // //               {/* Search bar */}
// // // // // //               <Box sx={{ p: 2, pb: 0 }}>
// // // // // //                 <TextField
// // // // // //                   fullWidth
// // // // // //                   variant="outlined"
// // // // // //                   placeholder="Buscar órdenes..."
// // // // // //                   value={searchQuery}
// // // // // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // // // // //                   InputProps={{
// // // // // //                     startAdornment: (
// // // // // //                       <InputAdornment position="start">
// // // // // //                         <SearchIcon />
// // // // // //                       </InputAdornment>
// // // // // //                     ),
// // // // // //                     endAdornment: searchQuery && (
// // // // // //                       <InputAdornment position="end">
// // // // // //                         <IconButton onClick={clearSearch} size="small">
// // // // // //                           <ClearIcon fontSize="small" />
// // // // // //                         </IconButton>
// // // // // //                       </InputAdornment>
// // // // // //                     ),
// // // // // //                   }}
// // // // // //                 />
// // // // // //               </Box>

// // // // // //               {/* Status tabs */}
// // // // // //               <Box sx={{ px: 2, pt: 1 }}>
// // // // // //                 <Tabs
// // // // // //                   value={activeStatus}
// // // // // //                   onChange={handleStatusChange}
// // // // // //                   variant="scrollable"
// // // // // //                   scrollButtons="auto"
// // // // // //                   allowScrollButtonsMobile
// // // // // //                 >
// // // // // //                   <Tab label="Todas" value="all" />
// // // // // //                   {statusOptions.map((status) => (
// // // // // //                     <Tab
// // // // // //                       key={status}
// // // // // //                       label={statusConfig[status as keyof typeof statusConfig].label}
// // // // // //                       value={status}
// // // // // //                       icon={statusConfig[status as keyof typeof statusConfig].icon}
// // // // // //                       iconPosition="start"
// // // // // //                     />
// // // // // //                   ))}
// // // // // //                 </Tabs>
// // // // // //               </Box>

// // // // // //               {/* Status indicators */}
// // // // // //               {(isLoading || isUpdating) && (
// // // // // //                 <Box
// // // // // //                   sx={{
// // // // // //                     display: "flex",
// // // // // //                     alignItems: "center",
// // // // // //                     gap: 1,
// // // // // //                     p: 1,
// // // // // //                     mx: 1,
// // // // // //                     mb: 1,
// // // // // //                     backgroundColor: theme.palette.action.hover,
// // // // // //                     borderRadius: 1,
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <CircularProgress size={16} />
// // // // // //                   <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// // // // // //                     {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// // // // // //                   </Typography>
// // // // // //                 </Box>
// // // // // //               )}
// // // // // //             </Box>
// // // // // //           </Collapse>

// // // // // //           {/* Error messages */}
// // // // // //           <Box
// // // // // //             sx={{
// // // // // //               px: { xs: 1, sm: 2 },
// // // // // //               pt: { xs: 1, sm: 1 },
// // // // // //               overflow: "auto",
// // // // // //               flexShrink: 0,
// // // // // //             }}
// // // // // //           >
// // // // // //             {error && (
// // // // // //               <Alert severity="error" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// // // // // //                 {error}
// // // // // //               </Alert>
// // // // // //             )}

// // // // // //             {successMessage && (
// // // // // //               <Alert severity="success" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// // // // // //                 {successMessage}
// // // // // //               </Alert>
// // // // // //             )}
// // // // // //           </Box>

// // // // // //           {/* Main content - takes all available space */}
// // // // // //           <Box
// // // // // //             sx={{
// // // // // //               flex: 1,
// // // // // //               overflow: "auto",
// // // // // //               display: "flex",
// // // // // //               flexDirection: "column",
// // // // // //               p: { xs: 1, sm: 2 },
// // // // // //             }}
// // // // // //           >
// // // // // //             <PendingOrdersDialog open={openPendingDialog} onClose={() => setOpenPendingDialog(false)} />

// // // // // //             {/* Orders list */}
// // // // // //             <Box sx={{ flex: 1 }}>
// // // // // //               {filteredOrders.length === 0 ? (
// // // // // //                 <Box
// // // // // //                   sx={{
// // // // // //                     display: "flex",
// // // // // //                     justifyContent: "center",
// // // // // //                     alignItems: "center",
// // // // // //                     height: "200px",
// // // // // //                     flexDirection: "column",
// // // // // //                     gap: 2,
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <Typography variant="h6" color="text.secondary">
// // // // // //                     No se encontraron órdenes
// // // // // //                   </Typography>
// // // // // //                   <Button
// // // // // //                     variant="outlined"
// // // // // //                     onClick={() => {
// // // // // //                       setSearchQuery("")
// // // // // //                       setActiveStatus("all")
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     Limpiar filtros
// // // // // //                   </Button>
// // // // // //                 </Box>
// // // // // //               ) : viewMode === "card" ? (
// // // // // //                 <>
// // // // // //                   <Grid container spacing={isMobile ? 1 : 3}>
// // // // // //                     {paginatedOrders.map((order: any) => (
// // // // // //                       <Grid item xs={12} key={order._id || order.id}>
// // // // // //                         <OrderCard order={order} />
// // // // // //                       </Grid>
// // // // // //                     ))}
// // // // // //                   </Grid>
// // // // // //                   <PaginationControls />
// // // // // //                 </>
// // // // // //               ) : (
// // // // // //                 <>
// // // // // //                   <TableContainer
// // // // // //                     component={Paper}
// // // // // //                     elevation={0}
// // // // // //                     sx={{
// // // // // //                       position: "relative",
// // // // // //                       overflow: "hidden",
// // // // // //                       "&:before": {
// // // // // //                         content: '""',
// // // // // //                         position: "absolute",
// // // // // //                         top: 0,
// // // // // //                         left: 0,
// // // // // //                         right: 0,
// // // // // //                         height: "4px",
// // // // // //                         background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
// // // // // //                         zIndex: 1,
// // // // // //                       },
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     <Table size={isMobile ? "small" : "medium"}>
// // // // // //                       <TableHead>
// // // // // //                         <TableRow>
// // // // // //                           <TableCell>ID</TableCell>
// // // // // //                           <TableCell>Cliente</TableCell>
// // // // // //                           <TableCell>Estado</TableCell>
// // // // // //                           <TableCell>Items</TableCell>
// // // // // //                           <TableCell>Total</TableCell>
// // // // // //                           <TableCell>Hora</TableCell>
// // // // // //                           <TableCell>Comentario General</TableCell>
// // // // // //                           <TableCell>Acciones</TableCell>
// // // // // //                         </TableRow>
// // // // // //                       </TableHead>
// // // // // //                       <TableBody>
// // // // // //                         {paginatedOrders.map((order: any) => (
// // // // // //                           <OrderRow
// // // // // //                             key={order._id || order.id}
// // // // // //                             order={order}
// // // // // //                             expandedRows={expandedRows}
// // // // // //                             onToggleExpand={handleToggleExpand}
// // // // // //                           />
// // // // // //                         ))}
// // // // // //                       </TableBody>
// // // // // //                     </Table>
// // // // // //                   </TableContainer>
// // // // // //                   <PaginationControls />
// // // // // //                 </>
// // // // // //               )}
// // // // // //             </Box>
// // // // // //           </Box>
// // // // // //         </Paper>

// // // // // //         {/* Scroll to top button */}
// // // // // //         <Zoom in={trigger}>
// // // // // //           <Box
// // // // // //             onClick={scrollToTop}
// // // // // //             role="presentation"
// // // // // //             sx={{
// // // // // //               position: "fixed",
// // // // // //               bottom: 16,
// // // // // //               right: 16,
// // // // // //               zIndex: 1000,
// // // // // //             }}
// // // // // //           >
// // // // // //             <Fab color="primary" size="small" aria-label="scroll back to top">
// // // // // //               <KeyboardArrowUp />
// // // // // //             </Fab>
// // // // // //           </Box>
// // // // // //         </Zoom>
// // // // // //       </Box>

// // // // // //       {/* Edit Order Modal */}
// // // // // //       {isEditModalOpen && selectedOrder && (
// // // // // //         <EditOrderModal
// // // // // //           open={isEditModalOpen}
// // // // // //           order={selectedOrder}
// // // // // //           onSave={saveUpdateData}
// // // // // //           menuData={{
// // // // // //             mainMenu: hojas?.Hoja1 || [],
// // // // // //             promotions: hojas?.Promotion || [],
// // // // // //           }}
// // // // // //           onClose={handleCloseEditModal}
// // // // // //         />
// // // // // //       )}
// // // // // //     </Box>
// // // // // //   )
// // // // // // }

// // // // // // export default OrderSpeedGeneric


// // // // // "use client"

// // // // // import React, { useMemo, useState, useEffect } from "react"
// // // // // import { useSelector } from "react-redux"
// // // // // import type { RootState } from "../../../store/store"
// // // // // import {
// // // // //   Box,
// // // // //   Button,
// // // // //   Chip,
// // // // //   CircularProgress,
// // // // //   Paper,
// // // // //   Typography,
// // // // //   Alert,
// // // // //   Grid,
// // // // //   List,
// // // // //   ListItem,
// // // // //   ListItemText,
// // // // //   Avatar,
// // // // //   IconButton,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   Divider,
// // // // //   Badge,
// // // // //   Tooltip,
// // // // //   AppBar,
// // // // //   Toolbar,
// // // // //   useMediaQuery,
// // // // //   useTheme,
// // // // //   Stack,
// // // // //   useScrollTrigger,
// // // // //   Fab,
// // // // //   Zoom,
// // // // //   TextField,
// // // // //   InputAdornment,
// // // // //   Pagination,
// // // // //   Tabs,
// // // // //   Tab,
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableContainer,
// // // // //   TableHead,
// // // // //   TableRow,
// // // // //   MenuItem,
// // // // //   Select,
// // // // //   FormControl,
// // // // //   Collapse,
// // // // // } from "@mui/material"
// // // // // import {
// // // // //   Edit as EditIcon,
// // // // //   Refresh as RefreshIcon,
// // // // //   ExpandMore as ExpandMoreIcon,
// // // // //   ExpandLess as ExpandLessIcon,
// // // // //   CheckCircle as CheckCircleIcon,
// // // // //   PauseCircle as PauseCircleIcon,
// // // // //   Cancel as CancelIcon,
// // // // //   DeliveryDining as DeliveryIcon,
// // // // //   PlayArrow,
// // // // //   Pause,
// // // // //   ViewList as ViewListIcon,
// // // // //   ViewColumn as ViewColumnIcon,
// // // // //   Logout as LogoutIcon,
// // // // //   AccessTime,
// // // // //   Person,
// // // // //   KeyboardArrowUp,
// // // // //   Search as SearchIcon,
// // // // //   Clear as ClearIcon,
// // // // // } from "@mui/icons-material"
// // // // // import { useOrdersManagementSocketApi } from "../../../hooks/useOrdersManagementSocketApi"
// // // // // import EditOrderModal from "../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal"
// // // // // import Image from "next/image"
// // // // // import { clearLocalhostStorage } from "@/services/localstorage.services"
// // // // // import { recordAttendance } from "@/services/attendance.services"
// // // // // import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog"

// // // // // // Status configuration
// // // // // const statusConfig = {
// // // // //   pending: {
// // // // //     color: "default",
// // // // //     icon: <PauseCircleIcon color="disabled" />,
// // // // //     label: "Pendientes",
// // // // //     actions: [{ action: "start", label: "Iniciar", color: "primary", icon: <PlayArrow /> }],
// // // // //   },
// // // // //   processing: {
// // // // //     color: "primary",
// // // // //     icon: <PlayArrow color="primary" />,
// // // // //     label: "En Proceso",
// // // // //     actions: [
// // // // //       { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
// // // // //       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
// // // // //     ],
// // // // //   },
// // // // //   paused: {
// // // // //     color: "warning",
// // // // //     icon: <Pause color="warning" />,
// // // // //     label: "Pausadas",
// // // // //     actions: [
// // // // //       { action: "resume", label: "Reanudar", color: "primary", icon: <PlayArrow /> },
// // // // //       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
// // // // //     ],
// // // // //   },
// // // // //   finished: {
// // // // //     color: "success",
// // // // //     icon: <CheckCircleIcon color="success" />,
// // // // //     label: "Terminadas",
// // // // //     actions: [{ action: "deliver", label: "Entregar", color: "success", icon: <DeliveryIcon /> }],
// // // // //   },
// // // // //   cancelled: {
// // // // //     color: "error",
// // // // //     icon: <CancelIcon color="error" />,
// // // // //     label: "Canceladas",
// // // // //     actions: [{ action: "reopen", label: "Reabrir", color: "primary", icon: <PlayArrow /> }],
// // // // //   },
// // // // //   delivered: {
// // // // //     color: "success",
// // // // //     icon: <DeliveryIcon color="success" />,
// // // // //     label: "Entregadas",
// // // // //     actions: [],
// // // // //   },
// // // // // }

// // // // // const statusOptions = Object.keys(statusConfig)
// // // // // const pageSizeOptions = [5, 10, 20, 50]

// // // // // const OrderSpeedGeneric = () => {
// // // // //   const theme = useTheme()
// // // // //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
// // // // //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
// // // // //   const [displayTitle, setDisplayTitle] = useState(false)
// // // // //   const [viewMode, setViewMode] = useState<"card" | "list">(isMobile ? "card" : "card")
// // // // //   const [openPendingDialog, setOpenPendingDialog] = useState(false)
// // // // //   const [selectedOrder, setSelectedOrder] = useState<any>(null)
// // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
// // // // //   const [searchQuery, setSearchQuery] = useState("")
// // // // //   const [activeStatus, setActiveStatus] = useState("all")
// // // // //   const [currentPages, setCurrentPages] = useState<Record<string, number>>(
// // // // //     statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 }),
// // // // //   )

// // // // //   const [isTapped, setIsTapped] = useState(false)
// // // // //   const [expandedRows, setExpandedRows] = useState<string[]>([])

// // // // //   const [pageSize, setPageSize] = useState(isMobile ? 5 : 10)

// // // // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
// // // // //   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } }

// // // // //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email")

// // // // //   const {
// // // // //     allOrders,
// // // // //     ordersByStatus,
// // // // //     isConnected,
// // // // //     isLoading,
// // // // //     isUpdating,
// // // // //     error,
// // // // //     successMessage,
// // // // //     lastRefresh,
// // // // //     fetchHistoricalOrders,
// // // // //     handleOrderAction,
// // // // //     updateOrder,
// // // // //     clearMessages,
// // // // //   } = useOrdersManagementSocketApi({
// // // // //     companyName: data?.companyName || "LlakaScript",
// // // // //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// // // // //     orderLimit: 50,
// // // // //   })

// // // // //   // Calculate totals
// // // // //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)
// // // // //   const pendingCount = ordersByStatus.pending?.length || 0
// // // // //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
// // // // //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

// // // // //   // Filter and search orders
// // // // //   const filteredOrders = useMemo(() => {
// // // // //     let filtered = [...allOrders]

// // // // //     if (activeStatus !== "all") {
// // // // //       filtered = filtered.filter((order) => order.status === activeStatus)
// // // // //     }

// // // // //     if (searchQuery) {
// // // // //       const query = searchQuery.toLowerCase()
// // // // //       filtered = filtered.filter((order) => {
// // // // //         return (
// // // // //           order.fullname?.toLowerCase().includes(query) ||
// // // // //           order.id?.toString().includes(query) ||
// // // // //           order._id?.toString().includes(query) ||
// // // // //           order.orderType?.toLowerCase().includes(query) ||
// // // // //           order.cart.some(
// // // // //             (item: any) =>
// // // // //               item.name.toLowerCase().includes(query) ||
// // // // //               item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query)),
// // // // //           )
// // // // //         )
// // // // //       })
// // // // //     }

// // // // //     return filtered.sort((a, b) => {
// // // // //       const dateA = new Date(a.createdAt || a.timestamp || 0)
// // // // //       const dateB = new Date(b.createdAt || b.timestamp || 0)
// // // // //       return dateB.getTime() - dateA.getTime()
// // // // //     })
// // // // //   }, [allOrders, activeStatus, searchQuery])

// // // // //   // Paginate orders
// // // // //   const paginatedOrders = useMemo(() => {
// // // // //     const startIndex = (currentPages[activeStatus] - 1) * pageSize
// // // // //     return filteredOrders.slice(startIndex, startIndex + pageSize)
// // // // //   }, [filteredOrders, currentPages, activeStatus, pageSize])

// // // // //   // Calculate page count for current status
// // // // //   const pageCount = Math.ceil(filteredOrders.length / pageSize)

// // // // //   // Handle page change
// // // // //   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
// // // // //     setCurrentPages((prev) => ({
// // // // //       ...prev,
// // // // //       [activeStatus]: value,
// // // // //     }))
// // // // //     window.scrollTo({ top: 0, behavior: "smooth" })
// // // // //   }

// // // // //   // Handle page size change
// // // // //   const handlePageSizeChange = (event: any) => {
// // // // //     const newSize = event.target.value
// // // // //     setPageSize(newSize)
// // // // //     // Recalculate current page to avoid empty pages
// // // // //     const newPage = Math.floor(((currentPages[activeStatus] - 1) * pageSize) / newSize) + 1
// // // // //     setCurrentPages((prev) => ({
// // // // //       ...prev,
// // // // //       [activeStatus]: newPage,
// // // // //     }))
// // // // //   }

// // // // //   // Toggle functions
// // // // //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
// // // // //   const toggleViewMode = () => setViewMode(viewMode === "card" ? "list" : "card")

// // // // //   // Action handlers
// // // // //   const handleLogout = async () => {
// // // // //     clearLocalhostStorage()
// // // // //     await recordAttendance("getOut", user?.user?.email, data?.companyName)
// // // // //     window.location.reload()
// // // // //   }

// // // // //   const handleOpenEditModal = (order: any) => {
// // // // //     setSelectedOrder(order)
// // // // //     setIsEditModalOpen(true)
// // // // //   }

// // // // //   const handleCloseEditModal = () => {
// // // // //     setIsEditModalOpen(false)
// // // // //     setSelectedOrder(null)
// // // // //   }

// // // // //   const saveUpdateData = async (updatedOrder: any) => {
// // // // //     try {
// // // // //       await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder)
// // // // //       handleCloseEditModal()
// // // // //     } catch (error) {
// // // // //       console.error("Failed to update order:", error)
// // // // //     }
// // // // //   }

// // // // //   const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
// // // // //     setActiveStatus(newValue)
// // // // //     setCurrentPages((prev) => ({
// // // // //       ...prev,
// // // // //       [newValue]: 1,
// // // // //     }))
// // // // //   }

// // // // //   const clearSearch = () => {
// // // // //     setSearchQuery("")
// // // // //   }

// // // // //   // Effects
// // // // //   useEffect(() => {
// // // // //     const interval = setInterval(() => {
// // // // //       setDisplayTitle((prev) => !prev)
// // // // //     }, 5000)
// // // // //     return () => clearInterval(interval)
// // // // //   }, [])

// // // // //   useEffect(() => {
// // // // //     setViewMode(isMobile ? "card" : "card")
// // // // //     setPageSize(isMobile ? 5 : 10)
// // // // //   }, [isMobile])

// // // // //   // Scroll to top button logic
// // // // //   const trigger = useScrollTrigger({
// // // // //     threshold: 100,
// // // // //   })

// // // // //   const scrollToTop = () => {
// // // // //     window.scrollTo({
// // // // //       top: 0,
// // // // //       behavior: "smooth",
// // // // //     })
// // // // //   }

// // // // //   // Order Card Component
// // // // //   const OrderCard = React.memo(({ order }: { order: any }) => {
// // // // //     console.log("**************************", order)
// // // // //     const status = order.status
// // // // //     const config = statusConfig[status as keyof typeof statusConfig]
// // // // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
// // // // //     const total = order.cart.reduce((sum: any, item: any) => {
// // // // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
// // // // //       return sum + item.price * item.quantity + extrasTotal
// // // // //     }, 0)

// // // // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // //       hour: "2-digit",
// // // // //       minute: "2-digit",
// // // // //     })

// // // // //     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette]

// // // // //     return (
// // // // //       <Card
// // // // //         sx={{
// // // // //           borderLeft: "4px solid",
// // // // //           borderColor: paletteColor?.main || "grey",
// // // // //           mb: 2,
// // // // //           position: "relative",
// // // // //           transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
// // // // //           "&:hover": {
// // // // //             transform: isMobile ? "none" : "translateY(-2px)",
// // // // //             boxShadow: isMobile ? "none" : theme.shadows[4],
// // // // //           },
// // // // //         }}
// // // // //       >
// // // // //         <CardContent>
// // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
// // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // //               #{order.id || order._id.slice(-4)}
// // // // //             </Typography>
// // // // //             <Chip size="small" label={order.orderType} color={config.color as any} icon={config.icon} />
// // // // //           </Box>

// // // // //           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
// // // // //             <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // //             <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // //               {order.fullname}
// // // // //             </Typography>
// // // // //             <Box sx={{ flexGrow: 1 }} />
// // // // //             <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // //             <Typography variant="body2">{formattedTime}</Typography>
// // // // //           </Box>

// // // // //           <Divider sx={{ my: 1 }} />

// // // // //           <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
// // // // //             Items ({totalItems})
// // // // //           </Typography>

// // // // //           <List dense disablePadding>
// // // // //             {order.cart.slice(0, isMobile ? 2 : undefined).map((item: any) => (
// // // // //               <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.25 }}>
// // // // //                 <ListItemText
// // // // //                   primary={
// // // // //                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // //                       <Typography variant="body2">
// // // // //                         <strong>{item.quantity}x</strong> {item.name}
// // // // //                       </Typography>
// // // // //                       <Typography variant="body2" sx={{ ml: 1 }}>
// // // // //                         ${item.price.toFixed(2)}
// // // // //                       </Typography>
// // // // //                     </Box>
// // // // //                   }
// // // // //                   secondary={
// // // // //                     item.extras?.length > 0 && (
// // // // //                       <List dense disablePadding sx={{ ml: 2 }}>
// // // // //                         {item.extras.slice(0, isMobile ? 1 : undefined).map((extra: any, idx: number) => (
// // // // //                           <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0 }}>
// // // // //                             <ListItemText
// // // // //                               primary={
// // // // //                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // //                                   <Typography variant="caption">+ {extra.name}</Typography>
// // // // //                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // // //                                 </Box>
// // // // //                               }
// // // // //                             />
// // // // //                           </ListItem>
// // // // //                         ))}

// // // // //                         <ListItemText
// // // // //                           primary={
// // // // //                             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // //                               <Typography variant="caption">
// // // // //                                 {" "}
// // // // //                                 <strong>Comentario </strong> {item?.comments}
// // // // //                               </Typography>
// // // // //                             </Box>
// // // // //                           }
// // // // //                         />
// // // // //                       </List>
// // // // //                     )
// // // // //                   }
// // // // //                 />
// // // // //               </ListItem>
// // // // //             ))}
// // // // //             {isMobile && order.cart.length > 2 && (
// // // // //               <Typography variant="caption" color="text.secondary">
// // // // //                 +{order.cart.length - 2} más...
// // // // //               </Typography>
// // // // //             )}
// // // // //           </List>

// // // // //           <Divider sx={{ my: 1 }} />
// // // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // // //             <Typography variant="caption">
// // // // //               {" "}
// // // // //               <strong>Comentario General </strong> {order?.comments}
// // // // //             </Typography>
// // // // //           </Box>
// // // // //           <Divider sx={{ my: 1 }} />

// // // // //           <Box
// // // // //             sx={{
// // // // //               display: "flex",
// // // // //               justifyContent: "space-between",
// // // // //               alignItems: "center",
// // // // //               flexDirection: isMobile ? "column" : "row",
// // // // //               gap: isMobile ? 1 : 0,
// // // // //             }}
// // // // //           >
// // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // //               Total: ${total.toFixed(2)}
// // // // //             </Typography>

// // // // //             <Stack direction={isMobile ? "column" : "row"} spacing={1} width={isMobile ? "100%" : "auto"}>
// // // // //               {config.actions.map((action: any, idx: number) => (
// // // // //                 <Button
// // // // //                   key={`${action.action}-${idx}`}
// // // // //                   size="small"
// // // // //                   variant="contained"
// // // // //                   color={action.color as any}
// // // // //                   startIcon={action.icon}
// // // // //                   onClick={(e) => {
// // // // //                     e.stopPropagation()
// // // // //                     handleOrderAction(action.action, order)
// // // // //                   }}
// // // // //                   disabled={isUpdating}
// // // // //                   fullWidth={isMobile}
// // // // //                 >
// // // // //                   {action.label}
// // // // //                 </Button>
// // // // //               ))}

// // // // //               <Button
// // // // //                 size="small"
// // // // //                 variant="outlined"
// // // // //                 color="primary"
// // // // //                 startIcon={<EditIcon />}
// // // // //                 onClick={(e) => {
// // // // //                   e.stopPropagation()
// // // // //                   handleOpenEditModal(order)
// // // // //                 }}
// // // // //                 disabled={isUpdating}
// // // // //                 fullWidth={isMobile}
// // // // //               >
// // // // //                 Editar
// // // // //               </Button>
// // // // //             </Stack>
// // // // //           </Box>
// // // // //         </CardContent>
// // // // //       </Card>
// // // // //     )
// // // // //   })

// // // // //   const handleToggleExpand = (orderId: string) => {
// // // // //     setExpandedRows((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
// // // // //   }

// // // // //   const OrderRow = React.memo(
// // // // //     ({
// // // // //       order,
// // // // //       expandedRows,
// // // // //       onToggleExpand,
// // // // //     }: {
// // // // //       order: any
// // // // //       expandedRows: string[]
// // // // //       onToggleExpand: (id: string) => void
// // // // //     }) => {
// // // // //       const status = order.status
// // // // //       const config = statusConfig[status as keyof typeof statusConfig]
// // // // //       const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
// // // // //       const total = order.cart.reduce((sum: any, item: any) => {
// // // // //         const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
// // // // //         return sum + item.price * item.quantity + extrasTotal
// // // // //       }, 0)

// // // // //       const commentsOrderGeneral = order?.comments
// // // // //       const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // // //         hour: "2-digit",
// // // // //         minute: "2-digit",
// // // // //       })

// // // // //       // Use the order ID to maintain expanded state
// // // // //       const orderId = order._id || order.id
// // // // //       const isExpanded = expandedRows.includes(orderId)

// // // // //       // When toggling, update the parent's state
// // // // //       const toggleExpand = (e: React.MouseEvent) => {
// // // // //         e.stopPropagation()
// // // // //         onToggleExpand(orderId)
// // // // //       }

// // // // //       return (
// // // // //         <>
// // // // //           <TableRow
// // // // //             sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
// // // // //             onClick={toggleExpand}
// // // // //           >
// // // // //             <TableCell>
// // // // //               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // //                 <IconButton size="small" onClick={toggleExpand}>
// // // // //                   {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
// // // // //                 </IconButton>
// // // // //                 <Typography variant="body2" fontWeight="bold">
// // // // //                   #{order.id || order._id.slice(-4)}
// // // // //                 </Typography>
// // // // //               </Box>
// // // // //             </TableCell>
// // // // //             <TableCell>
// // // // //               <Box sx={{ display: "flex", alignItems: "center" }}>
// // // // //                 <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // // //                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // //                   {order.fullname}
// // // // //                 </Typography>
// // // // //               </Box>
// // // // //             </TableCell>
// // // // //             <TableCell>
// // // // //               <Chip size="small" label={order.orderType} color={config.color as any} icon={config.icon} />
// // // // //             </TableCell>
// // // // //             <TableCell>
// // // // //               <Typography variant="body2">{totalItems} items</Typography>
// // // // //             </TableCell>
// // // // //             <TableCell>
// // // // //               <Typography variant="body2" fontWeight="bold">
// // // // //                 ${total.toFixed(2)}
// // // // //               </Typography>
// // // // //             </TableCell>
// // // // //             <TableCell>
// // // // //               <Typography variant="body2">{formattedTime}</Typography>
// // // // //             </TableCell>
// // // // //             <TableCell>
// // // // //               <Tooltip title={commentsOrderGeneral || "Sin comentarios"} arrow>
// // // // //                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // // //                   {commentsOrderGeneral || "-"}
// // // // //                 </Typography>
// // // // //               </Tooltip>
// // // // //             </TableCell>
// // // // //             <TableCell>
// // // // //               <Stack direction="row" spacing={1}>
// // // // //                 {config.actions.map((action: any, idx: number) => (
// // // // //                   <Tooltip key={`${action.action}-${idx}`} title={action.label}>
// // // // //                     <IconButton
// // // // //                       size="small"
// // // // //                       color={action.color as any}
// // // // //                       onClick={(e) => {
// // // // //                         e.stopPropagation()
// // // // //                         handleOrderAction(action.action, order)
// // // // //                       }}
// // // // //                       disabled={isUpdating}
// // // // //                     >
// // // // //                       {action.icon}
// // // // //                     </IconButton>
// // // // //                   </Tooltip>
// // // // //                 ))}
// // // // //                 <Tooltip title="Editar">
// // // // //                   <IconButton
// // // // //                     size="small"
// // // // //                     color="primary"
// // // // //                     onClick={(e) => {
// // // // //                       e.stopPropagation()
// // // // //                       handleOpenEditModal(order)
// // // // //                     }}
// // // // //                     disabled={isUpdating}
// // // // //                   >
// // // // //                     <EditIcon fontSize="small" />
// // // // //                   </IconButton>
// // // // //                 </Tooltip>
// // // // //               </Stack>
// // // // //             </TableCell>
// // // // //           </TableRow>

// // // // //           {/* Expanded details row */}
// // // // //           <TableRow>
// // // // //             <TableCell style={{ padding: 0 }} colSpan={8}>
// // // // //               <Collapse in={isExpanded} timeout="auto" unmountOnExit>
// // // // //                 <Box
// // // // //                   sx={{
// // // // //                     p: 3,
// // // // //                     backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
// // // // //                     borderBottom: `1px solid ${theme.palette.divider}`,
// // // // //                   }}
// // // // //                 >
// // // // //                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
// // // // //                     Detalles de la Orden
// // // // //                   </Typography>

// // // // //                   <Grid container spacing={2}>
// // // // //                     <Grid item xs={12} md={6}>
// // // // //                       <Typography variant="subtitle2" gutterBottom>
// // // // //                         Productos:
// // // // //                       </Typography>
// // // // //                       <List dense disablePadding>
// // // // //                         {order.cart.map((item: any, index: number) => (
// // // // //                           <React.Fragment key={`${item.id}-${index}`}>
// // // // //                             <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // //                               <ListItemText
// // // // //                                 primary={
// // // // //                                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // //                                     <Typography variant="body2">
// // // // //                                       <strong>{item.quantity}x</strong> {item.name}
// // // // //                                     </Typography>
// // // // //                                     <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>

// // // // //                                     <Typography variant="body2">
// // // // //                                       <strong>Comentario General: </strong> {commentsOrderGeneral}
// // // // //                                     </Typography>
// // // // //                                   </Box>
// // // // //                                 }
// // // // //                                 secondary={
// // // // //                                   <div>
// // // // //                                     {item.extras?.length > 0 && (
// // // // //                                       <List dense disablePadding sx={{ ml: 2, mt: 0.5 }}>
// // // // //                                         {item?.extras?.map((extra: any, idx: number) => (
// // // // //                                           <ListItem key={`${item.id}-extra-${idx}`} disablePadding sx={{ py: 0 }}>
// // // // //                                             <ListItemText
// // // // //                                               primary={
// // // // //                                                 <Box
// // // // //                                                   sx={{
// // // // //                                                     display: "flex",
// // // // //                                                     justifyContent: "space-between",
// // // // //                                                     alignItems: "center",
// // // // //                                                   }}
// // // // //                                                 >
// // // // //                                                   <Typography variant="caption">+ {extra.name}</Typography>
// // // // //                                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // // //                                                 </Box>
// // // // //                                               }
// // // // //                                             />
// // // // //                                           </ListItem>
// // // // //                                         ))}
// // // // //                                       </List>
// // // // //                                     )}
// // // // //                                     <Box sx={{ display: "flex", justifyContent: "space-between" }}></Box>
// // // // //                                     <Typography variant="caption">Comentarios: {item?.comments}</Typography>
// // // // //                                   </div>
// // // // //                                 }
// // // // //                               />
// // // // //                             </ListItem>
// // // // //                             <Divider sx={{ my: 0.5 }} />
// // // // //                           </React.Fragment>
// // // // //                         ))}
// // // // //                       </List>
// // // // //                     </Grid>

// // // // //                     <Grid item xs={12} md={6}>
// // // // //                       <Typography variant="subtitle2" gutterBottom>
// // // // //                         Información Adicional:
// // // // //                       </Typography>
// // // // //                       <List dense disablePadding>
// // // // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // //                           <ListItemText
// // // // //                             primary={
// // // // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // //                                 <Typography variant="body2">
// // // // //                                   <strong>Estado:</strong>
// // // // //                                 </Typography>
// // // // //                                 <Chip
// // // // //                                   size="small"
// // // // //                                   label={config.label}
// // // // //                                   color={config.color as any}
// // // // //                                   icon={config.icon}
// // // // //                                 />
// // // // //                               </Box>
// // // // //                             }
// // // // //                           />
// // // // //                         </ListItem>
// // // // //                         <Divider sx={{ my: 0.5 }} />

// // // // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // //                           <ListItemText
// // // // //                             primary={
// // // // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // //                                 <Typography variant="body2">
// // // // //                                   <strong>Total:</strong>
// // // // //                                 </Typography>
// // // // //                                 <Typography variant="body2" fontWeight="bold">
// // // // //                                   ${total.toFixed(2)}
// // // // //                                 </Typography>
// // // // //                               </Box>
// // // // //                             }
// // // // //                           />
// // // // //                         </ListItem>
// // // // //                         <Divider sx={{ my: 0.5 }} />

// // // // //                         {commentsOrderGeneral && (
// // // // //                           <>
// // // // //                             <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // //                               <ListItemText
// // // // //                                 primary={
// // // // //                                   <Box>
// // // // //                                     <Typography variant="body2">
// // // // //                                       <strong>Comentarios:</strong>
// // // // //                                     </Typography>
// // // // //                                     <Typography variant="body2" sx={{ mt: 0.5 }}>
// // // // //                                       {commentsOrderGeneral}
// // // // //                                     </Typography>
// // // // //                                   </Box>
// // // // //                                 }
// // // // //                               />
// // // // //                             </ListItem>
// // // // //                             <Divider sx={{ my: 0.5 }} />
// // // // //                           </>
// // // // //                         )}

// // // // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // // // //                           <ListItemText
// // // // //                             primary={
// // // // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // //                                 <Typography variant="body2">
// // // // //                                   <strong>Hora:</strong>
// // // // //                                 </Typography>
// // // // //                                 <Typography variant="body2">{formattedTime}</Typography>
// // // // //                               </Box>
// // // // //                             }
// // // // //                           />
// // // // //                         </ListItem>
// // // // //                       </List>
// // // // //                     </Grid>
// // // // //                   </Grid>
// // // // //                 </Box>
// // // // //               </Collapse>
// // // // //             </TableCell>
// // // // //           </TableRow>
// // // // //         </>
// // // // //       )
// // // // //     },
// // // // //   )

// // // // //   // Custom Pagination Controls
// // // // //   const PaginationControls = () => (
// // // // //     <Box
// // // // //       sx={{
// // // // //         display: "flex",
// // // // //         justifyContent: "space-between",
// // // // //         alignItems: "center",
// // // // //         mt: 3,
// // // // //         pb: 2,
// // // // //         flexDirection: isMobile ? "column" : "row",
// // // // //         gap: isMobile ? 2 : 0,
// // // // //       }}
// // // // //     >
// // // // //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // //         <Typography variant="body2" color="text.secondary">
// // // // //           Órdenes por página:
// // // // //         </Typography>
// // // // //         <FormControl size="small" variant="outlined">
// // // // //           <Select value={pageSize} onChange={handlePageSizeChange} sx={{ height: "36px" }}>
// // // // //             {pageSizeOptions.map((size) => (
// // // // //               <MenuItem key={size} value={size}>
// // // // //                 {size}
// // // // //               </MenuItem>
// // // // //             ))}
// // // // //           </Select>
// // // // //         </FormControl>
// // // // //       </Box>

// // // // //       <Pagination
// // // // //         count={pageCount}
// // // // //         page={currentPages[activeStatus]}
// // // // //         onChange={handlePageChange}
// // // // //         color="primary"
// // // // //         size={isMobile ? "small" : "medium"}
// // // // //         showFirstButton
// // // // //         showLastButton
// // // // //         siblingCount={isMobile ? 0 : 1}
// // // // //         boundaryCount={isMobile ? 1 : 2}
// // // // //       />

// // // // //       <Typography variant="body2" color="text.secondary">
// // // // //         Mostrando {(currentPages[activeStatus] - 1) * pageSize + 1}-
// // // // //         {Math.min(currentPages[activeStatus] * pageSize, filteredOrders.length)} de {filteredOrders.length} órdenes
// // // // //       </Typography>
// // // // //     </Box>
// // // // //   )

// // // // //   // Main render
// // // // //   return (
// // // // //     <Box
// // // // //       sx={{
// // // // //         height: "100vh",
// // // // //         overflow: "hidden",
// // // // //         bgcolor: theme.palette.background.default,
// // // // //         display: "flex",
// // // // //         flexDirection: "column",
// // // // //       }}
// // // // //     >
// // // // //       {/* Custom AppBar */}
// // // // //       <AppBar
// // // // //         position="sticky"
// // // // //         elevation={0}
// // // // //         sx={{
// // // // //           bgcolor: "background.paper",
// // // // //           color: "text.primary",
// // // // //           borderBottom: 1,
// // // // //           borderColor: "divider",
// // // // //         }}
// // // // //       >
// // // // //         <Toolbar
// // // // //           variant="dense"
// // // // //           sx={{
// // // // //             minHeight: isMobile ? 48 : 56,
// // // // //             flexDirection: isMobile ? "column" : "row",
// // // // //             py: isMobile ? 1 : 0,
// // // // //           }}
// // // // //         >
// // // // //           {/* Logo and Title */}
// // // // //           <Box
// // // // //             sx={{
// // // // //               display: "flex",
// // // // //               alignItems: "center",
// // // // //               gap: 1,
// // // // //               flexGrow: 1,
// // // // //               height: "40px",
// // // // //               position: "relative",
// // // // //               overflow: "hidden",
// // // // //             }}
// // // // //           >
// // // // //             <Avatar
// // // // //               sx={{
// // // // //                 width: 28,
// // // // //                 height: 28,
// // // // //                 flexShrink: 0,
// // // // //                 ml: 0.5,
// // // // //               }}
// // // // //             >
// // // // //               <Image
// // // // //                 src={"/images/flama.png"}
// // // // //                 alt={"LlakaScript"}
// // // // //                 width={28}
// // // // //                 height={28}
// // // // //                 priority
// // // // //                 style={{
// // // // //                   objectFit: "contain",
// // // // //                   width: "100%",
// // // // //                   height: "100%",
// // // // //                 }}
// // // // //               />
// // // // //             </Avatar>

// // // // //             <Box
// // // // //               sx={{
// // // // //                 position: "relative",
// // // // //                 width: "auto",
// // // // //                 height: "100%",
// // // // //                 display: "flex",
// // // // //                 alignItems: "center",
// // // // //                 flexGrow: 1,
// // // // //               }}
// // // // //             >
// // // // //               <Typography
// // // // //                 variant={isMobile ? "subtitle1" : "h6"}
// // // // //                 sx={{
// // // // //                   fontWeight: 600,
// // // // //                   lineHeight: 1.1,
// // // // //                   fontSize: isMobile ? "1rem" : undefined,
// // // // //                 }}
// // // // //               >
// // // // //                 {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // // //               </Typography>
// // // // //             </Box>
// // // // //           </Box>

// // // // //           {/* Right side controls */}
// // // // //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// // // // //             {/* View mode toggle */}
// // // // //             <Tooltip title={viewMode === "card" ? "Vista lista" : "Vista tarjetas"}>
// // // // //               <IconButton size="small" onClick={toggleViewMode} color="default">
// // // // //                 {viewMode === "card" ? <ViewListIcon fontSize="small" /> : <ViewColumnIcon fontSize="small" />}
// // // // //               </IconButton>
// // // // //             </Tooltip>

// // // // //             {/* Connection status indicator */}
// // // // //             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
// // // // //               <Box
// // // // //                 sx={{
// // // // //                   width: 10,
// // // // //                   height: 10,
// // // // //                   borderRadius: "50%",
// // // // //                   bgcolor: isConnected ? "success.main" : "error.main",
// // // // //                   mr: 1,
// // // // //                 }}
// // // // //               />
// // // // //             </Tooltip>

// // // // //             {/* Order count badge */}
// // // // //             {isMobile && totalOrders > 0 && (
// // // // //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// // // // //                 <Box sx={{ width: 4, height: 4 }} />
// // // // //               </Badge>
// // // // //             )}

// // // // //             {/* Last refresh time */}
// // // // //             {lastRefresh && !isMobile && (
// // // // //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// // // // //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// // // // //               </Typography>
// // // // //             )}

// // // // //             {/* Refresh button */}
// // // // //             <Tooltip title="Actualizar">
// // // // //               <IconButton
// // // // //                 color="primary"
// // // // //                 size="small"
// // // // //                 onClick={fetchHistoricalOrders}
// // // // //                 disabled={isLoading || isUpdating}
// // // // //               >
// // // // //                 <RefreshIcon fontSize="small" />
// // // // //               </IconButton>
// // // // //             </Tooltip>

// // // // //             {/* Header collapse toggle (mobile only) */}
// // // // //             {isMobile && (
// // // // //               <IconButton size="small" onClick={toggleHeader}>
// // // // //                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
// // // // //               </IconButton>
// // // // //             )}

// // // // //             <Tooltip title="Salir">
// // // // //               <IconButton size="small" onClick={handleLogout} color="default">
// // // // //                 <LogoutIcon fontSize="small" />
// // // // //               </IconButton>
// // // // //             </Tooltip>
// // // // //           </Box>
// // // // //         </Toolbar>
// // // // //       </AppBar>

// // // // //       {/* Main content */}
// // // // //       <Box
// // // // //         component="main"
// // // // //         sx={{
// // // // //           p: { xs: 0.5, sm: 2 },
// // // // //           flex: 1,
// // // // //           overflow: "auto",
// // // // //           display: "flex",
// // // // //           flexDirection: "column",
// // // // //         }}
// // // // //       >
// // // // //         <Paper
// // // // //           elevation={isMobile ? 1 : 3}
// // // // //           sx={{
// // // // //             height: "100%",
// // // // //             display: "flex",
// // // // //             flexDirection: "column",
// // // // //             overflow: "hidden",
// // // // //             borderRadius: { xs: 1, sm: 2 },
// // // // //           }}
// // // // //         >
// // // // //           {/* Status header - collapsible on mobile */}
// // // // //           <Collapse in={!headerCollapsed} timeout="auto">
// // // // //             <Box
// // // // //               sx={{
// // // // //                 display: "flex",
// // // // //                 flexDirection: "column",
// // // // //                 borderBottom: "1px solid",
// // // // //                 borderColor: theme.palette.divider,
// // // // //                 overflow: "hidden",
// // // // //               }}
// // // // //             >
// // // // //               {/* Search bar */}
// // // // //               <Box sx={{ p: isMobile ? 1 : 2, pb: 0, width: "100%" }}>
// // // // //                 <TextField
// // // // //                   fullWidth
// // // // //                   size={isMobile ? "small" : "medium"}
// // // // //                   variant="outlined"
// // // // //                   placeholder="Buscar órdenes..."
// // // // //                   value={searchQuery}
// // // // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // // // //                   InputProps={{
// // // // //                     startAdornment: (
// // // // //                       <InputAdornment position="start">
// // // // //                         <SearchIcon />
// // // // //                       </InputAdornment>
// // // // //                     ),
// // // // //                     endAdornment: searchQuery && (
// // // // //                       <InputAdornment position="end">
// // // // //                         <IconButton onClick={clearSearch} size="small">
// // // // //                           <ClearIcon fontSize="small" />
// // // // //                         </IconButton>
// // // // //                       </InputAdornment>
// // // // //                     ),
// // // // //                   }}
// // // // //                 />
// // // // //               </Box>

// // // // //               {/* Status tabs */}
// // // // //               <Box sx={{ px: isMobile ? 1 : 2, pt: 1, width: "100%", overflow: "auto" }}>
// // // // //                 <Tabs
// // // // //                   value={activeStatus}
// // // // //                   onChange={handleStatusChange}
// // // // //                   variant="scrollable"
// // // // //                   scrollButtons="auto"
// // // // //                   allowScrollButtonsMobile
// // // // //                   sx={{
// // // // //                     minHeight: isMobile ? 40 : 48,
// // // // //                     "& .MuiTab-root": {
// // // // //                       minHeight: isMobile ? 40 : 48,
// // // // //                       py: 0,
// // // // //                     },
// // // // //                   }}
// // // // //                 >
// // // // //                   <Tab label="Todas" value="all" />
// // // // //                   {statusOptions.map((status) => (
// // // // //                     <Tab
// // // // //                       key={status}
// // // // //                       label={statusConfig[status as keyof typeof statusConfig].label}
// // // // //                       value={status}
// // // // //                       icon={statusConfig[status as keyof typeof statusConfig].icon}
// // // // //                       iconPosition="start"
// // // // //                       sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
// // // // //                     />
// // // // //                   ))}
// // // // //                 </Tabs>
// // // // //               </Box>

// // // // //               {/* Status indicators */}
// // // // //               {(isLoading || isUpdating) && (
// // // // //                 <Box
// // // // //                   sx={{
// // // // //                     display: "flex",
// // // // //                     alignItems: "center",
// // // // //                     gap: 1,
// // // // //                     p: 1,
// // // // //                     mx: 1,
// // // // //                     mb: 1,
// // // // //                     backgroundColor: theme.palette.action.hover,
// // // // //                     borderRadius: 1,
// // // // //                   }}
// // // // //                 >
// // // // //                   <CircularProgress size={16} />
// // // // //                   <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// // // // //                     {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// // // // //                   </Typography>
// // // // //                 </Box>
// // // // //               )}
// // // // //             </Box>
// // // // //           </Collapse>

// // // // //           {/* Error messages */}
// // // // //           <Box
// // // // //             sx={{
// // // // //               px: { xs: 1, sm: 2 },
// // // // //               pt: { xs: 1, sm: 1 },
// // // // //               overflow: "auto",
// // // // //               flexShrink: 0,
// // // // //             }}
// // // // //           >
// // // // //             {error && (
// // // // //               <Alert severity="error" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// // // // //                 {error}
// // // // //               </Alert>
// // // // //             )}

// // // // //             {successMessage && (
// // // // //               <Alert severity="success" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// // // // //                 {successMessage}
// // // // //               </Alert>
// // // // //             )}
// // // // //           </Box>

// // // // //           {/* Main content - takes all available space */}
// // // // //           <Box
// // // // //             sx={{
// // // // //               flex: 1,
// // // // //               overflow: "auto",
// // // // //               display: "flex",
// // // // //               flexDirection: "column",
// // // // //               p: { xs: 0.5, sm: 2 },
// // // // //             }}
// // // // //           >
// // // // //             <PendingOrdersDialog open={openPendingDialog} onClose={() => setOpenPendingDialog(false)} />

// // // // //             {/* Orders list */}
// // // // //             <Box sx={{ flex: 1 }}>
// // // // //               {filteredOrders.length === 0 ? (
// // // // //                 <Box
// // // // //                   sx={{
// // // // //                     display: "flex",
// // // // //                     justifyContent: "center",
// // // // //                     alignItems: "center",
// // // // //                     height: "200px",
// // // // //                     flexDirection: "column",
// // // // //                     gap: 2,
// // // // //                   }}
// // // // //                 >
// // // // //                   <Typography variant="h6" color="text.secondary">
// // // // //                     No se encontraron órdenes
// // // // //                   </Typography>
// // // // //                   <Button
// // // // //                     variant="outlined"
// // // // //                     onClick={() => {
// // // // //                       setSearchQuery("")
// // // // //                       setActiveStatus("all")
// // // // //                     }}
// // // // //                   >
// // // // //                     Limpiar filtros
// // // // //                   </Button>
// // // // //                 </Box>
// // // // //               ) : viewMode === "card" ? (
// // // // //                 <>
// // // // //                   <Grid container spacing={isMobile ? 1 : 3}>
// // // // //                     {paginatedOrders.map((order: any) => (
// // // // //                       <Grid item xs={12} key={order._id || order.id}>
// // // // //                         <OrderCard order={order} />
// // // // //                       </Grid>
// // // // //                     ))}
// // // // //                   </Grid>
// // // // //                   <PaginationControls />
// // // // //                 </>
// // // // //               ) : (
// // // // //                 <>
// // // // //                   <TableContainer
// // // // //                     component={Paper}
// // // // //                     elevation={0}
// // // // //                     sx={{
// // // // //                       position: "relative",
// // // // //                       overflow: "hidden",
// // // // //                       "&:before": {
// // // // //                         content: '""',
// // // // //                         position: "absolute",
// // // // //                         top: 0,
// // // // //                         left: 0,
// // // // //                         right: 0,
// // // // //                         height: "4px",
// // // // //                         background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
// // // // //                         zIndex: 1,
// // // // //                       },
// // // // //                     }}
// // // // //                   >
// // // // //                     <Table size={isMobile ? "small" : "medium"}>
// // // // //                       <TableHead>
// // // // //                         <TableRow>
// // // // //                           <TableCell>ID</TableCell>
// // // // //                           <TableCell>Cliente</TableCell>
// // // // //                           <TableCell>Estado</TableCell>
// // // // //                           <TableCell>Items</TableCell>
// // // // //                           <TableCell>Total</TableCell>
// // // // //                           <TableCell>Hora</TableCell>
// // // // //                           <TableCell>Comentario General</TableCell>
// // // // //                           <TableCell>Acciones</TableCell>
// // // // //                         </TableRow>
// // // // //                       </TableHead>
// // // // //                       <TableBody>
// // // // //                         {paginatedOrders.map((order: any) => (
// // // // //                           <OrderRow
// // // // //                             key={order._id || order.id}
// // // // //                             order={order}
// // // // //                             expandedRows={expandedRows}
// // // // //                             onToggleExpand={handleToggleExpand}
// // // // //                           />
// // // // //                         ))}
// // // // //                       </TableBody>
// // // // //                     </Table>
// // // // //                   </TableContainer>
// // // // //                   <PaginationControls />
// // // // //                 </>
// // // // //               )}
// // // // //             </Box>
// // // // //           </Box>
// // // // //         </Paper>

// // // // //         {/* Scroll to top button */}
// // // // //         <Zoom in={trigger}>
// // // // //           <Box
// // // // //             onClick={scrollToTop}
// // // // //             role="presentation"
// // // // //             sx={{
// // // // //               position: "fixed",
// // // // //               bottom: 16,
// // // // //               right: 16,
// // // // //               zIndex: 1000,
// // // // //             }}
// // // // //           >
// // // // //             <Fab color="primary" size="small" aria-label="scroll back to top">
// // // // //               <KeyboardArrowUp />
// // // // //             </Fab>
// // // // //           </Box>
// // // // //         </Zoom>
// // // // //       </Box>

// // // // //       {/* Edit Order Modal */}
// // // // //       {isEditModalOpen && selectedOrder && (
// // // // //         <EditOrderModal
// // // // //           open={isEditModalOpen}
// // // // //           order={selectedOrder}
// // // // //           onSave={saveUpdateData}
// // // // //           menuData={{
// // // // //             mainMenu: hojas?.Hoja1 || [],
// // // // //             promotions: hojas?.Promotion || [],
// // // // //           }}
// // // // //           onClose={handleCloseEditModal}
// // // // //         />
// // // // //       )}
// // // // //     </Box>
// // // // //   )

// // // // //   useEffect(() => {
// // // // //     const handleResize = () => {
// // // // //       if (window.innerWidth < 600 && viewMode !== "card") {
// // // // //         setViewMode("card")
// // // // //       }
// // // // //     }

// // // // //     window.addEventListener("resize", handleResize)
// // // // //     handleResize() // Initial check

// // // // //     return () => window.removeEventListener("resize", handleResize)
// // // // //   }, [viewMode])
// // // // // }

// // // // // export default OrderSpeedGeneric



// // // // "use client"

// // // // import React, { useMemo, useState, useEffect } from "react"
// // // // import { useSelector } from "react-redux"
// // // // import type { RootState } from "../../../store/store"
// // // // import {
// // // //   Box,
// // // //   Button,
// // // //   Chip,
// // // //   CircularProgress,
// // // //   Paper,
// // // //   Typography,
// // // //   Alert,
// // // //   Grid,
// // // //   List,
// // // //   ListItem,
// // // //   ListItemText,
// // // //   Avatar,
// // // //   IconButton,
// // // //   Card,
// // // //   CardContent,
// // // //   Divider,
// // // //   Badge,
// // // //   Tooltip,
// // // //   AppBar,
// // // //   Toolbar,
// // // //   useMediaQuery,
// // // //   useTheme,
// // // //   Stack,
// // // //   useScrollTrigger,
// // // //   Fab,
// // // //   Zoom,
// // // //   TextField,
// // // //   InputAdornment,
// // // //   Pagination,
// // // //   Tabs,
// // // //   Tab,
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableContainer,
// // // //   TableHead,
// // // //   TableRow,
// // // //   MenuItem,
// // // //   Select,
// // // //   FormControl,
// // // //   Collapse,
// // // // } from "@mui/material"
// // // // import {
// // // //   Edit as EditIcon,
// // // //   Refresh as RefreshIcon,
// // // //   ExpandMore as ExpandMoreIcon,
// // // //   ExpandLess as ExpandLessIcon,
// // // //   CheckCircle as CheckCircleIcon,
// // // //   PauseCircle as PauseCircleIcon,
// // // //   Cancel as CancelIcon,
// // // //   DeliveryDining as DeliveryIcon,
// // // //   PlayArrow,
// // // //   Pause,
// // // //   ViewList as ViewListIcon,
// // // //   ViewColumn as ViewColumnIcon,
// // // //   Logout as LogoutIcon,
// // // //   AccessTime,
// // // //   Person,
// // // //   KeyboardArrowUp,
// // // //   Search as SearchIcon,
// // // //   Clear as ClearIcon,
// // // // } from "@mui/icons-material"
// // // // import { useOrdersManagementSocketApi } from "../../../hooks/useOrdersManagementSocketApi"
// // // // import EditOrderModal from "../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal"
// // // // import Image from "next/image"
// // // // import { clearLocalhostStorage } from "@/services/localstorage.services"
// // // // import { recordAttendance } from "@/services/attendance.services"
// // // // import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog"

// // // // // Status configuration
// // // // const statusConfig = {
// // // //   pending: {
// // // //     color: "default",
// // // //     icon: <PauseCircleIcon color="disabled" />,
// // // //     label: "Pendientes",
// // // //     actions: [{ action: "start", label: "Iniciar", color: "primary", icon: <PlayArrow /> }],
// // // //   },
// // // //   processing: {
// // // //     color: "primary",
// // // //     icon: <PlayArrow color="primary" />,
// // // //     label: "En Proceso",
// // // //     actions: [
// // // //       { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
// // // //       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
// // // //     ],
// // // //   },
// // // //   paused: {
// // // //     color: "warning",
// // // //     icon: <Pause color="warning" />,
// // // //     label: "Pausadas",
// // // //     actions: [
// // // //       { action: "resume", label: "Reanudar", color: "primary", icon: <PlayArrow /> },
// // // //       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
// // // //     ],
// // // //   },
// // // //   finished: {
// // // //     color: "success",
// // // //     icon: <CheckCircleIcon color="success" />,
// // // //     label: "Terminadas",
// // // //     actions: [{ action: "deliver", label: "Entregar", color: "success", icon: <DeliveryIcon /> }],
// // // //   },
// // // //   cancelled: {
// // // //     color: "error",
// // // //     icon: <CancelIcon color="error" />,
// // // //     label: "Canceladas",
// // // //     actions: [{ action: "reopen", label: "Reabrir", color: "primary", icon: <PlayArrow /> }],
// // // //   },
// // // //   delivered: {
// // // //     color: "success",
// // // //     icon: <DeliveryIcon color="success" />,
// // // //     label: "Entregadas",
// // // //     actions: [],
// // // //   },
// // // // }

// // // // const statusOptions = Object.keys(statusConfig)
// // // // const pageSizeOptions = [5, 10, 20, 50]

// // // // const OrderSpeedGeneric = () => {
// // // //   const theme = useTheme()
// // // //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
// // // //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
// // // //   const [displayTitle, setDisplayTitle] = useState(false)
// // // //   const [viewMode, setViewMode] = useState<"card" | "list">(isMobile ? "card" : "card")
// // // //   const [openPendingDialog, setOpenPendingDialog] = useState(false)
// // // //   const [selectedOrder, setSelectedOrder] = useState<any>(null)
// // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
// // // //   const [searchQuery, setSearchQuery] = useState("")
// // // //   const [activeStatus, setActiveStatus] = useState("all")
// // // //   const [currentPages, setCurrentPages] = useState<Record<string, number>>(
// // // //     statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 }),
// // // //   )

// // // //   const [isTapped, setIsTapped] = useState(false)
// // // //   const [expandedRows, setExpandedRows] = useState<string[]>([])

// // // //   const [pageSize, setPageSize] = useState(isMobile ? 5 : 10)

// // // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
// // // //   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } }

// // // //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email")

// // // //   const {
// // // //     allOrders,
// // // //     ordersByStatus,
// // // //     isConnected,
// // // //     isLoading,
// // // //     isUpdating,
// // // //     error,
// // // //     successMessage,
// // // //     lastRefresh,
// // // //     fetchHistoricalOrders,
// // // //     handleOrderAction,
// // // //     updateOrder,
// // // //     clearMessages,
// // // //   } = useOrdersManagementSocketApi({
// // // //     companyName: data?.companyName || "LlakaScript",
// // // //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// // // //     orderLimit: 50,
// // // //   })

// // // //   // Calculate totals
// // // //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)
// // // //   const pendingCount = ordersByStatus.pending?.length || 0
// // // //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
// // // //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

// // // //   // Filter and search orders
// // // //   const filteredOrders = useMemo(() => {
// // // //     let filtered = [...allOrders]

// // // //     if (activeStatus !== "all") {
// // // //       filtered = filtered.filter((order) => order.status === activeStatus)
// // // //     }

// // // //     if (searchQuery) {
// // // //       const query = searchQuery.toLowerCase()
// // // //       filtered = filtered.filter((order) => {
// // // //         return (
// // // //           order.fullname?.toLowerCase().includes(query) ||
// // // //           order.id?.toString().includes(query) ||
// // // //           order._id?.toString().includes(query) ||
// // // //           order.orderType?.toLowerCase().includes(query) ||
// // // //           order.cart.some(
// // // //             (item: any) =>
// // // //               item.name.toLowerCase().includes(query) ||
// // // //               item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query)),
// // // //           )
// // // //         )
// // // //       })
// // // //     }

// // // //     return filtered.sort((a, b) => {
// // // //       const dateA = new Date(a.createdAt || a.timestamp || 0)
// // // //       const dateB = new Date(b.createdAt || b.timestamp || 0)
// // // //       return dateB.getTime() - dateA.getTime()
// // // //     })
// // // //   }, [allOrders, activeStatus, searchQuery])

// // // //   // Paginate orders
// // // //   const paginatedOrders = useMemo(() => {
// // // //     const startIndex = (currentPages[activeStatus] - 1) * pageSize
// // // //     return filteredOrders.slice(startIndex, startIndex + pageSize)
// // // //   }, [filteredOrders, currentPages, activeStatus, pageSize])

// // // //   // Calculate page count for current status
// // // //   const pageCount = Math.ceil(filteredOrders.length / pageSize)

// // // //   // Handle page change
// // // //   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
// // // //     setCurrentPages((prev) => ({
// // // //       ...prev,
// // // //       [activeStatus]: value,
// // // //     }))
// // // //     window.scrollTo({ top: 0, behavior: "smooth" })
// // // //   }

// // // //   // Handle page size change
// // // //   const handlePageSizeChange = (event: any) => {
// // // //     const newSize = event.target.value
// // // //     setPageSize(newSize)
// // // //     // Recalculate current page to avoid empty pages
// // // //     const newPage = Math.floor(((currentPages[activeStatus] - 1) * pageSize) / newSize) + 1
// // // //     setCurrentPages((prev) => ({
// // // //       ...prev,
// // // //       [activeStatus]: newPage,
// // // //     }))
// // // //   }

// // // //   // Toggle functions
// // // //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
// // // //   const toggleViewMode = () => setViewMode(viewMode === "card" ? "list" : "card")

// // // //   // Action handlers
// // // //   const handleLogout = async () => {
// // // //     clearLocalhostStorage()
// // // //     await recordAttendance("getOut", user?.user?.email, data?.companyName)
// // // //     window.location.reload()
// // // //   }

// // // //   const handleOpenEditModal = (order: any) => {
// // // //     setSelectedOrder(order)
// // // //     setIsEditModalOpen(true)
// // // //   }

// // // //   const handleCloseEditModal = () => {
// // // //     setIsEditModalOpen(false)
// // // //     setSelectedOrder(null)
// // // //   }

// // // //   const saveUpdateData = async (updatedOrder: any) => {
// // // //     try {
// // // //       await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder)
// // // //       handleCloseEditModal()
// // // //     } catch (error) {
// // // //       console.error("Failed to update order:", error)
// // // //     }
// // // //   }

// // // //   const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
// // // //     setActiveStatus(newValue)
// // // //     setCurrentPages((prev) => ({
// // // //       ...prev,
// // // //       [newValue]: 1,
// // // //     }))
// // // //   }

// // // //   const clearSearch = () => {
// // // //     setSearchQuery("")
// // // //   }

// // // //   // Effects
// // // //   useEffect(() => {
// // // //     const interval = setInterval(() => {
// // // //       setDisplayTitle((prev) => !prev)
// // // //     }, 5000)
// // // //     return () => clearInterval(interval)
// // // //   }, [])

// // // //   useEffect(() => {
// // // //     setViewMode(isMobile ? "card" : "card")
// // // //     setPageSize(isMobile ? 5 : 10)
// // // //   }, [isMobile])

// // // //   // Scroll to top button logic
// // // //   const trigger = useScrollTrigger({
// // // //     threshold: 100,
// // // //   })

// // // //   const scrollToTop = () => {
// // // //     window.scrollTo({
// // // //       top: 0,
// // // //       behavior: "smooth",
// // // //     })
// // // //   }

// // // //   // Order Card Component
// // // //   const OrderCard = React.memo(({ order }: { order: any }) => {
// // // //     console.log("**************************", order)
// // // //     const status = order.status
// // // //     const config = statusConfig[status as keyof typeof statusConfig]
// // // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
// // // //     const total = order.cart.reduce((sum: any, item: any) => {
// // // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
// // // //       return sum + item.price * item.quantity + extrasTotal
// // // //     }, 0)

// // // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // //       hour: "2-digit",
// // // //       minute: "2-digit",
// // // //     })

// // // //     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette]

// // // //     return (
// // // //       <Card
// // // //         sx={{
// // // //           borderLeft: "4px solid",
// // // //           borderColor: paletteColor?.main || "grey",
// // // //           mb: 2,
// // // //           position: "relative",
// // // //           transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
// // // //           "&:hover": {
// // // //             transform: isMobile ? "none" : "translateY(-2px)",
// // // //             boxShadow: isMobile ? "none" : theme.shadows[4],
// // // //           },
// // // //         }}
// // // //       >
// // // //         <CardContent>
// // // //           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
// // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // //               #{order.id || order._id.slice(-4)}
// // // //             </Typography>
// // // //             <Chip size="small" label={`${order.orderType} / ${order.dataTypeOrder}`} color={config.color as any} icon={config.icon} />


// // // //           </Box>

// // // //           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
// // // //             <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // //             <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // //               {order.fullname}
// // // //             </Typography>
// // // //             <Box sx={{ flexGrow: 1 }} />
// // // //             <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // //             <Typography variant="body2">{formattedTime}</Typography>
// // // //           </Box>

// // // //           <Divider sx={{ my: 1 }} />

// // // //           <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
// // // //             Items ({totalItems})
// // // //           </Typography>

// // // //           <List dense disablePadding>
// // // //             {order.cart.slice(0, isMobile ? 2 : undefined).map((item: any) => (
// // // //               <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.25 }}>
// // // //                 <ListItemText
// // // //                   primary={
// // // //                     <div>

// // // //                       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // //                         <Typography variant="body2">
// // // //                           <strong>{item.quantity}x</strong> {item.name} 

// // // //                           <span>
// // // //                            ( {item.Description})
// // // //                           </span>
// // // //                         </Typography>
// // // //                         <Typography variant="body2" sx={{ ml: 1 }}>
// // // //                           ${item.price.toFixed(2)}
// // // //                         </Typography>
// // // //                       </Box>
// // // //                     </div>
// // // //                   }
// // // //                   secondary={
// // // //                     item.extras?.length > 0 && (
// // // //                       <List dense disablePadding sx={{ ml: 2 }}>
// // // //                         {item.extras.slice(0, isMobile ? 1 : undefined).map((extra: any, idx: number) => (
// // // //                           <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0 }}>
// // // //                             <ListItemText
// // // //                               primary={
// // // //                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // //                                   <Typography variant="caption">+ {extra.name}</Typography>
// // // //                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // //                                 </Box>
// // // //                               }
// // // //                             />
// // // //                           </ListItem>
// // // //                         ))}

// // // //                         <ListItemText
// // // //                           primary={
// // // //                             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // //                               <Typography variant="caption">
// // // //                                 {" "}
// // // //                                 <strong>Comentario </strong> {item?.comments}
// // // //                               </Typography>
// // // //                             </Box>
// // // //                           }
// // // //                         />
// // // //                       </List>
// // // //                     )
// // // //                   }
// // // //                 />
// // // //               </ListItem>
// // // //             ))}
// // // //             {isMobile && order.cart.length > 2 && (
// // // //               <Typography variant="caption" color="text.secondary">
// // // //                 +{order.cart.length - 2} más...
// // // //               </Typography>
// // // //             )}
// // // //           </List>

// // // //           <Divider sx={{ my: 1 }} />
// // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // //             <Typography variant="caption">
// // // //               {" "}
// // // //               <strong>Comentario General </strong> {order?.comments}
// // // //             </Typography>
// // // //           </Box>
// // // //           <Divider sx={{ my: 1 }} />

// // // //           <Box
// // // //             sx={{
// // // //               display: "flex",
// // // //               justifyContent: "space-between",
// // // //               alignItems: "center",
// // // //               flexDirection: isMobile ? "column" : "row",
// // // //               gap: isMobile ? 1 : 0,
// // // //             }}
// // // //           >
// // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // //               Total: ${total.toFixed(2)}
// // // //             </Typography>

// // // //             <Stack direction={isMobile ? "column" : "row"} spacing={1} width={isMobile ? "100%" : "auto"}>
// // // //               {config.actions.map((action: any, idx: number) => (
// // // //                 <Button
// // // //                   key={`${action.action}-${idx}`}
// // // //                   size="small"
// // // //                   variant="contained"
// // // //                   color={action.color as any}
// // // //                   startIcon={action.icon}
// // // //                   onClick={(e) => {
// // // //                     e.stopPropagation()
// // // //                     handleOrderAction(action.action, order)
// // // //                   }}
// // // //                   disabled={isUpdating}
// // // //                   fullWidth={isMobile}
// // // //                 >
// // // //                   {action.label}
// // // //                 </Button>
// // // //               ))}

// // // //               <Button
// // // //                 size="small"
// // // //                 variant="outlined"
// // // //                 color="primary"
// // // //                 startIcon={<EditIcon />}
// // // //                 onClick={(e) => {
// // // //                   e.stopPropagation()
// // // //                   handleOpenEditModal(order)
// // // //                 }}
// // // //                 disabled={isUpdating}
// // // //                 fullWidth={isMobile}
// // // //               >
// // // //                 Editar
// // // //               </Button>
// // // //             </Stack>
// // // //           </Box>
// // // //         </CardContent>
// // // //       </Card>
// // // //     )
// // // //   })

// // // //   const handleToggleExpand = (orderId: string) => {
// // // //     setExpandedRows((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
// // // //   }

// // // //   const OrderRow = React.memo(
// // // //     ({
// // // //       order,
// // // //       expandedRows,
// // // //       onToggleExpand,
// // // //     }: {
// // // //       order: any
// // // //       expandedRows: string[]
// // // //       onToggleExpand: (id: string) => void
// // // //     }) => {
// // // //       const status = order.status
// // // //       const config = statusConfig[status as keyof typeof statusConfig]
// // // //       const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
// // // //       const total = order.cart.reduce((sum: any, item: any) => {
// // // //         const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
// // // //         return sum + item.price * item.quantity + extrasTotal
// // // //       }, 0)

// // // //       const commentsOrderGeneral = order?.comments
// // // //       const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // // //         hour: "2-digit",
// // // //         minute: "2-digit",
// // // //       })

// // // //       // Use the order ID to maintain expanded state
// // // //       const orderId = order._id || order.id
// // // //       const isExpanded = expandedRows.includes(orderId)

// // // //       // When toggling, update the parent's state
// // // //       const toggleExpand = (e: React.MouseEvent) => {
// // // //         e.stopPropagation()
// // // //         onToggleExpand(orderId)
// // // //       }

// // // //       return (
// // // //         <>
// // // //           <TableRow
// // // //             sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
// // // //             onClick={toggleExpand}
// // // //           >
// // // //             <TableCell>
// // // //               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // //                 <IconButton size="small" onClick={toggleExpand}>
// // // //                   {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
// // // //                 </IconButton>
// // // //                 <Typography variant="body2" fontWeight="bold">
// // // //                   #{order.id || order._id.slice(-4)}
// // // //                 </Typography>
// // // //               </Box>
// // // //             </TableCell>
// // // //             <TableCell>
// // // //               <Box sx={{ display: "flex", alignItems: "center" }}>
// // // //                 <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // // //                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // //                   {order.fullname}
// // // //                 </Typography>
// // // //               </Box>
// // // //             </TableCell>
// // // //             <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
// // // //               <Chip size="small" label={order.orderType} color={config.color as any} icon={config.icon} />
// // // //             </TableCell>
// // // //             <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
// // // //               <Typography variant="body2">{totalItems} items</Typography>
// // // //             </TableCell>
// // // //             <TableCell>
// // // //               <Typography variant="body2" fontWeight="bold">
// // // //                 ${total.toFixed(2)}
// // // //               </Typography>
// // // //             </TableCell>
// // // //             <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
// // // //               <Typography variant="body2">{formattedTime}</Typography>
// // // //             </TableCell>
// // // //             <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
// // // //               <Tooltip title={commentsOrderGeneral || "Sin comentarios"} arrow>
// // // //                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // // //                   {commentsOrderGeneral || "-"}
// // // //                 </Typography>
// // // //               </Tooltip>
// // // //             </TableCell>
// // // //             <TableCell>
// // // //               <Stack
// // // //                 direction={isMobile ? "column" : "row"}
// // // //                 spacing={1}
// // // //                 sx={{
// // // //                   minWidth: isMobile ? "auto" : "120px",
// // // //                   "& .MuiIconButton-root": {
// // // //                     mx: isMobile ? "auto" : 0,
// // // //                   },
// // // //                 }}
// // // //               >
// // // //                 {config.actions.map((action: any, idx: number) => (
// // // //                   <Tooltip key={`${action.action}-${idx}`} title={action.label}>
// // // //                     <IconButton
// // // //                       size="small"
// // // //                       color={action.color as any}
// // // //                       onClick={(e) => {
// // // //                         e.stopPropagation()
// // // //                         handleOrderAction(action.action, order)
// // // //                       }}
// // // //                       disabled={isUpdating}
// // // //                     >
// // // //                       {action.icon}
// // // //                     </IconButton>
// // // //                   </Tooltip>
// // // //                 ))}
// // // //                 <Tooltip title="Editar">
// // // //                   <IconButton
// // // //                     size="small"
// // // //                     color="primary"
// // // //                     onClick={(e) => {
// // // //                       e.stopPropagation()
// // // //                       handleOpenEditModal(order)
// // // //                     }}
// // // //                     disabled={isUpdating}
// // // //                   >
// // // //                     <EditIcon fontSize="small" />
// // // //                   </IconButton>
// // // //                 </Tooltip>
// // // //               </Stack>
// // // //             </TableCell>
// // // //           </TableRow>

// // // //           {/* Expanded details row */}
// // // //           <TableRow>
// // // //             <TableCell style={{ padding: 0 }} colSpan={8}>
// // // //               <Collapse in={isExpanded} timeout="auto" unmountOnExit>
// // // //                 <Box
// // // //                   sx={{
// // // //                     p: { xs: 1, sm: 3 },
// // // //                     backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
// // // //                     borderBottom: `1px solid ${theme.palette.divider}`,
// // // //                   }}
// // // //                 >
// // // //                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
// // // //                     Detalles de la Orden
// // // //                   </Typography>

// // // //                   <Grid container spacing={2}>
// // // //                     <Grid item xs={12} md={6}>
// // // //                       <Typography variant="subtitle2" gutterBottom>
// // // //                         Productos:
// // // //                       </Typography>
// // // //                       <List dense disablePadding>
// // // //                         {order.cart.map((item: any, index: number) => (
// // // //                           <React.Fragment key={`${item.id}-${index}`}>
// // // //                             <ListItem disablePadding sx={{ py: 0.5 }}>
// // // //                               <ListItemText
// // // //                                 primary={
// // // //                                   <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
// // // //                                     <Typography variant="body2">
// // // //                                       <strong>{item.quantity}x</strong> {item.name}
// // // //                                     </Typography>
// // // //                                     <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
// // // //                                   </Box>
// // // //                                 }
// // // //                                 secondary={
// // // //                                   <div>
// // // //                                     {item.extras?.length > 0 && (
// // // //                                       <List dense disablePadding sx={{ ml: 2, mt: 0.5 }}>
// // // //                                         {item?.extras?.map((extra: any, idx: number) => (
// // // //                                           <ListItem key={`${item.id}-extra-${idx}`} disablePadding sx={{ py: 0 }}>
// // // //                                             <ListItemText
// // // //                                               primary={
// // // //                                                 <Box
// // // //                                                   sx={{
// // // //                                                     display: "flex",
// // // //                                                     justifyContent: "space-between",
// // // //                                                     alignItems: "center",
// // // //                                                   }}
// // // //                                                 >
// // // //                                                   <Typography variant="caption">+ {extra.name}</Typography>
// // // //                                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // // //                                                 </Box>
// // // //                                               }
// // // //                                             />
// // // //                                           </ListItem>
// // // //                                         ))}
// // // //                                       </List>
// // // //                                     )}
// // // //                                     <Box sx={{ mt: 1 }}>
// // // //                                       <Typography variant="caption">
// // // //                                         <strong>Comentarios:</strong> {item?.comments || "Sin comentarios"}
// // // //                                       </Typography>
// // // //                                     </Box>
// // // //                                   </div>
// // // //                                 }
// // // //                               />
// // // //                             </ListItem>
// // // //                             <Divider sx={{ my: 0.5 }} />
// // // //                           </React.Fragment>
// // // //                         ))}
// // // //                       </List>
// // // //                     </Grid>

// // // //                     <Grid item xs={12} md={6}>
// // // //                       <Typography variant="subtitle2" gutterBottom>
// // // //                         Información Adicional:
// // // //                       </Typography>
// // // //                       <List dense disablePadding>
// // // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // // //                           <ListItemText
// // // //                             primary={
// // // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // //                                 <Typography variant="body2">
// // // //                                   <strong>Estado:</strong>
// // // //                                 </Typography>
// // // //                                 <Chip
// // // //                                   size="small"
// // // //                                   label={config.label}
// // // //                                   color={config.color as any}
// // // //                                   icon={config.icon}
// // // //                                 />
// // // //                               </Box>
// // // //                             }
// // // //                           />
// // // //                         </ListItem>
// // // //                         <Divider sx={{ my: 0.5 }} />

// // // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // // //                           <ListItemText
// // // //                             primary={
// // // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // //                                 <Typography variant="body2">
// // // //                                   <strong>Total:</strong>
// // // //                                 </Typography>
// // // //                                 <Typography variant="body2" fontWeight="bold">
// // // //                                   ${total.toFixed(2)}
// // // //                                 </Typography>
// // // //                               </Box>
// // // //                             }
// // // //                           />
// // // //                         </ListItem>
// // // //                         <Divider sx={{ my: 0.5 }} />

// // // //                         {commentsOrderGeneral && (
// // // //                           <>
// // // //                             <ListItem disablePadding sx={{ py: 0.5 }}>
// // // //                               <ListItemText
// // // //                                 primary={
// // // //                                   <Box>
// // // //                                     <Typography variant="body2">
// // // //                                       <strong>Comentarios:</strong>
// // // //                                     </Typography>
// // // //                                     <Typography variant="body2" sx={{ mt: 0.5 }}>
// // // //                                       {commentsOrderGeneral}
// // // //                                     </Typography>
// // // //                                   </Box>
// // // //                                 }
// // // //                               />
// // // //                             </ListItem>
// // // //                             <Divider sx={{ my: 0.5 }} />
// // // //                           </>
// // // //                         )}

// // // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // // //                           <ListItemText
// // // //                             primary={
// // // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // //                                 <Typography variant="body2">
// // // //                                   <strong>Hora:</strong>
// // // //                                 </Typography>
// // // //                                 <Typography variant="body2">{formattedTime}</Typography>
// // // //                               </Box>
// // // //                             }
// // // //                           />
// // // //                         </ListItem>
// // // //                       </List>
// // // //                     </Grid>
// // // //                   </Grid>
// // // //                 </Box>
// // // //               </Collapse>
// // // //             </TableCell>
// // // //           </TableRow>
// // // //         </>
// // // //       )
// // // //     },
// // // //   )

// // // //   // Custom Pagination Controls
// // // //   const PaginationControls = () => (
// // // //     <Box
// // // //       sx={{
// // // //         display: "flex",
// // // //         justifyContent: "space-between",
// // // //         alignItems: "center",
// // // //         mt: 3,
// // // //         pb: 2,
// // // //         flexDirection: isMobile ? "column" : "row",
// // // //         gap: isMobile ? 2 : 0,
// // // //       }}
// // // //     >
// // // //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // //         <Typography variant="body2" color="text.secondary">
// // // //           Órdenes por página:
// // // //         </Typography>
// // // //         <FormControl size="small" variant="outlined">
// // // //           <Select value={pageSize} onChange={handlePageSizeChange} sx={{ height: "36px" }}>
// // // //             {pageSizeOptions.map((size) => (
// // // //               <MenuItem key={size} value={size}>
// // // //                 {size}
// // // //               </MenuItem>
// // // //             ))}
// // // //           </Select>
// // // //         </FormControl>
// // // //       </Box>

// // // //       <Pagination
// // // //         count={pageCount}
// // // //         page={currentPages[activeStatus]}
// // // //         onChange={handlePageChange}
// // // //         color="primary"
// // // //         size={isMobile ? "small" : "medium"}
// // // //         showFirstButton
// // // //         showLastButton
// // // //         siblingCount={isMobile ? 0 : 1}
// // // //         boundaryCount={isMobile ? 1 : 2}
// // // //       />

// // // //       <Typography variant="body2" color="text.secondary">
// // // //         Mostrando {(currentPages[activeStatus] - 1) * pageSize + 1}-
// // // //         {Math.min(currentPages[activeStatus] * pageSize, filteredOrders.length)} de {filteredOrders.length} órdenes
// // // //       </Typography>
// // // //     </Box>
// // // //   )

// // // //   const [isMobileView, setIsMobileView] = useState(false)

// // // //   useEffect(() => {
// // // //     const handleResize = () => {
// // // //       setIsMobileView(window.innerWidth < 768) // Use md breakpoint (768px)
// // // //       if (window.innerWidth < 768) {
// // // //         setViewMode("card")
// // // //       }
// // // //     }

// // // //     window.addEventListener("resize", handleResize)
// // // //     handleResize() // Initial check

// // // //     return () => window.removeEventListener("resize", handleResize)
// // // //   }, [])

// // // //   // Main render
// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         height: "100vh",
// // // //         overflow: "hidden",
// // // //         bgcolor: theme.palette.background.default,
// // // //         display: "flex",
// // // //         flexDirection: "column",
// // // //       }}
// // // //     >
// // // //       {/* Custom AppBar */}
// // // //       <AppBar
// // // //         position="sticky"
// // // //         elevation={0}
// // // //         sx={{
// // // //           bgcolor: "background.paper",
// // // //           color: "text.primary",
// // // //           borderBottom: 1,
// // // //           borderColor: "divider",
// // // //         }}
// // // //       >
// // // //         <Toolbar
// // // //           variant="dense"
// // // //           sx={{
// // // //             minHeight: isMobile ? 48 : 56,
// // // //             flexDirection: isMobile ? "column" : "row",
// // // //             py: isMobile ? 1 : 0,
// // // //           }}
// // // //         >
// // // //           {/* Logo and Title */}
// // // //           <Box
// // // //             sx={{
// // // //               display: "flex",
// // // //               alignItems: "center",
// // // //               gap: 1,
// // // //               flexGrow: 1,
// // // //               height: "40px",
// // // //               position: "relative",
// // // //               overflow: "hidden",
// // // //             }}
// // // //           >
// // // //             <Avatar
// // // //               sx={{
// // // //                 width: 28,
// // // //                 height: 28,
// // // //                 flexShrink: 0,
// // // //                 ml: 0.5,
// // // //               }}
// // // //             >
// // // //               <Image
// // // //                 src={"/images/flama.png"}
// // // //                 alt={"LlakaScript"}
// // // //                 width={28}
// // // //                 height={28}
// // // //                 priority
// // // //                 style={{
// // // //                   objectFit: "contain",
// // // //                   width: "100%",
// // // //                   height: "100%",
// // // //                 }}
// // // //               />
// // // //             </Avatar>

// // // //             <Box
// // // //               sx={{
// // // //                 position: "relative",
// // // //                 width: "auto",
// // // //                 height: "100%",
// // // //                 display: "flex",
// // // //                 alignItems: "center",
// // // //                 flexGrow: 1,
// // // //               }}
// // // //             >
// // // //               <Typography
// // // //                 variant={isMobile ? "subtitle1" : "h6"}
// // // //                 sx={{
// // // //                   fontWeight: 600,
// // // //                   lineHeight: 1.1,
// // // //                   fontSize: isMobile ? "1rem" : undefined,
// // // //                 }}
// // // //               >
// // // //                 {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // // //               </Typography>
// // // //             </Box>
// // // //           </Box>

// // // //           {/* Right side controls */}
// // // //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// // // //             {/* View mode toggle */}
// // // //             <Tooltip title={viewMode === "card" ? "Vista lista" : "Vista tarjetas"}>
// // // //               <IconButton
// // // //                 size="small"
// // // //                 onClick={toggleViewMode}
// // // //                 color="default"
// // // //                 sx={{
// // // //                   display: { xs: "none", md: "flex" }, // Hide on mobile since we force card view
// // // //                 }}
// // // //               >
// // // //                 {viewMode === "card" ? <ViewListIcon fontSize="small" /> : <ViewColumnIcon fontSize="small" />}
// // // //               </IconButton>
// // // //             </Tooltip>

// // // //             {/* Connection status indicator */}
// // // //             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
// // // //               <Box
// // // //                 sx={{
// // // //                   width: 10,
// // // //                   height: 10,
// // // //                   borderRadius: "50%",
// // // //                   bgcolor: isConnected ? "success.main" : "error.main",
// // // //                   mr: 1,
// // // //                 }}
// // // //               />
// // // //             </Tooltip>

// // // //             {/* Order count badge */}
// // // //             {isMobile && totalOrders > 0 && (
// // // //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// // // //                 <Box sx={{ width: 4, height: 4 }} />
// // // //               </Badge>
// // // //             )}

// // // //             {/* Last refresh time */}
// // // //             {lastRefresh && !isMobile && (
// // // //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// // // //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// // // //               </Typography>
// // // //             )}

// // // //             {/* Refresh button */}
// // // //             <Tooltip title="Actualizar">
// // // //               <IconButton
// // // //                 color="primary"
// // // //                 size="small"
// // // //                 onClick={fetchHistoricalOrders}
// // // //                 disabled={isLoading || isUpdating}
// // // //               >
// // // //                 <RefreshIcon fontSize="small" />
// // // //               </IconButton>
// // // //             </Tooltip>

// // // //             {/* Header collapse toggle (mobile only) */}
// // // //             {isMobile && (
// // // //               <IconButton size="small" onClick={toggleHeader}>
// // // //                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
// // // //               </IconButton>
// // // //             )}

// // // //             <Tooltip title="Salir">
// // // //               <IconButton size="small" onClick={handleLogout} color="default">
// // // //                 <LogoutIcon fontSize="small" />
// // // //               </IconButton>
// // // //             </Tooltip>
// // // //           </Box>
// // // //         </Toolbar>
// // // //       </AppBar>

// // // //       {/* Main content */}
// // // //       <Box
// // // //         component="main"
// // // //         sx={{
// // // //           p: { xs: 0.5, sm: 2 },
// // // //           flex: 1,
// // // //           overflow: "auto",
// // // //           display: "flex",
// // // //           flexDirection: "column",
// // // //         }}
// // // //       >
// // // //         <Paper
// // // //           elevation={isMobile ? 1 : 3}
// // // //           sx={{
// // // //             height: "100%",
// // // //             display: "flex",
// // // //             flexDirection: "column",
// // // //             overflow: "hidden",
// // // //             borderRadius: { xs: 1, sm: 2 },
// // // //           }}
// // // //         >
// // // //           {/* Status header - collapsible on mobile */}
// // // //           <Collapse in={!headerCollapsed} timeout="auto">
// // // //             <Box
// // // //               sx={{
// // // //                 display: "flex",
// // // //                 flexDirection: "column",
// // // //                 borderBottom: "1px solid",
// // // //                 borderColor: theme.palette.divider,
// // // //                 overflow: "hidden",
// // // //               }}
// // // //             >
// // // //               {/* Search bar */}
// // // //               <Box sx={{ p: isMobile ? 1 : 2, pb: 0, width: "100%" }}>
// // // //                 <TextField
// // // //                   fullWidth
// // // //                   size={isMobile ? "small" : "medium"}
// // // //                   variant="outlined"
// // // //                   placeholder="Buscar órdenes..."
// // // //                   value={searchQuery}
// // // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // // //                   InputProps={{
// // // //                     startAdornment: (
// // // //                       <InputAdornment position="start">
// // // //                         <SearchIcon />
// // // //                       </InputAdornment>
// // // //                     ),
// // // //                     endAdornment: searchQuery && (
// // // //                       <InputAdornment position="end">
// // // //                         <IconButton onClick={clearSearch} size="small">
// // // //                           <ClearIcon fontSize="small" />
// // // //                         </IconButton>
// // // //                       </InputAdornment>
// // // //                     ),
// // // //                   }}
// // // //                 />
// // // //               </Box>

// // // //               {/* Status tabs */}
// // // //               <Box sx={{ px: isMobile ? 1 : 2, pt: 1, width: "100%", overflow: "auto" }}>
// // // //                 <Tabs
// // // //                   value={activeStatus}
// // // //                   onChange={handleStatusChange}
// // // //                   variant="scrollable"
// // // //                   scrollButtons="auto"
// // // //                   allowScrollButtonsMobile
// // // //                   sx={{
// // // //                     minHeight: isMobile ? 40 : 48,
// // // //                     "& .MuiTab-root": {
// // // //                       minHeight: isMobile ? 40 : 48,
// // // //                       py: 0,
// // // //                     },
// // // //                   }}
// // // //                 >
// // // //                   <Tab label="Todas" value="all" />
// // // //                   {statusOptions.map((status) => (
// // // //                     <Tab
// // // //                       key={status}
// // // //                       label={statusConfig[status as keyof typeof statusConfig].label}
// // // //                       value={status}
// // // //                       icon={statusConfig[status as keyof typeof statusConfig].icon}
// // // //                       iconPosition="start"
// // // //                       sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
// // // //                     />
// // // //                   ))}
// // // //                 </Tabs>
// // // //               </Box>

// // // //               {/* Status indicators */}
// // // //               {(isLoading || isUpdating) && (
// // // //                 <Box
// // // //                   sx={{
// // // //                     display: "flex",
// // // //                     alignItems: "center",
// // // //                     gap: 1,
// // // //                     p: 1,
// // // //                     mx: 1,
// // // //                     mb: 1,
// // // //                     backgroundColor: theme.palette.action.hover,
// // // //                     borderRadius: 1,
// // // //                   }}
// // // //                 >
// // // //                   <CircularProgress size={16} />
// // // //                   <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// // // //                     {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// // // //                   </Typography>
// // // //                 </Box>
// // // //               )}
// // // //             </Box>
// // // //           </Collapse>

// // // //           {/* Error messages */}
// // // //           <Box
// // // //             sx={{
// // // //               px: { xs: 1, sm: 2 },
// // // //               pt: { xs: 1, sm: 1 },
// // // //               overflow: "auto",
// // // //               flexShrink: 0,
// // // //             }}
// // // //           >
// // // //             {error && (
// // // //               <Alert severity="error" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// // // //                 {error}
// // // //               </Alert>
// // // //             )}

// // // //             {successMessage && (
// // // //               <Alert severity="success" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// // // //                 {successMessage}
// // // //               </Alert>
// // // //             )}
// // // //           </Box>

// // // //           {/* Main content - takes all available space */}
// // // //           <Box
// // // //             sx={{
// // // //               flex: 1,
// // // //               overflow: "auto",
// // // //               display: "flex",
// // // //               flexDirection: "column",
// // // //               p: { xs: 0.5, sm: 2 },
// // // //             }}
// // // //           >
// // // //             <PendingOrdersDialog open={openPendingDialog} onClose={() => setOpenPendingDialog(false)} />

// // // //             {/* Orders list */}
// // // //             <Box sx={{ flex: 1 }}>
// // // //               {filteredOrders.length === 0 ? (
// // // //                 <Box
// // // //                   sx={{
// // // //                     display: "flex",
// // // //                     justifyContent: "center",
// // // //                     alignItems: "center",
// // // //                     height: "200px",
// // // //                     flexDirection: "column",
// // // //                     gap: 2,
// // // //                   }}
// // // //                 >
// // // //                   <Typography variant="h6" color="text.secondary">
// // // //                     No se encontraron órdenes
// // // //                   </Typography>
// // // //                   <Button
// // // //                     variant="outlined"
// // // //                     onClick={() => {
// // // //                       setSearchQuery("")
// // // //                       setActiveStatus("all")
// // // //                     }}
// // // //                   >
// // // //                     Limpiar filtros
// // // //                   </Button>
// // // //                 </Box>
// // // //               ) : viewMode === "card" ? (
// // // //                 <>
// // // //                   <Grid container spacing={isMobile ? 1 : 3}>
// // // //                     {paginatedOrders.map((order: any) => (
// // // //                       <Grid item xs={12} key={order._id || order.id}>
// // // //                         <OrderCard order={order} />
// // // //                       </Grid>
// // // //                     ))}
// // // //                   </Grid>
// // // //                   <PaginationControls />
// // // //                 </>
// // // //               ) : (
// // // //                 <>
// // // //                   <TableContainer
// // // //                     component={Paper}
// // // //                     elevation={0}
// // // //                     sx={{
// // // //                       position: "relative",
// // // //                       overflow: "auto",
// // // //                       maxWidth: "100%",
// // // //                       "&:before": {
// // // //                         content: '""',
// // // //                         position: "absolute",
// // // //                         top: 0,
// // // //                         left: 0,
// // // //                         right: 0,
// // // //                         height: "4px",
// // // //                         background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
// // // //                         zIndex: 1,
// // // //                       },
// // // //                     }}
// // // //                   >
// // // //                     <Table size={isMobile ? "small" : "medium"} sx={{ minWidth: isMobile ? 450 : 650 }}>
// // // //                       <TableHead>
// // // //                         <TableRow>
// // // //                           <TableCell>ID</TableCell>
// // // //                           <TableCell>Cliente</TableCell>
// // // //                           <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Estado</TableCell>
// // // //                           <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Items</TableCell>
// // // //                           <TableCell>Total</TableCell>
// // // //                           <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Hora</TableCell>
// // // //                           <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>Comentario General</TableCell>
// // // //                           <TableCell>Acciones</TableCell>
// // // //                         </TableRow>
// // // //                       </TableHead>
// // // //                       <TableBody>
// // // //                         {paginatedOrders.map((order: any) => (
// // // //                           <OrderRow
// // // //                             key={order._id || order.id}
// // // //                             order={order}
// // // //                             expandedRows={expandedRows}
// // // //                             onToggleExpand={handleToggleExpand}
// // // //                           />
// // // //                         ))}
// // // //                       </TableBody>
// // // //                     </Table>
// // // //                   </TableContainer>
// // // //                   <PaginationControls />
// // // //                 </>
// // // //               )}
// // // //             </Box>
// // // //           </Box>
// // // //         </Paper>

// // // //         {/* Scroll to top button */}
// // // //         <Zoom in={trigger}>
// // // //           <Box
// // // //             onClick={scrollToTop}
// // // //             role="presentation"
// // // //             sx={{
// // // //               position: "fixed",
// // // //               bottom: 16,
// // // //               right: 16,
// // // //               zIndex: 1000,
// // // //             }}
// // // //           >
// // // //             <Fab color="primary" size="small" aria-label="scroll back to top">
// // // //               <KeyboardArrowUp />
// // // //             </Fab>
// // // //           </Box>
// // // //         </Zoom>
// // // //       </Box>

// // // //       {/* Edit Order Modal */}
// // // //       {isEditModalOpen && selectedOrder && (
// // // //         <EditOrderModal
// // // //           open={isEditModalOpen}
// // // //           order={selectedOrder}
// // // //           onSave={saveUpdateData}
// // // //           menuData={{
// // // //             mainMenu: hojas?.Hoja1 || [],
// // // //             promotions: hojas?.Promotion || [],
// // // //           }}
// // // //           onClose={handleCloseEditModal}
// // // //         />
// // // //       )}
// // // //     </Box>
// // // //   )
// // // // }

// // // // export default OrderSpeedGeneric




// // // "use client"

// // // import React, { useMemo, useState, useEffect } from "react"
// // // import { useSelector } from "react-redux"
// // // import type { RootState } from "../../../store/store"
// // // import {
// // //   Box,
// // //   Button,
// // //   Chip,
// // //   CircularProgress,
// // //   Paper,
// // //   Typography,
// // //   Alert,
// // //   Grid,
// // //   List,
// // //   ListItem,
// // //   ListItemText,
// // //   Avatar,
// // //   IconButton,
// // //   Card,
// // //   CardContent,
// // //   Divider,
// // //   Badge,
// // //   Tooltip,
// // //   AppBar,
// // //   Toolbar,
// // //   useMediaQuery,
// // //   useTheme,
// // //   Stack,
// // //   useScrollTrigger,
// // //   Fab,
// // //   Zoom,
// // //   TextField,
// // //   InputAdornment,
// // //   Pagination,
// // //   Tabs,
// // //   Tab,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   MenuItem,
// // //   Select,
// // //   FormControl,
// // //   Collapse,
// // //   Menu,
// // //   ListItemIcon,
// // //   ButtonGroup,
// // //   PaletteColor,
// // // } from "@mui/material"
// // // import {
// // //   Edit as EditIcon,
// // //   Refresh as RefreshIcon,
// // //   ExpandMore as ExpandMoreIcon,
// // //   ExpandLess as ExpandLessIcon,
// // //   CheckCircle as CheckCircleIcon,
// // //   PauseCircle as PauseCircleIcon,
// // //   Cancel as CancelIcon,
// // //   DeliveryDining as DeliveryIcon,
// // //   PlayArrow,
// // //   Pause,
// // //   ViewList as ViewListIcon,
// // //   ViewColumn as ViewColumnIcon,
// // //   Logout as LogoutIcon,
// // //   AccessTime,
// // //   Person,
// // //   KeyboardArrowUp,
// // //   Search as SearchIcon,
// // //   Clear as ClearIcon,
// // //   MoreVert as MoreVertIcon,
// // // } from "@mui/icons-material"
// // // import { useOrdersManagementSocketApi } from "../../../hooks/useOrdersManagementSocketApi"
// // // import EditOrderModal from "../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal"
// // // import Image from "next/image"
// // // import { clearLocalhostStorage } from "@/services/localstorage.services"
// // // import { recordAttendance } from "@/services/attendance.services"
// // // import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog"



// // // // Status configuration
// // // const statusConfig = {
// // //   pending: {
// // //     color: "default",
// // //     icon: <PauseCircleIcon color="disabled" />,
// // //     label: "Pendientes",
// // //     actions: [{ action: "start", label: "Iniciar", color: "primary", icon: <PlayArrow /> }],
// // //   },
// // //   processing: {
// // //     color: "primary",
// // //     icon: <PlayArrow color="primary" />,
// // //     label: "En Proceso",
// // //     actions: [
// // //       { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
// // //       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
// // //     ],
// // //   },
// // //   paused: {
// // //     color: "warning",
// // //     icon: <Pause color="warning" />,
// // //     label: "Pausadas",
// // //     actions: [
// // //       { action: "resume", label: "Reanudar", color: "primary", icon: <PlayArrow /> },
// // //       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
// // //     ],
// // //   },
// // //   finished: {
// // //     color: "success",
// // //     icon: <CheckCircleIcon color="success" />,
// // //     label: "Terminadas",
// // //     actions: [{ action: "deliver", label: "Entregar", color: "success", icon: <DeliveryIcon /> }],
// // //   },
// // //   cancelled: {
// // //     color: "error",
// // //     icon: <CancelIcon color="error" />,
// // //     label: "Canceladas",
// // //     actions: [{ action: "reopen", label: "Reabrir", color: "primary", icon: <PlayArrow /> }],
// // //   },
// // //   delivered: {
// // //     color: "success",
// // //     icon: <DeliveryIcon color="success" />,
// // //     label: "Entregadas",
// // //     actions: [],
// // //   },
// // // }

// // // const statusOptions = Object.keys(statusConfig)
// // // const pageSizeOptions = [5, 10, 20, 50]

// // // const OrderSpeedGeneric = () => {
// // //   const theme = useTheme()
// // //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
// // //   const isTablet = useMediaQuery(theme.breakpoints.down("md"))
// // //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
// // //   const [displayTitle, setDisplayTitle] = useState(false)
// // //   const [viewMode, setViewMode] = useState<"card" | "list">("card")
// // //   const [openPendingDialog, setOpenPendingDialog] = useState(false)
// // //   const [selectedOrder, setSelectedOrder] = useState<any>(null)
// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
// // //   const [searchQuery, setSearchQuery] = useState("")
// // //   const [activeStatus, setActiveStatus] = useState("all")
// // //   const [currentPages, setCurrentPages] = useState<Record<string, number>>(
// // //     statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 }),
// // //   )

// // //   const [isTapped, setIsTapped] = useState(false)
// // //   const [expandedRows, setExpandedRows] = useState<string[]>([])
// // //   const [expandedCards, setExpandedCards] = useState<string[]>([])

// // //   const [pageSize, setPageSize] = useState(isMobile ? 5 : 10)

// // //   // Action menu state
// // //   const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null)
// // //   const [actionMenuOrder, setActionMenuOrder] = useState<any>(null)

// // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
// // //   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } }

// // //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email")

// // //   const {
// // //     allOrders,
// // //     ordersByStatus,
// // //     isConnected,
// // //     isLoading,
// // //     isUpdating,
// // //     error,
// // //     successMessage,
// // //     lastRefresh,
// // //     fetchHistoricalOrders,
// // //     handleOrderAction,
// // //     updateOrder,
// // //     clearMessages,
// // //   } = useOrdersManagementSocketApi({
// // //     companyName: data?.companyName || "LlakaScript",
// // //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// // //     orderLimit: 50,
// // //   })

// // //   // Calculate totals
// // //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)
// // //   const pendingCount = ordersByStatus.pending?.length || 0
// // //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
// // //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

// // //   // Filter and search orders
// // //   const filteredOrders = useMemo(() => {
// // //     let filtered = [...allOrders]

// // //     if (activeStatus !== "all") {
// // //       filtered = filtered.filter((order) => order.status === activeStatus)
// // //     }

// // //     if (searchQuery) {
// // //       const query = searchQuery.toLowerCase()
// // //       filtered = filtered.filter((order) => {
// // //         return (
// // //           order.fullname?.toLowerCase().includes(query) ||
// // //           order.id?.toString().includes(query) ||
// // //           order._id?.toString().includes(query) ||
// // //           order.orderType?.toLowerCase().includes(query) ||
// // //           order.dataTypeOrder?.toLowerCase().includes(query) ||
// // //           order.cart.some(
// // //             (item: any) =>
// // //               item.name.toLowerCase().includes(query) ||
// // //               (item.Description && item.Description.toLowerCase().includes(query)) ||
// // //               item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query)),
// // //           )
// // //         )
// // //       })
// // //     }

// // //     return filtered.sort((a, b) => {
// // //       const dateA = new Date(a.createdAt || a.timestamp || 0)
// // //       const dateB = new Date(b.createdAt || b.timestamp || 0)
// // //       return dateB.getTime() - dateA.getTime()
// // //     })
// // //   }, [allOrders, activeStatus, searchQuery])

// // //   // Paginate orders
// // //   const paginatedOrders = useMemo(() => {
// // //     const startIndex = (currentPages[activeStatus] - 1) * pageSize
// // //     return filteredOrders.slice(startIndex, startIndex + pageSize)
// // //   }, [filteredOrders, currentPages, activeStatus, pageSize])

// // //   // Calculate page count for current status
// // //   const pageCount = Math.ceil(filteredOrders.length / pageSize)

// // //   // Handle page change
// // //   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
// // //     setCurrentPages((prev) => ({
// // //       ...prev,
// // //       [activeStatus]: value,
// // //     }))
// // //     window.scrollTo({ top: 0, behavior: "smooth" })
// // //   }

// // //   // Handle page size change
// // //   const handlePageSizeChange = (event: any) => {
// // //     const newSize = event.target.value
// // //     setPageSize(newSize)
// // //     // Recalculate current page to avoid empty pages
// // //     const newPage = Math.floor(((currentPages[activeStatus] - 1) * pageSize) / newSize) + 1
// // //     setCurrentPages((prev) => ({
// // //       ...prev,
// // //       [activeStatus]: newPage,
// // //     }))
// // //   }

// // //   // Toggle functions
// // //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
// // //   const toggleViewMode = () => setViewMode(viewMode === "card" ? "list" : "card")

// // //   // Action handlers
// // //   const handleLogout = async () => {
// // //     clearLocalhostStorage()
// // //     await recordAttendance("getOut", user?.user?.email, data?.companyName)
// // //     window.location.reload()
// // //   }

// // //   const handleOpenEditModal = (order: any) => {
// // //     setSelectedOrder(order)
// // //     setIsEditModalOpen(true)
// // //   }

// // //   const handleCloseEditModal = () => {
// // //     setIsEditModalOpen(false)
// // //     setSelectedOrder(null)
// // //   }

// // //   const saveUpdateData = async (updatedOrder: any) => {
// // //     try {
// // //       await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder)
// // //       handleCloseEditModal()
// // //     } catch (error) {
// // //       console.error("Failed to update order:", error)
// // //     }
// // //   }

// // //   const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
// // //     setActiveStatus(newValue)
// // //     setCurrentPages((prev) => ({
// // //       ...prev,
// // //       [newValue]: 1,
// // //     }))
// // //   }

// // //   const clearSearch = () => {
// // //     setSearchQuery("")
// // //   }

// // //   // Action menu handlers
// // //   const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, order: any) => {
// // //     event.stopPropagation()
// // //     setActionMenuAnchorEl(event.currentTarget)
// // //     setActionMenuOrder(order)
// // //   }

// // //   const handleCloseActionMenu = () => {
// // //     setActionMenuAnchorEl(null)
// // //     setActionMenuOrder(null)
// // //   }

// // //   const handleActionMenuItemClick = (action: string) => {
// // //     if (actionMenuOrder) {
// // //       if (action === "edit") {
// // //         handleOpenEditModal(actionMenuOrder)
// // //       } else {
// // //         handleOrderAction(action, actionMenuOrder)
// // //       }
// // //       handleCloseActionMenu()
// // //     }
// // //   }

// // //   // Toggle card expansion
// // //   const toggleCardExpansion = (orderId: string) => {
// // //     setExpandedCards((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
// // //   }

// // //   // Effects
// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       setDisplayTitle((prev) => !prev)
// // //     }, 5000)
// // //     return () => clearInterval(interval)
// // //   }, [])

// // //   // Scroll to top button logic
// // //   const trigger = useScrollTrigger({
// // //     threshold: 100,
// // //   })

// // //   const scrollToTop = () => {
// // //     window.scrollTo({
// // //       top: 0,
// // //       behavior: "smooth",
// // //     })
// // //   }

// // //   // Order Card Component
// // //   const OrderCard = React.memo(({ order }: { order: any }) => {
// // //     const status = order.status
// // //     const config = statusConfig[status as keyof typeof statusConfig]
// // //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
// // //     const total = order.cart.reduce((sum: any, item: any) => {
// // //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
// // //       return sum + item.price * item.quantity + extrasTotal
// // //     }, 0)

// // //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //     })

// // //     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette]

// // //     // Check if this card is expanded
// // //     const orderId = order._id || order.id
// // //     const isExpanded = expandedCards.includes(orderId)

// // //     return (
// // //       <Card
// // //         sx={{
// // //           borderLeft: "4px solid",
// // //           borderColor: paletteColor?.main || "grey",
// // //           mb: 2,
// // //           position: "relative",
// // //           transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
// // //           "&:hover": {
// // //             transform: isMobile ? "none" : "translateY(-2px)",
// // //             boxShadow: isMobile ? "none" : theme.shadows[4],
// // //           },
// // //         }}
// // //       >
// // //         <CardContent>
// // //           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
// // //             <Typography variant="subtitle1" fontWeight="bold">
// // //               #{order.id || order._id.slice(-4)}
// // //             </Typography>
// // //             <Chip
// // //               size="small"
// // //               label={`${order.orderType}${order.dataTypeOrder ? ` / ${order.dataTypeOrder}` : ""}`}
// // //               color={config.color as any}
// // //               icon={config.icon}
// // //             />
// // //           </Box>

// // //           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
// // //             <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // //             <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // //               {order.fullname}
// // //             </Typography>
// // //             <Box sx={{ flexGrow: 1 }} />
// // //             <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // //             <Typography variant="body2">{formattedTime}</Typography>
// // //           </Box>

// // //           <Divider sx={{ my: 1 }} />

// // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
// // //             <Typography variant="subtitle2">Items ({totalItems})</Typography>
// // //             {order.cart.length > 2 && !isExpanded && (
// // //               <Button
// // //                 size="small"
// // //                 variant="text"
// // //                 onClick={() => toggleCardExpansion(orderId)}
// // //                 endIcon={<ExpandMoreIcon />}
// // //               >
// // //                 Ver todos
// // //               </Button>
// // //             )}
// // //             {isExpanded && (
// // //               <Button
// // //                 size="small"
// // //                 variant="text"
// // //                 onClick={() => toggleCardExpansion(orderId)}
// // //                 endIcon={<ExpandLessIcon />}
// // //               >
// // //                 Colapsar
// // //               </Button>
// // //             )}
// // //           </Box>

// // //           <List dense disablePadding>
// // //             {order.cart.slice(0, isExpanded ? undefined : isMobile ? 2 : 3).map((item: any) => (
// // //               <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.25 }}>
// // //                 <ListItemText
// // //                   primary={
// // //                     <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
// // //                       <Box sx={{ flex: 1, mr: 1 }}>
// // //                         <Typography variant="body2">
// // //                           <strong>{item.quantity}x</strong> {item.name}
// // //                         </Typography>
// // //                         {item.Description && (
// // //                           <Typography variant="caption" display="block" sx={{ mt: 0.5, color: "text.secondary" }}>
// // //                             {item.Description}
// // //                           </Typography>
// // //                         )}
// // //                       </Box>
// // //                       <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
// // //                         ${item.price.toFixed(2)}
// // //                       </Typography>
// // //                     </Box>
// // //                   }
// // //                   secondary={
// // //                     item.extras?.length > 0 && (
// // //                       <List dense disablePadding sx={{ ml: 2 }}>
// // //                         {item.extras.map((extra: any, idx: number) => (
// // //                           <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0 }}>
// // //                             <ListItemText
// // //                               primary={
// // //                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // //                                   <Typography variant="caption">+ {extra.name}</Typography>
// // //                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // //                                 </Box>
// // //                               }
// // //                             />
// // //                           </ListItem>
// // //                         ))}
// // //                         {item?.comments && (
// // //                           <ListItemText
// // //                             primary={
// // //                               <Box sx={{ mt: 0.5 }}>
// // //                                 <Typography variant="caption">
// // //                                   <strong>Comentario: </strong>
// // //                                   {item?.comments}
// // //                                 </Typography>
// // //                               </Box>
// // //                             }
// // //                           />
// // //                         )}
// // //                       </List>
// // //                     )
// // //                   }
// // //                 />
// // //               </ListItem>
// // //             ))}
// // //             {!isExpanded && order.cart.length > (isMobile ? 2 : 3) && (
// // //               <Typography
// // //                 variant="caption"
// // //                 color="text.secondary"
// // //                 sx={{ display: "block", mt: 1, cursor: "pointer" }}
// // //                 onClick={() => toggleCardExpansion(orderId)}
// // //               >
// // //                 +{order.cart.length - (isMobile ? 2 : 3)} más...
// // //               </Typography>
// // //             )}
// // //           </List>

// // //           <Divider sx={{ my: 1 }} />
// // //           {order?.comments && (
// // //             <Box sx={{ mb: 1 }}>
// // //               <Typography variant="caption" sx={{ display: "block" }}>
// // //                 <strong>Comentario General: </strong> {order?.comments}
// // //               </Typography>
// // //             </Box>
// // //           )}
// // //           <Divider sx={{ my: 1 }} />

// // //           <Box
// // //             sx={{
// // //               display: "flex",
// // //               justifyContent: "space-between",
// // //               alignItems: "center",
// // //               flexDirection: isMobile ? "column" : "row",
// // //               gap: isMobile ? 1 : 0,
// // //             }}
// // //           >
// // //             <Typography variant="subtitle1" fontWeight="bold">
// // //               Total: ${total.toFixed(2)}
// // //             </Typography>

// // //             {isMobile ? (
// // //               <Box sx={{ width: "100%" }}>
// // //                 {config.actions.length > 0 ? (
// // //                   <ButtonGroup fullWidth variant="contained" size="small">
// // //                     {config.actions.slice(0, 1).map((action: any, idx: number) => (
// // //                       <Button
// // //                         key={`${action.action}-${idx}`}
// // //                         color={action.color as any}
// // //                         startIcon={action.icon}
// // //                         onClick={(e) => {
// // //                           e.stopPropagation()
// // //                           handleOrderAction(action.action, order)
// // //                         }}
// // //                         disabled={isUpdating}
// // //                         sx={{ flex: 1 }}
// // //                       >
// // //                         {action.label}
// // //                       </Button>
// // //                     ))}
// // //                     <Button
// // //                       color="primary"
// // //                       variant="outlined"
// // //                       onClick={(e) => handleOpenActionMenu(e, order)}
// // //                       disabled={isUpdating}
// // //                       sx={{ maxWidth: "50px" }}
// // //                     >
// // //                       <MoreVertIcon fontSize="small" />
// // //                     </Button>
// // //                   </ButtonGroup>
// // //                 ) : (
// // //                   <Button
// // //                     size="small"
// // //                     variant="outlined"
// // //                     color="primary"
// // //                     startIcon={<EditIcon />}
// // //                     onClick={(e) => {
// // //                       e.stopPropagation()
// // //                       handleOpenEditModal(order)
// // //                     }}
// // //                     disabled={isUpdating}
// // //                     fullWidth
// // //                   >
// // //                     Editar
// // //                   </Button>
// // //                 )}
// // //               </Box>
// // //             ) : (
// // //               <Stack direction="row" spacing={1} width="auto">
// // //                 {config.actions.map((action: any, idx: number) => (
// // //                   <Button
// // //                     key={`${action.action}-${idx}`}
// // //                     size="small"
// // //                     variant="contained"
// // //                     color={action.color as any}
// // //                     startIcon={action.icon}
// // //                     onClick={(e) => {
// // //                       e.stopPropagation()
// // //                       handleOrderAction(action.action, order)
// // //                     }}
// // //                     disabled={isUpdating}
// // //                   >
// // //                     {action.label}
// // //                   </Button>
// // //                 ))}

// // //                 <Button
// // //                   size="small"
// // //                   variant="outlined"
// // //                   color="primary"
// // //                   startIcon={<EditIcon />}
// // //                   onClick={(e) => {
// // //                     e.stopPropagation()
// // //                     handleOpenEditModal(order)
// // //                   }}
// // //                   disabled={isUpdating}
// // //                 >
// // //                   Editar
// // //                 </Button>
// // //               </Stack>
// // //             )}
// // //           </Box>
// // //         </CardContent>
// // //       </Card>
// // //     )
// // //   })

// // //   const handleToggleExpand = (orderId: string) => {
// // //     setExpandedRows((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
// // //   }

// // //   const OrderRow = React.memo(
// // //     ({
// // //       order,
// // //       expandedRows,
// // //       onToggleExpand,
// // //     }: {
// // //       order: any
// // //       expandedRows: string[]
// // //       onToggleExpand: (id: string) => void
// // //     }) => {
// // //       const status = order.status
// // //       const config = statusConfig[status as keyof typeof statusConfig]
// // //       const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
// // //       const total = order.cart.reduce((sum: any, item: any) => {
// // //         const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
// // //         return sum + item.price * item.quantity + extrasTotal
// // //       }, 0)

// // //       const commentsOrderGeneral = order?.comments
// // //       const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// // //         hour: "2-digit",
// // //         minute: "2-digit",
// // //       })

// // //       // Use the order ID to maintain expanded state
// // //       const orderId = order._id || order.id
// // //       const isExpanded = expandedRows.includes(orderId)

// // //       // When toggling, update the parent's state
// // //       const toggleExpand = (e: React.MouseEvent) => {
// // //         e.stopPropagation()
// // //         onToggleExpand(orderId)
// // //       }

// // //       return (
// // //         <>
// // //           <TableRow
// // //             sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
// // //             onClick={toggleExpand}
// // //           >
// // //             <TableCell>
// // //               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // //                 <IconButton size="small" onClick={toggleExpand}>
// // //                   {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
// // //                 </IconButton>
// // //                 <Typography variant="body2" fontWeight="bold">
// // //                   #{order.id || order._id.slice(-4)}
// // //                 </Typography>
// // //               </Box>
// // //             </TableCell>
// // //             <TableCell>
// // //               <Box sx={{ display: "flex", alignItems: "center" }}>
// // //                 <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// // //                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // //                   {order.fullname}
// // //                 </Typography>
// // //               </Box>
// // //             </TableCell>
// // //             <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
// // //               <Chip
// // //                 size="small"
// // //                 label={`${order.orderType}${order.dataTypeOrder ? ` / ${order.dataTypeOrder}` : ""}`}
// // //                 color={config.color as any}
// // //                 icon={config.icon}
// // //               />
// // //             </TableCell>
// // //             <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
// // //               <Typography variant="body2">{totalItems} items</Typography>
// // //             </TableCell>
// // //             <TableCell>
// // //               <Typography variant="body2" fontWeight="bold">
// // //                 ${total.toFixed(2)}
// // //               </Typography>
// // //             </TableCell>
// // //             <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
// // //               <Typography variant="body2">{formattedTime}</Typography>
// // //             </TableCell>
// // //             <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
// // //               <Tooltip title={commentsOrderGeneral || "Sin comentarios"} arrow>
// // //                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
// // //                   {commentsOrderGeneral || "-"}
// // //                 </Typography>
// // //               </Tooltip>
// // //             </TableCell>
// // //             <TableCell>
// // //               {isMobile ? (
// // //                 <IconButton size="small" color="primary" onClick={(e) => handleOpenActionMenu(e, order)}>
// // //                   <MoreVertIcon />
// // //                 </IconButton>
// // //               ) : (
// // //                 <Stack
// // //                   direction="row"
// // //                   spacing={1}
// // //                   sx={{
// // //                     minWidth: "120px",
// // //                     "& .MuiIconButton-root": {
// // //                       mx: 0,
// // //                     },
// // //                   }}
// // //                 >
// // //                   {config.actions.map((action: any, idx: number) => (
// // //                     <Tooltip key={`${action.action}-${idx}`} title={action.label}>
// // //                       <IconButton
// // //                         size="small"
// // //                         color={action.color as any}
// // //                         onClick={(e) => {
// // //                           e.stopPropagation()
// // //                           handleOrderAction(action.action, order)
// // //                         }}
// // //                         disabled={isUpdating}
// // //                       >
// // //                         {action.icon}
// // //                       </IconButton>
// // //                     </Tooltip>
// // //                   ))}
// // //                   <Tooltip title="Editar">
// // //                     <IconButton
// // //                       size="small"
// // //                       color="primary"
// // //                       onClick={(e) => {
// // //                         e.stopPropagation()
// // //                         handleOpenEditModal(order)
// // //                       }}
// // //                       disabled={isUpdating}
// // //                     >
// // //                       <EditIcon fontSize="small" />
// // //                     </IconButton>
// // //                   </Tooltip>
// // //                 </Stack>
// // //               )}
// // //             </TableCell>
// // //           </TableRow>

// // //           {/* Expanded details row */}
// // //           <TableRow>
// // //             <TableCell style={{ padding: 0 }} colSpan={8}>
// // //               <Collapse in={isExpanded} timeout="auto" unmountOnExit>
// // //                 <Box
// // //                   sx={{
// // //                     p: { xs: 1, sm: 3 },
// // //                     backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
// // //                     borderBottom: `1px solid ${theme.palette.divider}`,
// // //                   }}
// // //                 >
// // //                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
// // //                     Detalles de la Orden
// // //                   </Typography>

// // //                   <Grid container spacing={2}>
// // //                     <Grid item xs={12} md={6}>
// // //                       <Typography variant="subtitle2" gutterBottom>
// // //                         Productos:
// // //                       </Typography>
// // //                       <List dense disablePadding>
// // //                         {order.cart.map((item: any, index: number) => (
// // //                           <React.Fragment key={`${item.id}-${index}`}>
// // //                             <ListItem disablePadding sx={{ py: 0.5 }}>
// // //                               <ListItemText
// // //                                 primary={
// // //                                   <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
// // //                                     <Box sx={{ flex: 1, mr: 1 }}>
// // //                                       <Typography variant="body2">
// // //                                         <strong>{item.quantity}x</strong> {item.name}
// // //                                       </Typography>
// // //                                       {item.Description && (
// // //                                         <Typography
// // //                                           variant="caption"
// // //                                           display="block"
// // //                                           sx={{ mt: 0.5, color: "text.secondary" }}
// // //                                         >
// // //                                           {item.Description}
// // //                                         </Typography>
// // //                                       )}
// // //                                     </Box>
// // //                                     <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
// // //                                   </Box>
// // //                                 }
// // //                                 secondary={
// // //                                   <div>
// // //                                     {item.extras?.length > 0 && (
// // //                                       <List dense disablePadding sx={{ ml: 2, mt: 0.5 }}>
// // //                                         {item?.extras?.map((extra: any, idx: number) => (
// // //                                           <ListItem key={`${item.id}-extra-${idx}`} disablePadding sx={{ py: 0 }}>
// // //                                             <ListItemText
// // //                                               primary={
// // //                                                 <Box
// // //                                                   sx={{
// // //                                                     display: "flex",
// // //                                                     justifyContent: "space-between",
// // //                                                     alignItems: "center",
// // //                                                   }}
// // //                                                 >
// // //                                                   <Typography variant="caption">+ {extra.name}</Typography>
// // //                                                   <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
// // //                                                 </Box>
// // //                                               }
// // //                                             />
// // //                                           </ListItem>
// // //                                         ))}
// // //                                       </List>
// // //                                     )}
// // //                                     {item?.comments && (
// // //                                       <Box sx={{ mt: 1 }}>
// // //                                         <Typography variant="caption">
// // //                                           <strong>Comentarios:</strong> {item?.comments || "Sin comentarios"}
// // //                                         </Typography>
// // //                                       </Box>
// // //                                     )}
// // //                                   </div>
// // //                                 }
// // //                               />
// // //                             </ListItem>
// // //                             <Divider sx={{ my: 0.5 }} />
// // //                           </React.Fragment>
// // //                         ))}
// // //                       </List>
// // //                     </Grid>

// // //                     <Grid item xs={12} md={6}>
// // //                       <Typography variant="subtitle2" gutterBottom>
// // //                         Información Adicional:
// // //                       </Typography>
// // //                       <List dense disablePadding>
// // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // //                           <ListItemText
// // //                             primary={
// // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // //                                 <Typography variant="body2">
// // //                                   <strong>Estado:</strong>
// // //                                 </Typography>
// // //                                 <Chip
// // //                                   size="small"
// // //                                   label={config.label}
// // //                                   color={config.color as any}
// // //                                   icon={config.icon}
// // //                                 />
// // //                               </Box>
// // //                             }
// // //                           />
// // //                         </ListItem>
// // //                         <Divider sx={{ my: 0.5 }} />

// // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // //                           <ListItemText
// // //                             primary={
// // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // //                                 <Typography variant="body2">
// // //                                   <strong>Total:</strong>
// // //                                 </Typography>
// // //                                 <Typography variant="body2" fontWeight="bold">
// // //                                   ${total.toFixed(2)}
// // //                                 </Typography>
// // //                               </Box>
// // //                             }
// // //                           />
// // //                         </ListItem>
// // //                         <Divider sx={{ my: 0.5 }} />

// // //                         {commentsOrderGeneral && (
// // //                           <>
// // //                             <ListItem disablePadding sx={{ py: 0.5 }}>
// // //                               <ListItemText
// // //                                 primary={
// // //                                   <Box>
// // //                                     <Typography variant="body2">
// // //                                       <strong>Comentarios:</strong>
// // //                                     </Typography>
// // //                                     <Typography variant="body2" sx={{ mt: 0.5 }}>
// // //                                       {commentsOrderGeneral}
// // //                                     </Typography>
// // //                                   </Box>
// // //                                 }
// // //                               />
// // //                             </ListItem>
// // //                             <Divider sx={{ my: 0.5 }} />
// // //                           </>
// // //                         )}

// // //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// // //                           <ListItemText
// // //                             primary={
// // //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // //                                 <Typography variant="body2">
// // //                                   <strong>Hora:</strong>
// // //                                 </Typography>
// // //                                 <Typography variant="body2">{formattedTime}</Typography>
// // //                               </Box>
// // //                             }
// // //                           />
// // //                         </ListItem>
// // //                       </List>
// // //                     </Grid>
// // //                   </Grid>
// // //                 </Box>
// // //               </Collapse>
// // //             </TableCell>
// // //           </TableRow>
// // //         </>
// // //       )
// // //     },
// // //   )

// // //   // Custom Pagination Controls
// // //   const PaginationControls = () => (
// // //     <Box
// // //       sx={{
// // //         display: "flex",
// // //         justifyContent: "space-between",
// // //         alignItems: "center",
// // //         mt: 3,
// // //         pb: 2,
// // //         flexDirection: isMobile ? "column" : "row",
// // //         gap: isMobile ? 2 : 0,
// // //       }}
// // //     >
// // //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // //         <Typography variant="body2" color="text.secondary">
// // //           Órdenes por página:
// // //         </Typography>
// // //         <FormControl size="small" variant="outlined">
// // //           <Select value={pageSize} onChange={handlePageSizeChange} sx={{ height: "36px" }}>
// // //             {pageSizeOptions.map((size) => (
// // //               <MenuItem key={size} value={size}>
// // //                 {size}
// // //               </MenuItem>
// // //             ))}
// // //           </Select>
// // //         </FormControl>
// // //       </Box>

// // //       <Pagination
// // //         count={pageCount}
// // //         page={currentPages[activeStatus]}
// // //         onChange={handlePageChange}
// // //         color="primary"
// // //         size={isMobile ? "small" : "medium"}
// // //         showFirstButton
// // //         showLastButton
// // //         siblingCount={isMobile ? 0 : 1}
// // //         boundaryCount={isMobile ? 1 : 2}
// // //       />

// // //       <Typography variant="body2" color="text.secondary">
// // //         Mostrando {filteredOrders.length > 0 ? (currentPages[activeStatus] - 1) * pageSize + 1 : 0}-
// // //         {Math.min(currentPages[activeStatus] * pageSize, filteredOrders.length)} de {filteredOrders.length} órdenes
// // //       </Typography>
// // //     </Box>
// // //   )

// // //   // Main render
// // //   return (
// // //     <Box
// // //       sx={{
// // //         height: "100vh",
// // //         overflow: "hidden",
// // //         bgcolor: theme.palette.background.default,
// // //         display: "flex",
// // //         flexDirection: "column",
// // //       }}
// // //     >
// // //       {/* Custom AppBar */}
// // //       <AppBar
// // //         position="sticky"
// // //         elevation={3}
// // //         sx={{
// // //           bgcolor: "background.paper",
// // //           color: "text.primary",
// // //           borderBottom: 1,
// // //           borderColor: "divider",
// // //         }}
// // //       >
// // //         <Toolbar
// // //           variant="dense"
// // //           sx={{
// // //             minHeight: isMobile ? 48 : 56,
// // //             flexDirection: isMobile ? "column" : "row",
// // //             py: isMobile ? 1 : 0,
// // //           }}
// // //         >
// // //           {/* Logo and Title */}
// // //           <Box
// // //             sx={{
// // //               display: "flex",
// // //               alignItems: "center",
// // //               gap: 1,
// // //               flexGrow: 1,
// // //               height: "40px",
// // //               position: "relative",
// // //               overflow: "hidden",
// // //               width: isMobile ? "100%" : "auto",
// // //             }}
// // //           >
// // //             <Avatar
// // //               sx={{
// // //                 width: 28,
// // //                 height: 28,
// // //                 flexShrink: 0,
// // //                 ml: 0.5,
// // //               }}
// // //             >
// // //               <Image
// // //                 src={"/images/flama.png"}
// // //                 alt={"LlakaScript"}
// // //                 width={28}
// // //                 height={28}
// // //                 priority
// // //                 style={{
// // //                   objectFit: "contain",
// // //                   width: "100%",
// // //                   height: "100%",
// // //                 }}
// // //               />
// // //             </Avatar>

// // //             <Box
// // //               sx={{
// // //                 position: "relative",
// // //                 width: "auto",
// // //                 height: "100%",
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 flexGrow: 1,
// // //               }}
// // //             >
// // //               <Typography
// // //                 variant={isMobile ? "subtitle1" : "h6"}
// // //                 sx={{
// // //                   fontWeight: 600,
// // //                   lineHeight: 1.1,
// // //                   fontSize: isMobile ? "1rem" : undefined,
// // //                 }}
// // //               >
// // //                 {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// // //               </Typography>
// // //             </Box>
// // //           </Box>

// // //           {/* Right side controls */}
// // //           <Box
// // //             sx={{
// // //               display: "flex",
// // //               alignItems: "center",
// // //               gap: 0.5,
// // //               width: isMobile ? "100%" : "auto",
// // //               justifyContent: isMobile ? "space-between" : "flex-end",
// // //               mt: isMobile ? 1 : 0,
// // //             }}
// // //           >
// // //             {/* View mode toggle - now visible on mobile too */}
// // //             <Tooltip title={viewMode === "card" ? "Vista lista" : "Vista tarjetas"}>
// // //               <IconButton size="small" onClick={toggleViewMode} color="default">
// // //                 {viewMode === "card" ? <ViewListIcon fontSize="small" /> : <ViewColumnIcon fontSize="small" />}
// // //               </IconButton>
// // //             </Tooltip>

// // //             {/* Connection status indicator */}
// // //             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
// // //               <Box
// // //                 sx={{
// // //                   width: 10,
// // //                   height: 10,
// // //                   borderRadius: "50%",
// // //                   bgcolor: isConnected ? "success.main" : "error.main",
// // //                   mr: 1,
// // //                 }}
// // //               />
// // //             </Tooltip>

// // //             {/* Order count badge */}
// // //             {isMobile && totalOrders > 0 && (
// // //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// // //                 <Box sx={{ width: 4, height: 4 }} />
// // //               </Badge>
// // //             )}

// // //             {/* Last refresh time */}
// // //             {lastRefresh && !isMobile && (
// // //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// // //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// // //               </Typography>
// // //             )}

// // //             {/* Refresh button */}
// // //             <Tooltip title="Actualizar">
// // //               <IconButton
// // //                 color="primary"
// // //                 size="small"
// // //                 onClick={fetchHistoricalOrders}
// // //                 disabled={isLoading || isUpdating}
// // //               >
// // //                 <RefreshIcon fontSize="small" />
// // //               </IconButton>
// // //             </Tooltip>

// // //             {/* Header collapse toggle (mobile only) */}
// // //             {isMobile && (
// // //               <IconButton size="small" onClick={toggleHeader}>
// // //                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
// // //               </IconButton>
// // //             )}

// // //             <Tooltip title="Salir">
// // //               <IconButton size="small" onClick={handleLogout} color="default">
// // //                 <LogoutIcon fontSize="small" />
// // //               </IconButton>
// // //             </Tooltip>
// // //           </Box>
// // //         </Toolbar>
// // //       </AppBar>

// // //       {/* Main content */}
// // //       <Box
// // //         component="main"
// // //         sx={{
// // //           p: { xs: 0.5, sm: 2 },
// // //           flex: 1,
// // //           overflow: "auto",
// // //           display: "flex",
// // //           flexDirection: "column",
// // //         }}
// // //       >
// // //         <Paper
// // //           elevation={isMobile ? 1 : 3}
// // //           sx={{
// // //             height: "100%",
// // //             display: "flex",
// // //             flexDirection: "column",
// // //             overflow: "hidden",
// // //             borderRadius: { xs: 1, sm: 2 },
// // //           }}
// // //         >
// // //           {/* Status header - collapsible on mobile */}
// // //           <Collapse in={!headerCollapsed} timeout="auto">
// // //             <Box
// // //               sx={{
// // //                 display: "flex",
// // //                 flexDirection: "column",
// // //                 borderBottom: "1px solid",
// // //                 borderColor: theme.palette.divider,
// // //                 overflow: "hidden",
// // //               }}
// // //             >
// // //               {/* Search bar */}
// // //               <Box sx={{ p: isMobile ? 1 : 2, pb: 0, width: "100%" }}>
// // //                 <TextField
// // //                   fullWidth
// // //                   size={isMobile ? "small" : "medium"}
// // //                   variant="outlined"
// // //                   placeholder="Buscar órdenes..."
// // //                   value={searchQuery}
// // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // //                   InputProps={{
// // //                     startAdornment: (
// // //                       <InputAdornment position="start">
// // //                         <SearchIcon />
// // //                       </InputAdornment>
// // //                     ),
// // //                     endAdornment: searchQuery && (
// // //                       <InputAdornment position="end">
// // //                         <IconButton onClick={clearSearch} size="small">
// // //                           <ClearIcon fontSize="small" />
// // //                         </IconButton>
// // //                       </InputAdornment>
// // //                     ),
// // //                   }}
// // //                 />
// // //               </Box>

// // //               {/* Status tabs */}
// // //               <Box sx={{ px: isMobile ? 1 : 2, pt: 1, width: "100%", overflow: "auto" }}>
// // //                 <Tabs
// // //                   value={activeStatus}
// // //                   onChange={handleStatusChange}
// // //                   variant="scrollable"
// // //                   scrollButtons="auto"
// // //                   allowScrollButtonsMobile
// // //                   sx={{
// // //                     minHeight: isMobile ? 40 : 48,
// // //                     "& .MuiTab-root": {
// // //                       minHeight: isMobile ? 40 : 48,
// // //                       py: 0,
// // //                     },
// // //                   }}
// // //                 >
// // //                   <Tab label="Todas" value="all" />
// // //                   {statusOptions.map((status) => (
// // //                     <Tab
// // //                       key={status}
// // //                       label={statusConfig[status as keyof typeof statusConfig].label}
// // //                       value={status}
// // //                       icon={statusConfig[status as keyof typeof statusConfig].icon}
// // //                       iconPosition="start"
// // //                       sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
// // //                     />
// // //                   ))}
// // //                 </Tabs>
// // //               </Box>

// // //               {/* Status indicators */}
// // //               {(isLoading || isUpdating) && (
// // //                 <Box
// // //                   sx={{
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     gap: 1,
// // //                     p: 1,
// // //                     mx: 1,
// // //                     mb: 1,
// // //                     backgroundColor: theme.palette.action.hover,
// // //                     borderRadius: 1,
// // //                   }}
// // //                 >
// // //                   <CircularProgress size={16} />
// // //                   <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// // //                     {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// // //                   </Typography>
// // //                 </Box>
// // //               )}
// // //             </Box>
// // //           </Collapse>

// // //           {/* Error messages */}
// // //           <Box
// // //             sx={{
// // //               px: { xs: 1, sm: 2 },
// // //               pt: { xs: 1, sm: 1 },
// // //               overflow: "auto",
// // //               flexShrink: 0,
// // //             }}
// // //           >
// // //             {error && (
// // //               <Alert severity="error" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// // //                 {error}
// // //               </Alert>
// // //             )}

// // //             {successMessage && (
// // //               <Alert severity="success" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// // //                 {successMessage}
// // //               </Alert>
// // //             )}
// // //           </Box>

// // //           {/* Main content - takes all available space */}
// // //           <Box
// // //             sx={{
// // //               flex: 1,
// // //               overflow: "auto",
// // //               display: "flex",
// // //               flexDirection: "column",
// // //               p: { xs: 0.5, sm: 2 },
// // //             }}
// // //           >
// // //             <PendingOrdersDialog open={openPendingDialog} onClose={() => setOpenPendingDialog(false)} />

// // //             {/* Orders list */}
// // //             <Box sx={{ flex: 1 }}>
// // //               {filteredOrders.length === 0 ? (
// // //                 <Box
// // //                   sx={{
// // //                     display: "flex",
// // //                     justifyContent: "center",
// // //                     alignItems: "center",
// // //                     height: "200px",
// // //                     flexDirection: "column",
// // //                     gap: 2,
// // //                   }}
// // //                 >
// // //                   <Typography variant="h6" color="text.secondary">
// // //                     No se encontraron órdenes
// // //                   </Typography>
// // //                   <Button
// // //                     variant="outlined"
// // //                     onClick={() => {
// // //                       setSearchQuery("")
// // //                       setActiveStatus("all")
// // //                     }}
// // //                   >
// // //                     Limpiar filtros
// // //                   </Button>
// // //                 </Box>
// // //               ) : viewMode === "card" ? (
// // //                 <>
// // //                   <Grid container spacing={isMobile ? 1 : 3}>
// // //                     {paginatedOrders.map((order: any) => (
// // //                       <Grid item xs={12} key={order._id || order.id}>
// // //                         <OrderCard order={order} />
// // //                       </Grid>
// // //                     ))}
// // //                   </Grid>
// // //                   <PaginationControls />
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <TableContainer
// // //                     component={Paper}
// // //                     elevation={0}
// // //                     sx={{
// // //                       position: "relative",
// // //                       overflow: "auto",
// // //                       maxWidth: "100%",
// // //                       "&:before": {
// // //                         content: '""',
// // //                         position: "absolute",
// // //                         top: 0,
// // //                         left: 0,
// // //                         right: 0,
// // //                         height: "4px",
// // //                         background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
// // //                         zIndex: 1,
// // //                       },
// // //                     }}
// // //                   >
// // //                     <Table size={isMobile ? "small" : "medium"} sx={{ minWidth: isMobile ? 450 : 650 }}>
// // //                       <TableHead>
// // //                         <TableRow>
// // //                           <TableCell>ID</TableCell>
// // //                           <TableCell>Cliente</TableCell>
// // //                           <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Estado</TableCell>
// // //                           <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Items</TableCell>
// // //                           <TableCell>Total</TableCell>
// // //                           <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Hora</TableCell>
// // //                           <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>Comentario General</TableCell>
// // //                           <TableCell>Acciones</TableCell>
// // //                         </TableRow>
// // //                       </TableHead>
// // //                       <TableBody>
// // //                         {paginatedOrders.map((order: any) => (
// // //                           <OrderRow
// // //                             key={order._id || order.id}
// // //                             order={order}
// // //                             expandedRows={expandedRows}
// // //                             onToggleExpand={handleToggleExpand}
// // //                           />
// // //                         ))}
// // //                       </TableBody>
// // //                     </Table>
// // //                   </TableContainer>
// // //                   <PaginationControls />
// // //                 </>
// // //               )}
// // //             </Box>
// // //           </Box>
// // //         </Paper>

// // //         {/* Scroll to top button */}
// // //         <Zoom in={trigger}>
// // //           <Box
// // //             onClick={scrollToTop}
// // //             role="presentation"
// // //             sx={{
// // //               position: "fixed",
// // //               bottom: 16,
// // //               right: 16,
// // //               zIndex: 1000,
// // //             }}
// // //           >
// // //             <Fab color="primary" size="small" aria-label="scroll back to top">
// // //               <KeyboardArrowUp />
// // //             </Fab>
// // //           </Box>
// // //         </Zoom>
// // //       </Box>

// // //       {/* Action Menu */}
// // //       <Menu
// // //         anchorEl={actionMenuAnchorEl}
// // //         open={Boolean(actionMenuAnchorEl)}
// // //         onClose={handleCloseActionMenu}
// // //         anchorOrigin={{
// // //           vertical: "bottom",
// // //           horizontal: "right",
// // //         }}
// // //         transformOrigin={{
// // //           vertical: "top",
// // //           horizontal: "right",
// // //         }}
// // //       >
// // //         {actionMenuOrder &&
// // //           statusConfig[actionMenuOrder.status as keyof typeof statusConfig].actions.map((action: any) => (
        
// // //             <MenuItem
// // //               key={action.action}
// // //               onClick={() => handleActionMenuItemClick(action.action)}
// // //               sx={{
// // //                 color:
// // //                   (theme.palette[action.color as keyof typeof theme.palette] as PaletteColor)?.main ??
// // //                   theme.palette.text.primary,
// // //               }}
// // //             >
// // //               <ListItemIcon sx={{ color: "inherit" }}>{action.icon}</ListItemIcon>
// // //               {action.label}
// // //             </MenuItem>
// // //           ))}
// // //         <MenuItem onClick={() => handleActionMenuItemClick("edit")}>
// // //           <ListItemIcon>
// // //             <EditIcon fontSize="small" />
// // //           </ListItemIcon>
// // //           Editar
// // //         </MenuItem>
// // //       </Menu>

// // //       {/* Edit Order Modal */}
// // //       {isEditModalOpen && selectedOrder && (
// // //         <EditOrderModal
// // //           open={isEditModalOpen}
// // //           order={selectedOrder}
// // //           onSave={saveUpdateData}
// // //           menuData={{
// // //             mainMenu: hojas?.Hoja1 || [],
// // //             promotions: hojas?.Promotion || [],
// // //           }}
// // //           onClose={handleCloseEditModal}
// // //         />
// // //       )}
// // //     </Box>
// // //   )
// // // }

// // // export default OrderSpeedGeneric



// // "use client"

// // import React, { useMemo, useState, useEffect } from "react"
// // import { useSelector } from "react-redux"
// // import type { RootState } from "../../../store/store"
// // import {
// //   Box,
// //   Button,
// //   Chip,
// //   CircularProgress,
// //   Paper,
// //   Typography,
// //   Alert,
// //   Grid,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Avatar,
// //   IconButton,
// //   Card,
// //   CardContent,
// //   Divider,
// //   Badge,
// //   Tooltip,
// //   AppBar,
// //   Toolbar,
// //   useMediaQuery,
// //   useTheme,
// //   Stack,
// //   useScrollTrigger,
// //   Fab,
// //   Zoom,
// //   TextField,
// //   InputAdornment,
// //   Pagination,
// //   Tabs,
// //   Tab,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   MenuItem,
// //   Select,
// //   FormControl,
// //   Collapse,
// //   Menu,
// //   ListItemIcon,
// //   ButtonGroup,
// //   PaletteColor,
// //   Hidden,
// // } from "@mui/material"
// // import {
// //   Edit as EditIcon,
// //   Refresh as RefreshIcon,
// //   ExpandMore as ExpandMoreIcon,
// //   ExpandLess as ExpandLessIcon,
// //   CheckCircle as CheckCircleIcon,
// //   PauseCircle as PauseCircleIcon,
// //   Cancel as CancelIcon,
// //   DeliveryDining as DeliveryIcon,
// //   PlayArrow,
// //   Pause,
// //   ViewList as ViewListIcon,
// //   ViewColumn as ViewColumnIcon,
// //   Logout as LogoutIcon,
// //   AccessTime,
// //   Person,
// //   KeyboardArrowUp,
// //   Search as SearchIcon,
// //   Clear as ClearIcon,
// //   MoreVert as MoreVertIcon,
// // } from "@mui/icons-material"
// // import { useOrdersManagementSocketApi } from "../../../hooks/useOrdersManagementSocketApi"
// // import EditOrderModal from "../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal"
// // import Image from "next/image"
// // import { clearLocalhostStorage } from "@/services/localstorage.services"
// // import { recordAttendance } from "@/services/attendance.services"
// // import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog"

// // // Status configuration
// // const statusConfig = {
// //   pending: {
// //     color: "default",
// //     icon: <PauseCircleIcon color="disabled" />,
// //     label: "Pendientes",
// //     actions: [{ action: "start", label: "Iniciar", color: "primary", icon: <PlayArrow /> }],
// //   },
// //   processing: {
// //     color: "primary",
// //     icon: <PlayArrow color="primary" />,
// //     label: "En Proceso",
// //     actions: [
// //       { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
// //       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
// //     ],
// //   },
// //   paused: {
// //     color: "warning",
// //     icon: <Pause color="warning" />,
// //     label: "Pausadas",
// //     actions: [
// //       { action: "resume", label: "Reanudar", color: "primary", icon: <PlayArrow /> },
// //       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
// //     ],
// //   },
// //   finished: {
// //     color: "success",
// //     icon: <CheckCircleIcon color="success" />,
// //     label: "Terminadas",
// //     actions: [{ action: "deliver", label: "Entregar", color: "success", icon: <DeliveryIcon /> }],
// //   },
// //   cancelled: {
// //     color: "error",
// //     icon: <CancelIcon color="error" />,
// //     label: "Canceladas",
// //     actions: [{ action: "reopen", label: "Reabrir", color: "primary", icon: <PlayArrow /> }],
// //   },
// //   delivered: {
// //     color: "success",
// //     icon: <DeliveryIcon color="success" />,
// //     label: "Entregadas",
// //     actions: [],
// //   },
// // }

// // const statusOptions = Object.keys(statusConfig)
// // const pageSizeOptions = [5, 10, 20, 50]

// // const OrderSpeedGeneric = () => {
// //   const theme = useTheme()
// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
// //   const isTablet = useMediaQuery(theme.breakpoints.down("md"))
// //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
// //   const [displayTitle, setDisplayTitle] = useState(false)
// //   const [viewMode, setViewMode] = useState<"card" | "list">(isMobile ? "card" : "list")
// //   const [openPendingDialog, setOpenPendingDialog] = useState(false)
// //   const [selectedOrder, setSelectedOrder] = useState<any>(null)
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
// //   const [searchQuery, setSearchQuery] = useState("")
// //   const [activeStatus, setActiveStatus] = useState("all")
// //   const [currentPages, setCurrentPages] = useState<Record<string, number>>(
// //     statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 })
// //   )
// //   const [expandedRows, setExpandedRows] = useState<string[]>([])
// //   const [expandedCards, setExpandedCards] = useState<string[]>([])
// //   const [pageSize, setPageSize] = useState(isMobile ? 5 : 10)
// //   const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null)
// //   const [actionMenuOrder, setActionMenuOrder] = useState<any>(null)

// //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
// //   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } }
// //   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email")

// //   const {
// //     allOrders,
// //     ordersByStatus,
// //     isConnected,
// //     isLoading,
// //     isUpdating,
// //     error,
// //     successMessage,
// //     lastRefresh,
// //     fetchHistoricalOrders,
// //     handleOrderAction,
// //     updateOrder,
// //     clearMessages,
// //   } = useOrdersManagementSocketApi({
// //     companyName: data?.companyName || "LlakaScript",
// //     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
// //     orderLimit: 50,
// //   })

// //   // Calculate totals
// //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)
// //   const pendingCount = ordersByStatus.pending?.length || 0
// //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
// //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

// //   // Filter and search orders
// //   const filteredOrders = useMemo(() => {
// //     let filtered = [...allOrders]

// //     if (activeStatus !== "all") {
// //       filtered = filtered.filter((order) => order.status === activeStatus)
// //     }

// //     if (searchQuery) {
// //       const query = searchQuery.toLowerCase()
// //       filtered = filtered.filter((order) => {
// //         return (
// //           order.fullname?.toLowerCase().includes(query) ||
// //           order.id?.toString().includes(query) ||
// //           order._id?.toString().includes(query) ||
// //           order.orderType?.toLowerCase().includes(query) ||
// //           order.dataTypeOrder?.toLowerCase().includes(query) ||
// //           order.cart.some(
// //             (item: any) =>
// //               item.name.toLowerCase().includes(query) ||
// //               (item.Description && item.Description.toLowerCase().includes(query)) ||
// //               item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query)),
// //           )
// //         )
// //       })
// //     }

// //     return filtered.sort((a, b) => {
// //       const dateA = new Date(a.createdAt || a.timestamp || 0)
// //       const dateB = new Date(b.createdAt || b.timestamp || 0)
// //       return dateB.getTime() - dateA.getTime()
// //     })
// //   }, [allOrders, activeStatus, searchQuery])

// //   // Paginate orders
// //   const paginatedOrders = useMemo(() => {
// //     const startIndex = (currentPages[activeStatus] - 1) * pageSize
// //     return filteredOrders.slice(startIndex, startIndex + pageSize)
// //   }, [filteredOrders, currentPages, activeStatus, pageSize])

// //   // Calculate page count for current status
// //   const pageCount = Math.ceil(filteredOrders.length / pageSize)

// //   // Handle page change
// //   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
// //     setCurrentPages((prev) => ({
// //       ...prev,
// //       [activeStatus]: value,
// //     }))
// //     window.scrollTo({ top: 0, behavior: "smooth" })
// //   }

// //   // Handle page size change
// //   const handlePageSizeChange = (event: any) => {
// //     const newSize = event.target.value
// //     setPageSize(newSize)
// //     const newPage = Math.floor(((currentPages[activeStatus] - 1) * pageSize) / newSize) + 1
// //     setCurrentPages((prev) => ({
// //       ...prev,
// //       [activeStatus]: newPage,
// //     }))
// //   }

// //   // Toggle functions
// //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
// //   const toggleViewMode = () => setViewMode(viewMode === "card" ? "list" : "card")

// //   // Action handlers
// //   const handleLogout = async () => {
// //     clearLocalhostStorage()
// //     await recordAttendance("getOut", user?.user?.email, data?.companyName)
// //     window.location.reload()
// //   }

// //   const handleOpenEditModal = (order: any) => {
// //     setSelectedOrder(order)
// //     setIsEditModalOpen(true)
// //   }

// //   const handleCloseEditModal = () => {
// //     setIsEditModalOpen(false)
// //     setSelectedOrder(null)
// //   }

// //   const saveUpdateData = async (updatedOrder: any) => {
// //     try {
// //       await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder)
// //       handleCloseEditModal()
// //     } catch (error) {
// //       console.error("Failed to update order:", error)
// //     }
// //   }

// //   const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
// //     setActiveStatus(newValue)
// //     setCurrentPages((prev) => ({
// //       ...prev,
// //       [newValue]: 1,
// //     }))
// //   }

// //   const clearSearch = () => {
// //     setSearchQuery("")
// //   }

// //   // Action menu handlers
// //   const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, order: any) => {
// //     event.stopPropagation()
// //     setActionMenuAnchorEl(event.currentTarget)
// //     setActionMenuOrder(order)
// //   }

// //   const handleCloseActionMenu = () => {
// //     setActionMenuAnchorEl(null)
// //     setActionMenuOrder(null)
// //   }

// //   const handleActionMenuItemClick = (action: string) => {
// //     if (actionMenuOrder) {
// //       if (action === "edit") {
// //         handleOpenEditModal(actionMenuOrder)
// //       } else {
// //         handleOrderAction(action, actionMenuOrder)
// //       }
// //       handleCloseActionMenu()
// //     }
// //   }

// //   // Toggle card expansion
// //   const toggleCardExpansion = (orderId: string) => {
// //     setExpandedCards((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
// //   }

// //   // Effects
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setDisplayTitle((prev) => !prev)
// //     }, 5000)
// //     return () => clearInterval(interval)
// //   }, [])

// //   // Scroll to top button logic
// //   const trigger = useScrollTrigger({
// //     threshold: 100,
// //   })

// //   const scrollToTop = () => {
// //     window.scrollTo({
// //       top: 0,
// //       behavior: "smooth",
// //     })
// //   }

// //   // Order Card Component - Optimizado para mobile
// //   const OrderCard = React.memo(({ order }: { order: any }) => {
// //     const status = order.status
// //     const config = statusConfig[status as keyof typeof statusConfig]
// //     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
// //     const total = order.cart.reduce((sum: any, item: any) => {
// //       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
// //       return sum + item.price * item.quantity + extrasTotal
// //     }, 0)

// //     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     })

// //     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette]
// //     const orderId = order._id || order.id
// //     const isExpanded = expandedCards.includes(orderId)

// //     return (
// //       <Card
// //         sx={{
// //           borderLeft: "4px solid",
// //           borderColor: paletteColor?.main || "grey",
// //           mb: 2,
// //           position: "relative",
// //           transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
// //           "&:hover": {
// //             transform: isMobile ? "none" : "translateY(-2px)",
// //             boxShadow: isMobile ? "none" : theme.shadows[4],
// //           },
// //         }}
// //       >
// //         <CardContent sx={{ p: isMobile ? 1 : 2 }}>
// //           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
// //             <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold">
// //               #{order.id || order._id.slice(-4)}
// //             </Typography>
// //             <Chip
// //               size={isMobile ? "small" : "medium"}
// //               label={`${order.orderType}${order.dataTypeOrder ? ` / ${order.dataTypeOrder}` : ""}`}
// //               color={config.color as any}
// //               icon={React.cloneElement(config.icon, { fontSize: isMobile ? "small" : "medium" })}
// //             />
// //           </Box>

// //           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
// //             <Person fontSize={isMobile ? "small" : "medium"} sx={{ mr: 0.5, opacity: 0.7 }} />
// //             <Typography variant={isMobile ? "caption" : "body2"} noWrap sx={{ maxWidth: isMobile ? "100px" : "150px" }}>
// //               {order.fullname}
// //             </Typography>
// //             <Box sx={{ flexGrow: 1 }} />
// //             <AccessTime fontSize={isMobile ? "small" : "medium"} sx={{ mr: 0.5, opacity: 0.7 }} />
// //             <Typography variant={isMobile ? "caption" : "body2"}>{formattedTime}</Typography>
// //           </Box>

// //           <Divider sx={{ my: 1 }} />

// //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
// //             <Typography variant={isMobile ? "caption" : "subtitle2"}>Items ({totalItems})</Typography>
// //             {order.cart.length > (isMobile ? 1 : 2) && !isExpanded && (
// //               <Button
// //                 size="small"
// //                 variant="text"
// //                 onClick={() => toggleCardExpansion(orderId)}
// //                 endIcon={<ExpandMoreIcon fontSize={isMobile ? "small" : "medium"} />}
// //                 sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
// //               >
// //                 Ver todos
// //               </Button>
// //             )}
// //             {isExpanded && (
// //               <Button
// //                 size="small"
// //                 variant="text"
// //                 onClick={() => toggleCardExpansion(orderId)}
// //                 endIcon={<ExpandLessIcon fontSize={isMobile ? "small" : "medium"} />}
// //                 sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
// //               >
// //                 Colapsar
// //               </Button>
// //             )}
// //           </Box>

// //           <List dense disablePadding>
// //             {order.cart.slice(0, isExpanded ? undefined : isMobile ? 1 : 3).map((item: any) => (
// //               <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.25 }}>
// //                 <ListItemText
// //                   primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
// //                   secondaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
// //                   primary={
// //                     <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
// //                       <Box sx={{ flex: 1, mr: 1 }}>
// //                         <Typography component="span" variant="inherit">
// //                           <strong>{item.quantity}x</strong> {item.name}
// //                         </Typography>
// //                         {item.Description && (
// //                           <Typography variant="inherit" display="block" sx={{ mt: 0.5, color: "text.secondary" }}>
// //                             {item.Description}
// //                           </Typography>
// //                         )}
// //                       </Box>
// //                       <Typography component="span" variant="inherit" sx={{ whiteSpace: "nowrap" }}>
// //                         ${item.price.toFixed(2)}
// //                       </Typography>
// //                     </Box>
// //                   }
// //                   secondary={
// //                     item.extras?.length > 0 && (
// //                       <List dense disablePadding sx={{ ml: isMobile ? 0 : 2 }}>
// //                         {item.extras.map((extra: any, idx: number) => (
// //                           <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0 }}>
// //                             <ListItemText
// //                               primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
// //                               primary={
// //                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// //                                   <Typography variant="inherit">+ {extra.name}</Typography>
// //                                   <Typography variant="inherit">${extra.price.toFixed(2)}</Typography>
// //                                 </Box>
// //                               }
// //                             />
// //                           </ListItem>
// //                         ))}
// //                         {item?.comments && (
// //                           <ListItemText
// //                             primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
// //                             primary={
// //                               <Box sx={{ mt: 0.5 }}>
// //                                 <Typography variant="inherit">
// //                                   <strong>Comentario: </strong>
// //                                   {item?.comments}
// //                                 </Typography>
// //                               </Box>
// //                             }
// //                           />
// //                         )}
// //                       </List>
// //                     )
// //                   }
// //                 />
// //               </ListItem>
// //             ))}
// //             {!isExpanded && order.cart.length > (isMobile ? 1 : 3) && (
// //               <Typography
// //                 variant="caption"
// //                 color="text.secondary"
// //                 sx={{ display: "block", mt: 1, cursor: "pointer", fontSize: isMobile ? "0.7rem" : "0.8rem" }}
// //                 onClick={() => toggleCardExpansion(orderId)}
// //               >
// //                 +{order.cart.length - (isMobile ? 1 : 3)} más...
// //               </Typography>
// //             )}
// //           </List>

// //           {order?.comments && (
// //             <>
// //               <Divider sx={{ my: 1 }} />
// //               <Box sx={{ mb: 1 }}>
// //                 <Typography variant={isMobile ? "caption" : "body2"} sx={{ display: "block" }}>
// //                   <strong>Comentario General: </strong> {order?.comments}
// //                 </Typography>
// //               </Box>
// //             </>
// //           )}
          
// //           <Divider sx={{ my: 1 }} />

// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               flexDirection: isMobile ? "column" : "row",
// //               gap: isMobile ? 1 : 0,
// //             }}
// //           >
// //             <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold">
// //               Total: ${total.toFixed(2)}
// //             </Typography>

// //             {isMobile ? (
// //               <Box sx={{ width: "100%" }}>
// //                 {config.actions.length > 0 ? (
// //                   <ButtonGroup fullWidth variant="contained" size="small">
// //                     {config.actions.slice(0, 1).map((action: any, idx: number) => (
// //                       <Button
// //                         key={`${action.action}-${idx}`}
// //                         color={action.color as any}
// //                         startIcon={React.cloneElement(action.icon, { fontSize: "small" })}
// //                         onClick={(e) => {
// //                           e.stopPropagation()
// //                           handleOrderAction(action.action, order)
// //                         }}
// //                         disabled={isUpdating}
// //                         sx={{ flex: 1, fontSize: "0.75rem" }}
// //                       >
// //                         {action.label}
// //                       </Button>
// //                     ))}
// //                     <Button
// //                       color="primary"
// //                       variant="outlined"
// //                       onClick={(e) => handleOpenActionMenu(e, order)}
// //                       disabled={isUpdating}
// //                       sx={{ maxWidth: "40px", minWidth: "40px" }}
// //                     >
// //                       <MoreVertIcon fontSize="small" />
// //                     </Button>
// //                   </ButtonGroup>
// //                 ) : (
// //                   <Button
// //                     size="small"
// //                     variant="outlined"
// //                     color="primary"
// //                     startIcon={<EditIcon fontSize="small" />}
// //                     onClick={(e) => {
// //                       e.stopPropagation()
// //                       handleOpenEditModal(order)
// //                     }}
// //                     disabled={isUpdating}
// //                     fullWidth
// //                     sx={{ fontSize: "0.75rem" }}
// //                   >
// //                     Editar
// //                   </Button>
// //                 )}
// //               </Box>
// //             ) : (
// //               <Stack direction="row" spacing={1} width="auto">
// //                 {config.actions.map((action: any, idx: number) => (
// //                   <Button
// //                     key={`${action.action}-${idx}`}
// //                     size="small"
// //                     variant="contained"
// //                     color={action.color as any}
// //                     startIcon={action.icon}
// //                     onClick={(e) => {
// //                       e.stopPropagation()
// //                       handleOrderAction(action.action, order)
// //                     }}
// //                     disabled={isUpdating}
// //                     sx={{ fontSize: "0.75rem" }}
// //                   >
// //                     {action.label}
// //                   </Button>
// //                 ))}

// //                 <Button
// //                   size="small"
// //                   variant="outlined"
// //                   color="primary"
// //                   startIcon={<EditIcon fontSize="small" />}
// //                   onClick={(e) => {
// //                     e.stopPropagation()
// //                     handleOpenEditModal(order)
// //                   }}
// //                   disabled={isUpdating}
// //                   sx={{ fontSize: "0.75rem" }}
// //                 >
// //                   Editar
// //                 </Button>
// //               </Stack>
// //             )}
// //           </Box>
// //         </CardContent>
// //       </Card>
// //     )
// //   })

// //   const handleToggleExpand = (orderId: string) => {
// //     setExpandedRows((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
// //   }

// //   const OrderRow = React.memo(
// //     ({
// //       order,
// //       expandedRows,
// //       onToggleExpand,
// //     }: {
// //       order: any
// //       expandedRows: string[]
// //       onToggleExpand: (id: string) => void
// //     }) => {
// //       const status = order.status
// //       const config = statusConfig[status as keyof typeof statusConfig]
// //       const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
// //       const total = order.cart.reduce((sum: any, item: any) => {
// //         const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
// //         return sum + item.price * item.quantity + extrasTotal
// //       }, 0)

// //       const commentsOrderGeneral = order?.comments
// //       const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
// //         hour: "2-digit",
// //         minute: "2-digit",
// //       })

// //       const orderId = order._id || order.id
// //       const isExpanded = expandedRows.includes(orderId)

// //       const toggleExpand = (e: React.MouseEvent) => {
// //         e.stopPropagation()
// //         onToggleExpand(orderId)
// //       }

// //       return (
// //         <>
// //           <TableRow
// //             sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
// //             onClick={toggleExpand}
// //           >
// //             <TableCell>
// //               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //                 <IconButton size="small" onClick={toggleExpand}>
// //                   {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
// //                 </IconButton>
// //                 <Typography variant="body2" fontWeight="bold" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //                   #{order.id || order._id.slice(-4)}
// //                 </Typography>
// //               </Box>
// //             </TableCell>
// //             <TableCell>
// //               <Box sx={{ display: "flex", alignItems: "center" }}>
// //                 <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
// //                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px", fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //                   {order.fullname}
// //                 </Typography>
// //               </Box>
// //             </TableCell>
// //             <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
// //               <Chip
// //                 size="small"
// //                 label={`${order.orderType}${order.dataTypeOrder ? ` / ${order.dataTypeOrder}` : ""}`}
// //                 color={config.color as any}
// //                 icon={React.cloneElement(config.icon, { fontSize: "small" })}
// //                 sx={{ fontSize: isMobile ? "0.7rem" : "0.8rem" }}
// //               />
// //             </TableCell>
// //             <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
// //               <Typography variant="body2" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //                 {totalItems} items
// //               </Typography>
// //             </TableCell>
// //             <TableCell>
// //               <Typography variant="body2" fontWeight="bold" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //                 ${total.toFixed(2)}
// //               </Typography>
// //             </TableCell>
// //             <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
// //               <Typography variant="body2" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //                 {formattedTime}
// //               </Typography>
// //             </TableCell>
// //             <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
// //               <Tooltip title={commentsOrderGeneral || "Sin comentarios"} arrow>
// //                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px", fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //                   {commentsOrderGeneral || "-"}
// //                 </Typography>
// //               </Tooltip>
// //             </TableCell>
// //             <TableCell>
// //               {isMobile ? (
// //                 <IconButton size="small" color="primary" onClick={(e) => handleOpenActionMenu(e, order)}>
// //                   <MoreVertIcon fontSize="small" />
// //                 </IconButton>
// //               ) : (
// //                 <Stack
// //                   direction="row"
// //                   spacing={1}
// //                   sx={{
// //                     minWidth: "120px",
// //                     "& .MuiIconButton-root": {
// //                       mx: 0,
// //                     },
// //                   }}
// //                 >
// //                   {config.actions.map((action: any, idx: number) => (
// //                     <Tooltip key={`${action.action}-${idx}`} title={action.label}>
// //                       <IconButton
// //                         size="small"
// //                         color={action.color as any}
// //                         onClick={(e) => {
// //                           e.stopPropagation()
// //                           handleOrderAction(action.action, order)
// //                         }}
// //                         disabled={isUpdating}
// //                       >
// //                         {React.cloneElement(action.icon, { fontSize: "small" })}
// //                       </IconButton>
// //                     </Tooltip>
// //                   ))}
// //                   <Tooltip title="Editar">
// //                     <IconButton
// //                       size="small"
// //                       color="primary"
// //                       onClick={(e) => {
// //                         e.stopPropagation()
// //                         handleOpenEditModal(order)
// //                       }}
// //                       disabled={isUpdating}
// //                     >
// //                       <EditIcon fontSize="small" />
// //                     </IconButton>
// //                   </Tooltip>
// //                 </Stack>
// //               )}
// //             </TableCell>
// //           </TableRow>

// //           {/* Expanded details row */}
// //           <TableRow>
// //             <TableCell style={{ padding: 0 }} colSpan={8}>
// //               <Collapse in={isExpanded} timeout="auto" unmountOnExit>
// //                 <Box
// //                   sx={{
// //                     p: { xs: 1, sm: 3 },
// //                     backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
// //                     borderBottom: `1px solid ${theme.palette.divider}`,
// //                   }}
// //                 >
// //                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, fontSize: isMobile ? "0.875rem" : "1rem" }}>
// //                     Detalles de la Orden
// //                   </Typography>

// //                   <Grid container spacing={2}>
// //                     <Grid item xs={12} md={6}>
// //                       <Typography variant="subtitle2" gutterBottom sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
// //                         Productos:
// //                       </Typography>
// //                       <List dense disablePadding>
// //                         {order.cart.map((item: any, index: number) => (
// //                           <React.Fragment key={`${item.id}-${index}`}>
// //                             <ListItem disablePadding sx={{ py: 0.5 }}>
// //                               <ListItemText
// //                                 primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
// //                                 secondaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
// //                                 primary={
// //                                   <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
// //                                     <Box sx={{ flex: 1, mr: 1 }}>
// //                                       <Typography component="span" variant="inherit">
// //                                         <strong>{item.quantity}x</strong> {item.name}
// //                                       </Typography>
// //                                       {item.Description && (
// //                                         <Typography
// //                                           variant="inherit"
// //                                           display="block"
// //                                           sx={{ mt: 0.5, color: "text.secondary" }}
// //                                         >
// //                                           {item.Description}
// //                                         </Typography>
// //                                       )}
// //                                     </Box>
// //                                     <Typography component="span" variant="inherit">
// //                                       ${(item.price * item.quantity).toFixed(2)}
// //                                     </Typography>
// //                                   </Box>
// //                                 }
// //                                 secondary={
// //                                   <div>
// //                                     {item.extras?.length > 0 && (
// //                                       <List dense disablePadding sx={{ ml: isMobile ? 0 : 2, mt: 0.5 }}>
// //                                         {item?.extras?.map((extra: any, idx: number) => (
// //                                           <ListItem key={`${item.id}-extra-${idx}`} disablePadding sx={{ py: 0 }}>
// //                                             <ListItemText
// //                                               primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
// //                                               primary={
// //                                                 <Box
// //                                                   sx={{
// //                                                     display: "flex",
// //                                                     justifyContent: "space-between",
// //                                                     alignItems: "center",
// //                                                   }}
// //                                                 >
// //                                                   <Typography variant="inherit">+ {extra.name}</Typography>
// //                                                   <Typography variant="inherit">${extra.price.toFixed(2)}</Typography>
// //                                                 </Box>
// //                                               }
// //                                             />
// //                                           </ListItem>
// //                                         ))}
// //                                       </List>
// //                                     )}
// //                                     {item?.comments && (
// //                                       <Box sx={{ mt: 1 }}>
// //                                         <Typography variant="inherit">
// //                                           <strong>Comentarios:</strong> {item?.comments || "Sin comentarios"}
// //                                         </Typography>
// //                                       </Box>
// //                                     )}
// //                                   </div>
// //                                 }
// //                               />
// //                             </ListItem>
// //                             <Divider sx={{ my: 0.5 }} />
// //                           </React.Fragment>
// //                         ))}
// //                       </List>
// //                     </Grid>

// //                     <Grid item xs={12} md={6}>
// //                       <Typography variant="subtitle2" gutterBottom sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
// //                         Información Adicional:
// //                       </Typography>
// //                       <List dense disablePadding>
// //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// //                           <ListItemText
// //                             primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
// //                             primary={
// //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// //                                 <Typography variant="inherit">
// //                                   <strong>Estado:</strong>
// //                                 </Typography>
// //                                 <Chip
// //                                   size="small"
// //                                   label={config.label}
// //                                   color={config.color as any}
// //                                   icon={React.cloneElement(config.icon, { fontSize: "small" })}
// //                                   sx={{ fontSize: isMobile ? "0.7rem" : "0.8rem" }}
// //                                 />
// //                               </Box>
// //                             }
// //                           />
// //                         </ListItem>
// //                         <Divider sx={{ my: 0.5 }} />

// //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// //                           <ListItemText
// //                             primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
// //                             primary={
// //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// //                                 <Typography variant="inherit">
// //                                   <strong>Total:</strong>
// //                                 </Typography>
// //                                 <Typography variant="inherit" fontWeight="bold">
// //                                   ${total.toFixed(2)}
// //                                 </Typography>
// //                               </Box>
// //                             }
// //                           />
// //                         </ListItem>
// //                         <Divider sx={{ my: 0.5 }} />

// //                         {commentsOrderGeneral && (
// //                           <>
// //                             <ListItem disablePadding sx={{ py: 0.5 }}>
// //                               <ListItemText
// //                                 primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
// //                                 primary={
// //                                   <Box>
// //                                     <Typography variant="inherit">
// //                                       <strong>Comentarios:</strong>
// //                                     </Typography>
// //                                     <Typography variant="inherit" sx={{ mt: 0.5 }}>
// //                                       {commentsOrderGeneral}
// //                                     </Typography>
// //                                   </Box>
// //                                 }
// //                               />
// //                             </ListItem>
// //                             <Divider sx={{ my: 0.5 }} />
// //                           </>
// //                         )}

// //                         <ListItem disablePadding sx={{ py: 0.5 }}>
// //                           <ListItemText
// //                             primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
// //                             primary={
// //                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// //                                 <Typography variant="inherit">
// //                                   <strong>Hora:</strong>
// //                                 </Typography>
// //                                 <Typography variant="inherit">{formattedTime}</Typography>
// //                               </Box>
// //                             }
// //                           />
// //                         </ListItem>
// //                       </List>
// //                     </Grid>
// //                   </Grid>
// //                 </Box>
// //               </Collapse>
// //             </TableCell>
// //           </TableRow>
// //         </>
// //       )
// //     },
// //   )

// //   // Custom Pagination Controls
// //   const PaginationControls = () => (
// //     <Box
// //       sx={{
// //         display: "flex",
// //         justifyContent: "space-between",
// //         alignItems: "center",
// //         mt: 3,
// //         pb: 2,
// //         flexDirection: isMobile ? "column" : "row",
// //         gap: isMobile ? 2 : 0,
// //       }}
// //     >
// //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //         <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //           Órdenes por página:
// //         </Typography>
// //         <FormControl size="small" variant="outlined">
// //           <Select
// //             value={pageSize}
// //             onChange={handlePageSizeChange}
// //             sx={{ height: "36px", fontSize: isMobile ? "0.75rem" : "0.875rem" }}
// //           >
// //             {pageSizeOptions.map((size) => (
// //               <MenuItem key={size} value={size} sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //                 {size}
// //               </MenuItem>
// //             ))}
// //           </Select>
// //         </FormControl>
// //       </Box>

// //       <Pagination
// //         count={pageCount}
// //         page={currentPages[activeStatus]}
// //         onChange={handlePageChange}
// //         color="primary"
// //         size={isMobile ? "small" : "medium"}
// //         showFirstButton={!isMobile}
// //         showLastButton={!isMobile}
// //         siblingCount={isMobile ? 0 : 1}
// //         boundaryCount={isMobile ? 1 : 2}
// //       />

// //       <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //         Mostrando {filteredOrders.length > 0 ? (currentPages[activeStatus] - 1) * pageSize + 1 : 0}-
// //         {Math.min(currentPages[activeStatus] * pageSize, filteredOrders.length)} de {filteredOrders.length} órdenes
// //       </Typography>
// //     </Box>
// //   )

// //   return (
// //     <Box
// //       sx={{
// //         height: "100vh",
// //         overflow: "hidden",
// //         bgcolor: theme.palette.background.default,
// //         display: "flex",
// //         flexDirection: "column",
// //       }}
// //     >
// //       {/* Custom AppBar */}
// //       <AppBar
// //         position="sticky"
// //         elevation={0}
// //         sx={{
// //           bgcolor: "background.paper",
// //           color: "text.primary",
// //           borderBottom: 1,
// //           borderColor: "divider",
// //         }}
// //       >
// //         <Toolbar
// //           variant="dense"
// //           sx={{
// //             minHeight: isMobile ? 48 : 56,
// //             flexDirection: isMobile ? "column" : "row",
// //             py: isMobile ? 1 : 0,
// //             px: isMobile ? 1 : 2,
// //           }}
// //         >
// //           {/* Logo and Title */}
// //           <Box
// //             sx={{
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 1,
// //               flexGrow: 1,
// //               height: "40px",
// //               position: "relative",
// //               overflow: "hidden",
// //               width: isMobile ? "100%" : "auto",
// //             }}
// //           >
// //             <Avatar
// //               sx={{
// //                 width: 28,
// //                 height: 28,
// //                 flexShrink: 0,
// //                 ml: 0.5,
// //               }}
// //             >
// //               <Image
// //                 src={"/images/flama.png"}
// //                 alt={"LlakaScript"}
// //                 width={28}
// //                 height={28}
// //                 priority
// //                 style={{
// //                   objectFit: "contain",
// //                   width: "100%",
// //                   height: "100%",
// //                 }}
// //               />
// //             </Avatar>

// //             <Box
// //               sx={{
// //                 position: "relative",
// //                 width: "auto",
// //                 height: "100%",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 flexGrow: 1,
// //               }}
// //             >
// //               <Typography
// //                 variant={isMobile ? "subtitle1" : "h6"}
// //                 sx={{
// //                   fontWeight: 600,
// //                   lineHeight: 1.1,
// //                   fontSize: isMobile ? "1rem" : undefined,
// //                 }}
// //               >
// //                 {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
// //               </Typography>
// //             </Box>
// //           </Box>

// //           {/* Right side controls */}
// //           <Box
// //             sx={{
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 0.5,
// //               width: isMobile ? "100%" : "auto",
// //               justifyContent: isMobile ? "space-between" : "flex-end",
// //               mt: isMobile ? 1 : 0,
// //             }}
// //           >
// //             {/* View mode toggle */}
// //             <Tooltip title={viewMode === "card" ? "Vista lista" : "Vista tarjetas"}>
// //               <IconButton size="small" onClick={toggleViewMode} color="default">
// //                 {viewMode === "card" ? (
// //                   <ViewListIcon fontSize={isMobile ? "small" : "medium"} />
// //                 ) : (
// //                   <ViewColumnIcon fontSize={isMobile ? "small" : "medium"} />
// //                 )}
// //               </IconButton>
// //             </Tooltip>

// //             {/* Connection status indicator */}
// //             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
// //               <Box
// //                 sx={{
// //                   width: 10,
// //                   height: 10,
// //                   borderRadius: "50%",
// //                   bgcolor: isConnected ? "success.main" : "error.main",
// //                   mr: 1,
// //                 }}
// //               />
// //             </Tooltip>

// //             {/* Order count badge */}
// //             {isMobile && totalOrders > 0 && (
// //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// //                 <Box sx={{ width: 4, height: 4 }} />
// //               </Badge>
// //             )}

// //             {/* Last refresh time - hidden on mobile */}
// //             {lastRefresh && !isMobile && (
// //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap", fontSize: "0.75rem" }}>
// //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// //               </Typography>
// //             )}

// //             {/* Refresh button */}
// //             <Tooltip title="Actualizar">
// //               <IconButton
// //                 color="primary"
// //                 size="small"
// //                 onClick={fetchHistoricalOrders}
// //                 disabled={isLoading || isUpdating}
// //               >
// //                 <RefreshIcon fontSize={isMobile ? "small" : "medium"} />
// //               </IconButton>
// //             </Tooltip>

// //             {/* Header collapse toggle (mobile only) */}
// //             {isMobile && (
// //               <IconButton size="small" onClick={toggleHeader}>
// //                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
// //               </IconButton>
// //             )}

// //             <Tooltip title="Salir">
// //               <IconButton size="small" onClick={handleLogout} color="default">
// //                 <LogoutIcon fontSize={isMobile ? "small" : "medium"} />
// //               </IconButton>
// //             </Tooltip>
// //           </Box>
// //         </Toolbar>
// //       </AppBar>

// //       {/* Main content */}
// //       <Box
// //         component="main"
// //         sx={{
// //         //   p: { xs: 0.5, sm: 2 },
// //           flex: 1,
// //           overflow: "auto",
// //           display: "flex",
// //           flexDirection: "column",
// //         }}
// //       >
// //         <Paper
// //           elevation={isMobile ? 1 : 3}
// //           sx={{
// //             height: "100%",
// //             display: "flex",
// //             flexDirection: "column",
// //             overflow: "hidden",
// //             borderRadius: { xs: 1, sm: 2 },
// //           }}
// //         >
// //           {/* Status header - collapsible on mobile */}
// //           <Collapse in={!headerCollapsed} timeout="auto">
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 borderBottom: "1px solid",
// //                 borderColor: theme.palette.divider,
// //                 overflow: "hidden",
// //               }}
// //             >
// //               {/* Search bar */}
// //               <Box sx={{ p: isMobile ? 1 : 2, pb: 0, width: "100%" }}>
// //                 <TextField
// //                   fullWidth
// //                   size={isMobile ? "small" : "medium"}
// //                   variant="outlined"
// //                   placeholder="Buscar órdenes..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   InputProps={{
// //                     startAdornment: (
// //                       <InputAdornment position="start">
// //                         <SearchIcon fontSize={isMobile ? "small" : "medium"} />
// //                       </InputAdornment>
// //                     ),
// //                     endAdornment: searchQuery && (
// //                       <InputAdornment position="end">
// //                         <IconButton onClick={clearSearch} size="small">
// //                           <ClearIcon fontSize={isMobile ? "small" : "medium"} />
// //                         </IconButton>
// //                       </InputAdornment>
// //                     ),
// //                   }}
// //                 />
// //               </Box>

// //               {/* Status tabs */}
// //               <Box sx={{ px: isMobile ? 1 : 2, pt: 1, width: "100%", overflow: "auto" }}>
// //                 <Tabs
// //                   value={activeStatus}
// //                   onChange={handleStatusChange}
// //                   variant="scrollable"
// //                   scrollButtons="auto"
// //                   allowScrollButtonsMobile
// //                   sx={{
// //                     minHeight: isMobile ? 40 : 48,
// //                     "& .MuiTab-root": {
// //                       minHeight: isMobile ? 40 : 48,
// //                       py: 0,
// //                       fontSize: isMobile ? "0.7rem" : "0.8rem",
// //                       px: isMobile ? 0.5 : 1,
// //                     },
// //                   }}
// //                 >
// //                   <Tab label="Todas" value="all" />
// //                   {statusOptions.map((status) => (
// //                     <Tab
// //                       key={status}
// //                       label={statusConfig[status as keyof typeof statusConfig].label}
// //                       value={status}
// //                       icon={React.cloneElement(statusConfig[status as keyof typeof statusConfig].icon, {
// //                         fontSize: isMobile ? "small" : "medium",
// //                       })}
// //                       iconPosition="start"
// //                     />
// //                   ))}
// //                 </Tabs>
// //               </Box>

// //               {/* Status indicators */}
// //               {(isLoading || isUpdating) && (
// //                 <Box
// //                   sx={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: 1,
// //                     p: 1,
// //                     mx: 1,
// //                     mb: 1,
// //                     backgroundColor: theme.palette.action.hover,
// //                     borderRadius: 1,
// //                   }}
// //                 >
// //                   <CircularProgress size={16} />
// //                   <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// //                     {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// //                   </Typography>
// //                 </Box>
// //               )}
// //             </Box>
// //           </Collapse>

// //           {/* Error messages */}
// //           <Box
// //             sx={{
// //               px: { xs: 1, sm: 2 },
// //               pt: { xs: 1, sm: 1 },
// //               overflow: "auto",
// //               flexShrink: 0,
// //             }}
// //           >
// //             {error && (
// //               <Alert severity="error" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// //                 {error}
// //               </Alert>
// //             )}

// //             {successMessage && (
// //               <Alert severity="success" onClose={() => clearMessages()} sx={{ mb: 1 }}>
// //                 {successMessage}
// //               </Alert>
// //             )}
// //           </Box>

// //           {/* Main content - takes all available space */}
// //           <Box
// //             sx={{
// //               flex: 1,
// //               overflow: "auto",
// //               display: "flex",
// //               flexDirection: "column",
// //               p: { xs: 0.5, sm: 2 },
// //             }}
// //           >
// //             <PendingOrdersDialog open={openPendingDialog} onClose={() => setOpenPendingDialog(false)} />

// //             {/* Orders list */}
// //             <Box sx={{ flex: 1 }}>
// //               {filteredOrders.length === 0 ? (
// //                 <Box
// //                   sx={{
// //                     display: "flex",
// //                     justifyContent: "center",
// //                     alignItems: "center",
// //                     height: "200px",
// //                     flexDirection: "column",
// //                     gap: 2,
// //                   }}
// //                 >
// //                   <Typography variant="h6" color="text.secondary" sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}>
// //                     No se encontraron órdenes
// //                   </Typography>
// //                   <Button
// //                     variant="outlined"
// //                     size={isMobile ? "small" : "medium"}
// //                     onClick={() => {
// //                       setSearchQuery("")
// //                       setActiveStatus("all")
// //                     }}
// //                   >
// //                     Limpiar filtros
// //                   </Button>
// //                 </Box>
// //               ) : viewMode === "card" ? (
// //                 <>
// //                   <Grid container spacing={isMobile ? 1 : 2}>
// //                     {paginatedOrders.map((order: any) => (
// //                       <Grid item xs={12} sm={isTablet ? 12 : 6} lg={4} key={order._id || order.id}>
// //                         <OrderCard order={order} />
// //                       </Grid>
// //                     ))}
// //                   </Grid>
// //                   <PaginationControls />
// //                 </>
// //               ) : (
// //                 <>
// //                   <TableContainer
// //                     component={Paper}
// //                     elevation={0}
// //                     sx={{
// //                       position: "relative",
// //                       overflow: "auto",
// //                       maxWidth: "100%",
// //                       "&:before": {
// //                         content: '""',
// //                         position: "absolute",
// //                         top: 0,
// //                         left: 0,
// //                         right: 0,
// //                         height: "4px",
// //                         background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
// //                         zIndex: 1,
// //                       },
// //                     }}
// //                   >
// //                     <Table size={isMobile ? "small" : "medium"} sx={{ minWidth: isMobile ? 450 : 650 }}>
// //                       <TableHead>
// //                         <TableRow>
// //                           <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>ID</TableCell>
// //                           <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>Cliente</TableCell>
// //                           <TableCell sx={{ display: { xs: "none", sm: "table-cell" }, fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //                             Estado
// //                           </TableCell>
// //                           <TableCell sx={{ display: { xs: "none", md: "table-cell" }, fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //                             Items
// //                           </TableCell>
// //                           <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>Total</TableCell>
// //                           <TableCell sx={{ display: { xs: "none", md: "table-cell" }, fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //                             Hora
// //                           </TableCell>
// //                           <TableCell sx={{ display: { xs: "none", lg: "table-cell" }, fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
// //                             Comentario General
// //                           </TableCell>
// //                           <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>Acciones</TableCell>
// //                         </TableRow>
// //                       </TableHead>
// //                       <TableBody>
// //                         {paginatedOrders.map((order: any) => (
// //                           <OrderRow
// //                             key={order._id || order.id}
// //                             order={order}
// //                             expandedRows={expandedRows}
// //                             onToggleExpand={handleToggleExpand}
// //                           />
// //                         ))}
// //                       </TableBody>
// //                     </Table>
// //                   </TableContainer>
// //                   <PaginationControls />
// //                 </>
// //               )}
// //             </Box>
// //           </Box>
// //         </Paper>

// //         {/* Scroll to top button */}
// //         <Zoom in={trigger}>
// //           <Box
// //             onClick={scrollToTop}
// //             role="presentation"
// //             sx={{
// //               position: "fixed",
// //               bottom: 16,
// //               right: 16,
// //               zIndex: 1000,
// //             }}
// //           >
// //             <Fab color="primary" size="small" aria-label="scroll back to top">
// //               <KeyboardArrowUp />
// //             </Fab>
// //           </Box>
// //         </Zoom>
// //       </Box>

// //       {/* Action Menu */}
// //       <Menu
// //         anchorEl={actionMenuAnchorEl}
// //         open={Boolean(actionMenuAnchorEl)}
// //         onClose={handleCloseActionMenu}
// //         anchorOrigin={{
// //           vertical: "bottom",
// //           horizontal: "right",
// //         }}
// //         transformOrigin={{
// //           vertical: "top",
// //           horizontal: "right",
// //         }}
// //         PaperProps={{
// //           sx: {
// //             minWidth: 180,
// //           },
// //         }}
// //       >
// //         {actionMenuOrder &&
// //           statusConfig[actionMenuOrder.status as keyof typeof statusConfig].actions.map((action: any) => (
// //             <MenuItem
// //               key={action.action}
// //               onClick={() => handleActionMenuItemClick(action.action)}
// //               sx={{
// //                 color:
// //                   (theme.palette[action.color as keyof typeof theme.palette] as PaletteColor)?.main ??
// //                   theme.palette.text.primary,
// //                 fontSize: "0.875rem",
// //               }}
// //             >
// //               <ListItemIcon sx={{ color: "inherit", minWidth: "36px" }}>
// //                 {React.cloneElement(action.icon, { fontSize: "small" })}
// //               </ListItemIcon>
// //               {action.label}
// //             </MenuItem>
// //           ))}
// //         <MenuItem onClick={() => handleActionMenuItemClick("edit")} sx={{ fontSize: "0.875rem" }}>
// //           <ListItemIcon sx={{ minWidth: "36px" }}>
// //             <EditIcon fontSize="small" />
// //           </ListItemIcon>
// //           Editar
// //         </MenuItem>
// //       </Menu>

// //       {/* Edit Order Modal */}
// //       {isEditModalOpen && selectedOrder && (
// //         <EditOrderModal
// //           open={isEditModalOpen}
// //           order={selectedOrder}
// //           onSave={saveUpdateData}
// //           menuData={{
// //             mainMenu: hojas?.Hoja1 || [],
// //             promotions: hojas?.Promotion || [],
// //           }}
// //           onClose={handleCloseEditModal}
// //         //   fullScreen={isMobile}
// //         />
// //       )}
// //     </Box>
// //   )
// // }

// // export default OrderSpeedGeneric


// "use client"

// import React, { useMemo, useState, useEffect } from "react"
// import { useSelector } from "react-redux"
// import type { RootState } from "../../../store/store"
// import {
//   Box,
//   Button,
//   Chip,
//   CircularProgress,
//   Paper,
//   Typography,
//   Alert,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   Avatar,
//   IconButton,
//   Card,
//   CardContent,
//   Divider,
//   Badge,
//   Tooltip,
//   AppBar,
//   Toolbar,
//   useMediaQuery,
//   useTheme,
//   Stack,
//   useScrollTrigger,
//   Fab,
//   Zoom,
//   TextField,
//   InputAdornment,
//   Pagination,
//   Tabs,
//   Tab,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   MenuItem,
//   Select,
//   FormControl,
//   Collapse,
//   Menu,
//   ListItemIcon,
//   ButtonGroup,
//   PaletteColor,
// } from "@mui/material"
// import {
//   Edit as EditIcon,
//   Refresh as RefreshIcon,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
//   CheckCircle as CheckCircleIcon,
//   PauseCircle as PauseCircleIcon,
//   Cancel as CancelIcon,
//   DeliveryDining as DeliveryIcon,
//   PlayArrow,
//   Pause,
//   ViewList as ViewListIcon,
//   ViewColumn as ViewColumnIcon,
//   Logout as LogoutIcon,
//   AccessTime,
//   Person,
//   KeyboardArrowUp,
//   Search as SearchIcon,
//   Clear as ClearIcon,
//   MoreVert as MoreVertIcon,
// } from "@mui/icons-material"
// import { useOrdersManagementSocketApi } from "../../../hooks/useOrdersManagementSocketApi"
// import EditOrderModal from "../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal"
// import Image from "next/image"
// import { clearLocalhostStorage } from "@/services/localstorage.services"
// import { recordAttendance } from "@/services/attendance.services"
// import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog"

// // Status configuration
// const statusConfig = {
//   pending: {
//     color: "default",
//     icon: <PauseCircleIcon color="disabled" />,
//     label: "Pendientes",
//     actions: [{ action: "start", label: "Iniciar", color: "primary", icon: <PlayArrow /> }],
//   },
//   processing: {
//     color: "primary",
//     icon: <PlayArrow color="primary" />,
//     label: "En Proceso",
//     actions: [
//       { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
//       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
//     ],
//   },
//   paused: {
//     color: "warning",
//     icon: <Pause color="warning" />,
//     label: "Pausadas",
//     actions: [
//       { action: "resume", label: "Reanudar", color: "primary", icon: <PlayArrow /> },
//       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
//     ],
//   },
//   finished: {
//     color: "success",
//     icon: <CheckCircleIcon color="success" />,
//     label: "Terminadas",
//     actions: [{ action: "deliver", label: "Entregar", color: "success", icon: <DeliveryIcon /> }],
//   },
//   cancelled: {
//     color: "error",
//     icon: <CancelIcon color="error" />,
//     label: "Canceladas",
//     actions: [{ action: "reopen", label: "Reabrir", color: "primary", icon: <PlayArrow /> }],
//   },
//   delivered: {
//     color: "success",
//     icon: <DeliveryIcon color="success" />,
//     label: "Entregadas",
//     actions: [],
//   },
// }

// const statusOptions = Object.keys(statusConfig)
// const pageSizeOptions = [5, 10, 20, 50]

// const OrderSpeedGeneric = () => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
//   const isTablet = useMediaQuery(theme.breakpoints.down("md"))
//   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
//   const [displayTitle, setDisplayTitle] = useState(false)
//   const [viewMode, setViewMode] = useState<"card" | "list">(isMobile ? "card" : "list")
//   const [openPendingDialog, setOpenPendingDialog] = useState(false)
//   const [selectedOrder, setSelectedOrder] = useState<any>(null)
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeStatus, setActiveStatus] = useState("all")
//   const [currentPages, setCurrentPages] = useState<Record<string, number>>(
//     statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 })
//   )
//   const [expandedRows, setExpandedRows] = useState<string[]>([])
//   const [expandedCards, setExpandedCards] = useState<string[]>([])
//   const [pageSize, setPageSize] = useState(isMobile ? 5 : 10)
//   const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null)
//   const [actionMenuOrder, setActionMenuOrder] = useState<any>(null)

//   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
//   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } }
//   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email")

//   const {
//     allOrders,
//     ordersByStatus,
//     isConnected,
//     isLoading,
//     isUpdating,
//     error,
//     successMessage,
//     lastRefresh,
//     fetchHistoricalOrders,
//     handleOrderAction,
//     updateOrder,
//     clearMessages,
//   } = useOrdersManagementSocketApi({
//     companyName: data?.companyName || "LlakaScript",
//     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
//     orderLimit: 50,
//   })

//   // Calculate totals
//   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)
//   const pendingCount = ordersByStatus.pending?.length || 0
//   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
//   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

//   // Filter and search orders
//   const filteredOrders = useMemo(() => {
//     let filtered = [...allOrders]

//     if (activeStatus !== "all") {
//       filtered = filtered.filter((order) => order.status === activeStatus)
//     }

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       filtered = filtered.filter((order) => {
//         return (
//           order.fullname?.toLowerCase().includes(query) ||
//           order.id?.toString().includes(query) ||
//           order._id?.toString().includes(query) ||
//           order.orderType?.toLowerCase().includes(query) ||
//           order.dataTypeOrder?.toLowerCase().includes(query) ||
//           order.cart.some(
//             (item: any) =>
//               item.name.toLowerCase().includes(query) ||
//               (item.Description && item.Description.toLowerCase().includes(query)) ||
//               item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query)),
//           )
//         )
//       })
//     }

//     return filtered.sort((a, b) => {
//       const dateA = new Date(a.createdAt || a.timestamp || 0)
//       const dateB = new Date(b.createdAt || b.timestamp || 0)
//       return dateB.getTime() - dateA.getTime()
//     })
//   }, [allOrders, activeStatus, searchQuery])

//   // Paginate orders
//   const paginatedOrders = useMemo(() => {
//     const startIndex = (currentPages[activeStatus] - 1) * pageSize
//     return filteredOrders.slice(startIndex, startIndex + pageSize)
//   }, [filteredOrders, currentPages, activeStatus, pageSize])

//   // Calculate page count for current status
//   const pageCount = Math.ceil(filteredOrders.length / pageSize)

//   // Handle page change
//   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
//     setCurrentPages((prev) => ({
//       ...prev,
//       [activeStatus]: value,
//     }))
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   // Handle page size change
//   const handlePageSizeChange = (event: any) => {
//     const newSize = event.target.value
//     setPageSize(newSize)
//     const newPage = Math.floor(((currentPages[activeStatus] - 1) * pageSize) / newSize) + 1
//     setCurrentPages((prev) => ({
//       ...prev,
//       [activeStatus]: newPage,
//     }))
//   }

//   // Toggle functions
//   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
//   const toggleViewMode = () => setViewMode(viewMode === "card" ? "list" : "card")

//   // Action handlers
//   const handleLogout = async () => {
//     clearLocalhostStorage()
//     await recordAttendance("getOut", user?.user?.email, data?.companyName)
//     window.location.reload()
//   }

//   const handleOpenEditModal = (order: any) => {
//     setSelectedOrder(order)
//     setIsEditModalOpen(true)
//   }

//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false)
//     setSelectedOrder(null)
//   }

//   const saveUpdateData = async (updatedOrder: any) => {
//     try {
//       await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder)
//       handleCloseEditModal()
//     } catch (error) {
//       console.error("Failed to update order:", error)
//     }
//   }

//   const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
//     setActiveStatus(newValue)
//     setCurrentPages((prev) => ({
//       ...prev,
//       [newValue]: 1,
//     }))
//   }

//   const clearSearch = () => {
//     setSearchQuery("")
//   }

//   // Action menu handlers
//   const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, order: any) => {
//     event.stopPropagation()
//     setActionMenuAnchorEl(event.currentTarget)
//     setActionMenuOrder(order)
//   }

//   const handleCloseActionMenu = () => {
//     setActionMenuAnchorEl(null)
//     setActionMenuOrder(null)
//   }

//   const handleActionMenuItemClick = (action: string) => {
//     if (actionMenuOrder) {
//       if (action === "edit") {
//         handleOpenEditModal(actionMenuOrder)
//       } else {
//         handleOrderAction(action, actionMenuOrder)
//       }
//       handleCloseActionMenu()
//     }
//   }

//   // Toggle card expansion
//   const toggleCardExpansion = (orderId: string) => {
//     setExpandedCards((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
//   }

//   // Effects
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayTitle((prev) => !prev)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   // Scroll to top button logic
//   const trigger = useScrollTrigger({
//     threshold: 100,
//   })

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     })
//   }

//   // Order Card Component
//   const OrderCard = React.memo(({ order }: { order: any }) => {
//     const status = order.status
//     const config = statusConfig[status as keyof typeof statusConfig]
//     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
//     const total = order.cart.reduce((sum: any, item: any) => {
//       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
//       return sum + item.price * item.quantity + extrasTotal
//     }, 0)

//     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     })

//     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette]
//     const orderId = order._id || order.id
//     const isExpanded = expandedCards.includes(orderId)

//     return (
//       <Card
//         sx={{
//           borderLeft: "4px solid",
//           borderColor: paletteColor?.main || "grey",
//           mb: 2,
//           position: "relative",
//           transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
//           "&:hover": {
//             transform: isMobile ? "none" : "translateY(-2px)",
//             boxShadow: isMobile ? "none" : theme.shadows[4],
//             maxHeight: { xs: "calc(100vh - 230px)", md: "calc(100vh - 270px)" },

//           },
//         }}
//       >
//         <CardContent sx={{ p: isMobile ? 1 : 2 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//             <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold">
//               #{order.id || order._id.slice(-4)}
//             </Typography>
//             <Chip
//               size={isMobile ? "small" : "medium"}
//               label={`${order.orderType}${order.dataTypeOrder ? ` / ${order.dataTypeOrder}` : ""}`}
//               color={config.color as any}
//               icon={React.cloneElement(config.icon, { fontSize: isMobile ? "small" : "medium" })}
//             />
//           </Box>

//           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//             <Person fontSize={isMobile ? "small" : "medium"} sx={{ mr: 0.5, opacity: 0.7 }} />
//             <Typography variant={isMobile ? "caption" : "body2"} noWrap sx={{ maxWidth: isMobile ? "100px" : "150px" }}>
//               {order.fullname}
//             </Typography>
//             <Box sx={{ flexGrow: 1 }} />
//             <AccessTime fontSize={isMobile ? "small" : "medium"} sx={{ mr: 0.5, opacity: 0.7 }} />
//             <Typography variant={isMobile ? "caption" : "body2"}>{formattedTime}</Typography>
//           </Box>

//           <Divider sx={{ my: 1 }} />

//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
//             <Typography variant={isMobile ? "caption" : "subtitle2"}>Items ({totalItems})</Typography>
//             {order.cart.length > (isMobile ? 1 : 2) && !isExpanded && (
//               <Button
//                 size="small"
//                 variant="text"
//                 onClick={() => toggleCardExpansion(orderId)}
//                 endIcon={<ExpandMoreIcon fontSize={isMobile ? "small" : "medium"} />}
//                 sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
//               >
//                 Ver todos
//               </Button>
//             )}
//             {isExpanded && (
//               <Button
//                 size="small"
//                 variant="text"
//                 onClick={() => toggleCardExpansion(orderId)}
//                 endIcon={<ExpandLessIcon fontSize={isMobile ? "small" : "medium"} />}
//                 sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
//               >
//                 Colapsar
//               </Button>
//             )}
//           </Box>

//           <List dense disablePadding>
//             {order.cart.slice(0, isExpanded ? undefined : isMobile ? 1 : 3).map((item: any) => (
//               <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.25 }}>
//                 <ListItemText
//                   primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                   secondaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                   primary={
//                     <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
//                       <Box sx={{ flex: 1, mr: 1 }}>
//                         <Typography component="span" variant="inherit">
//                           <strong>{item.quantity}x</strong> {item.name}
//                         </Typography>
//                         {item.Description && (
//                           <Typography variant="inherit" display="block" sx={{ mt: 0.5, color: "text.secondary" }}>
//                             {item.Description}
//                           </Typography>
//                         )}
//                       </Box>
//                       <Typography component="span" variant="inherit" sx={{ whiteSpace: "nowrap" }}>
//                         ${item.price.toFixed(2)}
//                       </Typography>
//                     </Box>
//                   }
//                   secondary={
//                     item.extras?.length > 0 && (
//                       <List dense disablePadding sx={{ ml: isMobile ? 0 : 2 }}>
//                         {item.extras.map((extra: any, idx: number) => (
//                           <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0 }}>
//                             <ListItemText
//                               primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                               primary={
//                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                   <Typography variant="inherit">+ {extra.name}</Typography>
//                                   <Typography variant="inherit">${extra.price.toFixed(2)}</Typography>
//                                 </Box>
//                               }
//                             />
//                           </ListItem>
//                         ))}
//                         {item?.comments && (
//                           <ListItemText
//                             primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                             primary={
//                               <Box sx={{ mt: 0.5 }}>
//                                 <Typography variant="inherit">
//                                   <strong>Comentario: </strong>
//                                   {item?.comments}
//                                 </Typography>
//                               </Box>
//                             }
//                           />
//                         )}
//                       </List>
//                     )
//                   }
//                 />
//               </ListItem>
//             ))}
//             {!isExpanded && order.cart.length > (isMobile ? 1 : 3) && (
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 sx={{ display: "block", mt: 1, cursor: "pointer", fontSize: isMobile ? "0.7rem" : "0.8rem" }}
//                 onClick={() => toggleCardExpansion(orderId)}
//               >
//                 +{order.cart.length - (isMobile ? 1 : 3)} más...
//               </Typography>
//             )}
//           </List>

//           {order?.comments && (
//             <>
//               <Divider sx={{ my: 1 }} />
//               <Box sx={{ mb: 1 }}>
//                 <Typography variant={isMobile ? "caption" : "body2"} sx={{ display: "block" }}>
//                   <strong>Comentario General: </strong> {order?.comments}
//                 </Typography>
//               </Box>
//             </>
//           )}
          
//           <Divider sx={{ my: 1 }} />

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexDirection: isMobile ? "column" : "row",
//               gap: isMobile ? 1 : 0,
//             }}
//           >
//             <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold">
//               Total: ${total.toFixed(2)}
//             </Typography>

//             {isMobile ? (
//               <Box sx={{ width: "100%" }}>
//                 {config.actions.length > 0 ? (
//                   <ButtonGroup fullWidth variant="contained" size="small">
//                     {config.actions.slice(0, 1).map((action: any, idx: number) => (
//                       <Button
//                         key={`${action.action}-${idx}`}
//                         color={action.color as any}
//                         startIcon={React.cloneElement(action.icon, { fontSize: "small" })}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleOrderAction(action.action, order)
//                         }}
//                         disabled={isUpdating}
//                         sx={{ flex: 1, fontSize: "0.75rem" }}
//                       >
//                         {action.label}
//                       </Button>
//                     ))}
//                     <Button
//                       color="primary"
//                       variant="outlined"
//                       onClick={(e) => handleOpenActionMenu(e, order)}
//                       disabled={isUpdating}
//                       sx={{ maxWidth: "40px", minWidth: "40px" }}
//                     >
//                       <MoreVertIcon fontSize="small" />
//                     </Button>
//                   </ButtonGroup>
//                 ) : (
//                   <Button
//                     size="small"
//                     variant="outlined"
//                     color="primary"
//                     startIcon={<EditIcon fontSize="small" />}
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       handleOpenEditModal(order)
//                     }}
//                     disabled={isUpdating}
//                     fullWidth
//                     sx={{ fontSize: "0.75rem" }}
//                   >
//                     Editar
//                   </Button>
//                 )}
//               </Box>
//             ) : (
//               <Stack direction="row" spacing={1} width="auto">
//                 {config.actions.map((action: any, idx: number) => (
//                   <Button
//                     key={`${action.action}-${idx}`}
//                     size="small"
//                     variant="contained"
//                     color={action.color as any}
//                     startIcon={action.icon}
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       handleOrderAction(action.action, order)
//                     }}
//                     disabled={isUpdating}
//                     sx={{ fontSize: "0.75rem" }}
//                   >
//                     {action.label}
//                   </Button>
//                 ))}

//                 <Button
//                   size="small"
//                   variant="outlined"
//                   color="primary"
//                   startIcon={<EditIcon fontSize="small" />}
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     handleOpenEditModal(order)
//                   }}
//                   disabled={isUpdating}
//                   sx={{ fontSize: "0.75rem" }}
//                 >
//                   Editar
//                 </Button>
//               </Stack>
//             )}
//           </Box>
//         </CardContent>
//       </Card>
//     )
//   })

//   const handleToggleExpand = (orderId: string) => {
//     setExpandedRows((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
//   }

//   const OrderRow = React.memo(
//     ({
//       order,
//       expandedRows,
//       onToggleExpand,
//     }: {
//       order: any
//       expandedRows: string[]
//       onToggleExpand: (id: string) => void
//     }) => {
//       const status = order.status
//       const config = statusConfig[status as keyof typeof statusConfig]
//       const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
//       const total = order.cart.reduce((sum: any, item: any) => {
//         const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
//         return sum + item.price * item.quantity + extrasTotal
//       }, 0)

//       const commentsOrderGeneral = order?.comments
//       const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       })

//       const orderId = order._id || order.id
//       const isExpanded = expandedRows.includes(orderId)

//       const toggleExpand = (e: React.MouseEvent) => {
//         e.stopPropagation()
//         onToggleExpand(orderId)
//       }

//       return (
//         <>
//           <TableRow
//             sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
//             onClick={toggleExpand}
//           >
//             <TableCell>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <IconButton size="small" onClick={toggleExpand}>
//                   {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
//                 </IconButton>
//                 <Typography variant="body2" fontWeight="bold" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                   #{order.id || order._id.slice(-4)}
//                 </Typography>
//               </Box>
//             </TableCell>
//             <TableCell>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
//                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px", fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                   {order.fullname}
//                 </Typography>
//               </Box>
//             </TableCell>
//             <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
//               <Chip
//                 size="small"
//                 label={`${order.orderType}${order.dataTypeOrder ? ` / ${order.dataTypeOrder}` : ""}`}
//                 color={config.color as any}
//                 icon={React.cloneElement(config.icon, { fontSize: "small" })}
//                 sx={{ fontSize: isMobile ? "0.7rem" : "0.8rem" }}
//               />
//             </TableCell>
//             <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
//               <Typography variant="body2" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                 {totalItems} items
//               </Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" fontWeight="bold" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                 ${total.toFixed(2)}
//               </Typography>
//             </TableCell>
//             <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
//               <Typography variant="body2" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                 {formattedTime}
//               </Typography>
//             </TableCell>
//             <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
//               <Tooltip title={commentsOrderGeneral || "Sin comentarios"} arrow>
//                 <Typography variant="body2" noWrap sx={{ maxWidth: "150px", fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                   {commentsOrderGeneral || "-"}
//                 </Typography>
//               </Tooltip>
//             </TableCell>
//             <TableCell>
//               {isMobile ? (
//                 <IconButton size="small" color="primary" onClick={(e) => handleOpenActionMenu(e, order)}>
//                   <MoreVertIcon fontSize="small" />
//                 </IconButton>
//               ) : (
//                 <Stack
//                   direction="row"
//                   spacing={1}
//                   sx={{
//                     minWidth: "120px",
//                     "& .MuiIconButton-root": {
//                       mx: 0,
//                     },
//                   }}
//                 >
//                   {config.actions.map((action: any, idx: number) => (
//                     <Tooltip key={`${action.action}-${idx}`} title={action.label}>
//                       <IconButton
//                         size="small"
//                         color={action.color as any}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleOrderAction(action.action, order)
//                         }}
//                         disabled={isUpdating}
//                       >
//                         {React.cloneElement(action.icon, { fontSize: "small" })}
//                       </IconButton>
//                     </Tooltip>
//                   ))}
//                   <Tooltip title="Editar">
//                     <IconButton
//                       size="small"
//                       color="primary"
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         handleOpenEditModal(order)
//                       }}
//                       disabled={isUpdating}
//                     >
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                 </Stack>
//               )}
//             </TableCell>
//           </TableRow>

//           {/* Expanded details row */}
//           <TableRow>
//             <TableCell style={{ padding: 0 }} colSpan={8}>
//               <Collapse in={isExpanded} timeout="auto" unmountOnExit>
//                 <Box
//                   sx={{
//                     p: { xs: 1, sm: 3 },
//                     backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
//                     borderBottom: `1px solid ${theme.palette.divider}`,
//                   }}
//                 >
//                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, fontSize: isMobile ? "0.875rem" : "1rem" }}>
//                     Detalles de la Orden
//                   </Typography>

//                   <Grid container spacing={2}>
//                     <Grid item xs={12} md={6}>
//                       <Typography variant="subtitle2" gutterBottom sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
//                         Productos:
//                       </Typography>
//                       <List dense disablePadding>
//                         {order.cart.map((item: any, index: number) => (
//                           <React.Fragment key={`${item.id}-${index}`}>
//                             <ListItem disablePadding sx={{ py: 0.5 }}>
//                               <ListItemText
//                                 primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                                 secondaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                                 primary={
//                                   <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
//                                     <Box sx={{ flex: 1, mr: 1 }}>
//                                       <Typography component="span" variant="inherit">
//                                         <strong>{item.quantity}x</strong> {item.name}
//                                       </Typography>
//                                       {item.Description && (
//                                         <Typography
//                                           variant="inherit"
//                                           display="block"
//                                           sx={{ mt: 0.5, color: "text.secondary" }}
//                                         >
//                                           {item.Description}
//                                         </Typography>
//                                       )}
//                                     </Box>
//                                     <Typography component="span" variant="inherit">
//                                       ${(item.price * item.quantity).toFixed(2)}
//                                     </Typography>
//                                   </Box>
//                                 }
//                                 secondary={
//                                   <div>
//                                     {item.extras?.length > 0 && (
//                                       <List dense disablePadding sx={{ ml: isMobile ? 0 : 2, mt: 0.5 }}>
//                                         {item?.extras?.map((extra: any, idx: number) => (
//                                           <ListItem key={`${item.id}-extra-${idx}`} disablePadding sx={{ py: 0 }}>
//                                             <ListItemText
//                                               primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                                               primary={
//                                                 <Box
//                                                   sx={{
//                                                     display: "flex",
//                                                     justifyContent: "space-between",
//                                                     alignItems: "center",
//                                                   }}
//                                                 >
//                                                   <Typography variant="inherit">+ {extra.name}</Typography>
//                                                   <Typography variant="inherit">${extra.price.toFixed(2)}</Typography>
//                                                 </Box>
//                                               }
//                                             />
//                                           </ListItem>
//                                         ))}
//                                       </List>
//                                     )}
//                                     {item?.comments && (
//                                       <Box sx={{ mt: 1 }}>
//                                         <Typography variant="inherit">
//                                           <strong>Comentarios:</strong> {item?.comments || "Sin comentarios"}
//                                         </Typography>
//                                       </Box>
//                                     )}
//                                   </div>
//                                 }
//                               />
//                             </ListItem>
//                             <Divider sx={{ my: 0.5 }} />
//                           </React.Fragment>
//                         ))}
//                       </List>
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                       <Typography variant="subtitle2" gutterBottom sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
//                         Información Adicional:
//                       </Typography>
//                       <List dense disablePadding>
//                         <ListItem disablePadding sx={{ py: 0.5 }}>
//                           <ListItemText
//                             primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                             primary={
//                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                 <Typography variant="inherit">
//                                   <strong>Estado:</strong>
//                                 </Typography>
//                                 <Chip
//                                   size="small"
//                                   label={config.label}
//                                   color={config.color as any}
//                                   icon={React.cloneElement(config.icon, { fontSize: "small" })}
//                                   sx={{ fontSize: isMobile ? "0.7rem" : "0.8rem" }}
//                                 />
//                               </Box>
//                             }
//                           />
//                         </ListItem>
//                         <Divider sx={{ my: 0.5 }} />

//                         <ListItem disablePadding sx={{ py: 0.5 }}>
//                           <ListItemText
//                             primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                             primary={
//                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                 <Typography variant="inherit">
//                                   <strong>Total:</strong>
//                                 </Typography>
//                                 <Typography variant="inherit" fontWeight="bold">
//                                   ${total.toFixed(2)}
//                                 </Typography>
//                               </Box>
//                             }
//                           />
//                         </ListItem>
//                         <Divider sx={{ my: 0.5 }} />

//                         {commentsOrderGeneral && (
//                           <>
//                             <ListItem disablePadding sx={{ py: 0.5 }}>
//                               <ListItemText
//                                 primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                                 primary={
//                                   <Box>
//                                     <Typography variant="inherit">
//                                       <strong>Comentarios:</strong>
//                                     </Typography>
//                                     <Typography variant="inherit" sx={{ mt: 0.5 }}>
//                                       {commentsOrderGeneral}
//                                     </Typography>
//                                   </Box>
//                                 }
//                               />
//                             </ListItem>
//                             <Divider sx={{ my: 0.5 }} />
//                           </>
//                         )}

//                         <ListItem disablePadding sx={{ py: 0.5 }}>
//                           <ListItemText
//                             primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                             primary={
//                               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                 <Typography variant="inherit">
//                                   <strong>Hora:</strong>
//                                 </Typography>
//                                 <Typography variant="inherit">{formattedTime}</Typography>
//                               </Box>
//                             }
//                           />
//                         </ListItem>
//                       </List>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Collapse>
//             </TableCell>
//           </TableRow>
//         </>
//       )
//     },
//   )

//   // Custom Pagination Controls
//   const PaginationControls = () => (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         mt: 3,
//         pb: 2,
//         flexDirection: isMobile ? "column" : "row",
//         gap: isMobile ? 2 : 0,
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//           Órdenes por página:
//         </Typography>
//         <FormControl size="small" variant="outlined">
//           <Select
//             value={pageSize}
//             onChange={handlePageSizeChange}
//             sx={{ height: "36px", fontSize: isMobile ? "0.75rem" : "0.875rem" }}
//           >
//             {pageSizeOptions.map((size) => (
//               <MenuItem key={size} value={size} sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                 {size}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       <Pagination
//         count={pageCount}
//         page={currentPages[activeStatus]}
//         onChange={handlePageChange}
//         color="primary"
//         size={isMobile ? "small" : "medium"}
//         showFirstButton={!isMobile}
//         showLastButton={!isMobile}
//         siblingCount={isMobile ? 0 : 1}
//         boundaryCount={isMobile ? 1 : 2}
//       />

//       <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//         Mostrando {filteredOrders.length > 0 ? (currentPages[activeStatus] - 1) * pageSize + 1 : 0}-
//         {Math.min(currentPages[activeStatus] * pageSize, filteredOrders.length)} de {filteredOrders.length} órdenes
//       </Typography>
//     </Box>
//   )

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         overflow: "hidden",
//         bgcolor: theme.palette.background.default,
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Custom AppBar */}
//       <AppBar
//         position="sticky"
//         elevation={2}
//         sx={{
//           bgcolor: "background.paper",
//           color: "text.primary",
//           borderBottom: 1,
//           borderColor: "divider",
//         }}
//       >
//         <Toolbar
//           variant="dense"
//           sx={{
//             minHeight: isMobile ? 48 : 56,
//             flexDirection: isMobile ? "column" : "row",
//             py: isMobile ? 1 : 0,
//             px: isMobile ? 1 : 2,
//           }}
//         >
//           {/* Logo and Title */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               flexGrow: 1,
//               height: "40px",
//               position: "relative",
//               overflow: "hidden",
//               width: isMobile ? "100%" : "auto",
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 28,
//                 height: 28,
//                 flexShrink: 0,
//                 ml: 0.5,
//               }}
//             >
//               <Image
//                 src={"/images/flama.png"}
//                 alt={"LlakaScript"}
//                 width={28}
//                 height={28}
//                 priority
//                 style={{
//                   objectFit: "contain",
//                   width: "100%",
//                   height: "100%",
//                 }}
//               />
//             </Avatar>

//             <Box
//               sx={{
//                 position: "relative",
//                 width: "auto",
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 flexGrow: 1,
//               }}
//             >
//               <Typography
//                 variant={isMobile ? "subtitle1" : "h6"}
//                 sx={{
//                   fontWeight: 600,
//                   lineHeight: 1.1,
//                   fontSize: isMobile ? "1rem" : undefined,
//                 }}
//               >
//                 {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
//               </Typography>
//             </Box>
//           </Box>

//           {/* Right side controls */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 0.5,
//               width: isMobile ? "100%" : "auto",
//               justifyContent: isMobile ? "space-between" : "flex-end",
//               mt: isMobile ? 1 : 0,
//             }}
//           >
//             {/* View mode toggle */}
//             <Tooltip title={viewMode === "card" ? "Vista lista" : "Vista tarjetas"}>
//               <IconButton size="small" onClick={toggleViewMode} color="default">
//                 {viewMode === "card" ? (
//                   <ViewListIcon fontSize={isMobile ? "small" : "medium"} />
//                 ) : (
//                   <ViewColumnIcon fontSize={isMobile ? "small" : "medium"} />
//                 )}
//               </IconButton>
//             </Tooltip>

//             {/* Connection status indicator */}
//             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
//               <Box
//                 sx={{
//                   width: 10,
//                   height: 10,
//                   borderRadius: "50%",
//                   bgcolor: isConnected ? "success.main" : "error.main",
//                   mr: 1,
//                 }}
//               />
//             </Tooltip>

//             {/* Order count badge */}
//             {isMobile && totalOrders > 0 && (
//               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
//                 <Box sx={{ width: 4, height: 4 }} />
//               </Badge>
//             )}

//             {/* Last refresh time - hidden on mobile */}
//             {lastRefresh && !isMobile && (
//               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap", fontSize: "0.75rem" }}>
//                 Actualizado: {lastRefresh.toLocaleTimeString()}
//               </Typography>
//             )}

//             {/* Refresh button */}
//             <Tooltip title="Actualizar">
//               <IconButton
//                 color="primary"
//                 size="small"
//                 onClick={fetchHistoricalOrders}
//                 disabled={isLoading || isUpdating}
//               >
//                 <RefreshIcon fontSize={isMobile ? "small" : "medium"} />
//               </IconButton>
//             </Tooltip>

//             {/* Header collapse toggle (mobile only) */}
//             {isMobile && (
//               <IconButton size="small" onClick={toggleHeader}>
//                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
//               </IconButton>
//             )}

//             <Tooltip title="Salir">
//               <IconButton size="small" onClick={handleLogout} color="default">
//                 <LogoutIcon fontSize={isMobile ? "small" : "medium"} />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Main content */}
//       <Box
//         component="main"
//         sx={{
//           flex: 1,
//           overflow: "auto",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Paper
//           elevation={isMobile ? 1 : 3}
//           sx={{
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//             borderRadius: { xs: 1, sm: 2 },
//             m: { xs: 0.5, sm: 2 },
//             width: { xs: "calc(100% - 16px)", sm: "calc(100% - 32px)" },
//           }}
//         >
//           {/* Status header - collapsible on mobile */}
//           <Collapse in={!headerCollapsed} timeout="auto">
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 borderBottom: "1px solid",
//                 borderColor: theme.palette.divider,
//                 overflow: "hidden",
//               }}
//             >
//               {/* Search bar */}
//               <Box sx={{ p: isMobile ? 1 : 2, pb: 0, width: "100%" }}>
//                 <TextField
//                   fullWidth
//                   size={isMobile ? "small" : "medium"}
//                   variant="outlined"
//                   placeholder="Buscar órdenes..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <SearchIcon fontSize={isMobile ? "small" : "medium"} />
//                       </InputAdornment>
//                     ),
//                     endAdornment: searchQuery && (
//                       <InputAdornment position="end">
//                         <IconButton onClick={clearSearch} size="small">
//                           <ClearIcon fontSize={isMobile ? "small" : "medium"} />
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>

//               {/* Status tabs */}
//               <Box sx={{ px: isMobile ? 1 : 2, pt: 1, width: "100%", overflow: "auto" }}>
//                 <Tabs
//                   value={activeStatus}
//                   onChange={handleStatusChange}
//                   variant="scrollable"
//                   scrollButtons="auto"
//                   allowScrollButtonsMobile
//                   sx={{
//                     minHeight: isMobile ? 40 : 48,
//                     "& .MuiTab-root": {
//                       minHeight: isMobile ? 40 : 48,
//                       py: 0,
//                       fontSize: isMobile ? "0.7rem" : "0.8rem",
//                       px: isMobile ? 0.5 : 1,
//                     },
//                   }}
//                 >
//                   <Tab label="Todas" value="all" />
//                   {statusOptions.map((status) => (
//                     <Tab
//                       key={status}
//                       label={statusConfig[status as keyof typeof statusConfig].label}
//                       value={status}
//                       icon={React.cloneElement(statusConfig[status as keyof typeof statusConfig].icon, {
//                         fontSize: isMobile ? "small" : "medium",
//                       })}
//                       iconPosition="start"
//                     />
//                   ))}
//                 </Tabs>
//               </Box>

//               {/* Status indicators */}
//               {(isLoading || isUpdating) && (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                     p: 1,
//                     mx: 1,
//                     mb: 1,
//                     backgroundColor: theme.palette.action.hover,
//                     borderRadius: 1,
//                   }}
//                 >
//                   <CircularProgress size={16} />
//                   <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
//                     {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           </Collapse>

//           {/* Error messages */}
//           <Box
//             sx={{
//               px: { xs: 1, sm: 2 },
//               pt: { xs: 1, sm: 1 },
//               overflow: "auto",
//               flexShrink: 0,
//             }}
//           >
//             {error && (
//               <Alert severity="error" onClose={() => clearMessages()} sx={{ mb: 1 }}>
//                 {error}
//               </Alert>
//             )}

//             {successMessage && (
//               <Alert severity="success" onClose={() => clearMessages()} sx={{ mb: 1 }}>
//                 {successMessage}
//               </Alert>
//             )}
//           </Box>

//           {/* Main content - takes all available space */}
//           <Box
//             sx={{
//               flex: 1,
//               overflow: "auto",
//               display: "flex",
//               flexDirection: "column",
//               p: { xs: 0.5, sm: 2 },
//             }}
//           >
//             <PendingOrdersDialog open={openPendingDialog} onClose={() => setOpenPendingDialog(false)} />

//             {/* Orders list */}
//             <Box sx={{ flex: 1 }}>
//               {filteredOrders.length === 0 ? (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "200px",
//                     flexDirection: "column",
//                     gap: 2,
//                   }}
//                 >
//                   <Typography variant="h6" color="text.secondary" sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}>
//                     No se encontraron órdenes
//                   </Typography>
//                   <Button
//                     variant="outlined"
//                     size={isMobile ? "small" : "medium"}
//                     onClick={() => {
//                       setSearchQuery("")
//                       setActiveStatus("all")
//                     }}
//                   >
//                     Limpiar filtros
//                   </Button>
//                 </Box>
//               ) : viewMode === "card" ? (
//                 <>
//                   <Grid container spacing={isMobile ? 1 : 2}>
//                     {paginatedOrders.map((order: any) => (
//                       <Grid item xs={12} sm={isTablet ? 12 : 6} lg={4} key={order._id || order.id}>
//                         <OrderCard order={order} />
//                       </Grid>
//                     ))}
//                   </Grid>
//                   <PaginationControls />
//                 </>
//               ) : (
//                 <>
//                   <TableContainer
//                     component={Paper}
//                     elevation={2}
//                     sx={{
//                       position: "relative",
//                       overflow: "auto",
//                       maxWidth: "100%",
//                       "&:before": {
//                         content: '""',
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         height: "4px",
//                         background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                         zIndex: 1,
//                       },
//                     }}
//                   >
//                     <Table size={isMobile ? "small" : "medium"} sx={{ minWidth: isMobile ? 450 : 650 }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>ID</TableCell>
//                           <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>Cliente</TableCell>
//                           <TableCell sx={{ display: { xs: "none", sm: "table-cell" }, fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                             Estado
//                           </TableCell>
//                           <TableCell sx={{ display: { xs: "none", md: "table-cell" }, fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                             Items
//                           </TableCell>
//                           <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>Total</TableCell>
//                           <TableCell sx={{ display: { xs: "none", md: "table-cell" }, fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                             Hora
//                           </TableCell>
//                           <TableCell sx={{ display: { xs: "none", lg: "table-cell" }, fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                             Comentario General
//                           </TableCell>
//                           <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>Acciones</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {paginatedOrders.map((order: any) => (
//                           <OrderRow
//                             key={order._id || order.id}
//                             order={order}
//                             expandedRows={expandedRows}
//                             onToggleExpand={handleToggleExpand}
//                           />
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                   <PaginationControls />
//                 </>
//               )}
//             </Box>
//           </Box>
//         </Paper>

//         {/* Scroll to top button */}
//         <Zoom in={trigger}>
//           <Box
//             onClick={scrollToTop}
//             role="presentation"
//             sx={{
//               position: "fixed",
//               bottom: 16,
//               right: 16,
//               zIndex: 1000,
//             }}
//           >
//             <Fab color="primary" size="small" aria-label="scroll back to top">
//               <KeyboardArrowUp />
//             </Fab>
//           </Box>
//         </Zoom>
//       </Box>

//       {/* Action Menu */}
//       <Menu
//         anchorEl={actionMenuAnchorEl}
//         open={Boolean(actionMenuAnchorEl)}
//         onClose={handleCloseActionMenu}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         PaperProps={{
//           sx: {
//             minWidth: 180,
//           },
//         }}
//       >
//         {actionMenuOrder &&
//           statusConfig[actionMenuOrder.status as keyof typeof statusConfig].actions.map((action: any) => (
//             <MenuItem
//               key={action.action}
//               onClick={() => handleActionMenuItemClick(action.action)}
//               sx={{
//                 color:
//                   (theme.palette[action.color as keyof typeof theme.palette] as PaletteColor)?.main ??
//                   theme.palette.text.primary,
//                 fontSize: "0.875rem",
//               }}
//             >
//               <ListItemIcon sx={{ color: "inherit", minWidth: "36px" }}>
//                 {React.cloneElement(action.icon, { fontSize: "small" })}
//               </ListItemIcon>
//               {action.label}
//             </MenuItem>
//           ))}
//         <MenuItem onClick={() => handleActionMenuItemClick("edit")} sx={{ fontSize: "0.875rem" }}>
//           <ListItemIcon sx={{ minWidth: "36px" }}>
//             <EditIcon fontSize="small" />
//           </ListItemIcon>
//           Editar
//         </MenuItem>
//       </Menu>

//       {/* Edit Order Modal */}
//       {isEditModalOpen && selectedOrder && (
//         <EditOrderModal
//           open={isEditModalOpen}
//           order={selectedOrder}
//           onSave={saveUpdateData}
//           menuData={{
//             mainMenu: hojas?.Hoja1 || [],
//             promotions: hojas?.Promotion || [],
//           }}
//           onClose={handleCloseEditModal}
//         />
//       )}
//     </Box>
//   )
// }

// export default OrderSpeedGeneric



"use client"

import React, { useMemo, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Typography,
  Alert,
  Grid,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  Card,
  CardContent,
  Divider,
  Badge,
  Tooltip,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  Stack,
  useScrollTrigger,
  Fab,
  Zoom,
  TextField,
  InputAdornment,
  Pagination,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  Collapse,
  Menu,
  ListItemIcon,
  ButtonGroup,
  type PaletteColor,
  Container,
} from "@mui/material"
import {
  Edit as EditIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
  PauseCircle as PauseCircleIcon,
  Cancel as CancelIcon,
  DeliveryDining as DeliveryIcon,
  PlayArrow,
  Pause,
  ViewList as ViewListIcon,
  ViewColumn as ViewColumnIcon,
  Logout as LogoutIcon,
  AccessTime,
  Person,
  KeyboardArrowUp,
  Search as SearchIcon,
  Clear as ClearIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material"
import { useOrdersManagementSocketApi } from "../../../hooks/useOrdersManagementSocketApi"
import EditOrderModal from "../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal"
import Image from "next/image"
import { clearLocalhostStorage } from "@/services/localstorage.services"
import { recordAttendance } from "@/services/attendance.services"
import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog"

// Status configuration
const statusConfig = {
  pending: {
    color: "default",
    icon: <PauseCircleIcon color="disabled" />,
    label: "Pendientes",
    actions: [{ action: "start", label: "Iniciar", color: "primary", icon: <PlayArrow /> }],
  },
  processing: {
    color: "primary",
    icon: <PlayArrow color="primary" />,
    label: "En Proceso",
    actions: [
      { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
      { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
    ],
  },
  paused: {
    color: "warning",
    icon: <Pause color="warning" />,
    label: "Pausadas",
    actions: [
      { action: "resume", label: "Reanudar", color: "primary", icon: <PlayArrow /> },
      { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
    ],
  },
  finished: {
    color: "success",
    icon: <CheckCircleIcon color="success" />,
    label: "Terminadas",
    actions: [{ action: "deliver", label: "Entregar", color: "success", icon: <DeliveryIcon /> }],
  },
  cancelled: {
    color: "error",
    icon: <CancelIcon color="error" />,
    label: "Canceladas",
    actions: [{ action: "reopen", label: "Reabrir", color: "primary", icon: <PlayArrow /> }],
  },
  delivered: {
    color: "success",
    icon: <DeliveryIcon color="success" />,
    label: "Entregadas",
    actions: [],
  },
}

const statusOptions = Object.keys(statusConfig)
const pageSizeOptions = [5, 10, 20, 50]

const OrderSpeedGeneric = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
  const [displayTitle, setDisplayTitle] = useState(false)
  const [viewMode, setViewMode] = useState<"card" | "list">(isMobile ? "card" : "list")
  const [openPendingDialog, setOpenPendingDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeStatus, setActiveStatus] = useState("all")
  const [currentPages, setCurrentPages] = useState<Record<string, number>>(
    statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 }),
  )
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [expandedCards, setExpandedCards] = useState<string[]>([])
  const [pageSize, setPageSize] = useState(isMobile ? 5 : 10)
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [actionMenuOrder, setActionMenuOrder] = useState<any>(null)

  const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
  const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } }
  const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email")

  const {
    allOrders,
    ordersByStatus,
    isConnected,
    isLoading,
    isUpdating,
    error,
    successMessage,
    lastRefresh,
    fetchHistoricalOrders,
    handleOrderAction,
    updateOrder,
    clearMessages,
  } = useOrdersManagementSocketApi({
    companyName: data?.companyName || "LlakaScript",
    userEmail: user?.user?.email || "nico.contigliani@gmail.com",
    orderLimit: 50,
  })

  // Calculate totals
  const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)
  const pendingCount = ordersByStatus.pending?.length || 0
  const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
  const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    let filtered = [...allOrders]

    if (activeStatus !== "all") {
      filtered = filtered.filter((order) => order.status === activeStatus)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((order) => {
        return (
          order.fullname?.toLowerCase().includes(query) ||
          order.id?.toString().includes(query) ||
          order._id?.toString().includes(query) ||
          order.orderType?.toLowerCase().includes(query) ||
          order.dataTypeOrder?.toLowerCase().includes(query) ||
          order.cart.some(
            (item: any) =>
              item.name.toLowerCase().includes(query) ||
              (item.Description && item.Description.toLowerCase().includes(query)) ||
              item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query)),
          )
        )
      })
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.timestamp || 0)
      const dateB = new Date(b.createdAt || b.timestamp || 0)
      return dateB.getTime() - dateA.getTime()
    })
  }, [allOrders, activeStatus, searchQuery])

  // Paginate orders
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPages[activeStatus] - 1) * pageSize
    return filteredOrders.slice(startIndex, startIndex + pageSize)
  }, [filteredOrders, currentPages, activeStatus, pageSize])

  // Calculate page count for current status
  const pageCount = Math.ceil(filteredOrders.length / pageSize)

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPages((prev) => ({
      ...prev,
      [activeStatus]: value,
    }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle page size change
  const handlePageSizeChange = (event: any) => {
    const newSize = event.target.value
    setPageSize(newSize)
    const newValue = Math.floor(((currentPages[activeStatus] - 1) * pageSize) / newSize) + 1
    setCurrentPages((prev) => ({
      ...prev,
      [activeStatus]: newValue,
    }))
  }

  // Toggle functions
  const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
  const toggleViewMode = () => setViewMode(viewMode === "card" ? "list" : "card")

  // Action handlers
  const handleLogout = async () => {
    clearLocalhostStorage()
    await recordAttendance("getOut", user?.user?.email, data?.companyName)
    window.location.reload()
  }

  const handleOpenEditModal = (order: any) => {
    setSelectedOrder(order)
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedOrder(null)
  }

  const saveUpdateData = async (updatedOrder: any) => {
    try {
      await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder)
      handleCloseEditModal()
    } catch (error) {
      console.error("Failed to update order:", error)
    }
  }

  const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveStatus(newValue)
    setCurrentPages((prev) => ({
      ...prev,
      [newValue]: 1,
    }))
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  // Action menu handlers
  const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, order: any) => {
    event.stopPropagation()
    setActionMenuAnchorEl(event.currentTarget)
    setActionMenuOrder(order)
  }

  const handleCloseActionMenu = () => {
    setActionMenuAnchorEl(null)
    setActionMenuOrder(null)
  }

  const handleActionMenuItemClick = (action: string) => {
    if (actionMenuOrder) {
      if (action === "edit") {
        handleOpenEditModal(actionMenuOrder)
      } else {
        handleOrderAction(action, actionMenuOrder)
      }
      handleCloseActionMenu()
    }
  }

  // Toggle card expansion
  const toggleCardExpansion = (orderId: string) => {
    setExpandedCards((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  // Effects
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTitle((prev) => !prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Scroll to top button logic
  const trigger = useScrollTrigger({
    threshold: 100,
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Order Card Component
  const OrderCard = React.memo(({ order }: { order: any }) => {
    const status = order.status
    const config = statusConfig[status as keyof typeof statusConfig]
    const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
    const total = order.cart.reduce((sum: any, item: any) => {
      const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
      return sum + item.price * item.quantity + extrasTotal
    }, 0)

    const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })

    const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette]
    const orderId = order._id || order.id
    const isExpanded = expandedCards.includes(orderId)

    return (
      <Card
        sx={{
          borderLeft: "4px solid",
          borderColor: paletteColor?.main || "grey",
          mb: 2,
          position: "relative",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: isMobile ? "none" : "translateY(-2px)",
            boxShadow: isMobile ? "none" : theme.shadows[4],
          },
          maxHeight: isExpanded ? "none" : { xs: "none", md: "calc(100vh - 270px)" },
          overflow: "hidden",
          mx: "auto", // Center the card
          width: "100%", // Full width for proper centering
        }}
      >
        <CardContent sx={{ p: isMobile ? 1.5 : 2.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5, alignItems: "center" }}>
            <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold">
              #{order.id || order._id.slice(-4)}
            </Typography>
            <Chip
              size={isMobile ? "small" : "medium"}
              label={`${order.orderType}${order.dataTypeOrder ? ` / ${order.dataTypeOrder}` : ""}`}
              color={config.color as any}
              icon={React.cloneElement(config.icon, { fontSize: isMobile ? "small" : "medium" })}
              sx={{ borderRadius: "16px" }} // More rounded chip
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5, justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Person fontSize={isMobile ? "small" : "medium"} sx={{ mr: 0.5, opacity: 0.7 }} />
              <Typography
                variant={isMobile ? "caption" : "body2"}
                noWrap
                sx={{ maxWidth: isMobile ? "120px" : "180px" }}
              >
                {order.fullname}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTime fontSize={isMobile ? "small" : "medium"} sx={{ mr: 0.5, opacity: 0.7 }} />
              <Typography variant={isMobile ? "caption" : "body2"}>{formattedTime}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
            <Typography variant={isMobile ? "caption" : "subtitle2"} fontWeight="medium">
              Items ({totalItems})
            </Typography>
            {order.cart.length > (isMobile ? 1 : 2) && !isExpanded && (
              <Button
                size="small"
                variant="text"
                onClick={() => toggleCardExpansion(orderId)}
                endIcon={<ExpandMoreIcon fontSize={isMobile ? "small" : "medium"} />}
                sx={{
                  fontSize: isMobile ? "0.75rem" : "0.875rem",
                  minWidth: "auto",
                  p: "4px 8px",
                }}
              >
                Ver todos
              </Button>
            )}
            {isExpanded && (
              <Button
                size="small"
                variant="text"
                onClick={() => toggleCardExpansion(orderId)}
                endIcon={<ExpandLessIcon fontSize={isMobile ? "small" : "medium"} />}
                sx={{
                  fontSize: isMobile ? "0.75rem" : "0.875rem",
                  minWidth: "auto",
                  p: "4px 8px",
                }}
              >
                Colapsar
              </Button>
            )}
          </Box>

          <List dense disablePadding sx={{ mb: 1.5 }}>
            {order.cart.slice(0, isExpanded ? undefined : isMobile ? 1 : 3).map((item: any) => (
              <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.5 }}>
                <ListItemText
                  primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                  secondaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                  primary={
                    <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                      <Box sx={{ flex: 1, mr: 1 }}>
                        <Typography component="span" variant="inherit">
                          <strong>{item.quantity}x</strong> {item.name}
                        </Typography>
                        {item.Description && (
                          <Typography
                            variant="inherit"
                            display="block"
                            sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.85em" }}
                          >
                            {item.Description}
                          </Typography>
                        )}
                      </Box>
                      <Typography component="span" variant="inherit" sx={{ whiteSpace: "nowrap" }}>
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    item.extras?.length > 0 && (
                      <List dense disablePadding sx={{ ml: isMobile ? 1 : 2, mt: 0.5 }}>
                        {item.extras.map((extra: any, idx: number) => (
                          <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0.25 }}>
                            <ListItemText
                              primaryTypographyProps={{ variant: isMobile ? "caption" : "body2", fontSize: "0.85em" }}
                              primary={
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Typography variant="inherit">+ {extra.name}</Typography>
                                  <Typography variant="inherit">${extra.price.toFixed(2)}</Typography>
                                </Box>
                              }
                            />
                          </ListItem>
                        ))}
                        {item?.comments && (
                          <ListItemText
                            primaryTypographyProps={{ variant: isMobile ? "caption" : "body2", fontSize: "0.85em" }}
                            primary={
                              <Box sx={{ mt: 0.5 }}>
                                <Typography variant="inherit">
                                  <strong>Comentario: </strong>
                                  {item?.comments}
                                </Typography>
                              </Box>
                            }
                          />
                        )}
                      </List>
                    )
                  }
                />
              </ListItem>
            ))}
            {!isExpanded && order.cart.length > (isMobile ? 1 : 3) && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  mt: 1,
                  cursor: "pointer",
                  fontSize: isMobile ? "0.7rem" : "0.8rem",
                  textAlign: "center",
                }}
                onClick={() => toggleCardExpansion(orderId)}
              >
                +{order.cart.length - (isMobile ? 1 : 3)} más...
              </Typography>
            )}
          </List>

          {order?.comments && (
            <>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ mb: 1.5 }}>
                <Typography
                  variant={isMobile ? "caption" : "body2"}
                  sx={{
                    display: "block",
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  <strong>Comentario General: </strong> {order?.comments}
                </Typography>
              </Box>
            </>
          )}

          <Divider sx={{ my: 1.5 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 1.5 : 0,
            }}
          >
            <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold" sx={{ mb: isMobile ? 1 : 0 }}>
              Total: ${total.toFixed(2)}
            </Typography>

            {isMobile ? (
              <Box sx={{ width: "100%" }}>
                {config.actions.length > 0 ? (
                  <ButtonGroup
                    fullWidth
                    variant="contained"
                    size="small"
                    sx={{ borderRadius: "8px", overflow: "hidden" }}
                  >
                    {config.actions.slice(0, 1).map((action: any, idx: number) => (
                      <Button
                        key={`${action.action}-${idx}`}
                        color={action.color as any}
                        startIcon={React.cloneElement(action.icon, { fontSize: "small" })}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOrderAction(action.action, order)
                        }}
                        disabled={isUpdating}
                        sx={{
                          flex: 1,
                          fontSize: "0.75rem",
                          py: 0.75,
                        }}
                      >
                        {action.label}
                      </Button>
                    ))}
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={(e) => handleOpenActionMenu(e, order)}
                      disabled={isUpdating}
                      sx={{ maxWidth: "40px", minWidth: "40px" }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>
                ) : (
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon fontSize="small" />}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenEditModal(order)
                    }}
                    disabled={isUpdating}
                    fullWidth
                    sx={{
                      fontSize: "0.75rem",
                      borderRadius: "8px",
                      py: 0.75,
                    }}
                  >
                    Editar
                  </Button>
                )}
              </Box>
            ) : (
              <Stack direction="row" spacing={1} width="auto">
                {config.actions.map((action: any, idx: number) => (
                  <Button
                    key={`${action.action}-${idx}`}
                    size="small"
                    variant="contained"
                    color={action.color as any}
                    startIcon={action.icon}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOrderAction(action.action, order)
                    }}
                    disabled={isUpdating}
                    sx={{
                      fontSize: "0.75rem",
                      borderRadius: "8px",
                      px: 1.5,
                    }}
                  >
                    {action.label}
                  </Button>
                ))}

                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon fontSize="small" />}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenEditModal(order)
                  }}
                  disabled={isUpdating}
                  sx={{
                    fontSize: "0.75rem",
                    borderRadius: "8px",
                    px: 1.5,
                  }}
                >
                  Editar
                </Button>
              </Stack>
            )}
          </Box>
        </CardContent>
      </Card>
    )
  })

  const handleToggleExpand = (orderId: string) => {
    setExpandedRows((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const OrderRow = React.memo(
    ({
      order,
      expandedRows,
      onToggleExpand,
    }: {
      order: any
      expandedRows: string[]
      onToggleExpand: (id: string) => void
    }) => {
      const status = order.status
      const config = statusConfig[status as keyof typeof statusConfig]
      const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
      const total = order.cart.reduce((sum: any, item: any) => {
        const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
        return sum + item.price * item.quantity + extrasTotal
      }, 0)

      const commentsOrderGeneral = order?.comments
      const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })

      const orderId = order._id || order.id
      const isExpanded = expandedRows.includes(orderId)

      const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation()
        onToggleExpand(orderId)
      }

      return (
        <>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              cursor: "pointer",
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
              },
            }}
            onClick={toggleExpand}
          >
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small" onClick={toggleExpand}>
                  {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </IconButton>
                <Typography variant="body2" fontWeight="bold" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                  #{order.id || order._id.slice(-4)}
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
                <Typography
                  variant="body2"
                  noWrap
                  sx={{ maxWidth: "150px", fontSize: isMobile ? "0.75rem" : "0.875rem" }}
                >
                  {order.fullname}
                </Typography>
              </Box>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              <Chip
                size="small"
                label={`${order.orderType}${order.dataTypeOrder ? ` / ${order.dataTypeOrder}` : ""}`}
                color={config.color as any}
                icon={React.cloneElement(config.icon, { fontSize: "small" })}
                sx={{ fontSize: isMobile ? "0.7rem" : "0.8rem", borderRadius: "16px" }}
              />
            </TableCell>
            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
              <Typography variant="body2" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                {totalItems} items
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" fontWeight="bold" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                ${total.toFixed(2)}
              </Typography>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
              <Typography variant="body2" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                {formattedTime}
              </Typography>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
              <Tooltip title={commentsOrderGeneral || "Sin comentarios"} arrow>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{ maxWidth: "150px", fontSize: isMobile ? "0.75rem" : "0.875rem" }}
                >
                  {commentsOrderGeneral || "-"}
                </Typography>
              </Tooltip>
            </TableCell>
            <TableCell>
              {isMobile ? (
                <IconButton size="small" color="primary" onClick={(e) => handleOpenActionMenu(e, order)}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              ) : (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    minWidth: "120px",
                    "& .MuiIconButton-root": {
                      mx: 0,
                    },
                    justifyContent: "center", // Center the action buttons
                  }}
                >
                  {config.actions.map((action: any, idx: number) => (
                    <Tooltip key={`${action.action}-${idx}`} title={action.label}>
                      <IconButton
                        size="small"
                        color={action.color as any}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOrderAction(action.action, order)
                        }}
                        disabled={isUpdating}
                      >
                        {React.cloneElement(action.icon, { fontSize: "small" })}
                      </IconButton>
                    </Tooltip>
                  ))}
                  <Tooltip title="Editar">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenEditModal(order)
                      }}
                      disabled={isUpdating}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              )}
            </TableCell>
          </TableRow>

          {/* Expanded details row */}
          <TableRow>
            <TableCell style={{ padding: 0 }} colSpan={8}>
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    p: { xs: 1.5, sm: 3 },
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: 600, fontSize: isMobile ? "0.875rem" : "1rem" }}
                  >
                    Detalles de la Orden
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
                        Productos:
                      </Typography>
                      <Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, bgcolor: "background.paper" }}>
                        <List dense disablePadding>
                          {order.cart.map((item: any, index: number) => (
                            <React.Fragment key={`${item.id}-${index}`}>
                              <ListItem disablePadding sx={{ py: 0.75 }}>
                                <ListItemText
                                  primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                  secondaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                  primary={
                                    <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                                      <Box sx={{ flex: 1, mr: 1 }}>
                                        <Typography component="span" variant="inherit">
                                          <strong>{item.quantity}x</strong> {item.name}
                                        </Typography>
                                        {item.Description && (
                                          <Typography
                                            variant="inherit"
                                            display="block"
                                            sx={{ mt: 0.5, color: "text.secondary" }}
                                          >
                                            {item.Description}
                                          </Typography>
                                        )}
                                      </Box>
                                      <Typography component="span" variant="inherit">
                                        ${(item.price * item.quantity).toFixed(2)}
                                      </Typography>
                                    </Box>
                                  }
                                  secondary={
                                    <div>
                                      {item.extras?.length > 0 && (
                                        <List dense disablePadding sx={{ ml: isMobile ? 1 : 2, mt: 0.5 }}>
                                          {item?.extras?.map((extra: any, idx: number) => (
                                            <ListItem key={`${item.id}-extra-${idx}`} disablePadding sx={{ py: 0.25 }}>
                                              <ListItemText
                                                primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                                primary={
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      justifyContent: "space-between",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <Typography variant="inherit">+ {extra.name}</Typography>
                                                    <Typography variant="inherit">${extra.price.toFixed(2)}</Typography>
                                                  </Box>
                                                }
                                              />
                                            </ListItem>
                                          ))}
                                        </List>
                                      )}
                                      {item?.comments && (
                                        <Box sx={{ mt: 1 }}>
                                          <Typography variant="inherit">
                                            <strong>Comentarios:</strong> {item?.comments || "Sin comentarios"}
                                          </Typography>
                                        </Box>
                                      )}
                                    </div>
                                  }
                                />
                              </ListItem>
                              {index < order.cart.length - 1 && <Divider sx={{ my: 0.5 }} />}
                            </React.Fragment>
                          ))}
                        </List>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
                        Información Adicional:
                      </Typography>
                      <Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, bgcolor: "background.paper" }}>
                        <List dense disablePadding>
                          <ListItem disablePadding sx={{ py: 0.75 }}>
                            <ListItemText
                              primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                              primary={
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <Typography variant="inherit">
                                    <strong>Estado:</strong>
                                  </Typography>
                                  <Chip
                                    size="small"
                                    label={config.label}
                                    color={config.color as any}
                                    icon={React.cloneElement(config.icon, { fontSize: "small" })}
                                    sx={{ fontSize: isMobile ? "0.7rem" : "0.8rem", borderRadius: "16px" }}
                                  />
                                </Box>
                              }
                            />
                          </ListItem>
                          <Divider sx={{ my: 0.5 }} />

                          <ListItem disablePadding sx={{ py: 0.75 }}>
                            <ListItemText
                              primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                              primary={
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Typography variant="inherit">
                                    <strong>Total:</strong>
                                  </Typography>
                                  <Typography variant="inherit" fontWeight="bold">
                                    ${total.toFixed(2)}
                                  </Typography>
                                </Box>
                              }
                            />
                          </ListItem>
                          <Divider sx={{ my: 0.5 }} />

                          {commentsOrderGeneral && (
                            <>
                              <ListItem disablePadding sx={{ py: 0.75 }}>
                                <ListItemText
                                  primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                  primary={
                                    <Box>
                                      <Typography variant="inherit">
                                        <strong>Comentarios:</strong>
                                      </Typography>
                                      <Typography
                                        variant="inherit"
                                        sx={{
                                          mt: 0.5,
                                          p: 1,
                                          borderRadius: 1,
                                          backgroundColor:
                                            theme.palette.mode === "dark"
                                              ? "rgba(255,255,255,0.05)"
                                              : "rgba(0,0,0,0.03)",
                                        }}
                                      >
                                        {commentsOrderGeneral}
                                      </Typography>
                                    </Box>
                                  }
                                />
                              </ListItem>
                              <Divider sx={{ my: 0.5 }} />
                            </>
                          )}

                          <ListItem disablePadding sx={{ py: 0.75 }}>
                            <ListItemText
                              primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                              primary={
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Typography variant="inherit">
                                    <strong>Hora:</strong>
                                  </Typography>
                                  <Typography variant="inherit">{formattedTime}</Typography>
                                </Box>
                              }
                            />
                          </ListItem>
                        </List>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      )
    },
  )

  // Custom Pagination Controls
  const PaginationControls = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 3,
        pb: 2,
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 2 : 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
          Órdenes por página:
        </Typography>
        <FormControl size="small" variant="outlined">
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            sx={{
              height: "36px",
              fontSize: isMobile ? "0.75rem" : "0.875rem",
              borderRadius: "8px",
              minWidth: "70px",
            }}
          >
            {pageSizeOptions.map((size) => (
              <MenuItem key={size} value={size} sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Pagination
        count={pageCount}
        page={currentPages[activeStatus]}
        onChange={handlePageChange}
        color="primary"
        size={isMobile ? "small" : "medium"}
        showFirstButton={!isMobile}
        showLastButton={!isMobile}
        siblingCount={isMobile ? 0 : 1}
        boundaryCount={isMobile ? 1 : 2}
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "8px",
          },
        }}
      />

      <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
        Mostrando {filteredOrders.length > 0 ? (currentPages[activeStatus] - 1) * pageSize + 1 : 0}-
        {Math.min(currentPages[activeStatus] * pageSize, filteredOrders.length)} de {filteredOrders.length} órdenes
      </Typography>
    </Box>
  )

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Custom AppBar */}
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: 1,
          borderColor: "divider",
          
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: isMobile ? 48 : 56,
            flexDirection: isMobile ? "column" : "row",
            py: isMobile ? 1 : 0,
            px: isMobile ? 1 : 2,
            justifyContent: "space-between", // Better spacing
          }}
        >
          {/* Logo and Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexGrow: 1,
              height: "40px",
              position: "relative",
              overflow: "hidden",
              width: isMobile ? "100%" : "auto",
              justifyContent: isMobile ? "center" : "flex-start", // Center on mobile
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                flexShrink: 0,
                ml: 0.5,
                bgcolor: theme.palette.primary.main,
              }}
            >
              <Image
                src={"/images/flama.png"}
                alt={"LlakaScript"}
                width={32}
                height={32}
                priority
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Avatar>

            <Box
              sx={{
                position: "relative",
                width: "auto",
                height: "100%",
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.1,
                  fontSize: isMobile ? "1rem" : undefined,
                  textAlign: isMobile ? "center" : "left",
                  color: theme.palette.primary.main,
                }}
              >
                {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
              </Typography>
            </Box>
          </Box>

          {/* Right side controls */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: isMobile ? "100%" : "auto",
              justifyContent: isMobile ? "center" : "flex-end", // Center on mobile
              mt: isMobile ? 1 : 0,
            }}
          >
            {/* View mode toggle */}
            <Tooltip title={viewMode === "card" ? "Vista lista" : "Vista tarjetas"}>
              <IconButton
                size="small"
                onClick={toggleViewMode}
                color="default"
                sx={{
                  borderRadius: "8px",
                }}
              >
                {viewMode === "card" ? (
                  <ViewListIcon fontSize={isMobile ? "small" : "medium"} />
                ) : (
                  <ViewColumnIcon fontSize={isMobile ? "small" : "medium"} />
                )}
              </IconButton>
            </Tooltip>

            {/* Connection status indicator */}
            <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: isConnected ? "success.main" : "error.main",
                  mr: 1,
                }}
              />
            </Tooltip>

            {/* Order count badge */}
            {isMobile && totalOrders > 0 && (
              <Badge
                badgeContent={totalOrders}
                color="primary"
                sx={{
                  mr: 0.5,
                  "& .MuiBadge-badge": {
                    fontSize: "0.7rem",
                    height: "18px",
                    minWidth: "18px",
                  },
                }}
              >
                <Box sx={{ width: 4, height: 4 }} />
              </Badge>
            )}

            {/* Last refresh time - hidden on mobile */}
            {lastRefresh && !isMobile && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: "0.75rem",
                  bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                  px: 1,
                  py: 0.5,
                  borderRadius: "4px",
                }}
              >
                Actualizado: {lastRefresh.toLocaleTimeString()}
              </Typography>
            )}

            {/* Refresh button */}
            <Tooltip title="Actualizar">
              <IconButton
                color="primary"
                size="small"
                onClick={fetchHistoricalOrders}
                disabled={isLoading || isUpdating}
                sx={{
                  borderRadius: "8px",
                }}
              >
                <RefreshIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Tooltip>

            {/* Header collapse toggle (mobile only) */}
            {isMobile && (
              <IconButton
                size="small"
                onClick={toggleHeader}
                sx={{
                  borderRadius: "8px",
                }}
              >
                {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
              </IconButton>
            )}

            <Tooltip title="Salir">
              <IconButton
                size="small"
                onClick={handleLogout}
                color="default"
                sx={{
                  borderRadius: "8px",
                }}
              >
                <LogoutIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="xl" sx={{ height: "100%", py: { xs: 1, sm: 2 } }}>
          <Paper
            elevation={isMobile ? 1 : 3}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: { xs: 2, sm: 3 },
              mx: "auto", // Center the paper
              width: "100%",
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                backgroundColor: theme.palette.primary.main,
                zIndex: 1,
                borderTopLeftRadius: { xs: "8px", sm: "12px" },
                borderTopRightRadius: { xs: "8px", sm: "12px" },
              },
            }}
          >
            {/* Status header - collapsible on mobile */}
            <Collapse in={!headerCollapsed} timeout="auto">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderBottom: "1px solid",
                  borderColor: theme.palette.divider,
                  overflow: "hidden",
                  p: { xs: 1.5, sm: 2 },
                  pt: { xs: 2, sm: 3 },
                }}
              >
                {/* Search bar */}
                <Box sx={{ width: "100%", maxWidth: "600px", mx: "auto", mb: 2 }}>
                  <TextField
                    fullWidth
                    size={isMobile ? "small" : "medium"}
                    variant="outlined"
                    placeholder="Buscar órdenes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize={isMobile ? "small" : "medium"} />
                        </InputAdornment>
                      ),
                      endAdornment: searchQuery && (
                        <InputAdornment position="end">
                          <IconButton onClick={clearSearch} size="small">
                            <ClearIcon fontSize={isMobile ? "small" : "medium"} />
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: "12px",
                      },
                    }}
                  />
                </Box>

                {/* Status tabs */}
                <Box sx={{ width: "100%", overflow: "auto", display: "flex", justifyContent: "center" }}>
                  <Tabs
                    value={activeStatus}
                    onChange={handleStatusChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                      minHeight: isMobile ? 40 : 48,
                      "& .MuiTab-root": {
                        minHeight: isMobile ? 40 : 48,
                        py: 0,
                        fontSize: isMobile ? "0.7rem" : "0.8rem",
                        px: isMobile ? 0.5 : 1.5,
                        borderRadius: "20px",
                        mx: 0.5,
                        "&.Mui-selected": {
                          backgroundColor:
                            theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                        },
                      },
                      "& .MuiTabs-indicator": {
                        height: 3,
                        borderRadius: "3px 3px 0 0",
                      },
                    }}
                  >
                    <Tab label="Todas" value="all" />
                    {statusOptions.map((status) => (
                      <Tab
                        key={status}
                        label={statusConfig[status as keyof typeof statusConfig].label}
                        value={status}
                        icon={React.cloneElement(statusConfig[status as keyof typeof statusConfig].icon, {
                          fontSize: isMobile ? "small" : "medium",
                        })}
                        iconPosition="start"
                      />
                    ))}
                  </Tabs>
                </Box>

                {/* Status indicators */}
                {(isLoading || isUpdating) && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1.5,
                      mt: 2,
                      mx: "auto",
                      maxWidth: "400px",
                      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                      borderRadius: 2,
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress size={16} color="primary" />
                    <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
                      {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Collapse>

            {/* Error messages */}
            <Box
              sx={{
                px: { xs: 1.5, sm: 2 },
                pt: { xs: 1.5, sm: 2 },
                overflow: "auto",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Center alerts
              }}
            >
              {error && (
                <Alert
                  severity="error"
                  onClose={() => clearMessages()}
                  sx={{
                    mb: 1.5,
                    maxWidth: "600px",
                    width: "100%",
                    borderRadius: 2,
                  }}
                >
                  {error}
                </Alert>
              )}

              {successMessage && (
                <Alert
                  severity="success"
                  onClose={() => clearMessages()}
                  sx={{
                    mb: 1.5,
                    maxWidth: "600px",
                    width: "100%",
                    borderRadius: 2,
                  }}
                >
                  {successMessage}
                </Alert>
              )}
            </Box>

            {/* Main content - takes all available space */}
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                p: { xs: 1.5, sm: 2 },
              }}
            >
              <PendingOrdersDialog open={openPendingDialog} onClose={() => setOpenPendingDialog(false)} />

              {/* Orders list */}
              <Box sx={{ flex: 1, maxWidth: viewMode === "list" ? "100%" : "1200px", mx: "auto", width: "100%" }}>
                {filteredOrders.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px",
                      flexDirection: "column",
                      gap: 2,
                      my: 4,
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                    }}
                  >
                    <Typography variant="h6" color="text.secondary" sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}>
                      No se encontraron órdenes
                    </Typography>
                    <Button
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      onClick={() => {
                        setSearchQuery("")
                        setActiveStatus("all")
                      }}
                      sx={{
                        borderRadius: "8px",
                        px: 3,
                      }}
                    >
                      Limpiar filtros
                    </Button>
                  </Box>
                ) : viewMode === "card" ? (
                  <>
                    <Grid container spacing={isMobile ? 1.5 : 2.5} justifyContent="center">
                      {paginatedOrders.map((order: any) => (
                        <Grid item xs={12} sm={isTablet ? 12 : 6} lg={4} key={order._id || order.id}>
                          <OrderCard order={order} />
                        </Grid>
                      ))}
                    </Grid>
                    <PaginationControls />
                  </>
                ) : (
                  <>
                    <TableContainer
                      component={Paper}
                      elevation={2}
                      sx={{
                        position: "relative",
                        overflow: "auto",
                        maxWidth: "100%",
                        borderRadius: 3,
                        "&:before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "4px",
                          backgroundColor: theme.palette.primary.main,
                          zIndex: 1,
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                        },
                      }}
                    >
                      <Table size={isMobile ? "small" : "medium"} sx={{ minWidth: isMobile ? 450 : 650 }}>
                        <TableHead>
                          <TableRow
                            sx={{
                              backgroundColor:
                                theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                            }}
                          >
                            <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem", fontWeight: "bold" }}>
                              ID
                            </TableCell>
                            <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem", fontWeight: "bold" }}>
                              Cliente
                            </TableCell>
                            <TableCell
                              sx={{
                                display: { xs: "none", sm: "table-cell" },
                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                fontWeight: "bold",
                              }}
                            >
                              Estado
                            </TableCell>
                            <TableCell
                              sx={{
                                display: { xs: "none", md: "table-cell" },
                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                fontWeight: "bold",
                              }}
                            >
                              Items
                            </TableCell>
                            <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem", fontWeight: "bold" }}>
                              Total
                            </TableCell>
                            <TableCell
                              sx={{
                                display: { xs: "none", md: "table-cell" },
                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                fontWeight: "bold",
                              }}
                            >
                              Hora
                            </TableCell>
                            <TableCell
                              sx={{
                                display: { xs: "none", lg: "table-cell" },
                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                fontWeight: "bold",
                              }}
                            >
                              Comentario General
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              Acciones
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {paginatedOrders.map((order: any) => (
                            <OrderRow
                              key={order._id || order.id}
                              order={order}
                              expandedRows={expandedRows}
                              onToggleExpand={handleToggleExpand}
                            />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <PaginationControls />
                  </>
                )}
              </Box>
            </Box>
          </Paper>
        </Container>

        {/* Scroll to top button */}
        <Zoom in={trigger}>
          <Box
            onClick={scrollToTop}
            role="presentation"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000,
            }}
          >
            <Fab
              color="primary"
              size="small"
              aria-label="scroll back to top"
              sx={{
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}
            >
              <KeyboardArrowUp />
            </Fab>
          </Box>
        </Zoom>
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleCloseActionMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            minWidth: 180,
            borderRadius: "12px",
            overflow: "hidden",
          },
        }}
      >
        {actionMenuOrder &&
          statusConfig[actionMenuOrder.status as keyof typeof statusConfig].actions.map((action: any) => (
            <MenuItem
              key={action.action}
              onClick={() => handleActionMenuItemClick(action.action)}
              sx={{
                color:
                  (theme.palette[action.color as keyof typeof theme.palette] as PaletteColor)?.main ??
                  theme.palette.text.primary,
                fontSize: "0.875rem",
                py: 1.5,
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: "36px" }}>
                {React.cloneElement(action.icon, { fontSize: "small" })}
              </ListItemIcon>
              {action.label}
            </MenuItem>
          ))}
        <MenuItem
          onClick={() => handleActionMenuItemClick("edit")}
          sx={{
            fontSize: "0.875rem",
            py: 1.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: "36px" }}>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Editar
        </MenuItem>
      </Menu>

      {/* Edit Order Modal */}
      {isEditModalOpen && selectedOrder && (
        <EditOrderModal
          open={isEditModalOpen}
          order={selectedOrder}
          onSave={saveUpdateData}
          menuData={{
            mainMenu: hojas?.Hoja1 || [],
            promotions: hojas?.Promotion || [],
          }}
          onClose={handleCloseEditModal}
        />
      )}
    </Box>
  )
}

export default OrderSpeedGeneric
