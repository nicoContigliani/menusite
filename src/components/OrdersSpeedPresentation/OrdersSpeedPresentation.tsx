// "use client"
// import { useSelector } from "react-redux"
// import type { RootState } from "../../../store/store"
// import styles from "./OrdersSpeedPresentation.module.css"
// import { Box, Button, CircularProgress, Alert, Snackbar, Typography } from "@mui/material"
// import { Refresh } from "@mui/icons-material"
// import OrdersScreen from "../Orders/OrdersScreen/OrdersScreen"
// import { useOrdersManagement } from "../../../hooks/useOrdersManagement"

// const OrdersSpeedPresentation = () => {
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
//           <OrdersScreen ordersByStatus={ordersByStatus} onOrderAction={handleOrderAction} />
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

// export default OrdersSpeedPresentation



"use client"
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Chip,
  Divider,
  Badge,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Container,
  useMediaQuery,
} from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import { Order, useOrdersManagementSocketApi } from "../../../hooks/useOrdersManagementSocketApi"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import { useEffect, useState } from "react"
import {
  AccessTime,
  Restaurant,
  CheckCircle,
  Notifications,
  Comment,
  Logout,
  RoomService,
} from "@mui/icons-material"
import { clearLocalhostStorage } from "@/services/localstorage.services"

// Create a custom theme with blue colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#0d47a1", // Deeper blue for better visibility on TV
      light: "#5472d3",
      dark: "#002171",
    },
    secondary: {
      main: "#1565c0", // Lighter blue
      light: "#5e92f3",
      dark: "#003c8f",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    error: {
      main: "#c62828", // Deeper red for better visibility
    },
    warning: {
      main: "#ef6c00", // Deeper orange for better visibility
    },
    success: {
      main: "#2e7d32", // Deeper green for better visibility
    },
    info: {
      main: "#0277bd", // Deeper blue for better visibility
      light: "#58a5f0",
      dark: "#004c8c",
    },
    text: {
      primary: "#212121", // Darker text for better contrast
      secondary: "#424242", // Darker secondary text
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: "0.5px",
    },
    h5: {
      fontWeight: 700,
      fontSize: "1.5rem",
    },
    h6: {
      fontWeight: 700,
      fontSize: "1.25rem",
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "1.1rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.9rem",
    },
  },
  shape: {
    borderRadius: 8, // Less rounded corners for a more elegant look
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)", // Subtler shadow
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 5px rgba(0,0,0,0.1)", // Subtler shadow
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
})

// Format time since order was placed
const formatTimeSince = (timestamp: any) => {
  if (!timestamp) return ""

  const now = new Date()
  const orderTime = new Date(timestamp)
  const diffMs = now.getTime() - orderTime.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return "Justo ahora"
  if (diffMins === 1) return "1 minuto"
  if (diffMins < 60) return `${diffMins} minutos`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours === 1) return "1 hora"
  return `${diffHours} horas`
}

// Animation variants - more subtle for elegance
const itemVariants = {
  hidden: { opacity: 0, y: 10 }, // Reduced movement
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Faster
      ease: "easeOut",
    },
  },
  exit: { opacity: 0, x: -50 }, // Reduced movement
}

const listVariants = {
  visible: {
    transition: {
      staggerChildren: 0.03, // Faster stagger
      delayChildren: 0.05, // Less delay
    },
  },
}

const pulseAnimation = {
  scale: [1, 1.01, 1], // Subtler scale
  boxShadow: [
    "0 2px 8px rgba(13, 71, 161, 0.08)",
    "0 3px 10px rgba(13, 71, 161, 0.15)",
    "0 2px 8px rgba(13, 71, 161, 0.08)",
  ],
  transition: {
    duration: 1.5, // Slower for elegance
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

// Order card component with animations - optimized for TV display
const OrderCard = ({ order, status, highlightNew = false }: { order: Order; status: string; highlightNew?: boolean }) => {
  const theme = useTheme()
  const isProcessing = status === "processing"
  const [highlight, setHighlight] = useState(highlightNew)
  const isLargeScreen = useMediaQuery('(min-width:1200px)')

  // Format timestamp
  const timeAgo = formatTimeSince(order.createdAt || order.timestamp)

  // Clear highlight after animation
  useEffect(() => {
    if (highlight) {
      const timer = setTimeout(() => setHighlight(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [highlight])

  // Truncate description if too long
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: isProcessing ? -50 : 50 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <motion.div
        animate={
          highlight
            ? {
                boxShadow: [
                  "0 2px 8px rgba(13, 71, 161, 0.08)",
                  "0 3px 10px rgba(13, 71, 161, 0.15)",
                  "0 2px 8px rgba(13, 71, 161, 0.08)",
                ],
                transition: {
                  duration: 1.5,
                  repeat: 2,
                  ease: "easeInOut",
                },
              }
            : {}
        }
      >
        <Paper
          elevation={1} // Reduced elevation for subtlety
          sx={{
            mb: 1.5, // Reduced margin to fit more items
            p: isLargeScreen ? 2 : 1.5, // Responsive padding
            borderRadius: 2, // Less rounded for elegance
            position: "relative",
            overflow: "hidden",
            borderLeft: isProcessing
              ? `5px solid ${theme.palette.warning.main}`
              : `5px solid ${theme.palette.success.main}`,
            backgroundColor: isProcessing ? "rgba(21, 101, 192, 0.03)" : "rgba(46, 125, 50, 0.03)", // Subtler background
            "&:hover": {
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
              transform: "translateY(-1px)", // Subtler hover effect
              transition: "all 0.3s ease-in-out",
            },
          }}
        >
          {/* Order header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.dark, fontSize: isLargeScreen ? "1.25rem" : "1.1rem" }}>
              Orden #{order.id || order._id?.slice(-4)}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTime fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {timeAgo}
              </Typography>
            </Box>
          </Box>

          {/* Customer info */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: isLargeScreen ? "1.1rem" : "1rem" }}>
              {order.fullname}
            </Typography>
            {order.comments && (
              <Badge color="error" variant="dot" sx={{ ml: 1 }}>
                <Comment fontSize="small" color="action" />
              </Badge>
            )}
          </Box>

          <Divider sx={{ mb: 1 }} />

          {/* Order items - optimized for TV display */}
          <Box sx={{ mt: 0.5 }}>
            {order.cart.slice(0, isLargeScreen ? 5 : 3).map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start", // Changed to flex-start for better alignment with descriptions
                  mb: 0.75, // Reduced spacing
                  "&:last-child": { mb: 0 },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, maxWidth: "70%" }}>
                  <Chip
                    size="small"
                    label={item.quantity}
                    color={isProcessing ? "primary" : "success"}
                    sx={{ 
                      minWidth: "28px", 
                      height: "24px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                    }}
                  />
                  <Box>
                    <Typography 
                      variant="body1" 
                      fontWeight={600} 
                      sx={{ 
                        lineHeight: 1.2,
                        fontSize: isLargeScreen ? "1rem" : "0.95rem",
                      }}
                    >
                      {truncateText(item.name, isLargeScreen ? 30 : 20)}
                    </Typography>
                    
                    {/* Description shown directly under the item name for better readability */}
                    {item.Description && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          fontSize: isLargeScreen ? "0.85rem" : "0.8rem",
                          lineHeight: 1.2,
                          mt: 0.25,
                        }}
                      >
                        {truncateText(item.Description, isLargeScreen ? 40 : 30)}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
            
            {/* Show count of additional items if there are more than we display */}
            {order.cart.length > (isLargeScreen ? 5 : 3) && (
              <Typography 
                variant="body2" 
                color="primary" 
                sx={{ 
                  mt: 0.5, 
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
              >
                + {order.cart.length - (isLargeScreen ? 5 : 3)} items más
              </Typography>
            )}
          </Box>

          {/* Order notes - more compact */}
          {order.comments && (
            <Box
              sx={{
                mt: 1,
                p: 1,
                borderRadius: 1,
                backgroundColor: "rgba(198, 40, 40, 0.06)",
                borderLeft: `3px solid ${theme.palette.error.main}`,
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontStyle: "italic", 
                  color: theme.palette.error.main,
                  fontSize: "0.85rem",
                  lineHeight: 1.3,
                }}
              >
                {truncateText(order.comments, isLargeScreen ? 60 : 40)}
              </Typography>
            </Box>
          )}

          {/* Status indicator */}
          {!isProcessing && (
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
              }}
            >
              <CheckCircle color="success" fontSize="small" />
            </Box>
          )}
        </Paper>
      </motion.div>
    </motion.div>
  )
}

// Column header component with animations
const ColumnHeader = ({ title, icon, color, count }: { 
  title: string; 
  icon: React.ReactNode; 
  color: string; 
  count: number 
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5, // Reduced padding
        mb: 2, // Reduced margin
        backgroundColor: "transparent",
        borderBottom: `2px solid ${color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {icon}
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color }}>
          {title}
        </Typography>
      </Box>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }} // More subtle animation
      >
        <Chip
          label={count}
          color={count > 0 ? "primary" : "default"}
          sx={{
            fontWeight: "bold",
            minWidth: "32px",
            height: "28px",
          }}
        />
      </motion.div>
    </Paper>
  )
}

// Main component
const OrdersSpeedPresentation = () => {
  // Redux selectors
  const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
  const user = useSelector((state: RootState) => state.auth)
  const isLargeScreen = useMediaQuery('(min-width:1200px)')
  const isMediumScreen = useMediaQuery('(min-width:900px) and (max-width:1199px)')
  const isSmallScreen = useMediaQuery('(max-width:899px)')

  // State for UI elements
  const [newOrderAlert, setNewOrderAlert] = useState(false)
  const [displayTitle, setDisplayTitle] = useState(true)
  const [highlightProcessing, setHighlightProcessing] = useState(false)
  const [highlightReady, setHighlightReady] = useState(false)
  const [processingCount, setProcessingCount] = useState(0)
  const [readyCount, setReadyCount] = useState(0)

  // Use our custom socket API hook
  const { ordersByStatus, isLoading, error, fetchHistoricalOrders, handleOrderAction, clearMessages } =
  useOrdersManagementSocketApi({
    companyName: data?.companyName,
    userEmail: user?.user?.email,
    statusesToFetch: "processing,finished", // Solo nos interesan estas dos categorías
  })

  // Create a fallback setError function if it doesn't exist in the hook
  const setError = (err: string | null) => {
    console.error("Error:", err);
    // This is a fallback function since setError doesn't exist in the hook
  }

  // Fetch orders on component mount
  useEffect(() => {
    fetchHistoricalOrders()
    const interval = setInterval(fetchHistoricalOrders, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [fetchHistoricalOrders])

  // Process orders for display
  const processingOrders = ordersByStatus.processing || []
  const readyOrders = ordersByStatus.finished || []

  // Show notification when new orders arrive
  useEffect(() => {
    const currentProcessingCount = processingOrders.length
    const currentReadyCount = readyOrders.length

    if (currentProcessingCount > processingCount && !isLoading) {
      setNewOrderAlert(true)
      setHighlightProcessing(true)
      const timer = setTimeout(() => {
        setNewOrderAlert(false)
        setHighlightProcessing(false)
      }, 3000)
      return () => clearTimeout(timer)
    }

    if (currentReadyCount > readyCount && !isLoading) {
      setHighlightReady(true)
      const timer = setTimeout(() => setHighlightReady(false), 3000)
      return () => clearTimeout(timer)
    }

    setProcessingCount(currentProcessingCount)
    setReadyCount(currentReadyCount)
  }, [processingOrders, readyOrders, isLoading, processingCount, readyCount])

  // Title animation effect - more subtle
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTitle((prev) => !prev)
    }, 8000) // Slower transition for elegance
    return () => clearInterval(interval)
  }, [])

  // Handle logout
  const handleLogout = async () => {
    clearLocalhostStorage()
    window.location.reload()
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* App Bar - more compact */}
      <AppBar
        position="static"
        component={motion.div}
        initial={false}
        animate={{
          backgroundColor: theme.palette.primary.main,
        }}
        transition={{ duration: 1 }} // Slower for elegance
        sx={{ height: isSmallScreen ? 'auto' : '56px' }} // Reduced height
      >
        <Toolbar sx={{ minHeight: isSmallScreen ? 'auto' : '56px' }}>
          {/* Logo and Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
              height: "36px", // Reduced height
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Avatar
                sx={{
                  width: 24, // Smaller
                  height: 24, // Smaller
                  flexShrink: 0,
                  ml: 0.5,
                  bgcolor: theme.palette.primary.light,
                }}
              >
                <RoomService fontSize="small" />
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
                  key={displayTitle ? "dashboard-title" : "orders-title"}
                  initial={{ opacity: 0, x: -5 }} // Reduced movement
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }} // Reduced movement
                  transition={{ duration: 0.5 }} // Slower for elegance
                  style={{
                    position: "absolute",
                    left: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.1 }}>
                    {displayTitle ? "Panel de Órdenes" : "Gestión de Cocina"}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <IconButton color="inherit" onClick={handleLogout} size={isSmallScreen ? "small" : "medium"}>
              <Logout fontSize={isSmallScreen ? "small" : "medium"} />
            </IconButton>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* New order notification - more subtle */}
      <AnimatePresence>
        {newOrderAlert && (
          <motion.div
            initial={{ y: -30, opacity: 0 }} // Reduced movement
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }} // Reduced movement
            transition={{ duration: 0.4 }} // Faster
            style={{
              position: "fixed",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1100,
            }}
          >
            <Alert
              severity="info"
              icon={<Notifications />}
              sx={{
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Subtler shadow
                borderRadius: 2,
                fontWeight: 500,
                backgroundColor: theme.palette.primary.main,
                color: "white",
                "& .MuiAlert-icon": {
                  color: "white",
                },
              }}
            >
              ¡Nuevas órdenes recibidas!
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main layout - optimized for TV display */}
      <Container maxWidth={false} disableGutters sx={{ px: isSmallScreen ? 1 : 2, mt: 1 }}>
        <Box
          sx={{
            p: isSmallScreen ? 1 : 2,
            height: "calc(100vh - 80px)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: isSmallScreen ? 1 : 2,
            backgroundColor: theme.palette.background.default,
            overflow: "hidden",
          }}
        >
          {/* Column 1: Orders in Progress */}
          <motion.div
            animate={highlightProcessing ? pulseAnimation : {}}
            style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
          >
            <ColumnHeader
              title="EN PREPARACIÓN"
              icon={<Restaurant sx={{ color: theme.palette.primary.main }} />}
              color={theme.palette.primary.main}
              count={processingOrders.length}
            />

            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
                <CircularProgress size={50} thickness={3} color="primary" /> {/* Smaller loading indicator */}
              </Box>
            ) : error ? (
              <Alert 
                severity="error" 
                onClose={() => {
                  try {
                    setError(null);
                  } catch (e) {
                    console.error("Could not clear error:", e);
                  }
                }} 
                sx={{ mb: 2, borderRadius: 2 }}
              >
                {error}
              </Alert>
            ) : processingOrders.length === 0 ? (
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  flexDirection: "column",
                  gap: 2,
                  p: 4,
                  backgroundColor: "rgba(21, 101, 192, 0.03)", // Subtler background
                  borderRadius: 2, // Less rounded
                  border: "1px dashed rgba(21, 101, 192, 0.2)", // Subtler border
                }}
              >
                <Restaurant sx={{ fontSize: 50, color: "rgba(21, 101, 192, 0.2)" }} /> {/* Smaller icon */}
                <Typography variant="h6" sx={{ textAlign: "center", color: "text.secondary", fontWeight: 500 }}>
                  No hay órdenes en preparación
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  overflowY: "auto",
                  flex: 1,
                  pr: 1,
                  "&::-webkit-scrollbar": {
                    width: "4px", // Thinner scrollbar
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "10px",
                  },
                }}
              >
                <AnimatePresence>
                  {processingOrders.map((order) => (
                    <OrderCard key={order._id} order={order} status="processing" highlightNew={highlightProcessing} />
                  ))}
                </AnimatePresence>
              </Box>
            )}
          </motion.div>

          {/* Column 2: Ready Orders */}
          <motion.div
            animate={highlightReady ? pulseAnimation : {}}
            style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
          >
            <ColumnHeader
              title="LISTAS PARA ENTREGAR"
              icon={<CheckCircle sx={{ color: theme.palette.success.main }} />}
              color={theme.palette.success.main}
              count={readyOrders.length}
            />

            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
                <CircularProgress size={50} thickness={3} color="success" /> {/* Smaller loading indicator */}
              </Box>
            ) : error ? null : readyOrders.length === 0 ? (
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  flexDirection: "column",
                  gap: 2,
                  p: 4,
                  backgroundColor: "rgba(46, 125, 50, 0.03)", // Subtler background
                  borderRadius: 2, // Less rounded
                  border: "1px dashed rgba(46, 125, 50, 0.2)", // Subtler border
                }}
              >
                <CheckCircle sx={{ fontSize: 50, color: "rgba(46, 125, 50, 0.2)" }} /> {/* Smaller icon */}
                <Typography variant="h6" sx={{ textAlign: "center", color: "text.secondary", fontWeight: 500 }}>
                  No hay órdenes listas
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  overflowY: "auto",
                  flex: 1,
                  pr: 1,
                  "&::-webkit-scrollbar": {
                    width: "4px", // Thinner scrollbar
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "10px",
                  },
                }}
              >
                <AnimatePresence>
                  {readyOrders.map((order) => (
                    <OrderCard key={order._id} order={order} status="finished" highlightNew={highlightReady} />
                  ))}
                </AnimatePresence>
              </Box>
            )}
          </motion.div>
        </Box>
      </Container>

      {/* Footer - more compact */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 10 }} // Reduced movement
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }} // Slower for elegance
        sx={{
          p: 1.5, // Reduced padding
          backgroundColor: theme.palette.primary.dark,
          color: "white",
          textAlign: "center",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        <Typography variant="body2">
          {data?.companyName || "Restaurant"} - Panel de Gestión de Órdenes © {new Date().getFullYear()}
        </Typography>
      </Box>
    </ThemeProvider>
  )
}

export default OrdersSpeedPresentation
