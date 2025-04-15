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
  Badge,
  Avatar,
  AppBar,
  Toolbar,
  TextField,
  MenuItem,
  Chip,
  Button,
  InputAdornment,
  Collapse
} from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';

import { Refresh, ExpandMore, ExpandLess, ViewList, ViewColumn, Search, FilterAlt, Clear } from "@mui/icons-material"
import { motion, AnimatePresence, useAnimationControls, LayoutGroup } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useOrdersManagement } from "../../../hooks/useOrdersManagement"

import OrdersSalesScreenStaffNew from "../Orders/OrdersSalesScreenStaff/OrdersSalesScreenStaffNew"
import { clearLocalhostStorage } from "@/services/localstorage.services"
import { recordAttendance } from "@/services/attendance.services"

// Definición de tipos
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  extras?: Array<{
    name: string;
    price: number;
  }>;
}

interface Order {
  _id: string;
  id: string;
  fullname: string;
  status: 'finished' | 'processing';
  orderType: string;
  dataTypeOrder: string;
  comments?: string;
  cart: OrderItem[];
  email?: string;
  phone?: string;
}

// Animaciones actualizadas
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.17, 0.67, 0.83, 0.67]
    }
  }
}

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const popIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
      delay: 0.15
    }
  }
}

const rotateRefresh = {
  rotate: 360,
  transition: {
    duration: 0.8,
    repeat: Infinity,
    ease: "linear"
  }
}

const OrdersSaleStaff = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const controls = useAnimationControls()

  const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
  const [displayTitle, setDisplayTitle] = useState(false)
  const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column")
  const [filteredOrders, setFilteredOrders] = useState<Record<string, Order[]>>({})
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(!isMobile)

  // Selectores de Redux
  const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
  const user = useSelector((state: RootState) => state.auth)

  // Hook personalizado para gestión de órdenes
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

  // Efecto para animación de título
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTitle(prev => !prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Efecto para filtrar órdenes
  useEffect(() => {
    const fetchAndFilterOrders = async () => {
      try {
        const today = new Date()
        const startTime = new Date(today)
        startTime.setHours(9, 0, 0, 0)
        const endTime = new Date(today)
        endTime.setHours(23, 0, 0, 0)

        const res = await fetch(
          `/api/payments?companyId=${data?._id}&dateFrom=${startTime.toISOString()}&dateTo=${endTime.toISOString()}&onlyOrderIds=true`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        )

        const paidOrderIds = await res.json()

        const filtered = Object.entries(ordersByStatus).reduce((acc, [status, orders]) => {
          const filteredOrders = (orders as Order[]).filter(order => !paidOrderIds.includes(order.id))
          if (filteredOrders.length > 0) acc[status] = filteredOrders
          return acc
        }, {} as Record<string, Order[]>)

        setFilteredOrders(filtered)

      } catch (error) {
        console.error("Error al filtrar órdenes:", error)
        const currentWithoutEmpties = Object.fromEntries(
          Object.entries(ordersByStatus).filter(([_, orders]) => orders.length > 0)
        ) as Record<string, Order[]>
        setFilteredOrders(currentWithoutEmpties)
      }
    }

    if (data?._id && Object.keys(ordersByStatus).length > 0) {
      fetchAndFilterOrders()
    }
  }, [data?._id, ordersByStatus])

  // Apply additional filters
  const applyFilters = (orders: Record<string, Order[]>) => {
    return Object.entries(orders).reduce((acc, [status, ordersList]) => {
      const filtered = ordersList.filter(order => {
        // Search term filter
        const matchesSearch =
          searchTerm === "" ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (order.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (order.fullname?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (order.phone?.includes(searchTerm)) ||
          (order.cart?.some((item: any) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())));

        // Status filter
        const matchesStatus =
          statusFilter === "all" ||
          status.toLowerCase() === statusFilter.toLowerCase();

        // Order type filter
        const matchesOrderType =
          orderTypeFilter === "all" ||
          order.orderType?.toLowerCase() === orderTypeFilter.toLowerCase();

        return matchesSearch && matchesStatus && matchesOrderType;
      });

      if (filtered.length > 0) acc[status] = filtered;
      return acc;
    }, {} as Record<string, Order[]>);
  };

  // Get filtered orders
  const getFilteredOrders = () => {
    return applyFilters(filteredOrders)
  }

  // Handler para refrescar con animación
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await controls.start(rotateRefresh)
    await fetchHistoricalOrders()
    setIsRefreshing(false)
    controls.stop()
  }

  // Handler para acción de orden con animación
  const handleOrderActionAPI = async (paymentData: any) => {
    const { order, paymentInfo } = paymentData

    try {
      const paymentSummary = {
        total: paymentInfo.total,
        paid: paymentInfo.paid,
        methods: paymentInfo.payments.map((p: any) => ({
          method: p.method,
          amount: p.amount,
          ...p.details
        }))
      }

      const dataPayment = {
        orderId: order?.id,
        payment: paymentSummary,
        status: "completed",
        companyName: data?.companyName,
        companyId: data?._id
      }

      const res = await fetch(`/api/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataPayment),
      })

      if (!res.ok) throw new Error('Error al actualizar la orden')

      const result = await res.json()
      console.log('Orden actualizada:', result)

      await fetchHistoricalOrders() // Actualizar la lista de órdenes

      // Animación de éxito
      await controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.3 }
      })

    } catch (error) {
      console.error("Error en handleOrderActionAPI:", error)
    }
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setOrderTypeFilter("all")
  }

  // Get status options from available orders
  const statusOptions = Object.keys(filteredOrders).map(status => ({
    value: status.toLowerCase(),
    label: status.charAt(0).toUpperCase() + status.slice(1)
  }))

  // Get order type options from available orders
  const orderTypeOptions = [
    { value: "all", label: "Todos los tipos" },
    { value: "delivery", label: "Delivery" },
    { value: "mesa", label: "Mesa" },
    { value: "para llevar", label: "Para llevar" }
  ]

  // Función para cambiar el modo de vista
  const toggleViewMode = () => {
    setViewMode(prev => prev === "column" ? "list" : "column")
  }







  const handleLogout = async () => {
    clearLocalhostStorage();
    await recordAttendance('getOut', user?.user?.email, data?.companyName);
    window.location.reload();
  };


  return (
    <LayoutGroup>
      <Box sx={{
        height: "100vh",
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
      }}>
        {/* AppBar con animaciones */}
        <AppBar
          position="static"
          component={motion.div}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Toolbar variant="dense" sx={{ minHeight: isMobile ? 48 : 56 }}>
            {/* Logo con efecto hover */}
            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
              height: "40px",
              position: "relative",
              overflow: "hidden",
            }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Avatar sx={{
                  width: 28,
                  height: 28,
                  flexShrink: 0,
                  ml: 0.5,
                }}>
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

              {/* Título con animación de cambio */}
              <Box sx={{
                position: "relative",
                width: "auto",
                height: "100%",
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayTitle ? "LlakaScript" : "Panel de ordenes Staff"}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
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
                      {displayTitle ? " Pagos de Ordenes" : "LlakaScript"}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Box>

            {/* Controles con animaciones */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {isMobile && Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0) > 0 && (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Badge
                    badgeContent={Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)}
                    color="primary"
                    sx={{ mr: 0.5 }}
                  >
                    <Box sx={{ width: 4, height: 4 }} />
                  </Badge>
                </motion.div>
              )}

              {lastRefresh && !isMobile && (
                <motion.div variants={slideUp}>
                  <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                    Actualizado: {lastRefresh.toLocaleTimeString()}
                  </Typography>
                </motion.div>
              )}

              <Tooltip title="Actualizar">
                <motion.div
                  animate={controls}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={handleRefresh}
                    disabled={isLoadingHistory || isUpdating}
                  >
                    <Refresh fontSize="small" />
                  </IconButton>
                </motion.div>
              </Tooltip>

              <Tooltip title={viewMode === "column" ? "Vista lista" : "Vista columnas"}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton
                    size="small"
                    onClick={toggleViewMode}
                    color="default"
                  >
                    {viewMode === "column" ? <ViewList fontSize="small" /> : <ViewColumn fontSize="small" />}
                  </IconButton>
                </motion.div>
              </Tooltip>

              {isMobile && (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <IconButton size="small" onClick={() => setHeaderCollapsed(!headerCollapsed)}>
                    {headerCollapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
                  </IconButton>
                </motion.div>
              )}
              <Tooltip title="Salir">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton
                    size="small"
                    onClick={()=>handleLogout}
                    color="default"
                  >
                    <LogoutIcon fontSize="small" />
                  </IconButton>
                </motion.div>
              </Tooltip>

            </Box>
          </Toolbar>
        </AppBar>

        {/* Contenido principal con animaciones */}
        <Box sx={{
          p: { xs: 0.5, sm: 2 },
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            style={{ height: "100%" }}
            layout
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
              component={motion.div}
              whileHover={{ boxShadow: theme.shadows[isMobile ? 2 : 6] }}
              transition={{ duration: 0.3 }}
              layout
            >
              {/* Encabezado colapsable */}
              <Collapse
                in={!headerCollapsed}
                timeout="auto"
                collapsedSize={0}
                sx={{
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box sx={{ p: { xs: 1, sm: 2 } }}>
                  {/* Filtros de búsqueda */}
                  <Box sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2,
                    mb: 2,
                    alignItems: 'center'
                  }}>
                    <TextField
                      fullWidth={isMobile}
                      size="small"
                      placeholder="Buscar orden, email, nombre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search fontSize="small" />
                          </InputAdornment>
                        ),
                        endAdornment: searchTerm && (
                          <InputAdornment position="end">
                            <IconButton size="small" onClick={() => setSearchTerm('')}>
                              <Clear fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      sx={{
                        flex: 1,
                        minWidth: isMobile ? '100%' : 300
                      }}
                    />

                    <Box sx={{
                      display: 'flex',
                      gap: 1,
                      width: isMobile ? '100%' : 'auto',
                      flexWrap: isMobile ? 'wrap' : 'nowrap'
                    }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<FilterAlt fontSize="small" />}
                        onClick={() => setShowFilters(!showFilters)}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        Filtros
                      </Button>

                      {(searchTerm || statusFilter !== 'all' || orderTypeFilter !== 'all') && (
                        <Button
                          size="small"
                          variant="text"
                          startIcon={<Clear fontSize="small" />}
                          onClick={clearAllFilters}
                          sx={{ whiteSpace: 'nowrap' }}
                        >
                          Limpiar
                        </Button>
                      )}
                    </Box>
                  </Box>

                  {/* Filtros avanzados */}
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Box sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: 2,
                        mb: 2,
                        pt: 1,
                        alignItems: isMobile ? 'stretch' : 'center'
                      }}>
                        <TextField
                          select
                          size="small"
                          label="Estado"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          sx={{ minWidth: isMobile ? '100%' : 150 }}
                        >
                          <MenuItem value="all">Todos los estados</MenuItem>
                          {statusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          select
                          size="small"
                          label="Tipo de orden"
                          value={orderTypeFilter}
                          onChange={(e) => setOrderTypeFilter(e.target.value)}
                          sx={{ minWidth: isMobile ? '100%' : 150 }}
                        >
                          {orderTypeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>
                    </motion.div>
                  )}

                  {/* Mostrar filtros activos */}
                  {(searchTerm || statusFilter !== 'all' || orderTypeFilter !== 'all') && (
                    <Box sx={{
                      display: 'flex',
                      gap: 1,
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <Typography variant="caption" color="text.secondary">
                        Filtros activos:
                      </Typography>

                      {searchTerm && (
                        <Chip
                          size="small"
                          label={`Buscar: "${searchTerm}"`}
                          onDelete={() => setSearchTerm('')}
                        />
                      )}

                      {statusFilter !== 'all' && (
                        <Chip
                          size="small"
                          label={`Estado: ${statusOptions.find(o => o.value === statusFilter)?.label || statusFilter}`}
                          onDelete={() => setStatusFilter('all')}
                        />
                      )}

                      {orderTypeFilter !== 'all' && (
                        <Chip
                          size="small"
                          label={`Tipo: ${orderTypeOptions.find(o => o.value === orderTypeFilter)?.label || orderTypeFilter}`}
                          onDelete={() => setOrderTypeFilter('all')}
                        />
                      )}
                    </Box>
                  )}

                  {(isLoadingHistory || isUpdating) && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={popIn}
                    >
                      <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1,
                        mx: { xs: 1, sm: 2 },
                        mb: { xs: 1, sm: 2 },
                        backgroundColor: "action.hover",
                        borderRadius: 1,
                      }}>
                        <CircularProgress size={16} />
                        <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
                          {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </Box>
              </Collapse>

              {/* Mensajes de error con animación */}
              <Box sx={{
                px: { xs: 1, sm: 2 },
                pt: { xs: 1, sm: 1 },
                overflow: "auto",
                flexShrink: 0,
              }}>
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert
                        severity="error"
                        onClose={() => setError(null)}
                        sx={{ mb: 1 }}
                        component={motion.div}
                      >
                        {error}
                      </Alert>
                    </motion.div>
                  )}

                  {updateError && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert
                        severity="error"
                        onClose={() => setUpdateError(null)}
                        sx={{ mb: 1 }}
                        component={motion.div}
                      >
                        {updateError}
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>

              {/* Componente de órdenes con animación */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                style={{
                  flex: 1,
                  overflow: "hidden",
                  display: 'flex'
                }}
                layout
              >
                <OrdersSalesScreenStaffNew
                  orders={getFilteredOrders()}
                  onPaymentSubmit={handleOrderActionAPI}
                  viewMode={viewMode}
                />
              </motion.div>
            </Paper>
          </motion.div>
        </Box>

        {/* Notificación de éxito con animación */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <Snackbar
                open={!!successMessage}
                autoHideDuration={3000}
                onClose={clearMessages}
                message={successMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </LayoutGroup>
  )
}

export default OrdersSaleStaff