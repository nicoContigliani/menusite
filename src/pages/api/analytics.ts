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
    // const client = await clientPromise;
    // const db = client.db("menuDB");
    const dbName = process.env.NODE_ENV === "development" ? "menuDevDB" : "menuDB";
    const client = await clientPromise;
    const db = client.db(dbName);
    const trackes = db.collection("tracktimes");
    const analytics = db.collection("analytics");
    const analyticsBacup = db.collection("analyticsbuckups");



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
            clicks: { $first: "$clicks" }
          }
        }
      ], { allowDiskUse: true }).toArray();

      if (!companyData || companyData.length === 0) {
        return res.status(404).json({ error: 'Company not found' });
      }

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

        const validHistoricalData = historicalData.filter((record: any) => record.createAt != null);

        if (validHistoricalData.length === 0) continue;

        validHistoricalData.sort((a: any, b: any) => a.createAt - b.createAt);

        const lots = [];
        let currentLot = [];
        let firstTimestamp = validHistoricalData[0].createAt;

        for (const record of validHistoricalData) {
          const timeDifference = (record.createAt - firstTimestamp) / (1000 * 60 * 60);

          if (timeDifference > 3) {
            if (currentLot.length > 0) {
              lots.push([...currentLot]);
            }
            currentLot = [];
            firstTimestamp = record.createAt;
          }

          currentLot.push(record);
        }

        if (currentLot.length > 0) {
          lots.push([...currentLot]);
        }

        for (const lot of lots) {
          const startTime = lot[0]?.createAt ?? null;
          const endTime = lot[lot.length - 1]?.createAt ?? null;

          const clickCounts: any = {};
          if (Array.isArray(data.clicks)) {
            for (const click of data.clicks) {
              const key = `${click.section}-${click.element}`;
              clickCounts[key] = (clickCounts[key] || 0) + 1;
            }
          }

          // Limit the size of historical data stored in analytics
          const maxHistoricalSize = 100; // Adjust as needed
          const trimmedHistorical = lot.slice(0, maxHistoricalSize);

          const lotData = {
            startTime,
            endTime,
            historical: trimmedHistorical,
            sections: trimmedHistorical.map((h) => ({
              section: h.section,
              timeSpent: h.timeSpent
            })),
            clicks: clickCounts
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
