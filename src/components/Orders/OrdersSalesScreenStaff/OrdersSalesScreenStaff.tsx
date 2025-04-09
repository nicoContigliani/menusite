"use client"
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

interface OrdersSalesScreenStaffProps {
  ordersByStatus: OrdersByStatus
  onOrderAction: (action: string, order: Order) => void | Promise<void>
  viewMode?: "column" | "list"
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

const OrdersSalesScreenStaff = ({ ordersByStatus, onOrderAction, viewMode = "column" }: OrdersSalesScreenStaffProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  // Filter out empty status categories
  const activeStatuses = Object.entries(ordersByStatus)
    .filter(([_, orders]) => orders && orders.length > 0)
    .map(([status]) => status as keyof typeof statusConfig)

  // Render list view for mobile
  if (viewMode === "list") {
    return <OrdersListView ordersByStatus={ordersByStatus} onOrderAction={onOrderAction} />
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
                  <StatusColumn status={status} orders={ordersByStatus[status] || []} onOrderAction={onOrderAction} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Grid>
    </Box>
  )
}

// List view for mobile
const OrdersListView = ({ ordersByStatus, onOrderAction }: OrdersSalesScreenStaffProps) => {
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
        <OrderListItem key={order._id} order={order} onOrderAction={onOrderAction} />
      ))}
    </List>
  )
}

// List item for mobile view
const OrderListItem = ({
  order,
  onOrderAction,
}: { order: Order & { statusPriority?: number }; onOrderAction: OrdersSalesScreenStaffProps["onOrderAction"] }) => {
  const theme = useTheme()
  const status = order.status.toLowerCase() as keyof typeof statusConfig
  const config = statusConfig[status]

  const totalItems = order.cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = order.cart.reduce((sum, item) => {
    const extrasTotal = item.extras?.reduce((eSum, extra) => eSum + extra.price, 0) || 0
    return sum + item.price * item.quantity + extrasTotal
  }, 0)

  const formattedTime = new Date(order.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Accordion
      disableGutters
      elevation={1}
      sx={{
        mb: 1,
        "&:before": { display: "none" },
        borderLeft: 3,
        borderColor: `${status === "pending"
            ? "warning.main"
            : status === "processing"
              ? "info.main"
              : status === "paused"
                ? "text.disabled"
                : status === "finished"
                  ? "success.main"
                  : status === "delivered"
                    ? "secondary.main"
                    : "error.main"
          }`,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{
          minHeight: 56,
          px: 2,
          py: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>{config.icon}</Box>

          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle2" fontWeight="bold">
                #{order.id}
              </Typography>
              <Chip
                size="small"
                label={order.orderType}
                color={config.color === "default" ? "default" : (config.color as any)}
                sx={{ height: 20, fontSize: "0.7rem" }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7, fontSize: "0.9rem" }} />
              <Typography variant="body2" noWrap sx={{ maxWidth: "120px", fontSize: "0.8rem" }}>
                {order.fullname}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2, py: 1 }}>
        <Box sx={{ mb: 1 }}>
          <Typography variant="caption" display="block" color="text.secondary">
            <AccessTime fontSize="inherit" sx={{ mr: 0.5, verticalAlign: "text-bottom" }} />
            {formattedTime}
          </Typography>

          <Typography variant="caption" display="block" color="text.secondary">
            <ShoppingCart fontSize="inherit" sx={{ mr: 0.5, verticalAlign: "text-bottom" }} />
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </Typography>
        </Box>

        <List dense disablePadding sx={{ mb: 1 }}>
          {order.cart.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ py: 0.25 }}>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                      <strong>{item.quantity}x</strong> {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.8rem", ml: 1, flexShrink: 0 }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                }
                secondary={
                  item.extras && item.extras.length > 0 ? (
                    <List dense disablePadding sx={{ ml: 2 }}>
                      {item.extras.map((extra, idx) => (
                        <ListItem key={idx} disablePadding sx={{ py: 0 }}>
                          <ListItemText
                            primary={
                              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="caption">+ {extra.name}</Typography>
                                <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : null
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          {config.actions.map((action) => (
            <Button
              key={action.action}
              size="small"
              variant="contained"
              color={action.color as any}
              startIcon={action.icon}
              onClick={() => onOrderAction(action.action, order)}
              sx={{
                py: 0.5,
                fontSize: "0.7rem",
              }}
            >
              {action.label}
            </Button>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}

interface StatusColumnProps {
  status: keyof typeof statusConfig
  orders: Order[]
  onOrderAction: (action: string, order: Order) => void | Promise<void>
}

const StatusColumn = ({ status, orders, onOrderAction }: StatusColumnProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const config = statusConfig[status]

  return (
    <Paper
      elevation={2}
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        borderTop: 3,
        borderColor: `${status === "pending"
            ? "warning.main"
            : status === "processing"
              ? "info.main"
              : status === "paused"
                ? "text.disabled"
                : status === "finished"
                  ? "success.main"
                  : status === "delivered"
                    ? "secondary.main"
                    : "error.main"
          }`,
      }}
    >
      <Box
        sx={{
          p: 1.5,
          bgcolor: "background.paper",
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {config.icon}
        <Typography variant="subtitle1" sx={{ ml: 1, flexGrow: 1, fontWeight: 500 }}>
          {config.label}
        </Typography>
        <Badge
          badgeContent={orders.length}
          color={config.color === "default" ? "default" : (config.color as any)}
          showZero
        />
      </Box>

      <Box
        sx={{
          overflow: "auto",
          flexGrow: 1,
          maxHeight: { xs: "calc(100vh - 180px)", md: "calc(100vh - 220px)" },
        }}
      >
        <List disablePadding>
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} status={status} onOrderAction={onOrderAction} />
          ))}
        </List>
      </Box>
    </Paper>
  )
}

interface OrderItemProps {
  order: Order
  status: keyof typeof statusConfig
  onOrderAction: (action: string, order: Order) => void | Promise<void>
}

const OrderItem = ({ order, status, onOrderAction }: OrderItemProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const config = statusConfig[status]
  const totalItems = order.cart.reduce((sum, item) => sum + item.quantity, 0)

  const total = order.cart.reduce((sum, item) => {
    const extrasTotal = item.extras?.reduce((eSum, extra) => eSum + extra.price, 0) || 0
    return sum + item.price * item.quantity + extrasTotal
  }, 0)

  const formattedTime = new Date(order.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <>
      <ListItem alignItems="flex-start" sx={{ p: 1 }}>
        <Card sx={{ width: "100%" }}>
          <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                #{order.id}
              </Typography>
              <Chip
                size="small"
                label={order.orderType}
                color={config.color === "default" ? "default" : (config.color as any)}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7, fontSize: "1rem" }} />
              <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
                {order.fullname}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7, fontSize: "1rem" }} />
              <Typography variant="body2">{formattedTime}</Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle2" sx={{ mb: 0.5, fontSize: "0.8rem" }}>
              Items ({totalItems})
            </Typography>

            <List dense disablePadding>
              {order.cart.map((item) => (
                <ListItem key={item.id} disablePadding sx={{ py: 0.25 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                          <strong>{item.quantity}x</strong> {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "0.8rem", ml: 1, flexShrink: 0 }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      item.extras && item.extras.length > 0 ? (
                        <List dense disablePadding sx={{ ml: 2 }}>
                          {item.extras.map((extra, idx) => (
                            <ListItem key={idx} disablePadding sx={{ py: 0 }}>
                              <ListItemText
                                primary={
                                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="caption">+ {extra.name}</Typography>
                                    <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      ) : null
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: isMobile ? 1 : 0 }}>
                Total: ${total.toFixed(2)}
              </Typography>

              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  width: isMobile ? "100%" : "auto",
                  justifyContent: isMobile ? "space-between" : "flex-end",
                }}
              >
                {config.actions.map((action) => (
                  <Button
                    key={action.action}
                    size="small"
                    variant="contained"
                    color={action.color as any}
                    startIcon={!isMobile && action.icon}
                    onClick={() => onOrderAction(action.action, order)}
                    sx={{
                      minWidth: 0,
                      px: { xs: 1, sm: 1.5 },
                      py: 0.5,
                      fontSize: "0.7rem",
                    }}
                  >
                    {isMobile ? action.icon : action.label}
                  </Button>
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </ListItem>
      <Divider />
    </>
  )
}

export default OrdersSalesScreenStaff

