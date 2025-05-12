"use client"
import { useState, useEffect } from "react"
import { useOrderUpdates } from "./useOrderUpdates"
import useSocketChat from "./useSocket"
import { socketHost } from "@/services/socketHost.services"

export interface OrderItem {
  id: string
  itemId: number
  name: string
  price: number
  quantity: number
  extras?: Array<{
    name: string
    price: number
  }>
  extrasTotal?: number
  Description: string
}

export interface Order {
  _id: string
  id: string
  orderType: string
  dataTypeOrder: string
  cart: OrderItem[]
  fullname: string
  timestamp: string
  createdAt: string
  status: "pending" | "processing" | "paused" | "finished" | "cancelled" | "delivered"
  [key: string]: any
}

export interface OrdersByStatus {
  pending?: Order[]
  processing?: Order[]
  paused?: Order[]
  finished?: Order[]
  cancelled?: Order[]
  delivered?: Order[]
}

interface UseOrdersManagementProps {
  companyName?: string
  userEmail?: string
  socketUrl?: string
  orderLimit?: number
  statusesToFetch?: string
  sortDirection?: "asc" | "desc"
}

export function useOrdersManagement({
  companyName,
  userEmail,
  socketUrl = 'https://socketserver-t4g9.onrender.com',
  orderLimit = 50,
  statusesToFetch = "pending,processing,paused,finished,cancelled,delivered",
  sortDirection = "desc",
}: UseOrdersManagementProps) {
  const [historicalOrders, setHistoricalOrders] = useState<Order[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  const [ordersByStatus, setOrdersByStatus] = useState<OrdersByStatus>({})

  const { updateOrderStatus, updateOrder, isUpdating, updateError, successMessage, clearMessages, setUpdateError } =
    useOrderUpdates()

  const { name, setName, room, setRoom, parsedMessages, isConnected, reconnectAttempts, joinRoom } = useSocketChat(socketUrl)
  console.log("🚀 ~ parsedMessages:", parsedMessages)

  // Fetch historical orders
  const fetchHistoricalOrders = async () => {
    if (!companyName) return

    setIsLoadingHistory(true)
    setError(null)

    try {
      // const params = new URLSearchParams({
      //   status: statusesToFetch,
      //   sort: sortDirection,
      //   limit: orderLimit.toString(),
      //   company: companyName,
      // })


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


      const res = await fetch(`/api/orders?${params}`)
      if (!res.ok) throw new Error(`Error: ${res.status}`)

      const orders = await res.json()
      setHistoricalOrders(Array.isArray(orders) ? orders : [])
      setLastRefresh(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
      console.error("Error fetching historical orders:", err)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  // Process and group orders by status
  useEffect(() => {
    if (!parsedMessages || parsedMessages.length === 0) return

    // Procesar solo mensajes que son órdenes
    const socketOrders = parsedMessages.filter((msg: any) => msg._id && msg.status)

    setHistoricalOrders(prev => {
      // Filtrar para evitar duplicados
      const newOrders = socketOrders.filter(
        (newOrder: any) => !prev.some((existingOrder: any) => existingOrder._id === newOrder._id)
      )

      // Actualizar órdenes existentes si hay cambios
      const updatedOrders = prev.map(existingOrder => {
        const updatedOrder = socketOrders.find(
          (newOrder: any) => newOrder._id === existingOrder._id &&
            newOrder.updatedAt > existingOrder.updatedAt
        )
        return updatedOrder || existingOrder
      })

      return [...updatedOrders, ...newOrders]
    })
  }, [parsedMessages])

  // Group orders by status
  useEffect(() => {
    const groupedOrders = historicalOrders.reduce(
      (acc: Record<string, Order[]>, order: Order) => {
        const status = order.status.toLowerCase()
        if (!acc[status]) {
          acc[status] = []
        }
        acc[status].push(order)
        return acc
      },
      {} as Record<string, Order[]>
    )

    setOrdersByStatus(groupedOrders)
  }, [historicalOrders])

  const handleOrderAction = async (action: string, order: Order) => {
    try {
      let newStatus: Order["status"] = order.status

      switch (action) {
        case "start":
          newStatus = "processing"
          break
        case "pause":
          newStatus = "paused"
          break
        case "resume":
          newStatus = "processing"
          break
        case "complete":
          newStatus = "finished"
          break
        case "deliver":
          newStatus = "delivered"
          break
        case "cancel":
          newStatus = "cancelled"
          break
        case "reopen":
          newStatus = "pending"
          break
        default:
          return
      }

      await updateOrderStatus(order._id, newStatus)

      // Actualizar el estado local
      setHistoricalOrders(prev =>
        prev.map(o => o._id === order._id ? { ...o, status: newStatus } : o)
      )
    } catch (error) {
      console.error("Error handling order action:", error)
    }
  }

  const handleOrderUpdateAction = async (action: string, order: Order) => {
    try {
      await updateOrder(order._id, order)
    } catch (error) {
      console.error("Error handling order update:", error)
    }
  }

  // Initial setup
  useEffect(() => {
    if (userEmail) setName(userEmail)
    if (companyName) {
      const channel = `kitchen-${companyName}` as string
      setRoom(channel)
      joinRoom(channel)

      fetchHistoricalOrders()
    }
  }, [userEmail, companyName, setName, setRoom, joinRoom])

  return {
    historicalOrders,
    ordersByStatus,
    lastRefresh,
    isLoadingHistory,
    isUpdating,
    error,
    updateError,
    successMessage,
    isConnected,
    reconnectAttempts,
    fetchHistoricalOrders,
    handleOrderAction,
    handleOrderUpdateAction,
    clearMessages,
    setUpdateError,
    setError,
    room,
    name,
  }
}