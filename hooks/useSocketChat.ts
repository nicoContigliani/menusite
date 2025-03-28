import { useState, useEffect, useRef, useCallback } from 'react'
import io, { Socket } from 'socket.io-client'

export type Message = {
  roomName: string;
  message: string;
  senderId: string;
  username: string;
  timestamp: string;
}

export type RoomEvent = {
  type: 'user-joined' | 'user-left' | 'user-disconnected';
  roomName: string;
  userId: string;
  username: string;
  timestamp: string;
}

export function useSocketChat() {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null)
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState('')
  const [usernameSet, setUsernameSet] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [activeRooms, setActiveRooms] = useState<string[]>([])
  const [events, setEvents] = useState<RoomEvent[]>([])
  const socketInitialized = useRef(false)
  const pendingRoomJoin = useRef<string | null>(null)

  // Initialize socket connection
  useEffect(() => {
    if (socketInitialized.current) return
    
    const initSocket = async () => {
      try {
        // Make sure socket server is running by hitting the API endpoint
        await fetch('/api/socket-rooms')
        
        const socketInstance = io({
          path: '/api/socket-rooms',
          transports: ['websocket']
        })

        socketInstance.on('connect', () => {
          console.log('Socket connected!')
          setConnected(true)
        })

        socketInstance.on('disconnect', () => {
          console.log('Socket disconnected!')
          setConnected(false)
          setUsernameSet(false)
          setActiveRooms([])
        })

        socketInstance.on('username-set', ({ username }: { username: string }) => {
          console.log(`Username set: ${username}`)
          setUsernameSet(true)
          
          // Si hay una sala pendiente para unirse después de establecer el nombre de usuario
          if (pendingRoomJoin.current) {
            console.log(`Joining pending room: ${pendingRoomJoin.current}`)
            socketInstance.emit('join-room', pendingRoomJoin.current)
            pendingRoomJoin.current = null
          }
        })

        socketInstance.on('room-message', (data: Message) => {
          console.log('Received message:', data)
          setMessages(prev => [...prev, data])
        })

        socketInstance.on('room-event', (data: RoomEvent) => {
          console.log('Room event:', data)
          setEvents(prev => [...prev, data])
        })

        socketInstance.on('room-joined', ({ roomName }: { roomName: string }) => {
          console.log(`Joined room: ${roomName}`)
          setActiveRooms(prev => {
            if (!prev.includes(roomName)) {
              return [...prev, roomName]
            }
            return prev
          })
        })

        socketInstance.on('room-left', ({ roomName }: { roomName: string }) => {
          console.log(`Left room: ${roomName}`)
          setActiveRooms(prev => prev.filter(room => room !== roomName))
        })

        socketInstance.on('error', (error: any) => {
          console.error('Socket error:', error)
          alert(`Error: ${error.message || 'Ocurrió un error en la conexión'}`)
        })

        setSocket(socketInstance)
        socketInitialized.current = true
      } catch (error) {
        console.error('Error initializing socket:', error)
      }
    }

    initSocket()

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  // Set username and join initial room
  const setUserAndJoinRoom = useCallback((newUsername: string, roomName: string) => {
    if (!socket || !newUsername.trim() || !roomName.trim()) return false
    
    console.log(`Setting username: ${newUsername} and joining room: ${roomName}`)
    
    // Update local state
    setUsername(newUsername)
    
    // Guardar la sala a la que queremos unirnos después de establecer el nombre
    pendingRoomJoin.current = roomName
    
    // Establecer nombre de usuario primero
    socket.emit('set-username', newUsername)
    
    return true
  }, [socket])

  // Join a room
  const joinRoom = useCallback((roomName: string) => {
    if (!socket || !roomName.trim() || !usernameSet) return false
    
    console.log(`Joining room: ${roomName}`)
    socket.emit('join-room', roomName)
    
    return true
  }, [socket, usernameSet])

  // Leave a room
  const leaveRoom = useCallback((roomName: string) => {
    if (!socket || !roomName.trim()) return false
    
    console.log(`Leaving room: ${roomName}`)
    socket.emit('leave-room', roomName)
    
    return true
  }, [socket])

  // Send a message to a room
  const sendMessage = useCallback((roomName: string, messageText: string) => {
    if (!socket || !messageText.trim() || !roomName.trim()) return false
    
    console.log(`Sending message to room ${roomName}: ${messageText}`)
    socket.emit('room-message', {
      roomName,
      message: messageText
    })
    
    return true
  }, [socket])

  // Get messages for a specific room
  const getRoomMessages = useCallback((roomName: string) => {
    return messages.filter(msg => msg.roomName === roomName)
  }, [messages])

  // Get events for a specific room
  const getRoomEvents = useCallback((roomName: string) => {
    return events.filter(event => event.roomName === roomName)
  }, [events])

  // Disconnect socket
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect()
    }
  }, [socket])

  return {
    // State
    connected,
    username,
    usernameSet,
    activeRooms,
    messages,
    events,
    
    // Methods
    setUserAndJoinRoom,
    joinRoom,
    leaveRoom,
    sendMessage,
    getRoomMessages,
    getRoomEvents,
    disconnect,
    
    // Helpers
    isSocketId: (id: string) => socket?.id === id
  }
}