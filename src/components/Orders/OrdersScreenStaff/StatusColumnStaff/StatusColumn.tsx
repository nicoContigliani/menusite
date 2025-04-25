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
import OrderItem from '../OrderItemStaff/OrderItem'

const StatusColumn = (props: any) => {
    const { status, orders, onOrderAction,statusConfig } = props
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
                borderTop: 5,
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
                    {orders.map((order:any) => (
                        <OrderItem key={order._id} order={order} status={status} onOrderAction={onOrderAction} statusConfig={statusConfig} />
                    ))}
                </List>
            </Box>
        </Paper>
    )
}

export default StatusColumn
