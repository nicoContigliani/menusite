// /api/socket.ts
import { Server } from "socket.io";
import { NextApiRequest } from "next";
import { Server as NetServer } from "http";
import { Socket as NetSocket } from "net";
import { NextApiResponseServerIO } from "../../../types/socket";

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket) {
    res.status(500).json({ error: "Socket not available" });
    return;
  }

  if (!res.socket.server.io) {
    const io = new Server((res.socket as NetSocket & { server: NetServer }).server, {
      path: "/api/socket",
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("Usuario conectado", socket.id);

      socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`Usuario ${socket.id} se unió a la sala ${room}`);
        console.log(`El usuario  ${socket.id}  en la sala ${room}`);
      });

      socket.on("send_message", ({ room, message, name }) => {
        io.to(room).emit("receive_message*****", { message, name });
        console.log(`Usuarios  ${socket.id}  en la sala ${room}`);
      });

      socket.on("disconnect", () => {
        console.log("Usuario desconectado", socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}