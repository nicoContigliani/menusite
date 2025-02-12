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

  console.log(req.body)
  const { email, password, fullname, birthday, phone } = req.body;
  console.log("🚀 ~ handler ~ email, password, fullname, birthday,phone:", email, password, fullname, birthday, phone)

  if (!email) {
    return res.status(400).json({ error: "Email, password and companyName are required" });
  }


  const client = await clientPromise;
  const db = client.db("menuDB");
  const users = db.collection("users");


  const existingUser = await users.findOne({ email });
  console.log("🚀 ~ handler ~ existingUser:", existingUser)
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  const verificationCode:any = generateCode(6); // Genera un código de 6 dígitos
  const hashedPassword = await bcrypt.hash(password, 10);
  codeMailGenerator(email, verificationCode);
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
  });


  return res.status(200).json({ message: "User created successfully, verification code sent to email" });
}
