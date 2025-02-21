import type { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongoose"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { companyname } = req.query
  console.log("🚀 ~ handler ~ companyname:", companyname)

  if (!companyname || typeof companyname !== "string") {
    return res.status(400).json({ error: "Company name is required" })
  }

  try {
    const client = await clientPromise
    const db = client.db("menuDB")
    const trackes = db.collection("tracktimes")
    const analytics = db.collection("analytics")

    // Handle DELETE method
    if (req.method === "DELETE") {
      try {
        // Primero verificamos si existen registros
        const records = await trackes.find({ namecompanie: companyname }).toArray()

        if (records.length === 0) {
          // Si no se encuentran registros, solo informamos sin lanzar error 404
          return res.status(200).json({
            message: "No records found for this company, nothing to delete",
            companyName: companyname,
          })
        }

        // Si existen registros, procedemos a eliminarlos
        const result = await trackes.deleteMany({ namecompanie: companyname })

        // También eliminamos los analytics relacionados
        await analytics.deleteMany({ companyName: companyname })

        return res.status(200).json({
          message: "Records deleted successfully",
          deletedCount: result.deletedCount,
          companyName: companyname,
        })
      } catch (error) {
        console.error("Error deleting records:", error)
        return res.status(500).json({ error: "Error deleting data" })
      }
    } 
    
    // Handle GET method
    if (req.method === "GET") {
      // First stage: Match and unwind
      const pipeline = [
        {
          $match: {
            namecompanie: companyname,
          },
        },
        {
          $unwind: "$history",
        },
        {
          $addFields: {
            "history.createAt": {
              $cond: {
                if: { $eq: [{ $type: "$history.createAt" }, "date"] },
                then: "$history.createAt",
                else: new Date(),
              },
            },
          },
        },
        {
          $sort: {
            userId: 1,
            "history.createAt": 1,
          },
        },
        {
          $group: {
            _id: "$userId",
            email: { $first: "$email" },
            companyName: { $first: "$namecompanie" },
            history: {
              $push: {
                createAt: "$history.createAt",
                section: "$history.section",
                timeSpent: "$history.timeSpent",
              },
            },
          },
        },
      ]

      // Execute aggregation with disk use enabled
      const companyData = await trackes
        .aggregate(pipeline, {
          allowDiskUse: true,
          cursor: { batchSize: 100 },
        })
        .toArray()

      if (companyData.length === 0) {
        return res.status(200).json({
          message: "No data found for the given company",
          companyName: companyname,
          data: []
        })
      }

      // Process data in batches
      for (const data of companyData) {
        const historicalData = data.history || []

        if (historicalData.length === 0) {
          continue
        }

        // Create lots with batch processing
        const lots = []
        let currentLot = []
        let lastTimestamp = new Date(historicalData[0].createAt)

        for (const record of historicalData) {
          const currentTime = new Date(record.createAt)
          const timeDifference = (currentTime.getTime() - lastTimestamp.getTime()) / (1000 * 60 * 60)

          if (timeDifference > 3) {
            if (currentLot.length > 0) {
              lots.push([...currentLot])
            }
            currentLot = []
          }

          currentLot.push(record)
          lastTimestamp = currentTime
        }

        if (currentLot.length > 0) {
          lots.push(currentLot)
        }

        // Batch update analytics
        const bulkOps: any = lots.map((lot) => ({
          updateOne: {
            filter: {
              userId: data._id,
              companyName: data.companyName,
              email: data.email,
            },
            update: {
              $push: {
                lots: {
                  startTime: lot[0].createAt,
                  endTime: lot[lot.length - 1].createAt,
                  historical: lot,
                  sections: lot.map((h) => ({
                    section: h.section,
                    timeSpent: h.timeSpent,
                  })),
                },
              },
            },
            upsert: true,
          },
        }))

        if (bulkOps.length > 0) {
          await analytics.bulkWrite(bulkOps)
        }
      }

      return res.status(200).json({
        message: "Data inserted into analytics successfully",
        usersProcessed: companyData.length,
      })
    }

    // Handle unsupported methods
    return res.status(405).json({ error: "Method not allowed" })
  } catch (error) {
    console.error("Database error:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
