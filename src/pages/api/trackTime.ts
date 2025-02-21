import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db("menuDB");
        const analytics = db.collection("tracktimes");

        if (req.method === "POST") {
            const { userId, history, totalTime } = req.body;
            console.log("🚀 ~ handler ~ req.body:", req.body)
            const data = req.body

            if (!userId || !history || !totalTime) {
                return res.status(400).json({ message: "Faltan datos en la solicitud" });
            }

            console.log("📥 Recibiendo datos:", req.body);

            await analytics.insertOne({
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            return res.status(201).json({ message: "Datos guardados correctamente" });
        }

        if (req.method === "GET") {
            const data = await analytics.find({}).toArray();
            return res.status(200).json(data);
        }

        return res.status(405).json({ message: "Método no permitido" });
    } catch (error) {
        console.error("❌ Error en la API:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}
