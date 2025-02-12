

import { NextApiRequest, NextApiResponse } from "next";
import { readAndInsertExcelData, getCompanyByName } from "@/services/excelService";

export const config = {
    api: {
        bodyParser: true, // Enable body parsing
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {

    }
    return res.status(200).json({ message: "User created successfully, verification code sent to email" });
}
