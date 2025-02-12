import { generateCode } from "./generateCode";
import nodemailer from "nodemailer";

export const codeMailGenerator = async (email: any, verificationCode: any) => {
  
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
        console.log("🚀 ~ codeMailGenerator ~ error:", error)
    }


}