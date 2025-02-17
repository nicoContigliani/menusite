// import { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../../lib/mongoose';
// import { Document, UpdateFilter } from 'mongodb';

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
//       {
//         $addFields: {
//           "history.createAt": {
//             $cond: {
//               if: { $eq: [{ $type: "$history.createAt" }, "date"] }, // Verificar si es un tipo 'date'
//               then: "$history.createAt", // Mantener como está si es una fecha válida
//               else: new Date() // Si no es válida, asignar la fecha actual
//             }
//           }
//         }
//       },
//       { $sort: { userId: 1, "history.createAt": 1 } }, // Ordenar por userId y createAt
//       {
//         $group: {
//           _id: "$userId",  // Agrupar por userId
//           email: { $first: "$email" },
//           companyName: { $first: "$namecompanie" },
//           history: { $push: "$history" }
//         }
//       }
//     ]).toArray();

//     if (!companyData || companyData.length === 0) {
//       return res.status(404).json({ error: 'Company not found' });
//     }

//     // Insertar o actualizar en analytics
//     for (const data of companyData) {
//       const historicalData = data.history || [];

//       if (historicalData.length === 0) continue; // Si no hay datos, continuar

//       // Filtrar registros con createAt nulo (si quedan después de la validación anterior)
//       const validHistoricalData = historicalData.filter((record: any) => record.createAt != null);

//       if (validHistoricalData.length === 0) continue; // Si no hay datos válidos, continuar

//       // Ordenar el historial por createAt (por si acaso)
//       validHistoricalData.sort((a: { createAt: number }, b: { createAt: number }) => a.createAt - b.createAt);

//       // Crear lotes cada 3 horas
//       const lots = [];
//       let currentLot = [];
//       let lastTimestamp = validHistoricalData[0].createAt; // Primer timestamp
//       console.log("🚀 ~ handler ~ historicalData:", validHistoricalData[0])

//       for (const record of validHistoricalData) {
//         const timeDifference = (record.createAt - lastTimestamp) / (1000 * 60 * 60); // Diferencia en horas

//         if (timeDifference > 3) {
//           // Si la diferencia es mayor a 3 horas, crear un nuevo lote
//           lots.push(currentLot);
//           currentLot = [];
//         }

//         currentLot.push(record); // Agregar registro al lote actual
//         lastTimestamp = record.createAt; // Actualizar último timestamp
//       }

//       // Agregar el último lote
//       if (currentLot.length > 0) {
//         lots.push(currentLot);
//       }

//       // Insertar cada lote en analytics
//       for (const lot of lots) {
//         const startTime = lot[0]?.createAt ?? null;
//         const endTime = lot[lot.length - 1]?.createAt ?? null;

//         const lotData = {
//           startTime,
//           endTime,
//           historical: lot,
//           sections: lot.map((h) => ({
//             section: h.section,
//             timeSpent: h.timeSpent
//           }))
//         };

//         const updateOperation: any = {
//           $push: { lots: lotData }
//         };

//         await analytics.updateOne(
//           { userId: data._id, companyName: data.companyName, email: data.email },
//           updateOperation,
//           { upsert: true }
//         );
//       }
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
      let historicalData = data.history || [];

      if (historicalData.length === 0) {
        // Si no hay historial, crear un historial vacío predeterminado
        const defaultHistory = [{
          createAt: new Date(), // Fecha actual
          section: "default",   // Sección por defecto
          timeSpent: 0          // Tiempo por defecto
        }];
        // Usar el historial predeterminado
        historicalData.push(...defaultHistory);
      }

      // Filtrar registros con createAt nulo (si quedan después de la validación anterior)
      const validHistoricalData = historicalData.filter((record: any) => record.createAt != null);

      if (validHistoricalData.length === 0) continue; // Si no hay datos válidos, continuar

      // Ordenar el historial por createAt (por si acaso)
      validHistoricalData.sort((a: { createAt: number }, b: { createAt: number }) => a.createAt - b.createAt);

      // Crear lotes cada 3 horas
      const lots = [];
      let currentLot = [];
      let lastTimestamp = validHistoricalData[0].createAt; // Primer timestamp

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

        const updateOperation: any = {
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
