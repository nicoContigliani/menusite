// // import React, { useEffect, useState, useMemo } from "react";
// // import { useSelector } from "react-redux";
// // import { RootState } from "../../../store/store";
// // import {
// //   Box,
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   Avatar,
// //   Button,
// //   CircularProgress,
// //   Alert,
// //   Snackbar,
// //   useTheme,

// //   Tooltip,
// //   useMediaQuery,
// //   IconButton,
// //   Divider
// // } from "@mui/material";
// // import LogoutIcon from '@mui/icons-material/Logout';
// // import { motion, AnimatePresence } from "framer-motion";
// // import Image from "next/image";
// // import GutterlessList from "../GenericList/OrdersList";
// // import useSocketChat from "../../../hooks/useSocket";
// // import { Check, Refresh } from "@mui/icons-material";
// // import Chat from "../Chat/Chat";
// // import { useOrderUpdates } from "../../../hooks/useOrderUpdates";
// // import { clearLocalhostStorage } from "@/services/localstorage.services";
// // import { recordAttendance } from "@/services/attendance.services";

// // const OrdersSpeed = () => {
// //   // ======================================
// //   // REDUX SELECTORS
// //   // ======================================
// //   const { data } = useSelector(
// //     (state: RootState) => state.chExcelData as unknown as { data: any }
// //   );
// //   const user = useSelector((state: RootState) => state.auth);
// //   const theme = useTheme()

// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
// //   const isTablet = useMediaQuery(theme.breakpoints.down("md"))
// //   // ======================================
// //   // STATE MANAGEMENT
// //   // ======================================
// //   // Orders state
// //   const [historicalOrders, setHistoricalOrders] = useState<any[]>([]);
// //   const [isLoadingHistory, setIsLoadingHistory] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
// //   const [showConnectionStatus, setShowConnectionStatus] = useState(true);
// //   const [displayTitle, setDisplayTitle] = useState(false)


// //   // Custom hooks for order updates and socket
// //   const {
// //     updateOrderStatus,
// //     bulkUpdateOrders,
// //     isUpdating,
// //     updateError,
// //     successMessage,
// //     clearMessages,
// //     setUpdateError
// //   } = useOrderUpdates();

// //   const {
// //     name,
// //     setName,
// //     room,
// //     setRoom,
// //     message,
// //     setMessage,
// //     messages,
// //     joinRoom,
// //     sendMessage,
// //     sendOrder,
// //     parsedMessages,
// //     isConnected,
// //     reconnectAttempts,
// //   } = useSocketChat('https://socketserver-t4g9.onrender.com');


// //   const handleLogout = async () => {
// //     clearLocalhostStorage();
// //     await recordAttendance('getOut', user?.user?.email, data?.companyName);
// //     window.location.reload();
// //   };

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setDisplayTitle((prev) => !prev)
// //     }, 5000)
// //     return () => clearInterval(interval)
// //   }, [])

// //   // ======================================
// //   // MEMOIZED VALUES
// //   // ======================================
// //   const mergedOrders = useMemo(() => {
// //     const socketOrders = Array.isArray(parsedMessages) ? parsedMessages : [];
// //     const allOrders = [...historicalOrders, ...socketOrders];

// //     // Remove duplicates by ID
// //     const uniqueOrders = allOrders.reduce((acc: any[], current: any) => {
// //       if (!acc.some(item => item._id === current._id)) {
// //         acc.push(current);
// //       }
// //       return acc;
// //     }, []);

// //     // Sort by date (newest first)
// //     return uniqueOrders.sort((a, b) =>
// //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
// //     );
// //   }, [historicalOrders, parsedMessages]);

// //   // ======================================
// //   // API FUNCTIONS
// //   // ======================================
// //   const fetchHistoricalOrders = async () => {
// //     if (!data?.companyName) return;

// //     setIsLoadingHistory(true);
// //     setError(null);

// //     try {
// //       const params = new URLSearchParams({
// //         status: 'pending,processing,progress,paused',
// //         sort: 'desc',
// //         limit: '50',
// //         company: data.companyName
// //       });

// //       const res = await fetch(`/api/orders?${params}`);
// //       if (!res.ok) throw new Error(`Error: ${res.status}`);

// //       const orders = await res.json();
// //       setHistoricalOrders(Array.isArray(orders) ? orders : []);
// //       setLastRefresh(new Date());
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Error desconocido');
// //       console.error("Error fetching historical orders:", err);
// //     } finally {
// //       setIsLoadingHistory(false);
// //     }
// //   };

// //   // ======================================
// //   // EVENT HANDLERS
// //   // ======================================
// //   const handleOrderAction = async (action: any, order: any) => {
// //     try {
// //       let newStatus = '';

// //       switch (action) {
// //         case 'start': newStatus = 'processing'; break;
// //         case 'pause': newStatus = 'paused'; break;
// //         case 'resume': newStatus = 'processing'; break;
// //         case 'complete': newStatus = 'finished'; break;
// //         case 'cancel': newStatus = 'cancelled'; break;
// //         case 'reopen': newStatus = 'pending'; break;
// //         default: return;
// //       }

// //       await updateOrderStatus(order._id, newStatus);
// //       if (newStatus === 'finished') sendOrder(order, `kichent-${data?.companyName}`);
// //       if (newStatus === 'cancelled') sendOrder(order, `kichent-${data?.companyName}`);
// //       if (newStatus === 'processing') sendOrder(order, `kichent-${data?.companyName}`);

// //       // Update local state
// //       setHistoricalOrders(prev => prev.map(o =>
// //         o._id === order._id ? { ...o, status: newStatus } : o
// //       ));
// //     } catch (error) {
// //       console.error("Error handling order action:", error);
// //     }
// //   };

// //   // ======================================
// //   // EFFECTS
// //   // ======================================
// //   // Initial setup
// //   useEffect(() => {
// //     const initialize = async () => {
// //       if (user) setName(user?.user?.email || '');
// //       if (data) {
// //         setRoom(data?.companyName || '');
// //         await fetchHistoricalOrders();
// //       }
// //     };

// //     initialize();

// //     return () => {
// //       setHistoricalOrders([]);
// //     };
// //   }, [user, data, setName, setRoom]);

// //   // Join room when ready
// //   useEffect(() => {
// //     if (name && room && isConnected) {
// //       joinRoom();
// //     }
// //   }, [name, room, isConnected, joinRoom]);

// //   // Connection status display
// //   useEffect(() => {
// //     if (isConnected) {
// //       const timer = setTimeout(() => setShowConnectionStatus(false), 2000);
// //       return () => clearTimeout(timer);
// //     } else {
// //       setShowConnectionStatus(true);
// //     }
// //   }, [isConnected, reconnectAttempts]);

// //   // ======================================
// //   // RENDER
// //   // ======================================
// //   return (
// //     <div>
// //       <Box sx={{ pb: 7 }}>
// //         {/* App Header */}
// //         <AppBar
// //           color="primary"
// //           position="static"
// //           component={motion.div}
// //           initial={false}
// //           transition={{ duration: 0.7 }}
// //           elevation={0}
// //           sx={{
// //             bgcolor: "background.paper",
// //             color: "text.primary",
// //             borderBottom: 1,
// //             borderColor: "divider",
// //           }}
// //         >
// //           <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
// //             {/* Logo and Title */}
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: 1,
// //                 flexGrow: 1,
// //                 height: "40px",
// //                 position: "relative",
// //                 overflow: "hidden",
// //               }}
// //             >
// //               <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //                 <Avatar
// //                   sx={{
// //                     width: 28,
// //                     height: 28,
// //                     flexShrink: 0,
// //                     ml: 0.5,
// //                   }}
// //                 >
// //                   <Image
// //                     src={"/images/flama.png"}
// //                     alt={"LlakaScript"}
// //                     width={28}
// //                     height={28}
// //                     priority
// //                     style={{
// //                       objectFit: "contain",
// //                       width: "100%",
// //                       height: "100%",
// //                     }}
// //                   />
// //                 </Avatar>
// //               </motion.div>

// //               <Box
// //                 sx={{
// //                   position: "relative",
// //                   width: "auto",
// //                   height: "100%",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   flexGrow: 1,
// //                 }}
// //               >
// //                 <AnimatePresence mode="wait">
// //                   <motion.div
// //                     key={displayTitle ? "LlakaScript" : "Admin Cocina"}
// //                     initial={{ opacity: 0, x: -10 }}
// //                     animate={{ opacity: 1, x: 0 }}
// //                     exit={{ opacity: 0, x: 10 }}
// //                     transition={{ duration: 0.3 }}
// //                     style={{
// //                       position: "absolute",
// //                       left: 0,
// //                       whiteSpace: "nowrap",
// //                     }}
// //                   >
// //                     <Typography
// //                       variant={isMobile ? "subtitle1" : "h6"}
// //                       sx={{
// //                         fontWeight: 600,
// //                         lineHeight: 1.1,
// //                         fontSize: isMobile ? "1rem" : undefined,
// //                       }}
// //                     >
// //                       {displayTitle ? "LlakaScript" : "Admin Cocina"}
// //                     </Typography>
// //                   </motion.div>
// //                 </AnimatePresence>
// //               </Box>
// //             </Box>

// //             <Box display="inline-block" minWidth="120px" textAlign="center" my={1}>
// //               <AnimatePresence>
// //                 {!isConnected ? (
// //                   <motion.div
// //                     key="connecting"
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, y: 10 }}
// //                     transition={{ duration: 0.3 }}
// //                   >
// //                     <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="text.secondary">
// //                       <motion.div
// //                         animate={{ opacity: [0.6, 1, 0.6] }}
// //                         transition={{
// //                           repeat: Infinity,
// //                           duration: 1.5,
// //                           ease: "easeInOut"
// //                         }}
// //                       >
// //                         <Typography variant="body2">
// //                           Conectando... {reconnectAttempts > 0 && `(Intento ${reconnectAttempts})`}
// //                         </Typography>
// //                       </motion.div>
// //                       <Box display="flex">
// //                         {[...Array(3)].map((_, i) => (
// //                           <motion.div
// //                             key={i}
// //                             animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
// //                             transition={{
// //                               repeat: Infinity,
// //                               duration: 1.2,
// //                               delay: i * 0.2
// //                             }}
// //                           >
// //                             <Typography variant="body2" fontWeight="bold" color="primary">.</Typography>
// //                           </motion.div>
// //                         ))}
// //                       </Box>
// //                     </Box>
// //                   </motion.div>
// //                 ) : (
// //                   <motion.div
// //                     key="connected"
// //                     initial={{ opacity: 0, scale: 0.8 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     exit={{ opacity: 0, scale: 0.5 }}
// //                     transition={{ duration: 0.5 }}
// //                   >
// //                     <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="success.main">
// //                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
// //                         <Typography variant="body2">Conectado</Typography>
// //                       </motion.div>
// //                       <motion.div
// //                         initial={{ scale: 0 }}
// //                         animate={{ scale: 1 }}
// //                         transition={{ type: "spring", stiffness: 500, damping: 15 }}
// //                       >
// //                         <Check color="success" fontSize="small" />
// //                       </motion.div>
// //                     </Box>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //             </Box>
// //             <Divider 
// //               orientation="vertical" 
// //               flexItem 
// //               sx={{ mx: 5, borderStyle: "hidden", borderColor: "text.secondary", borderWidth: 1 }} 
// //             />

// //             {/* Right side controls */}
// //             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>


// //               {/* Last refresh time */}
// //               {lastRefresh && !isMobile && (
// //                 <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// //                   Actualizado: {lastRefresh.toLocaleTimeString()}
// //                 </Typography>
// //               )}

// //               {/* Refresh button */}
// //               <Tooltip title="Actualizar">
// //                 <IconButton
// //                   color="primary"
// //                   size="small"
// //                   onClick={fetchHistoricalOrders}
// //                   disabled={isLoadingHistory || isUpdating}
// //                 >
// //                   <Refresh fontSize="small" />
// //                 </IconButton>
// //               </Tooltip>


// //               <Tooltip title="Salir">
// //                 <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //                   <IconButton
// //                     size="small"
// //                     onClick={() => handleLogout}
// //                     color="default"
// //                   >
// //                     <LogoutIcon fontSize="small" />
// //                   </IconButton>
// //                 </motion.div>
// //               </Tooltip>
// //             </Box>
// //           </Toolbar>
// //         </AppBar>

// //         {/* Main Content */}
// //           {/* Connection Status */}
// //         <Box sx={{ textAlign: "center", p: 1 }}>
// //           {/* {showConnectionStatus && (
// //             <Box display="inline-block" minWidth="120px" textAlign="center" my={1}>
// //               <AnimatePresence>
// //                 {!isConnected ? (
// //                   <motion.div
// //                     key="connecting"
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, y: 10 }}
// //                     transition={{ duration: 0.3 }}
// //                   >
// //                     <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="text.secondary">
// //                       <motion.div
// //                         animate={{ opacity: [0.6, 1, 0.6] }}
// //                         transition={{
// //                           repeat: Infinity,
// //                           duration: 1.5,
// //                           ease: "easeInOut"
// //                         }}
// //                       >
// //                         <Typography variant="body2">
// //                           Conectando... {reconnectAttempts > 0 && `(Intento ${reconnectAttempts})`}
// //                         </Typography>
// //                       </motion.div>
// //                       <Box display="flex">
// //                         {[...Array(3)].map((_, i) => (
// //                           <motion.div
// //                             key={i}
// //                             animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
// //                             transition={{
// //                               repeat: Infinity,
// //                               duration: 1.2,
// //                               delay: i * 0.2
// //                             }}
// //                           >
// //                             <Typography variant="body2" fontWeight="bold" color="primary">.</Typography>
// //                           </motion.div>
// //                         ))}
// //                       </Box>
// //                     </Box>
// //                   </motion.div>
// //                 ) : (
// //                   <motion.div
// //                     key="connected"
// //                     initial={{ opacity: 0, scale: 0.8 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     exit={{ opacity: 0, scale: 0.5 }}
// //                     transition={{ duration: 0.5 }}
// //                   >
// //                     <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="success.main">
// //                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
// //                         <Typography variant="body2">Conectado</Typography>
// //                       </motion.div>
// //                       <motion.div
// //                         initial={{ scale: 0 }}
// //                         animate={{ scale: 1 }}
// //                         transition={{ type: "spring", stiffness: 500, damping: 15 }}
// //                       >
// //                         <Check color="success" fontSize="small" />
// //                       </motion.div>
// //                     </Box>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //             </Box>
// //           )} */}

// //           {/* Refresh Controls */}
// //           {/* <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
// //             <Button
// //               variant="outlined"
// //               startIcon={<Refresh />}
// //               onClick={fetchHistoricalOrders}
// //               disabled={isLoadingHistory || isUpdating}
// //               size="small"
// //             >
// //               Recargar Historial
// //             </Button>

// //             {lastRefresh && (
// //               <Typography variant="caption" color="text.secondary">
// //                 Última actualización: {lastRefresh.toLocaleTimeString()}
// //               </Typography>
// //             )}
// //           </Box> */}

// //           {/* Error Handling */}
// //           {error && (
// //             <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }} onClose={() => setError(null)}>
// //               {error}
// //             </Alert>
// //           )}

// //           {updateError && (
// //             <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }} onClose={() => setUpdateError(null)}>
// //               {updateError}
// //             </Alert>
// //           )}

// //           {/* Loading Indicators */}
// //           {(isLoadingHistory || isUpdating) && (
// //             <Box display="flex" justifyContent="center" my={2}>
// //               <CircularProgress size={24} />
// //               <Typography variant="body2" ml={2}>
// //                 {isUpdating ? "Actualizando orden..." : "Cargando historial de órdenes..."}
// //               </Typography>
// //             </Box>
// //           )}

// //           {/* Orders List */}
// //           <GutterlessList
// //             data={mergedOrders}
// //             loading={isLoadingHistory || isUpdating}
// //             onAction={handleOrderAction}
// //           />
// //         </Box>

// //         {/* Chat Component */}
// //         {/* <Box sx={{ textAlign: "center", p: 3 }}>
// //           <Typography variant="h6" gutterBottom>
// //             Chat con Salas
// //           </Typography>
// //           <Chat />
// //         </Box> */}

// //         {/* Success Notification */}
// //         <Snackbar
// //           open={!!successMessage}
// //           autoHideDuration={3000}
// //           onClose={clearMessages}
// //           message={successMessage}
// //           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// //         />
// //       </Box>
// //     </div>
// //   );
// // };

// // export default OrdersSpeed;




// // import React, { useEffect, useState, useMemo } from "react";
// // import { useSelector } from "react-redux";
// // import { RootState } from "../../../store/store";
// // import {
// //   Box,
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   Avatar,
// //   Button,
// //   CircularProgress,
// //   Alert,
// //   Snackbar,
// //   useTheme,
// //   Tooltip,
// //   useMediaQuery,
// //   IconButton,
// //   Divider
// // } from "@mui/material";
// // import LogoutIcon from '@mui/icons-material/Logout';
// // import { motion, AnimatePresence } from "framer-motion";
// // import Image from "next/image";
// // import GutterlessList from "../GenericList/OrdersList";
// // import useSocketChat from "../../../hooks/useSocket";
// // import { Check, Refresh } from "@mui/icons-material";
// // import Chat from "../Chat/Chat";
// // import { useOrderUpdates } from "../../../hooks/useOrderUpdates";
// // import { clearLocalhostStorage } from "@/services/localstorage.services";
// // import { recordAttendance } from "@/services/attendance.services";

// // const OrdersSpeed = () => {
// //   // ======================================
// //   // REDUX SELECTORS
// //   // ======================================
// //   const { data } = useSelector(
// //     (state: RootState) => state.chExcelData as unknown as { data: any }
// //   );
// //   const user = useSelector((state: RootState) => state.auth);
// //   const theme = useTheme()

// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
// //   const isTablet = useMediaQuery(theme.breakpoints.down("md"))
// //   // ======================================
// //   // STATE MANAGEMENT
// //   // ======================================
// //   // Orders state
// //   const [historicalOrders, setHistoricalOrders] = useState<any[]>([]);
// //   const [isLoadingHistory, setIsLoadingHistory] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
// //   const [showConnectionStatus, setShowConnectionStatus] = useState(true);
// //   const [displayTitle, setDisplayTitle] = useState(false)

// //   // Custom hooks for order updates and socket
// //   const {
// //     updateOrderStatus,
// //     bulkUpdateOrders,
// //     isUpdating,
// //     updateError,
// //     successMessage,
// //     clearMessages,
// //     setUpdateError
// //   } = useOrderUpdates();

// //   const {
// //     name,
// //     setName,
// //     room,
// //     setRoom,
// //     message,
// //     setMessage,
// //     messages,
// //     joinRoom,
// //     sendMessage,
// //     sendOrder,
// //     parsedMessages,
// //     isConnected,
// //     reconnectAttempts,
// //   } = useSocketChat('https://socketserver-t4g9.onrender.com');

// //   const handleLogout = async () => {
// //     clearLocalhostStorage();
// //     await recordAttendance('getOut', user?.user?.email, data?.companyName);
// //     window.location.reload();
// //   };

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setDisplayTitle((prev) => !prev)
// //     }, 5000)
// //     return () => clearInterval(interval)
// //   }, [])

// //   // ======================================
// //   // MEMOIZED VALUES
// //   // ======================================
// //   const mergedOrders = useMemo(() => {
// //     const socketOrders = Array.isArray(parsedMessages) ? parsedMessages : [];
// //     const allOrders = [...historicalOrders, ...socketOrders];

// //     // Remove duplicates by ID
// //     const uniqueOrders = allOrders.reduce((acc: any[], current: any) => {
// //       if (!acc.some(item => item._id === current._id)) {
// //         acc.push(current);
// //       }
// //       return acc;
// //     }, []);

// //     // Sort by date (newest first)
// //     return uniqueOrders.sort((a, b) =>
// //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
// //     );
// //   }, [historicalOrders, parsedMessages]);

// //   // ======================================
// //   // API FUNCTIONS
// //   // ======================================
// //   const fetchHistoricalOrders = async () => {
// //     if (!data?.companyName) return;

// //     setIsLoadingHistory(true);
// //     setError(null);

// //     try {
// //       const params = new URLSearchParams({
// //         status: 'pending,processing,progress,paused',
// //         sort: 'desc',
// //         limit: '50',
// //         company: data.companyName
// //       });

// //       const res = await fetch(`/api/orders?${params}`);
// //       if (!res.ok) throw new Error(`Error: ${res.status}`);

// //       const orders = await res.json();
// //       setHistoricalOrders(Array.isArray(orders) ? orders : []);
// //       setLastRefresh(new Date());
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Error desconocido');
// //       console.error("Error fetching historical orders:", err);
// //     } finally {
// //       setIsLoadingHistory(false);
// //     }
// //   };

// //   // ======================================
// //   // EVENT HANDLERS
// //   // ======================================
// //   const handleOrderAction = async (action: any, order: any) => {
// //     try {
// //       let newStatus = '';

// //       switch (action) {
// //         case 'start': newStatus = 'processing'; break;
// //         case 'pause': newStatus = 'paused'; break;
// //         case 'resume': newStatus = 'processing'; break;
// //         case 'complete': newStatus = 'finished'; break;
// //         case 'cancel': newStatus = 'cancelled'; break;
// //         case 'reopen': newStatus = 'pending'; break;
// //         default: return;
// //       }

// //       await updateOrderStatus(order._id, newStatus);
// //       if (newStatus === 'processing') sendOrder(order, `kichent-${data?.companyName}`);
// //       if (newStatus === 'pause') sendOrder(order, `kichent-${data?.companyName}`);
// //       if (newStatus === 'resume') sendOrder(order, `kichent-${data?.companyName}`);
// //       if (newStatus === 'complete') sendOrder(order, `kichent-${data?.companyName}`);
// //       if (newStatus === 'reopen') sendOrder(order, `kichent-${data?.companyName}`);


// //       if (newStatus === 'cancelled') sendOrder(order, `kichent-${data?.companyName}`);
// //       if (newStatus === 'finished') sendOrder(order, `kichent-${data?.companyName}`);


// //       // Update local state
// //       setHistoricalOrders(prev => prev.map(o =>
// //         o._id === order._id ? { ...o, status: newStatus } : o
// //       ));
// //     } catch (error) {
// //       console.error("Error handling order action:", error);
// //     }
// //   };

// //   // ======================================
// //   // EFFECTS
// //   // ======================================
// //   // Initial setup
// //   useEffect(() => {
// //     const initialize = async () => {
// //       if (user) setName(user?.user?.email || '');
// //       if (data) {
// //         setRoom(data?.companyName || '');
// //         await fetchHistoricalOrders();
// //       }
// //     };

// //     initialize();

// //     return () => {
// //       setHistoricalOrders([]);
// //     };
// //   }, [user, data]);

// //   // Join room when ready
// //   useEffect(() => {
// //     if (name && room && isConnected) {
// //       joinRoom();
// //     }
// //   }, [name, room, isConnected, joinRoom]);

// //   // Connection status display
// //   useEffect(() => {
// //     if (isConnected) {
// //       const timer = setTimeout(() => setShowConnectionStatus(false), 2000);
// //       return () => clearTimeout(timer);
// //     } else {
// //       setShowConnectionStatus(true);
// //     }
// //   }, [isConnected, reconnectAttempts]);

// //   // ======================================
// //   // RENDER
// //   // ======================================
// //   return (
// //     <div>
// //       <Box sx={{ pb: 7 }}>
// //         {/* App Header */}
// //         <AppBar
// //           color="primary"
// //           position="static"
// //           component={motion.div}
// //           initial={false}
// //           transition={{ duration: 0.7 }}
// //           elevation={0}
// //           sx={{
// //             bgcolor: "background.paper",
// //             color: "text.primary",
// //             borderBottom: 1,
// //             borderColor: "divider",
// //           }}
// //         >
// //           <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
// //             {/* Logo and Title */}
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: 1,
// //                 flexGrow: 1,
// //                 height: "40px",
// //                 position: "relative",
// //                 overflow: "hidden",
// //               }}
// //             >
// //               <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //                 <Avatar
// //                   sx={{
// //                     width: 28,
// //                     height: 28,
// //                     flexShrink: 0,
// //                     ml: 0.5,
// //                   }}
// //                 >
// //                   <Image
// //                     src={"/images/flama.png"}
// //                     alt={"LlakaScript"}
// //                     width={28}
// //                     height={28}
// //                     priority
// //                     style={{
// //                       objectFit: "contain",
// //                       width: "100%",
// //                       height: "100%",
// //                     }}
// //                   />
// //                 </Avatar>
// //               </motion.div>

// //               <Box
// //                 sx={{
// //                   position: "relative",
// //                   width: "auto",
// //                   height: "100%",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   flexGrow: 1,
// //                 }}
// //               >
// //                 <AnimatePresence mode="wait">
// //                   <motion.div
// //                     key={displayTitle ? "LlakaScript" : "Admin Cocina"}
// //                     initial={{ opacity: 0, x: -10 }}
// //                     animate={{ opacity: 1, x: 0 }}
// //                     exit={{ opacity: 0, x: 10 }}
// //                     transition={{ duration: 0.3 }}
// //                     style={{
// //                       position: "absolute",
// //                       left: 0,
// //                       whiteSpace: "nowrap",
// //                     }}
// //                   >
// //                     <Typography
// //                       variant={isMobile ? "subtitle1" : "h6"}
// //                       sx={{
// //                         fontWeight: 600,
// //                         lineHeight: 1.1,
// //                         fontSize: isMobile ? "1rem" : undefined,
// //                       }}
// //                     >
// //                       {displayTitle ? "LlakaScript" : "Admin Cocina"}
// //                     </Typography>
// //                   </motion.div>
// //                 </AnimatePresence>
// //               </Box>
// //             </Box>

// //             <Box display="inline-block" minWidth="120px" textAlign="center" my={1}>
// //               <AnimatePresence>
// //                 {!isConnected ? (
// //                   <motion.div
// //                     key="connecting"
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, y: 10 }}
// //                     transition={{ duration: 0.3 }}
// //                   >
// //                     <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="text.secondary">
// //                       <motion.div
// //                         animate={{ opacity: [0.6, 1, 0.6] }}
// //                         transition={{
// //                           repeat: Infinity,
// //                           duration: 1.5,
// //                           ease: "easeInOut"
// //                         }}
// //                       >
// //                         <Typography variant="body2">
// //                           Conectando... {reconnectAttempts > 0 && `(Intento ${reconnectAttempts})`}
// //                         </Typography>
// //                       </motion.div>
// //                       <Box display="flex">
// //                         {[...Array(3)].map((_, i) => (
// //                           <motion.div
// //                             key={i}
// //                             animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
// //                             transition={{
// //                               repeat: Infinity,
// //                               duration: 1.2,
// //                               delay: i * 0.2
// //                             }}
// //                           >
// //                             <Typography variant="body2" fontWeight="bold" color="primary">.</Typography>
// //                           </motion.div>
// //                         ))}
// //                       </Box>
// //                     </Box>
// //                   </motion.div>
// //                 ) : (
// //                   <motion.div
// //                     key="connected"
// //                     initial={{ opacity: 0, scale: 0.8 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     exit={{ opacity: 0, scale: 0.5 }}
// //                     transition={{ duration: 0.5 }}
// //                   >
// //                     <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="success.main">
// //                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
// //                         <Typography variant="body2">Conectado</Typography>
// //                       </motion.div>
// //                       <motion.div
// //                         initial={{ scale: 0 }}
// //                         animate={{ scale: 1 }}
// //                         transition={{ type: "spring", stiffness: 500, damping: 15 }}
// //                       >
// //                         <Check color="success" fontSize="small" />
// //                       </motion.div>
// //                     </Box>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //             </Box>
// //             <Divider
// //               orientation="vertical"
// //               flexItem
// //               sx={{ mx: 5, borderStyle: "hidden", borderColor: "text.secondary", borderWidth: 1 }}
// //             />

// //             {/* Right side controls */}
// //             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// //               {/* Last refresh time */}
// //               {lastRefresh && !isMobile && (
// //                 <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// //                   Actualizado: {lastRefresh.toLocaleTimeString()}
// //                 </Typography>
// //               )}

// //               {/* Refresh button */}
// //               <Tooltip title="Actualizar">
// //                 <IconButton
// //                   color="primary"
// //                   size="small"
// //                   onClick={fetchHistoricalOrders}
// //                   disabled={isLoadingHistory || isUpdating}
// //                 >
// //                   <Refresh fontSize="small" />
// //                 </IconButton>
// //               </Tooltip>

// //               <Tooltip title="Salir">
// //                 <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //                   <IconButton
// //                     size="small"
// //                     onClick={handleLogout}  // Corregido: removido el arrow function innecesario
// //                     color="default"
// //                   >
// //                     <LogoutIcon fontSize="small" />
// //                   </IconButton>
// //                 </motion.div>
// //               </Tooltip>
// //             </Box>
// //           </Toolbar>
// //         </AppBar>

// //         {/* Main Content */}
// //         <Box sx={{ textAlign: "center", p: 1 }}>
// //           {/* Error Handling */}
// //           {error && (
// //             <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }} onClose={() => setError(null)}>
// //               {error}
// //             </Alert>
// //           )}

// //           {updateError && (
// //             <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }} onClose={() => setUpdateError(null)}>
// //               {updateError}
// //             </Alert>
// //           )}

// //           {/* Loading Indicators */}
// //           {(isLoadingHistory || isUpdating) && (
// //             <Box display="flex" justifyContent="center" my={2}>
// //               <CircularProgress size={24} />
// //               <Typography variant="body2" ml={2}>
// //                 {isUpdating ? "Actualizando orden..." : "Cargando historial de órdenes..."}
// //               </Typography>
// //             </Box>
// //           )}

// //           {/* Orders List */}
// //           <GutterlessList
// //             data={mergedOrders}
// //             loading={isLoadingHistory || isUpdating}
// //             onAction={handleOrderAction}
// //           />
// //         </Box>

// //         {/* Success Notification */}
// //         <Snackbar
// //           open={!!successMessage}
// //           autoHideDuration={3000}
// //           onClose={clearMessages}
// //           message={successMessage}
// //           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// //         />
// //       </Box>
// //     </div>
// //   );
// // };

// // export default OrdersSpeed;




// // import React, { useEffect, useState, useMemo } from "react";
// // import { useSelector } from "react-redux";
// // import { RootState } from "../../../store/store";
// // import {
// //   Box,
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   Avatar,
// //   CircularProgress,
// //   Alert,
// //   Snackbar,
// //   useTheme,
// //   Tooltip,
// //   useMediaQuery,
// //   IconButton,
// //   Divider
// // } from "@mui/material";
// // import LogoutIcon from '@mui/icons-material/Logout';
// // import { motion, AnimatePresence } from "framer-motion";
// // import Image from "next/image";
// // import GutterlessList from "../GenericList/OrdersList";
// // import useSocketChat from "../../../hooks/useSocket";
// // import { Check, Refresh } from "@mui/icons-material";
// // import { useOrderUpdates } from "../../../hooks/useOrderUpdates";
// // import { clearLocalhostStorage } from "@/services/localstorage.services";
// // import { recordAttendance } from "@/services/attendance.services";

// // const OrdersSpeed = () => {
// //   // Redux selectors
// //   const { data }: any = useSelector((state: RootState) => state.chExcelData);
// //   const user = useSelector((state: RootState) => state.auth);
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

// //   // State management
// //   const [historicalOrders, setHistoricalOrders] = useState<any[]>([]);
// //   const [isLoadingHistory, setIsLoadingHistory] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
// //   const [displayTitle, setDisplayTitle] = useState(false);

// //   // Custom hooks
// //   const {
// //     updateOrderStatus,
// //     isUpdating,
// //     updateError,
// //     successMessage,
// //     clearMessages,
// //     setUpdateError
// //   } = useOrderUpdates();

// //   const {
// //     name,
// //     setName,
// //     room,
// //     setRoom,
// //     message,
// //     setMessage,
// //     messages,
// //     joinRoom,
// //     sendMessage,
// //     sendOrder,
// //     parsedMessages,
// //     isConnected,
// //     reconnectAttempts,
// //   } = useSocketChat('https://socketserver-t4g9.onrender.com');


// //   // Effects
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setDisplayTitle((prev) => !prev);
// //     }, 5000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   // const channelName = `kitchen-${data.companyName}`;

// //   // useEffect(() => {
// //   //   const initialize = async () => {
// //   //     if (user) setName(user?.user?.email || '');
// //   //     if (data?.companyName) {
// //   //       // setRoom(`kitchen-${data.companyName}`);
// //   //       setRoom(channelName);

// //   //       await fetchHistoricalOrders();
// //   //     }
// //   //   };
// //   //   initialize();

// //   //   return () => {
// //   //     setHistoricalOrders([]);
// //   //   };
// //   // }, [user, data]);

// //   const channel = `kitchen-${data.companyName}`;
// //   useEffect(() => {
// //     if (user) setName(user?.user?.email || '');
// //     if (data?.companyName) {
// //       setRoom(channel);
// //       fetchHistoricalOrders();
// //     }
// //     return () => {
// //       setHistoricalOrders([]);
// //     };
// //   }, [user, data]);


// //   useEffect(() => {
// //     if (name && room && isConnected) {
// //       joinRoom(channel);
// //       console.log(`Unido a la sala: ${room} como ${name}`);
// //     }
// //   }, [name, room, isConnected, joinRoom]);



// //   // Order processing logic
// //   const mergedOrders = useMemo(() => {
// //     const socketOrders = Array.isArray(parsedMessages)
// //       ? parsedMessages.filter(msg => typeof msg !== 'string' && (msg._id || msg.id))
// //       : [];

// //     const allOrders = [...historicalOrders, ...socketOrders];
// //     const ordersMap = new Map();

// //     allOrders.forEach(order => {
// //       const orderId = order._id || order.id;
// //       if (!orderId) return;

// //       const existingOrder = ordersMap.get(orderId);
// //       const existingDate: any = existingOrder
// //         ? new Date(existingOrder.updatedAt || existingOrder.createdAt)
// //         : null;
// //       const newDate = new Date(order.updatedAt || order.createdAt);

// //       if (!existingOrder || newDate > existingDate) {
// //         ordersMap.set(orderId, {
// //           ...order,
// //           _id: orderId,
// //           updatedAt: order.updatedAt || order.createdAt
// //         });
// //       }
// //     });

// //     return Array.from(ordersMap.values()).sort((a, b) =>
// //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
// //     );
// //   }, [historicalOrders, parsedMessages]);

// //   // API functions
// //   const fetchHistoricalOrders = async () => {
// //     if (!data?.companyName) return;

// //     setIsLoadingHistory(true);
// //     setError(null);

// //     try {
// //       const params = new URLSearchParams({
// //         status: 'pending,processing,progress,paused',
// //         sort: 'desc',
// //         limit: '50',
// //         company: data.companyName
// //       });

// //       const res = await fetch(`/api/orders?${params}`);
// //       if (!res.ok) throw new Error(`Error: ${res.status}`);

// //       const orders = await res.json();
// //       setHistoricalOrders(Array.isArray(orders) ? orders : []);
// //       setLastRefresh(new Date());
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Error desconocido');
// //       console.error("Error fetching orders:", err);
// //     } finally {
// //       setIsLoadingHistory(false);
// //     }
// //   };

// //   const handleLogout = async () => {
// //     clearLocalhostStorage();
// //     await recordAttendance('getOut', user?.user?.email, data?.companyName);
// //     window.location.reload();
// //   };

// //   const handleOrderAction = async (action: string, order: any) => {
// //     try {
// //       const statusMap: Record<string, string> = {
// //         'start': 'processing',
// //         'pause': 'paused',
// //         'resume': 'processing',
// //         'complete': 'finished',
// //         'cancel': 'cancelled',
// //         'reopen': 'pending'
// //       };

// //       const newStatus = statusMap[action];
// //       if (!newStatus) return;

// //       await updateOrderStatus(order._id || order.id, newStatus);

// //       const updatedOrder = {
// //         ...order,
// //         status: newStatus,
// //         updatedAt: new Date().toISOString()
// //       };

// //       sendOrder(updatedOrder, `kitchen-${data?.companyName}`);
// //       setHistoricalOrders(prev => prev.map(o =>
// //         (o._id || o.id) === (order._id || order.id) ? updatedOrder : o
// //       ));
// //     } catch (error) {
// //       console.error("Error updating order:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Box sx={{ pb: 7 }}>
// //         {/* App Header */}
// //         <AppBar
// //           position="static"
// //           sx={{
// //             bgcolor: "background.paper",
// //             color: "text.primary",
// //             borderBottom: 1,
// //             borderColor: "divider",
// //           }}
// //         >
// //           hola
// //           <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
// //             {/* Logo and Title */}
// //             <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
// //               <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //                 <Avatar sx={{ width: 28, height: 28, ml: 0.5 }}>
// //                   <Image
// //                     src="/images/flama.png"
// //                     alt="Logo"
// //                     width={28}
// //                     height={28}
// //                     priority
// //                     style={{ objectFit: "contain" }}
// //                   />
// //                 </Avatar>
// //               </motion.div>

// //               <Box sx={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
// //                 <AnimatePresence mode="wait">
// //                   <motion.div
// //                     key={displayTitle ? "title1" : "title2"}
// //                     initial={{ opacity: 0, x: -10 }}
// //                     animate={{ opacity: 1, x: 0 }}
// //                     exit={{ opacity: 0, x: 10 }}
// //                     transition={{ duration: 0.3 }}
// //                   >
// //                     <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 600 }}>
// //                       {displayTitle ? "LlakaScript" : "Admin Cocina"}
// //                     </Typography>
// //                   </motion.div>
// //                 </AnimatePresence>
// //               </Box>
// //             </Box>

// //             {/* Connection Status */}
// //             <Box minWidth="120px" textAlign="center" my={1}>
// //               <AnimatePresence>
// //                 {!isConnected ? (
// //                   <motion.div
// //                     key="connecting"
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, y: 10 }}
// //                   >
// //                     <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
// //                       <Typography variant="body2" color="text.secondary">
// //                         Conectando... {reconnectAttempts > 0 && `(${reconnectAttempts})`}
// //                       </Typography>
// //                       <Box display="flex">
// //                         {[...Array(3)].map((_, i) => (
// //                           <motion.div
// //                             key={i}
// //                             animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
// //                             transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
// //                           >
// //                             <Typography variant="body2" fontWeight="bold" color="primary">.</Typography>
// //                           </motion.div>
// //                         ))}
// //                       </Box>
// //                     </Box>
// //                   </motion.div>
// //                 ) : (
// //                   <motion.div
// //                     key="connected"
// //                     initial={{ opacity: 0, scale: 0.8 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                   >
// //                     <Box display="flex" alignItems="center" gap={1} color="success.main">
// //                       <Typography variant="body2">Conectado</Typography>
// //                       <Check color="success" fontSize="small" />
// //                     </Box>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //             </Box>

// //             <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

// //             {/* Controls */}
// //             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// //               {lastRefresh && !isMobile && (
// //                 <Typography variant="caption" color="text.secondary">
// //                   Actualizado: {lastRefresh.toLocaleTimeString()}
// //                 </Typography>
// //               )}

// //               <Tooltip title="Actualizar">
// //                 <IconButton
// //                   color="primary"
// //                   size="small"
// //                   onClick={fetchHistoricalOrders}
// //                   disabled={isLoadingHistory || isUpdating}
// //                 >
// //                   <Refresh fontSize="small" />
// //                 </IconButton>
// //               </Tooltip>

// //               <Tooltip title="Salir">
// //                 <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //                   <IconButton size="small" onClick={handleLogout} color="default">
// //                     <LogoutIcon fontSize="small" />
// //                   </IconButton>
// //                 </motion.div>
// //               </Tooltip>
// //             </Box>
// //           </Toolbar>
// //         </AppBar>

// //         {/* Main Content */}
// //         <Box sx={{ textAlign: "center", p: 1 }}>
// //           {/* Error Handling */}
// //           {error && (
// //             <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }} onClose={() => setError(null)}>
// //               {error}
// //             </Alert>
// //           )}

// //           {updateError && (
// //             <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }} onClose={() => setUpdateError(null)}>
// //               {updateError}
// //             </Alert>
// //           )}

// //           {/* Loading Indicators */}
// //           {(isLoadingHistory || isUpdating) && (
// //             <Box display="flex" justifyContent="center" my={2}>
// //               <CircularProgress size={24} />
// //               <Typography variant="body2" ml={2}>
// //                 {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// //               </Typography>
// //             </Box>
// //           )}

// //           {/* Orders List */}
// //           <GutterlessList
// //             data={mergedOrders}
// //             loading={isLoadingHistory || isUpdating}
// //             onAction={handleOrderAction}
// //           />
// //         </Box>

// //         {/* Success Notification */}
// //         <Snackbar
// //           open={!!successMessage}
// //           autoHideDuration={3000}
// //           onClose={clearMessages}
// //           message={successMessage}
// //           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// //         />
// //       </Box>
// //     </div>
// //   );
// // };

// // export default OrdersSpeed;




// import React, { useEffect, useState, useMemo } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store/store";
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Typography,
//   Avatar,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   useTheme,
//   Tooltip,
//   useMediaQuery,
//   IconButton,
//   Divider
// } from "@mui/material";
// import LogoutIcon from '@mui/icons-material/Logout';
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import GutterlessList from "../GenericList/OrdersList";
// import useSocketChat from "../../../hooks/useSocket";
// import { Check, Refresh } from "@mui/icons-material";
// import { useOrderUpdates } from "../../../hooks/useOrderUpdates";
// import { clearLocalhostStorage } from "@/services/localstorage.services";
// import { recordAttendance } from "@/services/attendance.services";

// const OrdersSpeed = () => {
//   // Redux selectors
//   const { data }: any = useSelector((state: RootState) => state.chExcelData);
//   const user = useSelector((state: RootState) => state.auth);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // State management
//   const [historicalOrders, setHistoricalOrders] = useState<any[]>([]);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
//   const [displayTitle, setDisplayTitle] = useState(false);

//   // Custom hooks
//   const {
//     updateOrderStatus,
//     isUpdating,
//     updateError,
//     successMessage,
//     clearMessages,
//     setUpdateError
//   } = useOrderUpdates();

//   const {
//     name,
//     setName,
//     room,
//     setRoom,
//     parsedMessages,
//     isConnected,
//     reconnectAttempts,
//     joinRoom,
//     sendOrder
//   } = useSocketChat('https://socketserver-t4g9.onrender.com');

//   // Title animation effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayTitle((prev) => !prev);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Main initialization effect
//   // useEffect(() => {
//   //   if (!data?.companyName || !user?.user?.email) return;

//   //   const channel = `kitchen-${data.companyName}`;

//   //   // Configurar nombre y sala
//   //   setName(user.user.email);
//   //   setRoom(channel);

//   //   // Cargar órdenes históricas
//   //   fetchHistoricalOrders();

//   //   return () => {
//   //     setHistoricalOrders([]);
//   //   };
//   // }, [data?.companyName, user?.user?.email]);

//   // // Join room when connected
//   // useEffect(() => {
//   //   if (room && isConnected) {
//   //     joinRoom(room);
//   //     console.log(`Unido a la sala: ${room} como ${name}`);
//   //   }
//   // }, [room, isConnected, joinRoom, name]);


//   useEffect(() => {
//     if (!data?.companyName || !user?.user?.email) return;

//     const channel = `kitchen-${data.companyName}`;
//     setName(user.user.email);
//     setRoom(channel);

//     // Unirse a la sala cuando esté conectado
//     if (isConnected) {
//       joinRoom(channel);
//       console.log(`Unido a la sala: ${channel} como ${user.user.email}`);
//     }

//     // Cargar órdenes históricas
//     fetchHistoricalOrders();

//     return () => {
//       setHistoricalOrders([]);
//     };
//   }, [data?.companyName, user?.user?.email, isConnected, joinRoom]);




//   // // Handle incoming socket messages
//   // useEffect(() => {
//   //   if (!parsedMessages || parsedMessages.length === 0) return;

//   //   const validOrders = parsedMessages.filter(
//   //     (msg: any) => msg && (msg._id || msg.id) && msg.status
//   //   );

//   //   setHistoricalOrders(prev => {
//   //     const ordersMap = new Map();

//   //     // Add existing orders
//   //     prev.forEach(order => {
//   //       const id = order._id || order.id;
//   //       if (id) ordersMap.set(id, order);
//   //     });

//   //     // Update with socket orders
//   //     validOrders.forEach((newOrder: any) => {
//   //       const id = newOrder._id || newOrder.id;
//   //       if (!id) return;

//   //       const existingOrder = ordersMap.get(id);
//   //       const newDate = new Date(newOrder.updatedAt || newOrder.createdAt);
//   //       const existingDate: any = existingOrder
//   //         ? new Date(existingOrder.updatedAt || existingOrder.createdAt)
//   //         : null;

//   //       if (!existingOrder || newDate > existingDate) {
//   //         ordersMap.set(id, newOrder);
//   //       }
//   //     });

//   //     return Array.from(ordersMap.values());
//   //   });
//   // }, [parsedMessages]);



//   // Efecto para manejar mensajes entrantes
//   useEffect(() => {
//     if (!parsedMessages || parsedMessages.length === 0) return;

//     console.log('Nuevos mensajes parseados:', parsedMessages); // Debug

//     setHistoricalOrders(prev => {
//       const ordersMap = new Map<string, any>();

//       // Agregar órdenes existentes
//       prev.forEach(order => {
//         const id = order._id || order.id;
//         if (id) ordersMap.set(id, order);
//       });

//       // Actualizar con nuevas órdenes
//       parsedMessages.forEach((newOrder: any) => {
//         const id = newOrder._id || newOrder.id;
//         if (!id) return;

//         const existingOrder = ordersMap.get(id);
//         const newDate = new Date(newOrder.updatedAt || newOrder.createdAt || newOrder.timestamp);
//         const existingDate = existingOrder
//           ? new Date(existingOrder.updatedAt || existingOrder.createdAt || existingOrder.timestamp)
//           : null;

//         if (!existingOrder || !existingDate || newDate > existingDate) {
//           ordersMap.set(id, {
//             ...newOrder,
//             _id: id,
//             status: newOrder.status || 'pending' // Valor por defecto
//           });
//         }
//       });

//       return Array.from(ordersMap.values());
//     });
//   }, [parsedMessages]);





//   // Sort orders by creation date
//   const mergedOrders = useMemo(() => {
//     return [...historicalOrders].sort((a, b) =>
//       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//     );
//   }, [historicalOrders]);

//   // API functions
//   const fetchHistoricalOrders = async () => {
//     if (!data?.companyName) return;

//     setIsLoadingHistory(true);
//     setError(null);

//     try {
//       const params = new URLSearchParams({
//         status: 'pending,processing,progress,paused',
//         sort: 'desc',
//         limit: '50',
//         company: data.companyName
//       });

//       const res = await fetch(`/api/orders?${params}`);
//       if (!res.ok) throw new Error(`Error: ${res.status}`);

//       const orders = await res.json();
//       setHistoricalOrders(Array.isArray(orders) ? orders : []);
//       setLastRefresh(new Date());
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Error desconocido');
//       console.error("Error fetching orders:", err);
//     } finally {
//       setIsLoadingHistory(false);
//     }
//   };

//   const handleLogout = async () => {
//     clearLocalhostStorage();
//     await recordAttendance('getOut', user?.user?.email, data?.companyName);
//     window.location.reload();
//   };

//   // const handleOrderAction = async (action: string, order: any) => {
//   //   try {
//   //     const statusMap: Record<string, string> = {
//   //       'start': 'processing',
//   //       'pause': 'paused',
//   //       'resume': 'processing',
//   //       'complete': 'finished',
//   //       'cancel': 'cancelled',
//   //       'reopen': 'pending'
//   //     };

//   //     const newStatus = statusMap[action];
//   //     if (!newStatus) return;

//   //     await updateOrderStatus(order._id || order.id, newStatus);

//   //     const updatedOrder = {
//   //       ...order,
//   //       status: newStatus,
//   //       updatedAt: new Date().toISOString()
//   //     };

//   //     sendOrder(updatedOrder, `kitchen-${data?.companyName}`);
//   //     setHistoricalOrders(prev => prev.map(o =>
//   //       (o._id || o.id) === (order._id || order.id) ? updatedOrder : o
//   //     ));
//   //   } catch (error) {
//   //     console.error("Error updating order:", error);
//   //     setUpdateError("Error al actualizar la orden");
//   //   }
//   // };


//   // Función para manejar acciones de orden
//   const handleOrderAction = async (action: string, order: any) => {
//     try {
//       const statusMap: Record<string, any> = {
//         'start': 'processing',
//         'pause': 'paused',
//         'resume': 'processing',
//         'complete': 'finished',
//         'cancel': 'cancelled',
//         'reopen': 'pending',
//         'deliver': 'delivered'
//       };

//       const newStatus = statusMap[action];
//       if (!newStatus) return;

//       await updateOrderStatus(order._id || order.id, newStatus);

//       const updatedOrder = {
//         ...order,
//         status: newStatus,
//         updatedAt: new Date().toISOString()
//       };

//       // Enviar actualización por socket
//       sendOrder(updatedOrder, `kitchen-${data?.companyName}`);

//       // Actualizar estado local
//       setHistoricalOrders(prev => prev.map(o =>
//         (o._id || o.id) === (order._id || order.id) ? updatedOrder : o
//       ));
//     } catch (error) {
//       console.error("Error updating order:", error);
//       setUpdateError("Error al actualizar la orden");
//     }
//   };



//   return (
//     <div>
//       <Box sx={{ pb: 7 }}>
//         {/* App Header */}
//         <AppBar
//           position="static"
//           sx={{
//             bgcolor: "background.paper",
//             color: "text.primary",
//             borderBottom: 1,
//             borderColor: "divider",
//           }}
//         >
//           <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
//             {/* Logo and Title */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
//               <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//                 <Avatar sx={{ width: 28, height: 28, ml: 0.5 }}>
//                   <Image
//                     src="/images/flama.png"
//                     alt="Logo"
//                     width={28}
//                     height={28}
//                     priority
//                     style={{ objectFit: "contain" }}
//                   />
//                 </Avatar>
//               </motion.div>

//               <Box sx={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={displayTitle ? "title1" : "title2"}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 10 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 600 }}>
//                       {displayTitle ? "LlakaScript" : "Admin Cocina"}
//                     </Typography>
//                   </motion.div>
//                 </AnimatePresence>
//               </Box>
//             </Box>

//             {/* Connection Status */}
//             <Box minWidth="120px" textAlign="center" my={1}>
//               <AnimatePresence>
//                 {!isConnected ? (
//                   <motion.div
//                     key="connecting"
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                   >
//                     <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
//                       <Typography variant="body2" color="text.secondary">
//                         Conectando... {reconnectAttempts > 0 && `(${reconnectAttempts})`}
//                       </Typography>
//                       <Box display="flex">
//                         {[...Array(3)].map((_, i) => (
//                           <motion.div
//                             key={i}
//                             animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
//                             transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
//                           >
//                             <Typography variant="body2" fontWeight="bold" color="primary">.</Typography>
//                           </motion.div>
//                         ))}
//                       </Box>
//                     </Box>
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="connected"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                   >
//                     <Box display="flex" alignItems="center" gap={1} color="success.main">
//                       <Typography variant="body2">Conectado</Typography>
//                       <Check color="success" fontSize="small" />
//                     </Box>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </Box>

//             <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

//             {/* Controls */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//               {lastRefresh && !isMobile && (
//                 <Typography variant="caption" color="text.secondary">
//                   Actualizado: {lastRefresh.toLocaleTimeString()}
//                 </Typography>
//               )}
//               {/* 
//               <Tooltip title="Actualizar">
//                 <IconButton
//                   color="primary"
//                   size="small"
//                   onClick={fetchHistoricalOrders}
//                   disabled={isLoadingHistory || isUpdating}
//                 >
//                   <Refresh fontSize="small" />
//                 </IconButton>
//               </Tooltip> */}
//               <Tooltip title="Actualizar">
//                 <span> {/* Envuelve el IconButton en un span */}
//                   <IconButton
//                     color="primary"
//                     size="small"
//                     onClick={fetchHistoricalOrders}
//                     disabled={isLoadingHistory || isUpdating}
//                   >
//                     <Refresh fontSize="small" />
//                   </IconButton>
//                 </span>
//               </Tooltip>

//               <Tooltip title="Salir">
//                 <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//                   <IconButton size="small" onClick={handleLogout} color="default">
//                     <LogoutIcon fontSize="small" />
//                   </IconButton>
//                 </motion.div>
//               </Tooltip>
//             </Box>
//           </Toolbar>
//         </AppBar>

//         {/* Main Content */}
//         <Box sx={{ textAlign: "center", p: 1 }}>
//           {/* Error Handling */}
//           {error && (
//             <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }} onClose={() => setError(null)}>
//               {error}
//             </Alert>
//           )}

//           {updateError && (
//             <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }} onClose={() => setUpdateError(null)}>
//               {updateError}
//             </Alert>
//           )}

//           {/* Loading Indicators */}
//           {(isLoadingHistory || isUpdating) && (
//             <Box display="flex" justifyContent="center" my={2}>
//               <CircularProgress size={24} />
//               <Typography variant="body2" ml={2}>
//                 {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
//               </Typography>
//             </Box>
//           )}

//           {/* Orders List */}
//           <GutterlessList
//             data={mergedOrders}
//             loading={isLoadingHistory || isUpdating}
//             onAction={handleOrderAction}
//           />
//         </Box>

//         {/* Success Notification */}
//         <Snackbar
//           open={!!successMessage}
//           autoHideDuration={3000}
//           onClose={clearMessages}
//           message={successMessage}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         />
//       </Box>
//     </div>
//   );
// };

// export default OrdersSpeed;



import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme,
  Tooltip,
  useMediaQuery,
  IconButton,
  Divider
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GutterlessList from "../GenericList/OrdersList";
import useSocketChat from "../../../hooks/useSocket";
import { Check, Refresh } from "@mui/icons-material";
import { useOrderUpdates } from "../../../hooks/useOrderUpdates";
import { clearLocalhostStorage } from "@/services/localstorage.services";
import { recordAttendance } from "@/services/attendance.services";

const OrdersSpeed = () => {
  // Redux selectors
  const { data }: any = useSelector((state: RootState) => state.chExcelData);
  const user = useSelector((state: RootState) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State management
  const [historicalOrders, setHistoricalOrders] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [displayTitle, setDisplayTitle] = useState(false);

  // Custom hooks
  const {
    updateOrderStatus,
    isUpdating,
    updateError,
    successMessage,
    clearMessages,
    setUpdateError
  } = useOrderUpdates();

  const {
    name,
    setName,
    room,
    setRoom,
    parsedMessages,
    isConnected,
    reconnectAttempts,
    joinRoom,
    sendOrder
  } = useSocketChat('https://socketserver-t4g9.onrender.com');

  // Title animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTitle((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Main initialization effect
  useEffect(() => {
    if (!data?.companyName || !user?.user?.email) return;

    const channel = `kitchen-${data.companyName}`;
    setName(user.user.email);
    setRoom(channel);

    // Cargar órdenes históricas
    fetchHistoricalOrders();

    return () => {
      setHistoricalOrders([]);
    };
  }, [data?.companyName, user?.user?.email]);

  // Join room when connected or room changes
  useEffect(() => {
    if (room && name && isConnected) {
      joinRoom(room);
      console.log(`Unido a la sala: ${room} como ${name}`);
    }
  }, [room, isConnected, joinRoom, name]);

  // Effect to handle incoming socket messages
  useEffect(() => {
    if (!parsedMessages || parsedMessages.length === 0) return;

    console.log('Nuevos mensajes recibidos:', parsedMessages); // Debug

    setHistoricalOrders(prevOrders => {
      const newOrdersMap = new Map();

      // First add all existing orders to the map
      prevOrders.forEach(order => {
        const orderId = order._id || order.id;
        if (orderId) {
          newOrdersMap.set(orderId, order);
        }
      });

      // Then process incoming messages
      parsedMessages.forEach((message: any) => {
        try {
          // Validate the message structure
          const orderId = message._id || message.id;
          if (!orderId) {
            console.warn('Mensaje sin ID válido:', message);
            return;
          }

          // Ensure we have required fields
          const validatedMessage = {
            ...message,
            _id: orderId,
            status: message.status || 'pending',
            createdAt: message.createdAt || new Date().toISOString(),
            updatedAt: message.updatedAt || message.createdAt || new Date().toISOString()
          };

          // Check if this order is newer than what we have
          const existingOrder = newOrdersMap.get(orderId);
          const existingDate = existingOrder ? 
            new Date(existingOrder.updatedAt || existingOrder.createdAt) : 
            new Date(0); // Very old date if no existing order

          const newDate = new Date(validatedMessage.updatedAt);

          if (!existingOrder || newDate > existingDate) {
            newOrdersMap.set(orderId, validatedMessage);
          }
        } catch (err) {
          console.error('Error procesando mensaje:', err, message);
        }
      });

      return Array.from(newOrdersMap.values());
    });
  }, [parsedMessages]);

  // Sort orders by creation date
  const mergedOrders = useMemo(() => {
    return [...historicalOrders].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt || 0);
      const dateB = new Date(b.createdAt || b.updatedAt || 0);
      return dateB.getTime() - dateA.getTime();
    });
  }, [historicalOrders]);

  // API functions
  const fetchHistoricalOrders = async () => {
    if (!data?.companyName) return;

    setIsLoadingHistory(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        status: 'pending,processing,progress,paused',
        sort: 'desc',
        limit: '50',
        company: data.companyName
      });

      const res = await fetch(`/api/orders?${params}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const orders = await res.json();
      setHistoricalOrders(Array.isArray(orders) ? orders : []);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error("Error fetching orders:", err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleLogout = async () => {
    clearLocalhostStorage();
    await recordAttendance('getOut', user?.user?.email, data?.companyName);
    window.location.reload();
  };

  const handleOrderAction = async (action: string, order: any) => {
    try {
      const statusMap: Record<string, string> = {
        'start': 'processing',
        'pause': 'paused',
        'resume': 'processing',
        'complete': 'finished',
        'cancel': 'cancelled',
        'reopen': 'pending',
        'deliver': 'delivered'
      };

      const newStatus = statusMap[action];
      if (!newStatus) return;

      await updateOrderStatus(order._id || order.id, newStatus);

      const updatedOrder = {
        ...order,
        status: newStatus,
        updatedAt: new Date().toISOString()
      };

      // Send update to socket
      sendOrder(updatedOrder, `kitchen-${data?.companyName}`);

      // Update local state
      setHistoricalOrders(prev => prev.map(o =>
        (o._id || o.id) === (order._id || order.id) ? updatedOrder : o
      ));
    } catch (error) {
      console.error("Error updating order:", error);
      setUpdateError("Error al actualizar la orden");
    }
  };

  return (
    <div>
      <Box sx={{ pb: 7 }}>
        {/* App Header */}
        <AppBar
          position="static"
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
            {/* Logo and Title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Avatar sx={{ width: 28, height: 28, ml: 0.5 }}>
                  <Image
                    src="/images/flama.png"
                    alt="Logo"
                    width={28}
                    height={28}
                    priority
                    style={{ objectFit: "contain" }}
                  />
                </Avatar>
              </motion.div>

              <Box sx={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayTitle ? "title1" : "title2"}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 600 }}>
                      {displayTitle ? "LlakaScript" : "Admin Cocina"}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Box>

            {/* Connection Status */}
            <Box minWidth="120px" textAlign="center" my={1}>
              <AnimatePresence>
                {!isConnected ? (
                  <motion.div
                    key="connecting"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                      <Typography variant="body2" color="text.secondary">
                        Conectando... {reconnectAttempts > 0 && `(${reconnectAttempts})`}
                      </Typography>
                      <Box display="flex">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
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
                  >
                    <Box display="flex" alignItems="center" gap={1} color="success.main">
                      <Typography variant="body2">Conectado</Typography>
                      <Check color="success" fontSize="small" />
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

            {/* Controls */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {lastRefresh && !isMobile && (
                <Typography variant="caption" color="text.secondary">
                  Actualizado: {lastRefresh.toLocaleTimeString()}
                </Typography>
              )}
              
              <Tooltip title="Actualizar">
                <span>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={fetchHistoricalOrders}
                    disabled={isLoadingHistory || isUpdating}
                  >
                    <Refresh fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="Salir">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton size="small" onClick={handleLogout} color="default">
                    <LogoutIcon fontSize="small" />
                  </IconButton>
                </motion.div>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ textAlign: "center", p: 1 }}>
          {/* Error Handling */}
          {error && (
            <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {updateError && (
            <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }} onClose={() => setUpdateError(null)}>
              {updateError}
            </Alert>
          )}

          {/* Loading Indicators */}
          {(isLoadingHistory || isUpdating) && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress size={24} />
              <Typography variant="body2" ml={2}>
                {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
              </Typography>
            </Box>
          )}

          {/* Orders List */}
          <GutterlessList
            data={mergedOrders}
            loading={isLoadingHistory || isUpdating}
            onAction={handleOrderAction}
          />
        </Box>

        {/* Success Notification */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={clearMessages}
          message={successMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
      </Box>
    </div>
  );
};

export default OrdersSpeed;