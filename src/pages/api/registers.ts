import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import clientPromise from "../../../lib/mongoose";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, fullname, birthday,phone } = req.body;
  if (!email || !password || !fullname || !birthday||!phone) {
    return res.status(400).json({ error: "Email, password and companyName are required" });
  }

  // const client = await clientPromise;
  // const db = client.db("menuDB");
      const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
      const client = await clientPromise;
      const db = client.db(dbName);
  const users = db.collection("users");

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const todo = await users.insertOne({
    email,
    password: hashedPassword,
    fullname,
    birthday,
    phone,
    score_user: 0,
    benefits:false,
    status_user: true,
    // verificationCode, // Almacena el código en la base de datos
    createAt: new Date(),
    updateAt: new Date(),
  });
  console.log("🚀 ~ handler ~ todo:", todo)

  return res.status(200).json({ message: "User created successfully, verification code sent to email" });
}
