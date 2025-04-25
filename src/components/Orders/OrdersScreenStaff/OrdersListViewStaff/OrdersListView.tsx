import React from 'react'

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



const OrdersListView = ({ ordersByStatus, onOrderAction,statusConfig }: OrdersScreenStaffProps) => {
    const theme = useTheme()
  
    // Combine all orders and sort by status priority
    const statusPriority = {
      pending: 1,
      processing: 2,
      paused: 3,
      finished: 4,
      delivered: 5,
      cancelled: 6,
    }
  
    const allOrders = Object.entries(ordersByStatus)
      .flatMap(([status, orders]) =>
        (orders || []).map((order: any) => ({
          ...order,
          statusPriority: statusPriority[status as keyof typeof statusPriority] || 99,
        })),
      )
      .sort(
        (a, b) =>
          a.statusPriority - b.statusPriority || new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
  
    if (allOrders.length === 0) {
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
      <List sx={{ width: "100%", p: 0, overflow: "auto" }}>
        {allOrders.map((order) => (
          <OrderListItem key={order._id} order={order} onOrderAction={onOrderAction} statusConfig={statusConfig} />
        ))}
      </List>
    )
  }

export default OrdersListView