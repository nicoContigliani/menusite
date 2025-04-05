// "use client"
// import { useSelector } from "react-redux"
// import type { RootState } from "../../../store/store"
// import styles from "./OrdersSpeedPresentation.module.css"
// import { Box, Button, CircularProgress, Alert, Snackbar, Typography } from "@mui/material"
// import { Refresh } from "@mui/icons-material"
// import OrdersScreen from "../Orders/OrdersScreen/OrdersScreen"
// import { useOrdersManagement } from "../../../hooks/useOrdersManagement"
// import OrdersScreenStaff from "../Orders/OrdersScreenStaff/OrdersScreenStaff"

// const OrdersSpeedPresentationStaff = () => {
//   // Redux selectors
//   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
//   const user = useSelector((state: RootState) => state.auth)

//   // Use our custom hook - all the logic is now in the hook
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

//   return (
//     <div className={styles.ordersContainer}>
//       <video autoPlay muted loop playsInline className={styles.heroVideo}>
//         <source src="/videos/menu.mp4" type="video/mp4" />
//         Your browser does not support videos.
//       </video>

//       <Box sx={{ pb: 7 }}>
//         <Box sx={{ textAlign: "center", p: 1 }}>
//           {/* Refresh Controls */}
//           <Box sx={{ mb: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
//             <Button
//               variant="outlined"
//               startIcon={<Refresh />}
//               onClick={fetchHistoricalOrders}
//               disabled={isLoadingHistory || isUpdating}
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

//           {/* Error Handling */}
//           {error && (
//             <Alert severity="error" sx={{ maxWidth: 600, mx: "auto", mb: 2 }} onClose={() => setError(null)}>
//               {error}
//             </Alert>
//           )}

//           {updateError && (
//             <Alert severity="error" sx={{ maxWidth: 600, mx: "auto", mb: 2 }} onClose={() => setUpdateError(null)}>
//               {updateError}
//             </Alert>
//           )}

//           {/* Loading Indicators */}
//           {(isLoadingHistory || isUpdating) && (
//             <Box display="flex" justifyContent="center" my={2}>
//               <CircularProgress size={24} />
//               <Typography variant="body2" ml={2}>
//                 {isUpdating ? "Actualizando orden..." : "Cargando historial de órdenes..."}
//               </Typography>
//             </Box>
//           )}

//           {/* Orders Screen Component */}
//           <OrdersScreenStaff ordersByStatus={ordersByStatus} onOrderAction={handleOrderAction} />
//         </Box>

//         {/* Success Notification */}
//         <Snackbar
//           open={!!successMessage}
//           autoHideDuration={3000}
//           onClose={clearMessages}
//           message={successMessage}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         />
//       </Box>
//     </div>
//   )
// }

// export default OrdersSpeedPresentationStaff

"use client"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import {
  Box,
  Button,
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
} from "@mui/material"
import { Refresh, ExpandMore, ExpandLess } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useState } from "react"
import OrdersScreenStaff from "../Orders/OrdersScreenStaff/OrdersScreenStaff"
import { useOrdersManagement } from "../../../hooks/useOrdersManagement"

const OrdersSpeedPresentationStaff = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [headerCollapsed, setHeaderCollapsed] = useState(false)

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

  // Count total orders
  const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)

  // Count orders by status for the header chips
  const pendingCount = ordersByStatus.pending?.length || 0
  const processingCount = ordersByStatus.processing?.length || 0 + (ordersByStatus.paused?.length || 0)
  const completedCount = ordersByStatus.finished?.length || 0 + (ordersByStatus.delivered?.length || 0)

  const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        height: "100vh",
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: { xs: 1, sm: 2 },
        }}
      >
        {/* Collapsible Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderBottom: 1,
            borderColor: "divider",
            transition: "all 0.3s ease",
            maxHeight: headerCollapsed && isMobile ? "48px" : "200px",
            overflow: "hidden",
          }}
        >
          {/* Header top row with title and collapse button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: { xs: 1, sm: 2 },
              pb: { xs: 0.5, sm: 1 },
            }}
          >
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" noWrap>
                  Panel de Órdenes
                </Typography>

                <Chip
                  size="small"
                  label={`${totalOrders} órdenes`}
                  color="primary"
                  sx={{ ml: 1, display: { xs: "none", sm: "flex" } }}
                />
              </Box>
            </motion.div>

            {isMobile && (
              <IconButton size="small" onClick={toggleHeader} sx={{ ml: 1 }}>
                {headerCollapsed ? <ExpandMore /> : <ExpandLess />}
              </IconButton>
            )}
          </Box>

          {/* Header content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              p: { xs: 1, sm: 2 },
              pt: { xs: 0.5, sm: 0 },
              gap: 1,
            }}
          >
            {/* Status chips */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
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

            {/* Controls */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "space-between", sm: "flex-end" },
                gap: 1,
                mt: { xs: 1, sm: 0 },
              }}
            >
              {lastRefresh && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                  }}
                >
                  Actualizado: {lastRefresh.toLocaleTimeString()}
                </Typography>
              )}

              {isMobile ? (
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
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Refresh />}
                  onClick={fetchHistoricalOrders}
                  disabled={isLoadingHistory || isUpdating}
                >
                  Actualizar
                </Button>
              )}
            </Box>
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
            pt: { xs: 1, sm: 2 },
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
          <OrdersScreenStaff ordersByStatus={ordersByStatus} onOrderAction={handleOrderAction} />
        </Box>

        {/* Success notification */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={clearMessages}
          message={successMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        />
      </Paper>
    </Box>
  )
}

export default OrdersSpeedPresentationStaff

