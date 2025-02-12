import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import clientPromise from "../../../lib/mongoose";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  console.log(req.body)
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const client = await clientPromise;
  const db = client.db("menuDB");
  const users = db.collection("users");

  let existingUser: any = await users.findOne({ email });
  console.log("🚀 ~ handler ~ existingUser:", existingUser)


  return res.status(200).json({ message: "User created successfully, verification code sent to email" });
}
