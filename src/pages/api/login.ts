import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import clientPromise from "../../../lib/mongoose";
import { generateToken } from "../../../tools/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
  console.log("🚀 ~ handler ~ existingUser:", existingUser)

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  delete existingUser?.password;

  const token = generateToken({ existingUser });

  return res.status(200).json({ token, ...existingUser, message: "Login successful" });
}
