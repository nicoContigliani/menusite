"use client"
import { useState, useEffect } from "react"
import { useOrderUpdatesGeneral } from "./useOrderUpdatesGeneral"
import useSocketChat from "./useSocket"

export interface Order {
  _id: string
  id: string
  status: "pending" | "processing" | "paused" | "finished" | "cancelled" | "delivered"
  [key: string]: any
}

interface UseOrdersManagementProps {
  companyName?: any
  userEmail?: any
  socketUrl?: string
}

export function useOrdersManagemenUpdate({
  companyName,
  userEmail,
  socketUrl = "https://socketserver-t4g9.onrender.com",
}: UseOrdersManagementProps) {

  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState<string | null>(null)

  const { updateCompleteOrder, isUpdating, updateError, successMessage, clearMessages } =
    useOrderUpdatesGeneral()

  const {
    setName,
    setRoom,
    sendOrder,
    parsedMessages,
    isConnected,
    reconnectAttempts,
    joinRoom
  } = useSocketChat(socketUrl)

  useEffect(() => {
    // Establece nombre y sala al conectar
    if (userEmail) setName(userEmail)
    if (companyName) {
      const room = `kitchen-${companyName}`
      setRoom(room)
      joinRoom(room)
    }
  }, [userEmail, companyName])

  useEffect(() => {
    if (!parsedMessages || parsedMessages.length === 0) return

    const newOrders = parsedMessages.filter((msg: any) => msg._id && msg.status)
    setOrders(prev => {
      const existingIds = new Set(prev.map(o => o._id))
      const merged = [...prev]

      for (const newOrder of newOrders) {
        const index = merged.findIndex(o => o._id === newOrder._id)
        if (index !== -1) {
          merged[index] = newOrder // Actualiza existente
        } else {
          merged.push(newOrder) // Agrega nueva
        }
      }

      return merged
    })
  }, [parsedMessages])

  //posible error 
  const handleOrderAction = async (order: any) => {
    try {
      await updateCompleteOrder(order._id, order)
      sendOrder(order)

      setOrders(prev =>
        prev.map(o => (o._id === order._id ? { ...o, ...order } : o))
      )
    } catch (err) {
      console.error("Error updating order:", err)
      setError("Error updating order")
    }
  }

  return {
    orders,
    isUpdating,
    updateError,
    successMessage,
    isConnected,
    reconnectAttempts,
    handleOrderAction,
    clearMessages,
    error,
    setError,
  }
}
