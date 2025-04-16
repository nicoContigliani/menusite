import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import clientPromise from "../../../lib/mongoose";
import { generateCode } from "@/services/generateCode";
import { codeMailGenerator } from "@/services/codeMailGenerator";
import { generateToken } from "../../../tools/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password, fullname, birthday, phone } = req.body;

    if (!email || !password || !fullname || !birthday || !phone) {
      return res.status(400).json({ error: "All fields are required" });
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
    const verificationCode = generateCode(6);

    const newUser = {
      email,
      password: hashedPassword,
      fullname,
      birthday,
      phone,
      score_user: 0,
      benefits: false,
      status_user: true,
      verificationCodeMail: false,
      verificationCodePhone: false,
      verificationCodePattern: false,
      verificationCode,
      createdAt: new Date(),
      updatedAt: new Date(),
      aud: "isLogin",
    };

    await users.insertOne(newUser);

    // // Enviar código de verificación por correo
    // await codeMailGenerator(email, verificationCode);

    // Buscar el usuario sin exponer la contraseña
    const savedUser = await users.findOne(
      { email },
      { projection: { password: 0, _id: 1 } } // Asegurar que _id sea incluido
    );
    if (!savedUser) {
      throw new Error("User creation failed");
    }

    const token = generateToken({ user: savedUser });

    return res.status(201).json({ token, ...savedUser, message: "User created successfully, verification code sent to email" });
  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
