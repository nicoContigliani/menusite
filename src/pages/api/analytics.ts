// import { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../../lib/mongoose';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   const { companyname } = req.query;
//   const namecompanie = companyname

//   const client = await clientPromise;
//   const db = client.db("menuDB");
//   const trackes = db.collection("tracktimes");

//   if (!companyname || typeof companyname !== 'string') {
//     return res.status(400).json({ error: 'Company name is required' });
//   }

//   try {

//     // Buscar documentos con el nombre de la compañía
//     // const companyData = await trackes.find({ namecompanie }).toArray();



//     // const companyData = await trackes.aggregate([
//     //   // Filtrar por el nombre de la compañía
//     //   { $match: { namecompanie } },

//     //   // Descomponer el campo "history" que contiene las secciones
//     //   { $unwind: "$history" },

//     //   // Ordenar los elementos de "history" por la fecha de creación
//     //   { $sort: { "history.createAt": 1 } }, // Ordena por createAt (ascendente)

//     //   // Agrupar por "userId", "namecompanie" y "history.section", sumando los tiempos
//     //   {
//     //     $group: {
//     //       _id: { userId: "$userId", companyName: "$namecompanie", section: "$history.section" },
//     //       totalTimeSpent: { $sum: "$history.timeSpent" },  // Sumar el tiempo total en esa sección
//     //       history: { $push: "$history" }, // Almacenar el historial de cada sección
//     //       email: { $first: "$email" }, // Incluir el email del primer documento
//     //     },
//     //   },

//     //   // Agrupar por usuario y compañía para combinar secciones con el mismo nombre
//     //   {
//     //     $group: {
//     //       _id: { userId: "$_id.userId", companyName: "$_id.companyName" },
//     //       totalTimeSpentInApp: { $sum: "$totalTimeSpent" },  // Tiempo total en la app
//     //       sections: { $push: { section: "$_id.section", timeSpent: "$totalTimeSpent", history: "$history" } },  // Agrupar las secciones
//     //       history: { $push: "$history" }, // Incluir el historial completo
//     //       email: { $first: "$email" }, // Obtener el email del primer documento
//     //     },
//     //   },

//     //   // Proyectar el resultado final con el formato deseado
//     //   {
//     //     $project: {
//     //       userId: "$_id.userId",
//     //       companyName: "$_id.companyName",
//     //       email: 1, // Incluir el email en la respuesta
//     //       totalTimeSpentInApp: 1,
//     //       sections: 1,
//     //       history: { $arrayElemAt: ["$history", 0] }, // Usamos arrayElemAt para traer solo un historial completo
//     //       _id: 0,  // Excluir el campo _id
//     //     },
//     //   },
//     // ]).toArray();


//     const companyData = await trackes.aggregate([
//       { $match: { namecompanie } }, // Filtrar por empresa

//       { $unwind: "$history" }, // Descomponer historial

//       { $sort: { userId: 1, "history.createAt": 1 } }, // Ordenar por usuario y fecha ascendente

//       {
//         $setWindowFields: {
//           partitionBy: "$userId",
//           sortBy: { "history.createAt": 1 },
//           output: {
//             prevCreateAt: { $shift: { output: "$history.createAt", by: -1 } } // Obtener fecha del evento anterior
//           }
//         }
//       },

//       {
//         $set: {
//           timeDifference: {
//             $cond: {
//               if: { $gt: [{ $subtract: ["$history.createAt", "$prevCreateAt"] }, 3 * 60 * 60 * 1000] }, // Si diferencia > 3h
//               then: 1,
//               else: 0
//             }
//           }
//         }
//       },

//       {
//         $setWindowFields: {
//           partitionBy: "$userId",
//           sortBy: { "history.createAt": 1 },
//           output: {
//             batchId: { $sum: "$timeDifference" } // Sumar para crear identificadores de lotes
//           }
//         }
//       },

//       {
//         $group: {
//           _id: { userId: "$userId", companyName: "$namecompanie", batchId: "$batchId" },
//           email: { $first: "$email" },
//           diahora: { $first: "$history.createAt" }, // Primer registro del lote
//           sections: {
//             $push: { section: "$history.section", timeSpent: "$history.timeSpent" }
//           },
//           historical: { $push: "$history" } // Guardar historial completo
//         }
//       },

//       {
//         $group: {
//           _id: { userId: "$_id.userId", email: "$email", companyName: "$_id.companyName" },
//           lots: {
//             $push: {
//               diahora: "$diahora",
//               historical: "$historical",
//               sections: "$sections"
//             }
//           }
//         }
//       },

//       {
//         $project: {
//           _id: 0,
//           userId: "$_id.userId",
//           email: "$_id.email",
//           companyName: "$_id.companyName",
//           lots: 1
//         }
//       }
//     ]).toArray();



//     if (!companyData) {
//       return res.status(404).json({ error: 'Company not found' });
//     }

//     res.status(200).json(companyData);
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }


// const client = await clientPromise;
// const db = client.db("menuDB");
// const trackes = db.collection("analytics");



//********************************************************* */


// import { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../../lib/mongoose';
// import { Document } from 'mongodb';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   const { companyname } = req.query;

//   if (!companyname || typeof companyname !== 'string') {
//     return res.status(400).json({ error: 'Company name is required' });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db("menuDB");
//     const trackes = db.collection("tracktimes");
//     const analytics = db.collection("analytics");

//     // Obtener datos de tracktimes
//     const companyData = await trackes.aggregate([
//       { $match: { namecompanie: companyname } },
//       { $unwind: "$history" },
//       { $sort: { userId: 1, "history.createAt": 1 } },
//       {
//         $setWindowFields: {
//           partitionBy: "$userId",
//           sortBy: { "history.createAt": 1 },
//           output: {
//             prevCreateAt: { $shift: { output: "$history.createAt", by: -1 } }
//           }
//         }
//       },
//       {
//         $set: {
//           timeDifference: {
//             $cond: {
//               if: { $gt: [{ $subtract: ["$history.createAt", "$prevCreateAt"] }, 3 * 60 * 60 * 1000] },
//               then: 1,
//               else: 0
//             }
//           }
//         }
//       },
//       {
//         $setWindowFields: {
//           partitionBy: "$userId",
//           sortBy: { "history.createAt": 1 },
//           output: {
//             batchId: { $sum: "$timeDifference" }
//           }
//         }
//       },
//       {
//         $group: {
//           _id: { userId: "$userId", companyName: "$namecompanie", batchId: "$batchId" },
//           email: { $first: "$email" },
//           diahora: { $min: "$history.createAt" }, // Changed to $min to get the earliest timestamp in the batch
//           sections: { $push: { section: "$history.section", timeSpent: "$history.timeSpent" } },
//           historical: { $push: "$history" }
//         }
//       },
//       {
//         $group: {
//           _id: { userId: "$_id.userId", email: "$email", companyName: "$_id.companyName" },
//           lots: {
//             $push: {
//               diahora: "$diahora",
//               historical: "$historical",
//               sections: "$sections"
//             }
//           }
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           userId: "$_id.userId",
//           email: "$_id.email",
//           companyName: "$_id.companyName",
//           lots: 1
//         }
//       }
//     ]).toArray();

//     if (!companyData || companyData.length === 0) {
//       return res.status(404).json({ error: 'Company not found' });
//     }

//     // Insertar o actualizar en analytics
//     for (const data of companyData) {
//       await analytics.updateOne(
//         { userId: data.userId, companyName: data.companyName },
//         {
//           $push: { lots: { $each: data.lots } } as unknown as Document
//         },
//         { upsert: true }
//       );
//     }

//     res.status(200).json({ message: "Data inserted into analytics successfully", companyData });
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongoose';
import { Document, UpdateFilter } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { companyname } = req.query;

  if (!companyname || typeof companyname !== 'string') {
    return res.status(400).json({ error: 'Company name is required' });
  }

  try {
    // const client = await clientPromise;
    // const db = client.db("menuDB");
    // const trackes = db.collection("tracktimes");
    // const analytics = db.collection("analytics");

    // // Obtener datos de tracktimes
    // const companyData = await trackes.aggregate([
    //   { $match: { namecompanie: companyname } },
    //   { $unwind: "$history" },
    //   {
    //     $addFields: {
    //       "history.createAt": { $toDate: "$history.createAt" }
    //     }
    //   },
    //   { $sort: { userId: 1, "history.createAt": 1 } },
    //   {
    //     $group: {
    //       _id: "$userId",  // Agrupar por userId
    //       email: { $first: "$email" },
    //       companyName: { $first: "$namecompanie" },
    //       history: { $push: "$history" }
    //     }
    //   }
    // ]).toArray();

    // if (!companyData || companyData.length === 0) {
    //   return res.status(404).json({ error: 'Company not found' });
    // }

    // // Insertar o actualizar en analytics
    // for (const data of companyData) {
    //   const historicalData = data.history || [];

    //   // Si no hay datos en el historial, no se inserta el lote
    //   if (historicalData.length === 0) continue;

    //   // Obtener primer y último timestamp del lote
    //   const startTime = historicalData[0]?.startTime ?? null;
    //   const endTime = historicalData[historicalData?.length - 1].endTime ?? null;

    //   const lotData = {
    //     startTime,
    //     endTime,
    //     historical: historicalData,
    //     sections: historicalData.map((h: any) => ({
    //       section: h.section,
    //       timeSpent: h.timeSpent
    //     }))
    //   };

    //   // Asegurarse de que `lotData` esté dentro de un array
    //   const updateOperation: UpdateFilter<Document> = {
    //     $push: { lots: lotData } as any
    //   };

    //   // Asegúrate de que el `userId` se usa correctamente
    //   await analytics.updateOne(
    //     { userId: data._id, companyName: data.companyName, email: data.email },  // Aquí usamos `data._id`, que es el `userId` agrupado
    //     updateOperation,
    //     { upsert: true }
    //   );
    // }

    // res.status(200).json({ message: "Data inserted into analytics successfully", companyData });



    // const client = await clientPromise;
    // const db = client.db("menuDB");
    // const trackes = db.collection("tracktimes");
    // const analytics = db.collection("analytics");

    // // Obtener datos de tracktimes
    // const companyData = await trackes.aggregate([
    //   { $match: { namecompanie: companyname } },
    //   { $unwind: "$history" },
    //   {
    //     $addFields: {
    //       "history.createAt": { $toDate: "$history.createAt" } // Convertir a fecha
    //     }
    //   },
    //   { $sort: { userId: 1, "history.createAt": 1 } }, // Ordenar por userId y createAt
    //   {
    //     $group: {
    //       _id: "$userId",  // Agrupar por userId
    //       email: { $first: "$email" },
    //       companyName: { $first: "$namecompanie" },
    //       history: { $push: "$history" }
    //     }
    //   }
    // ]).toArray();

    // if (!companyData || companyData.length === 0) {
    //   return res.status(404).json({ error: 'Company not found' });
    // }

    // // Insertar o actualizar en analytics
    // for (const data of companyData) {
    //   const historicalData = data.history || [];

    //   if (historicalData.length === 0) continue; // Si no hay datos, continuar

    //   // Ordenar el historial por createAt (por si acaso)
    //   historicalData.sort((a: { createAt: number }, b: { createAt: number }) => a.createAt - b.createAt);

    //   // Crear lotes cada 3 horas
    //   const lots = [];
    //   let currentLot = [];
    //   let lastTimestamp = historicalData[0].createAt; // Primer timestamp
    //   console.log("🚀 ~ handler ~ historicalData:", historicalData[0])

    //   for (const record of historicalData) {
    //     const timeDifference = (record.createAt - lastTimestamp) / (1000 * 60 * 60); // Diferencia en horas

    //     if (timeDifference > 3) {
    //       // Si la diferencia es mayor a 3 horas, crear un nuevo lote
    //       lots.push(currentLot);
    //       currentLot = [];
    //     }

    //     currentLot.push(record); // Agregar registro al lote actual
    //     lastTimestamp = record.createAt; // Actualizar último timestamp
    //   }

    //   // Agregar el último lote
    //   if (currentLot.length > 0) {
    //     lots.push(currentLot);
    //   }

    //   // Insertar cada lote en analytics
    //   for (const lot of lots) {
    //     const startTime = lot[0]?.createAt ?? null;
    //     const endTime = lot[lot.length - 1]?.createAt ?? null;

    //     const lotData = {
    //       startTime,
    //       endTime,
    //       historical: lot,
    //       sections: lot.map((h: any) => ({
    //         section: h.section,
    //         timeSpent: h.timeSpent
    //       }))
    //     };

    //     const updateOperation: UpdateFilter<Document> = {
    //       $push: { lots: lotData } as any
    //     };

    //     await analytics.updateOne(
    //       { userId: data._id, companyName: data.companyName, email: data.email },
    //       updateOperation,
    //       { upsert: true }
    //     );
    //   }
    // }



    const client = await clientPromise;
    const db = client.db("menuDB");
    const trackes = db.collection("tracktimes");
    const analytics = db.collection("analytics");
    
    // Obtener datos de tracktimes
    const companyData = await trackes.aggregate([
      { $match: { namecompanie: companyname } },
      { $unwind: "$history" },
      {
        $addFields: {
          "history.createAt": {
            $cond: {
              if: { $eq: [{ $type: "$history.createAt" }, "date"] }, // Verificar si es un tipo 'date'
              then: "$history.createAt", // Mantener como está si es una fecha válida
              else: new Date() // Si no es válida, asignar la fecha actual
            }
          }
        }
      },
      { $sort: { userId: 1, "history.createAt": 1 } }, // Ordenar por userId y createAt
      {
        $group: {
          _id: "$userId",  // Agrupar por userId
          email: { $first: "$email" },
          companyName: { $first: "$namecompanie" },
          history: { $push: "$history" }
        }
      }
    ]).toArray();
    
    if (!companyData || companyData.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    // Insertar o actualizar en analytics
    for (const data of companyData) {
      const historicalData = data.history || [];
    
      if (historicalData.length === 0) continue; // Si no hay datos, continuar
    
      // Filtrar registros con createAt nulo (si quedan después de la validación anterior)
      const validHistoricalData = historicalData.filter((record:any) => record.createAt != null);
    
      if (validHistoricalData.length === 0) continue; // Si no hay datos válidos, continuar
    
      // Ordenar el historial por createAt (por si acaso)
      validHistoricalData.sort((a: { createAt: number }, b: { createAt: number }) => a.createAt - b.createAt);
    
      // Crear lotes cada 3 horas
      const lots = [];
      let currentLot = [];
      let lastTimestamp = validHistoricalData[0].createAt; // Primer timestamp
      console.log("🚀 ~ handler ~ historicalData:", validHistoricalData[0])
    
      for (const record of validHistoricalData) {
        const timeDifference = (record.createAt - lastTimestamp) / (1000 * 60 * 60); // Diferencia en horas
    
        if (timeDifference > 3) {
          // Si la diferencia es mayor a 3 horas, crear un nuevo lote
          lots.push(currentLot);
          currentLot = [];
        }
    
        currentLot.push(record); // Agregar registro al lote actual
        lastTimestamp = record.createAt; // Actualizar último timestamp
      }
    
      // Agregar el último lote
      if (currentLot.length > 0) {
        lots.push(currentLot);
      }
    
      // Insertar cada lote en analytics
      for (const lot of lots) {
        const startTime = lot[0]?.createAt ?? null;
        const endTime = lot[lot.length - 1]?.createAt ?? null;
    
        const lotData = {
          startTime,
          endTime,
          historical: lot,
          sections: lot.map((h) => ({
            section: h.section,
            timeSpent: h.timeSpent
          }))
        };
    
        const updateOperation:any = {
          $push: { lots: lotData }
        };
    
        await analytics.updateOne(
          { userId: data._id, companyName: data.companyName, email: data.email },
          updateOperation,
          { upsert: true }
        );
      }
    }
    



    res.status(200).json({ message: "Data inserted into analytics successfully", companyData });

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
