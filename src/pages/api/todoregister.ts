

import { NextApiRequest, NextApiResponse } from "next";
import { readAndInsertExcelData, getCompanyByName } from "@/services/excelService";

export const config = {
    api: {
        bodyParser: true, // Enable body parsing
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const data = req.body;
        console.log("🚀 ~ handler ~ data:", data);

    }
}
