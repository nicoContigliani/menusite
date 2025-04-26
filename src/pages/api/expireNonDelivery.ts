
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
  const client = await clientPromise;
  const db = client.db(dbName);
  const ordersCollection = db.collection("orders");

  try {
    switch (req.method) {
      case "GET":
        await handleGetNonDeliveryPending(req, res, ordersCollection);
        break;
      case "POST":
        await handleExpireNonDelivery(req, res, ordersCollection);
        break;
      case "PUT":
        await handlePut(req, res, ordersCollection);
        break;
      default:
        res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in expireNonDelivery API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET: Órdenes no delivery pendientes (+8 horas)
async function handleGetNonDeliveryPending(req: NextApiRequest, res: NextApiResponse, collection: any) {
  const { hours = "8" } = req.query;
  const expirationHours = parseInt(hours as string, 10);
  const expirationTime = new Date(Date.now() - expirationHours * 60 * 60 * 1000);

  try {
    const orders = await collection
      .find({
        status: "pending",
        orderType: { $ne: "delivery" }, // Excluye delivery
        createdAt: { $lt: expirationTime },
      })
      .sort({ createdAt: 1 })
      .toArray();

    res.status(200).json(
      orders.map((order: any) => ({
        ...order,
        _id: order._id.toString(),
        hoursPending: Math.round((Date.now() - order.createdAt.getTime()) / (1000 * 60 * 60)),
      }))
    );
  } catch (error) {
    console.error("Error fetching non-delivery orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
}

// async function handleGetNonDeliveryPending(req: NextApiRequest, res: NextApiResponse, collection: any) {
//     try {
//       const orders = await collection
//         .find({
//           status: "pending",
//           orderType: { $ne: "delivery" } // Excluye delivery
//         })
//         .sort({ createdAt: 1 })
//         .toArray();
  
//       res.status(200).json(
//         orders.map((order: any) => ({
//           ...order,
//           _id: order._id.toString(),
//           hoursPending: Math.round((Date.now() - order.createdAt.getTime()) / (1000 * 60 * 60)),
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching non-delivery orders:", error);
//       res.status(500).json({ error: "Error fetching orders" });
//     }
//   }


// POST: Cierre automático de órdenes no delivery
async function handleExpireNonDelivery(req: NextApiRequest, res: NextApiResponse, collection: any) {
  const { hours = "8", dryRun = "false" } = req.query;
  const expirationHours = parseInt(hours as string, 10);
  const expirationTime = new Date(Date.now() - expirationHours * 60 * 60 * 1000);

  try {
    const query = {
      status: "pending",
      orderType: { $ne: "delivery" }, // Solo no delivery
      createdAt: { $lt: expirationTime },
    };

    if (dryRun === "true") {
      const count = await collection.countDocuments(query);
      return res.status(200).json({
        dryRun: true,
        wouldExpire: count,
        expirationThreshold: expirationTime.toISOString(),
      });
    }

    const result = await collection.updateMany(query, {
      $set: {
        status: "expired",
        updatedAt: new Date(),
        closureReason: `Auto-cerrada (no delivery, ${expirationHours}h)`,
      },
    });

    res.status(200).json({
      success: true,
      expiredCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error expiring non-delivery orders:", error);
    res.status(500).json({ error: "Error expiring orders" });
  }
}

// PUT: Cierre individual de orden o bulk update
async function handlePut(req: NextApiRequest, res: NextApiResponse, collection: any) {
  const { id } = req.query;
  const updateData = req.body;

  try {
    if (!id) {
      // --- Caso de actualizaciones múltiples (bulk) ---
      if (!updateData.query || typeof updateData.query !== "object") {
        return res.status(400).json({ error: "Missing or invalid 'query' field for bulk update" });
      }

      if (!updateData.updates || typeof updateData.updates !== "object") {
        return res.status(400).json({ error: "Missing or invalid 'updates' field for bulk update" });
      }

      if (Object.keys(updateData.query).length === 0) {
        return res.status(400).json({ error: "Cannot update all orders without a filter" });
      }

      const update = {
        $set: {
          ...updateData.updates,
          updatedAt: new Date(),
        },
        $inc: { version: 1 },
      };

      const result = await collection.updateMany(updateData.query, update);

      return res.status(200).json({
        message: "Bulk update successful",
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      });
    }

    // --- Caso de actualización de un solo pedido (con id) ---
    const currentOrder = await collection.findOne({ _id: new ObjectId(id as string) });
    if (!currentOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    const isCompleteUpdate = updateData._id && updateData.cart && updateData.orderType;

    let update;
    if (isCompleteUpdate) {
      // Update completo (sobreescribir todo el documento)
      update = {
        ...updateData,
        _id: currentOrder._id,
        createdAt: currentOrder.createdAt,
        updatedAt: new Date(),
        version: currentOrder.version + 1,
      };
    } else {
      // Update parcial
      update = {
        ...updateData,
        updatedAt: new Date(),
        version: currentOrder.version + 1,
      };

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
