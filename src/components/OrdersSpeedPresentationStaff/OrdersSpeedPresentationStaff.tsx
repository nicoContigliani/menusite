// // // "use client"
// // // import { useSelector } from "react-redux"
// // // import type { RootState } from "../../../store/store"
// // // import styles from "./OrdersSpeedPresentation.module.css"
// // // import { Box, Button, CircularProgress, Alert, Snackbar, Typography } from "@mui/material"
// // // import { Refresh } from "@mui/icons-material"
// // // import OrdersScreen from "../Orders/OrdersScreen/OrdersScreen"
// // // import { useOrdersManagement } from "../../../hooks/useOrdersManagement"
// // // import OrdersScreenStaff from "../Orders/OrdersScreenStaff/OrdersScreenStaff"

// // // const OrdersSpeedPresentationStaff = () => {
// // //   // Redux selectors
// // //   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
// // //   const user = useSelector((state: RootState) => state.auth)

// // //   // Use our custom hook - all the logic is now in the hook
// // //   const {
// // //     ordersByStatus,
// // //     lastRefresh,
// // //     isLoadingHistory,
// // //     isUpdating,
// // //     error,
// // //     updateError,
// // //     successMessage,
// // //     fetchHistoricalOrders,
// // //     handleOrderAction,
// // //     clearMessages,
// // //     setUpdateError,
// // //     setError,
// // //   } = useOrdersManagement({
// // //     companyName: data?.companyName,
// // //     userEmail: user?.user?.email,
// // //   })

// // //   return (
// // //     <div className={styles.ordersContainer}>
// // //       <video autoPlay muted loop playsInline className={styles.heroVideo}>
// // //         <source src="/videos/menu.mp4" type="video/mp4" />
// // //         Your browser does not support videos.
// // //       </video>

// // //       <Box sx={{ pb: 7 }}>
// // //         <Box sx={{ textAlign: "center", p: 1 }}>
// // //           {/* Refresh Controls */}
// // //           <Box sx={{ mb: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
// // //             <Button
// // //               variant="outlined"
// // //               startIcon={<Refresh />}
// // //               onClick={fetchHistoricalOrders}
// // //               disabled={isLoadingHistory || isUpdating}
// // //               size="small"
// // //             >
// // //               Recargar Historial
// // //             </Button>

// // //             {lastRefresh && (
// // //               <Typography variant="caption" color="text.secondary">
// // //                 Última actualización: {lastRefresh.toLocaleTimeString()}
// // //               </Typography>
// // //             )}
// // //           </Box>

// // //           {/* Error Handling */}
// // //           {error && (
// // //             <Alert severity="error" sx={{ maxWidth: 600, mx: "auto", mb: 2 }} onClose={() => setError(null)}>
// // //               {error}
// // //             </Alert>
// // //           )}

// // //           {updateError && (
// // //             <Alert severity="error" sx={{ maxWidth: 600, mx: "auto", mb: 2 }} onClose={() => setUpdateError(null)}>
// // //               {updateError}
// // //             </Alert>
// // //           )}

// // //           {/* Loading Indicators */}
// // //           {(isLoadingHistory || isUpdating) && (
// // //             <Box display="flex" justifyContent="center" my={2}>
// // //               <CircularProgress size={24} />
// // //               <Typography variant="body2" ml={2}>
// // //                 {isUpdating ? "Actualizando orden..." : "Cargando historial de órdenes..."}
// // //               </Typography>
// // //             </Box>
// // //           )}

// // //           {/* Orders Screen Component */}
// // //           <OrdersScreenStaff ordersByStatus={ordersByStatus} onOrderAction={handleOrderAction} />
// // //         </Box>

// // //         {/* Success Notification */}
// // //         <Snackbar
// // //           open={!!successMessage}
// // //           autoHideDuration={3000}
// // //           onClose={clearMessages}
// // //           message={successMessage}
// // //           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// // //         />
// // //       </Box>
// // //     </div>
// // //   )
// // // }

// // // export default OrdersSpeedPresentationStaff

// // "use client"
// // import { useSelector } from "react-redux"
// // import type { RootState } from "../../../store/store"
// // import {
// //   Box,
// //   Button,
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
// // } from "@mui/material"
// // import { Refresh, ExpandMore, ExpandLess } from "@mui/icons-material"
// // import { motion } from "framer-motion"
// // import { useState } from "react"
// // import OrdersScreenStaff from "../Orders/OrdersScreenStaff/OrdersScreenStaff"
// // import { useOrdersManagement } from "../../../hooks/useOrdersManagement"

// // const OrdersSpeedPresentationStaff = () => {
// //   const theme = useTheme()
// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
// //   const isTablet = useMediaQuery(theme.breakpoints.down("md"))
// //   const [headerCollapsed, setHeaderCollapsed] = useState(false)

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

// //   // Count total orders
// //   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)

// //   // Count orders by status for the header chips
// //   const pendingCount = ordersByStatus.pending?.length || 0
// //   const processingCount = ordersByStatus.processing?.length || 0 + (ordersByStatus.paused?.length || 0)
// //   const completedCount = ordersByStatus.finished?.length || 0 + (ordersByStatus.delivered?.length || 0)

// //   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)

// //   return (
// //     <Box
// //       sx={{
// //         p: { xs: 1, sm: 2 },
// //         height: "100vh",
// //         overflow: "hidden",
// //         bgcolor: theme.palette.background.default,
// //       }}
// //     >
// //       <Paper
// //         elevation={3}
// //         sx={{
// //           height: "100%",
// //           display: "flex",
// //           flexDirection: "column",
// //           overflow: "hidden",
// //           borderRadius: { xs: 1, sm: 2 },
// //         }}
// //       >
// //         {/* Collapsible Header */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             flexDirection: "column",
// //             borderBottom: 1,
// //             borderColor: "divider",
// //             transition: "all 0.3s ease",
// //             maxHeight: headerCollapsed && isMobile ? "48px" : "200px",
// //             overflow: "hidden",
// //           }}
// //         >
// //           {/* Header top row with title and collapse button */}
// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               p: { xs: 1, sm: 2 },
// //               pb: { xs: 0.5, sm: 1 },
// //             }}
// //           >
// //             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
// //               <Box sx={{ display: "flex", alignItems: "center" }}>
// //                 <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" noWrap>
// //                   Panel de Órdenes
// //                 </Typography>

// //                 <Chip
// //                   size="small"
// //                   label={`${totalOrders} órdenes`}
// //                   color="primary"
// //                   sx={{ ml: 1, display: { xs: "none", sm: "flex" } }}
// //                 />
// //               </Box>
// //             </motion.div>

// //             {isMobile && (
// //               <IconButton size="small" onClick={toggleHeader} sx={{ ml: 1 }}>
// //                 {headerCollapsed ? <ExpandMore /> : <ExpandLess />}
// //               </IconButton>
// //             )}
// //           </Box>

// //           {/* Header content */}
// //           <Box
// //             sx={{
// //               display: "flex",
// //               flexDirection: { xs: "column", sm: "row" },
// //               justifyContent: "space-between",
// //               alignItems: { xs: "stretch", sm: "center" },
// //               p: { xs: 1, sm: 2 },
// //               pt: { xs: 0.5, sm: 0 },
// //               gap: 1,
// //             }}
// //           >
// //             {/* Status chips */}
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 gap: 1,
// //                 flexWrap: "wrap",
// //               }}
// //             >
// //               {pendingCount > 0 && (
// //                 <Chip size="small" color="warning" label={`${pendingCount} pendientes`} variant="outlined" />
// //               )}
// //               {processingCount > 0 && (
// //                 <Chip size="small" color="info" label={`${processingCount} en proceso`} variant="outlined" />
// //               )}
// //               {completedCount > 0 && (
// //                 <Chip size="small" color="success" label={`${completedCount} completadas`} variant="outlined" />
// //               )}
// //             </Box>

// //             {/* Controls */}
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: { xs: "space-between", sm: "flex-end" },
// //                 gap: 1,
// //                 mt: { xs: 1, sm: 0 },
// //               }}
// //             >
// //               {lastRefresh && (
// //                 <Typography
// //                   variant="caption"
// //                   color="text.secondary"
// //                   sx={{
// //                     whiteSpace: "nowrap",
// //                     fontSize: { xs: "0.65rem", sm: "0.75rem" },
// //                   }}
// //                 >
// //                   Actualizado: {lastRefresh.toLocaleTimeString()}
// //                 </Typography>
// //               )}

// //               {isMobile ? (
// //                 <Tooltip title="Actualizar">
// //                   <IconButton
// //                     color="primary"
// //                     size="small"
// //                     onClick={fetchHistoricalOrders}
// //                     disabled={isLoadingHistory || isUpdating}
// //                   >
// //                     <Refresh fontSize="small" />
// //                   </IconButton>
// //                 </Tooltip>
// //               ) : (
// //                 <Button
// //                   variant="contained"
// //                   size="small"
// //                   startIcon={<Refresh />}
// //                   onClick={fetchHistoricalOrders}
// //                   disabled={isLoadingHistory || isUpdating}
// //                 >
// //                   Actualizar
// //                 </Button>
// //               )}
// //             </Box>
// //           </Box>

// //           {/* Status indicators */}
// //           {(isLoadingHistory || isUpdating) && (
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: 1,
// //                 p: 1,
// //                 mx: { xs: 1, sm: 2 },
// //                 mb: { xs: 1, sm: 2 },
// //                 backgroundColor: "action.hover",
// //                 borderRadius: 1,
// //               }}
// //             >
// //               <CircularProgress size={16} />
// //               <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
// //                 {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
// //               </Typography>
// //             </Box>
// //           )}
// //         </Box>

// //         {/* Error messages */}
// //         <Box
// //           sx={{
// //             px: { xs: 1, sm: 2 },
// //             pt: { xs: 1, sm: 2 },
// //             overflow: "auto",
// //             flexShrink: 0,
// //           }}
// //         >
// //           {error && (
// //             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
// //               <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 1 }}>
// //                 {error}
// //               </Alert>
// //             </motion.div>
// //           )}

// //           {updateError && (
// //             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
// //               <Alert severity="error" onClose={() => setUpdateError(null)} sx={{ mb: 1 }}>
// //                 {updateError}
// //               </Alert>
// //             </motion.div>
// //           )}
// //         </Box>

// //         {/* Main content - takes all available space */}
// //         <Box
// //           sx={{
// //             flex: 1,
// //             overflow: "hidden",
// //             display: "flex",
// //             flexDirection: "column",
// //           }}
// //         >
// //           <OrdersScreenStaff ordersByStatus={ordersByStatus} onOrderAction={handleOrderAction} />
// //         </Box>

// //         {/* Success notification */}
// //         <Snackbar
// //           open={!!successMessage}
// //           autoHideDuration={3000}
// //           onClose={clearMessages}
// //           message={successMessage}
// //           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// //         />
// //       </Paper>
// //     </Box>
// //   )
// // }

// // export default OrdersSpeedPresentationStaff


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
//   Chip,
//   AppBar,
//   Toolbar,
//   Avatar,
// } from "@mui/material"
// import { Refresh, ExpandMore, ExpandLess } from "@mui/icons-material"
// import { motion, AnimatePresence } from "framer-motion"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import OrdersScreenStaff from "../Orders/OrdersScreenStaff/OrdersScreenStaff"
// import { useOrdersManagement } from "../../../hooks/useOrdersManagement"

// const OrdersSpeedPresentationStaff = () => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
//   const isTablet = useMediaQuery(theme.breakpoints.down("md"))
//   const [headerCollapsed, setHeaderCollapsed] = useState(false)
//   const [displayTitle, setDisplayTitle] = useState(false)

//   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
//   const user = useSelector((state: RootState) => state.auth)

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

//   // Title animation effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayTitle((prev) => !prev)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   // Count total orders
//   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)

//   // Count orders by status for the header chips
//   const pendingCount = ordersByStatus.pending?.length || 0
//   const processingCount = ordersByStatus.processing?.length || 0 + (ordersByStatus.paused?.length || 0)
//   const completedCount = ordersByStatus.finished?.length || 0 + (ordersByStatus.delivered?.length || 0)

//   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)

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
//         <Toolbar variant="dense">
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
//             }}
//           >
//             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//               <Avatar
//                 sx={{
//                   width: 28,
//                   height: 28,
//                   flexShrink: 0,
//                   ml: 0.5,
//                 }}
//               >
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
//                   <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.1 }}>
//                     {displayTitle ? "LlakaScrpt" : "Panel de Órdenes"}
//                   </Typography>
//                 </motion.div>
//               </AnimatePresence>
//             </Box>
//           </Box>

//           {/* Right side controls */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             {lastRefresh && !isMobile && (
//               <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
//                 Actualizado: {lastRefresh.toLocaleTimeString()}
//               </Typography>
//             )}

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

//             {isMobile && (
//               <IconButton size="small" onClick={toggleHeader}>
//                 {headerCollapsed ? <ExpandMore /> : <ExpandLess />}
//               </IconButton>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Main content */}
//       <Box
//         sx={{
//           p: { xs: 1, sm: 2 },
//           flex: 1,
//           overflow: "hidden",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//             borderRadius: { xs: 1, sm: 2 },
//           }}
//         >
//           {/* Status header - collapsible on mobile */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               borderBottom: 1,
//               borderColor: "divider",
//               transition: "all 0.3s ease",
//               maxHeight: headerCollapsed && isMobile ? "0px" : "200px",
//               overflow: "hidden",
//             }}
//           >
//             {/* Status chips */}
//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 1,
//                 flexWrap: "wrap",
//                 p: { xs: 1, sm: 2 },
//                 justifyContent: "center",
//               }}
//             >
//               <Chip size="small" color="default" label={`${totalOrders} órdenes`} variant="outlined" />

//               {pendingCount > 0 && (
//                 <Chip size="small" color="warning" label={`${pendingCount} pendientes`} variant="outlined" />
//               )}

//               {processingCount > 0 && (
//                 <Chip size="small" color="info" label={`${processingCount} en proceso`} variant="outlined" />
//               )}

//               {completedCount > 0 && (
//                 <Chip size="small" color="success" label={`${completedCount} completadas`} variant="outlined" />
//               )}
//             </Box>

//             {/* Status indicators */}
//             {(isLoadingHistory || isUpdating) && (
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   p: 1,
//                   mx: { xs: 1, sm: 2 },
//                   mb: { xs: 1, sm: 2 },
//                   backgroundColor: "action.hover",
//                   borderRadius: 1,
//                 }}
//               >
//                 <CircularProgress size={16} />
//                 <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
//                   {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
//                 </Typography>
//               </Box>
//             )}
//           </Box>

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

//           {/* Main content - takes all available space */}
//           <Box
//             sx={{
//               flex: 1,
//               overflow: "hidden",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <OrdersScreenStaff ordersByStatus={ordersByStatus} onOrderAction={handleOrderAction} />
//           </Box>
//         </Paper>
//       </Box>

//       {/* Success notification */}
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

// export default OrdersSpeedPresentationStaff




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
  Chip,
  AppBar,
  Toolbar,
  Avatar,
  Badge,
} from "@mui/material"
import { Refresh, ExpandMore, ExpandLess, ViewList, ViewColumn } from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import OrdersScreenStaff from "../Orders/OrdersScreenStaff/OrdersScreenStaff"
import { useOrdersManagement } from "../../../hooks/useOrdersManagement"

const OrdersSpeedPresentationStaff = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
  const [displayTitle, setDisplayTitle] = useState(false)
  const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column")

  const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
  const user = useSelector((state: RootState) => state.auth)

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

  // Update view mode when screen size changes
  useEffect(() => {
    setViewMode(isMobile ? "list" : "column")
  }, [isMobile])

  // Title animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTitle((prev) => !prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Count total orders
  const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)

  // Count orders by status for the header chips
  const pendingCount = ordersByStatus.pending?.length || 0
  const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
  const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

  const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
  const toggleViewMode = () => setViewMode(viewMode === "column" ? "list" : "column")

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
        position="static"
        component={motion.div}
        initial={false}
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
          {/* Logo and Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
              height: "40px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  flexShrink: 0,
                  ml: 0.5,
                }}
              >
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayTitle ? "pedido-actual" : "panel-ordenes"}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
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
                    {displayTitle ? "Pedido Actual" : "Panel de Órdenes"}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>

          {/* Right side controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {/* Order count badge */}
            {isMobile && totalOrders > 0 && (
              <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
                <Box sx={{ width: 4, height: 4 }} />
              </Badge>
            )}

            {/* Last refresh time */}
            {lastRefresh && !isMobile && (
              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                Actualizado: {lastRefresh.toLocaleTimeString()}
              </Typography>
            )}

            {/* Refresh button */}
            <Tooltip title="Actualizar">
              <IconButton
                color="primary"
                size="small"
                onClick={fetchHistoricalOrders}
                disabled={isLoadingHistory || isUpdating}
              >
                <Refresh fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* View mode toggle (mobile only) */}
            {isMobile && (
              <Tooltip title={viewMode === "column" ? "Vista lista" : "Vista columnas"}>
                <IconButton size="small" onClick={toggleViewMode} color="default">
                  {viewMode === "column" ? <ViewList fontSize="small" /> : <ViewColumn fontSize="small" />}
                </IconButton>
              </Tooltip>
            )}

            {/* Header collapse toggle (mobile only) */}
            {isMobile && (
              <IconButton size="small" onClick={toggleHeader}>
                {headerCollapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box
        sx={{
          p: { xs: 0.5, sm: 2 },
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
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
        >
          {/* Status header - collapsible on mobile */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderBottom: 1,
              borderColor: "divider",
              transition: "all 0.3s ease",
              maxHeight: headerCollapsed ? "0px" : "200px",
              overflow: "hidden",
            }}
          >
            {/* Status chips */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                p: { xs: 1, sm: 2 },
                justifyContent: "center",
              }}
            >
              <Chip size="small" color="default" label={`${totalOrders} órdenes`} variant="outlined" />

              {pendingCount > 0 && (
                <Chip size="small" color="warning" label={`${pendingCount} pendientes`} variant="outlined" />
              )}

              {processingCount > 0 && (
                <Chip size="small" color="info" label={`${processingCount} en proceso`} variant="outlined" />
              )}

              {completedCount > 0 && (
                <Chip size="small" color="success" label={`${completedCount} completadas`} variant="outlined" />
              )}
            </Box>

            {/* Status indicators */}
            {(isLoadingHistory || isUpdating) && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  mx: { xs: 1, sm: 2 },
                  mb: { xs: 1, sm: 2 },
                  backgroundColor: "action.hover",
                  borderRadius: 1,
                }}
              >
                <CircularProgress size={16} />
                <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
                  {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Error messages */}
          <Box
            sx={{
              px: { xs: 1, sm: 2 },
              pt: { xs: 1, sm: 1 },
              overflow: "auto",
              flexShrink: 0,
            }}
          >
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 1 }}>
                  {error}
                </Alert>
              </motion.div>
            )}

            {updateError && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Alert severity="error" onClose={() => setUpdateError(null)} sx={{ mb: 1 }}>
                  {updateError}
                </Alert>
              </motion.div>
            )}
          </Box>

          {/* Main content - takes all available space */}
          <Box
            sx={{
              flex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <OrdersScreenStaff ordersByStatus={ordersByStatus} onOrderAction={handleOrderAction} viewMode={viewMode} />
          </Box>
        </Paper>
      </Box>

      {/* Success notification */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={clearMessages}
        message={successMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Box>
  )
}

export default OrdersSpeedPresentationStaff

