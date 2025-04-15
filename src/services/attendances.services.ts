import clientPromise from "../../lib/mongoose";

interface AttendanceRecord {
  userId: string;
  email: string;
  companyName: string;
  action: 'getIn' | 'getOut';
  timestamp: Date;
}

export async function registerAttendance(record: AttendanceRecord) {
  const dbName = process.env.NODE_ENV === "development" ? "menuDevDB" : "menuDB";
  const client = await clientPromise;
  const db = client.db(dbName);
  
  try {
    // 1. Verificar en companies si el usuario pertenece al staff
    const company = await db.collection('companies').findOne(
      { companyName: record.companyName },
      { projection: { 'hojas.staff': 1 } }
    );

    if (!company) {
      throw new Error('Company not found');
    }

    const isStaff = company.hojas.staff.some((member: any) => 
      member.email.toLowerCase() === record.email.toLowerCase()
    );

    if (!isStaff) {
      throw new Error('User is not in company staff');
    }

    // 2. Registrar en employeesauth
    const result = await db.collection('employeesauth').insertOne({
      ...record,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return {
      success: true,
      recordId: result.insertedId,
      action: record.action,
      timestamp: record.timestamp
    };
    
  } catch (error) {
    console.error('Error in registerAttendance:', error);
    throw error;
  }
}

export async function getTodayShifts(email: string, companyName: string) {
  const dbName = process.env.NODE_ENV === "development" ? "menuDevDB" : "menuDB";
  const client = await clientPromise;
  const db = client.db(dbName);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return db.collection('employeesauth')
    .find({
      email,
      companyName,
      timestamp: { $gte: today }
    })
    .sort({ timestamp: 1 })
    .toArray();
}