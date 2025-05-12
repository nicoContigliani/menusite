import { socketHost } from '@/services/socketHost.services';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import io, { Socket } from 'socket.io-client';

// Definición de interfaces
interface OrderItem {
  id: string;
  itemId: number;
  name: string;
  price: number;
  quantity: number;
  extras?: Array<{
    name: string;
    price: number;
  }>;
  extrasTotal?: number;
  Description: string;
}

export interface Order {
  _id: string;
  id?: string;
  orderType: string;
  dataTypeOrder: string;
  cart: OrderItem[];
  comments?: string;
  companiesName?: string;
  companiesID?: string;
  email?: string;
  fullname: string;
  phone?: string;
  whathsapp?: string;
  channel?: string;
  name?: string;
  status: 'pending' | 'processing' | 'paused' | 'finished' | 'cancelled' | 'delivered';
  createdAt?: string;
  updatedAt?: string;
  timestamp?: string;
  [key: string]: any;
}

interface OrdersByStatus {
  pending?: Order[];
  processing?: Order[];
  paused?: Order[];
  finished?: Order[];
  cancelled?: Order[];
  delivered?: Order[];
}

interface UseOrdersManagementSocketApiProps {
  companyName?: string;
  userEmail?: string;
  socketUrl?: string;
  orderLimit?: number;
  statusesToFetch?: string;
  sortDirection?: 'asc' | 'desc';
}

interface Message {
  id: string;
  name: string;
  message: string;
  isOrder: boolean;
  orderData?: Order;
  timestamp: string;
}

interface SocketMessage {
  event: string;
  data: any;
  timestamp: string;
}

/**
 * Custom hook que maneja un CRUD completo de órdenes con sincronización en tiempo real
 * mediante sockets y persistencia en API REST.
 */
export function useOrdersManagementSocketApi({
  companyName,
  userEmail,
  // socketUrl = 'https://socketserver-t4g9.onrender.com',
  socketUrl = 'https://socketserver-t4g9.onrender.com',
  orderLimit = 50,
  statusesToFetch = 'pending,processing,paused,finished,cancelled,delivered',
  sortDirection = 'desc',
}: UseOrdersManagementSocketApiProps) {
  // Estados para gestión de órdenes
  const [historicalOrders, setHistoricalOrders] = useState<Order[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [ordersByStatus, setOrdersByStatus] = useState<OrdersByStatus>({});

  // Estados para actualizaciones
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Estados para socket
  const [socket, setSocket] = useState<any | null>(null);
  const socketRef = useRef<any | null>(null);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketMessages, setSocketMessages] = useState<SocketMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  
  // Configuración de reconexión
  const maxReconnectAttempts = 30;
  const reconnectDelay = 5000;
  const currentRoom = useRef('');

  /**
   * Función para parsear mensajes JSON anidados
   */
  const deepParseJson = useCallback((str: string): any => {
    try {
      let parsed = JSON.parse(str);
      while (typeof parsed === 'string') {
        try {
          parsed = JSON.parse(parsed);
        } catch {
          break;
        }
      }
      return parsed;
    } catch (e) {
      return str;
    }
  }, []);

  /**
   * Procesa mensajes entrantes del socket y los convierte a formato estándar
   */
  const processIncomingMessage = useCallback((data: { from: string; message: string }): Message => {
    try {
      const parsed = typeof data.message === 'string' ? deepParseJson(data.message) : data.message;

      if (parsed && typeof parsed === 'object' && (parsed._id || parsed.id)) {
        const orderData: Order = {
          ...parsed,
          _id: parsed._id || parsed.id,
          status: parsed.status || 'pending',
          timestamp: parsed.timestamp || new Date().toISOString(),
          updatedAt: parsed.updatedAt || new Date().toISOString()
        };

        return {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: data.from,
          message: `Orden recibida (ID: ${orderData._id})`,
          isOrder: true,
          orderData,
          timestamp: new Date().toISOString()
        };
      }

      return {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: data.from,
        message: typeof parsed === 'string' ? parsed : JSON.stringify(parsed),
        isOrder: false,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error processing message:', error);
      return {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: data.from,
        message: data.message,
        isOrder: false,
        timestamp: new Date().toISOString()
      };
    }
  }, [deepParseJson]);

  /**
   * Inicializa la conexión de socket con manejo de reconexión
   */
  const initializeSocket = useCallback(() => {
    if (socketRef.current?.connected) return socketRef.current;

    const newSocket = io(socketUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: maxReconnectAttempts,
      reconnectionDelay: reconnectDelay,
      autoConnect: true,
      forceNew: false
    });

    // Manejadores de eventos del socket
    newSocket.on('connect', () => {
      setIsConnected(true);
      setReconnectAttempts(0);
      setSocketMessages(prev => [...prev, {
        event: 'connect',
        data: { socketId: newSocket.id },
        timestamp: new Date().toISOString()
      }]);
      
      if (currentRoom.current) {
        newSocket.emit('join_channel', currentRoom.current);
      }
    });

    newSocket.on('disconnect', (reason: string) => {
      setIsConnected(false);
      setSocketMessages(prev => [...prev, {
        event: 'disconnect',
        data: { reason },
        timestamp: new Date().toISOString()
      }]);

      if (reason === 'io server disconnect') {
        setTimeout(() => {
          if (reconnectAttempts < maxReconnectAttempts) {
            setSocketMessages(prev => [...prev, {
              event: 'reconnect_attempt',
              data: { attempt: reconnectAttempts + 1, max: maxReconnectAttempts },
              timestamp: new Date().toISOString()
            }]);
            newSocket.connect();
            setReconnectAttempts(prev => prev + 1);
          }
        }, reconnectDelay);
      }
    });

    newSocket.on('connect_error', (err: Error) => {
      setSocketMessages(prev => [...prev, {
        event: 'connect_error',
        data: { error: err.message },
        timestamp: new Date().toISOString()
      }]);
    });

    newSocket.on('new_message', (data: { from: string; message: string }) => {
      const newMessage = processIncomingMessage(data);
      setMessages(prev => [...prev, newMessage]);
      setSocketMessages(prev => [...prev, {
        event: 'new_message',
        data: { from: data.from, message: data.message },
        timestamp: new Date().toISOString()
      }]);
    });

    newSocket.on('order_updated', (order: Order) => {
      const newMessage = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: order.name || 'System',
        message: `Orden actualizada (ID: ${order._id})`,
        isOrder: true,
        orderData: order,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newMessage]);
      setSocketMessages(prev => [...prev, {
        event: 'order_updated',
        data: order,
        timestamp: new Date().toISOString()
      }]);
    });

    newSocket.on('joined_channel', (channel: string) => {
      currentRoom.current = channel;
      setSocketMessages(prev => [...prev, {
        event: 'joined_channel',
        data: { channel },
        timestamp: new Date().toISOString()
      }]);
    });

    newSocket.on('left_channel', (channel: string) => {
      setSocketMessages(prev => [...prev, {
        event: 'left_channel',
        data: { channel },
        timestamp: new Date().toISOString()
      }]);
      if (currentRoom.current === channel) {
        currentRoom.current = '';
      }
    });

    socketRef.current = newSocket;
    setSocket(newSocket);
    return newSocket;
  }, [socketUrl, processIncomingMessage, reconnectAttempts]);

  /**
   * Une al socket a una room específica
   */
  const joinRoom = useCallback((roomName: string = room) => {
    if (!socketRef.current) return;

    const targetRoom = roomName || room;
    if (!targetRoom) return;

    if (currentRoom.current && currentRoom.current !== targetRoom) {
      socketRef.current.emit('leave_channel', currentRoom.current);
    }

    socketRef.current.emit('join_channel', targetRoom);
    currentRoom.current = targetRoom;
    setRoom(targetRoom);
  }, [room]);

  /**
   * Envía un mensaje a través del socket
   */
  const sendMessage = useCallback(() => {
    if (!message.trim() || !socketRef.current || !currentRoom.current) return;

    socketRef.current.emit('send_message', {
      channel: currentRoom.current,
      name,
      message,
    }, (ack: { success: boolean }) => {
      if (!ack?.success) {
        setError('Failed to send message');
      }
    });

    setMessage('');
  }, [message, name]);

  /**
   * Envía una orden a través del socket
   */
  const sendOrder = useCallback((orderDetails: Order, roomsname?: string) => {
    if (!socketRef.current) {
      setError('Socket connection not available');
      return;
    }

    const targetRoom = roomsname || currentRoom.current || room;
    if (!targetRoom) {
      setError('No room specified');
      return;
    }

    const orderWithMetadata: Order = {
      ...orderDetails,
      channel: targetRoom,
      name: name || 'System',
      timestamp: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    socketRef.current.emit('send_message', {
      channel: targetRoom,
      name: name || 'System',
      message: JSON.stringify(orderWithMetadata),
    }, (ack: { success: boolean }) => {
      if (ack?.success) {
        const newMessage = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: name || 'System',
          message: `Orden actualizada (ID: ${orderDetails._id})`,
          isOrder: true,
          orderData: orderWithMetadata,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, newMessage]);
      } else {
        setError('Failed to send order update');
      }
    });
  }, [room, name]);

  /**
   * Extrae los mensajes que son órdenes del historial de mensajes
   */
  const parsedMessages = useMemo(() => {
    return messages
      .filter(msg => msg.isOrder && msg.orderData)
      .map(msg => ({
        ...msg.orderData!,
        _id: msg.orderData!._id || msg.orderData!.id,
        timestamp: msg.timestamp
      }));
  }, [messages]);

  /**
   * Crea una nueva orden
   */
  const createOrder = useCallback(async (orderData: Partial<Order>) => {
    setIsUpdating(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          if (responseText) {
            errorMessage = responseText;
          }
        }
        throw new Error(errorMessage);
      }

      const result = responseText ? JSON.parse(responseText) : { success: true };
      const createdOrder = result.data || result;

      // Actualizar el estado local
      setHistoricalOrders(prev => [createdOrder, ...prev]);
      setSuccessMessage('Orden creada correctamente');

      // Enviar a través del socket
      if (socketRef.current && currentRoom.current) {
        sendOrder(createdOrder);
      }

      return createdOrder;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al crear la orden';
      setError(message);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, [sendOrder]);

  /**
   * Actualiza una orden
   */
  const updateOrder = useCallback(async (orderId: string, updates: Record<string, any>) => {
    setIsUpdating(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const existingOrder = historicalOrders.find(o => o._id === orderId);
      if (!existingOrder) {
        throw new Error(`Order ${orderId} not found locally`);
      }

      const response = await fetch(`/api/orders?id=${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
          
          if (errorData.error === 'Order not found') {
            setHistoricalOrders(prev => prev.filter(o => o._id !== orderId));
          }
        } catch {
          if (responseText) {
            errorMessage = responseText;
          }
        }
        throw new Error(errorMessage);
      }

      const result = responseText ? JSON.parse(responseText) : { success: true };
      const updatedOrder = { ...existingOrder, ...updates, updatedAt: new Date().toISOString() };

      // Actualizar estado local
      setHistoricalOrders(prev =>
        prev.map(o => o._id === orderId ? updatedOrder : o)
      );
      setSuccessMessage('Orden actualizada correctamente');

      // Enviar a través del socket
      if (socketRef.current && currentRoom.current) {
        sendOrder(updatedOrder);
      }

      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al actualizar la orden';
      setError(message);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, [historicalOrders, sendOrder]);

  /**
   * Elimina una orden
   */
  const deleteOrder = useCallback(async (orderId: string) => {
    setIsUpdating(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/api/orders?id=${orderId}`, {
        method: 'DELETE',
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          if (responseText) {
            errorMessage = responseText;
          }
        }
        throw new Error(errorMessage);
      }

      // Actualizar estado local
      setHistoricalOrders(prev => prev.filter(o => o._id !== orderId));
      setSuccessMessage('Orden eliminada correctamente');

      // Notificar a través del socket
      if (socketRef.current && currentRoom.current) {
        socketRef.current.emit('order_deleted', { orderId });
      }

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al eliminar la orden';
      setError(message);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  /**
   * Actualiza el estado de una orden
   */
  const updateOrderStatus = useCallback(async (orderId: string, newStatus: Order['status']) => {
    return updateOrder(orderId, { status: newStatus });
  }, [updateOrder]);

  /**
   * Maneja acciones específicas sobre órdenes
   */
  const handleOrderAction = useCallback(async (action: string, order: Order) => {
    try {
      let newStatus: Order['status'] = order.status;

      switch (action) {
        case 'start': newStatus = 'processing'; break;
        case 'pause': newStatus = 'paused'; break;
        case 'resume': newStatus = 'processing'; break;
        case 'complete': newStatus = 'finished'; break;
        case 'deliver': newStatus = 'delivered'; break;
        case 'cancel': newStatus = 'cancelled'; break;
        case 'reopen': newStatus = 'pending'; break;
        default: return;
      }

      // Actualización optimista
      setHistoricalOrders(prev =>
        prev.map(o => o._id === order._id ? { ...o, status: newStatus } : o)
      );

      await updateOrderStatus(order._id, newStatus);
    } catch (error) {
      // Revertir en caso de error
      setHistoricalOrders(prev =>
        prev.map(o => o._id === order._id ? { ...o, status: order.status } : o)
      );
      throw error;
    }
  }, [updateOrderStatus]);

  /**
   * Obtiene las órdenes históricas desde la API
   */
  const fetchHistoricalOrders = useCallback(async () => {
    if (!companyName) return;

    setIsLoadingHistory(true);
    setError(null);

    try {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

      const params = new URLSearchParams({
        status: statusesToFetch,
        sort: sortDirection,
        limit: orderLimit.toString(),
        company: companyName,
        dateFrom: startOfDay,
        dateTo: endOfDay
      });

      const res = await fetch(`/api/orders?${params}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const orders = await res.json();
      setHistoricalOrders(Array.isArray(orders) ? orders : []);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoadingHistory(false);
    }
  }, [companyName, statusesToFetch, sortDirection, orderLimit]);

  /**
   * Limpia los mensajes de error y éxito
   */
  const clearMessages = useCallback(() => {
    setError(null);
    setUpdateError(null);
    setSuccessMessage(null);
  }, []);

  /**
   * Reconecta el socket manualmente
   */
  const reconnectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.connect();
    }
  }, []);

  /**
   * Limpia la conexión del socket
   */
  const cleanSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  }, []);

  /**
   * Procesa y actualiza las órdenes cuando llegan nuevos mensajes del socket
   */
  useEffect(() => {
    if (!parsedMessages || parsedMessages.length === 0) return;

    setHistoricalOrders((prev:any) => {
      const newOrders = parsedMessages.filter(
        newOrder => !prev.some((existingOrder:any) => existingOrder._id === newOrder._id)
      );

      const updatedOrders = prev.map((existingOrder:any) => {
        const updatedOrder = parsedMessages.find(
          newOrder => newOrder._id === existingOrder._id &&
            new Date(newOrder.updatedAt || newOrder.timestamp) > new Date(existingOrder.updatedAt || existingOrder.timestamp || 0)
        );
        return updatedOrder || existingOrder;
      });

      return [...updatedOrders, ...newOrders];
    });
  }, [parsedMessages]);

  /**
   * Agrupa las órdenes por estado
   */
  useEffect(() => {
    const groupedOrders = historicalOrders.reduce(
      (acc: Record<string, Order[]>, order: Order) => {
        const status = order.status.toLowerCase();
        if (!acc[status]) acc[status] = [];
        acc[status].push(order);
        return acc;
      },
      {} as Record<string, Order[]>
    );

    setOrdersByStatus(groupedOrders);
  }, [historicalOrders]);

  /**
   * Inicialización del hook
   */
  useEffect(() => {
    const newSocket = initializeSocket();
    
    if (userEmail) setName(userEmail);
    if (companyName) {
      const channel = `kitchen-${companyName}`;
      setRoom(channel);
      joinRoom(channel);
      fetchHistoricalOrders();
    }

    // Escuchar eventos de orden eliminada
    newSocket.on('order_deleted', ({ orderId }: { orderId: string }) => {
      setHistoricalOrders(prev => prev.filter(o => o._id !== orderId));
    });

    return () => {
      if (currentRoom.current) {
        newSocket.emit('leave_channel', currentRoom.current);
      }
      newSocket.off('order_deleted');
      newSocket.disconnect();
    };
  }, [userEmail, companyName, initializeSocket, joinRoom, fetchHistoricalOrders]);

  return {
    // Estados
    allOrders: historicalOrders,
    ordersByStatus,
    isConnected,
    isLoading: isLoadingHistory,
    isUpdating,
    error: error || updateError,
    successMessage,
    reconnectAttempts,
    lastRefresh,
    socketMessages,
    messages,
    parsedMessages,
    room,
    name,
    message,

    // Funciones
    fetchHistoricalOrders,
    handleOrderAction,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    createOrder,
    clearMessages,
    reconnectSocket,
    cleanSocket,
    sendMessage,
    sendOrder,
    setMessage,
    setName,
    joinRoom
  };
}


//TODO _ COMPONENT EXAMPLE 
//componete de ordenes
// import React, { useMemo } from 'react';
// import {
//   Box,
//   Button,
//   Chip,
//   CircularProgress,
//   Paper,
//   Typography,
//   Snackbar,
//   Alert,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
//   ListItemSecondaryAction,
//   IconButton,
//   Collapse,
//   Card,
//   CardContent,
//   CardActions,
//   Divider,
//   TextField,
//   Badge,
//   Tooltip
// } from '@mui/material';
// import {
//   Delete as DeleteIcon,
//   Edit as EditIcon,
//   Refresh as RefreshIcon,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
//   CheckCircle as CheckCircleIcon,
//   PauseCircle as PauseCircleIcon,
//   Cancel as CancelIcon,
//   DeliveryDining as DeliveryIcon,
//   PlayCircle as PlayIcon,
//   Add as AddIcon,
//   Warning as WarningIcon,
//   Info as InfoIcon
// } from '@mui/icons-material';
// import { FixedSizeList } from 'react-window';
// import { useOrdersManagementSocketApi } from '../../../hooks/useOrdersManagementSocketApi';

// const OrderSpeedGeneric = () => {
//   const {
//     allOrders,
//     ordersByStatus,
//     isConnected,
//     isLoading,
//     isUpdating,
//     error,
//     successMessage,
//     reconnectAttempts,
//     lastRefresh,
//     socketMessages,
//     messages,
//     fetchHistoricalOrders,
//     handleOrderAction,
//     updateOrder,
//     deleteOrder,
//     createOrder,
//     clearMessages,
//     reconnectSocket,
//     cleanSocket,
//     sendMessage,
//     message,
//     setMessage,
//     room
//   } = useOrdersManagementSocketApi({
//     companyName: "tuEmpresa",
//     userEmail: "usuario@ejemplo.com",
//     orderLimit: 50
//   });

//   const [expandedOrder, setExpandedOrder] = React.useState<string | null>(null);
//   const [newMessageText, setNewMessageText] = React.useState('');
//   const [newOrderForm, setNewOrderForm] = React.useState<Partial<any>>({
//     fullname: '',
//     orderType: 'delivery',
//     cart: [{ id: '1', itemId: 1, name: '', price: 0, quantity: 1, Description: '' }]
//   });

//   // Ordenar órdenes por fecha (más recientes primero)
//   const sortedOrders = useMemo(() => {
//     return [...allOrders].sort((a, b) => {
//       const dateA = new Date(a.createdAt || a.timestamp || 0);
//       const dateB = new Date(b.createdAt || b.timestamp || 0);
//       return dateB.getTime() - dateA.getTime();
//     });
//   }, [allOrders]);

//   // Filtrar mensajes de órdenes para el log
//   const orderMessages = useMemo(() => {
//     return messages.filter(msg => msg.isOrder);
//   }, [messages]);

//   // Crear orden de prueba
//   const handleCreateTestOrder = () => {
//     const testOrder: any = {
//       _id: `test-${Date.now()}`,
//       fullname: `Cliente ${Math.floor(Math.random() * 1000)}`,
//       orderType: ['delivery', 'pickup', 'dine-in'][Math.floor(Math.random() * 3)] as any,
//       dataTypeOrder: 'food',
//       cart: [
//         {
//           id: `item-${Date.now()}`,
//           itemId: Math.floor(Math.random() * 1000),
//           name: ['Pizza', 'Hamburguesa', 'Ensalada'][Math.floor(Math.random() * 3)] as string,
//           price: Math.floor(Math.random() * 30) + 5,
//           quantity: Math.floor(Math.random() * 3) + 1,
//           Description: ''
//         }
//       ],
//       status: 'pending',
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     };

//     createOrder(testOrder).catch(console.error);
//   };

//   // Enviar mensaje de chat
//   const handleSendMessage = () => {
//     if (newMessageText.trim()) {
//       setMessage(newMessageText);
//       sendMessage();
//       setNewMessageText('');
//     }
//   };

//   // Renderizar filas para la lista virtualizada
//   const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
//     const order = sortedOrders[index];
//     const isExpanded = expandedOrder === order._id;
//     const isPending = order.status === 'pending';
//     const isProcessing = order.status === 'processing';

//     return (
//       <ListItem 
//         style={style} 
//         key={order._id} 
//         sx={{ 
//           bgcolor: isExpanded ? 'action.hover' : 'inherit',
//           borderLeft: isProcessing ? '4px solid #1976d2' : isPending ? '4px solid #9e9e9e' : 'none'
//         }}
//       >
//         <ListItemAvatar>
//           <Badge
//             overlap="circular"
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//             badgeContent={
//               orderMessages.filter(m => m.orderData?._id === order._id).length > 0 ? (
//                 <Tooltip title="Tiene actualizaciones recientes">
//                   <InfoIcon color="primary" fontSize="small" />
//                 </Tooltip>
//               ) : null
//             }
//           >
//             <Avatar sx={{
//               bgcolor: {
//                 pending: 'grey.500',
//                 processing: 'primary.main',
//                 paused: 'warning.main',
//                 finished: 'success.main',
//                 cancelled: 'error.main',
//                 delivered: 'success.dark'
//               }[order.status]
//             }}>
//               {order.status === 'pending' && <PlayIcon />}
//               {order.status === 'processing' && <PlayIcon />}
//               {order.status === 'paused' && <PauseCircleIcon />}
//               {order.status === 'finished' && <CheckCircleIcon />}
//               {order.status === 'cancelled' && <CancelIcon />}
//               {order.status === 'delivered' && <DeliveryIcon />}
//             </Avatar>
//           </Badge>
//         </ListItemAvatar>
//         <ListItemText
//           primary={`#${order.id || order._id.slice(-4)} - ${order.fullname}`}
//           secondary={
//             <>
//               <Typography component="span" variant="body2" color="text.primary">
//                 {order.status.toUpperCase()}
//               </Typography>
//               {` — ${new Date(order.createdAt || order.timestamp || '').toLocaleString()}`}
//               {order.orderType && ` — ${order.orderType.toUpperCase()}`}
//             </>
//           }
//         />
//         <ListItemSecondaryAction>
//           <IconButton 
//             edge="end" 
//             onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
//             aria-label={isExpanded ? "Ocultar detalles" : "Mostrar detalles"}
//           >
//             {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//           </IconButton>
//         </ListItemSecondaryAction>
//       </ListItem>
//     );
//   };

//   // Agregar item al formulario de nueva orden
//   const addCartItem = () => {
//     setNewOrderForm((prev:any) => ({
//       ...prev,
//       cart: [
//         ...prev.cart,
//         { id: `${Date.now()}`, itemId: prev.cart.length + 1, name: '', price: 0, quantity: 1, Description: '' }
//       ]
//     }));
//   };

//   // Crear nueva orden desde el formulario
//   const handleCreateOrder = () => {
//     if (!newOrderForm.fullname || newOrderForm.cart.some((item:any) => !item.name)) {
//       setError('Nombre del cliente y todos los ítems son requeridos');
//       return;
//     }

//     const newOrder: Partial<any> = {
//       ...newOrderForm,
//       status: 'pending',
//       dataTypeOrder: 'food',
//       createdAt: new Date().toISOString()
//     };

//     createOrder(newOrder)
//       .then(() => {
//         setNewOrderForm({
//           fullname: '',
//           orderType: 'delivery',
//           cart: [{ id: '1', itemId: 1, name: '', price: 0, quantity: 1, Description: '' }]
//         });
//       })
//       .catch(console.error);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Panel de conexión */}
//       <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Typography variant="h5" gutterBottom>
//             Control de Conexión
//           </Typography>
//           <Chip
//             label={isConnected ? "CONECTADO" : "DESCONECTADO"}
//             color={isConnected ? "success" : "error"}
//             icon={isConnected ? <CheckCircleIcon /> : <WarningIcon />}
//             variant="outlined"
//             sx={{ fontWeight: 'bold' }}
//           />
//         </Box>
        
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={4}>
//             <Button
//               variant="contained"
//               onClick={fetchHistoricalOrders}
//               disabled={isLoading}
//               startIcon={isLoading ? <CircularProgress size={20} /> : <RefreshIcon />}
//               fullWidth
//             >
//               Refrescar Órdenes
//             </Button>
//           </Grid>

//           <Grid item xs={12} sm={4}>
//             <Button
//               variant="outlined"
//               onClick={cleanSocket}
//               disabled={!isConnected}
//               startIcon={<CancelIcon />}
//               fullWidth
//             >
//               Desconectar
//             </Button>
//           </Grid>

//           <Grid item xs={12} sm={4}>
//             <Button
//               variant="outlined"
//               onClick={reconnectSocket}
//               disabled={isConnected}
//               startIcon={<PlayIcon />}
//               fullWidth
//             >
//               Reconectar
//             </Button>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="body2" color="text.secondary">
//               {isConnected ? (
//                 `Conectado a sala: ${room} | Última actualización: ${lastRefresh?.toLocaleTimeString() || 'Nunca'}`
//               ) : (
//                 `Intentos de reconexión: ${reconnectAttempts}`
//               )}
//             </Typography>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Panel de creación de órdenes */}
//       <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Crear Nueva Orden
//         </Typography>

//         <Grid container spacing={2}>
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               label="Nombre del Cliente"
//               value={newOrderForm.fullname}
//               onChange={(e) => setNewOrderForm({...newOrderForm, fullname: e.target.value})}
//               margin="normal"
//               required
//             />
            
//             <TextField
//               select
//               fullWidth
//               label="Tipo de Orden"
//               value={newOrderForm.orderType}
//               onChange={(e) => setNewOrderForm({...newOrderForm, orderType: e.target.value as any})}
//               margin="normal"
//               SelectProps={{
//                 native: true,
//               }}
//             >
//               <option value="delivery">Delivery</option>
//               <option value="pickup">Recoger</option>
//               <option value="dine-in">Comer aquí</option>
//             </TextField>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Typography variant="subtitle1" gutterBottom>
//               Ítems del Pedido
//             </Typography>
            
//             {newOrderForm.cart.map((item:any, index:any) => (
//               <Box key={item.id} display="flex" gap={2} mb={2}>
//                 <TextField
//                   fullWidth
//                   label="Nombre"
//                   value={item.name}
//                   onChange={(e) => {
//                     const newCart = [...newOrderForm.cart];
//                     newCart[index].name = e.target.value;
//                     setNewOrderForm({...newOrderForm, cart: newCart});
//                   }}
//                   size="small"
//                   required
//                 />
                
//                 <TextField
//                   label="Precio"
//                   type="number"
//                   value={item.price}
//                   onChange={(e) => {
//                     const newCart = [...newOrderForm.cart];
//                     newCart[index].price = Number(e.target.value);
//                     setNewOrderForm({...newOrderForm, cart: newCart});
//                   }}
//                   size="small"
//                   sx={{ width: 100 }}
//                 />
                
//                 <TextField
//                   label="Cantidad"
//                   type="number"
//                   value={item.quantity}
//                   onChange={(e) => {
//                     const newCart = [...newOrderForm.cart];
//                     newCart[index].quantity = Number(e.target.value);
//                     setNewOrderForm({...newOrderForm, cart: newCart});
//                   }}
//                   size="small"
//                   sx={{ width: 100 }}
//                 />
//               </Box>
//             ))}
            
//             <Button 
//               startIcon={<AddIcon />} 
//               onClick={addCartItem}
//               variant="outlined"
//               size="small"
//               sx={{ mr: 2 }}
//             >
//               Agregar Ítem
//             </Button>
            
//             <Button 
//               variant="contained" 
//               onClick={handleCreateOrder}
//               disabled={isUpdating}
//               startIcon={isUpdating ? <CircularProgress size={20} /> : null}
//             >
//               Crear Orden
//             </Button>
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               variant="outlined"
//               onClick={handleCreateTestOrder}
//               disabled={isUpdating}
//               fullWidth
//               startIcon={<PlayIcon />}
//             >
//               Crear Orden Aleatoria (Para pruebas)
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Panel de órdenes por estado */}
//       <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Órdenes por Estado
//         </Typography>

//         <Grid container spacing={2}>
//           {Object.entries(ordersByStatus).map(([status, orders]) => {
//             const statusConfig:any = {
//               pending: { icon: <PlayIcon color="disabled" />, color: 'grey.500', actions: ['start'] },
//               processing: { icon: <PlayIcon color="primary" />, color: 'primary.main', actions: ['pause', 'complete'] },
//               paused: { icon: <PauseCircleIcon color="warning" />, color: 'warning.main', actions: ['resume', 'complete'] },
//               finished: { icon: <CheckCircleIcon color="success" />, color: 'success.main', actions: ['deliver'] },
//               cancelled: { icon: <CancelIcon color="error" />, color: 'error.main', actions: ['reopen'] },
//               delivered: { icon: <DeliveryIcon color="success" />, color: 'success.dark', actions: [] }
//             }[status];

//             return (
//               <Grid item xs={12} sm={6} md={4} key={status}>
//                 <Card sx={{ borderTop: `4px solid`, borderColor: statusConfig.color }}>
//                   <CardContent>
//                     <Box display="flex" alignItems="center" gap={1} mb={2}>
//                       {statusConfig.icon}
//                       <Typography variant="h6">
//                         {status.toUpperCase()} ({orders.length})
//                       </Typography>
//                     </Box>
                    
//                     {orders.length > 0 ? (
//                       <>
//                         {statusConfig.actions.map((action:any) => (
//                           <Button
//                             key={action}
//                             size="small"
//                             variant="outlined"
//                             onClick={() => handleOrderAction(action, orders[0])}
//                             disabled={isUpdating}
//                             fullWidth
//                             sx={{ mb: 1 }}
//                           >
//                             {action === 'start' && 'Iniciar'}
//                             {action === 'pause' && 'Pausar'}
//                             {action === 'resume' && 'Reanudar'}
//                             {action === 'complete' && 'Completar'}
//                             {action === 'deliver' && 'Marcar como Entregada'}
//                             {action === 'reopen' && 'Reabrir'}
//                           </Button>
//                         ))}
                        
//                         <Button
//                           size="small"
//                           variant="outlined"
//                           color="error"
//                           onClick={() => handleOrderAction('cancel', orders[0])}
//                           disabled={isUpdating || status === 'cancelled'}
//                           fullWidth
//                         >
//                           Cancelar
//                         </Button>
//                       </>
//                     ) : (
//                       <Typography variant="body2" color="text.secondary">
//                         No hay órdenes en este estado
//                       </Typography>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </Paper>

//       {/* Lista completa de órdenes */}
//       <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Typography variant="h5">
//             Todas las Órdenes ({sortedOrders.length})
//           </Typography>
//           <Chip 
//             label="Tiempo Real" 
//             color="primary" 
//             variant="outlined" 
//             icon={<PlayIcon fontSize="small" />}
//           />
//         </Box>

//         <Box sx={{ height: 400, width: '100%', mb: 2 }}>
//           <FixedSizeList
//             height={400}
//             width="100%"
//             itemSize={70}
//             itemCount={sortedOrders.length}
//           >
//             {renderRow}
//           </FixedSizeList>
//         </Box>

//         {sortedOrders.map(order => (
//           <Collapse in={expandedOrder === order._id} key={`details-${order._id}`}>
//             <Card sx={{ mt: 1, mb: 2, borderLeft: `4px solid`, borderColor: {
//               pending: 'grey.500',
//               processing: 'primary.main',
//               paused: 'warning.main',
//               finished: 'success.main',
//               cancelled: 'error.main',
//               delivered: 'success.dark'
//             }[order.status] }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Detalles de Orden #{order.id || order._id.slice(-4)}
//                 </Typography>
                
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={6}>
//                     <Typography><strong>Cliente:</strong> {order.fullname}</Typography>
//                     <Typography><strong>Tipo:</strong> {order.orderType}</Typography>
//                     <Typography><strong>Estado:</strong> {order.status}</Typography>
//                     <Typography><strong>Fecha:</strong> {new Date(order.createdAt || order.timestamp || '').toLocaleString()}</Typography>
//                     {order.comments && (
//                       <Typography><strong>Comentarios:</strong> {order.comments}</Typography>
//                     )}
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <Typography variant="subtitle1" gutterBottom>
//                       <strong>Productos:</strong>
//                     </Typography>
//                     <List dense>
//                       {order.cart.map((item, index) => (
//                         <ListItem key={index} sx={{ py: 0 }}>
//                           <ListItemText
//                             primary={`${item.quantity}x ${item.name}`}
//                             secondary={`$${item.price} c/u - Total: $${(item.price * item.quantity).toFixed(2)}`}
//                           />
//                         </ListItem>
//                       ))}
//                     </List>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//               <CardActions sx={{ justifyContent: 'flex-end' }}>
//                 <Button
//                   size="small"
//                   startIcon={<EditIcon />}
//                   onClick={() => {
//                     const newNote = prompt('Agregar nota:', order.comments || '');
//                     if (newNote !== null) {
//                       updateOrder(order._id, { comments: newNote });
//                     }
//                   }}
//                   disabled={isUpdating}
//                 >
//                   Editar Nota
//                 </Button>
                
//                 {order.status === 'processing' && (
//                   <Button
//                     size="small"
//                     color="warning"
//                     startIcon={<PauseCircleIcon />}
//                     onClick={() => handleOrderAction('pause', order)}
//                     disabled={isUpdating}
//                   >
//                     Pausar
//                   </Button>
//                 )}
                
//                 {order.status === 'paused' && (
//                   <Button
//                     size="small"
//                     color="primary"
//                     startIcon={<PlayIcon />}
//                     onClick={() => handleOrderAction('resume', order)}
//                     disabled={isUpdating}
//                   >
//                     Reanudar
//                   </Button>
//                 )}
                
//                 {['pending', 'processing', 'paused'].includes(order.status) && (
//                   <Button
//                     size="small"
//                     color="success"
//                     startIcon={<CheckCircleIcon />}
//                     onClick={() => handleOrderAction('complete', order)}
//                     disabled={isUpdating}
//                   >
//                     Completar
//                   </Button>
//                 )}
                
//                 {order.status === 'finished' && (
//                   <Button
//                     size="small"
//                     color="success"
//                     startIcon={<DeliveryIcon />}
//                     onClick={() => handleOrderAction('deliver', order)}
//                     disabled={isUpdating}
//                   >
//                     Entregar
//                   </Button>
//                 )}
                
//                 {order.status !== 'cancelled' && (
//                   <Button
//                     size="small"
//                     color="error"
//                     startIcon={<CancelIcon />}
//                     onClick={() => handleOrderAction('cancel', order)}
//                     disabled={isUpdating}
//                   >
//                     Cancelar
//                   </Button>
//                 )}
                
//                 {order.status === 'cancelled' && (
//                   <Button
//                     size="small"
//                     color="primary"
//                     startIcon={<PlayIcon />}
//                     onClick={() => handleOrderAction('reopen', order)}
//                     disabled={isUpdating}
//                   >
//                     Reabrir
//                   </Button>
//                 )}
                
//                 <Button
//                   size="small"
//                   color="error"
//                   startIcon={<DeleteIcon />}
//                   onClick={() => {
//                     if (window.confirm('¿Estás seguro de eliminar esta orden?')) {
//                       deleteOrder(order._id);
//                     }
//                   }}
//                   disabled={isUpdating}
//                 >
//                   Eliminar
//                 </Button>
//               </CardActions>
//             </Card>
//           </Collapse>
//         ))}
//       </Paper>

//       {/* Panel de chat y logs */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
//             <Typography variant="h5" gutterBottom>
//               Chat en Tiempo Real
//             </Typography>
            
//             <Box sx={{ height: 300, overflowY: 'auto', mb: 2, p: 1, bgcolor: 'background.default' }}>
//               {messages.slice().reverse().map((msg, index) => (
//                 <Box key={msg.id || index} mb={2}>
//                   <Typography variant="subtitle2" color="text.secondary">
//                     {msg.name} - {new Date(msg.timestamp).toLocaleTimeString()}
//                   </Typography>
//                   <Typography 
//                     variant="body1" 
//                     sx={{ 
//                       p: 1, 
//                       bgcolor: msg.isOrder ? 'action.selected' : 'background.paper',
//                       borderRadius: 1
//                     }}
//                   >
//                     {msg.message}
//                   </Typography>
//                   <Divider sx={{ my: 1 }} />
//                 </Box>
//               ))}
//             </Box>
            
//             <Grid container spacing={1}>
//               <Grid item xs={9}>
//                 <TextField
//                   fullWidth
//                   value={newMessageText}
//                   onChange={(e) => setNewMessageText(e.target.value)}
//                   placeholder="Escribe un mensaje..."
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={3}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   onClick={handleSendMessage}
//                   disabled={!newMessageText.trim()}
//                 >
//                   Enviar
//                 </Button>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>
        
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
//             <Typography variant="h5" gutterBottom>
//               Logs de Eventos
//             </Typography>
//             <List sx={{ height: 370, overflowY: 'auto', bgcolor: 'background.default' }}>
//               {socketMessages.slice().reverse().map((msg, index) => (
//                 <ListItem key={index} sx={{ py: 0.5 }}>
//                   <ListItemText
//                     primary={
//                       <Typography 
//                         variant="body2" 
//                         color={
//                           msg.event.includes('error') ? 'error' : 
//                           msg.event.includes('connect') ? 'primary' : 
//                           'text.primary'
//                         }
//                         sx={{ fontFamily: 'monospace' }}
//                       >
//                         {msg.event}
//                       </Typography>
//                     }
//                     secondary={
//                       <>
//                         <Typography variant="caption" color="text.secondary">
//                           {new Date(msg.timestamp).toLocaleTimeString()}
//                         </Typography>
//                         <Typography variant="caption" display="block" sx={{ wordBreak: 'break-all' }}>
//                           {JSON.stringify(msg.data)}
//                         </Typography>
//                       </>
//                     }
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Notificaciones */}
//       <Snackbar
//         open={!!successMessage}
//         autoHideDuration={6000}
//         onClose={clearMessages}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert onClose={clearMessages} severity="success" sx={{ width: '100%' }}>
//           {successMessage}
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={clearMessages}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert onClose={clearMessages} severity="error" sx={{ width: '100%' }}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default OrderSpeedGeneric;

// function setError(arg0: string) {
//   throw new Error('Function not implemented.');
// }
