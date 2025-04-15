// import { NextApiRequest, NextApiResponse } from "next";
// import { readAndInsertExcelData } from "@/services/excelService";

// export const config = {
//   api: {
//     bodyParser: true, // Enable body parsing
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     const data = req.body; // Access the parsed body directly
//     console.log("🚀 ~ handler ~ data:", data);

//     const { companyName, hojas } = await readAndInsertExcelData(data);

//     res.status(200).json({
//       namecompaines: companyName,
//       hojas,
//     });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// }



import { NextApiRequest, NextApiResponse } from "next";
import { readAndInsertExcelData, getCompanyByName } from "@/services/excelService";

export const config = {
  api: {
    bodyParser: true, // Enable body parsing
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      // console.log("🚀 ~ handler ~ data:", data);
      // console.log("🚀 ~ handler ~ dataInfo:", data?.hojas?.Info[0])

      const { companyName, hojas } = await readAndInsertExcelData(data);

      return res.status(200).json({
        namecompaines: companyName,
        hojas,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  if (req.method === "GET") {
    try {
      const { nombre: companyName } = req.query;
      console.log("Company Name:", companyName);  // Esto te permitirá ver si `companyName` llega correctamente

      // if (!companyName || typeof companyName !== "string") {
      //   return res.status(400).json({ message: "companyName is required and must be a string" });
      // }

      const companyData = await getCompanyByName(companyName);

      if (!companyData) {
        return res.status(404).json({ message: "Company not found" });
      }

      return res.status(200).json(companyData);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
