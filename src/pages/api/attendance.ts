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