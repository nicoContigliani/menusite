// import type { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "../../../lib/mongoose";

// const dbName =
//   process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db(dbName);
//     const ordersCollection = db.collection("orders");

//     const {
//       companiesName, // obligatorio
//       orderType,
//       status,
//       companiesID,
//       email,
//       phone,
//       fullname,
//       dateFrom,
//       dateTo,
//     } = req.body;

//     if (!companiesName) {
//       return res.status(400).json({ success: false, message: "companiesName es obligatorio." });
//     }

//     const filter: any = { companiesName };

//     if (orderType) filter.orderType = orderType;
//     if (status) filter.status = status;
//     if (companiesID) filter.companiesID = companiesID;
//     if (email) filter.email = { $regex: email, $options: "i" };
//     if (phone) filter.phone = { $regex: phone, $options: "i" };
//     if (fullname) filter.fullname = { $regex: fullname, $options: "i" };

//     if (dateFrom || dateTo) {
//       filter.createdAt = {};
//       if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
//       if (dateTo) filter.createdAt.$lte = new Date(dateTo);
//     }

//     const orders = await ordersCollection.find(filter).sort({ createdAt: -1 }).toArray();

//     res.status(200).json({ success: true, data: orders });
//   } catch (error) {
//     console.error("Error al filtrar órdenes:", error);
//     res.status(500).json({ success: false, message: "Error interno del servidor" });
//   }
// }


import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongoose";

const dbName =
  process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";

// Función de manejo del endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const ordersCollection = db.collection("orders");

    // Desestructuración de los parámetros de la solicitud
    const {
      companiesName, // obligatorio
      orderType,
      status,
      companiesID,
      email,
      phone,
      fullname,
      dateFrom,
      dateTo,
    } = req.body;
    console.log("🚀 ~ handler ~ req.body:", req.body)

    // Validación de parámetros obligatorios
    if (!companiesName) {
      return res.status(400).json({ success: false, message: "companiesName es obligatorio." });
    }

    // Filtro básico para la consulta
    const filter: any = { companiesName };

    // Añadir filtros adicionales si están presentes
    if (orderType) filter.orderType = orderType;
    if (status) filter.status = status;
    if (companiesID) filter.companiesID = companiesID;
    if (email) filter.email = { $regex: email, $options: "i" };  // Búsqueda insensible a mayúsculas/minúsculas
    if (phone) filter.phone = { $regex: phone, $options: "i" };  // Búsqueda insensible a mayúsculas/minúsculas
    if (fullname) filter.fullname = { $regex: fullname, $options: "i" }; // Búsqueda insensible a mayúsculas/minúsculas

    // Validación y conversión de fechas
    if (dateFrom || dateTo) {
      filter.createdAt = {};

      // Convertir las fechas de string a objeto Date, si son válidas
      if (dateFrom) {
        const parsedDateFrom = new Date(dateFrom);
        if (!isNaN(parsedDateFrom.getTime())) {
          filter.createdAt.$gte = parsedDateFrom; // Fecha de inicio
        } else {
          return res.status(400).json({ success: false, message: "La fecha 'dateFrom' no tiene un formato válido." });
        }
      }

      if (dateTo) {
        const parsedDateTo = new Date(dateTo);
        if (!isNaN(parsedDateTo.getTime())) {
          filter.createdAt.$lte = parsedDateTo; // Fecha de finalización
        } else {
          return res.status(400).json({ success: false, message: "La fecha 'dateTo' no tiene un formato válido." });
        }
      }
    }
    
    // Realizar la consulta con los filtros aplicados
    const orders = await ordersCollection
    .find(filter)
    .sort({ createdAt: -1 }) // Ordenar por fecha de creación descendente
    .toArray();
    
    console.log("🚀 ~ handler ~ orders:", orders)
    // Respuesta exitosa con los resultados
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error al filtrar órdenes:", error);

    // Mejor manejo de errores: proporcionamos un mensaje más específico si es posible
    if (error instanceof Error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    // Mensaje general en caso de error desconocido
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
}
