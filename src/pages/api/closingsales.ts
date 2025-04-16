// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "../../../lib/mongoose";
// import { ObjectId } from "mongodb";

// // Tipos para TypeScript
// interface Payment {
//   _id: ObjectId;
//   orderId: string;
//   payment: {
//     total: number;
//     paid: number;
//     methods: Array<{
//       method: string;
//       amount: number;
//       received: number;
//       change: number;
//     }>;
//   };
//   status: string;
//   companyId: ObjectId;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface ClosingSale {
//   _id?: ObjectId;
//   turno_id: string;
//   fecha_hora: Date;
//   fecha_cierre: Date;
//   total_ventas: number;
//   total_efectivo: number;
//   total_tarjeta: number;
//   total_transferencia: number;
//   total_otros: number;
//   numero_transacciones: number;
//   pagos_ids: ObjectId[];
//   companyId: ObjectId;
//   hash_fiscal?: string;
//   cierre_completo: boolean;
//   version: number;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const dbName = process.env.NODE_ENV === "development" ? "menuDevDB" : "menuDB";
//   const client = await clientPromise;
//   const db = client.db(dbName);

//   try {
//     switch (req.method) {
//       case "GET":
//         await handleGetClosingSales(req, res, db);
//         break;
//       case "POST":
//         await handleCreateClosingSale(req, res, db);
//         break;
//       default:
//         res.status(405).json({ error: "Method not allowed" });
//     }
//   } catch (error) {
//     console.error("Error in closingsales API:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// async function handleGetClosingSales(req: NextApiRequest, res: NextApiResponse, db: any) {
//   const { turno_id, fecha, companyId } = req.query;
//   const closingsalesCollection = db.collection("closingsales");

//   try {
//     const query: any = {};
//     if (turno_id) query.turno_id = turno_id;
//     if (fecha) {
//       const fechaInicio = new Date(fecha as string);
//       fechaInicio.setHours(0, 0, 0, 0);
//       const fechaFin = new Date(fecha as string);
//       fechaFin.setHours(23, 59, 59, 999);
//       query.fecha_cierre = { $gte: fechaInicio, $lte: fechaFin };
//     }
//     if (companyId) query.companyId = new ObjectId(companyId as string);

//     const closings = await closingsalesCollection.find(query).sort({ fecha_cierre: -1 }).toArray();
//     res.status(200).json(closings);
//   } catch (error) {
//     console.error("Error fetching closing sales:", error);
//     res.status(500).json({ error: "Error fetching closing sales" });
//   }
// }

// async function handleCreateClosingSale(req: NextApiRequest, res: NextApiResponse, db: any) {
//   const { turno_id, companyId } = req.body;
//   const closingsalesCollection = db.collection("closingsales");
//   const paymentsCollection = db.collection("payments");

//   if (!turno_id || !companyId) {
//     return res.status(400).json({ error: "turno_id and companyId are required" });
//   }

//   try {
//     // 1. Verificar si ya existe un cierre para este turno hoy
//     const todayStart = new Date();
//     todayStart.setHours(0, 0, 0, 0);
//     const todayEnd = new Date();
//     todayEnd.setHours(23, 59, 59, 999);

//     const existingClosing = await closingsalesCollection.findOne({
//       turno_id,
//       fecha_cierre: { $gte: todayStart, $lte: todayEnd },
//       companyId: new ObjectId(companyId)
//     });

//     // 2. Obtener pagos desde el último cierre o desde inicio del día
//     const lastClosing = await closingsalesCollection.findOne(
//       { companyId: new ObjectId(companyId) },
//       { sort: { fecha_cierre: -1 } }
//     );

//     const paymentsQuery: any = {
//       status: "completed",
//       companyId: new ObjectId(companyId),
//       createdAt: { $gte: lastClosing?.fecha_cierre || todayStart, $lte: new Date() }
//     };

//     const payments = await paymentsCollection.find(paymentsQuery).toArray();

//     // 3. Si no hay pagos nuevos y ya existe un cierre, retornar el existente
//     if (payments.length === 0 && existingClosing) {
//       return res.status(200).json({
//         message: "No new payments since last closing",
//         closing: existingClosing
//       });
//     }

//     // 4. Calcular totales
//     const totals = calculateTotals(payments);

//     // 5. Si existe cierre pero hay pagos nuevos, actualizarlo
//     if (existingClosing) {
//       const updatedClosing = await updateExistingClosing(
//         existingClosing,
//         payments,
//         totals,
//         closingsalesCollection
//       );
//       return res.status(200).json(updatedClosing);
//     }

//     // 6. Crear nuevo cierre Z
//     const newClosing = await createNewClosing(
//       turno_id,
//       companyId,
//       payments,
//       totals,
//       closingsalesCollection
//     );

//     res.status(201).json(newClosing);
//   } catch (error) {
//     console.error("Error creating closing sale:", error);
//     res.status(500).json({ error: "Error creating closing sale" });
//   }
// }

// function calculateTotals(payments: Payment[]) {
//   const totals = {
//     total_ventas: 0,
//     total_efectivo: 0,
//     total_tarjeta: 0,
//     total_transferencia: 0,
//     total_otros: 0
//   };

//   payments.forEach(payment => {
//     totals.total_ventas += payment.payment.total;

//     payment.payment.methods.forEach(method => {
//       switch (method.method.toLowerCase()) {
//         case 'cash':
//         case 'efectivo':
//           totals.total_efectivo += method.amount;
//           break;
//         case 'card':
//         case 'tarjeta':
//           totals.total_tarjeta += method.amount;
//           break;
//         case 'transfer':
//         case 'transferencia':
//           totals.total_transferencia += method.amount;
//           break;
//         default:
//           totals.total_otros += method.amount;
//       }
//     });
//   });

//   return totals;
// }

// async function updateExistingClosing(
//   existingClosing: ClosingSale,
//   newPayments: Payment[],
//   newTotals: any,
//   collection: any
// ) {
//   const updatedTotals = {
//     total_ventas: existingClosing.total_ventas + newTotals.total_ventas,
//     total_efectivo: existingClosing.total_efectivo + newTotals.total_efectivo,
//     total_tarjeta: existingClosing.total_tarjeta + newTotals.total_tarjeta,
//     total_transferencia: existingClosing.total_transferencia + newTotals.total_transferencia,
//     total_otros: existingClosing.total_otros + newTotals.total_otros,
//     numero_transacciones: existingClosing.numero_transacciones + newPayments.length
//   };

//   const newPaymentIds = newPayments.map(p => p._id);
//   const allPaymentIds = [...existingClosing.pagos_ids, ...newPaymentIds];

//   const update = {
//     $set: {
//       ...updatedTotals,
//       pagos_ids: allPaymentIds,
//       fecha_hora: new Date(),
//       version: existingClosing.version + 1
//     }
//   };

//   const result = await collection.findOneAndUpdate(
//     { _id: existingClosing._id },
//     update,
//     { returnDocument: "after" }
//   );

//   return result.value;
// }

// async function createNewClosing(
//   turno_id: string,
//   companyId: string,
//   payments: Payment[],
//   totals: any,
//   collection: any
// ) {
//   const newClosing: ClosingSale = {
//     turno_id,
//     fecha_hora: new Date(),
//     fecha_cierre: new Date(),
//     ...totals,
//     numero_transacciones: payments.length,
//     pagos_ids: payments.map(p => p._id),
//     companyId: new ObjectId(companyId),
//     cierre_completo: false,
//     version: 1
//   };

//   // Generar hash fiscal (simplificado)
//   const hashData = `${newClosing.turno_id}-${newClosing.fecha_cierre.toISOString()}-${newClosing.total_ventas}`;
//   newClosing.hash_fiscal = hashData; // En producción usar SHA-256 o similar

//   const result = await collection.insertOne(newClosing);
//   return await collection.findOne({ _id: result.insertedId });
// }





// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "../../../lib/mongoose";
// import { ObjectId } from "mongodb";

// // TypeScript types
// interface Payment {
//     _id: ObjectId;
//     orderId: string;
//     payment: {
//         total: number;
//         paid: number;
//         methods: Array<{
//             method: string;
//             amount: number;
//             received: number;
//             change: number;
//         }>;
//     };
//     status: string;
//     companyId: ObjectId;
//     createdAt: Date;
//     updatedAt: Date;
// }

// interface ClosingSale {
//     _id?: ObjectId;
//     turno_id: string;
//     date_time: Date;
//     closing_date: Date;
//     total_sales: number;
//     total_cash: number;
//     total_card: number;
//     total_transfer: number;
//     total_other: number;
//     transaction_count: number;
//     payment_ids: ObjectId[];
//     companyId: ObjectId;
//     fiscal_hash?: string;
//     complete_closing: boolean;
//     version: number;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const dbName = process.env.NODE_ENV === "development" ? "menuDevDB" : "menuDB";
//     const client = await clientPromise;
//     const db = client.db(dbName);

//     try {
//         switch (req.method) {
//             case "GET":
//                 await handleGetClosingSales(req, res, db);
//                 break;
//             case "POST":
//                 await handleCreateClosingSale(req, res, db);
//                 break;
//             default:
//                 res.status(405).json({ error: "Method not allowed" });
//         }
//     } catch (error) {
//         console.error("Error in closingsales API:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }

// async function handleGetClosingSales(req: NextApiRequest, res: NextApiResponse, db: any) {
//     const { turno_id, fecha, companyId } = req.query;
//     const closingsalesCollection = db.collection("closingsales");

//     try {
//         const query: any = {};
//         if (turno_id) query.turno_id = turno_id;
//         if (fecha) {
//             const startDate = new Date(fecha as string);
//             startDate.setHours(0, 0, 0, 0);
//             const endDate = new Date(fecha as string);
//             endDate.setHours(23, 59, 59, 999);
//             query.closing_date = { $gte: startDate, $lte: endDate };
//         }
//         if (companyId) query.companyId = new ObjectId(companyId as string);

//         const closings = await closingsalesCollection.find(query).sort({ closing_date: -1 }).toArray();
//         res.status(200).json(closings);
//     } catch (error) {
//         console.error("Error fetching closing sales:", error);
//         res.status(500).json({ error: "Error fetching closing sales" });
//     }
// }

// async function handleCreateClosingSale(req: NextApiRequest, res: NextApiResponse, db: any) {
//     const { turno_id, companyId } = req.body;
//     const closingsalesCollection = db.collection("closingsales");
//     const paymentsCollection = db.collection("payments");

//     if (!turno_id || !companyId) {
//         return res.status(400).json({ error: "turno_id and companyId are required" });
//     }

//     try {
//         // 1. Check if there's already a closing for this shift today
//         const todayStart = new Date();
//         todayStart.setHours(0, 0, 0, 0);
//         const todayEnd = new Date();
//         todayEnd.setHours(23, 59, 59, 999);

//         const existingClosing = await closingsalesCollection.findOne({
//             turno_id,
//             closing_date: { $gte: todayStart, $lte: todayEnd },
//             companyId: new ObjectId(companyId)
//         });

//         // 2. Get payments since last closing or from start of day
//         const lastClosing = await closingsalesCollection.findOne(
//             { companyId: new ObjectId(companyId) },
//             { sort: { closing_date: -1 } }
//         );

//         const paymentsQuery: any = {
//             status: "completed",
//             companyId: new ObjectId(companyId),
//             createdAt: { $gte: lastClosing?.closing_date || todayStart, $lte: new Date() }
//         };

//         const payments = await paymentsCollection.find(paymentsQuery).toArray();

//         // 3. If no new payments and closing exists, return existing one
//         if (payments.length === 0 && existingClosing) {
//             return res.status(200).json({
//                 message: "No new payments since last closing",
//                 closing: existingClosing
//             });
//         }

//         // 4. Calculate totals
//         const totals = calculateTotals(payments);

//         // 5. If closing exists but there are new payments, update it
//         if (existingClosing) {
//             const updatedClosing = await updateExistingClosing(
//                 existingClosing,
//                 payments,
//                 totals,
//                 closingsalesCollection
//             );
//             return res.status(200).json(updatedClosing);
//         }

//         // 6. Create new closing Z
//         const newClosing = await createNewClosing(
//             turno_id,
//             companyId,
//             payments,
//             totals,
//             closingsalesCollection
//         );

//         res.status(201).json(newClosing);
//     } catch (error) {
//         console.error("Error creating closing sale:", error);
//         res.status(500).json({ error: "Error creating closing sale" });
//     }
// }

// function calculateTotals(payments: Payment[]) {
//     const totals = {
//         total_sales: 0,
//         total_cash: 0,
//         total_card: 0,
//         total_transfer: 0,
//         total_other: 0
//     };

//     payments.forEach(payment => {
//         totals.total_sales += payment.payment.total;

//         payment.payment.methods.forEach(method => {
//             switch (method.method.toLowerCase()) {
//                 case 'cash':
//                 case 'efectivo':
//                     totals.total_cash += method.amount;
//                     break;
//                 case 'card':
//                 case 'tarjeta':
//                     totals.total_card += method.amount;
//                     break;
//                 case 'transfer':
//                 case 'transferencia':
//                     totals.total_transfer += method.amount;
//                     break;
//                 default:
//                     totals.total_other += method.amount;
//             }
//         });
//     });

//     return totals;
// }

// async function updateExistingClosing(
//     existingClosing: ClosingSale,
//     newPayments: Payment[],
//     newTotals: any,
//     collection: any
// ) {
//     const updatedTotals = {
//         total_sales: existingClosing.total_sales + newTotals.total_sales,
//         total_cash: existingClosing.total_cash + newTotals.total_cash,
//         total_card: existingClosing.total_card + newTotals.total_card,
//         total_transfer: existingClosing.total_transfer + newTotals.total_transfer,
//         total_other: existingClosing.total_other + newTotals.total_other,
//         transaction_count: existingClosing.transaction_count + newPayments.length
//     };

//     const newPaymentIds = newPayments.map(p => p._id);
//     const allPaymentIds = [...existingClosing.payment_ids, ...newPaymentIds];

//     const update = {
//         $set: {
//             ...updatedTotals,
//             payment_ids: allPaymentIds,
//             date_time: new Date(),
//             version: existingClosing.version + 1
//         }
//     };

//     const result = await collection.findOneAndUpdate(
//         { _id: existingClosing._id },
//         update,
//         { returnDocument: "after" }
//     );

//     return result.value;
// }

// async function createNewClosing(
//     turno_id: string,
//     companyId: string,
//     payments: Payment[],
//     totals: any,
//     collection: any
// ) {
//     const newClosing: ClosingSale = {
//         turno_id,
//         date_time: new Date(),
//         closing_date: new Date(),
//         ...totals,
//         transaction_count: payments.length,
//         payment_ids: payments.map(p => p._id),
//         companyId: new ObjectId(companyId),
//         complete_closing: false,
//         version: 1
//     };

//     // Generate fiscal hash (simplified)
//     const hashData = `${newClosing.turno_id}-${newClosing.closing_date.toISOString()}-${newClosing.total_sales}`;
//     newClosing.fiscal_hash = hashData; // In production use SHA-256 or similar

//     const result = await collection.insertOne(newClosing);
//     return await collection.findOne({ _id: result.insertedId });
// }





import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongoose";
import { ObjectId } from "mongodb";

// TypeScript types
interface Payment {
    _id: ObjectId;
    orderId: string;
    payment: {
        total: number;
        paid: number;
        methods: Array<{
            method: string;
            amount: number;
            received: number;
            change: number;
        }>;
    };
    status: string;
    companyId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

interface ClosingSale {
    _id?: ObjectId;
    turno_id: string;
    date_time: Date;
    closing_date: Date;
    total_sales: number;
    total_cash: number;
    total_card: number;
    total_transfer: number;
    total_other: number;
    transaction_count: number;
    payment_ids: ObjectId[];
    companyId: ObjectId;
    fiscal_hash?: string;
    complete_closing: boolean;
    version: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const dbName = process.env.NODE_ENV === "development" ? "menuDevDB" : "menuDB";
    const client = await clientPromise;
    const db = client.db(dbName);

    try {
        switch (req.method) {
            case "GET":
                await handleGetClosingSales(req, res, db);
                break;
            case "POST":
                await handleCreateClosingSale(req, res, db);
                break;
            default:
                res.status(405).json({ error: "Method not allowed" });
        }
    } catch (error) {
        console.error("Error in closingsales API:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function handleGetClosingSales(req: NextApiRequest, res: NextApiResponse, db: any) {
    const { turno_id, fecha, companyId, startDate, endDate, latest } = req.query;
    const closingsalesCollection = db.collection("closingsales");

    try {
        // Validar que companyId está presente
        if (!companyId) {
            return res.status(400).json({ error: "companyId is required" });
        }

        const query: any = { companyId: new ObjectId(companyId as string) };
        
        // Filtrar por turno si está especificado
        if (turno_id) query.turno_id = turno_id;

        // Manejar diferentes modos de búsqueda
        if (latest === 'true') {
            // Buscar solo el último cierre
            const closing = await closingsalesCollection
                .find(query)
                .sort({ closing_date: -1 })
                .limit(1)
                .toArray();
            return res.status(200).json(closing);
        }
        else if (startDate && endDate) {
            // Búsqueda por rango de fechas
            const start = new Date(startDate as string);
            start.setHours(0, 0, 0, 0);
            const end = new Date(endDate as string);
            end.setHours(23, 59, 59, 999);
            query.closing_date = { $gte: start, $lte: end };
        } 
        else if (fecha) {
            // Búsqueda por día específico
            const startDate = new Date(fecha as string);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(fecha as string);
            endDate.setHours(23, 59, 59, 999);
            query.closing_date = { $gte: startDate, $lte: endDate };
        }
        // Si no se especifica fecha, se devuelven todos los cierres (ordenados por fecha descendente)

        const closings = await closingsalesCollection.find(query).sort({ closing_date: -1 }).toArray();
        res.status(200).json(closings);
    } catch (error) {
        console.error("Error fetching closing sales:", error);
        res.status(500).json({ error: "Error fetching closing sales" });
    }
}

// Resto del código permanece igual...
async function handleCreateClosingSale(req: NextApiRequest, res: NextApiResponse, db: any) {
    const { turno_id, companyId } = req.body;
    const closingsalesCollection = db.collection("closingsales");
    const paymentsCollection = db.collection("payments");

    if (!turno_id || !companyId) {
        return res.status(400).json({ error: "turno_id and companyId are required" });
    }

    try {
        // 1. Check if there's already a closing for this shift today
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const existingClosing = await closingsalesCollection.findOne({
            turno_id,
            closing_date: { $gte: todayStart, $lte: todayEnd },
            companyId: new ObjectId(companyId)
        });

        // 2. Get payments since last closing or from start of day
        const lastClosing = await closingsalesCollection.findOne(
            { companyId: new ObjectId(companyId) },
            { sort: { closing_date: -1 } }
        );

        const paymentsQuery: any = {
            status: "completed",
            companyId: new ObjectId(companyId),
            createdAt: { $gte: lastClosing?.closing_date || todayStart, $lte: new Date() }
        };

        const payments = await paymentsCollection.find(paymentsQuery).toArray();

        // 3. If no new payments and closing exists, return existing one
        if (payments.length === 0 && existingClosing) {
            return res.status(200).json({
                message: "No new payments since last closing",
                closing: existingClosing
            });
        }

        // 4. Calculate totals
        const totals = calculateTotals(payments);

        // 5. If closing exists but there are new payments, update it
        if (existingClosing) {
            const updatedClosing = await updateExistingClosing(
                existingClosing,
                payments,
                totals,
                closingsalesCollection
            );
            return res.status(200).json(updatedClosing);
        }

        // 6. Create new closing Z
        const newClosing = await createNewClosing(
            turno_id,
            companyId,
            payments,
            totals,
            closingsalesCollection
        );

        res.status(201).json(newClosing);
    } catch (error) {
        console.error("Error creating closing sale:", error);
        res.status(500).json({ error: "Error creating closing sale" });
    }
}

function calculateTotals(payments: Payment[]) {
    const totals = {
        total_sales: 0,
        total_cash: 0,
        total_card: 0,
        total_transfer: 0,
        total_other: 0
    };

    payments.forEach(payment => {
        totals.total_sales += payment.payment.total;

        payment.payment.methods.forEach(method => {
            switch (method.method.toLowerCase()) {
                case 'cash':
                case 'efectivo':
                    totals.total_cash += method.amount;
                    break;
                case 'card':
                case 'tarjeta':
                    totals.total_card += method.amount;
                    break;
                case 'transfer':
                case 'transferencia':
                    totals.total_transfer += method.amount;
                    break;
                default:
                    totals.total_other += method.amount;
            }
        });
    });

    return totals;
}

async function updateExistingClosing(
    existingClosing: ClosingSale,
    newPayments: Payment[],
    newTotals: any,
    collection: any
) {
    const updatedTotals = {
        total_sales: existingClosing.total_sales + newTotals.total_sales,
        total_cash: existingClosing.total_cash + newTotals.total_cash,
        total_card: existingClosing.total_card + newTotals.total_card,
        total_transfer: existingClosing.total_transfer + newTotals.total_transfer,
        total_other: existingClosing.total_other + newTotals.total_other,
        transaction_count: existingClosing.transaction_count + newPayments.length
    };

    const newPaymentIds = newPayments.map(p => p._id);
    const allPaymentIds = [...existingClosing.payment_ids, ...newPaymentIds];

    const update = {
        $set: {
            ...updatedTotals,
            payment_ids: allPaymentIds,
            date_time: new Date(),
            version: existingClosing.version + 1
        }
    };

    const result = await collection.findOneAndUpdate(
        { _id: existingClosing._id },
        update,
        { returnDocument: "after" }
    );

    return result.value;
}

async function createNewClosing(
    turno_id: string,
    companyId: string,
    payments: Payment[],
    totals: any,
    collection: any
) {
    const newClosing: ClosingSale = {
        turno_id,
        date_time: new Date(),
        closing_date: new Date(),
        ...totals,
        transaction_count: payments.length,
        payment_ids: payments.map(p => p._id),
        companyId: new ObjectId(companyId),
        complete_closing: false,
        version: 1
    };

    // Generate fiscal hash (simplified)
    const hashData = `${newClosing.turno_id}-${newClosing.closing_date.toISOString()}-${newClosing.total_sales}`;
    newClosing.fiscal_hash = hashData; // In production use SHA-256 or similar

    const result = await collection.insertOne(newClosing);
    return await collection.findOne({ _id: result.insertedId });
}