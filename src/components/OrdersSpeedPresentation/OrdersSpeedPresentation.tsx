// "use client"

// import React, { useEffect, useState, useMemo } from "react"
// import { useSelector } from "react-redux"
// import { RootState } from "../../../store/store"
// import styles from './OrdersSpeedPresentation.module.css'
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   Typography
// } from "@mui/material"
// import { motion, AnimatePresence } from "framer-motion"
// import { Refresh } from "@mui/icons-material"
// import { useOrderUpdates } from "../../../hooks/useOrderUpdates"
// import OrdersScreen from "../Orders/OrdersScreen/OrdersScreen"
// import useSocketChat from "../../../hooks/useSocket"

// interface Order {
//   _id: string
//   id: string
//   orderType: string
//   dataTypeOrder: string
//   cart: Array<{
//     id: string
//     itemId: number
//     name: string
//     price: number
//     quantity: number
//     extras?: Array<{
//       name: string
//       price: number
//     }>
//     extrasTotal?: number
//     Description: string
//   }>
//   fullname: string
//   timestamp: string
//   createdAt: string
//   status: "pending" | "processing" | "paused" | "finished" | "cancelled" | "delivered"
//   [key: string]: any
// }

// const OrdersSpeedPresentation = () => {
//   // Redux selectors
//   const { data } = useSelector(
//     (state: RootState) => state.chExcelData as unknown as { data: any }
//   )
//   const user = useSelector((state: RootState) => state.auth)

//   // State management
//   const [historicalOrders, setHistoricalOrders] = useState<Order[]>([])
//   const [isLoadingHistory, setIsLoadingHistory] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
//   const [ordersByStatus, setOrdersByStatus] = useState<{
//     pending?: Order[]
//     processing?: Order[]
//     paused?: Order[]
//     finished?: Order[]
//     cancelled?: Order[]
//     delivered?: Order[]
//   }>({})

//   // Custom hooks
//   const {
//     updateOrderStatus,
//     isUpdating,
//     updateError,
//     successMessage,
//     clearMessages,
//     setUpdateError
//   } = useOrderUpdates()

//   const {
//     name,
//     setName,
//     room,
//     setRoom,
//     parsedMessages,
//     isConnected,
//     reconnectAttempts,
//     joinRoom
//   } = useSocketChat('https://socketserver-t4g9.onrender.com')

//   // Fetch historical orders
//   const fetchHistoricalOrders = async () => {
//     if (!data?.companyName) return

//     setIsLoadingHistory(true)
//     setError(null)

//     try {
//       const params = new URLSearchParams({
//         status: 'processing,finished,cancelled,delivered',
//         sort: 'desc',
//         limit: '50',
//         company: data.companyName
//       })

//       const res = await fetch(`/api/orders?${params}`)
//       if (!res.ok) throw new Error(`Error: ${res.status}`)

//       const orders = await res.json()
//       setHistoricalOrders(Array.isArray(orders) ? orders : [])
//       setLastRefresh(new Date())
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Error desconocido')
//       console.error("Error fetching historical orders:", err)
//     } finally {
//       setIsLoadingHistory(false)
//     }
//   }

//   // Process and group orders by status
//   useEffect(() => {
//     const socketOrders = Array.isArray(parsedMessages) ? parsedMessages : []
//     const allOrders = [...historicalOrders, ...socketOrders]

//     // Remove duplicates by ID
//     const uniqueOrders = allOrders.reduce((acc: Order[], current: Order) => {
//       if (!acc.some(item => item._id === current._id)) {
//         acc.push(current)
//       }
//       return acc
//     }, [])

//     // Group by status
//     const groupedOrders = uniqueOrders.reduce((acc:any, order:any) => {
//       const status = order.status.toLowerCase()
//       if (!acc[status]) {
//         acc[status] = []
//       }
//       acc[status].push(order)
//       return acc
//     }, {} as Record<string, Order[]>)

//     setOrdersByStatus(groupedOrders)
//   }, [historicalOrders, parsedMessages])

//   // Handle order actions
//   const handleOrderAction = async (action: string, order: Order) => {
//     try {
//       let newStatus: Order['status'] = order.status

//       switch (action) {
//         case 'start': newStatus = 'processing'; break
//         case 'pause': newStatus = 'paused'; break
//         case 'resume': newStatus = 'processing'; break
//         case 'complete': newStatus = 'finished'; break
//         case 'deliver': newStatus = 'delivered'; break
//         case 'cancel': newStatus = 'cancelled'; break
//         case 'reopen': newStatus = 'pending'; break
//         default: return
//       }

//       await updateOrderStatus(order._id, newStatus)

//       // Update local state
//       setHistoricalOrders(prev => prev.map(o =>
//         o._id === order._id ? { ...o, status: newStatus } : o
//       ))
//     } catch (error) {
//       console.error("Error handling order action:", error)
//     }
//   }

//   // Initial setup
//   useEffect(() => {
//     if (user) setName(user?.user?.email || '')
//     if (data) {
//       setRoom(`kichent-${data?.companyName}` || '')
//       fetchHistoricalOrders()
//     }
//   }, [user, data, setName, setRoom])

//   return (
//     <div className={styles.ordersContainer}>
//       <video autoPlay muted loop playsInline className={styles.heroVideo}>
//         <source src="/videos/menu.mp4" type="video/mp4" />
//         Your browser does not support videos.
//       </video>

//       <Box sx={{ pb: 7 }}>
//         <Box sx={{ textAlign: "center", p: 1 }}>
//           {/* Refresh Controls */}
//           <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
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
//                 {isUpdating ? "Actualizando orden..." : "Cargando historial de órdenes..."}
//               </Typography>
//             </Box>
//           )}

//           {/* Orders Screen Component */}
//           <OrdersScreen 
//             ordersByStatus={ordersByStatus} 
//             onOrderAction={handleOrderAction}
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
//   )
// }

// export default OrdersSpeedPresentation



"use client"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import styles from "./OrdersSpeedPresentation.module.css"
import { Box, Button, CircularProgress, Alert, Snackbar, Typography } from "@mui/material"
import { Refresh } from "@mui/icons-material"
import OrdersScreen from "../Orders/OrdersScreen/OrdersScreen"
import { useOrdersManagement } from "../../../hooks/useOrdersManagement"

const OrdersSpeedPresentation = () => {
  // Redux selectors
  const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
  const user = useSelector((state: RootState) => state.auth)

  // Use our custom hook - all the logic is now in the hook
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

  return (
    <div className={styles.ordersContainer}>
      <video autoPlay muted loop playsInline className={styles.heroVideo}>
        <source src="/videos/menu.mp4" type="video/mp4" />
        Your browser does not support videos.
      </video>

      <Box sx={{ pb: 7 }}>
        <Box sx={{ textAlign: "center", p: 1 }}>
          {/* Refresh Controls */}
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
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

          {/* Error Handling */}
          {error && (
            <Alert severity="error" sx={{ maxWidth: 600, mx: "auto", mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {updateError && (
            <Alert severity="error" sx={{ maxWidth: 600, mx: "auto", mb: 2 }} onClose={() => setUpdateError(null)}>
              {updateError}
            </Alert>
          )}

          {/* Loading Indicators */}
          {(isLoadingHistory || isUpdating) && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress size={24} />
              <Typography variant="body2" ml={2}>
                {isUpdating ? "Actualizando orden..." : "Cargando historial de órdenes..."}
              </Typography>
            </Box>
          )}

          {/* Orders Screen Component */}
          <OrdersScreen ordersByStatus={ordersByStatus} onOrderAction={handleOrderAction} />
        </Box>

        {/* Success Notification */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={clearMessages}
          message={successMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        />
      </Box>
    </div>
  )
}

export default OrdersSpeedPresentation

