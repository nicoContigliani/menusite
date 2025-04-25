// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "../../../lib/mongoose";
// import { ObjectId } from "mongodb";

// interface CartExtra {
//   id: string;
//   name: string;
//   price: number;
// }

// interface CartItem {
//   id: string;
//   itemId: string | number;
//   name: string;
//   price: number;
//   quantity: number;
//   extras: CartExtra[];
//   comments: string;
//   description?: string;
//   extrasTotal?: number;
//   isPromotion?: boolean;
//   originalPrice?: number;
// }

// type OrderStatus = 'pending' | 'processing' | 'paused' | 'finished' | 'cancelled' | 'delivered';

// interface Customer {
//   email: string;
//   name?: string;
//   phone?: string;
//   address?: string;
// }

// interface Order {
//   _id: ObjectId;
//   id: string;
//   orderType: string;
//   dataTypeOrder: string;
//   cart: CartItem[];
//   customer: Customer;
//   comments: string;
//   companiesName: string;
//   companiesID: string;
//   status: OrderStatus;
//   createdAt: Date;
//   updatedAt: Date;
//   version: number;
//   channel?: string;
//   timestamp?: string;
//   whatsapp?: string;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//     const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
//     const client = await clientPromise;
//     const db = client.db(dbName);
//     const ordersCollection = db.collection<Order>("orders");

//   try {
//     switch (req.method) {
//       case "GET":
//         await handleGet(req, res, ordersCollection);
//         break;
//       case "PUT":
//         await handlePut(req, res, ordersCollection);
//         break;
//       default:
//         res.status(405).json({ error: "Method not allowed" });
//     }
//   } catch (error) {
//     console.error("Error in orders API:", error);
//     res.status(500).json({ 
//       error: "Internal server error",
//       details: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// }

// async function handleGet(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   collection: any
// ) {
//   const { id } = req.query;

//   if (!id) {
//     return res.status(400).json({ error: "Order ID is required" });
//   }

//   try {
//     const order = await collection.findOne(
//       { _id: new ObjectId(id as string) },
//       { projection: {
//         _id: 1,
//         id: 1,
//         cart: 1,
//         comments: 1,
//         status: 1,
//         version: 1,
//         updatedAt: 1
//       }}
//     );

//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     return res.status(200).json({
//       ...order,
//       _id: order._id.toString()
//     });
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     return res.status(500).json({ error: "Error fetching order" });
//   }
// }

// async function handlePut(
//     req: NextApiRequest,
//     res: NextApiResponse,
//     collection: any
//   ) {
//     const { id } = req.query;
//     const updateData = req.body;
  
//     // Obtener el cliente de MongoDB
//     const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
//     const client = await clientPromise;
//     const db = client.db(dbName);
//     const ordersCollection = db.collection<Order>("orders");
  
//     try {
//       if (!id || Array.isArray(id)) {
//         return res.status(400).json({ error: "Invalid order ID" });
//       }
  
//       const session = client.startSession(); // Ahora client está definido
      
//       try {
//         session.startTransaction();
  
//         const currentOrder = await ordersCollection.findOne(
//           { _id: new ObjectId(id as string) },
//           { 
//             projection: { 
//               version: 1,
//               cart: 1,
//               comments: 1,
//               status: 1
//             },
//             session
//           }
//         );
  
//         if (!currentOrder) {
//           await session.abortTransaction();
//           return res.status(404).json({ error: "Order not found" });
//         }
  
//         if (updateData.version && updateData.version !== currentOrder.version) {
//           await session.abortTransaction();
//           return res.status(409).json({
//             error: "Conflict",
//             message: "Order was modified by another user",
//             currentOrder: {
//               _id: currentOrder._id.toString(),
//               cart: currentOrder.cart,
//               comments: currentOrder.comments,
//               status: currentOrder.status,
//               version: currentOrder.version
//             }
//           });
//         }
  
//         const update = {
//           ...updateData,
//           updatedAt: new Date(),
//           version: currentOrder.version + 1
//         };
  
//         delete update._id;
//         delete update.createdAt;
//         delete update.id;
  
//         const result:any = await ordersCollection.findOneAndUpdate(
//           { 
//             _id: new ObjectId(id as string),
//             version: currentOrder.version
//           },
//           { $set: update },
//           { 
//             returnDocument: "after",
//             session
//           }
//         );
  
//         if (!result.value) {
//           await session.abortTransaction();
//           return res.status(409).json({
//             error: "Conflict",
//             message: "Order was modified during update",
//             currentOrder: {
//               _id: currentOrder._id.toString(),
//               version: currentOrder.version
//             }
//           });
//         }
  
//         await session.commitTransaction();
  
//         const responseOrder = {
//           _id: result.value._id.toString(),
//           id: result.value.id,
//           cart: result.value.cart,
//           comments: result.value.comments,
//           status: result.value.status,
//           version: result.value.version,
//           updatedAt: result.value.updatedAt
//         };
  
//         return res.status(200).json(responseOrder);
  
//       } catch (transactionError) {
//         await session.abortTransaction();
//         throw transactionError;
//       } finally {
//         await session.endSession();
//       }
  
//     } catch (error) {
//       console.error("Error updating order:", error);
//       return res.status(500).json({ 
//         error: "Error updating order",
//         details: error instanceof Error ? error.message : 'Unknown error'
//       });
//     }
//   }

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '1mb',
//     },
//   },
// };



