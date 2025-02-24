import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongoose";
import { askDashboardanalytics } from "@/services/askDashboardanalytics.services";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    try {
        const { companyname } = req.query;
        console.log("Query received:", companyname);

        // Conexión a la base de datos
        const client = await clientPromise;
        const db = client.db("menuDB");
        const companies = db.collection("companies");
        const analytics = db.collection("analytics");

        if (companyname) {
            // Buscar una empresa específica ignorando mayúsculas/minúsculas
            const company = await companies
                .find({ companyName: new RegExp(`^${companyname}$`, "i") })
                .toArray(); // Convierte el cursor en un array

            const companyAnalytics:any[]|null = await analytics
                .find({ companyName: new RegExp(`^${companyname}$`, "i") })
                .toArray(); // Convierte el cursor en un array

            const retunrDAta = await askDashboardanalytics(companyAnalytics)
            console.log("🚀 ~ handler ~ retunrDAta:", retunrDAta)

            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }









            return res.status(200).json(company);
        }

        // Obtener todas las empresas si no se pasó `companyname`
        const allCompanies = await companies.find({}).toArray();

        if (allCompanies.length === 0) {
            return res.status(404).json({ message: "No companies found" });
        }

        return res.status(200).json(allCompanies);
    } catch (error: any) {
        console.error("🚀 ~ handler ~ error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
