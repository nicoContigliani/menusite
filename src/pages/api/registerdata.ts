import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import clientPromise from "../../../lib/mongoose";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  console.log(req.body)
  return res.status(200).json({ message: "User created successfully, verification code sent to email" });
}
