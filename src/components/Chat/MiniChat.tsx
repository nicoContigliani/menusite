"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { TextField, Button, Box, List, ListItem, ListItemText, Typography } from '@mui/material'

type ChatMessage = {
  user: string
  text: string
  timestamp: number
}

export const MiniChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('general')
  const [username, setUsername] = useState(`user${Math.floor(Math.random() * 1000)}`)
  const socketRef = useRef<any>(null)
  const [isConnected, setIsConnected] = useState(false)

  // Función para unirse a sala
  const joinRoom = useCallback(() => {
    if (socketRef.current && username.trim()) {
      socketRef.current.emit('join_room', room, username.trim())
    }
  }, [room, username])

  // Función para enviar mensaje
  const sendMessage = useCallback(() => {
    if (message.trim() && socketRef.current && isConnected) {
      const newMessage = {
        room,
        user: username,
        text: message,
        timestamp: Date.now()
      }
      socketRef.current.emit('message', newMessage)
      setMessage('')
    }
  }, [message, room, username, isConnected])

  useEffect(() => {
    // Inicializar socket
    socketRef.current = new (require('socket.io-client').io)({
      path: '/api/socket',
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })

    // Manejadores de eventos
    const onConnect = () => {
      setIsConnected(true)
      joinRoom()
    }

    const onMessage = (msg: ChatMessage) => {
      setMessages(prev => [...prev, msg])
    }

    const onHistory = (history: ChatMessage[]) => {
      setMessages(history)
    }

    socketRef.current.on('connect', onConnect)
    socketRef.current.on('message', onMessage)
    socketRef.current.on('room_history', onHistory)

    // Limpieza
    return () => {
      socketRef.current?.off('connect', onConnect)
      socketRef.current?.off('message', onMessage)
      socketRef.current?.off('room_history', onHistory)
      socketRef.current?.disconnect()
    }
  }, [joinRoom])

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Room: {room}</Typography>
      <Typography color={isConnected ? 'success.main' : 'error.main'} gutterBottom>
        {isConnected ? 'Connected' : 'Disconnected'} as {username}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          fullWidth
        />
        <TextField
          size="small"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          label="Room"
          fullWidth
        />
        <Button onClick={joinRoom} variant="contained" sx={{ minWidth: 80 }}>
          Join
        </Button>
      </Box>

      <List sx={{ height: 300, overflow: 'auto', bgcolor: 'background.paper', mb: 2, borderRadius: 1 }}>
        {messages.map((msg, i) => (
          <ListItem key={`${msg.timestamp}-${i}`} alignItems="flex-start">
            <ListItemText 
              primary={msg.text}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    {msg.user}
                  </Typography>
                  {` - ${new Date(msg.timestamp).toLocaleTimeString()}`}
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      <Box component="form" onSubmit={(e) => { e.preventDefault(); sendMessage() }} sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!isConnected}
          placeholder={isConnected ? "Type a message..." : "Connecting..."}
        />
        <Button 
          type="submit"
          variant="contained" 
          disabled={!isConnected || !message.trim()}
          sx={{ minWidth: 80 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  )
}