// import type { Server as NetServer } from "http"
// import type { NextApiRequest } from "next"
// import { Server as ServerIO } from "socket.io"
// import { NextApiResponseWithSocket } from "../../../types/socket"

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// // Variable para controlar si el servidor ya está inicializado
// let isInitialized = false

// const SocketRoomsHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
//   // Evitar inicialización múltiple
//   if (!res.socket.server.io && !isInitialized) {
//     console.log("Initializing Socket.io server with rooms support...")
//     isInitialized = true

//     // adapt Next's net Server to http Server
//     const httpServer: NetServer = res.socket.server as any
//     const io = new ServerIO(httpServer, {
//       path: "/api/socket-rooms",
//       // Preferir WebSockets para evitar conexiones duplicadas
//       transports: ["websocket", "polling"],
//       // Add CORS settings if needed
//       cors: {
//         origin: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_SITE_URL : "http://localhost:3000",
//         methods: ["GET", "POST"],
//       },
//     })

//     // Define socket event handlers
//     io.on("connection", (socket) => {
//       console.log(`Socket connected: ${socket.id}`)
      
//       // Track which rooms this socket is in
//       const userRooms = new Set<string>()

//       // Handle joining a room/channel
//       socket.on("join-room", (roomName: string) => {
//         console.log(`Socket ${socket.id} joining room: ${roomName}`)
//         socket.join(roomName)
//         userRooms.add(roomName)
        
//         // Notify room that a new user joined
//         io.to(roomName).emit("room-event", {
//           type: "user-joined",
//           roomName,
//           userId: socket.id,
//           timestamp: new Date().toISOString()
//         })
        
//         // Send confirmation to the client
//         socket.emit("room-joined", { roomName })
//       })
      
//       // Handle leaving a room/channel
//       socket.on("leave-room", (roomName: string) => {
//         console.log(`Socket ${socket.id} leaving room: ${roomName}`)
//         socket.leave(roomName)
//         userRooms.delete(roomName)
        
//         // Notify room that a user left
//         io.to(roomName).emit("room-event", {
//           type: "user-left",
//           roomName,
//           userId: socket.id,
//           timestamp: new Date().toISOString()
//         })
        
//         // Send confirmation to the client
//         socket.emit("room-left", { roomName })
//       })

//       // Handle incoming messages to a specific room
//       socket.on("room-message", ({ roomName, message }) => {
//         console.log(`Message received from ${socket.id} to room ${roomName}:`, message)
        
//         if (!roomName) {
//           socket.emit("error", { message: "Room name is required" })
//           return
//         }
        
//         const messageData = {
//           roomName,
//           message,
//           senderId: socket.id,
//           timestamp: new Date().toISOString()
//         }
        
//         // Send to everyone in the room including sender
//         io.to(roomName).emit("room-message", messageData)
//       })

//       // Handle client disconnection
//       socket.on("disconnect", () => {
//         console.log(`Socket disconnected: ${socket.id}`)
        
//         // Notify all rooms this user was in
//         userRooms.forEach(roomName => {
//           io.to(roomName).emit("room-event", {
//             type: "user-disconnected",
//             roomName,
//             userId: socket.id,
//             timestamp: new Date().toISOString()
//           })
//         })
//       })
//     })

//     // Make io accessible to our client
//     res.socket.server.io = io
//   }

//   res.end()
// }

// export default SocketRoomsHandler




// import type { Server as NetServer } from "http"
// import type { NextApiRequest } from "next"
// import { Server as ServerIO } from "socket.io"
// import { NextApiResponseWithSocket } from "../../../types/socket"

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// // Variable para controlar si el servidor ya está inicializado
// let isInitialized = false

// const SocketRoomsHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
//   // Evitar inicialización múltiple
//   if (!res.socket.server.io && !isInitialized) {
//     console.log("Initializing Socket.io server with rooms support...")
//     isInitialized = true

//     // adapt Next's net Server to http Server
//     const httpServer: NetServer = res.socket.server as any
//     const io = new ServerIO(httpServer, {
//       path: "/api/socket-rooms",
//       // Preferir WebSockets para evitar conexiones duplicadas
//       transports: ["websocket", "polling"],
//       // Add CORS settings if needed
//       cors: {
//         origin: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_SITE_URL : "http://localhost:3000",
//         methods: ["GET", "POST"],
//       },
//     })

//     // Almacenar información de usuarios
//     const users = new Map<string, { username: string }>()

//     // Define socket event handlers
//     io.on("connection", (socket) => {
//       console.log(`Socket connected: ${socket.id}`)
      
//       // Track which rooms this socket is in
//       const userRooms = new Set<string>()

//       // Manejar el registro de nombre de usuario
//       socket.on("set-username", (username: string) => {
//         try {
//           if (!username || typeof username !== 'string' || username.trim() === '') {
//             socket.emit("error", { message: "Nombre de usuario inválido" })
//             return
//           }
          
//           users.set(socket.id, { username })
//           console.log(`Usuario ${username} (${socket.id}) registrado`)
          
//           // Confirmar al cliente que el nombre de usuario se ha establecido
//           socket.emit("username-set", { username })
//         } catch (error) {
//           console.error("Error al establecer nombre de usuario:", error)
//           socket.emit("error", { message: "Error al establecer nombre de usuario" })
//         }
//       })

//       // Handle joining a room/channel
//       socket.on("join-room", (roomName: string) => {
//         try {
//           if (!roomName || typeof roomName !== 'string' || roomName.trim() === '') {
//             socket.emit("error", { message: "Nombre de sala inválido" })
//             return
//           }
          
//           // Verificar si el usuario tiene un nombre establecido
//           const userInfo = users.get(socket.id)
//           if (!userInfo) {
//             socket.emit("error", { message: "Debes establecer un nombre de usuario primero" })
//             return
//           }
          
//           console.log(`Socket ${socket.id} (${userInfo.username}) joining room: ${roomName}`)
//           socket.join(roomName)
//           userRooms.add(roomName)
          
//           // Notify room that a new user joined
//           io.to(roomName).emit("room-event", {
//             type: "user-joined",
//             roomName,
//             userId: socket.id,
//             username: userInfo.username,
//             timestamp: new Date().toISOString()
//           })
          
//           // Send confirmation to the client
//           socket.emit("room-joined", { roomName })
//         } catch (error) {
//           console.error("Error al unirse a la sala:", error)
//           socket.emit("error", { message: "Error al unirse a la sala" })
//         }
//       })
      
//       // Handle leaving a room/channel
//       socket.on("leave-room", (roomName: string) => {
//         try {
//           if (!roomName || typeof roomName !== 'string') {
//             socket.emit("error", { message: "Nombre de sala inválido" })
//             return
//           }
          
//           const userInfo = users.get(socket.id)
//           if (!userInfo) {
//             socket.emit("error", { message: "Usuario no encontrado" })
//             return
//           }
          
//           console.log(`Socket ${socket.id} (${userInfo.username}) leaving room: ${roomName}`)
//           socket.leave(roomName)
//           userRooms.delete(roomName)
          
//           // Notify room that a user left
//           io.to(roomName).emit("room-event", {
//             type: "user-left",
//             roomName,
//             userId: socket.id,
//             username: userInfo.username,
//             timestamp: new Date().toISOString()
//           })
          
//           // Send confirmation to the client
//           socket.emit("room-left", { roomName })
//         } catch (error) {
//           console.error("Error al salir de la sala:", error)
//           socket.emit("error", { message: "Error al salir de la sala" })
//         }
//       })

//       // Handle incoming messages to a specific room
//       socket.on("room-message", ({ roomName, message }) => {
//         try {
//           if (!roomName || typeof roomName !== 'string') {
//             socket.emit("error", { message: "Nombre de sala inválido" })
//             return
//           }
          
//           if (!message || typeof message !== 'string' || message.trim() === '') {
//             socket.emit("error", { message: "Mensaje inválido" })
//             return
//           }
          
//           const userInfo = users.get(socket.id)
//           if (!userInfo) {
//             socket.emit("error", { message: "Usuario no encontrado" })
//             return
//           }
          
//           console.log(`Message received from ${userInfo.username} (${socket.id}) to room ${roomName}:`, message)
          
//           // Verificar si el usuario está en la sala
//           if (!userRooms.has(roomName)) {
//             socket.emit("error", { message: "No estás en esta sala" })
//             return
//           }
          
//           const messageData = {
//             roomName,
//             message,
//             senderId: socket.id,
//             username: userInfo.username,
//             timestamp: new Date().toISOString()
//           }
          
//           // Send to everyone in the room including sender
//           io.to(roomName).emit("room-message", messageData)
//         } catch (error) {
//           console.error("Error al enviar mensaje:", error)
//           socket.emit("error", { message: "Error al enviar mensaje" })
//         }
//       })

//       // Handle client disconnection
//       socket.on("disconnect", () => {
//         try {
//           const userInfo = users.get(socket.id)
//           console.log(`Socket disconnected: ${socket.id} ${userInfo ? `(${userInfo.username})` : ''}`)
          
//           // Notify all rooms this user was in
//           userRooms.forEach(roomName => {
//             io.to(roomName).emit("room-event", {
//               type: "user-disconnected",
//               roomName,
//               userId: socket.id,
//               username: userInfo ? userInfo.username : "Anónimo",
//               timestamp: new Date().toISOString()
//             })
//           })
          
//           // Eliminar usuario de la lista
//           users.delete(socket.id)
//         } catch (error) {
//           console.error("Error en desconexión:", error)
//         }
//       })
//     })

//     // Make io accessible to our client
//     res.socket.server.io = io
//   }

//   res.end()
// }

// export default SocketRoomsHandler



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

const SocketRoomsHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  // Evitar inicialización múltiple
  if (!res.socket.server.io && !isInitialized) {
    console.log("Initializing Socket.io server with rooms support...")
    isInitialized = true

    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: "/api/socket-rooms",
      // Preferir WebSockets para evitar conexiones duplicadas
      transports: ["websocket", "polling"],
      // Add CORS settings if needed
      cors: {
        origin: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_SITE_URL : "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    })

    // Almacenar información de usuarios
    const users = new Map<string, { username: string }>()

    // Define socket event handlers
    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`)
      
      // Track which rooms this socket is in
      const userRooms = new Set<string>()

      // Manejar el registro de nombre de usuario
      socket.on("set-username", (username: string) => {
        try {
          if (!username || typeof username !== 'string' || username.trim() === '') {
            socket.emit("error", { message: "Nombre de usuario inválido" })
            return
          }
          
          users.set(socket.id, { username })
          console.log(`Usuario ${username} (${socket.id}) registrado`)
          
          // Confirmar al cliente que el nombre de usuario se ha establecido
          socket.emit("username-set", { username })
        } catch (error) {
          console.error("Error al establecer nombre de usuario:", error)
          socket.emit("error", { message: "Error al establecer nombre de usuario" })
        }
      })

      // Handle joining a room/channel
      socket.on("join-room", (roomName: string) => {
        try {
          if (!roomName || typeof roomName !== 'string' || roomName.trim() === '') {
            socket.emit("error", { message: "Nombre de sala inválido" })
            return
          }
          
          // Verificar si el usuario tiene un nombre establecido
          const userInfo = users.get(socket.id)
          if (!userInfo) {
            socket.emit("error", { message: "Debes establecer un nombre de usuario primero" })
            return
          }
          
          console.log(`Socket ${socket.id} (${userInfo.username}) joining room: ${roomName}`)
          socket.join(roomName)
          userRooms.add(roomName)
          
          // Notify room that a new user joined
          io.to(roomName).emit("room-event", {
            type: "user-joined",
            roomName,
            userId: socket.id,
            username: userInfo.username,
            timestamp: new Date().toISOString()
          })
          
          // Send confirmation to the client
          socket.emit("room-joined", { roomName })
        } catch (error) {
          console.error("Error al unirse a la sala:", error)
          socket.emit("error", { message: "Error al unirse a la sala" })
        }
      })
      
      // Handle leaving a room/channel
      socket.on("leave-room", (roomName: string) => {
        try {
          if (!roomName || typeof roomName !== 'string') {
            socket.emit("error", { message: "Nombre de sala inválido" })
            return
          }
          
          const userInfo = users.get(socket.id)
          if (!userInfo) {
            socket.emit("error", { message: "Usuario no encontrado" })
            return
          }
          
          console.log(`Socket ${socket.id} (${userInfo.username}) leaving room: ${roomName}`)
          socket.leave(roomName)
          userRooms.delete(roomName)
          
          // Notify room that a user left
          io.to(roomName).emit("room-event", {
            type: "user-left",
            roomName,
            userId: socket.id,
            username: userInfo.username,
            timestamp: new Date().toISOString()
          })
          
          // Send confirmation to the client
          socket.emit("room-left", { roomName })
        } catch (error) {
          console.error("Error al salir de la sala:", error)
          socket.emit("error", { message: "Error al salir de la sala" })
        }
      })

      // Handle incoming messages to a specific room
      socket.on("room-message", ({ roomName, message }) => {
        try {
          if (!roomName || typeof roomName !== 'string') {
            socket.emit("error", { message: "Nombre de sala inválido" })
            return
          }
          
          if (!message || typeof message !== 'string' || message.trim() === '') {
            socket.emit("error", { message: "Mensaje inválido" })
            return
          }
          
          const userInfo = users.get(socket.id)
          if (!userInfo) {
            socket.emit("error", { message: "Usuario no encontrado" })
            return
          }
          
          console.log(`Message received from ${userInfo.username} (${socket.id}) to room ${roomName}:`, message)
          
          // Verificar si el usuario está en la sala
          if (!userRooms.has(roomName)) {
            socket.emit("error", { message: "No estás en esta sala" })
            return
          }
          
          const messageData = {
            roomName,
            message,
            senderId: socket.id,
            username: userInfo.username,
            timestamp: new Date().toISOString()
          }
          
          // Send to everyone in the room including sender
          io.to(roomName).emit("room-message", messageData)
        } catch (error) {
          console.error("Error al enviar mensaje:", error)
          socket.emit("error", { message: "Error al enviar mensaje" })
        }
      })

      // Handle client disconnection
      socket.on("disconnect", () => {
        try {
          const userInfo = users.get(socket.id)
          console.log(`Socket disconnected: ${socket.id} ${userInfo ? `(${userInfo.username})` : ''}`)
          
          // Notify all rooms this user was in
          userRooms.forEach(roomName => {
            io.to(roomName).emit("room-event", {
              type: "user-disconnected",
              roomName,
              userId: socket.id,
              username: userInfo ? userInfo.username : "Anónimo",
              timestamp: new Date().toISOString()
            })
          })
          
          // Eliminar usuario de la lista
          users.delete(socket.id)
        } catch (error) {
          console.error("Error en desconexión:", error)
        }
      })
    })

    // Make io accessible to our client
    res.socket.server.io = io
  }

  res.end()
}

export default SocketRoomsHandler