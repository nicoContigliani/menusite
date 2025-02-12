import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import clientPromise from "../../../lib/mongoose";
import { generateCode } from "@/services/generateCode";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const client = await clientPromise;
        const db = client.db("menuDB");
        const users = db.collection("users");
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


        // Guardar el código en la base de datos
        const updatedUser = await users.findOneAndUpdate(
            { email },
            { $set: { verificationCode } },
            { returnDocument: "after", projection: { password: 0 } }
        );

        if (!updatedUser) {
            return res.status(400).json({ error: "User not found" });
        }

        // Aquí podrías integrar el envío de email con el código (ejemplo con console.log)
        console.log(`Verification code for ${email}: ${verificationCode}`);

        return res.status(200).json({ message: "Verification code generated and sent", email });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
