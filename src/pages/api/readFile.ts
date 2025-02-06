
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongoose";

// Usamos el caché de memory-cache en lugar de un objeto en memoria
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido, usa POST" });
    }

    const { folder } = req.body;
    if (!folder || typeof folder !== "string") {
        return res.status(400).json({ error: "Debes proporcionar el nombre de la carpeta (folder)" });
    }

    // Revisar caché para evitar consulta repetitiva en la base de datos


    try {
        // Conectar a MongoDB (conexión persistente)
        const client = await clientPromise;
        const db = client.db("menuDB");
        const collection = db.collection("companies");
        // Buscar en la colección según el folderName
        const company = await collection?.findOne({ companyName: folder });

        if (!company) {
            return res.status(404).json({ error: "No se encontró una empresa con el folder especificado" });
        }


        // Devolver los datos de la empresa
        return res.status(200).json({ data: company });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        return res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
    }
}
