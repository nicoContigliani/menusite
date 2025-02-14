// pages/api/trackTime.ts
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { userId, history, totalTime } = req.body;
            const data = req.body
            console.log(req.body, "******************************************************")
            console.log("📥 Recibiendo datos:", { userId, history, totalTime });

            const client = await clientPromise;
            const db = client.db("menuDB");
            const analytics = db.collection("analytics");
            try {
                const si = await analytics.insertOne({
                    ...data,
                    createAt: new Date(),
                    updateAt: new Date(),
                });

            } catch (error) {
                console.log("🚀 ~ handler ~ error:", error)

            }


            // Aquí podrías guardar los datos en tu base de datos
            // Ejemplo con MongoDB o PostgreSQL

            res.status(200).json({ message: "Datos guardados correctamente" });
        } catch (error) {
            console.error("❌ Error en el backend:", error);
            res.status(500).json({ message: "Error al guardar datos" });
        }
    }
}
