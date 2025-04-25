import { useState, useCallback } from 'react';

interface UseChatResetProps {
  messages: any[];
  setMessages: (messages: any[]) => void;
  socket: any; // Reemplaza 'any' con el tipo correcto de tu socket (SocketIOClient.Socket)
  initializeSocket: () => any;
  currentRoom: string;
  currentName: string;
}

interface UseChatResetReturn {
  resetAllMessages: () => void;
  reconnectSocket: () => void;
  keepOnlyOrderMessages: () => void;
  clearMessagesByCompany: (companyName: string) => void;
  isResetting: boolean;
}

const useChatReset = ({
  messages,
  setMessages,
  socket,
  initializeSocket,
  currentRoom,
  currentName,
}: UseChatResetProps): UseChatResetReturn => {
  const [isResetting, setIsResetting] = useState(false);

  // 1️⃣ Limpiar TODOS los mensajes
  const resetAllMessages = useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  // 2️⃣ Reconectar el socket (útil si hay problemas de conexión)
  const reconnectSocket = useCallback(() => {
    setIsResetting(true);
    if (socket) {
      socket.disconnect();
      const newSocket = initializeSocket();
      if (currentName && currentRoom) {
        newSocket.emit('join_channel', currentRoom);
      }
    }
    setIsResetting(false);
  }, [socket, initializeSocket, currentRoom, currentName]);

  // 3️⃣ Mantener solo mensajes de órdenes (elimina mensajes de texto normales)
  const keepOnlyOrderMessages = useCallback(() => {
    setMessages(messages.filter(msg => msg.isOrder));
  }, [messages, setMessages]);

  // 4️⃣ Limpiar mensajes de una compañía específica
  const clearMessagesByCompany = useCallback((companyName: string) => {
    setMessages(messages.filter(msg => {
      if (msg.isOrder && msg.orderData) {
        return msg.orderData.companiesName !== companyName;
      }
      return true; // Mantener mensajes que no son órdenes
    }));
  }, [messages, setMessages]);

  return {
    resetAllMessages,
    reconnectSocket,
    keepOnlyOrderMessages,
    clearMessagesByCompany,
    isResetting,
  };
};

export default useChatReset;