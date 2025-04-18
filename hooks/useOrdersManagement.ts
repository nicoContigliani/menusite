"use client"

import { useState, useEffect } from "react"
import { useOrderUpdates } from "./useOrderUpdates"
import useSocketChat from "./useSocket"

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
  socketUrl = "https://socketserver-t4g9.onrender.com",
  orderLimit = 50,
  statusesToFetch = "processing,finished,cancelled,delivered",
  sortDirection = "desc",
}: UseOrdersManagementProps) {
  // State management
  const [historicalOrders, setHistoricalOrders] = useState<Order[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  const [ordersByStatus, setOrdersByStatus] = useState<OrdersByStatus>({})

  // Custom hooks
  const { updateOrderStatus, isUpdating, updateError, successMessage, clearMessages, setUpdateError } =
    useOrderUpdates()

  const { name, setName, room, setRoom, parsedMessages, isConnected, reconnectAttempts, joinRoom } =
    useSocketChat(socketUrl)

  // Fetch historical orders
  const fetchHistoricalOrders = async () => {
    if (!companyName) return

    setIsLoadingHistory(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        status: statusesToFetch,
        sort: sortDirection,
        limit: orderLimit.toString(),
        company: companyName,
      })

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
    const socketOrders = Array.isArray(parsedMessages) ? parsedMessages : []
    const allOrders = [...historicalOrders, ...socketOrders]

    // Remove duplicates by ID
    const uniqueOrders = allOrders.reduce((acc: Order[], current: Order) => {
      if (!acc.some((item) => item._id === current._id)) {
        acc.push(current)
      }
      return acc
    }, [])

    // Group by status
    const groupedOrders = uniqueOrders.reduce(
      (acc: Record<string, Order[]>, order: Order) => {
        const status = order.status.toLowerCase()
        if (!acc[status]) {
          acc[status] = []
        }
        acc[status].push(order)
        return acc
      },
      {} as Record<string, Order[]>,
    )

    setOrdersByStatus(groupedOrders)
  }, [historicalOrders, parsedMessages])

  // Handle order actions
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

      // Update local state
      setHistoricalOrders((prev) => prev.map((o) => (o._id === order._id ? { ...o, status: newStatus } : o)))
    } catch (error) {
      console.error("Error handling order action:", error)
    }
  }

  // Initial setup
  useEffect(() => {
    if (userEmail) setName(userEmail)
    if (companyName) {
      setRoom(`kichent-${companyName}` || "")
      fetchHistoricalOrders()
    }
  }, [userEmail, companyName, setName, setRoom])

  return {
    // Data
    historicalOrders,
    ordersByStatus,
    lastRefresh,

    // Status
    isLoadingHistory,
    isUpdating,
    error,
    updateError,
    successMessage,
    isConnected,
    reconnectAttempts,

    // Actions
    fetchHistoricalOrders,
    handleOrderAction,
    clearMessages,
    setUpdateError,
    setError,

    // Socket info
    room,
    name,
  }
}

