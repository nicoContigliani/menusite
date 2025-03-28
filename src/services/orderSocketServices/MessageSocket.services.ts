import { Manager } from "socket.io-client"

type SocketIOClientSocket = ReturnType<InstanceType<typeof Manager>["socket"]>
type MessageHandler = (message: any) => void

class MessageSocketService {
    private static instance: MessageSocketService
    private manager: InstanceType<typeof Manager> | null = null
    private socket: SocketIOClientSocket | null = null
    private connected = false
    private username = ""
    private roomName = ""
    private messageHandlers: MessageHandler[] = []

    private constructor() { }

    public static getInstance(): MessageSocketService {
        if (!MessageSocketService.instance) {
            MessageSocketService.instance = new MessageSocketService()
        }
        return MessageSocketService.instance
    }

    public async initialize(username: string, roomName: string): Promise<boolean> {
        this.username = username
        this.roomName = roomName

        if (this.socket) {
            return this.connected
        }

        try {
            await fetch("/api/socket-rooms")

            this.manager = new Manager({
                path: "/api/socket-rooms",
                transports: ["websocket"],
            })

            this.socket = this.manager.socket("/")

            return new Promise((resolve) => {
                const connectionTimeout = setTimeout(() => {
                    resolve(false)
                }, 5000)

                this.socket?.on("connect", () => {
                    clearTimeout(connectionTimeout)
                    this.connected = true
                    this.setupConnection()
                    this.setupMessageListeners()
                    resolve(true)
                })

                this.socket?.on("connect_error", () => {
                    clearTimeout(connectionTimeout)
                    resolve(false)
                })
            })
        } catch (error) {
            console.error("Error initializing socket:", error)
            return false
        }
    }

    private setupConnection() {
        if (!this.socket || !this.username || !this.roomName) return

        this.socket.emit("set-username", this.username)
        this.socket.emit("join-room", this.roomName)
    }

    private setupMessageListeners() {
        if (!this.socket) return

        // Escuchar mensajes generales
        this.socket.on("room-message", (message: any) => {
            try {
                const parsedMessage = JSON.parse(message.message)
                this.notifyHandlers(parsedMessage)
            } catch (error) {
                console.error("Error parsing message:", error)
            }
        })

        // Escuchar mensajes directos
        this.socket.on("direct-message", (message: any) => {
            this.notifyHandlers(message)
        })

        // Manejar reconexiones
        this.socket.on("reconnect", () => {
            this.setupConnection()
        })
    }

    public addMessageHandler(handler: MessageHandler): void {
        this.messageHandlers.push(handler)
    }

    public removeMessageHandler(handler: MessageHandler): void {
        this.messageHandlers = this.messageHandlers.filter(h => h !== handler)
    }

    private notifyHandlers(message: any): void {
        this.messageHandlers.forEach(handler => {
            try {
                handler(message)
            } catch (error) {
                console.error("Error in message handler:", error)
            }
        })
    }

    public disconnect() {
        if (this.socket) {
            this.socket.off("room-message")
            this.socket.off("direct-message")
            this.socket.off("reconnect")
            this.socket.disconnect()
            this.socket = null
            this.connected = false
        }
        if (this.manager) {
            this.manager = null
        }
        this.messageHandlers = []
    }

    public isConnected(): boolean {
        return this.connected
    }
}

export const messageSocketService = MessageSocketService.getInstance()
