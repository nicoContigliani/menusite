

// "use client"
// import { useState, useEffect } from "react"
// import { useOrderUpdates } from "./useOrderUpdates"
// import useSocketChat from "./useSocket"
// import { useOrderUpdatesGeneral } from "./useOrderUpdatesGeneral"

// export interface OrderItem {
//   id: string
//   itemId: number
//   name: string
//   price: number
//   quantity: number
//   extras?: Array<{
//     name: string
//     price: number
//   }>
//   extrasTotal?: number
//   Description: string
// }

// export interface Order {
//   _id: string
//   id: string
//   orderType: string
//   dataTypeOrder: string
//   cart: OrderItem[]
//   fullname: string
//   timestamp: string
//   createdAt: string
//   status: "pending" | "processing" | "paused" | "finished" | "cancelled" | "delivered"
//   [key: string]: any
// }

// export interface OrdersByStatus {
//   pending?: Order[]
//   processing?: Order[]
//   paused?: Order[]
//   finished?: Order[]
//   cancelled?: Order[]
//   delivered?: Order[]
// }

// interface UseOrdersManagementProps {
//   companyName?: string
//   userEmail?: string
//   socketUrl?: string
//   orderLimit?: number
//   statusesToFetch?: string
//   sortDirection?: "asc" | "desc"
//   ordersUpdate: any | any[]

// }

// export function useOrdersManagemenUpdate({
//   companyName,
//   userEmail,
//   socketUrl = "https://socketserver-t4g9.onrender.com",
//   orderLimit = 50,
//   statusesToFetch = "pending,processing,paused,finished,cancelled,delivered",
//   sortDirection = "desc",
//   ordersUpdate,

// }: UseOrdersManagementProps) {
//   const [historicalOrders, setHistoricalOrders] = useState<Order[]>([])
//   const [isLoadingHistory, setIsLoadingHistory] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
//   const [ordersByStatus, setOrdersByStatus] = useState<OrdersByStatus>({})

//   const { updateCompleteOrder, isUpdating, updateError, successMessage, clearMessages, } =
//     useOrderUpdatesGeneral()

//   const { name,
//     setName,
//     room,
//     setRoom,
//     message,
//     setMessage,
//     messages,
//     joinRoom,
//     sendMessage,
//     sendOrder,
//     parsedMessages,
//     isConnected,
//     reconnectAttempts } = useSocketChat(socketUrl)
//   console.log("🚀 ~ parsedMessages:", parsedMessages)

//   // Fetch historical orders
//   const fetchHistoricalOrders = async () => {
//     if (!companyName) return

//     setIsLoadingHistory(true)
//     setError(null)

//     try {
//       const params = new URLSearchParams({
//         status: statusesToFetch,
//         sort: sortDirection,
//         limit: orderLimit.toString(),
//         company: companyName,
//       })

//       const res = await fetch(`/api/orders?${params}`)
//       if (!res.ok) throw new Error(`Error: ${res.status}`)

//       const orders = await res.json()
//       setHistoricalOrders(Array.isArray(orders) ? orders : [])
//       setLastRefresh(new Date())
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Error desconocido")
//       console.error("Error fetching historical orders:", err)
//     } finally {
//       setIsLoadingHistory(false)
//     }
//   }

//   // Process and group orders by status
//   useEffect(() => {
//     if (!parsedMessages || parsedMessages.length === 0) return

//     // Procesar solo mensajes que son órdenes
//     const socketOrders = parsedMessages.filter((msg: any) => msg._id && msg.status)

//     setHistoricalOrders(prev => {
//       // Filtrar para evitar duplicados
//       const newOrders = socketOrders.filter(
//         (newOrder: any) => !prev.some((existingOrder: any) => existingOrder._id === newOrder._id)
//       )

//       // Actualizar órdenes existentes si hay cambios
//       const updatedOrders = prev.map(existingOrder => {
//         const updatedOrder = socketOrders.find(
//           (newOrder: any) => newOrder._id === existingOrder._id &&
//             newOrder.updatedAt > existingOrder.updatedAt
//         )
//         return updatedOrder || existingOrder
//       })

//       return [...updatedOrders, ...newOrders]
//     })
//   }, [parsedMessages])

//   // Group orders by status
//   useEffect(() => {
//     const groupedOrders = historicalOrders.reduce(
//       (acc: Record<string, Order[]>, order: Order) => {
//         const status = order.status.toLowerCase()
//         if (!acc[status]) {
//           acc[status] = []
//         }
//         acc[status].push(order)
//         return acc
//       },
//       {} as Record<string, Order[]>
//     )

//     setOrdersByStatus(groupedOrders)
//   }, [historicalOrders])

//   const handleOrderAction = async (action: string, order: Order) => {
//     try {


//       await updateCompleteOrder(ordersUpdate._id, ordersUpdate)

//       // Actualizar el estado local
//       setHistoricalOrders(prev =>
//         prev.map(o => o._id === order._id ? { ...o, ordersUpdate } : o)
//       )
//     } catch (error) {
//       console.error("Error handling order action:", error)
//     }
//   }

//   const handleOrderUpdateAction = async (action: string, order: Order) => {

//   }

//   // Initial setup
//   useEffect(() => {
//     if (userEmail) setName(userEmail)
//     if (companyName) {
//       const channel = `kitchen-${companyName}` as string
//       setRoom(channel)
//       joinRoom(channel)

//       fetchHistoricalOrders()
//     }
//   }, [userEmail, companyName, setName, setRoom, joinRoom])

//   return {
//     historicalOrders,
//     ordersByStatus,
//     lastRefresh,
//     isLoadingHistory,
//     isUpdating,
//     error,
//     updateError,
//     successMessage,
//     isConnected,
//     reconnectAttempts,
//     fetchHistoricalOrders,
//     handleOrderAction,

//     handleOrderUpdateAction,
//     clearMessages,
//     setError,
//     room,
//     name,
//   }
// }



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
  console.log("🚀 ~ userEmail:", userEmail)
  console.log("🚀 ~ companyName:", companyName)
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
