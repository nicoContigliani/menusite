
////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////TODO ADMIN/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
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
} from "@mui/material"

import UpdateIcon from '@mui/icons-material/Update';

import LogoutIcon from '@mui/icons-material/Logout';
import { Refresh, ExpandMore, ExpandLess, ViewList, ViewColumn } from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import OrdersScreenStaff from "../Orders/OrdersScreenStaff/OrdersScreenStaff"
import { useOrdersManagement } from "../../../hooks/useOrdersManagement"
import { clearLocalhostStorage } from "@/services/localstorage.services"
import { recordAttendance } from "@/services/attendance.services"
import useSocketChat from "../../../hooks/useSocket"
import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog";

const OrdersSpeedPresentationStaff = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
  const [displayTitle, setDisplayTitle] = useState(false)
  const [viewMode, setViewMode] = useState<"column" | "list">(isMobile ? "list" : "column")

  const [open, setOpen] = useState(false);


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
    handleOrderUpdateAction,
    clearMessages,
    setUpdateError,
    setError,
    isConnected,
  } = useOrdersManagement({
    companyName: data?.companyName,
    userEmail: user?.user?.email,
  })

  const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)
  const pendingCount = ordersByStatus.pending?.length || 0
  const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
  const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

  const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
  const toggleViewMode = () => setViewMode(viewMode === "column" ? "list" : "column")

  const handleLogout = async () => {
    clearLocalhostStorage()
    await recordAttendance('getOut', user?.user?.email, data?.companyName)
    window.location.reload()
  }

  // Title animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTitle((prev) => !prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Update view mode when screen size changes
  useEffect(() => {
    setViewMode(isMobile ? "list" : "column")
  }, [isMobile])





  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
      }}
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
                    {displayTitle ? "LlakaScript" : "Admin Panel de Órdenes"}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>

          {/* Right side controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {/* Connection status indicator */}
            <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: isConnected ? 'success.main' : 'error.main',
                  mr: 1,
                }}
              />
            </Tooltip>

            {/* Order count badge */}
            {isMobile && totalOrders > 0 && (
              <Badge badgeContent={totalOrders} color="primary" sx={{ mr: 0.5 }}>
                <Box sx={{ width: 4, height: 4 }} />
              </Badge>
            )}

            {/* Last refresh time */}
            {lastRefresh && !isMobile && (
              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                Actualizado: {lastRefresh.toLocaleTimeString()}
              </Typography>
            )}

            {/* Refresh button */}
            <Tooltip title="Actualizar">
              <IconButton
                color="primary"
                size="small"
                onClick={fetchHistoricalOrders}
                disabled={isLoadingHistory || isUpdating}
              >
                <Refresh fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* View mode toggle (mobile only) */}
            {isMobile && (
              <Tooltip title={viewMode === "column" ? "Vista lista" : "Vista columnas"}>
                <IconButton size="small" onClick={toggleViewMode} color="default">
                  {viewMode === "column" ? <ViewList fontSize="small" /> : <ViewColumn fontSize="small" />}
                </IconButton>
              </Tooltip>
            )}

            {/* Header collapse toggle (mobile only) */}
            {isMobile && (
              <IconButton size="small" onClick={toggleHeader}>
                {headerCollapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
              </IconButton>
            )}
            <Tooltip title="Salir">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  size="small"
                  onClick={handleLogout}
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
          {/* Status header - collapsible on mobile */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderBottom: 1,
              borderColor: "divider",
              transition: "all 0.3s ease",
              maxHeight: headerCollapsed ? "0px" : "200px",
              overflow: "hidden",
            }}
          >
            {/* Status chips */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                p: { xs: 1, sm: 2 },
                justifyContent: "center",
              }}
            >
              <Chip size="small" color="default" label={`${totalOrders} órdenes`} variant="outlined" />

              {pendingCount > 0 && (
                <Chip size="small" color="warning" label={`${pendingCount} pendientes`} variant="outlined" />
              )}

              {processingCount > 0 && (
                <Chip size="small" color="info" label={`${processingCount} en proceso`} variant="outlined" />
              )}

              {completedCount > 0 && (
                <Chip size="small" color="success" label={`${completedCount} completadas`} variant="outlined" />
              )}



              <Chip
                size="small"
                color="warning"
                label={`Actualizar Ordene Viejas`}
                variant="outlined"
                icon={<UpdateIcon />}
                onClick={() => setOpen(true)}


              />

              <PendingOrdersDialog
                open={open}
                onClose={() => setOpen(false)}
              />



            </Box>

            {/* Status indicators */}
            {(isLoadingHistory || isUpdating) && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  mx: { xs: 1, sm: 2 },
                  mb: { xs: 1, sm: 2 },
                  backgroundColor: "action.hover",
                  borderRadius: 1,
                }}
              >
                <CircularProgress size={16} />
                <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
                  {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Error messages */}
          <Box
            sx={{
              px: { xs: 1, sm: 2 },
              pt: { xs: 1, sm: 1 },
              overflow: "auto",
              flexShrink: 0,
            }}
          >
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 1 }}>
                  {error}
                </Alert>
              </motion.div>
            )}

            {updateError && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Alert severity="error" onClose={() => setUpdateError(null)} sx={{ mb: 1 }}>
                  {updateError}
                </Alert>
              </motion.div>
            )}
          </Box>

          {/* Main content - takes all available space */}
          <Box
            sx={{
              flex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <OrdersScreenStaff
              ordersByStatus={ordersByStatus}
              onOrderAction={handleOrderAction}
              viewMode={viewMode}
              handleOrderUpdateAction={handleOrderUpdateAction}
            />
          </Box>
        </Paper>
      </Box>

      {/* Success notification */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={clearMessages}
        message={successMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Box>
  )
}

export default OrdersSpeedPresentationStaff