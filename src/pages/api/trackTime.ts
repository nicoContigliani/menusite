// pages/api/trackTime.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

    try {
        const { userId, history, totalTime } = req.body;
        
        console.log("📥 Recibiendo datos:", { userId, history, totalTime });

        // Aquí podrías guardar los datos en tu base de datos
        // Ejemplo con MongoDB o PostgreSQL

        res.status(200).json({ message: "Datos guardados correctamente" });
    } catch (error) {
        console.error("❌ Error en el backend:", error);
        res.status(500).json({ message: "Error al guardar datos" });
    }
}
