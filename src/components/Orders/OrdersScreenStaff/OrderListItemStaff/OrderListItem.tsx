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





const OrderListItem = ({
    order,
    onOrderAction,
    statusConfig
}: { order: Order & { statusPriority?: number }; onOrderAction: OrdersScreenStaffProps["onOrderAction"], statusConfig: any }) => {
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
                    {config.actions.map((action: any) => (
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

export default OrderListItem