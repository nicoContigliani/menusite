import type { NextApiResponse } from "next"
import type { Server as NetServer } from "http"
import type { Socket as NetSocket } from "net"
import type { Server as SocketIOServer } from "socket.io"

export interface SocketServer extends NetServer {
  io?: SocketIOServer
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

// Client-side message types
export interface ChatMessage {
  id: string
  user: string
  text: string
  timestamp: number
}

