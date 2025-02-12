import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import clientPromise from "../../../lib/mongoose";
import { generateCode } from "@/services/generateCode";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, fullname, birthday,phone } = req.body;
  if (!email || !password || !fullname || !birthday||!phone) {
    return res.status(400).json({ error: "Email, password and companyName are required" });
  }

  const client = await clientPromise;
  const db = client.db("menuDB");
  const users = db.collection("users");

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = generateCode(6); // Genera un código de 6 dígitos

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: email,
      subject: "Código de verificación",
      text: `Tu código de verificación es: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    return res.status(500).json({ error: "Error sending verification email" });
  }

  const todo = await users.insertOne({
    email,
    password: hashedPassword,
    fullname,
    birthday,
    phone,
    score_user: 0,
    benefits:false,
    status_user: true,
    verificationCode, // Almacena el código en la base de datos
    createAt: new Date(),
    updateAt: new Date(),
  });
  console.log("🚀 ~ handler ~ todo:", todo)

  return res.status(200).json({ message: "User created successfully, verification code sent to email" });
}
