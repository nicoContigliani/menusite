import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const NEXT_PUBLIC_GMAIL_USER: string = process.env.NEXT_PUBLIC_EMAIL_USER || "";
  const NEXT_PUBLIC_GMAIL_PASS: string = process.env.NEXT_PUBLIC_EMAIL_PASS || "";
  const NEXT_PUBLIC_RECIPIENT_EMAIL: string = process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || "";

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, message } = req.body;

    if (!NEXT_PUBLIC_GMAIL_USER || !NEXT_PUBLIC_GMAIL_PASS) {
      console.error("Gmail credentials are not set in environment variables");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NEXT_PUBLIC_GMAIL_USER,
        pass: NEXT_PUBLIC_GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: NEXT_PUBLIC_GMAIL_USER,
      to: NEXT_PUBLIC_RECIPIENT_EMAIL || NEXT_PUBLIC_GMAIL_USER,
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nCorreo electrónico: ${email}\nMensaje: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Correo electrónico enviado correctamente" });
  } catch (error) {
    console.error("Error in POST /api/send-email:", error);
    return res.status(500).json({ error: "Error al enviar el correo electrónico" });
  }
}