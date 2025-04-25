"use client"
import { useEffect, useState } from "react"

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

import OrderItem from "./OrderItemStaff/OrderItem";
import StatusColumn from "./StatusColumnStaff/StatusColumn";
import OrdersListView from "./OrdersListViewStaff/OrdersListView";

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

}

interface StatusColumnProps {
  status: keyof typeof statusConfig
  orders: Order[]
  onOrderAction: (action: string, order: Order) => void | Promise<void>
}

interface OrderItemProps {
  order: Order
  status: keyof typeof statusConfig
  onOrderAction: (action: string, order: Order) => void | Promise<void>
}

const statusConfig = {
  pending: {
    color: "warning",
    icon: <Pending />,
    label: "Pendientes",
    actions: [{ action: "start", label: "Tomar orden", color: "info", icon: <PlayArrow /> }],
  },
  processing: {
    color: "info",
    icon: <LocalDining />,
    label: "En Proceso",
    actions: [
      { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
      { action: "complete", label: "Completar", color: "success", icon: <CheckCircle /> },
      { action: "cancel", label: "Cancelar", color: "error", icon: <Cancel /> },
    ],
  },
  paused: {
    color: "default",
    icon: <Pause />,
    label: "Pausadas",
    actions: [
      { action: "resume", label: "Continuar", color: "info", icon: <PlayArrow /> },
      { action: "complete", label: "Completar", color: "success", icon: <CheckCircle /> },
      { action: "cancel", label: "Cancelar", color: "error", icon: <Cancel /> },
    ],
  },
  finished: {
    color: "success",
    icon: <CheckCircle />,
    label: "Completadas",
    actions: [{ action: "deliver", label: "Entregar", color: "secondary", icon: <LocalShipping /> }],
  },
  delivered: {
    color: "secondary",
    icon: <LocalShipping />,
    label: "Entregadas",
    actions: [],
  },
  cancelled: {
    color: "error",
    icon: <Cancel />,
    label: "Canceladas",
    actions: [],
  },
}

const OrdersScreenStaff = ({ ordersByStatus, onOrderAction, viewMode = "column", handleOrderUpdateAction }: OrdersScreenStaffProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  // Filter out empty status categories
  const activeStatuses = Object.entries(ordersByStatus)
    .filter(([_, orders]) => orders && orders.length > 0)
    .map(([status]) => status as keyof typeof statusConfig)

  // Render list view for mobile
  if (viewMode === "list") {
    return <OrdersListView ordersByStatus={ordersByStatus} onOrderAction={onOrderAction} statusConfig={statusConfig} />
  }

  // Render column view (default)
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          p: { xs: 0.5, sm: 1 },
          height: "100%",
          overflow: "hidden",
          flexWrap: { xs: "nowrap", md: "wrap" },
        }}
      >
        {activeStatuses.length === 0 ? (
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
        ) : (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              overflow: "auto",
              flexDirection: { xs: "row", md: "column" },
            }}
          >

            <Grid
              container
              spacing={1}
              sx={{
                flexWrap: { xs: "nowrap", md: "wrap" },
                overflow: "visible",
                width: { xs: `${activeStatuses.length * 90}%`, md: "100%" },
                minWidth: { xs: `${activeStatuses.length * 280}px`, md: "auto" },
              }}
            >
              {activeStatuses.map((status) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  key={status}
                  sx={{
                    height: { xs: "100%", md: "auto" },
                    minWidth: { xs: "280px", md: "auto" },
                  }}
                >
                  <StatusColumn status={status} statusConfig={statusConfig} orders={ordersByStatus[status] || []} onOrderAction={onOrderAction} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Grid>
    </Box>
  )
}




export default OrdersScreenStaff

