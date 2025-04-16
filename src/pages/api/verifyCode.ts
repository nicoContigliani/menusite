import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongoose";
import { generateToken } from "../../../tools/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: "Email and code are required" });
  }

  // const client = await clientPromise;
  // const db = client.db("menuDB");
  const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
  const client = await clientPromise;
  const db = client.db(dbName);
  const users = db.collection("users");

  let user: any = await users.findOne({ email });

  console.log("🚀 ~ handler ~ user:", user)
  if (!user) {
    return res.status(400).json({ error: "No user found with this email" });
  }

  if (user.verificationCode === code) {
    // const updatedUser = await users.findOneAndUpdate(
    //   { email },
    //   { $unset: { verificationCode: "" } },
    //   {
    //     returnDocument: "after", // Devuelve el documento actualizado
    //     projection: { password: 0 } // Excluye la contraseña del resultado
    //   }
    // );
    const updatedUser = await users.findOneAndUpdate(
      { email },
      { 
        $unset: { verificationCode: "" }, 
        $set: { verificationCodeMail: true } // Establece verificationCodeMail en true
      },
      {
        returnDocument: "after", // Devuelve el documento actualizado
        projection: { password: 0 } // Excluye la contraseña del resultado
      }
    );
    
    const token = generateToken({ updatedUser });


    return res.status(200).json({ token, ...updatedUser, message: "Code verified successfully" });
  } else {
    return res.status(400).json({ error: "Incorrect code" });
  }
}
