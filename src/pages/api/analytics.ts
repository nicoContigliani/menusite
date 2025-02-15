import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { companyname } = req.query;
  const namecompanie = companyname

  if (!companyname || typeof companyname !== 'string') {
    return res.status(400).json({ error: 'Company name is required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("menuDB");
    const analytics = db.collection("tracktimes");

    // Buscar documentos con el nombre de la compañía
    // const companyData = await analytics.find({ namecompanie }).toArray();



    // const companyData = await analytics.aggregate([
    //   // Filtrar por el nombre de la compañía
    //   { $match: { namecompanie } },

    //   // Descomponer el campo "history" que contiene las secciones
    //   { $unwind: "$history" },

    //   // Ordenar los elementos de "history" por la fecha de creación
    //   { $sort: { "history.createAt": 1 } }, // Ordena por createAt (ascendente)

    //   // Agrupar por "userId", "namecompanie" y "history.section", sumando los tiempos
    //   {
    //     $group: {
    //       _id: { userId: "$userId", companyName: "$namecompanie", section: "$history.section" },
    //       totalTimeSpent: { $sum: "$history.timeSpent" },  // Sumar el tiempo total en esa sección
    //       history: { $push: "$history" }, // Almacenar el historial de cada sección
    //       email: { $first: "$email" }, // Incluir el email del primer documento
    //     },
    //   },

    //   // Agrupar por usuario y compañía para combinar secciones con el mismo nombre
    //   {
    //     $group: {
    //       _id: { userId: "$_id.userId", companyName: "$_id.companyName" },
    //       totalTimeSpentInApp: { $sum: "$totalTimeSpent" },  // Tiempo total en la app
    //       sections: { $push: { section: "$_id.section", timeSpent: "$totalTimeSpent", history: "$history" } },  // Agrupar las secciones
    //       history: { $push: "$history" }, // Incluir el historial completo
    //       email: { $first: "$email" }, // Obtener el email del primer documento
    //     },
    //   },

    //   // Proyectar el resultado final con el formato deseado
    //   {
    //     $project: {
    //       userId: "$_id.userId",
    //       companyName: "$_id.companyName",
    //       email: 1, // Incluir el email en la respuesta
    //       totalTimeSpentInApp: 1,
    //       sections: 1,
    //       history: { $arrayElemAt: ["$history", 0] }, // Usamos arrayElemAt para traer solo un historial completo
    //       _id: 0,  // Excluir el campo _id
    //     },
    //   },
    // ]).toArray();


    const companyData = await analytics.aggregate([
      { $match: { namecompanie } }, // Filtrar por empresa

      { $unwind: "$history" }, // Descomponer historial

      { $sort: { userId: 1, "history.createAt": 1 } }, // Ordenar por usuario y fecha ascendente

      {
        $setWindowFields: {
          partitionBy: "$userId",
          sortBy: { "history.createAt": 1 },
          output: {
            prevCreateAt: { $shift: { output: "$history.createAt", by: -1 } } // Obtener fecha del evento anterior
          }
        }
      },

      {
        $set: {
          timeDifference: {
            $cond: {
              if: { $gt: [{ $subtract: ["$history.createAt", "$prevCreateAt"] }, 3 * 60 * 60 * 1000] }, // Si diferencia > 3h
              then: 1,
              else: 0
            }
          }
        }
      },

      {
        $setWindowFields: {
          partitionBy: "$userId",
          sortBy: { "history.createAt": 1 },
          output: {
            batchId: { $sum: "$timeDifference" } // Sumar para crear identificadores de lotes
          }
        }
      },

      {
        $group: {
          _id: { userId: "$userId", companyName: "$namecompanie", batchId: "$batchId" },
          email: { $first: "$email" },
          diahora: { $first: "$history.createAt" }, // Primer registro del lote
          sections: {
            $push: { section: "$history.section", timeSpent: "$history.timeSpent" }
          },
          historical: { $push: "$history" } // Guardar historial completo
        }
      },

      {
        $group: {
          _id: { userId: "$_id.userId", email: "$email", companyName: "$_id.companyName" },
          lots: {
            $push: {
              diahora: "$diahora",
              historical: "$historical",
              sections: "$sections"
            }
          }
        }
      },

      {
        $project: {
          _id: 0,
          userId: "$_id.userId",
          email: "$_id.email",
          companyName: "$_id.companyName",
          lots: 1
        }
      }
    ]).toArray();



    if (!companyData) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json(companyData);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}