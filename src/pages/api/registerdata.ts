import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import clientPromise from "../../../lib/mongoose";
import { generateCode } from "@/services/generateCode";
import { codeMailGenerator } from "@/services/codeMailGenerator";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, fullname, birthday, phone } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email, password and companyName are required" });
  }

  const verificationCode: any = generateCode(6); // Genera un código de 6 dígitos

  const client = await clientPromise;
  const db = client.db("menuDB");
  const users = db.collection("users");


  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // codeMailGenerator(email, verificationCode);
    let todo = await users.insertOne({
      email,
      password: hashedPassword,
      fullname,
      birthday,
      phone,
      score_user: 0,
      benefits: false,
      status_user: true,
      verigicationCodeMail: false,
      verigicationCodePhone: false,
      verigicationCodePattern: false,
      verificationCode, // Almacena el código en la base de datos
      createAt: new Date(),
      updateAt: new Date(),
      aud:"isLogin"
    });

  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error)

  }


  return res.status(200).json({ message: "User created successfully, verification code sent to email" });
}
