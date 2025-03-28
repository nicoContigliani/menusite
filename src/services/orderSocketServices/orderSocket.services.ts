import { Manager } from "socket.io-client"

type SocketIOClientSocket = ReturnType<InstanceType<typeof Manager>["socket"]>

class OrderSocketService {
    private static instance: OrderSocketService
    private manager: InstanceType<typeof Manager> | null = null
    private socket: SocketIOClientSocket | null = null
    private connected = false
    private username = ""
    private companyName = ""

    private constructor() { }

    public static getInstance(): OrderSocketService {
        if (!OrderSocketService.instance) {
            OrderSocketService.instance = new OrderSocketService()
        }
        return OrderSocketService.instance
    }

    public async initialize(username: string, companyName: string): Promise<boolean> {
        this.username = username
        this.companyName = companyName

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
        if (!this.socket || !this.username || !this.companyName) return

        this.socket.emit("set-username", this.username)
        this.socket.emit("join-room", this.companyName)
    }

    public async sendOrder(orderDetails: any): Promise<boolean> {
        if (!this.socket || !this.connected) {
            console.error("Socket not connected")
            return false
        }

        return new Promise((resolve) => {
            const message = {
                roomName: this.companyName,
                message: JSON.stringify({
                    type: "order",
                    data: orderDetails,
                    username: this.username,
                    timestamp: new Date().toISOString(),
                }),
            }

            const responseTimeout = setTimeout(() => {
                resolve(false)
            }, 3000)

            this.socket?.emit("room-message", message, (response: any) => {
                clearTimeout(responseTimeout)
                resolve(response?.success ?? false)
            })
        })
    }

    public disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.connected = false;
        }
        if (this.manager) {
            this.manager = null;  // Esto es suficiente para limpieza
        }
    }
}

export const orderSocketService = OrderSocketService.getInstance()
