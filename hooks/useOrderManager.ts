"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid";

interface Order {
  id: string
  Name: string
  Description: string
  Price: any
  extra: any[]
  Item_Image: any
}

const useOrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([])

  const addOrder = async (order: Omit<Order, "id">): Promise<void> => {
    return new Promise((resolve) => {
      const newOrder = { ...order, id: uuidv4() }
      setOrders((prevOrders) => [...prevOrders, newOrder])
      resolve() // Resuelve la promesa
    })
  }

  const editOrder = (id: string, updatedOrder: Partial<Order>) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === id ? { ...order, ...updatedOrder } : order)),
    )
  }

  const deleteOrder = (id: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id))
  }

  return {
    orders,
    addOrder,
    editOrder,
    deleteOrder,
  }
}

export default useOrderManager