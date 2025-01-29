// // pages/api/users.ts

// import { NextApiRequest, NextApiResponse } from "next";
// import User from "@/models/User";
// import { connectToDatabase } from "../../../lib/mongoose";

// export async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Método GET
//   if (req.method === "GET") {
//     try {
//       await connectToDatabase();
//       const users = await User.find({});
//       console.log("🚀 ~ GET ~ users:", users);
//       res.status(200).json(users); // Responde con los usuarios
//     } catch (error) {
//       console.error("Error in /api/users GET:", error);
//       res.status(500).json({ error: "Failed to fetch users" });
//     }
//   }

//   // Método POST
//   else if (req.method === "POST") {
//     try {
//       await connectToDatabase();
//       const { email, rol, visit } = req.body; // Extraer datos del cuerpo de la solicitud

//       if (!email || !rol || !visit) {
//         return res.status(400).json({ error: "Missing required fields" }); // Verificación de datos
//       }

//       const newUser = new User({ email, rol, visit });
//       await newUser.save();
//       res.status(201).json(newUser); // Responde con el nuevo usuario creado
//     } catch (error) {
//       console.error("Error creating user:", error);
//       res.status(500).json({ error: "Failed to create user" });
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" }); // Si el método no es ni GET ni POST
//   }
// }

// /pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";

// Simulated database
let users = [
  { _id: "1", name: "John Doe", email: "john@example.com" },
  { _id: "2", name: "Jane Smith", email: "jane@example.com" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Fetch all users
    res.status(200).json(users);
  } else if (req.method === "POST") {
    // Add a new user
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const newUser = { _id: String(users.length + 1), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    // Method not allowed
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}