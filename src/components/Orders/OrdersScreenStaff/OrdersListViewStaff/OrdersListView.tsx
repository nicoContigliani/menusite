// import React from 'react'

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
//   Divider,
//   Button,
//   Grid,
//   Paper,
//   Stack,
//   Badge,
//   useTheme,
//   useMediaQuery,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   DialogActions,
// } from "@mui/material"
// import {
//   AccessTime,
//   CheckCircle,
//   Cancel,
//   LocalShipping,
//   Pending,
//   PlayArrow,
//   Pause,
//   LocalDining,
//   Person,
//   ExpandMore,
//   ShoppingCart,
// } from "@mui/icons-material"
// import OrderListItem from '../OrderListItemStaff/OrderListItem'



// interface OrderItem {
//   id: string
//   itemId: number
//   name: string
//   price: number
//   quantity: number
//   extras?: Array<{
//     name: string
//     price: number
//   }>
//   extrasTotal?: number
//   Description: string
//   comments?: any
// }

// interface Order {
//   _id: string
//   id: string
//   orderType: string
//   dataTypeOrder: string
//   cart: OrderItem[]
//   fullname: string
//   timestamp: string
//   createdAt: string
//   status: "pending" | "processing" | "paused" | "finished" | "cancelled" | "delivered"
//   [key: string]: any
// }

// interface OrdersByStatus {
//   pending?: Order[]
//   processing?: Order[]
//   paused?: Order[]
//   finished?: Order[]
//   cancelled?: Order[]
//   delivered?: Order[]
// }

// interface OrdersScreenStaffProps {
//   ordersByStatus: OrdersByStatus
//   onOrderAction: (action: string, order: Order) => void | Promise<void>
//   viewMode?: "column" | "list",
//   handleOrderUpdateAction?: (action: string, order: Order) => void | Promise<void>
//   statusConfig?: any

// }



// const OrdersListView = ({ ordersByStatus, onOrderAction,statusConfig }: OrdersScreenStaffProps) => {
//     const theme = useTheme()
  
//     // Combine all orders and sort by status priority
//     const statusPriority = {
//       pending: 1,
//       processing: 2,
//       paused: 3,
//       finished: 4,
//       delivered: 5,
//       cancelled: 6,
//     }
  
//     const allOrders = Object.entries(ordersByStatus)
//       .flatMap(([status, orders]) =>
//         (orders || []).map((order: any) => ({
//           ...order,
//           statusPriority: statusPriority[status as keyof typeof statusPriority] || 99,
//         })),
//       )
//       .sort(
//         (a, b) =>
//           a.statusPriority - b.statusPriority || new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
//       )
  
//     if (allOrders.length === 0) {
//       return (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100%",
//             height: "100%",
//             p: 4,
//           }}
//         >
//           <Typography variant="body1" color="text.secondary">
//             No hay órdenes para mostrar
//           </Typography>
//         </Box>
//       )
//     }
  
//     return (
//       <List sx={{ width: "100%", p: 0, overflow: "auto" }}>
//         {allOrders.map((order) => (
//           <OrderListItem key={order._id} order={order} onOrderAction={onOrderAction} statusConfig={statusConfig} />
//         ))}
//       </List>
//     )
//   }

// export default OrdersListView


import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Button,
  Grid,
  Paper,
  Stack,
  Badge,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material"
import {
  AccessTime,
  CheckCircle,
  Cancel,
  LocalShipping,
  Pending,
  PlayArrow,
  Pause,
  LocalDining,
  Person,
  ExpandMore,
  ShoppingCart,
  Search,
  Clear,
} from "@mui/icons-material"
import OrderListItem from '../OrderListItemStaff/OrderListItem'

interface OrderItem {
  id: string
  itemId: number
  name: string
  price: number
  quantity: number
  extras?: Array<{
    name: string
    price: number
  }>
  extrasTotal?: number
  Description: string
  comments?: any
}

interface Order {
  _id: string
  id: string
  orderType: string
  dataTypeOrder: string
  cart: OrderItem[]
  fullname: string
  timestamp: string
  createdAt: string
  status: "pending" | "processing" | "paused" | "finished" | "cancelled" | "delivered"
  [key: string]: any
}

interface OrdersByStatus {
  pending?: Order[]
  processing?: Order[]
  paused?: Order[]
  finished?: Order[]
  cancelled?: Order[]
  delivered?: Order[]
}

interface OrdersScreenStaffProps {
  ordersByStatus: OrdersByStatus
  onOrderAction: (action: string, order: Order) => void | Promise<void>
  viewMode?: "column" | "list",
  handleOrderUpdateAction?: (action: string, order: Order) => void | Promise<void>
  statusConfig?: any
}

const OrdersListView = ({ ordersByStatus, onOrderAction, statusConfig }: OrdersScreenStaffProps) => {
  const theme = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  // Combine all orders and sort by status priority
  const statusPriority = {
    pending: 1,
    processing: 2,
    paused: 3,
    finished: 4,
    delivered: 5,
    cancelled: 6,
  }

  // Filter and sort all orders
  const allOrders = Object.entries(ordersByStatus)
    .flatMap(([status, orders]) =>
      (orders || []).map((order: any) => ({
        ...order,
        statusPriority: statusPriority[status as keyof typeof statusPriority] || 99,
      })),
    )
    .filter((order) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.dataTypeOrder?.toLowerCase().includes(searchLower) ||
        order.fullname?.toLowerCase().includes(searchLower) ||
        order.comments?.toLowerCase().includes(searchLower)
      )
    })
    .sort(
      (a, b) =>
        a.statusPriority - b.statusPriority || new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )

  // Pagination
  const totalPages = Math.ceil(allOrders.length / itemsPerPage)
  const paginatedOrders = allOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setPage(1) // Reset to first page when searching
  }

  const clearSearch = () => {
    setSearchTerm('')
    setPage(1)
  }

  if (allOrders.length === 0 && !searchTerm) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          p: 4,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No hay órdenes para mostrar
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Search Bar */}
      <Box sx={{ p: 2, pb: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Buscar orden..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <IconButton
                size="small"
                onClick={clearSearch}
                edge="end"
              >
                <Clear fontSize="small" />
              </IconButton>
            ),
          }}
        />
      </Box>

      {/* Orders List */}
      <List sx={{ width: "100%", p: 0, overflow: "auto", flexGrow: 1 }}>
        {paginatedOrders.length > 0 ? (
          paginatedOrders.map((order) => (
            <OrderListItem key={order._id} order={order} onOrderAction={onOrderAction} statusConfig={statusConfig} />
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              p: 4,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No se encontraron órdenes
            </Typography>
          </Box>
        )}
      </List>

      {/* Pagination Controls */}
      {allOrders.length > itemsPerPage && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          p: 1,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}>
          <Button 
            size="small" 
            onClick={handlePrevPage} 
            disabled={page === 1}
          >
            Anterior
          </Button>
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Página {page} de {totalPages}
          </Typography>
          <Button 
            size="small" 
            onClick={handleNextPage} 
            disabled={page === totalPages}
          >
            Siguiente
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default OrdersListView