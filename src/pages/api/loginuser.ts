import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import clientPromise from "../../../lib/mongoose";
import { generateToken } from "../../../tools/auth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // const client = await clientPromise;
  // const db = client.db("menuDB");
  const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
  const client = await clientPromise;
  const db = client.db(dbName);
  const users = db.collection("users");

  let existingUser: any = await users.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ error: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  // Eliminamos el password correctamente
  const { password: _, ...userWithoutPassword } = existingUser;

  const token = generateToken({ existingUser: userWithoutPassword });

  console.log("🚀 ~ handler ~ userWithoutPassword:", userWithoutPassword);
  
  return res.status(200).json({ token, ...userWithoutPassword, message: "Login successful" });
}

