// // // // import React, { useEffect, useState, useRef } from "react";
// // // // import { useSelector } from "react-redux";
// // // // import { RootState } from "../../../store/store";



// // // // import {
// // // //   Box,
// // // //   Tabs,
// // // //   Tab,
// // // //   TextField,
// // // //   InputAdornment,
// // // //   Paper,
// // // //   Container,
// // // //   Typography,
// // // //   Divider,
// // // //   AppBar,
// // // //   Toolbar,
// // // //   IconButton,
// // // //   Badge,
// // // //   Drawer,
// // // //   List,
// // // //   ListItem,
// // // //   Button,
// // // //   Dialog,
// // // //   DialogTitle,
// // // //   DialogContent,
// // // //   DialogActions,
// // // //   FormGroup,
// // // //   FormControlLabel,
// // // //   Checkbox,
// // // //   Chip,
// // // //   FormControl,
// // // //   InputLabel,
// // // //   Select,
// // // //   MenuItem,
// // // //   Avatar,
// // // // } from "@mui/material";
// // // // import LogoutIcon from '@mui/icons-material/Logout';
// // // // import {
// // // //   Search as SearchIcon,
// // // //   ShoppingCart as ShoppingCartIcon,
// // // //   Info as InfoIcon,
// // // //   Add as AddIcon,
// // // //   Remove as RemoveIcon,
// // // //   Delete as DeleteIcon,
// // // //   FilterList as FilterIcon,
// // // //   LocalOffer as PromoIcon,
// // // // } from "@mui/icons-material";
// // // // import Image from "next/image";
// // // // import GutterlessList from "../GenericList/OrdersList";
// // // // import Chat from "../Chat/ Chat";
// // // // import useSocketChat from "../../../hooks/useSocket";

// // // // const OrdersSpeed = () => {
// // // //   const [userData, setUserData] = useState<any>();
// // // //   const [userDataEmail, setUserDataEmail] = useState<any>();
// // // //   const [comapinesData, setCompaniesData] = useState<any>();
// // // //   const [comapinesDataName, setCompaniesDataName] = useState<any>();


// // // //   const {
// // // //     name,
// // // //     setName,
// // // //     room,
// // // //     setRoom,
// // // //     message,
// // // //     setMessage,
// // // //     messages,
// // // //     joinRoom,
// // // //     sendMessage,
// // // //     sendOrder,
// // // //     parsedMessages
// // // //   } = useSocketChat('https://socketserver-t4g9.onrender.com');
// // // //   console.log("🚀 ~ OrdersSpeed ~ parsedMessages:", parsedMessages)




// // // //   const { data } = useSelector(
// // // //     (state: RootState) => state.chExcelData as unknown as { data: any }
// // // //   );
// // // //   const user = useSelector((state: RootState) => state.auth);

// // // //   useEffect(() => {
// // // //     if (user) {
// // // //       setUserData(user?.user)
// // // //       setUserDataEmail(user?.user?.email)
// // // //       setName(user?.user?.email)
// // // //     };
// // // //   }, [user]);

// // // //   useEffect(() => {
// // // //     if (data) {
// // // //       setCompaniesData(data)
// // // //       setCompaniesDataName(data?.companyName)
// // // //       setRoom(data?.companyName)

// // // //     };
// // // //   }, [data]);

// // // //   useEffect(() => {
// // // //     joinRoom()
// // // //   }, [userData, comapinesData])


// // // //   return (

// // // //     <div>
// // // //       <Box sx={{ pb: 7 }}>
// // // //         <AppBar position="static" color="primary">

// // // //           <Toolbar>
// // // //             <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
// // // //               <Avatar sx={{ width: 50, height: 50 }}>
// // // //                 <Image
// // // //                   src={"/images/flama.png"}
// // // //                   alt={"LlakaScript"}
// // // //                   width={50}
// // // //                   height={50}
// // // //                   priority
// // // //                   style={{ objectFit: 'contain' }}
// // // //                 />
// // // //               </Avatar>
// // // //               Llakascript
// // // //             </Typography>
// // // //             OrdersSpeed
// // // //           </Toolbar>
// // // //         </AppBar>
// // // //         <div style={{ textAlign: "center", padding: "5px" }}>
// // // //           <GutterlessList
// // // //             data={parsedMessages}
// // // //           />
// // // //         </div>
// // // //         <div style={{ textAlign: "center", padding: "20px" }}>
// // // //           <h2>Chat con Salas</h2>

// // // //           <Chat />
// // // //         </div>




// // // //       </Box>

// // // //     </div>
// // // //   );
// // // // };

// // // // export default OrdersSpeed;



// // // import React, { useEffect, useState } from "react";
// // // import { useSelector } from "react-redux";
// // // import { RootState } from "../../../store/store";
// // // import { Box, AppBar, Toolbar, Typography, Avatar } from "@mui/material";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import Image from "next/image";
// // // import GutterlessList from "../GenericList/OrdersList";
// // // import useSocketChat from "../../../hooks/useSocket";
// // // import Chat from "../Chat/ Chat";
// // // import { Check } from "@mui/icons-material";

// // // const OrdersSpeed = () => {
// // //   const { data } = useSelector(
// // //     (state: RootState) => state.chExcelData as unknown as { data: any }
// // //   );
// // //   const user = useSelector((state: RootState) => state.auth);

// // //   const {
// // //     name,
// // //     setName,
// // //     room,
// // //     setRoom,
// // //     parsedMessages,
// // //     joinRoom,
// // //     isConnected
// // //   } = useSocketChat('https://socketserver-t4g9.onrender.com');


// // //   // Configuración inicial
// // //   useEffect(() => {
// // //     if (user) {
// // //       setName(user?.user?.email || '');
// // //     }
// // //     if (data) {
// // //       setRoom(data?.companyName || '');
// // //     }
// // //   }, [user, data, setName, setRoom]);

// // //   // Unirse a la sala cuando los datos estén listos
// // //   useEffect(() => {
// // //     if (name && room && isConnected) {
// // //       joinRoom();
// // //     }
// // //   }, [name, room, isConnected, joinRoom]);

// // //   return (
// // //     <div>
// // //       <Box sx={{ pb: 7 }}>
// // //         <AppBar position="static" color="primary">
// // //           <Toolbar>
// // //             <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
// // //               <Avatar sx={{ width: 50, height: 50 }}>
// // //                 <Image
// // //                   src={"/images/flama.png"}
// // //                   alt={"LlakaScript"}
// // //                   width={50}
// // //                   height={50}
// // //                   priority
// // //                   style={{ objectFit: 'contain' }}
// // //                 />
// // //               </Avatar>
// // //               Llakascript
// // //             </Typography>
// // //             OrdersSpeed
// // //           </Toolbar>
// // //         </AppBar>

// // //         <div style={{ textAlign: "center", padding: "5px" }}>
// // //           <Box
// // //             display="inline-block"
// // //             minWidth="120px"
// // //             textAlign="center"
// // //             my={1}
// // //           >
// // //             <AnimatePresence mode="wait">
// // //               {!isConnected ? (
// // //                 <motion.div
// // //                   key="connecting"
// // //                   initial={{ opacity: 0, y: -10 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   exit={{ opacity: 0, y: 10 }}
// // //                   transition={{ duration: 0.3 }}
// // //                 >
// // //                   <Box
// // //                     display="flex"
// // //                     alignItems="center"
// // //                     justifyContent="center"
// // //                     gap={1}
// // //                     color="text.secondary"
// // //                   >
// // //                     <motion.div
// // //                       animate={{
// // //                         opacity: [0.6, 1, 0.6],
// // //                       }}
// // //                       transition={{
// // //                         repeat: Infinity,
// // //                         duration: 1.5,
// // //                         ease: "easeInOut"
// // //                       }}
// // //                     >
// // //                       <Typography variant="body2">Conectando...</Typography>
// // //                     </motion.div>

// // //                     <Box display="flex">
// // //                       {[...Array(3)].map((_, i) => (
// // //                         <motion.div
// // //                           key={i}
// // //                           animate={{
// // //                             y: [0, -5, 0],
// // //                             opacity: [0.3, 1, 0.3]
// // //                           }}
// // //                           transition={{
// // //                             repeat: Infinity,
// // //                             duration: 1.2,
// // //                             delay: i * 0.2
// // //                           }}
// // //                         >
// // //                           <Typography variant="body2" fontWeight="bold" color="primary">.</Typography>
// // //                         </motion.div>
// // //                       ))}
// // //                     </Box>
// // //                   </Box>
// // //                 </motion.div>
// // //               ) : (
// // //                 <motion.div
// // //                   key="connected"
// // //                   initial={{ opacity: 0, scale: 0.8 }}
// // //                   animate={{ opacity: 1, scale: 1 }}
// // //                   exit={{ opacity: 0, scale: 1.2 }}
// // //                   transition={{ duration: 0.3 }}
// // //                 >
// // //                   <Box
// // //                     display="flex"
// // //                     alignItems="center"
// // //                     justifyContent="center"
// // //                     gap={1}
// // //                     color="success.main"
// // //                   >
// // //                     <motion.div
// // //                       initial={{ opacity: 0 }}
// // //                       animate={{ opacity: 1 }}
// // //                       transition={{ delay: 0.2 }}
// // //                     >
// // //                       <Typography variant="body2">Conectado</Typography>
// // //                     </motion.div>

// // //                     <motion.div
// // //                       initial={{ pathLength: 0 }}
// // //                       animate={{ pathLength: 1 }}
// // //                       transition={{ duration: 0.5 }}
// // //                     >
// // //                       <Check color="success" fontSize="small" />
// // //                     </motion.div>
// // //                   </Box>
// // //                 </motion.div>
// // //               )}
// // //             </AnimatePresence>
// // //           </Box>
// // //           <GutterlessList
// // //             data={Array.isArray(parsedMessages) ? parsedMessages : []}
// // //           />
// // //         </div>

// // //         <div style={{ textAlign: "center", padding: "20px" }}>
// // //           <h2>Chat con Salas</h2>
// // //           <Chat />
// // //         </div>
// // //       </Box>
// // //     </div>
// // //   );
// // // };

// // // export default OrdersSpeed;
// // import React, { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";
// // import { RootState } from "../../../store/store";
// // import { Box, AppBar, Toolbar, Typography, Avatar } from "@mui/material";
// // import { motion, AnimatePresence } from "framer-motion";
// // import Image from "next/image";
// // import GutterlessList from "../GenericList/OrdersList";
// // import useSocketChat from "../../../hooks/useSocket";
// // import { Check } from "@mui/icons-material";
// // import Chat from "../Chat/ Chat";

// // const OrdersSpeed = () => {
// //   const { data } = useSelector(
// //     (state: RootState) => state.chExcelData as unknown as { data: any }
// //   );
// //   const user = useSelector((state: RootState) => state.auth);
// //   const [showConnectionStatus, setShowConnectionStatus] = useState(true);




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

// //   // Configuración inicial del nombre y sala
// //   useEffect(() => {
// //     if (user) {
// //       setName(user?.user?.email || '');
// //     }
// //     if (data) {
// //       setRoom(data?.companyName || '');
// //     }
// //   }, [user, data, setName, setRoom]);

// //   // Unirse a la sala cuando esté todo listo
// //   useEffect(() => {
// //     if (name && room && isConnected) {
// //       joinRoom();
// //       console.log(`Unido a la sala: ${room} como ${name}`);
// //     }
// //   }, [name, room, isConnected, joinRoom]);

// //   // Manejo del estado de conexión con feedback visual mejorado
// //   useEffect(() => {
// //     if (isConnected) {
// //       const timer = setTimeout(() => {
// //         setShowConnectionStatus(false);
// //       }, 2000);
// //       return () => clearTimeout(timer);
// //     } else {
// //       setShowConnectionStatus(true);

// //       // Mostrar alerta si hay problemas de conexión después de 5 segundos
// //       const alertTimer = setTimeout(() => {
// //         if (!isConnected) {
// //           console.warn(`Problemas de conexión. Intentos: ${reconnectAttempts}/5`);
// //         }
// //       }, 5000);

// //       return () => clearTimeout(alertTimer);
// //     }
// //   }, [isConnected, reconnectAttempts]);





// //   useEffect(() => {

// //     const funtionsAsync = async () => {
// //       const params = new URLSearchParams({
// //         status: 'pending,processing,in-progress',
// //         // dateFrom: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
// //         sort: 'desc'
// //       });

// //       const res = await fetch(`/api/orders?${params}`);
// //       const orders = await res.json();
  
// //       const todo = [...orders, ...parsedMessages]
// //       console.log("🚀 ~ funtionsAsync ~ todo:", todo)
// //     }
// //     funtionsAsync()

// //   }, [parsedMessages])



// //   useEffect(() => {

// //   }, [parsedMessages])









// //   return (
// //     <div>
// //       <Box sx={{ pb: 7 }}>
// //         <AppBar position="static" color="primary">
// //           <Toolbar>
// //             <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
// //               <Avatar sx={{ width: 50, height: 50 }}>
// //                 <Image
// //                   src={"/images/flama.png"}
// //                   alt={"LlakaScript"}
// //                   width={50}
// //                   height={50}
// //                   priority
// //                   style={{ objectFit: 'contain' }}
// //                 />
// //               </Avatar>
// //               Llakascript
// //             </Typography>
// //             OrdersSpeed
// //           </Toolbar>
// //         </AppBar>

// //         <div style={{ textAlign: "center", padding: "5px" }}>
// //           {showConnectionStatus && (
// //             <Box
// //               display="inline-block"
// //               minWidth="120px"
// //               textAlign="center"
// //               my={1}
// //             >
// //               <AnimatePresence>
// //                 {!isConnected ? (
// //                   <motion.div
// //                     key="connecting"
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, y: 10 }}
// //                     transition={{ duration: 0.3 }}
// //                   >
// //                     <Box
// //                       display="flex"
// //                       alignItems="center"
// //                       justifyContent="center"
// //                       gap={1}
// //                       color="text.secondary"
// //                     >
// //                       <motion.div
// //                         animate={{
// //                           opacity: [0.6, 1, 0.6],
// //                         }}
// //                         transition={{
// //                           repeat: Infinity,
// //                           duration: 1.5,
// //                           ease: "easeInOut"
// //                         }}
// //                       >
// //                         <Typography variant="body2">Conectando...</Typography>
// //                       </motion.div>

// //                       <Box display="flex">
// //                         {[...Array(3)].map((_, i) => (
// //                           <motion.div
// //                             key={i}
// //                             animate={{
// //                               y: [0, -5, 0],
// //                               opacity: [0.3, 1, 0.3]
// //                             }}
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
// //                     <Box
// //                       display="flex"
// //                       alignItems="center"
// //                       justifyContent="center"
// //                       gap={1}
// //                       color="success.main"
// //                     >
// //                       <motion.div
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         transition={{ delay: 0.1 }}
// //                       >
// //                         <Typography variant="body2">Conectado</Typography>
// //                       </motion.div>

// //                       <motion.div
// //                         initial={{ scale: 0 }}
// //                         animate={{ scale: 1 }}
// //                         transition={{
// //                           type: "spring",
// //                           stiffness: 500,
// //                           damping: 15
// //                         }}
// //                       >
// //                         <Check color="success" fontSize="small" />
// //                       </motion.div>
// //                     </Box>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //             </Box>
// //           )}

// //           <GutterlessList
// //             data={Array.isArray(parsedMessages) ? parsedMessages : []}
// //           />
// //         </div>

// //         <div style={{ textAlign: "center", padding: "20px" }}>
// //           <h2>Chat con Salas</h2>
// //           <Chat />
// //         </div>
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
//   Button,
//   CircularProgress,
//   Alert,
//   IconButton
// } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import GutterlessList from "../GenericList/OrdersList";
// import useSocketChat from "../../../hooks/useSocket";
// import { Check, Refresh } from "@mui/icons-material";
// import Chat from "../Chat/ Chat";

// interface Order {
//   id: string;
//   companyName: string;
//   createdAt: string;
//   // Agrega otros campos necesarios según tu modelo de datos
// }

// const OrdersSpeed = () => {
//   // Datos de Redux
//   const { data } = useSelector(
//     (state: RootState) => state.chExcelData as unknown as { data: any }
//   );
//   const user = useSelector((state: RootState) => state.auth);

//   // Estados para manejo de órdenes
//   const [historicalOrders, setHistoricalOrders] = useState<Order[]>([]);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

//   // Socket hook
//   const {
//     name,
//     setName,
//     room,
//     setRoom,
//     parsedMessages,
//     isConnected,
//     reconnectAttempts,
//     joinRoom
//   } = useSocketChat('https://socketserver-t4g9.onrender.com');

//   // Estado combinado y memoizado
//   const mergedOrders = useMemo(() => {
//     const socketOrders = Array.isArray(parsedMessages) ? parsedMessages : [];
//     const allOrders = [...historicalOrders, ...socketOrders];
    
//     // Eliminar duplicados por ID
//     const uniqueOrders = allOrders.reduce((acc: Order[], current: any) => {
//       if (!acc.some(item => item.id === current.id)) {
//         acc.push(current);
//       }
//       return acc;
//     }, []);
    
//     // Ordenar por fecha (más reciente primero)
//     return uniqueOrders.sort((a, b) => 
//       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//     );
//   }, [historicalOrders, parsedMessages]);

//   // Cargar órdenes históricas
//   const fetchHistoricalOrders = async () => {
//     if (!data?.companyName) return;
    
//     setIsLoadingHistory(true);
//     setError(null);
    
//     try {
//       const params = new URLSearchParams({
//         status: 'pending,processing,in-progress',
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
//       console.error("Error fetching historical orders:", err);
//     } finally {
//       setIsLoadingHistory(false);
//     }
//   };

//   // Configuración inicial
//   useEffect(() => {
//     const initialize = async () => {
//       if (user) setName(user?.user?.email || '');
//       if (data) {
//         setRoom(data?.companyName || '');
//         await fetchHistoricalOrders();
//       }
//     };
    
//     initialize();

//     // Limpieza al desmontar
//     return () => {
//       setHistoricalOrders([]);
//     };
//   }, [user, data, setName, setRoom]);

//   // Unirse a la sala cuando esté todo listo
//   useEffect(() => {
//     if (name && room && isConnected) {
//       joinRoom();
//     }
//   }, [name, room, isConnected, joinRoom]);

//   // Mostrar/ocultar estado de conexión
//   const [showConnectionStatus, setShowConnectionStatus] = useState(true);
//   useEffect(() => {
//     if (isConnected) {
//       const timer = setTimeout(() => setShowConnectionStatus(false), 2000);
//       return () => clearTimeout(timer);
//     } else {
//       setShowConnectionStatus(true);
//     }
//   }, [isConnected, reconnectAttempts]);

//   return (
//     <div>
//       <Box sx={{ pb: 7 }}>
//         <AppBar position="static" color="primary">
//           <Toolbar>
//             <Typography variant="h5" component="div" sx={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: 1, 
//               flexGrow: 1 
//             }}>
//               <Avatar sx={{ width: 50, height: 50 }}>
//                 <Image
//                   src={"/images/flama.png"}
//                   alt={"LlakaScript"}
//                   width={50}
//                   height={50}
//                   priority
//                   style={{ objectFit: 'contain' }}
//                 />
//               </Avatar>
//               Llakascript
//             </Typography>
//             OrdersSpeed
//           </Toolbar>
//         </AppBar>

//         <Box sx={{ textAlign: "center", p: 1 }}>
//           {/* Estado de conexión */}
//           {showConnectionStatus && (
//             <Box
//               display="inline-block"
//               minWidth="120px"
//               textAlign="center"
//               my={1}
//             >
//               <AnimatePresence>
//                 {!isConnected ? (
//                   <motion.div
//                     key="connecting"
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Box
//                       display="flex"
//                       alignItems="center"
//                       justifyContent="center"
//                       gap={1}
//                       color="text.secondary"
//                     >
//                       <motion.div
//                         animate={{ opacity: [0.6, 1, 0.6] }}
//                         transition={{ 
//                           repeat: Infinity,
//                           duration: 1.5,
//                           ease: "easeInOut"
//                         }}
//                       >
//                         <Typography variant="body2">
//                           Conectando... {reconnectAttempts > 0 && `(Intento ${reconnectAttempts})`}
//                         </Typography>
//                       </motion.div>
//                       <Box display="flex">
//                         {[...Array(3)].map((_, i) => (
//                           <motion.div
//                             key={i}
//                             animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
//                             transition={{
//                               repeat: Infinity,
//                               duration: 1.2,
//                               delay: i * 0.2
//                             }}
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
//                     exit={{ opacity: 0, scale: 0.5 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Box
//                       display="flex"
//                       alignItems="center"
//                       justifyContent="center"
//                       gap={1}
//                       color="success.main"
//                     >
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.1 }}
//                       >
//                         <Typography variant="body2">Conectado</Typography>
//                       </motion.div>
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{
//                           type: "spring",
//                           stiffness: 500,
//                           damping: 15
//                         }}
//                       >
//                         <Check color="success" fontSize="small" />
//                       </motion.div>
//                     </Box>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </Box>
//           )}

//           {/* Controles de recarga */}
//           <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
//             <Button
//               variant="outlined"
//               startIcon={<Refresh />}
//               onClick={fetchHistoricalOrders}
//               disabled={isLoadingHistory}
//               size="small"
//             >
//               Recargar Historial
//             </Button>
            
//             {lastRefresh && (
//               <Typography variant="caption" color="text.secondary">
//                 Última actualización: {lastRefresh.toLocaleTimeString()}
//               </Typography>
//             )}
//           </Box>

//           {/* Manejo de errores */}
//           {error && (
//             <Alert 
//               severity="error" 
//               sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}
//               onClose={() => setError(null)}
//             >
//               {error}
//             </Alert>
//           )}

//           {/* Indicador de carga */}
//           {isLoadingHistory && (
//             <Box display="flex" justifyContent="center" my={2}>
//               <CircularProgress size={24} />
//               <Typography variant="body2" ml={2}>
//                 Cargando historial de órdenes...
//               </Typography>
//             </Box>
//           )}

//           {/* Lista de órdenes */}
//           <GutterlessList
//             data={mergedOrders}
//             loading={isLoadingHistory}
//           />
//         </Box>

//         {/* Componente de chat */}
//         <Box sx={{ textAlign: "center", p: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Chat con Salas
//           </Typography>
//           <Chat />
//         </Box>
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
  Button,
  CircularProgress,
  Alert,
  Snackbar
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GutterlessList from "../GenericList/OrdersList";
import useSocketChat from "../../../hooks/useSocket";
import { Check, Refresh } from "@mui/icons-material";
import Chat from "../Chat/Chat";
import { useOrderUpdates } from "../../../hooks/useOrderUpdates";

const OrdersSpeed = () => {
  // Datos de Redux
  const { data } = useSelector(
    (state: RootState) => state.chExcelData as unknown as { data: any }
  );
  const user = useSelector((state: RootState) => state.auth);

  // Estados para manejo de órdenes
  const [historicalOrders, setHistoricalOrders] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Custom hook para actualizaciones
  const {
    updateOrderStatus,
    bulkUpdateOrders,
    isUpdating,
    updateError,
    successMessage,
    clearMessages,
    setUpdateError
  } = useOrderUpdates();

  // Socket hook
  const {
    name,
    setName,
    room,
    setRoom,
    parsedMessages,
    isConnected,
    reconnectAttempts,
    joinRoom
  } = useSocketChat('https://socketserver-t4g9.onrender.com');

  // Estado combinado y memoizado
  const mergedOrders = useMemo(() => {
    const socketOrders = Array.isArray(parsedMessages) ? parsedMessages : [];
    const allOrders = [...historicalOrders, ...socketOrders];
    
    // Eliminar duplicados por ID
    const uniqueOrders = allOrders.reduce((acc: any[], current: any) => {
      if (!acc.some(item => item._id === current._id)) {
        acc.push(current);
      }
      return acc;
    }, []);
    
    // Ordenar por fecha (más reciente primero)
    return uniqueOrders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [historicalOrders, parsedMessages]);

  // Cargar órdenes históricas
  const fetchHistoricalOrders = async () => {
    if (!data?.companyName) return;
    
    setIsLoadingHistory(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        status: 'pending,processing,in-progress,',
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
      console.error("Error fetching historical orders:", err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Manejar acción en una orden
  const handleOrderAction = async (action: any, order: any) => {
    console.log("🚀 ~ handleOrderAction ~ order:", order)
    console.log("funiona elaccciónssssssssss")
    console.log("🚀 ~ handleOrderAction ~ action:", action)
    try {
      let newStatus = '';
      
      switch (action) {
        case 'take':
          newStatus = 'processing';
          break;
        case 'wait':
          newStatus = 'in-progress';
          break;
        case 'complete':
          newStatus = 'finished';
          break;
        default:
          return;
      }

      await updateOrderStatus(order._id, newStatus);
      
      // Actualizar el estado local para reflejar el cambio
      setHistoricalOrders(prev => prev.map(o => 
        o._id === order._id ? { ...o, status: newStatus } : o
      ));
    } catch (error) {
      console.error("Error handling order action:", error);
    }
  };

  // Configuración inicial
  useEffect(() => {
    const initialize = async () => {
      if (user) setName(user?.user?.email || '');
      if (data) {
        setRoom(data?.companyName || '');
        await fetchHistoricalOrders();
      }
    };
    
    initialize();

    return () => {
      setHistoricalOrders([]);
    };
  }, [user, data, setName, setRoom]);

  // Unirse a la sala cuando esté todo listo
  useEffect(() => {
    if (name && room && isConnected) {
      joinRoom();
    }
  }, [name, room, isConnected, joinRoom]);

  // Mostrar/ocultar estado de conexión
  const [showConnectionStatus, setShowConnectionStatus] = useState(true);
  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => setShowConnectionStatus(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowConnectionStatus(true);
    }
  }, [isConnected, reconnectAttempts]);

  return (
    <div>
      <Box sx={{ pb: 7 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              flexGrow: 1 
            }}>
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
            OrdersSpeed
          </Toolbar>
        </AppBar>

        <Box sx={{ textAlign: "center", p: 1 }}>
          {/* Estado de conexión */}
          {showConnectionStatus && (
            <Box
              display="inline-block"
              minWidth="120px"
              textAlign="center"
              my={1}
            >
              <AnimatePresence>
                {!isConnected ? (
                  <motion.div
                    key="connecting"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={1}
                      color="text.secondary"
                    >
                      <motion.div
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut"
                        }}
                      >
                        <Typography variant="body2">
                          Conectando... {reconnectAttempts > 0 && `(Intento ${reconnectAttempts})`}
                        </Typography>
                      </motion.div>
                      <Box display="flex">
                        {[...Array(3)].map((_, i) => (
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
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={1}
                      color="success.main"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Typography variant="body2">Conectado</Typography>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15
                        }}
                      >
                        <Check color="success" fontSize="small" />
                      </motion.div>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          )}

          {/* Controles de recarga */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={fetchHistoricalOrders}
              disabled={isLoadingHistory || isUpdating}
              size="small"
            >
              Recargar Historial
            </Button>
            
            {lastRefresh && (
              <Typography variant="caption" color="text.secondary">
                Última actualización: {lastRefresh.toLocaleTimeString()}
              </Typography>
            )}
          </Box>

          {/* Manejo de errores */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          {updateError && (
            <Alert 
              severity="error" 
              sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}
              onClose={() => setUpdateError(null)}
            >
              {updateError}
            </Alert>
          )}

          {/* Indicador de carga */}
          {(isLoadingHistory || isUpdating) && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress size={24} />
              <Typography variant="body2" ml={2}>
                {isUpdating ? "Actualizando orden..." : "Cargando historial de órdenes..."}
              </Typography>
            </Box>
          )}

          {/* Lista de órdenes */}
          <GutterlessList
            data={mergedOrders}
            loading={isLoadingHistory || isUpdating}
            onAction={handleOrderAction}
          />
        </Box>

        {/* Componente de chat */}
        <Box sx={{ textAlign: "center", p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Chat con Salas
          </Typography>
          <Chat />
        </Box>

        {/* Notificación de éxito */}
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