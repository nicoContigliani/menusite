"use client"

import { useEffect, useState, useRef } from "react"
import { default as socketIOClient } from "socket.io-client"
import type { ChatMessage } from "../types/socket"

export const useSocket = () => {
  // Usar una referencia para evitar múltiples conexiones
  const socketRef = useRef<any>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // Usar una referencia para controlar si ya se ha inicializado
  const isInitializedRef = useRef(false)

  useEffect(() => {
    // Evitar inicialización múltiple (especialmente en Strict Mode)
    if (isInitializedRef.current) return

    isInitializedRef.current = true

    // Initialize socket connection
    const socketInitializer = async () => {
      try {
        // Make sure the Socket.IO server is running
        await fetch("/api/socket")

        // Crear una sola instancia del socket
        if (!socketRef.current) {
          console.log("Initializing socket connection...")

          socketRef.current = socketIOClient({
            path: "/api/socket",
            // Evitar reconexiones automáticas múltiples
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            // Evitar conexiones duplicadas
            transports: ["websocket"],
          })

          // Limpiar listeners anteriores para evitar duplicados
          socketRef.current.off("connect")
          socketRef.current.off("disconnect")
          socketRef.current.off("message")

          socketRef.current.on("connect", () => {
            console.log("Connected to Socket.IO with ID:", socketRef.current.id)
            setIsConnected(true)
          })

          socketRef.current.on("disconnect", () => {
            console.log("Disconnected from Socket.IO")
            setIsConnected(false)
          })

          socketRef.current.on("message", (message: ChatMessage) => {
            console.log("Message received:", message)
            // Usar un callback funcional para evitar problemas con cierres
            setMessages((prev) => {
              // Evitar duplicados verificando si el mensaje ya existe
              if (prev.some((msg) => msg.id === message.id)) {
                return prev
              }
              return [...prev, message]
            })
          })
        }
      } catch (error) {
        console.error("Socket initialization error:", error)
      }
    }

    socketInitializer()

    // Cleanup function
    return () => {
      if (socketRef.current) {
        console.log("Disconnecting socket...")
        socketRef.current.disconnect()
      }
    }
  }, []) // Dependencias vacías para ejecutar solo una vez

  // Function to send a message
  const sendMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    if (socketRef.current && isConnected) {
      const fullMessage: ChatMessage = {
        ...message,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
      }
      console.log("Sending message:", fullMessage)
      socketRef.current.emit("message", fullMessage)
    } else {
      console.warn("Cannot send message: Socket not connected")
    }
  }

  return {
    socket: socketRef.current,
    isConnected,
    messages,
    sendMessage,
  }
}

