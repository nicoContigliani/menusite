import type { Server as NetServer } from "http"
import type { NextApiRequest } from "next"
import { Server as ServerIO } from "socket.io"
import { NextApiResponseWithSocket } from "../../../types/socket"

export const config = {
  api: {
    bodyParser: false,
  },
}

// Variable para controlar si el servidor ya está inicializado
let isInitialized = false

const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  // Evitar inicialización múltiple
  if (!res.socket.server.io && !isInitialized) {
    console.log("Initializing Socket.io server...")
    isInitialized = true

    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
      // Preferir WebSockets para evitar conexiones duplicadas
      transports: ["websocket", "polling"],
      // Add CORS settings if needed
      cors: {
        origin: process.env.NEXT_PUBLIC_NODE_ENV === "Production" ? process.env.NEXT_PUBLIC_SITE_URL : "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    })

    // Define socket event handlers
    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`)

      // Handle incoming messages
      socket.on("message", (data) => {
        console.log(`Message ****** received from ${socket.id}:`, data)

        // Opción 1: Emitir solo al remitente y a los demás (evita eco)
        socket.emit("message", data) // Enviar al remitente
        socket.broadcast.emit("message", data) // Enviar a todos excepto al remitente

        // Opción 2: Emitir a todos (puede causar duplicados)
        // io.emit('message', data);
      })

      // Handle client disconnection
      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`)
      })
    })

    // Make io accessible to our client
    res.socket.server.io = io
  }

  res.end()
}

export default SocketHandler

