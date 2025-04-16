import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            // Obtener todas las empresas
            // const client = await clientPromise;
            // const db = client.db("menuDB");
            const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
            const client = await clientPromise;
            const db = client.db(dbName);
            const companies = db.collection("companies");

            // Convertir el cursor en un arreglo de documentos
            const allCompanies = await companies.find({}).toArray();

            if (allCompanies.length === 0) {
                return res.status(404).json({ message: "No companies found" });
            }

            // Devolver las empresas
            return res.status(200).json(allCompanies);
        } catch (error: any) {
            console.error("🚀 ~ handler ~ error:", error);
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    // Método no permitido
    return res.status(405).json({ message: "Method Not Allowed" });
}
