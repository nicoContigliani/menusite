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