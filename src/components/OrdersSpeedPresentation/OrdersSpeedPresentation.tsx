import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Alert,
  Snackbar
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GutterlessList from "../GenericList/OrdersList";
import useSocketChat from "../../../hooks/useSocket";
import { Check, Refresh } from "@mui/icons-material";
import Chat from "../Chat/Chat";
import { useOrderUpdates } from "../../../hooks/useOrderUpdates";

const OrdersSpeedPresentation = () => {
  // ======================================
  // REDUX SELECTORS
  // ======================================
  const { data } = useSelector(
    (state: RootState) => state.chExcelData as unknown as { data: any }
  );
  const user = useSelector((state: RootState) => state.auth);

  // ======================================
  // STATE MANAGEMENT
  // ======================================
  // Orders state
  const [historicalOrders, setHistoricalOrders] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [showConnectionStatus, setShowConnectionStatus] = useState(true);

  // Custom hooks for order updates and socket
  const {
    updateOrderStatus,
    bulkUpdateOrders,
    isUpdating,
    updateError,
    successMessage,
    clearMessages,
    setUpdateError
  } = useOrderUpdates();

  const {
    name,
    setName,
    room,
    setRoom,
    parsedMessages,
    isConnected,
    reconnectAttempts,
    joinRoom
  } = useSocketChat('https://socketserver-t4g9.onrender.com');

  // ======================================
  // MEMOIZED VALUES
  // ======================================
  const mergedOrders = useMemo(() => {
    const socketOrders = Array.isArray(parsedMessages) ? parsedMessages : [];
    const allOrders = [...historicalOrders, ...socketOrders];

    // Remove duplicates by ID
    const uniqueOrders = allOrders.reduce((acc: any[], current: any) => {
      if (!acc.some(item => item._id === current._id)) {
        acc.push(current);
      }
      return acc;
    }, []);

    // Sort by date (newest first)
    return uniqueOrders.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [historicalOrders, parsedMessages]);

  // ======================================
  // API FUNCTIONS
  // ======================================
  const fetchHistoricalOrders = async () => {
    if (!data?.companyName) return;

    setIsLoadingHistory(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        status: 'processing,cancelled,finished',
        sort: 'desc',
        limit: '50',
        company: data.companyName
      });

      const res = await fetch(`/api/orders?${params}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const orders = await res.json();
      setHistoricalOrders(Array.isArray(orders) ? orders : []);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error("Error fetching historical orders:", err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // ======================================
  // EVENT HANDLERS
  // ======================================
  const handleOrderAction = async (action: any, order: any) => {
    try {
      let newStatus = '';

      switch (action) {
        case 'start': newStatus = 'processing'; break;
        case 'pause': newStatus = 'paused'; break;
        case 'resume': newStatus = 'processing'; break;
        case 'complete': newStatus = 'finished'; break;
        case 'cancel': newStatus = 'cancelled'; break;
        case 'reopen': newStatus = 'pending'; break;
        default: return;
      }

      await updateOrderStatus(order._id, newStatus);

      // Update local state
      setHistoricalOrders(prev => prev.map(o =>
        o._id === order._id ? { ...o, status: newStatus } : o
      ));
    } catch (error) {
      console.error("Error handling order action:", error);
    }
  };

  // ======================================
  // EFFECTS
  // ======================================
  // Initial setup
  useEffect(() => {
    const initialize = async () => {
      if (user) setName(user?.user?.email || '');
      if (data) {
        setRoom(data?.companyName || '');
        await fetchHistoricalOrders();
      }
    };

    initialize();

    return () => {
      setHistoricalOrders([]);
    };
  }, [user, data, setName, setRoom]);

  // Join room when ready
  useEffect(() => {
    if (name && room && isConnected) {
      joinRoom();
    }
  }, [name, room, isConnected, joinRoom]);

  // Connection status display
  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => setShowConnectionStatus(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowConnectionStatus(true);
    }
  }, [isConnected, reconnectAttempts]);

  // ======================================
  // RENDER
  // ======================================
  return (
    <div>
      <Box sx={{ pb: 7 }}>
        {/* App Header */}
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexGrow: 1
            }}>
              <Avatar sx={{ width: 50, height: 50 }}>
                <Image
                  src={"/images/flama.png"}
                  alt={"LlakaScript"}
                  width={50}
                  height={50}
                  priority
                  style={{ objectFit: 'contain' }}
                />
              </Avatar>
              Llakascript
            </Typography>
            OrdersSpeed
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ textAlign: "center", p: 1 }}>
          {/* Connection Status */}
          {showConnectionStatus && (
            <Box display="inline-block" minWidth="120px" textAlign="center" my={1}>
              <AnimatePresence>
                {!isConnected ? (
                  <motion.div
                    key="connecting"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="text.secondary">
                      <motion.div
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut"
                        }}
                      >
                        <Typography variant="body2">
                          Conectando... {reconnectAttempts > 0 && `(Intento ${reconnectAttempts})`}
                        </Typography>
                      </motion.div>
                      <Box display="flex">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.2,
                              delay: i * 0.2
                            }}
                          >
                            <Typography variant="body2" fontWeight="bold" color="primary">.</Typography>
                          </motion.div>
                        ))}
                      </Box>
                    </Box>
                  </motion.div>
                ) : (
                  <motion.div
                    key="connected"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="success.main">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <Typography variant="body2">Conectado</Typography>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      >
                        <Check color="success" fontSize="small" />
                      </motion.div>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          )}

          {/* Refresh Controls */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
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
            <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {updateError && (
            <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }} onClose={() => setUpdateError(null)}>
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

          {/* Orders List */}
          {/* <GutterlessList
            data={mergedOrders}
            loading={isLoadingHistory || isUpdating}
            onAction={handleOrderAction}
          /> */}
          si



        </Box>

        {/* Chat Component */}
        <Box sx={{ textAlign: "center", p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Chat con Salas
          </Typography>
          <Chat />
        </Box>

        {/* Success Notification */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={clearMessages}
          message={successMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
      </Box>
    </div>
  );
};

export default OrdersSpeedPresentation;