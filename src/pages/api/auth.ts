import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import clientPromise from "../../../lib/mongoose";
import { generateCode } from "@/services/generateCode";
import { codeMailGenerator } from "@/services/codeMailGenerator";
import { generateToken } from "../../../tools/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbName = "DBbanckmed";
  const collectionName = "usermed";

  // Configuración común para la base de datos
  const client = await clientPromise;
  const db = client.db(dbName);
  const users = db.collection(collectionName);

  // REGISTER
  if (req.method === "POST" && req.body.action === "register") {
    try {
      const { email, password, fullname, birthday, phone } = req.body;

      if (!email || !password || !fullname || !birthday || !phone) {
        return res.status(400).json({ error: "All fields are required" });
      }

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
        // Campos adicionales para compatibilidad con frontend
        avatar_url: null,
        document_id: null,
        address: null,
        city: null,
        country: null
      };

      await users.insertOne(newUser);

      // Enviar código de verificación por correo
      await codeMailGenerator(email, verificationCode);

      const savedUser = await users.findOne(
        { email },
        { projection: { password: 0 } }
      );
      if (!savedUser) {
        throw new Error("User creation failed");
      }

      const token = generateToken({ user: savedUser });

      return res.status(201).json({ 
        token, 
        ...savedUser, 
        message: "User created successfully, verification code sent to email" 
      });
    } catch (error) {
      console.error("Error in user registration:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // LOGIN
  if (req.method === "POST" && req.body.action === "login") {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const existingUser: any = await users.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ error: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Incorrect password" });
      }

      const { password: _, ...userWithoutPassword } = existingUser;
      const token = generateToken({ user: userWithoutPassword });

      return res.status(200).json({ 
        token, 
        ...userWithoutPassword, 
        message: "Login successful" 
      });
    } catch (error) {
      console.error("Error in user login:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // VERIFY CODE
  if (req.method === "POST" && req.body.action === "verify-code") {
    try {
      const { email, code } = req.body;
      if (!email || !code) {
        return res.status(400).json({ error: "Email and code are required" });
      }

      const user = await users.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      if (user.verificationCode !== code) {
        return res.status(400).json({ error: "Invalid verification code" });
      }

      await users.updateOne(
        { email },
        { 
          $set: { 
            verificationCodeMail: true,
            updatedAt: new Date() 
          } 
        }
      );

      return res.status(200).json({ 
        message: "Email verified successfully" 
      });
    } catch (error) {
      console.error("Error in code verification:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Método no permitido
  return res.status(405).json({ error: "Method not allowed" });
}