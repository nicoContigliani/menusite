import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongoose";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const client = await clientPromise;
  // const db = client.db("menuDB");
  const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
  const client = await clientPromise;
  const db = client.db(dbName);
  const ordersCollection = db.collection("orders");

  try {
    switch (req.method) {
      case "GET":
        await handleGet(req, res, ordersCollection);
        break;
      case "POST":
        await handlePost(req, res, ordersCollection);
        break;
      case "PUT":
        await handlePut(req, res, ordersCollection);
        break;
      case "DELETE":
        await handleDelete(req, res, ordersCollection);
        break;
      default:
        res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in orders API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// async function handleGet(req: NextApiRequest, res: NextApiResponse, collection: any) {
//   const { id, status, customer, dateFrom, dateTo, sort = "desc", watch } = req.query;
//   console.log("🚀 ~ handleGet ~ req.query:", req.query)

//   // Modo Watch (Server-Sent Events)
//   if (watch === "true") {
//     return setupChangeStream(req, res, collection);
//   }

//   // Modo GET tradicional
//   const query: any = {};

//   if (id) {
//     try {
//       query._id = new ObjectId(id as string);
//     } catch {
//       return res.status(400).json({ error: "Invalid order ID format" });
//     }
//   }

//   // Manejar múltiples estados
//   if (status) {
//     if (typeof status === 'string' && status.includes(',')) {
//       query.status = { $in: status.split(',') };
//     } else {
//       query.status = status;
//     }
//   }

//   if (customer) query["customer.email"] = customer;

//   if (dateFrom || dateTo) {
//     query.createdAt = {};
//     if (dateFrom) query.createdAt.$gte = new Date(dateFrom as string);
//     if (dateTo) query.createdAt.$lte = new Date(dateTo as string);
//   }

//   const sortOption = { createdAt: sort === "asc" ? 1 : -1 };

//   try {
//     if (id) {
//       const order = await collection.findOne(query);
//       if (!order) return res.status(404).json({ error: "Order not found" });
//       return res.status(200).json(order);
//     } else {
//       const orders = await collection.find(query).sort(sortOption).toArray();
//       console.log("🚀 ~ handleGet ~ orders:", orders); // Agregado para debug
//       return res.status(200).json(orders);
//     }
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return res.status(500).json({ error: "Error fetching orders" });
//   }
// }


async function handleGet(req: NextApiRequest, res: NextApiResponse, collection: any) {
  const { id, status, customer, dateFrom, dateTo, sort = "desc", watch } = req.query;

  // Modo Watch (Server-Sent Events)
  if (watch === "true") {
    return setupChangeStream(req, res, collection);
  }

  // Modo GET tradicional
  const query: any = {};

  if (id) {
    try {
      query._id = new ObjectId(id as string);
    } catch {
      return res.status(400).json({ error: "Invalid order ID format" });
    }
  }

  // Manejar múltiples estados
  if (status) {
    if (typeof status === 'string' && status.includes(',')) {
      query.status = { $in: status.split(',') };
    } else {
      query.status = status;
    }
  }

  if (customer) query["customer.email"] = customer;

  // Si no se proporcionan fechas, filtrar por el día actual
  if (!dateFrom && !dateTo) {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    query.createdAt = {
      $gte: startOfDay,
      $lte: endOfDay
    };
  } else {
    // Usar las fechas proporcionadas
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom as string);
      if (dateTo) query.createdAt.$lte = new Date(dateTo as string);
    }
  }

  const sortOption = { createdAt: sort === "asc" ? 1 : -1 };

  try {
    if (id) {
      const order = await collection.findOne(query);
      if (!order) return res.status(404).json({ error: "Order not found" });
      return res.status(200).json(order);
    } else {
      const orders = await collection.find(query).sort(sortOption).toArray();
      return res.status(200).json(orders);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Error fetching orders" });
  }
}





async function setupChangeStream(req: NextApiRequest, res: NextApiResponse, collection: any) {
  // Configura SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Encoding", "none");
  res.flushHeaders();

  // Pipeline para filtrar cambios
  const pipeline = [
    {
      $match: {
        $or: [
          { operationType: "insert" },
          { operationType: "update" },
          { operationType: "delete" }
        ]
      }
    }
  ];

  const changeStream = collection.watch(pipeline, {
    fullDocument: "updateLookup",
    fullDocumentBeforeChange: "whenAvailable"
  });

  // Heartbeat para mantener la conexión activa
  const heartbeatInterval = setInterval(() => {
    res.write(": heartbeat\n\n");
  }, 30000);

  // Enviar snapshot inicial con filtros aplicados
  try {
    const query: any = {};
    if (req.query.status) {
      query.status = { $in: (req.query.status as string).split(',') };
    }

    const initialOrders = await collection.find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    res.write(`event: initial\n`);
    res.write(`data: ${JSON.stringify(initialOrders)}\n\n`);
  } catch (error) {
    console.error("Error sending initial orders:", error);
  }

  // Manejar cambios
  changeStream.on("change", (change: any) => {
    try {
      let eventData;
      switch (change.operationType) {
        case "insert":
          eventData = {
            type: "created",
            order: change.fullDocument
          };
          break;
        case "update":
          eventData = {
            type: "updated",
            id: change.documentKey._id,
            updates: change.updateDescription?.updatedFields,
            order: change.fullDocument
          };
          break;
        case "delete":
          eventData = {
            type: "deleted",
            id: change.documentKey._id
          };
          break;
        default:
          return;
      }

      res.write(`event: ${eventData.type}\n`);
      res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    } catch (error) {
      console.error("Error processing change event:", error);
    }
  });

  // Manejar errores
  changeStream.on("error", (err: any) => {
    console.error("Change stream error:", err);
    clearInterval(heartbeatInterval);
    res.write(`event: error\n`);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  });

  // Manejar cierre de conexión
  req.on("close", () => {
    clearInterval(heartbeatInterval);
    changeStream.close();
    res.end();
  });
}

// POST - Crear nueva orden
async function handlePost(req: NextApiRequest, res: NextApiResponse, collection: any) {
  //   const { items, customer } = req.body;

  //   if (!items || !Array.isArray(items)) {
  //     return res.status(400).json({ error: "Items array is required" });
  //   }

  //   if (!customer || !customer.email) {
  //     return res.status(400).json({ error: "Customer email is required" });
  //   }

  const newOrder = {
    ...req.body,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1
  };

  try {
    const result = await collection.insertOne(newOrder);
    const createdOrder = await collection.findOne({ _id: result.insertedId });
    return res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Error creating order" });
  }
}

// // PUT - Actualizar orden ****************************

// async function handlePut(req: NextApiRequest, res: NextApiResponse, collection: any) {
//   const { id } = req.query;
//   const updateData = req.body;

//   try {
//     // CASO 1: Actualización MASIVA
//     if (!id) {
//       if (!updateData.query || typeof updateData.query !== "object") {
//         return res.status(400).json({
//           error: "Missing or invalid 'query' field for bulk update"
//         });
//       }

//       if (!updateData.updates || typeof updateData.updates !== "object") {
//         return res.status(400).json({
//           error: "Missing or invalid 'updates' field for bulk update"
//         });
//       }

//       if (Object.keys(updateData.query).length === 0) {
//         return res.status(400).json({
//           error: "Cannot update all orders without a filter"
//         });
//       }

//       const update = {
//         $set: {
//           ...updateData.updates,
//           updatedAt: new Date()
//         },
//         $inc: { version: 1 }
//       };

//       const result = await collection.updateMany(updateData.query, update);

//       return res.status(200).json({
//         message: "Bulk update successful",
//         matchedCount: result.matchedCount,
//         modifiedCount: result.modifiedCount
//       });
//     }

//     // CASO 2: Actualización INDIVIDUAL
//     console.log("🚀 ~ handlePut ~ id:", id)
//     const currentOrder = await collection.findOne({ _id: new ObjectId(id as string) });
//     if (!currentOrder) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     if (updateData.version && updateData.version !== currentOrder.version) {
//       return res.status(409).json({
//         error: "Conflict",
//         message: "Order was modified by another user",
//         currentOrder
//       });
//     }

//     const update = {
//       ...updateData,
//       updatedAt: new Date(),
//       version: currentOrder.version + 1
//     };

//     // Eliminar campos no modificables
//     delete update._id;
//     delete update.createdAt;

//     const result = await collection.findOneAndUpdate(
//       { _id: new ObjectId(id as string) },
//       { $set: update },
//       { returnDocument: "after" }
//     );

//     return res.status(200).json(result.value);
//   } catch (error) {
//     console.error("Error updating order:", error);
//     return res.status(500).json({ error: "Error updating order" });
//   }
// }

async function handlePut(req: NextApiRequest, res: NextApiResponse, collection: any) {
  const { id } = req.query;
  const updateData = req.body;

  try {
    // CASO 1: Actualización MASIVA
    if (!id) {
      if (!updateData.query || typeof updateData.query !== "object") {
        return res.status(400).json({
          error: "Missing or invalid 'query' field for bulk update"
        });
      }

      if (!updateData.updates || typeof updateData.updates !== "object") {
        return res.status(400).json({
          error: "Missing or invalid 'updates' field for bulk update"
        });
      }

      if (Object.keys(updateData.query).length === 0) {
        return res.status(400).json({
          error: "Cannot update all orders without a filter"
        });
      }

      const update = {
        $set: {
          ...updateData.updates,
          updatedAt: new Date()
        },
        $inc: { version: 1 }
      };

      const result = await collection.updateMany(updateData.query, update);

      return res.status(200).json({
        message: "Bulk update successful",
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
      });
    }

    // CASO 2: Actualización INDIVIDUAL
    const currentOrder = await collection.findOne({ _id: new ObjectId(id as string) });
    if (!currentOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Verificar versión para evitar conflictos
    // if (updateData.version && updateData.version !== currentOrder.version) {
    //   return res.status(409).json({
    //     error: "Conflict",
    //     message: "Order was modified by another user",
    //     currentOrder
    //   });
    // }

    // DETECTAR SI ES UNA ACTUALIZACIÓN COMPLETA
    const isCompleteUpdate = updateData._id && updateData.cart && updateData.orderType;

    let update;
    if (isCompleteUpdate) {
      // ACTUALIZACIÓN COMPLETA
      update = {
        ...updateData,
        _id: currentOrder._id, // Mantener el ID original
        createdAt: currentOrder.createdAt, // Mantener fecha de creación
        updatedAt: new Date(),
        version: currentOrder.version + 1
      };
    } else {
      // ACTUALIZACIÓN PARCIAL
      update = {
        ...updateData,
        updatedAt: new Date(),
        version: currentOrder.version + 1
      };

      // Eliminar campos no modificables
      delete update._id;
      delete update.createdAt;
    }

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id as string) },
      { $set: update },
      { returnDocument: "after" }
    );

    return res.status(200).json(result.value);
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Error updating order" });
  }
}





// DELETE - Eliminar orden
async function handleDelete(req: NextApiRequest, res: NextApiResponse, collection: any) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id as string) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ error: "Error deleting order" });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};