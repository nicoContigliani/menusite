// // import { NextApiRequest, NextApiResponse } from 'next';
// // import clientPromise from '../../../lib/mongoose';


// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method !== 'POST') {
// //     return res.status(405).json({ error: 'Method not allowed' });
// //   }

// //   try {
// //     const { userId,email, companyName } = req.body;

// //     // 1. Validación básica
// //     if (!email || !companyName) {
// //       return res.status(400).json({ error: 'Email and company name are required' });
// //     }

// //     const client = await clientPromise;
// //     const db = client.db(process.env.NODE_ENV === "development" ? "menuDevDB" : "menuDB");

// //     // 2. Consultar en companies para verificar si es staff
// //     const company = await db.collection('companies').findOne(
// //       { companyName },
// //       { projection: { 'hojas.staff': 1 } }
// //     );

// //     if (!company) {
// //       return res.status(404).json({ error: 'Company not found' });
// //     }

// //     const staffMember = company.hojas.staff.find((member: any) =>
// //       member.email.toLowerCase() === email.toLowerCase()
// //     );

// //     if (!staffMember) {
// //       return res.status(403).json({ error: 'User is not in company staff' });
// //     }

// //     // 3. Registrar en employeesauth
// //     const currentTime = new Date();
// //     const today = new Date(currentTime);
// //     today.setHours(0, 0, 0, 0);

// //     // Verificar si ya tiene registro hoy
// //     const existingRecord = await db.collection('employeesauth').findOne({
// //       email,
// //       companyName,
// //       date: { $gte: today }
// //     });

// //     let result;
// //     if (existingRecord) {
// //       // Actualizar salida
// //       result = await db.collection('employeesauth').updateOne(
// //         { _id: existingRecord._id },
// //         { $set: { exitTime: currentTime } }
// //       );
// //     } else {
// //       // Insertar nueva entrada
// //       result = await db.collection('employeesauth').insertOne({
// //         // userId: staffMember.userId || email,
// //         email,
// //         companyName,
// //         date: today,
// //         entryTime: currentTime,
// //         exitTime: null,
// //         role: staffMember.role,
// //         department: staffMember.department,
// //         createdAt: currentTime,
// //         updatedAt: currentTime
// //       });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       action: existingRecord ? 'exit' : 'entry',
// //       timestamp: currentTime.toISOString()
// //     });

// //   } catch (error) {
// //     console.error('Error in attendance registration:', error);
// //     return res.status(500).json({ error: 'Internal server error' });
// //   }
// // }


// import clientPromise from "../../../lib/mongoose";



// interface AttendanceRecord {
//   userId: string;
//   email: string;
//   companyName: string;
//   action: 'getIn' | 'getOut';
//   timestamp: Date;
// }

// export async function registerAttendance(record: AttendanceRecord) {
//   const dbName = process.env.NODE_ENV === "development" ? "menuDevDB" : "menuDB";
//   const client = await clientPromise;
//   const db = client.db(dbName);
  
//   try {
//     // 1. Verificar en companies si el usuario pertenece al staff
//     const company = await db.collection('companies').findOne(
//       { companyName: record.companyName },
//       { projection: { 'hojas.staff': 1 } }
//     );

//     if (!company) {
//       throw new Error('Company not found');
//     }

//     const isStaff = company.hojas.staff.some((member: any) => 
//       member.email.toLowerCase() === record.email.toLowerCase()
//     );

//     if (!isStaff) {
//       throw new Error('User is not in company staff');
//     }

//     // 2. Registrar en employeesauth
//     const result = await db.collection('employeesauth').insertOne({
//       ...record,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     });

//     return {
//       success: true,
//       recordId: result.insertedId,
//       action: record.action,
//       timestamp: record.timestamp
//     };
    
//   } catch (error) {
//     console.error('Error in registerAttendance:', error);
//     throw error;
//   }
// }

// export async function getTodayShifts(email: string, companyName: string) {
//   const dbName = process.env.NODE_ENV === "development" ? "menuDevDB" : "menuDB";
//   const client = await clientPromise;
//   const db = client.db(dbName);
  
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   return db.collection('employeesauth')
//     .find({
//       email,
//       companyName,
//       timestamp: { $gte: today }
//     })
//     .sort({ timestamp: 1 })
//     .toArray();
// }


import { getTodayShifts, registerAttendance } from '@/services/attendances.services';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { action, email, companyName } = req.body;
      
      if (!['getIn', 'getOut'].includes(action)) {
        return res.status(400).json({ error: 'Invalid action' });
      }

      if (!email || !companyName) {
        return res.status(400).json({ error: 'Email and company name are required' });
      }

      const result = await registerAttendance({
        email,
        companyName,
        action,
        timestamp: new Date(),
        userId: email // Puedes usar el email como ID si no tienes otro identificador
      });

      return res.status(200).json(result);

    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  } 
  else if (req.method === 'GET') {
    try {
      const { email, companyName } = req.query;
      
      if (!email || !companyName) {
        return res.status(400).json({ error: 'Email and company name are required' });
      }

      const shifts = await getTodayShifts(
        email as string, 
        companyName as string
      );

      return res.status(200).json({ shifts });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}