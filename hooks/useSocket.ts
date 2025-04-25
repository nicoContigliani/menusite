import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import io from "socket.io-client";

interface OrderItem {
  id: string;
  itemId: number;
  name: string;
  price: number;
  quantity: number;
  extras: Array<{
    name: string;
    price: number;
  }>;
  extrasTotal: number;
  Description: string;
}

export interface OrderData {
  _id: string;
  id?: string;
  orderType: string;
  dataTypeOrder: string;
  cart: OrderItem[];
  comments: string;
  companiesName: string;
  companiesID: string;
  email: string;
  fullname: string;
  phone: string;
  whathsapp: string;
  channel: string;
  name: string;
  status?: "pending" | "processing" | "paused" | "finished" | "cancelled" | "delivered";
  createdAt?: string;
  updatedAt?: string;
  timestamp?: string;
}

interface Message {
  name: string;
  message: string;
  isOrder: boolean;
  orderData?: OrderData;
  timestamp: string;
}

interface UseSocketChatReturn {
  name: string;
  setName: (name: string) => void;
  room: string;
  setRoom: (room: string) => void;
  message: string;
  setMessage: (message: string) => void;
  messages: Message[];
  // joinRoom: () => void;
  joinRoom: (room: any) => void;
  sendMessage: () => void;
  sendOrder: (orderDetails: OrderData, roomsname?: string) => void;
  parsedMessages: OrderData[] | any;
  isConnected: boolean;
  reconnectAttempts: number;
}

const useSocketChat = (socketUrl: any): UseSocketChatReturn => {
  const [socket, setSocket] = useState<any | null>(null);
  const socketRef = useRef<any | null>(null);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 30;
  const reconnectDelay = 5000;

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

 
  // }, [deepParseJson]);


  const processIncomingMessage = useCallback((data: { from: string; message: string }): Message => {
    try {
      const parsed = typeof data.message === 'string' ? deepParseJson(data.message) : data.message;

      if (parsed && typeof parsed === 'object' && (parsed._id || parsed.id)) {
        const orderData: OrderData = {
          ...parsed,
          _id: parsed._id || parsed.id,
          status: parsed.status || 'pending', // Valor por defecto
          timestamp: parsed.timestamp || new Date().toISOString()
        };

        return {
          name: data.from,
          message: `Orden recibida (ID: ${orderData._id})`,
          isOrder: true,
          orderData,
          timestamp: new Date().toISOString()
        };
      }

      return {
        name: data.from,
        message: typeof parsed === 'string' ? parsed : JSON.stringify(parsed),
        isOrder: false,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error processing message:', error);
      return {
        name: data.from,
        message: data.message,
        isOrder: false,
        timestamp: new Date().toISOString()
      };
    }
  }, [deepParseJson]);


  const initializeSocket = useCallback(() => {
    if (socketRef.current) return socketRef.current;

    const newSocket = io(socketUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      autoConnect: true,
      forceNew: true
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      setReconnectAttempts(0);
      console.log('Socket connected');
    });

    newSocket.on('disconnect', (reason: any) => {
      setIsConnected(false);
      console.log('Socket disconnected:', reason);

      if (reason === 'io server disconnect' || reason === 'io client disconnect') {
        setTimeout(() => {
          if (reconnectAttempts < maxReconnectAttempts) {
            console.log(`Attempting to reconnect (${reconnectAttempts + 1}/${maxReconnectAttempts})`);
            newSocket.connect();
            setReconnectAttempts(prev => prev + 1);
          }
        }, reconnectDelay);
      }
    });

    newSocket.on('connect_error', (err: any) => {
      console.log('Socket connection error:', err);
    });

    newSocket.on('new_message', (data: { from: string; message: string }) => {
      console.log('New message received:', data);
      const newMessage = processIncomingMessage(data);
      setMessages(prev => [...prev, newMessage]);
    });

    newSocket.on('joined_channel', (channel: string) => {
      console.log(`Successfully joined channel: ${channel}`);
    });

    socketRef.current = newSocket;
    setSocket(newSocket);
    return newSocket;
  }, [socketUrl, processIncomingMessage]);

  useEffect(() => {
    const newSocket = initializeSocket();
    return () => {
      newSocket.disconnect();
      socketRef.current = null;
    };
  }, [initializeSocket]);

  // Extract only order messages and normalize data
  const parsedMessages = useMemo(() => {
    return messages
      .filter(msg => msg.isOrder && msg.orderData)
      .map(msg => ({
        ...msg.orderData!,
        _id: msg.orderData!._id || msg.orderData!.id,
        timestamp: msg.timestamp
      }));
  }, [messages]);

  // const joinRoom = useCallback(() => {
  //   if (name && room && socket && isConnected) {
  //     console.log(`Joining room: ${room}`);
  //     socket.emit('join_channel', room);
  //   }
  // }, [name, room, socket, isConnected]);

  // En useSocketChat.ts
  const joinRoom: any = useCallback((roomName?: any) => {
    const targetRoom = roomName || room;
    if (name && targetRoom && socket && isConnected) {
      console.log(`Joining room: ${targetRoom}`);
      socket.emit('join_channel', targetRoom);
    }
  }, [name, room, socket, isConnected]);

  // Y actualiza el efecto que maneja la conexión
  useEffect(() => {
    if (name && room && isConnected) {
      joinRoom();
      console.log(`Unido a la sala: ${room} como ${name}`);
    }
  }, [name, room, isConnected, joinRoom]);




  const sendMessage = useCallback(() => {
    if (message && room && socket) {
      socket.emit('send_message', {
        channel: room,
        name,
        message,
      });
      setMessage('');
    }
  }, [message, room, socket, name]);

  const sendOrder = useCallback((orderDetails: OrderData, roomsname?: string) => {
    if (socket) {
      const targetRoom = roomsname || room;
      const orderWithMetadata: OrderData = {
        ...orderDetails,
        channel: targetRoom,
        name: name || 'System',
        timestamp: new Date().toISOString(),
      };

      console.log('Sending order update:', orderWithMetadata);

      // Update local state immediately for better UX
      setMessages(prev => [...prev, {
        name: name || 'System',
        message: `Orden actualizada (ID: ${orderDetails._id})`,
        isOrder: true,
        orderData: orderWithMetadata,
        timestamp: new Date().toISOString()
      }]);

      socket.emit('send_message', {
        channel: targetRoom,
        name: name || 'System',
        message: JSON.stringify(orderWithMetadata),
      });
    }
  }, [room, socket, name]);

  return {
    name,
    setName,
    room,
    setRoom,
    message,
    setMessage,
    messages,
    joinRoom,
    sendMessage,
    sendOrder,
    parsedMessages,
    isConnected,
    reconnectAttempts
  };
};

export default useSocketChat;