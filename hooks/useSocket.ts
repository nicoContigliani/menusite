import { useState, useEffect, useCallback } from 'react';
import io from "socket.io-client";

const NEXT_PUBLIC_NODE_ENV: string = process.env.NEXT_PUBLIC_NEXT_PUBLIC_NODE_ENV || "";


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

interface OrderData {
  id: string;
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
  name: any;
  setName: (name: any) => void;
  room: any;
  setRoom: (room: any) => void;
  message: any;
  setMessage: (message: any) => void;
  messages: Message[];
  joinRoom: () => void;
  sendMessage: () => void;
  sendOrder: (orderDetails: OrderData, roomsname: any | undefined) => void;
  parsedMessages: Array<OrderData | any>;
  isConnected: boolean;
  reconnectAttempts: number;
}

const useSocketChat = (socketUrl: string): UseSocketChatReturn => {
  const [socket, setSocket] = useState<any | null>(null);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [parsedMessages, setParsedMessages] = useState<Array<OrderData | string>>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 5000; // 5 segundos

  // Función para parsear profundamente JSON anidado
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

  // Procesar mensajes entrantes
  const processIncomingMessage = useCallback((data: { from: string; message: string }): Message => {
    const parsed = deepParseJson(data.message);

    if (parsed && typeof parsed === 'object' && parsed.id) {
      return {
        name: data.from,
        message: `Orden recibida (ID: ${parsed.id})`,
        isOrder: true,
        orderData: parsed,
        timestamp: new Date().toISOString()
      };
    }

    return {
      name: data.from,
      message: typeof parsed === 'string' ? parsed : data.message,
      isOrder: false,
      timestamp: new Date().toISOString()
    };
  }, [deepParseJson]);

  // Función para inicializar el socket
  const initializeSocket = useCallback(() => {
    const newSocket = io(socketUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      autoConnect: true,
      forceNew: true
    });

    // Event listeners
    newSocket.on('connect', () => {
      setIsConnected(true);
      setReconnectAttempts(0);

      if (NEXT_PUBLIC_NODE_ENV === "development") console.log('✅ Socket conectado');

      // Reunirse a la sala si ya tenemos nombre y sala
      if (name && room) {
        newSocket.emit('join_channel', room);
      }
    });

    newSocket.on('disconnect', (reason: any) => {
      setIsConnected(false);
      if (NEXT_PUBLIC_NODE_ENV === "development") console.log('❌ Socket desconectado:', reason);

      if (reason === 'io server disconnect' || reason === 'io client disconnect') {
        setTimeout(() => {
          if (reconnectAttempts < maxReconnectAttempts) {
            if (NEXT_PUBLIC_NODE_ENV === "development") console.log(`🔁 Intentando reconectar (${reconnectAttempts + 1}/${maxReconnectAttempts})`);
            newSocket.connect();
            setReconnectAttempts(prev => prev + 1);
          }
        }, reconnectDelay);
      }
    });

    newSocket.on('reconnect_attempt', (attempt: any) => {
      if (NEXT_PUBLIC_NODE_ENV === "development") console.log(`🔁 Intento de reconexión ${attempt}`);
    });

    newSocket.on('reconnect_error', (error: any) => {
      if (NEXT_PUBLIC_NODE_ENV === "development") console.log('⚠️ Error de reconexión:', error);
    });

    newSocket.on('reconnect_failed', () => {
      if (NEXT_PUBLIC_NODE_ENV === "development") console.log('❌ Reconexión fallida');
    });

    newSocket.on('new_message', (data: { from: string; message: string }) => {
      const newMessage = processIncomingMessage(data);
      setMessages(prev => [...prev, newMessage]);
    });

    setSocket(newSocket);
    return newSocket;
  }, [socketUrl, name, room, reconnectAttempts, processIncomingMessage]);

  // Efecto para inicializar el socket
  useEffect(() => {
    const newSocket = initializeSocket();

    return () => {
      newSocket.disconnect();
      if (NEXT_PUBLIC_NODE_ENV === "development") console.log('🔌 Socket desconectado (cleanup)');
    };
  }, [initializeSocket]);

  // Efecto para reconexión periódica si está desconectado
  useEffect(() => {
    if (!isConnected && socket && reconnectAttempts < maxReconnectAttempts) {
      const timer = setTimeout(() => {
        if (NEXT_PUBLIC_NODE_ENV === "development") console.log(`🔁 Intentando reconexión manual (${reconnectAttempts + 1}/${maxReconnectAttempts})`);
        socket.connect();
        setReconnectAttempts(prev => prev + 1);
      }, reconnectDelay);

      return () => clearTimeout(timer);
    }
  }, [isConnected, socket, reconnectAttempts]);

  // Actualizar parsedMessages cuando cambian los mensajes
  useEffect(() => {
    const newParsedMessages = messages.map(msg => {
      return msg.isOrder && msg.orderData ? msg.orderData : msg.message;
    });
    setParsedMessages(newParsedMessages);
  }, [messages]);

  const joinRoom = useCallback(() => {
    if (name && room && socket) {
      socket.emit('join_channel', room);
      if (NEXT_PUBLIC_NODE_ENV === "development") console.log(`🚪 Uniéndose a la sala: ${room}`);
    }
  }, [name, room, socket]);

  const sendMessage = useCallback(() => {
    if (message && room && socket) {
      socket.emit('send_message', {
        channel: room,
        name,
        message,
      });
      console.log(`✉️ Mensaje enviado a ${room}`);
      setMessage('');
    }
  }, [message, room, socket, name]);

  const sendOrder = useCallback((orderDetails: OrderData, roomsname: any | undefined) => {
    if (room && socket) {
      const orderWithMetadata: OrderData = {
        ...orderDetails,
        channel: roomsname || room,
        name: name || 'System',
        timestamp: new Date().toISOString(),
      };

      socket.emit('send_message', {
        channel: room,
        name: name || 'System',
        message: JSON.stringify(orderWithMetadata),
      });
      console.log(`🛒 Orden enviada a ${room}`);
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