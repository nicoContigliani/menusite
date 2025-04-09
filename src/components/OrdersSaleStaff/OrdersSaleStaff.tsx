// // "use client"
// // import { useSelector } from "react-redux"
// // import type { RootState } from "../../../store/store"
// // import {
// //   Box,
// //   CircularProgress,
// //   Alert,
// //   Snackbar,
// //   Typography,
// //   Paper,
// //   useMediaQuery,
// //   useTheme,
// //   IconButton,
// //   Tooltip,
// //   Chip,
// //   AppBar,
// //   Toolbar,
// //   Avatar,
// //   Badge,
// // } from "@mui/material"
// // import { Refresh, ExpandMore, ExpandLess, ViewList, ViewColumn } from "@mui/icons-material"
// // import { motion, AnimatePresence } from "framer-motion"
// // import { useState, useEffect } from "react"
// // import Image from "next/image"
// // import OrdersScreenStaff from "../Orders/OrdersScreenStaff/OrdersScreenStaff"
// // import { useOrdersManagement } from "../../../hooks/useOrdersManagement"
// // import OrdersSalesScreenStaff from "../Orders/OrdersSalesScreenStaff/OrdersSalesScreenStaff"
// // import OrdersSalesScreenStaffNew from "../Orders/OrdersSalesScreenStaff/OrdersSalesScreenStaffNew"

// // const OrdersSaleStaff = () => {
// //   const theme = useTheme()
// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
// //   const isTablet = useMediaQuery(theme.breakpoints.down("md"))
// //   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
// //   const [displayTitle, setDisplayTitle] = useState(false)
// //   const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column")

// //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
// //   const user = useSelector((state: RootState) => state.auth)

// //   const {
// //     ordersByStatus,
// //     lastRefresh,
// //     isLoadingHistory,
// //     isUpdating,
// //     error,
// //     updateError,
// //     successMessage,
// //     fetchHistoricalOrders,
// //     handleOrderAction,
// //     clearMessages,
// //     setUpdateError,
// //     setError,
// //   } = useOrdersManagement({
// //     companyName: data?.companyName,
// //     userEmail: user?.user?.email,
// //   })
// //   // orderby status careier orders and I need a useefect for this. This useEffect will take of api payment if idOrders is complete, the order delete of list 

// //   const [filteredOrders, setFilteredOrders] = useState<any>({});

// //   // useEffect(() => {

// //   //   const asyncFuntions = async () => {
// //   //     try {
// //   //       const today = new Date();

// //   //       // Crear fecha para las 9:00 AM de hoy
// //   //       const startTime = new Date(today);
// //   //       startTime.setHours(9, 0, 0, 0);

// //   //       // Crear fecha para las 23:00 (11:00 PM) de hoy
// //   //       const endTime = new Date(today);
// //   //       endTime.setHours(23, 0, 0, 0);

// //   //       // Convertir a formato ISO para la URL
// //   //       const startTimeStr = startTime.toISOString();
// //   //       const endTimeStr = endTime.toISOString();
// //   //       console.log("🚀 ~ asyncFuntions ~ data?._id:", data?._id)

// //   //       // return `/api/payments?companyId=${companyId}&dateFrom=${startTimeStr}&dateTo=${endTimeStr}&onlyOrderIds=true`;
// //   //       const res = await fetch(`/api/payments?companyId=${data?._id}&dateFrom=${startTimeStr}&dateTo=${endTimeStr}&onlyOrderIds=true`, {
// //   //         method: 'GET',
// //   //         headers: {
// //   //           'Content-Type': 'application/json',
// //   //         },
// //   //         // body: JSON.stringify(dataPayment),
// //   //       });


// //   //       ///TODO there ara id and _id and ordersID
// //   //       const result = await res.json();
// //   //       console.log('Oredenes ***********************************:', result);

// //   //       const idsToRemove = result
// //   //       const filterOrdersByIds = (ordersByStatus: Record<string, any[]>, idsToRemove: string[]) =>
// //   //         Object.entries(ordersByStatus).reduce((acc, [status, orders]) => ({
// //   //           ...acc,
// //   //           [status]: orders.filter(order => !idsToRemove.includes(order.id))
// //   //         }), {});



// //   //     } catch (error) {
// //   //       console.log("🚀 ~ handleOrderActionAPI ~ error:", error)

// //   //     }
// //   //   }
// //   //   asyncFuntions()



// //   // }, [ordersByStatus])

// //   useEffect(() => {
// //     const fetchAndFilterOrders = async () => {
// //       try {
// //         const today = new Date();
// //         const startTime = new Date(today);
// //         startTime.setHours(9, 0, 0, 0);
// //         const endTime = new Date(today);
// //         endTime.setHours(23, 0, 0, 0);

// //         const res = await fetch(
// //           `/api/payments?companyId=${data?._id}&dateFrom=${startTime.toISOString()}&dateTo=${endTime.toISOString()}&onlyOrderIds=true`,
// //           {
// //             method: 'GET',
// //             headers: { 'Content-Type': 'application/json' },
// //           }
// //         );

// //         const paidOrderIds = await res.json();

// //         // Filtrar y eliminar arrays vacíos
// //         const filtered = Object.entries(ordersByStatus).reduce((acc, [status, orders]) => {
// //           const filteredOrders = orders.filter((order: any) => !paidOrderIds.includes(order.id));

// //           // Solo añadir al resultado si hay órdenes
// //           if (filteredOrders.length > 0) {
// //             acc[status] = filteredOrders;
// //           }

// //           return acc;
// //         }, {} as Record<string, any[]>);

// //         setFilteredOrders(filtered);

// //       } catch (error) {
// //         console.error("Error al filtrar órdenes:", error);
// //         // Opción 1: Mantener original (incluyendo vacíos)
// //         // setFilteredOrders(ordersByStatus);

// //         // Opción 2: Filtrar vacíos del original también
// //         const currentWithoutEmpties = Object.fromEntries(
// //           Object.entries(ordersByStatus).filter(([_, orders]) => orders.length > 0)
// //         );
// //         setFilteredOrders(currentWithoutEmpties);
// //       }
// //     };

// //     if (data?._id && Object.keys(ordersByStatus).length > 0) {
// //       fetchAndFilterOrders();
// //     }
// //   }, [data?._id, ordersByStatus]);



// //   // Update view mode when screen size changes
// //   useEffect(() => {
// //     setViewMode(isMobile ? "list" : "column")
// //   }, [isMobile])

// //   // Title animation effect
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setDisplayTitle((prev) => !prev)
// //     }, 5000)
// //     return () => clearInterval(interval)
// //   }, [])

// //   // Count total orders
// //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)

// //   // Count orders by status for the header chips
// //   const pendingCount = ordersByStatus.pending?.length || 0
// //   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
// //   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

// //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
// //   const toggleViewMode = () => setViewMode(viewMode === "column" ? "list" : "column")


// //   const handleOrderActionAPI = async (paymentData: any) => {
// //     const { order, paymentInfo } = paymentData
// //     console.log("🚀 ~ handleOrderActionAPI ~ paymentData:", paymentData?.order?.id)
// //     try {
// //       // Preparar los datos del pago
// //       const paymentSummary = {
// //         total: paymentData.paymentInfo.total,
// //         paid: paymentData.paymentInfo.paid,
// //         methods: paymentData.paymentInfo.payments.map((p: any) => ({
// //           method: p.method,
// //           amount: p.amount,
// //           ...p.details // Incluir detalles específicos del método de pago
// //         }))
// //       };

// //       // Crear objeto de orden actualizada

// //       const dataPayment = {
// //         orderId: paymentData?.order?.id,
// //         payment: paymentSummary,
// //         status: "completed",
// //         companyName: data?.companyName,
// //         companyId: data?._id
// //       }
// //       console.log("🚀 ~ handleOrderActionAPI ~ dataPayment:", dataPayment)



// //       try {
// //         const res = await fetch(`/api/payments`, {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(dataPayment),
// //         });

// //         if (!res.ok) {
// //           throw new Error('Error al actualizar la orden');
// //         }

// //         const result = await res.json();
// //         console.log('Orden actualizada:', result);
// //       } catch (error) {
// //         console.log("🚀 ~ handleOrderActionAPI ~ error:", error)

// //       }




// //       // // Llamar a handleOrderAction
// //       // await handleOrderAction('complete_payment', updatedOrder);

// //       // // Opcional: Enviar notificación de pago completado
// //       // sendOrder(updatedOrder, room); // Usando tu hook de socket

// //       console.log('Pago procesado correctamente');
// //     } catch (error) {
// //       console.error('Error procesando pago:', error);
// //       // Aquí podrías mostrar una notificación al usuario
// //     }
// //   };



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
// //         position="static"
// //         component={motion.div}
// //         initial={false}
// //         transition={{ duration: 0.7 }}
// //         elevation={0}
// //         sx={{
// //           bgcolor: "background.paper",
// //           color: "text.primary",
// //           borderBottom: 1,
// //           borderColor: "divider",
// //         }}
// //       >
// //         <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
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
// //             }}
// //           >
// //             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //               <Avatar
// //                 sx={{
// //                   width: 28,
// //                   height: 28,
// //                   flexShrink: 0,
// //                   ml: 0.5,
// //                 }}
// //               >
// //                 <Image
// //                   src={"/images/flama.png"}
// //                   alt={"LlakaScript"}
// //                   width={28}
// //                   height={28}
// //                   priority
// //                   style={{
// //                     objectFit: "contain",
// //                     width: "100%",
// //                     height: "100%",
// //                   }}
// //                 />
// //               </Avatar>
// //             </motion.div>

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
// //               <AnimatePresence mode="wait">
// //                 <motion.div
// //                   key={displayTitle ? "pedido-actual" : "panel-ordenes"}
// //                   initial={{ opacity: 0, x: -10 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   exit={{ opacity: 0, x: 10 }}
// //                   transition={{ duration: 0.3 }}
// //                   style={{
// //                     position: "absolute",
// //                     left: 0,
// //                     whiteSpace: "nowrap",
// //                   }}
// //                 >
// //                   <Typography
// //                     variant={isMobile ? "subtitle1" : "h6"}
// //                     sx={{
// //                       fontWeight: 600,
// //                       lineHeight: 1.1,
// //                       fontSize: isMobile ? "1rem" : undefined,
// //                     }}
// //                   >
// //                     {displayTitle ? "Pedido Actual" : "Panel de Órdenes"}
// //                   </Typography>
// //                 </motion.div>
// //               </AnimatePresence>
// //             </Box>
// //           </Box>

// //           {/* Right side controls */}
// //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// //             {/* Order count badge */}
// //             {isMobile && totalOrders > 0 && (
// //               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
// //                 <Box sx={{ width: 4, height: 4 }} />
// //               </Badge>
// //             )}

// //             {/* Last refresh time */}
// //             {lastRefresh && !isMobile && (
// //               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
// //                 Actualizado: {lastRefresh.toLocaleTimeString()}
// //               </Typography>
// //             )}

// //             {/* Refresh button */}
// //             <Tooltip title="Actualizar">
// //               <IconButton
// //                 color="primary"
// //                 size="small"
// //                 onClick={fetchHistoricalOrders}
// //                 disabled={isLoadingHistory || isUpdating}
// //               >
// //                 <Refresh fontSize="small" />
// //               </IconButton>
// //             </Tooltip>

// //             {/* View mode toggle (mobile only) */}
// //             {isMobile && (
// //               <Tooltip title={viewMode === "column" ? "Vista lista" : "Vista columnas"}>
// //                 <IconButton size="small" onClick={toggleViewMode} color="default">
// //                   {viewMode === "column" ? <ViewList fontSize="small" /> : <ViewColumn fontSize="small" />}
// //                 </IconButton>
// //               </Tooltip>
// //             )}

// //             {/* Header collapse toggle (mobile only) */}
// //             {isMobile && (
// //               <IconButton size="small" onClick={toggleHeader}>
// //                 {headerCollapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
// //               </IconButton>
// //             )}
// //           </Box>
// //         </Toolbar>
// //       </AppBar>

// //       {/* Main content */}
// //       <Box
// //         sx={{
// //           p: { xs: 0.5, sm: 2 },
// //           flex: 1,
// //           overflow: "hidden",
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
// //           <Box
// //             sx={{
// //               display: "flex",
// //               flexDirection: "column",
// //               borderBottom: 1,
// //               borderColor: "divider",
// //               transition: "all 0.3s ease",
// //               maxHeight: headerCollapsed ? "0px" : "200px",
// //               overflow: "hidden",
// //             }}
// //           >


// //             {/* Status indicators */}
// //             {(isLoadingHistory || isUpdating) && (
// //               <Box
// //                 sx={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: 1,
// //                   p: 1,
// //                   mx: { xs: 1, sm: 2 },
// //                   mb: { xs: 1, sm: 2 },
// //                   backgroundColor: "action.hover",
// //                   borderRadius: 1,
// //                 }}
// //               >
// //                 <CircularProgress size={16} />
// //                 <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// //                   {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// //                 </Typography>
// //               </Box>
// //             )}
// //           </Box>

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
// //               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
// //                 <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 1 }}>
// //                   {error}
// //                 </Alert>
// //               </motion.div>
// //             )}

// //             {updateError && (
// //               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
// //                 <Alert severity="error" onClose={() => setUpdateError(null)} sx={{ mb: 1 }}>
// //                   {updateError}
// //                 </Alert>
// //               </motion.div>
// //             )}
// //           </Box>

// //           {/* Main content - takes all available space */}
// //           {/* <Box
// //             sx={{
// //               flex: 1,
// //               overflow: "hidden",
// //               display: "flex",
// //               flexDirection: "column",
// //             }}
// //           >
// //             <OrdersSalesScreenStaff ordersByStatus={ordersByStatus} onOrderAction={handleOrderAction} viewMode={viewMode} />
// //           </Box> */}
// //           <OrdersSalesScreenStaffNew
// //             orders={filteredOrders}
// //             onPaymentSubmit={handleOrderActionAPI}

// //           />
// //         </Paper>
// //       </Box>

// //       {/* Success notification */}
// //       <Snackbar
// //         open={!!successMessage}
// //         autoHideDuration={3000}
// //         onClose={clearMessages}
// //         message={successMessage}
// //         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// //       />
// //     </Box>
// //   )
// // }

// // export default OrdersSaleStaff






// "use client"
// import { useSelector } from "react-redux"
// import type { RootState } from "../../../store/store"
// import {
//   Box,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   Typography,
//   Paper,
//   useMediaQuery,
//   useTheme,
//   IconButton,
//   Tooltip,
//   Badge,
//   Avatar,
//   AppBar,
//   Toolbar,
// } from "@mui/material"
// import { Refresh, ExpandMore, ExpandLess, ViewList, ViewColumn } from "@mui/icons-material"
// import { motion, AnimatePresence } from "framer-motion"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { useOrdersManagement } from "../../../hooks/useOrdersManagement"
// import OrdersSalesScreenStaffNew from "../Orders/OrdersSalesScreenStaff/OrdersSalesScreenStaffNew"

// const OrdersSaleStaff = () => {
//   // Hooks y estado inicial
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
//   const isTablet = useMediaQuery(theme.breakpoints.down("md"))

//   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
//   const [displayTitle, setDisplayTitle] = useState(false)
//   const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column")
//   const [filteredOrders, setFilteredOrders] = useState<any>({})

//   // Selectores de Redux
//   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
//   const user = useSelector((state: RootState) => state.auth)

//   // Hook personalizado para gestión de órdenes
//   const {
//     ordersByStatus,
//     lastRefresh,
//     isLoadingHistory,
//     isUpdating,
//     error,
//     updateError,
//     successMessage,
//     fetchHistoricalOrders,
//     handleOrderAction,
//     clearMessages,
//     setUpdateError,
//     setError,
//   } = useOrdersManagement({
//     companyName: data?.companyName,
//     userEmail: user?.user?.email,
//   })

//   // Efectos secundarios
//   useEffect(() => {
//     const fetchAndFilterOrders = async () => {
//       try {
//         const today = new Date()
//         const startTime = new Date(today)
//         startTime.setHours(9, 0, 0, 0)
//         const endTime = new Date(today)
//         endTime.setHours(23, 0, 0, 0)

//         const res = await fetch(
//           `/api/payments?companyId=${data?._id}&dateFrom=${startTime.toISOString()}&dateTo=${endTime.toISOString()}&onlyOrderIds=true`,
//           {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//           }
//         )

//         const paidOrderIds = await res.json()

//         // Filtrar órdenes pagadas y eliminar arrays vacíos
//         const filtered = Object.entries(ordersByStatus).reduce((acc, [status, orders]) => {
//           const filteredOrders = orders.filter((order: any) => !paidOrderIds.includes(order.id))

//           if (filteredOrders.length > 0) {
//             acc[status] = filteredOrders
//           }

//           return acc
//         }, {} as Record<string, any[]>)

//         setFilteredOrders(filtered)

//       } catch (error) {
//         console.error("Error al filtrar órdenes:", error)
//         // Mantener las órdenes originales (filtradas si están vacías)
//         const currentWithoutEmpties = Object.fromEntries(
//           Object.entries(ordersByStatus).filter(([_, orders]) => orders.length > 0)
//         )
//         setFilteredOrders(currentWithoutEmpties)
//       }
//     }

//     if (data?._id && Object.keys(ordersByStatus).length > 0) {
//       fetchAndFilterOrders()
//     }
//   }, [data?._id, ordersByStatus])

//   useEffect(() => {
//     setViewMode(isMobile ? "list" : "column")
//   }, [isMobile])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayTitle(prev => !prev)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   // Contadores de órdenes
//   const totalOrders = Object.values(ordersByStatus).reduce(
//     (sum, orders) => sum + (orders?.length || 0), 0
//   )

//   // Handlers
//   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
//   const toggleViewMode = () => setViewMode(viewMode === "column" ? "list" : "column")

//   const handleOrderActionAPI = async (paymentData: any) => {
//     const { order, paymentInfo } = paymentData

//     try {
//       const paymentSummary = {
//         total: paymentInfo.total,
//         paid: paymentInfo.paid,
//         methods: paymentInfo.payments.map((p: any) => ({
//           method: p.method,
//           amount: p.amount,
//           ...p.details
//         }))
//       }

//       const dataPayment = {
//         orderId: order?.id,
//         payment: paymentSummary,
//         status: "completed",
//         companyName: data?.companyName,
//         companyId: data?._id
//       }

//       const res = await fetch(`/api/payments`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(dataPayment),
//       })

//       if (!res.ok) {
//         throw new Error('Error al actualizar la orden')
//       }

//       const result = await res.json()
//       console.log('Orden actualizada:', result)
//     } catch (error) {
//       console.error("Error en handleOrderActionAPI:", error)
//     }
//   }

//   // Componente principal
//   return (
//     <Box sx={{
//       height: "100vh",
//       overflow: "hidden",
//       bgcolor: theme.palette.background.default,
//       display: "flex",
//       flexDirection: "column",
//     }}>
//       {/* AppBar personalizado */}
//       <AppBar
//         position="static"
//         component={motion.div}
//         initial={false}
//         transition={{ duration: 0.7 }}
//         elevation={0}
//         sx={{
//           bgcolor: "background.paper",
//           color: "text.primary",
//           borderBottom: 1,
//           borderColor: "divider",
//         }}
//       >
//         <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
//           {/* Logo y título */}
//           <Box sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             flexGrow: 1,
//             height: "40px",
//             position: "relative",
//             overflow: "hidden",
//           }}>
//             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//               <Avatar sx={{
//                 width: 28,
//                 height: 28,
//                 flexShrink: 0,
//                 ml: 0.5,
//               }}>
//                 <Image
//                   src={"/images/flama.png"}
//                   alt={"LlakaScript"}
//                   width={28}
//                   height={28}
//                   priority
//                   style={{
//                     objectFit: "contain",
//                     width: "100%",
//                     height: "100%",
//                   }}
//                 />
//               </Avatar>
//             </motion.div>

//             <Box sx={{
//               position: "relative",
//               width: "auto",
//               height: "100%",
//               display: "flex",
//               alignItems: "center",
//               flexGrow: 1,
//             }}>
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={displayTitle ? "pedido-actual" : "panel-ordenes"}
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 10 }}
//                   transition={{ duration: 0.3 }}
//                   style={{
//                     position: "absolute",
//                     left: 0,
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   <Typography
//                     variant={isMobile ? "subtitle1" : "h6"}
//                     sx={{
//                       fontWeight: 600,
//                       lineHeight: 1.1,
//                       fontSize: isMobile ? "1rem" : undefined,
//                     }}
//                   >
//                     {displayTitle ? "Pedido Actual" : "Panel de Órdenes"}
//                   </Typography>
//                 </motion.div>
//               </AnimatePresence>
//             </Box>
//           </Box>

//           {/* Controles del lado derecho */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//             {/* Badge de conteo de órdenes */}
//             {isMobile && totalOrders > 0 && (
//               <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
//                 <Box sx={{ width: 4, height: 4 }} />
//               </Badge>
//             )}

//             {/* Hora de última actualización */}
//             {lastRefresh && !isMobile && (
//               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
//                 Actualizado: {lastRefresh.toLocaleTimeString()}
//               </Typography>
//             )}

//             {/* Botón de actualizar */}
//             <Tooltip title="Actualizar">
//               <IconButton
//                 color="primary"
//                 size="small"
//                 onClick={fetchHistoricalOrders}
//                 disabled={isLoadingHistory || isUpdating}
//               >
//                 <Refresh fontSize="small" />
//               </IconButton>
//             </Tooltip>

//             {/* Alternar vista (solo móvil) */}
//             {isMobile && (
//               <Tooltip title={viewMode === "column" ? "Vista lista" : "Vista columnas"}>
//                 <IconButton size="small" onClick={toggleViewMode} color="default">
//                   {viewMode === "column" ? <ViewList fontSize="small" /> : <ViewColumn fontSize="small" />}
//                 </IconButton>
//               </Tooltip>
//             )}

//             {/* Alternar encabezado (solo móvil) */}
//             {isMobile && (
//               <IconButton size="small" onClick={toggleHeader}>
//                 {headerCollapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
//               </IconButton>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Contenido principal */}
//       <Box sx={{
//         p: { xs: 0.5, sm: 2 },
//         flex: 1,
//         overflow: "hidden",
//         display: "flex",
//         flexDirection: "column",
//       }}>
//         <Paper
//           elevation={isMobile ? 1 : 3}
//           sx={{
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//             borderRadius: { xs: 1, sm: 2 },
//           }}
//         >
//           {/* Encabezado de estado - colapsable en móvil */}
//           <Box sx={{
//             display: "flex",
//             flexDirection: "column",
//             borderBottom: 1,
//             borderColor: "divider",
//             transition: "all 0.3s ease",
//             maxHeight: headerCollapsed ? "0px" : "200px",
//             overflow: "hidden",
//           }}>
//             {/* Indicadores de estado */}
//             {(isLoadingHistory || isUpdating) && (
//               <Box sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 p: 1,
//                 mx: { xs: 1, sm: 2 },
//                 mb: { xs: 1, sm: 2 },
//                 backgroundColor: "action.hover",
//                 borderRadius: 1,
//               }}>
//                 <CircularProgress size={16} />
//                 <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
//                   {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
//                 </Typography>
//               </Box>
//             )}
//           </Box>

//           {/* Mensajes de error */}
//           <Box sx={{
//             px: { xs: 1, sm: 2 },
//             pt: { xs: 1, sm: 1 },
//             overflow: "auto",
//             flexShrink: 0,
//           }}>
//             {error && (
//               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//                 <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 1 }}>
//                   {error}
//                 </Alert>
//               </motion.div>
//             )}

//             {updateError && (
//               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//                 <Alert severity="error" onClose={() => setUpdateError(null)} sx={{ mb: 1 }}>
//                   {updateError}
//                 </Alert>
//               </motion.div>
//             )}
//           </Box>

//           {/* Componente principal de órdenes */}
//           <OrdersSalesScreenStaffNew
//             orders={filteredOrders}
//             onPaymentSubmit={handleOrderActionAPI}
//           />
//         </Paper>
//       </Box>

//       {/* Notificación de éxito */}
//       <Snackbar
//         open={!!successMessage}
//         autoHideDuration={3000}
//         onClose={clearMessages}
//         message={successMessage}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       />
//     </Box>
//   )
// }

// export default OrdersSaleStaff



// "use client"
// import { useSelector } from "react-redux"
// import type { RootState } from "../../../store/store"
// import {
//   Box,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   Typography,
//   Paper,
//   useMediaQuery,
//   useTheme,
//   IconButton,
//   Tooltip,
//   Badge,
//   Avatar,
//   AppBar,
//   Toolbar,
// } from "@mui/material"
// import { Refresh, ExpandMore, ExpandLess, ViewList, ViewColumn } from "@mui/icons-material"
// import { motion, AnimatePresence, useAnimationControls } from "framer-motion"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { useOrdersManagement } from "../../../hooks/useOrdersManagement"
// import OrdersSalesScreenStaffNew from "../Orders/OrdersSalesScreenStaff/OrdersSalesScreenStaffNew"

// // Animaciones reutilizables
// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.5 } }
// }

// const slideUp = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
// }

// const popIn = {
//   hidden: { scale: 0.8, opacity: 0 },
//   visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 20 } }
// }

// const rotateRefresh = {
//   rotate: 360,
//   transition: { duration: 1, repeat: Infinity, ease: "linear" }
// }

// const OrdersSaleStaff = () => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
//   const controls = useAnimationControls()

//   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
//   const [displayTitle, setDisplayTitle] = useState(false)
//   const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column")
//   const [filteredOrders, setFilteredOrders] = useState<any>({})
//   const [isRefreshing, setIsRefreshing] = useState(false)

//   // Selectores de Redux
//   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
//   const user = useSelector((state: RootState) => state.auth)

//   // Hook personalizado para gestión de órdenes
//   const {
//     ordersByStatus,
//     lastRefresh,
//     isLoadingHistory,
//     isUpdating,
//     error,
//     updateError,
//     successMessage,
//     fetchHistoricalOrders,
//     handleOrderAction,
//     clearMessages,
//     setUpdateError,
//     setError,
//   } = useOrdersManagement({
//     companyName: data?.companyName,
//     userEmail: user?.user?.email,
//   })

//   // Efecto para animación de título
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayTitle(prev => !prev)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   // Efecto para filtrar órdenes
//   useEffect(() => {
//     const fetchAndFilterOrders = async () => {
//       try {
//         const today = new Date()
//         const startTime = new Date(today)
//         startTime.setHours(9, 0, 0, 0)
//         const endTime = new Date(today)
//         endTime.setHours(23, 0, 0, 0)

//         const res = await fetch(
//           `/api/payments?companyId=${data?._id}&dateFrom=${startTime.toISOString()}&dateTo=${endTime.toISOString()}&onlyOrderIds=true`,
//           { method: 'GET', headers: { 'Content-Type': 'application/json' } }
//         )

//         const paidOrderIds = await res.json()

//         const filtered = Object.entries(ordersByStatus).reduce((acc, [status, orders]) => {
//           const filteredOrders = orders.filter((order: any) => !paidOrderIds.includes(order.id))
//           if (filteredOrders.length > 0) acc[status] = filteredOrders
//           return acc
//         }, {} as Record<string, any[]>)

//         setFilteredOrders(filtered)

//       } catch (error) {
//         console.error("Error al filtrar órdenes:", error)
//         const currentWithoutEmpties = Object.fromEntries(
//           Object.entries(ordersByStatus).filter(([_, orders]) => orders.length > 0)
//         )
//         setFilteredOrders(currentWithoutEmpties)
//       }
//     }

//     if (data?._id && Object.keys(ordersByStatus).length > 0) {
//       fetchAndFilterOrders()
//     }
//   }, [data?._id, ordersByStatus])

//   // Handler para refrescar con animación
//   const handleRefresh = async () => {
//     setIsRefreshing(true)
//     await controls.start(rotateRefresh)
//     await fetchHistoricalOrders()
//     setIsRefreshing(false)
//     controls.stop()
//   }

//   // Handler para acción de orden con animación
//   const handleOrderActionAPI = async (paymentData: any) => {
//     const { order, paymentInfo } = paymentData

//     try {
//       const paymentSummary = {
//         total: paymentInfo.total,
//         paid: paymentInfo.paid,
//         methods: paymentInfo.payments.map((p: any) => ({
//           method: p.method,
//           amount: p.amount,
//           ...p.details
//         }))
//       }

//       const dataPayment = {
//         orderId: order?.id,
//         payment: paymentSummary,
//         status: "completed",
//         companyName: data?.companyName,
//         companyId: data?._id
//       }

//       const res = await fetch(`/api/payments`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(dataPayment),
//       })

//       if (!res.ok) throw new Error('Error al actualizar la orden')

//       const result = await res.json()
//       console.log('Orden actualizada:', result)

//       // Animación de éxito
//       await controls.start({
//         scale: [1, 1.05, 1],
//         transition: { duration: 0.3 }
//       })

//     } catch (error) {
//       console.error("Error en handleOrderActionAPI:", error)
//       }
//   }

//   return (
//     <Box sx={{
//       height: "100vh",
//       overflow: "hidden",
//       bgcolor: theme.palette.background.default,
//       display: "flex",
//       flexDirection: "column",
//     }}>
//       {/* AppBar con animaciones */}
//       <AppBar
//         position="static"
//         component={motion.div}
//         initial="hidden"
//         animate="visible"
//         variants={fadeIn}
//         transition={{ duration: 0.7 }}
//         elevation={0}
//         sx={{
//           bgcolor: "background.paper",
//           color: "text.primary",
//           borderBottom: 1,
//           borderColor: "divider",
//         }}
//       >
//         <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
//           {/* Logo con efecto hover */}
//           <Box sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             flexGrow: 1,
//             height: "40px",
//             position: "relative",
//             overflow: "hidden",
//           }}>
//             <motion.div 
//               whileHover={{ scale: 1.1, rotate: 5 }}
//               whileTap={{ scale: 0.9 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             >
//               <Avatar sx={{
//                 width: 28,
//                 height: 28,
//                 flexShrink: 0,
//                 ml: 0.5,
//               }}>
//                 <Image
//                   src={"/images/flama.png"}
//                   alt={"LlakaScript"}
//                   width={28}
//                   height={28}
//                   priority
//                   style={{
//                     objectFit: "contain",
//                     width: "100%",
//                     height: "100%",
//                   }}
//                 />
//               </Avatar>
//             </motion.div>

//             {/* Título con animación de cambio */}
//             <Box sx={{
//               position: "relative",
//               width: "auto",
//               height: "100%",
//               display: "flex",
//               alignItems: "center",
//               flexGrow: 1,
//             }}>
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={displayTitle ? "pedido-actual" : "panel-ordenes"}
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 10 }}
//                   transition={{ 
//                     duration: 0.3,
//                     type: "spring",
//                     stiffness: 300,
//                     damping: 20
//                   }}
//                   style={{
//                     position: "absolute",
//                     left: 0,
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   <Typography
//                     variant={isMobile ? "subtitle1" : "h6"}
//                     sx={{
//                       fontWeight: 600,
//                       lineHeight: 1.1,
//                       fontSize: isMobile ? "1rem" : undefined,
//                     }}
//                   >
//                     {displayTitle ? " Pagos de Ordenes" : "LlakaSript"}
//                   </Typography>
//                 </motion.div>
//               </AnimatePresence>
//             </Box>
//           </Box>

//           {/* Controles con animaciones */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//             {isMobile && Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0) > 0 && (
//               <motion.div whileHover={{ scale: 1.1 }}>
//                 <Badge 
//                   badgeContent={Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)} 
//                   color="primary" 
//                   sx={{ mr: 0.5 }}
//                 >
//                   <Box sx={{ width: 4, height: 4 }} />
//                 </Badge>
//               </motion.div>
//             )}

//             {lastRefresh && !isMobile && (
//               <motion.div variants={slideUp}>
//                 <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
//                   Actualizado: {lastRefresh.toLocaleTimeString()}
//                 </Typography>
//               </motion.div>
//             )}

//             <Tooltip title="Actualizar">
//               <motion.div
//                 animate={controls}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <IconButton
//                   color="primary"
//                   size="small"
//                   onClick={handleRefresh}
//                   disabled={isLoadingHistory || isUpdating}
//                 >
//                   <Refresh fontSize="small" />
//                 </IconButton>
//               </motion.div>
//             </Tooltip>

//             {isMobile && (
//               <Tooltip title={viewMode === "column" ? "Vista lista" : "Vista columnas"}>
//                 <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//                   <IconButton size="small" onClick={() => setViewMode(viewMode === "column" ? "list" : "column")} color="default">
//                     {viewMode === "column" ? <ViewList fontSize="small" /> : <ViewColumn fontSize="small" />}
//                   </IconButton>
//                 </motion.div>
//               </Tooltip>
//             )}

//             {isMobile && (
//               <motion.div whileHover={{ scale: 1.1 }}>
//                 <IconButton size="small" onClick={() => setHeaderCollapsed(!headerCollapsed)}>
//                   {headerCollapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
//                 </IconButton>
//               </motion.div>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Contenido principal con animaciones */}
//       <Box sx={{
//         p: { xs: 0.5, sm: 2 },
//         flex: 1,
//         overflow: "hidden",
//         display: "flex",
//         flexDirection: "column",
//       }}>
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//           style={{ height: "100%" }}
//         >
//           <Paper
//             elevation={isMobile ? 1 : 3}
//             sx={{
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               overflow: "hidden",
//               borderRadius: { xs: 1, sm: 2 },
//             }}
//             component={motion.div}
//             whileHover={{ boxShadow: theme.shadows[isMobile ? 2 : 6] }}
//             transition={{ duration: 0.3 }}
//           >
//             {/* Encabezado colapsable */}
//             <motion.div
//               animate={{
//                 maxHeight: headerCollapsed ? 0 : 200,
//                 opacity: headerCollapsed ? 0 : 1
//               }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 borderBottom: `1px solid ${theme.palette.divider}`,
//                 overflow: "hidden",
//               }}
//             >
//               {(isLoadingHistory || isUpdating) && (
//                 <motion.div
//                   initial="hidden"
//                   animate="visible"
//                   variants={popIn}
//                 >
//                   <Box sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                     p: 1,
//                     mx: { xs: 1, sm: 2 },
//                     mb: { xs: 1, sm: 2 },
//                     backgroundColor: "action.hover",
//                     borderRadius: 1,
//                   }}>
//                     <CircularProgress size={16} />
//                     <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
//                       {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
//                     </Typography>
//                   </Box>
//                 </motion.div>
//               )}
//             </motion.div>

//             {/* Mensajes de error con animación */}
//             <Box sx={{
//               px: { xs: 1, sm: 2 },
//               pt: { xs: 1, sm: 1 },
//               overflow: "auto",
//               flexShrink: 0,
//             }}>
//               <AnimatePresence>
//                 {error && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Alert 
//                       severity="error" 
//                       onClose={() => setError(null)} 
//                       sx={{ mb: 1 }}
//                       component={motion.div}
//                       // whileHover={{ scale: 1.01 }}
//                     >
//                       {error}
//                     </Alert>
//                   </motion.div>
//                 )}

//                 {updateError && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Alert 
//                       severity="error" 
//                       onClose={() => setUpdateError(null)} 
//                       sx={{ mb: 1 }}
//                       component={motion.div}
//                       // whileHover={{ scale: 1.01 }}
//                     >
//                       {updateError}
//                     </Alert>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </Box>

//             {/* Componente de órdenes con animación */}
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={fadeIn}
//               style={{ flex: 1, overflow: "hidden" }}
//             >
//               <OrdersSalesScreenStaffNew
//                 orders={filteredOrders}
//                 onPaymentSubmit={handleOrderActionAPI}
//               />
//             </motion.div>
//           </Paper>
//         </motion.div>
//       </Box>

//       {/* Notificación de éxito con animación */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Snackbar
//               open={!!successMessage}
//               autoHideDuration={3000}
//               onClose={clearMessages}
//               message={successMessage}
//               anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Box>
//   )
// }

// export default OrdersSaleStaff




// "use client"
// import { useSelector } from "react-redux"
// import type { RootState } from "../../../store/store"
// import {
//   Box,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   Typography,
//   Paper,
//   useMediaQuery,
//   useTheme,
//   IconButton,
//   Tooltip,
//   Badge,
//   Avatar,
//   AppBar,
//   Toolbar,
//   TextField,
//   MenuItem,
//   Chip,
//   Divider,
//   Button,
//   InputAdornment
// } from "@mui/material"
// import { Refresh, ExpandMore, ExpandLess, ViewList, ViewColumn, Search, FilterAlt, Clear } from "@mui/icons-material"
// import { motion, AnimatePresence, useAnimationControls } from "framer-motion"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { useOrdersManagement } from "../../../hooks/useOrdersManagement"
// import OrdersSalesScreenStaffNew from "../Orders/OrdersSalesScreenStaff/OrdersSalesScreenStaffNew"

// // Animaciones reutilizables
// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.5 } }
// }

// const slideUp = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
// }

// const popIn = {
//   hidden: { scale: 0.8, opacity: 0 },
//   visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 20 } }
// }

// const rotateRefresh = {
//   rotate: 360,
//   transition: { duration: 1, repeat: Infinity, ease: "linear" }
// }

// const OrdersSaleStaff = () => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
//   const controls = useAnimationControls()

//   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
//   const [displayTitle, setDisplayTitle] = useState(false)
//   const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column")
//   const [filteredOrders, setFilteredOrders] = useState<any>({})
//   const [isRefreshing, setIsRefreshing] = useState(false)

//   // Filter states
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState<string>("all")
//   const [amountFilter, setAmountFilter] = useState<string>("all")
//   const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("all")
//   const [showFilters, setShowFilters] = useState(!isMobile)

//   // Selectores de Redux
//   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
//   const user = useSelector((state: RootState) => state.auth)

//   // Hook personalizado para gestión de órdenes
//   const {
//     ordersByStatus,
//     lastRefresh,
//     isLoadingHistory,
//     isUpdating,
//     error,
//     updateError,
//     successMessage,
//     fetchHistoricalOrders,
//     handleOrderAction,
//     clearMessages,
//     setUpdateError,
//     setError,
//   } = useOrdersManagement({
//     companyName: data?.companyName,
//     userEmail: user?.user?.email,
//   })
//     console.log("🚀 ~ OrdersSaleStaff ~ ordersByStatus:", ordersByStatus)

//   // Efecto para animación de título
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayTitle(prev => !prev)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   // Efecto para filtrar órdenes
//   useEffect(() => {
//     const fetchAndFilterOrders = async () => {
//       try {
//         const today = new Date()
//         const startTime = new Date(today)
//         startTime.setHours(9, 0, 0, 0)
//         const endTime = new Date(today)
//         endTime.setHours(23, 0, 0, 0)

//         const res = await fetch(
//           `/api/payments?companyId=${data?._id}&dateFrom=${startTime.toISOString()}&dateTo=${endTime.toISOString()}&onlyOrderIds=true`,
//           { method: 'GET', headers: { 'Content-Type': 'application/json' } }
//         )

//         const paidOrderIds = await res.json()

//         const filtered = Object.entries(ordersByStatus).reduce((acc, [status, orders]) => {
//           const filteredOrders = orders.filter((order: any) => !paidOrderIds.includes(order.id))
//           if (filteredOrders.length > 0) acc[status] = filteredOrders
//           return acc
//         }, {} as Record<string, any[]>)

//         setFilteredOrders(filtered)

//       } catch (error) {
//         console.error("Error al filtrar órdenes:", error)
//         const currentWithoutEmpties = Object.fromEntries(
//           Object.entries(ordersByStatus).filter(([_, orders]) => orders.length > 0)
//         )
//         setFilteredOrders(currentWithoutEmpties)
//       }
//     }

//     if (data?._id && Object.keys(ordersByStatus).length > 0) {
//       fetchAndFilterOrders()
//     }
//   }, [data?._id, ordersByStatus])

//   // Apply additional filters
//   const applyFilters = (orders: any) => {
//     return Object.entries(orders).reduce((acc, [status, ordersList]) => {
//       const filtered = (ordersList as any[]).filter(order => {
//         // Search term filter
//         const matchesSearch = 
//           searchTerm === "" ||
//           order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (order.customer?.phone?.includes(searchTerm)) ||
//           (order.items?.some((item: any) => 
//             item.name.toLowerCase().includes(searchTerm.toLowerCase())))

//         // Status filter
//         const matchesStatus = 
//           statusFilter === "all" || 
//           status.toLowerCase() === statusFilter.toLowerCase()

//         // Amount filter
//         const matchesAmount = () => {
//           if (amountFilter === "all") return true
//           const total = order.total || 0
//           if (amountFilter === "small") return total < 50
//           if (amountFilter === "medium") return total >= 50 && total < 100
//           if (amountFilter === "large") return total >= 100
//           return true
//         }

//         return matchesSearch && matchesStatus && matchesAmount()
//       })

//       if (filtered.length > 0) acc[status] = filtered
//       return acc
//     }, {} as Record<string, any[]>)
//   }

//   // Get filtered orders
//   const getFilteredOrders = () => {
//     return applyFilters(filteredOrders)
//   }

//   // Handler para refrescar con animación
//   const handleRefresh = async () => {
//     setIsRefreshing(true)
//     await controls.start(rotateRefresh)
//     await fetchHistoricalOrders()
//     setIsRefreshing(false)
//     controls.stop()
//   }

//   // Handler para acción de orden con animación
//   const handleOrderActionAPI = async (paymentData: any) => {
//     const { order, paymentInfo } = paymentData

//     try {
//       const paymentSummary = {
//         total: paymentInfo.total,
//         paid: paymentInfo.paid,
//         methods: paymentInfo.payments.map((p: any) => ({
//           method: p.method,
//           amount: p.amount,
//           ...p.details
//         }))
//       }

//       const dataPayment = {
//         orderId: order?.id,
//         payment: paymentSummary,
//         status: "completed",
//         companyName: data?.companyName,
//         companyId: data?._id
//       }

//       const res = await fetch(`/api/payments`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(dataPayment),
//       })

//       if (!res.ok) throw new Error('Error al actualizar la orden')

//       const result = await res.json()
//       console.log('Orden actualizada:', result)

//       // Animación de éxito
//       await controls.start({
//         scale: [1, 1.05, 1],
//         transition: { duration: 0.3 }
//       })

//     } catch (error) {
//       console.error("Error en handleOrderActionAPI:", error)
//     }
//   }

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSearchTerm("")
//     setStatusFilter("all")
//     setAmountFilter("all")
//     setPaymentMethodFilter("all")
//   }

//   // Get status options from available orders
//   const statusOptions = Object.keys(filteredOrders).map(status => ({
//     value: status.toLowerCase(),
//     label: status
//   }))

//   return (
//     <Box sx={{
//       height: "100vh",
//       overflow: "hidden",
//       bgcolor: theme.palette.background.default,
//       display: "flex",
//       flexDirection: "column",
//     }}>
//       {/* AppBar con animaciones */}
//       <AppBar
//         position="static"
//         component={motion.div}
//         initial="hidden"
//         animate="visible"
//         variants={fadeIn}
//         transition={{ duration: 0.7 }}
//         elevation={0}
//         sx={{
//           bgcolor: "background.paper",
//           color: "text.primary",
//           borderBottom: 1,
//           borderColor: "divider",
//         }}
//       >
//         <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
//           {/* Logo con efecto hover */}
//           <Box sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             flexGrow: 1,
//             height: "40px",
//             position: "relative",
//             overflow: "hidden",
//           }}>
//             <motion.div 
//               whileHover={{ scale: 1.1, rotate: 5 }}
//               whileTap={{ scale: 0.9 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             >
//               <Avatar sx={{
//                 width: 28,
//                 height: 28,
//                 flexShrink: 0,
//                 ml: 0.5,
//               }}>
//                 <Image
//                   src={"/images/flama.png"}
//                   alt={"LlakaScript"}
//                   width={28}
//                   height={28}
//                   priority
//                   style={{
//                     objectFit: "contain",
//                     width: "100%",
//                     height: "100%",
//                   }}
//                 />
//               </Avatar>
//             </motion.div>

//             {/* Título con animación de cambio */}
//             <Box sx={{
//               position: "relative",
//               width: "auto",
//               height: "100%",
//               display: "flex",
//               alignItems: "center",
//               flexGrow: 1,
//             }}>
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={displayTitle ? "pedido-actual" : "panel-ordenes"}
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 10 }}
//                   transition={{ 
//                     duration: 0.3,
//                     type: "spring",
//                     stiffness: 300,
//                     damping: 20
//                   }}
//                   style={{
//                     position: "absolute",
//                     left: 0,
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   <Typography
//                     variant={isMobile ? "subtitle1" : "h6"}
//                     sx={{
//                       fontWeight: 600,
//                       lineHeight: 1.1,
//                       fontSize: isMobile ? "1rem" : undefined,
//                     }}
//                   >
//                     {displayTitle ? " Pagos de Ordenes" : "LlakaSript"}
//                   </Typography>
//                 </motion.div>
//               </AnimatePresence>
//             </Box>
//           </Box>

//           {/* Controles con animaciones */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//             {isMobile && Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0) > 0 && (
//               <motion.div whileHover={{ scale: 1.1 }}>
//                 <Badge 
//                   badgeContent={Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)} 
//                   color="primary" 
//                   sx={{ mr: 0.5 }}
//                 >
//                   <Box sx={{ width: 4, height: 4 }} />
//                 </Badge>
//               </motion.div>
//             )}

//             {lastRefresh && !isMobile && (
//               <motion.div variants={slideUp}>
//                 <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
//                   Actualizado: {lastRefresh.toLocaleTimeString()}
//                 </Typography>
//               </motion.div>
//             )}

//             <Tooltip title="Actualizar">
//               <motion.div
//                 animate={controls}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <IconButton
//                   color="primary"
//                   size="small"
//                   onClick={handleRefresh}
//                   disabled={isLoadingHistory || isUpdating}
//                 >
//                   <Refresh fontSize="small" />
//                 </IconButton>
//               </motion.div>
//             </Tooltip>

//             {isMobile && (
//               <Tooltip title={viewMode === "column" ? "Vista lista" : "Vista columnas"}>
//                 <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//                   <IconButton size="small" onClick={() => setViewMode(viewMode === "column" ? "list" : "column")} color="default">
//                     {viewMode === "column" ? <ViewList fontSize="small" /> : <ViewColumn fontSize="small" />}
//                   </IconButton>
//                 </motion.div>
//               </Tooltip>
//             )}

//             {isMobile && (
//               <motion.div whileHover={{ scale: 1.1 }}>
//                 <IconButton size="small" onClick={() => setHeaderCollapsed(!headerCollapsed)}>
//                   {headerCollapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
//                 </IconButton>
//               </motion.div>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Contenido principal con animaciones */}
//       <Box sx={{
//         p: { xs: 0.5, sm: 2 },
//         flex: 1,
//         overflow: "hidden",
//         display: "flex",
//         flexDirection: "column",
//       }}>
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//           style={{ height: "100%" }}
//         >
//           <Paper
//             elevation={isMobile ? 1 : 3}
//             sx={{
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               overflow: "hidden",
//               borderRadius: { xs: 1, sm: 2 },
//             }}
//             component={motion.div}
//             whileHover={{ boxShadow: theme.shadows[isMobile ? 2 : 6] }}
//             transition={{ duration: 0.3 }}
//           >
//             {/* Encabezado colapsable */}
//             <motion.div
//               animate={{
//                 maxHeight: headerCollapsed ? 0 : 'auto',
//                 opacity: headerCollapsed ? 0 : 1,
//                 padding: headerCollapsed ? 0 : theme.spacing(2),
//                 margin: headerCollapsed ? 0 : theme.spacing(1)
//               }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 borderBottom: `1px solid ${theme.palette.divider}`,
//                 overflow: "hidden",
//               }}
//             >
//               {/* Filtros de búsqueda */}
//               <Box sx={{ 
//                 display: 'flex', 
//                 flexDirection: isMobile ? 'column' : 'row', 
//                 gap: 2,
//                 mb: 2,
//                 alignItems: 'center'
//               }}>
//                 <TextField
//                   fullWidth={isMobile}
//                   size="small"
//                   placeholder="Buscar orden..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Search fontSize="small" />
//                       </InputAdornment>
//                     ),
//                     endAdornment: searchTerm && (
//                       <InputAdornment position="end">
//                         <IconButton size="small" onClick={() => setSearchTerm('')}>
//                           <Clear fontSize="small" />
//                         </IconButton>
//                       </InputAdornment>
//                     )
//                   }}
//                   sx={{ 
//                     flex: 1,
//                     minWidth: isMobile ? '100%' : 300
//                   }}
//                 />

//                 <Box sx={{ 
//                   display: 'flex', 
//                   gap: 1,
//                   width: isMobile ? '100%' : 'auto',
//                   flexWrap: isMobile ? 'wrap' : 'nowrap'
//                 }}>
//                   <Button
//                     size="small"
//                     variant="outlined"
//                     startIcon={<FilterAlt fontSize="small" />}
//                     onClick={() => setShowFilters(!showFilters)}
//                     sx={{ whiteSpace: 'nowrap' }}
//                   >
//                     Filtros
//                   </Button>

//                   {(searchTerm || statusFilter !== 'all' || amountFilter !== 'all') && (
//                     <Button
//                       size="small"
//                       variant="text"
//                       startIcon={<Clear fontSize="small" />}
//                       onClick={clearAllFilters}
//                       sx={{ whiteSpace: 'nowrap' }}
//                     >
//                       Limpiar
//                     </Button>
//                   )}
//                 </Box>
//               </Box>

//               {/* Filtros avanzados */}
//               {showFilters && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Box sx={{
//                     display: 'flex',
//                     flexDirection: isMobile ? 'column' : 'row',
//                     gap: 2,
//                     mb: 2,
//                     pt: 1,
//                     alignItems: isMobile ? 'stretch' : 'center'
//                   }}>
//                     <TextField
//                       select
//                       size="small"
//                       label="Estado"
//                       value={statusFilter}
//                       onChange={(e) => setStatusFilter(e.target.value)}
//                       sx={{ minWidth: isMobile ? '100%' : 150 }}
//                     >
//                       <MenuItem value="all">Todos los estados</MenuItem>
//                       {statusOptions.map((option) => (
//                         <MenuItem key={option.value} value={option.value}>
//                           {option.label}
//                         </MenuItem>
//                       ))}
//                     </TextField>

//                     <TextField
//                       select
//                       size="small"
//                       label="Monto"
//                       value={amountFilter}
//                       onChange={(e) => setAmountFilter(e.target.value)}
//                       sx={{ minWidth: isMobile ? '100%' : 150 }}
//                     >
//                       <MenuItem value="all">Todos los montos</MenuItem>
//                       <MenuItem value="small">Menos de $50</MenuItem>
//                       <MenuItem value="medium">$50 - $100</MenuItem>
//                       <MenuItem value="large">Más de $100</MenuItem>
//                     </TextField>

//                     <TextField
//                       select
//                       size="small"
//                       label="Método de pago"
//                       value={paymentMethodFilter}
//                       onChange={(e) => setPaymentMethodFilter(e.target.value)}
//                       sx={{ minWidth: isMobile ? '100%' : 150 }}
//                     >
//                       <MenuItem value="all">Todos los métodos</MenuItem>
//                       <MenuItem value="cash">Efectivo</MenuItem>
//                       <MenuItem value="card">Tarjeta</MenuItem>
//                       <MenuItem value="transfer">Transferencia</MenuItem>
//                     </TextField>
//                   </Box>
//                 </motion.div>
//               )}

//               {/* Mostrar filtros activos */}
//               {(searchTerm || statusFilter !== 'all' || amountFilter !== 'all' || paymentMethodFilter !== 'all') && (
//                 <Box sx={{ 
//                   display: 'flex', 
//                   gap: 1, 
//                   flexWrap: 'wrap',
//                   alignItems: 'center',
//                   mb: 1
//                 }}>
//                   <Typography variant="caption" color="text.secondary">
//                     Filtros activos:
//                   </Typography>

//                   {searchTerm && (
//                     <Chip
//                       size="small"
//                       label={`Buscar: "${searchTerm}"`}
//                       onDelete={() => setSearchTerm('')}
//                     />
//                   )}

//                   {statusFilter !== 'all' && (
//                     <Chip
//                       size="small"
//                       label={`Estado: ${statusOptions.find(o => o.value === statusFilter)?.label || statusFilter}`}
//                       onDelete={() => setStatusFilter('all')}
//                     />
//                   )}

//                   {amountFilter !== 'all' && (
//                     <Chip
//                       size="small"
//                       label={`Monto: ${
//                         amountFilter === 'small' ? '< $50' : 
//                         amountFilter === 'medium' ? '$50 - $100' : '> $100'
//                       }`}
//                       onDelete={() => setAmountFilter('all')}
//                     />
//                   )}

//                   {paymentMethodFilter !== 'all' && (
//                     <Chip
//                       size="small"
//                       label={`Pago: ${
//                         paymentMethodFilter === 'cash' ? 'Efectivo' : 
//                         paymentMethodFilter === 'card' ? 'Tarjeta' : 'Transferencia'
//                       }`}
//                       onDelete={() => setPaymentMethodFilter('all')}
//                     />
//                   )}
//                 </Box>
//               )}

//               {(isLoadingHistory || isUpdating) && (
//                 <motion.div
//                   initial="hidden"
//                   animate="visible"
//                   variants={popIn}
//                 >
//                   <Box sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                     p: 1,
//                     mx: { xs: 1, sm: 2 },
//                     mb: { xs: 1, sm: 2 },
//                     backgroundColor: "action.hover",
//                     borderRadius: 1,
//                   }}>
//                     <CircularProgress size={16} />
//                     <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
//                       {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
//                     </Typography>
//                   </Box>
//                 </motion.div>
//               )}
//             </motion.div>

//             {/* Mensajes de error con animación */}
//             <Box sx={{
//               px: { xs: 1, sm: 2 },
//               pt: { xs: 1, sm: 1 },
//               overflow: "auto",
//               flexShrink: 0,
//             }}>
//               <AnimatePresence>
//                 {error && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Alert 
//                       severity="error" 
//                       onClose={() => setError(null)} 
//                       sx={{ mb: 1 }}
//                       component={motion.div}
//                     >
//                       {error}
//                     </Alert>
//                   </motion.div>
//                 )}

//                 {updateError && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Alert 
//                       severity="error" 
//                       onClose={() => setUpdateError(null)} 
//                       sx={{ mb: 1 }}
//                       component={motion.div}
//                     >
//                       {updateError}
//                     </Alert>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </Box>

//             {/* Componente de órdenes con animación */}
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={fadeIn}
//               style={{ flex: 1, overflow: "hidden" }}
//             >
//               <OrdersSalesScreenStaffNew
//                 orders={getFilteredOrders()}
//                 onPaymentSubmit={handleOrderActionAPI}
//               />
//             </motion.div>
//           </Paper>
//         </motion.div>
//       </Box>

//       {/* Notificación de éxito con animación */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Snackbar
//               open={!!successMessage}
//               autoHideDuration={3000}
//               onClose={clearMessages}
//               message={successMessage}
//               anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Box>
//   )
// }

// export default OrdersSaleStaff





"use client"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import {
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
  IconButton,
  Tooltip,
  Badge,
  Avatar,
  AppBar,
  Toolbar,
  TextField,
  MenuItem,
  Chip,
  Divider,
  Button,
  InputAdornment
} from "@mui/material"
import { Refresh, ExpandMore, ExpandLess, ViewList, ViewColumn, Search, FilterAlt, Clear } from "@mui/icons-material"
import { motion, AnimatePresence, useAnimationControls } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useOrdersManagement } from "../../../hooks/useOrdersManagement"
import OrdersSalesScreenStaffNew from "../Orders/OrdersSalesScreenStaff/OrdersSalesScreenStaffNew"

// Animaciones reutilizables
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
}

const popIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 20 } }
}

const rotateRefresh = {
  rotate: 360,
  transition: { duration: 1, repeat: Infinity, ease: "linear" }
}

const OrdersSaleStaff = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const controls = useAnimationControls()

  const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
  const [displayTitle, setDisplayTitle] = useState(false)
  const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column")
  const [filteredOrders, setFilteredOrders] = useState<any>({})
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(!isMobile)

  // Selectores de Redux
  const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
  const user = useSelector((state: RootState) => state.auth)

  // Hook personalizado para gestión de órdenes
  const {
    ordersByStatus,
    lastRefresh,
    isLoadingHistory,
    isUpdating,
    error,
    updateError,
    successMessage,
    fetchHistoricalOrders,
    handleOrderAction,
    clearMessages,
    setUpdateError,
    setError,
  } = useOrdersManagement({
    companyName: data?.companyName,
    userEmail: user?.user?.email,
  })

  // Efecto para animación de título
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTitle(prev => !prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Efecto para filtrar órdenes
  useEffect(() => {
    const fetchAndFilterOrders = async () => {
      try {
        const today = new Date()
        const startTime = new Date(today)
        startTime.setHours(9, 0, 0, 0)
        const endTime = new Date(today)
        endTime.setHours(23, 0, 0, 0)

        const res = await fetch(
          `/api/payments?companyId=${data?._id}&dateFrom=${startTime.toISOString()}&dateTo=${endTime.toISOString()}&onlyOrderIds=true`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        )

        const paidOrderIds = await res.json()

        const filtered = Object.entries(ordersByStatus).reduce((acc, [status, orders]) => {
          const filteredOrders = orders.filter((order: any) => !paidOrderIds.includes(order.id))
          if (filteredOrders.length > 0) acc[status] = filteredOrders
          return acc
        }, {} as Record<string, any[]>)

        setFilteredOrders(filtered)

      } catch (error) {
        console.error("Error al filtrar órdenes:", error)
        const currentWithoutEmpties = Object.fromEntries(
          Object.entries(ordersByStatus).filter(([_, orders]) => orders.length > 0)
        )
        setFilteredOrders(currentWithoutEmpties)
      }
    }

    if (data?._id && Object.keys(ordersByStatus).length > 0) {
      fetchAndFilterOrders()
    }
  }, [data?._id, ordersByStatus])

  // Apply additional filters
  const applyFilters = (orders: any) => {
    return Object.entries(orders).reduce((acc, [status, ordersList]) => {
      const filtered = (ordersList as any[]).filter(order => {
        // Search term filter (matches id, email, fullname, phone, or items)
        const matchesSearch =
          searchTerm === "" ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (order.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (order.fullname?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (order.phone?.includes(searchTerm)) ||
          (order.cart?.some((item: any) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())));

        // Status filter
        const matchesStatus: any =
          statusFilter === "all" ||
          status.toLowerCase() === statusFilter.toLowerCase();

        // Order type filter
        const matchesOrderType =
          orderTypeFilter === "all" ||
          order.orderType?.toLowerCase() === orderTypeFilter.toLowerCase();

        return matchesSearch && matchesStatus && matchesOrderType;
      });

      if (filtered.length > 0) acc[status] = filtered;
      return acc;
    }, {} as Record<string, any[]>);
  };

  // Get filtered orders
  const getFilteredOrders = () => {
    return applyFilters(filteredOrders)
  }

  // Handler para refrescar con animación
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await controls.start(rotateRefresh)
    await fetchHistoricalOrders()
    setIsRefreshing(false)
    controls.stop()
  }

  // Handler para acción de orden con animación
  const handleOrderActionAPI = async (paymentData: any) => {
    const { order, paymentInfo } = paymentData

    try {
      const paymentSummary = {
        total: paymentInfo.total,
        paid: paymentInfo.paid,
        methods: paymentInfo.payments.map((p: any) => ({
          method: p.method,
          amount: p.amount,
          ...p.details
        }))
      }

      const dataPayment = {
        orderId: order?.id,
        payment: paymentSummary,
        status: "completed",
        companyName: data?.companyName,
        companyId: data?._id
      }

      const res = await fetch(`/api/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataPayment),
      })

      if (!res.ok) throw new Error('Error al actualizar la orden')

      const result = await res.json()
      console.log('Orden actualizada:', result)

      // Animación de éxito
      await controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.3 }
      })

    } catch (error) {
      console.error("Error en handleOrderActionAPI:", error)
    }
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setOrderTypeFilter("all")
  }

  // Get status options from available orders
  const statusOptions = Object.keys(filteredOrders).map(status => ({
    value: status.toLowerCase(),
    label: status.charAt(0).toUpperCase() + status.slice(1)
  }))

  // Get order type options from available orders
  const orderTypeOptions = [
    { value: "all", label: "Todos los tipos" },
    { value: "delivery", label: "Delivery" },
    { value: "mesa", label: "Mesa" },
    { value: "para llevar", label: "Para llevar" }
  ]

  return (
    <Box sx={{
      height: "100vh",
      overflow: "hidden",
      bgcolor: theme.palette.background.default,
      display: "flex",
      flexDirection: "column",
    }}>
      {/* AppBar con animaciones */}
      <AppBar
        position="static"
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.7 }}
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
          {/* Logo con efecto hover */}
          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexGrow: 1,
            height: "40px",
            position: "relative",
            overflow: "hidden",
          }}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Avatar sx={{
                width: 28,
                height: 28,
                flexShrink: 0,
                ml: 0.5,
              }}>
                <Image
                  src={"/images/flama.png"}
                  alt={"LlakaScript"}
                  width={28}
                  height={28}
                  priority
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Avatar>
            </motion.div>

            {/* Título con animación de cambio */}
            <Box sx={{
              position: "relative",
              width: "auto",
              height: "100%",
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayTitle ? "pedido-actual" : "panel-ordenes"}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  style={{
                    position: "absolute",
                    left: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.1,
                      fontSize: isMobile ? "1rem" : undefined,
                    }}
                  >
                    {displayTitle ? " Pagos de Ordenes" : "LlakaSript"}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>

          {/* Controles con animaciones */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {isMobile && Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0) > 0 && (
              <motion.div whileHover={{ scale: 1.1 }}>
                <Badge
                  badgeContent={Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)}
                  color="primary"
                  sx={{ mr: 0.5 }}
                >
                  <Box sx={{ width: 4, height: 4 }} />
                </Badge>
              </motion.div>
            )}

            {lastRefresh && !isMobile && (
              <motion.div variants={slideUp}>
                <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                  Actualizado: {lastRefresh.toLocaleTimeString()}
                </Typography>
              </motion.div>
            )}

            <Tooltip title="Actualizar">
              <motion.div
                animate={controls}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  color="primary"
                  size="small"
                  onClick={handleRefresh}
                  disabled={isLoadingHistory || isUpdating}
                >
                  <Refresh fontSize="small" />
                </IconButton>
              </motion.div>
            </Tooltip>

            {isMobile && (
              <Tooltip title={viewMode === "column" ? "Vista lista" : "Vista columnas"}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton size="small" onClick={() => setViewMode(viewMode === "column" ? "list" : "column")} color="default">
                    {viewMode === "column" ? <ViewList fontSize="small" /> : <ViewColumn fontSize="small" />}
                  </IconButton>
                </motion.div>
              </Tooltip>
            )}

            {isMobile && (
              <motion.div whileHover={{ scale: 1.1 }}>
                <IconButton size="small" onClick={() => setHeaderCollapsed(!headerCollapsed)}>
                  {headerCollapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
                </IconButton>
              </motion.div>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenido principal con animaciones */}
      <Box sx={{
        p: { xs: 0.5, sm: 2 },
        flex: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          style={{ height: "100%" }}
        >
          <Paper
            elevation={isMobile ? 1 : 3}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: { xs: 1, sm: 2 },
            }}
            component={motion.div}
            whileHover={{ boxShadow: theme.shadows[isMobile ? 2 : 6] }}
            transition={{ duration: 0.3 }}
          >
            {/* Encabezado colapsable */}
            <motion.div
              animate={{
                maxHeight: headerCollapsed ? 0 : 'auto',
                opacity: headerCollapsed ? 0 : 1,
                padding: headerCollapsed ? 0 : theme.spacing(2),
                margin: headerCollapsed ? 0 : theme.spacing(1)
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                borderBottom: `1px solid ${theme.palette.divider}`,
                overflow: "hidden",
              }}
            >
              {/* Filtros de búsqueda */}
              <Box sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 2,
                mb: 2,
                alignItems: 'center'
              }}>
                <TextField
                  fullWidth={isMobile}
                  size="small"
                  placeholder="Buscar orden, email, nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearchTerm('')}>
                          <Clear fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    flex: 1,
                    minWidth: isMobile ? '100%' : 300
                  }}
                />

                <Box sx={{
                  display: 'flex',
                  gap: 1,
                  width: isMobile ? '100%' : 'auto',
                  flexWrap: isMobile ? 'wrap' : 'nowrap'
                }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<FilterAlt fontSize="small" />}
                    onClick={() => setShowFilters(!showFilters)}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Filtros
                  </Button>

                  {(searchTerm || statusFilter !== 'all' || orderTypeFilter !== 'all') && (
                    <Button
                      size="small"
                      variant="text"
                      startIcon={<Clear fontSize="small" />}
                      onClick={clearAllFilters}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Limpiar
                    </Button>
                  )}
                </Box>
              </Box>

              {/* Filtros avanzados */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2,
                    mb: 2,
                    pt: 1,
                    alignItems: isMobile ? 'stretch' : 'center'
                  }}>
                    <TextField
                      select
                      size="small"
                      label="Estado"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      sx={{ minWidth: isMobile ? '100%' : 150 }}
                    >
                      <MenuItem value="all">Todos los estados</MenuItem>
                      {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      size="small"
                      label="Tipo de orden"
                      value={orderTypeFilter}
                      onChange={(e) => setOrderTypeFilter(e.target.value)}
                      sx={{ minWidth: isMobile ? '100%' : 150 }}
                    >
                      {orderTypeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </motion.div>
              )}

              {/* Mostrar filtros activos */}
              {(searchTerm || statusFilter !== 'all' || orderTypeFilter !== 'all') && (
                <Box sx={{
                  display: 'flex',
                  gap: 1,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  mb: 1
                }}>
                  <Typography variant="caption" color="text.secondary">
                    Filtros activos:
                  </Typography>

                  {searchTerm && (
                    <Chip
                      size="small"
                      label={`Buscar: "${searchTerm}"`}
                      onDelete={() => setSearchTerm('')}
                    />
                  )}

                  {statusFilter !== 'all' && (
                    <Chip
                      size="small"
                      label={`Estado: ${statusOptions.find(o => o.value === statusFilter)?.label || statusFilter}`}
                      onDelete={() => setStatusFilter('all')}
                    />
                  )}

                  {orderTypeFilter !== 'all' && (
                    <Chip
                      size="small"
                      label={`Tipo: ${orderTypeOptions.find(o => o.value === orderTypeFilter)?.label || orderTypeFilter
                        }`}
                      onDelete={() => setOrderTypeFilter('all')}
                    />
                  )}
                </Box>
              )}

              {(isLoadingHistory || isUpdating) && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={popIn}
                >
                  <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: 1,
                    mx: { xs: 1, sm: 2 },
                    mb: { xs: 1, sm: 2 },
                    backgroundColor: "action.hover",
                    borderRadius: 1,
                  }}>
                    <CircularProgress size={16} />
                    <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
                      {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </motion.div>

            {/* Mensajes de error con animación */}
            <Box sx={{
              px: { xs: 1, sm: 2 },
              pt: { xs: 1, sm: 1 },
              overflow: "auto",
              flexShrink: 0,
            }}>
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert
                      severity="error"
                      onClose={() => setError(null)}
                      sx={{ mb: 1 }}
                      component={motion.div}
                    >
                      {error}
                    </Alert>
                  </motion.div>
                )}

                {updateError && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert
                      severity="error"
                      onClose={() => setUpdateError(null)}
                      sx={{ mb: 1 }}
                      component={motion.div}
                    >
                      {updateError}
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

            {/* Componente de órdenes con animación */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              style={{ flex: 1, overflow: "hidden" }}
            >
              <OrdersSalesScreenStaffNew
                orders={getFilteredOrders()}
                onPaymentSubmit={handleOrderActionAPI}
              />
            </motion.div>
          </Paper>
        </motion.div>
      </Box>

      {/* Notificación de éxito con animación */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <Snackbar
              open={!!successMessage}
              autoHideDuration={3000}
              onClose={clearMessages}
              message={successMessage}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default OrdersSaleStaff