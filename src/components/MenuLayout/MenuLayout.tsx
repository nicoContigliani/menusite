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
    Link,
    Divider,
} from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { Refresh, ExpandMore, ExpandLess, ViewList, ViewColumn, LinkedIn, Email, Phone, WhatsApp } from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import OrdersScreenStaff from "../Orders/OrdersScreenStaff/OrdersScreenStaff"
import { useOrdersManagement } from "../../../hooks/useOrdersManagement"
import { clearLocalhostStorage } from "@/services/localstorage.services"
import { recordAttendance } from "@/services/attendance.services"

const MenuLayout = (props: any) => {
    const { children } = props
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

    const handleLogout = async () => {
        clearLocalhostStorage();
        await recordAttendance('getOut', user?.user?.email, data?.companyName);
        window.location.reload();
    };


    return (
        <div

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
                                    key={displayTitle ? "LlakaScript" : "Admin de panel de ordenes"}
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
                                        {displayTitle ? "LlakaScript" : "Menu"}
                                    </Typography>
                                </motion.div>
                            </AnimatePresence>
                        </Box>
                    </Box>

                    {/* Right side controls */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>

                        <Tooltip title="Salir">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <IconButton
                                    size="small"
                                    onClick={() => handleLogout}
                                    color="default"
                                >
                                    <LogoutIcon fontSize="small" />
                                </IconButton>
                            </motion.div>
                        </Tooltip>
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

                    {/* Main content - takes all available space */}
                    <Box
                        sx={{
                            flex: 1,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {children}
                    </Box>
                </Paper>
            </Box>
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
                <Toolbar variant="dense" sx={{
                    minHeight: isMobile ? 43 : 56,
                    justifyContent: isMobile ? 'flex-start' : 'center' // Cambia la alineación según dispositivo
                }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexGrow: isMobile ? 1 : 0, // Solo ocupa todo el espacio en mobile
                            height: "80px",
                            position: "relative",
                            overflow: "hidden",
                            maxWidth: isMobile ? '100%' : 'fit-content' // Ajuste para desktop
                        }}
                    >
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Avatar
                                sx={{
                                    width: 38,
                                    height: 38,
                                    flexShrink: 0,
                                    ml: isMobile ? 0.5 : 0 // Ajuste del margen izquierdo
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
                                flexGrow: isMobile ? 1 : 0 // Solo crece en mobile
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={displayTitle ? "title" : "contact-info"}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        position: isMobile ? "absolute" : "relative", // Cambia según dispositivo
                                        left: 0,
                                        whiteSpace: "nowrap",
                                        width: '100%'
                                    }}
                                >
                                    {displayTitle ? (
                                        <Typography
                                            variant={isMobile ? "subtitle1" : "h6"}
                                            sx={{
                                                fontWeight: 600,
                                                lineHeight: 1.1,
                                                fontSize: isMobile ? "1rem" : '1.25rem',
                                                textAlign: isMobile ? 'left' : 'center'
                                            }}
                                        >
                                            LlakaScript
                                        </Typography>
                                    ) : (
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 1,
                                            width: '100%'
                                        }}>
                                            {/* Primera fila - Ahora responsive */}
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: isMobile ? 'row' : 'row',
                                                gap: isMobile ? 2 : 4, // Más espacio en desktop
                                                mb: 0,
                                                mt: isMobile ? 0 : 0,
                                                justifyContent: 'center',
                                                width: '100%'
                                            }}>
                                                {/* LinkedIn */}
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5
                                                }}>
                                                    <LinkedIn fontSize="small" />
                                                    <Link
                                                        href="https://www.linkedin.com/in/nicolas-contigliani/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{
                                                            color: 'text.primary',
                                                            textDecoration: 'none',
                                                            fontSize: isMobile ? '0.75rem' : '0.85rem',
                                                            '&:hover': { textDecoration: 'underline' },
                                                        }}
                                                    >
                                                        nicolas-contigliani
                                                    </Link>
                                                </Box>

                                                {/* Email */}
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5
                                                }}>
                                                    <Email fontSize="small" />
                                                    <Link
                                                        href="mailto:nico.contigliani@gmail.com"
                                                        sx={{
                                                            color: 'text.primary',
                                                            textDecoration: 'none',
                                                            fontSize: isMobile ? '0.75rem' : '0.85rem',
                                                            '&:hover': { textDecoration: 'underline' },
                                                        }}
                                                    >
                                                        nico.contigliani@gmail.com
                                                    </Link>
                                                </Box>
                                            </Box>

                                            {/* Divider - Mejorado para desktop */}
                                            {/* <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                my: 1,
                                                justifyContent: 'center',
                                                width: isMobile ? '50%' : '90%'
                                            }}>
                                                <Divider sx={{
                                                    width: '100%',
                                                    borderColor: 'divider',
                                                    '&:before, &:after': {
                                                        content: '""',
                                                        flex: 1,
                                                        borderBottom: '1px solid',
                                                        borderColor: 'divider',
                                                    }
                                                }} />
                                            </Box> */}

                                            {/* Segunda fila - Responsive */}
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: isMobile ? 'row' : 'row',
                                                gap: isMobile ? 2 : 4,
                                                mt: 1,
                                                justifyContent: 'center',
                                                width: '100%'
                                            }}>
                                                {/* Teléfono */}
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5
                                                }}>
                                                    <Phone fontSize="small" />
                                                    <Typography sx={{
                                                        fontSize: isMobile ? '0.75rem' : '0.85rem'
                                                    }}>
                                                        +54 9 11 1234-5678
                                                    </Typography>
                                                </Box>

                                                {/* WhatsApp */}
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5
                                                }}>
                                                    <WhatsApp fontSize="small" />
                                                    <Link
                                                        href="https://wa.me/5491112345678"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{
                                                            color: 'text.primary',
                                                            textDecoration: 'none',
                                                            fontSize: isMobile ? '0.75rem' : '0.85rem',
                                                            '&:hover': { textDecoration: 'underline' },
                                                        }}
                                                    >
                                                        Enviar mensaje
                                                    </Link>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default MenuLayout;

