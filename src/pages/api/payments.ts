// import type { NextApiRequest, NextApiResponse } from "next"
// import clientPromise from "../../../lib/mongoose"
// import { ObjectId } from "mongodb"

// interface PaymentMethod {
//   method: string
//   amount: number
//   received?: number
//   change?: number
//   [key: string]: any // Para propiedades adicionales
// }

// interface PaymentData {
//   total: number
//   paid: number
//   methods: PaymentMethod[]
// }

// interface Payment {
//   _id?: ObjectId
//   orderId: string // ID de orden como string
//   payment: PaymentData
//   status: "pending" | "completed" | "failed" | "refunded"
//   companyName: string
//   companyId: string | ObjectId
//   createdAt?: Date
//   updatedAt?: Date
//   version?: number
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // const client = await clientPromise
//   // const db = client.db("menuDB")
//   const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
//   const client = await clientPromise;
//   const db = client.db(dbName);
//   const paymentsCollection = db.collection("payments")

//   try {
//     switch (req.method) {
//       case "GET":
//         await handleGetPayments(req, res, paymentsCollection)
//         break
//       case "POST":
//         await handleCreatePayment(req, res, paymentsCollection)
//         break
//       case "PUT":
//         await handleUpdatePayment(req, res, paymentsCollection)
//         break
//       case "DELETE":
//         await handleDeletePayment(req, res, paymentsCollection)
//         break
//       default:
//         res.status(405).json({ error: "Method not allowed" })
//     }
//   } catch (error) {
//     console.error("Error in payments API:", error)
//     res.status(500).json({ error: "Internal server error" })
//   }
// }

// // GET - Obtener pagos
// async function handleGetPayments(req: NextApiRequest, res: NextApiResponse, collection: any) {
//   const { id, orderId, companyId, status, dateFrom, dateTo, sort = "desc" } = req.query

//   const query: any = {}

//   if (id) {
//     try {
//       query._id = new ObjectId(id as string)
//     } catch {
//       return res.status(400).json({ error: "Invalid payment ID format" })
//     }
//   }

//   if (orderId) {
//     query.orderId = orderId
//   }

//   if (companyId) {
//     try {
//       query.companyId = new ObjectId(companyId as string)
//     } catch {
//       return res.status(400).json({ error: "Invalid company ID format" })
//     }
//   }

//   if (status) {
//     query.status = status
//   }

//   if (dateFrom || dateTo) {
//     query.createdAt = {}
//     if (dateFrom) query.createdAt.$gte = new Date(dateFrom as string)
//     if (dateTo) query.createdAt.$lte = new Date(dateTo as string)
//   }

//   const sortOption = { createdAt: sort === "asc" ? 1 : -1 }

//   try {
//     // Special case: Return only orderIds for a company within a time range
//     if (req.query.onlyOrderIds === "true") {
//       const ordersIdList = await collection.find(query).project({ orderId: 1, _id: 0 }).sort(sortOption).toArray()
//       return res.status(200).json(ordersIdList.map((item: any) => item.orderId))
//     }

//     // Regular case handling
//     if (id) {
//       const payment = await collection.findOne(query)
//       if (!payment) return res.status(404).json({ error: "Payment not found" })
//       return res.status(200).json(payment)
//     } else {
//       const payments = await collection.find(query).sort(sortOption).toArray()
//       return res.status(200).json(payments)
//     }
//   } catch (error) {
//     console.error("Error fetching payments:", error)
//     return res.status(500).json({ error: "Error fetching payments" })
//   }
// }

// // POST - Crear nuevo pago
// async function handleCreatePayment(req: NextApiRequest, res: NextApiResponse, collection: any) {
//   const paymentData: Payment = req.body

//   // Validaciones básicas
//   if (!paymentData.orderId) {
//     return res.status(400).json({ error: "orderId is required" })
//   }

//   if (!paymentData.payment || !paymentData.payment.total || paymentData.payment.total <= 0) {
//     return res.status(400).json({ error: "Valid payment total is required" })
//   }

//   if (!paymentData.payment.methods || paymentData.payment.methods.length === 0) {
//     return res.status(400).json({ error: "At least one payment method is required" })
//   }

//   if (!paymentData.companyName) {
//     return res.status(400).json({ error: "companyName is required" })
//   }

//   if (!paymentData.companyId) {
//     return res.status(400).json({ error: "companyId is required" })
//   }

//   try {
//     const newPayment = {
//       ...paymentData,
//       companyId: new ObjectId(paymentData.companyId),
//       status: paymentData.status || "completed",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       version: 1,
//     }

//     const result = await collection.insertOne(newPayment)
//     const createdPayment = await collection.findOne({ _id: result.insertedId })
//     return res.status(201).json(createdPayment)
//   } catch (error) {
//     console.error("Error creating payment:", error)
//     return res.status(500).json({ error: "Error creating payment" })
//   }
// }

// // PUT - Actualizar pago
// async function handleUpdatePayment(req: NextApiRequest, res: NextApiResponse, collection: any) {
//   const { id } = req.query
//   const updateData: Partial<Payment> = req.body

//   if (!id) {
//     return res.status(400).json({ error: "Payment ID is required" })
//   }

//   try {
//     const currentPayment = await collection.findOne({ _id: new ObjectId(id as string) })
//     if (!currentPayment) {
//       return res.status(404).json({ error: "Payment not found" })
//     }

//     // Validación de versión para evitar conflictos
//     if (updateData.version && updateData.version !== currentPayment.version) {
//       return res.status(409).json({
//         error: "Conflict",
//         message: "Payment was modified by another user",
//         currentPayment: currentPayment,
//       })
//     }

//     // Preparar la actualización
//     const update: any = {
//       $set: {
//         ...updateData,
//         ...(updateData.companyId && { companyId: new ObjectId(updateData.companyId) }),
//         updatedAt: new Date(),
//       },
//       $inc: { version: 1 },
//     }

//     // Manejo especial para el objeto payment
//     if (updateData.payment) {
//       update.$set.payment = {
//         ...currentPayment.payment,
//         ...updateData.payment,
//         methods: updateData.payment.methods || currentPayment.payment.methods,
//       }
//     }

//     // Campos protegidos que no deben actualizarse
//     delete update.$set._id
//     delete update.$set.createdAt
//     delete update.$set.version

//     // Ejecutar la actualización
//     const result = await collection.findOneAndUpdate({ _id: new ObjectId(id as string) }, update, {
//       returnDocument: "after",
//     })

//     return res.status(200).json(result.value)
//   } catch (error) {
//     console.error("Error updating payment:", error)
//     return res.status(500).json({ error: "Error updating payment" })
//   }
// }

// // DELETE - Eliminar pago
// async function handleDeletePayment(req: NextApiRequest, res: NextApiResponse, collection: any) {
//   const { id } = req.query

//   if (!id) {
//     return res.status(400).json({ error: "Payment ID is required" })
//   }

//   try {
//     const result = await collection.deleteOne({ _id: new ObjectId(id as string) })

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ error: "Payment not found" })
//     }

//     return res.status(200).json({ message: "Payment deleted successfully" })
//   } catch (error) {
//     console.error("Error deleting payment:", error)
//     return res.status(500).json({ error: "Error deleting payment" })
//   }
// }

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "1mb",
//     },
//   },
// }



import type { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongoose"
import { ObjectId } from "mongodb"

interface PaymentMethod {
  method: string
  amount: number
  received?: number
  change?: number
  [key: string]: any // Para propiedades adicionales
}

interface PaymentData {
  total: number
  paid: number
  methods: PaymentMethod[]
}

interface Payment {
  _id?: ObjectId
  orderId: string // ID de orden como string
  payment: PaymentData
  status: "pending" | "completed" | "failed" | "refunded"
  companyName: string
  companyId: string | ObjectId
  createdAt?: Date
  updatedAt?: Date
  version?: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
  const client = await clientPromise;
  const db = client.db(dbName);
  const paymentsCollection = db.collection("payments")

  try {
    switch (req.method) {
      case "GET":
        await handleGetPayments(req, res, paymentsCollection)
        break
      case "POST":
        await handleCreatePayment(req, res, paymentsCollection)
        break
      case "PUT":
        await handleUpdatePayment(req, res, paymentsCollection)
        break
      case "DELETE":
        await handleDeletePayment(req, res, paymentsCollection)
        break
      default:
        res.status(405).json({ error: "Method not allowed" })
    }
  } catch (error) {
    console.error("Error in payments API:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// GET - Obtener pagos
async function handleGetPayments(req: NextApiRequest, res: NextApiResponse, collection: any) {
  const { id, orderId, companyId, status, dateFrom, dateTo, sort = "desc" } = req.query
  console.log("pasó por get")

  const query: any = {}

  if (id) {
    try {
      query._id = new ObjectId(id as string)
    } catch {
      return res.status(400).json({ error: "Invalid payment ID format" })
    }
  }

  if (orderId) {
    query.orderId = orderId
  }

  if (companyId) {
    try {
      query.companyId = new ObjectId(companyId as string)
    } catch {
      return res.status(400).json({ error: "Invalid company ID format" })
    }
  }

  if (status) {
    query.status = status
  }

  if (dateFrom || dateTo) {
    query.createdAt = {}
    if (dateFrom) query.createdAt.$gte = new Date(dateFrom as string)
    if (dateTo) query.createdAt.$lte = new Date(dateTo as string)
  }

  const sortOption = { createdAt: sort === "asc" ? 1 : -1 }

  try {
    // Special case: Return only orderIds for a company within a time range
    if (req.query.onlyOrderIds === "true") {
      const ordersIdList = await collection.find(query).project({ orderId: 1, _id: 0 }).sort(sortOption).toArray()
      return res.status(200).json(ordersIdList.map((item: any) => item.orderId))
    }

    // New endpoint for closing sales component
    if (req.query.forClosing === "true") {
      const paymentIds = req.query.ids
      if (!paymentIds) {
        return res.status(400).json({ error: "Payment IDs are required" })
      }

      const idsArray = Array.isArray(paymentIds) ? paymentIds : [paymentIds]
      const objectIds = idsArray.map((id: string) => new ObjectId(id))

      const payments = await collection.find({ 
        _id: { $in: objectIds },
        companyId: new ObjectId(companyId as string)
      }).sort(sortOption).toArray()

      return res.status(200).json(payments)
    }

    // Regular case handling
    if (id) {
      const payment = await collection.findOne(query)
      if (!payment) return res.status(404).json({ error: "Payment not found" })
      return res.status(200).json(payment)
    } else {
      const payments = await collection.find(query).sort(sortOption).toArray()
      return res.status(200).json(payments)
    }
  } catch (error) {
    console.error("Error fetching payments:", error)
    return res.status(500).json({ error: "Error fetching payments" })
  }
}

// POST - Crear nuevo pago
async function handleCreatePayment(req: NextApiRequest, res: NextApiResponse, collection: any) {
  const paymentData: Payment = req.body

  // Validaciones básicas
  if (!paymentData.orderId) {
    return res.status(400).json({ error: "orderId is required" })
  }

  if (!paymentData.payment || !paymentData.payment.total || paymentData.payment.total <= 0) {
    return res.status(400).json({ error: "Valid payment total is required" })
  }

  if (!paymentData.payment.methods || paymentData.payment.methods.length === 0) {
    return res.status(400).json({ error: "At least one payment method is required" })
  }

  if (!paymentData.companyName) {
    return res.status(400).json({ error: "companyName is required" })
  }

  if (!paymentData.companyId) {
    return res.status(400).json({ error: "companyId is required" })
  }

  try {
    const newPayment = {
      ...paymentData,
      companyId: new ObjectId(paymentData.companyId),
      status: paymentData.status || "completed",
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    }

    const result = await collection.insertOne(newPayment)
    const createdPayment = await collection.findOne({ _id: result.insertedId })
    return res.status(201).json(createdPayment)
  } catch (error) {
    console.error("Error creating payment:", error)
    return res.status(500).json({ error: "Error creating payment" })
  }
}

// PUT - Actualizar pago
async function handleUpdatePayment(req: NextApiRequest, res: NextApiResponse, collection: any) {
  const { id } = req.query
  const updateData: Partial<Payment> = req.body

  if (!id) {
    return res.status(400).json({ error: "Payment ID is required" })
  }

  try {
    const currentPayment = await collection.findOne({ _id: new ObjectId(id as string) })
    if (!currentPayment) {
      return res.status(404).json({ error: "Payment not found" })
    }

    // Validación de versión para evitar conflictos
    if (updateData.version && updateData.version !== currentPayment.version) {
      return res.status(409).json({
        error: "Conflict",
        message: "Payment was modified by another user",
        currentPayment: currentPayment,
      })
    }

    // Preparar la actualización
    const update: any = {
      $set: {
        ...updateData,
        ...(updateData.companyId && { companyId: new ObjectId(updateData.companyId) }),
        updatedAt: new Date(),
      },
      $inc: { version: 1 },
    }

    // Manejo especial para el objeto payment
    if (updateData.payment) {
      update.$set.payment = {
        ...currentPayment.payment,
        ...updateData.payment,
        methods: updateData.payment.methods || currentPayment.payment.methods,
      }
    }

    // Campos protegidos que no deben actualizarse
    delete update.$set._id
    delete update.$set.createdAt
    delete update.$set.version

    // Ejecutar la actualización
    const result = await collection.findOneAndUpdate({ _id: new ObjectId(id as string) }, update, {
      returnDocument: "after",
    })

    return res.status(200).json(result.value)
  } catch (error) {
    console.error("Error updating payment:", error)
    return res.status(500).json({ error: "Error updating payment" })
  }
}

// DELETE - Eliminar pago
async function handleDeletePayment(req: NextApiRequest, res: NextApiResponse, collection: any) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: "Payment ID is required" })
  }

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id as string) })

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Payment not found" })
    }

    return res.status(200).json({ message: "Payment deleted successfully" })
  } catch (error) {
    console.error("Error deleting payment:", error)
    return res.status(500).json({ error: "Error deleting payment" })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
}