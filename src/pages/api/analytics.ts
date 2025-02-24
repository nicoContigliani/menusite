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
//       let historicalData = data.history || [];

//       if (historicalData.length === 0) {
//         // Si no hay historial, crear un historial vacío predeterminado
//         const defaultHistory = [{
//           createAt: new Date(), // Fecha actual
//           section: "default",   // Sección por defecto
//           timeSpent: 0          // Tiempo por defecto
//         }];
//         // Usar el historial predeterminado
//         historicalData.push(...defaultHistory);
//       }

//       // Filtrar registros con createAt nulo (si quedan después de la validación anterior)
//       const validHistoricalData = historicalData.filter((record: any) => record.createAt != null);

//       if (validHistoricalData.length === 0) continue; // Si no hay datos válidos, continuar

//       // Ordenar el historial por createAt (por si acaso)
//       validHistoricalData.sort((a: { createAt: number }, b: { createAt: number }) => a.createAt - b.createAt);

//       // Crear lotes cada 3 horas
//       const lots = [];
//       let currentLot = [];
//       let lastTimestamp = validHistoricalData[0].createAt; // Primer timestamp

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



//************************************************ */

// import { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../../lib/mongoose';
// import { Document, UpdateFilter } from 'mongodb';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { companyname } = req.query;

//   if (!companyname || typeof companyname !== 'string') {
//     return res.status(400).json({ error: 'Company name is required' });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db("menuDB");
//     const trackes = db.collection("tracktimes");
//     const analytics = db.collection("analytics");

//     // Handle GET request
//     if (req.method === 'GET') {
//       const companyData = await trackes.aggregate([
//         { $match: { namecompanie: companyname } },
//         { $unwind: "$history" },
//         {
//           $addFields: {
//             "history.createAt": {
//               $cond: {
//                 if: { $eq: [{ $type: "$history.createAt" }, "date"] },
//                 then: "$history.createAt",
//                 else: new Date()
//               }
//             }
//           }
//         },
//         { $sort: { userId: 1, "history.createAt": 1 } },
//         {
//           $group: {
//             _id: "$userId",
//             email: { $first: "$email" },
//             companyName: { $first: "$namecompanie" },
//             history: { $push: "$history" }
//           }
//         }
//       ]).toArray();

//       if (!companyData || companyData.length === 0) {
//         return res.status(404).json({ error: 'Company not found' });
//       }

//       // Insert or update in analytics as before
//       for (const data of companyData) {
//         let historicalData = data.history || [];
//         if (historicalData.length === 0) {
//           const defaultHistory = [{
//             createAt: new Date(),
//             section: "default",
//             timeSpent: 0
//           }];
//           historicalData.push(...defaultHistory);
//         }

//         const validHistoricalData = historicalData.filter((record: any) => record.createAt != null);

//         if (validHistoricalData.length === 0) continue;

//         validHistoricalData.sort((a: { createAt: number }, b: { createAt: number }) => a.createAt - b.createAt);

//         const lots = [];
//         let currentLot = [];
//         let lastTimestamp = validHistoricalData[0].createAt;

//         for (const record of validHistoricalData) {
//           const timeDifference = (record.createAt - lastTimestamp) / (1000 * 60 * 60);
//           if (timeDifference > 3) {
//             lots.push(currentLot);
//             currentLot = [];
//           }
//           currentLot.push(record);
//           lastTimestamp = record.createAt;
//         }

//         if (currentLot.length > 0) {
//           lots.push(currentLot);
//         }

//         for (const lot of lots) {
//           const startTime = lot[0]?.createAt ?? null;
//           const endTime = lot[lot.length - 1]?.createAt ?? null;

//           const lotData = {
//             startTime,
//             endTime,
//             historical: lot,
//             sections: lot.map((h) => ({
//               section: h.section,
//               timeSpent: h.timeSpent
//             }))
//           };

//           const updateOperation: any = {
//             $push: { lots: lotData }
//           };

//           await analytics.updateOne(
//             { userId: data._id, companyName: data.companyName, email: data.email },
//             updateOperation,
//             { upsert: true }
//           );
//         }
//       }

//       return res.status(200).json({ message: "Data inserted into analytics successfully", companyData });

//     }

//     // Handle DELETE request
//     if (req.method === "DELETE") {
//       try {
//         // Primero verificamos si existen registros
//         const records = await trackes.find({ namecompanie: companyname }).toArray()

//         if (records.length === 0) {
//           // Si no se encuentran registros, solo informamos sin lanzar error 404
//           return res.status(200).json({
//             message: "No records found for this company, nothing to delete",
//             companyName: companyname,
//           })
//         }

//         // Si existen registros, procedemos a eliminarlos
//         const result = await trackes.deleteMany({ namecompanie: companyname })

//         // También eliminamos los analytics relacionados
//         await trackes.deleteMany({ companyName: companyname })

//         return res.status(200).json({
//           message: "Records deleted successfully",
//           deletedCount: result.deletedCount,
//           companyName: companyname,
//         })
//       } catch (error) {
//         console.error("Error deleting records:", error)
//         return res.status(500).json({ error: "Error deleting data" })
//       }
//     } 
//     return res.status(405).json({ error: 'Method Not Allowed' });

//   } catch (error) {
//     console.error("Database error:", error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongoose';
import { Document, UpdateFilter } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { companyname } = req.query;

  // Validar si el nombre de la compañía es correcto
  if (!companyname || typeof companyname !== 'string') {
    return res.status(400).json({ error: 'Invalid company name provided.' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("menuDB");
    const trackes = db.collection("tracktimes");
    const analytics = db.collection("analytics");

    // Manejo de la solicitud GET

    // if (req.method === 'GET') {
    //   const companyData = await trackes.aggregate([
    //     { $match: { namecompanie: companyname } },
    //     { $unwind: "$history" },
    //     {
    //       $addFields: {
    //         "history.createAt": {
    //           $cond: {
    //             if: { $eq: [{ $type: "$history.createAt" }, "date"] },
    //             then: "$history.createAt",
    //             else: new Date()
    //           }
    //         }
    //       }
    //     },
    //     { $sort: { userId: 1, "history.createAt": 1 } },
    //     {
    //       $group: {
    //         _id: "$userId",
    //         email: { $first: "$email" },
    //         companyName: { $first: "$namecompanie" },
    //         history: { $push: "$history" },
    //         clicks: { $first: "$clicks" } // Agregar los clicks al grupo
    //       }
    //     }
    //   ]).toArray();

    //   // Verificar si se encontraron datos de la empresa
    //   if (!companyData || companyData.length === 0) {
    //     return res.status(404).json({ error: 'Company not found' });
    //   }

    //   // Procesar los datos históricos para cada usuario
    //   for (const data of companyData) {
    //     let historicalData = data.history || [];
    //     if (historicalData.length === 0) {
    //       const defaultHistory = [{
    //         createAt: new Date(),
    //         section: "default",
    //         timeSpent: 0
    //       }];
    //       historicalData.push(...defaultHistory);
    //     }

    //     const validHistoricalData = historicalData.filter((record:any) => record.createAt != null);

    //     if (validHistoricalData.length === 0) continue;

    //     validHistoricalData.sort((a:any, b:any) => a.createAt - b.createAt);

    //     const lots = [];
    //     let currentLot = [];
    //     let lastTimestamp = validHistoricalData[0].createAt;

    //     // Agrupar los datos históricos en lotes
    //     for (const record of validHistoricalData) {
    //       const timeDifference = (record.createAt - lastTimestamp) / (1000 * 60 * 60); // Diferencia en horas
    //       if (timeDifference > 3) {
    //         lots.push(currentLot);
    //         currentLot = [];
    //       }
    //       currentLot.push(record);
    //       lastTimestamp = record.createAt;
    //     }

    //     if (currentLot.length > 0) {
    //       lots.push(currentLot);
    //     }

    //     // Insertar los lotes en la colección de 'analytics'
    //     for (const lot of lots) {
    //       const startTime = lot[0]?.createAt ?? null;
    //       const endTime = lot[lot.length - 1]?.createAt ?? null;

    //       // Contar los clicks por sección y elemento
    //       const clickCounts:any = {};
    //       for (const click of data.clicks) {
    //         const key = `${click.section}-${click.element}`;
    //         if (!clickCounts[key]) {
    //           clickCounts[key] = 0;
    //         }
    //         clickCounts[key]++;
    //       }

    //       const lotData = {
    //         startTime,
    //         endTime,
    //         historical: lot,
    //         sections: lot.map((h) => ({
    //           section: h.section,
    //           timeSpent: h.timeSpent
    //         })),
    //         clicks: clickCounts // Agregar los clicks al lote
    //       };

    //       const updateOperation:any = {
    //         $push: { lots: lotData }
    //       };

    //       await analytics.updateOne(
    //         { userId: data._id, companyName: data.companyName, email: data.email },
    //         updateOperation,
    //         { upsert: true }
    //       );
    //     }
    //   }

    //   return res.status(200).json({ message: "Data inserted into analytics successfully", companyData });
    // }








    // if (req.method === 'GET') {
    //   const companyData = await trackes.aggregate([
    //     { $match: { namecompanie: companyname } },
    //     { $unwind: "$history" },
    //     {
    //       $addFields: {
    //         "history.createAt": {
    //           $cond: {
    //             if: { $eq: [{ $type: "$history.createAt" }, "date"] },
    //             then: "$history.createAt",
    //             else: new Date()
    //           }
    //         }
    //       }
    //     },
    //     { $sort: { userId: 1, "history.createAt": 1 } },
    //     {
    //       $group: {
    //         _id: "$userId",
    //         email: { $first: "$email" },
    //         companyName: { $first: "$namecompanie" },
    //         history: { $push: "$history" },
    //         clicks: { $first: "$clicks" } // Agregar los clicks al grupo
    //       }
    //     }
    //   ]).toArray();

    //   // Verificar si se encontraron datos de la empresa
    //   if (!companyData || companyData.length === 0) {
    //     return res.status(404).json({ error: 'Company not found' });
    //   }

    //   // Procesar los datos históricos para cada usuario
    //   for (const data of companyData) {
    //     let historicalData = data.history || [];
    //     if (historicalData.length === 0) {
    //       const defaultHistory = [{
    //         createAt: new Date(),
    //         section: "default",
    //         timeSpent: 0
    //       }];
    //       historicalData.push(...defaultHistory);
    //     }

    //     const validHistoricalData = historicalData.filter((record:any) => record.createAt != null);

    //     if (validHistoricalData.length === 0) continue;

    //     validHistoricalData.sort((a:any, b:any) => a.createAt - b.createAt);

    //     const lots = [];
    //     let currentLot = [];
    //     let firstTimestamp = validHistoricalData[0].createAt;

    //     // Agrupar los datos históricos en lotes
    //     for (const record of validHistoricalData) {
    //       const timeDifference = (record.createAt - firstTimestamp) / (1000 * 60 * 60); // Diferencia en horas
    //       if (timeDifference > 3) {
    //         lots.push(currentLot);
    //         currentLot = [];
    //         firstTimestamp = record.createAt; // Actualizar el primer timestamp del nuevo lote
    //       }
    //       currentLot.push(record);
    //     }

    //     if (currentLot.length > 0) {
    //       lots.push(currentLot);
    //     }

    //     // Insertar los lotes en la colección de 'analytics'
    //     for (const lot of lots) {
    //       const startTime = lot[0]?.createAt ?? null;
    //       const endTime = lot[lot.length - 1]?.createAt ?? null;

    //       // Contar los clicks por sección y elemento
    //       const clickCounts:any = {};
    //       for (const click of data.clicks) {
    //         const key = `${click.section}-${click.element}`;
    //         if (!clickCounts[key]) {
    //           clickCounts[key] = 0;
    //         }
    //         clickCounts[key]++;
    //       }

    //       const lotData = {
    //         startTime,
    //         endTime,
    //         historical: lot,
    //         sections: lot.map((h) => ({
    //           section: h.section,
    //           timeSpent: h.timeSpent
    //         })),
    //         clicks: clickCounts // Agregar los clicks al lote
    //       };

    //       const updateOperation:any = {
    //         $push: { lots: lotData }
    //       };

    //       await analytics.updateOne(
    //         { userId: data._id, companyName: data.companyName, email: data.email },
    //         updateOperation,
    //         { upsert: true }
    //       );
    //     }
    //   }

    //   return res.status(200).json({ message: "Data inserted into analytics successfully", companyData });
    // }




    if (req.method === 'GET') {
      const companyData = await trackes.aggregate([
        { $match: { namecompanie: companyname } },
        { $unwind: "$history" },
        {
          $addFields: {
            "history.createAt": {
              $cond: {
                if: { $eq: [{ $type: "$history.createAt" }, "date"] },
                then: "$history.createAt",
                else: new Date()
              }
            }
          }
        },
        { $sort: { userId: 1, "history.createAt": 1 } },
        {
          $group: {
            _id: "$userId",
            email: { $first: "$email" },
            companyName: { $first: "$namecompanie" },
            history: { $push: "$history" },
            clicks: { $first: "$clicks" } // Agregar los clicks al grupo
          }
        }
      ]).toArray();

      // Verificar si se encontraron datos de la empresa
      if (!companyData || companyData.length === 0) {
        return res.status(404).json({ error: 'Company not found' });
      }

      // Procesar los datos históricos para cada usuario
      for (const data of companyData) {
        let historicalData = data.history || [];

        if (historicalData.length === 0) {
          const defaultHistory = [{
            createAt: new Date(),
            section: "default",
            timeSpent: 0
          }];
          historicalData.push(...defaultHistory);
        }

        // Filtrar datos válidos
        const validHistoricalData = historicalData.filter((record: any) => record.createAt != null);

        if (validHistoricalData.length === 0) continue;

        // Ordenar los datos por fecha
        validHistoricalData.sort((a: any, b: any) => a.createAt - b.createAt);

        // Agrupación en lotes de registros con menos de 3 horas de diferencia
        const lots = [];
        let currentLot = [];
        let firstTimestamp = validHistoricalData[0].createAt; // Primer timestamp del lote actual

        for (const record of validHistoricalData) {
          const timeDifference = (record.createAt - firstTimestamp) / (1000 * 60 * 60); // Diferencia en horas

          if (timeDifference > 3) {
            // Si la diferencia es mayor a 3 horas, cerramos el lote actual y empezamos uno nuevo
            if (currentLot.length > 0) {
              lots.push([...currentLot]); // Guardar el lote antes de vaciarlo
            }
            currentLot = []; // Reiniciar el lote
            firstTimestamp = record.createAt; // Actualizar el primer timestamp del nuevo lote
          }

          // Agregar el registro al lote actual
          currentLot.push(record);
        }

        // Agregar el último lote si tiene datos
        if (currentLot.length > 0) {
          lots.push([...currentLot]);
        }

        // Insertar los lotes en la colección de 'analytics'
        for (const lot of lots) {
          const startTime = lot[0]?.createAt ?? null;
          const endTime = lot[lot.length - 1]?.createAt ?? null;

          // Contar los clicks por sección y elemento
          const clickCounts: any = {};
          if (Array.isArray(data.clicks)) {
            for (const click of data.clicks) {
              const key = `${click.section}-${click.element}`;
              clickCounts[key] = (clickCounts[key] || 0) + 1;
            }
          }

          const lotData = {
            startTime,
            endTime,
            historical: lot,
            sections: lot.map((h) => ({
              section: h.section,
              timeSpent: h.timeSpent
            })),
            clicks: clickCounts // Agregar los clicks al lote
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

      return res.status(200).json({ message: "Data inserted into analytics successfully", companyData });
    }







    // Manejo de la solicitud DELETE
    if (req.method === "DELETE") {
      try {
        // Verificamos si existen registros para la compañía
        const records = await trackes.find({ namecompanie: companyname }).toArray();

        if (records.length === 0) {
          // Si no se encuentran registros, informamos sin lanzar error
          return res.status(200).json({
            message: "No records found for this company, nothing to delete",
            companyName: companyname,
          });
        }

        // Si existen registros, eliminamos los de 'tracktimes' y 'analytics'
        const result = await trackes.deleteMany({ namecompanie: companyname });
        // await analytics.deleteMany({ companyName: companyname });

        return res.status(200).json({
          message: "Records deleted successfully",
          deletedCount: result.deletedCount,
          companyName: companyname,
        });
      } catch (error) {
        console.error("Error deleting records:", error);
        return res.status(500).json({ error: "Error deleting data" });
      }
    }

    // Si el método HTTP no es GET ni DELETE
    return res.status(405).json({ error: 'Method Not Allowed' });

  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
