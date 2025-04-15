import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongoose";
import { generateToken } from "../../../tools/auth";
import { generateCode } from "@/services/generateCode";
import { codeMailGenerator } from "@/services/codeMailGenerator";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const verificationCode = generateCode(6); // Genera un código de 6 dígitos
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // const client = await clientPromise;
  // const db = client.db("menuDB");
  const dbName = process.env.NODE_ENV === "development" ? "menuDevDB" : "menuDB";
  const client = await clientPromise;
  const db = client.db(dbName);
  const users = db.collection("users");

  let user: any = await users.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "No user found with this email" });
  }

  codeMailGenerator(email, verificationCode);

  // Inserta el verificationCode en la base de datos
  const updatedUser = await users.findOneAndUpdate(
    { email },
    {
      $set: { verificationCode } // Guarda el código generado
    },
    {
      returnDocument: "after", // Devuelve el documento actualizado
      projection: { password: 0 } // Excluye la contraseña del resultado
    }
  );

  return res.status(200).json({ message: "Verification code set successfully", updatedUser });
}
