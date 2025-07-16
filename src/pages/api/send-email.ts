// // import { NextApiRequest, NextApiResponse } from "next";
// // import nodemailer from "nodemailer";

// // export default async function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse
// // ) {
// //   const NEXT_PUBLIC_GMAIL_USER: string = process.env.NEXT_PUBLIC_EMAIL_USER || "";
// //   const NEXT_PUBLIC_GMAIL_PASS: string = process.env.NEXT_PUBLIC_EMAIL_PASS || "";
// //   const NEXT_PUBLIC_RECIPIENT_EMAIL: string = process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || "";

// //   try {
// //     if (req.method !== "POST") {
// //       return res.status(405).json({ error: "Method not allowed" });
// //     }

// //     const { name, email, message } = req.body;

// //     if (!NEXT_PUBLIC_GMAIL_USER || !NEXT_PUBLIC_GMAIL_PASS) {
// //       console.error("Gmail credentials are not set in environment variables");
// //       return res.status(500).json({ error: "Server configuration error" });
// //     }

// //     const transporter = nodemailer.createTransport({
// //       service: "gmail",
// //       auth: {
// //         user: NEXT_PUBLIC_GMAIL_USER,
// //         pass: NEXT_PUBLIC_GMAIL_PASS,
// //       },
// //     });

// //     const mailOptions = {
// //       from: NEXT_PUBLIC_GMAIL_USER,
// //       to: NEXT_PUBLIC_RECIPIENT_EMAIL || NEXT_PUBLIC_GMAIL_USER,
// //       subject: `Nuevo mensaje de ${name}`,
// //       text: `Nombre: ${name}\nCorreo electrónico: ${email}\nMensaje: ${message}`,
// //     };

// //     await transporter.sendMail(mailOptions);

// //     return res.status(200).json({ message: "Correo electrónico enviado correctamente" });
// //   } catch (error) {
// //     console.error("Error in POST /api/send-email:", error);
// //     return res.status(500).json({ error: "Error al enviar el correo electrónico" });
// //   }
// // }

// import type { NextApiRequest, NextApiResponse } from "next"
// import nodemailer from "nodemailer"

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const NEXT_PUBLIC_GMAIL_USER: string = process.env.NEXT_PUBLIC_EMAIL_USER || ""
//   const NEXT_PUBLIC_GMAIL_PASS: string = process.env.NEXT_PUBLIC_EMAIL_PASS || ""
//   const NEXT_PUBLIC_RECIPIENT_EMAIL: string = process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || ""

//   try {
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method not allowed" })
//     }

//     const { name, email, message } = req.body

//     if (!NEXT_PUBLIC_GMAIL_USER || !NEXT_PUBLIC_GMAIL_PASS) {
//       console.error("Gmail credentials are not set in environment variables")
//       return res.status(500).json({ error: "Server configuration error" })
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: NEXT_PUBLIC_GMAIL_USER,
//         pass: NEXT_PUBLIC_GMAIL_PASS,
//       },
//     })

//     // Create HTML version of the receipt
//     const htmlMessage = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
//         <h2 style="color: #3f51b5; text-align: center;">Recibo de Orden #${req.body.message.includes("orden #") ? req.body.message.split("orden #")[1].split(":")[0].trim() : ""}</h2>
//         <p><strong>Cliente:</strong> ${name}</p>
//         <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
//         <div>
//           ${message.replace(/\n/g, "<br>")}
//         </div>
//         <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
//         <p style="text-align: center; color: #666; font-size: 14px;">Gracias por su compra</p>
//       </div>
//     `

//     const mailOptions = {
//       from: NEXT_PUBLIC_GMAIL_USER,
//       to: email,
//       cc: NEXT_PUBLIC_RECIPIENT_EMAIL || NEXT_PUBLIC_GMAIL_USER,
//       subject: `Recibo de su pedido`,
//       text: message,
//       html: htmlMessage,
//     }

//     await transporter.sendMail(mailOptions)

//     return res.status(200).json({ message: "Correo electrónico enviado correctamente" })
//   } catch (error) {
//     console.error("Error in POST /api/send-email:", error)
//     return res.status(500).json({ error: "Error al enviar el correo electrónico" })
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const NEXT_PUBLIC_GMAIL_USER: string = process.env.NEXT_PUBLIC_EMAIL_USER || ""
  const NEXT_PUBLIC_GMAIL_PASS: string = process.env.NEXT_PUBLIC_EMAIL_PASS || ""
  const NEXT_PUBLIC_RECIPIENT_EMAIL: string = process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || ""

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" })
    }

    const { name, email, message, pdfBase64, pdfFileName, orderDetails } = req.body

    if (!NEXT_PUBLIC_GMAIL_USER || !NEXT_PUBLIC_GMAIL_PASS) {
      console.error("Gmail credentials are not set in environment variables")
      return res.status(500).json({ error: "Server configuration error" })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NEXT_PUBLIC_GMAIL_USER,
        pass: NEXT_PUBLIC_GMAIL_PASS,
      },
    })

    // Crear versión HTML del recibo
    // const htmlMessage = `
    //   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
    //     <h2 style="color: #3f51b5; text-align: center;">Recibo de Orden #${message.includes("orden #") ? message.split("orden #")[1] : message}</h2>
    //     <p><strong>Cliente:</strong> ${name}</p>
    //     <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    //     <p>Adjunto encontrará el recibo de su pedido en formato PDF.</p>
    //     <p>Gracias por su compra.</p>
    //     <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    //     <p style="text-align: center; color: #666; font-size: 14px;">LlakaScript - soporte@llakascript.com</p>
    //   </div>
    // `

    const htmlMessage = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 40px;">
      <h2 style="color: #000; text-align: center; font-weight: 500; margin-bottom: 24px;">Recibo de tu pedido</h2>
      
      <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 8px;">
        <strong>Cliente:</strong> ${name}
      </p>

      <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 24px;">
        <strong>Orden:</strong> ${message.includes("orden #") ? message.split("orden #")[1] : message}
      </p>

      <div style="height: 1px; background-color: #e0e0e0; margin: 24px 0;"></div>

      <p style="font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 24px;">
        Adjuntamos el recibo de tu compra en formato PDF. Gracias por elegirnos.
      </p>

      <p style="font-size: 14px; color: #999; text-align: center; margin-top: 40px;">
        LlakaScript · soporte@llakascript.com
      </p>
    </div>
  </div>
`

    // Configurar opciones de correo con el PDF adjunto
    const mailOptions = {
      from: NEXT_PUBLIC_GMAIL_USER,
      to: email,
      cc: NEXT_PUBLIC_RECIPIENT_EMAIL || NEXT_PUBLIC_GMAIL_USER,
      subject: `Recibo de su pedido - Orden #${message.includes("orden #") ? message.split("orden #")[1] : message}`,
      text: `Recibo de su pedido - ${message}`,
      html: htmlMessage,
      attachments: [
        {
          filename: pdfFileName || "recibo.pdf",
          content: pdfBase64,
          encoding: "base64",
        },
      ],
    }

    await transporter.sendMail(mailOptions)

    return res.status(200).json({ message: "Correo electrónico enviado correctamente" })
  } catch (error) {
    console.error("Error in POST /api/send-email:", error)
    return res.status(500).json({ error: "Error al enviar el correo electrónico" })
  }
}