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



    const companyData = await analytics.aggregate([
      // Filtrar por el nombre de la compañía
      { $match: { namecompanie } },
      
      // Descomponer el campo "history" que contiene las secciones
      { $unwind: "$history" },

      // Ordenar los elementos de "history" por la fecha de creación
      { $sort: { "history.createAt": 1 } }, // Ordena por createAt (ascendente)

      // Agrupar por "userId", "namecompanie" y "history.section", sumando los tiempos
      {
        $group: {
          _id: { userId: "$userId", companyName: "$namecompanie", section: "$history.section" },
          totalTimeSpent: { $sum: "$history.timeSpent" },  // Sumar el tiempo total en esa sección
          history: { $push: "$history" }, // Almacenar el historial de cada sección
          email: { $first: "$email" }, // Incluir el email del primer documento
        },
      },

      // Agrupar por usuario y compañía para combinar secciones con el mismo nombre
      {
        $group: {
          _id: { userId: "$_id.userId", companyName: "$_id.companyName" },
          totalTimeSpentInApp: { $sum: "$totalTimeSpent" },  // Tiempo total en la app
          sections: { $push: { section: "$_id.section", timeSpent: "$totalTimeSpent", history: "$history" } },  // Agrupar las secciones
          history: { $push: "$history" }, // Incluir el historial completo
          email: { $first: "$email" }, // Obtener el email del primer documento
        },
      },

      // Proyectar el resultado final con el formato deseado
      {
        $project: {
          userId: "$_id.userId",
          companyName: "$_id.companyName",
          email: 1, // Incluir el email en la respuesta
          totalTimeSpentInApp: 1,
          sections: 1,
          history: { $arrayElemAt: ["$history", 0] }, // Usamos arrayElemAt para traer solo un historial completo
          _id: 0,  // Excluir el campo _id
        },
      },
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