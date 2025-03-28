// import { useEffect, useState, useRef, FormEvent } from 'react'
// import io from 'socket.io-client'

// type Message = {
//   roomName: string;
//   message: string;
//   senderId: string;
//   username: string;
//   timestamp: string;
// }

// type RoomEvent = {
//   type: 'user-joined' | 'user-left' | 'user-disconnected';
//   roomName: string;
//   userId: string;
//   username: string;
//   timestamp: string;
// }

// export default function ChatRooms() {
//   const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null)
//   const [connected, setConnected] = useState(false)
//   const [username, setUsername] = useState('')
//   const [usernameSet, setUsernameSet] = useState(false)
//   const [initialRoomName, setInitialRoomName] = useState('')
//   const [roomName, setRoomName] = useState('')
//   const [message, setMessage] = useState('')
//   const [messages, setMessages] = useState<Message[]>([])
//   const [activeRooms, setActiveRooms] = useState<string[]>([])
//   const [events, setEvents] = useState<RoomEvent[]>([])
//   const socketInitialized = useRef(false)
//   const pendingRoomJoin = useRef<string | null>(null)

//   // Initialize socket connection
//   useEffect(() => {
//     if (socketInitialized.current) return
    
//     const initSocket = async () => {
//       // Make sure socket server is running by hitting the API endpoint
//       await fetch('/api/socket-rooms')
      
//       const socketInstance = io({
//         path: '/api/socket-rooms',
//         transports: ['websocket']
//       })

//       socketInstance.on('connect', () => {
//         console.log('Socket connected!')
//         setConnected(true)
//       })

//       socketInstance.on('disconnect', () => {
//         console.log('Socket disconnected!')
//         setConnected(false)
//         setUsernameSet(false)
//         setActiveRooms([])
//       })

//       socketInstance.on('username-set', ({ username }: { username: string }) => {
//         console.log(`Username set: ${username}`)
//         setUsernameSet(true)
        
//         // Si hay una sala pendiente para unirse después de establecer el nombre de usuario
//         if (pendingRoomJoin.current) {
//           console.log(`Joining pending room: ${pendingRoomJoin.current}`)
//           socketInstance.emit('join-room', pendingRoomJoin.current)
//           pendingRoomJoin.current = null
//         }
//       })

//       socketInstance.on('room-message', (data: Message) => {
//         console.log('Received message:', data)
//         setMessages(prev => [...prev, data])
//       })

//       socketInstance.on('room-event', (data: RoomEvent) => {
//         console.log('Room event:', data)
//         setEvents(prev => [...prev, data])
//       })

//       socketInstance.on('room-joined', ({ roomName }: { roomName: string }) => {
//         console.log(`Joined room: ${roomName}`)
//         setActiveRooms(prev => {
//           if (!prev.includes(roomName)) {
//             return [...prev, roomName]
//           }
//           return prev
//         })
//       })

//       socketInstance.on('room-left', ({ roomName }: { roomName: string }) => {
//         console.log(`Left room: ${roomName}`)
//         setActiveRooms(prev => prev.filter(room => room !== roomName))
//       })

//       socketInstance.on('error', (error: any) => {
//         console.error('Socket error:', error)
//         alert(`Error: ${error.message || 'Ocurrió un error en la conexión'}`)
//       })

//       setSocket(socketInstance)
//       socketInitialized.current = true
//     }

//     initSocket()

//     // Cleanup on unmount
//     return () => {
//       if (socket) {
//         socket.disconnect()
//       }
//     }
//   }, [])

//   const handleInitialJoin = (e: FormEvent) => {
//     e.preventDefault()
//     if (!socket || !username.trim() || !initialRoomName.trim()) return
    
//     console.log(`Setting username: ${username} and joining room: ${initialRoomName}`)
    
//     // Guardar la sala a la que queremos unirnos después de establecer el nombre
//     pendingRoomJoin.current = initialRoomName
    
//     // Establecer nombre de usuario primero
//     socket.emit('set-username', username)
    
//     // La unión a la sala se manejará en el evento 'username-set'
//   }

//   const joinRoom = (e: FormEvent) => {
//     e.preventDefault()
//     if (!socket || !roomName.trim() || !usernameSet) return
    
//     console.log(`Joining additional room: ${roomName}`)
//     socket.emit('join-room', roomName)
//     setRoomName('')
//   }

//   const leaveRoom = (room: string) => {
//     if (!socket) return
//     console.log(`Leaving room: ${room}`)
//     socket.emit('leave-room', room)
//   }

//   const sendMessage = (e: FormEvent, room: string) => {
//     e.preventDefault()
//     if (!socket || !message.trim() || !room) return
    
//     console.log(`Sending message to room ${room}: ${message}`)
//     socket.emit('room-message', {
//       roomName: room,
//       message
//     })
    
//     setMessage('')
//   }

//   // Renderizar formulario inicial si el usuario no ha establecido su nombre
//   if (connected && !usernameSet) {
//     return (
//       <div className="p-4 max-w-md mx-auto">
//         <h1 className="text-2xl font-bold mb-4">Bienvenido al Chat</h1>
//         <div className="bg-green-100 p-2 rounded mb-4">
//           Status: Conectado
//         </div>
//         <form onSubmit={handleInitialJoin} className="space-y-4">
//           <div>
//             <label htmlFor="username" className="block mb-2 font-medium">
//               Nombre de usuario
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Tu nombre"
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="initialRoom" className="block mb-2 font-medium">
//               Sala de chat
//             </label>
//             <input
//               id="initialRoom"
//               type="text"
//               value={initialRoomName}
//               onChange={(e) => setInitialRoomName(e.target.value)}
//               placeholder="Nombre de la sala"
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <button 
//             type="submit" 
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Entrar al chat
//           </button>
//         </form>
//       </div>
//     )
//   }

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <div className="mb-4">
//         <h1 className="text-2xl font-bold mb-2">Chat Rooms</h1>
//         <div className="bg-green-100 p-2 rounded flex justify-between">
//           <span>Status: {connected ? 'Conectado' : 'Desconectado'}</span>
//           {usernameSet && <span>Usuario: <strong>{username}</strong></span>}
//         </div>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Unirse a otra sala</h2>
//         <form onSubmit={joinRoom} className="flex gap-2">
//           <input
//             type="text"
//             value={roomName}
//             onChange={(e) => setRoomName(e.target.value)}
//             placeholder="Nombre de la sala"
//             className="flex-1 p-2 border rounded"
//           />
//           <button 
//             type="submit" 
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             disabled={!connected || !usernameSet}
//           >
//             Unirse
//           </button>
//         </form>
//       </div>

//       {activeRooms.length === 0 && usernameSet && (
//         <div className="text-center p-8 bg-gray-50 rounded-lg border">
//           <p className="text-gray-500">No estás en ninguna sala actualmente.</p>
//           <p className="text-gray-500 mt-2">Usa el formulario de arriba para unirte a una sala.</p>
//         </div>
//       )}

//       {activeRooms.length > 0 && (
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Salas activas</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {activeRooms.map(room => (
//               <div key={room} className="border rounded p-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-medium">Sala: {room}</h3>
//                   <button 
//                     onClick={() => leaveRoom(room)}
//                     className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//                   >
//                     Salir
//                   </button>
//                 </div>
                
//                 <div className="h-60 overflow-y-auto mb-4 border rounded p-2 bg-gray-50">
//                   {messages
//                     .filter(msg => msg.roomName === room)
//                     .map((msg, idx) => (
//                       <div key={idx} className={`mb-2 ${msg.senderId === socket?.id ? 'text-right' : ''}`}>
//                         <div className={`inline-block px-3 py-2 rounded-lg ${
//                           msg.senderId === socket?.id 
//                             ? 'bg-blue-500 text-white' 
//                             : 'bg-gray-200 text-gray-800'
//                         }`}>
//                           <div className="font-semibold text-sm">
//                             {msg.senderId === socket?.id ? 'Tú' : msg.username}
//                           </div>
//                           <p>{msg.message}</p>
//                           <div className="text-xs opacity-75 mt-1">
//                             {new Date(msg.timestamp).toLocaleTimeString()}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
                  
//                   {events
//                     .filter(event => event.roomName === room)
//                     .map((event, idx) => (
//                       <div key={`event-${idx}`} className="text-xs text-gray-500 italic my-1 text-center">
//                         {event.type === 'user-joined' && `${event.username} se unió a la sala`}
//                         {event.type === 'user-left' && `${event.username} abandonó la sala`}
//                         {event.type === 'user-disconnected' && `${event.username} se desconectó`}
//                       </div>
//                     ))}
                    
//                   {messages.filter(msg => msg.roomName === room).length === 0 && 
//                    events.filter(event => event.roomName === room).length === 0 && (
//                     <div className="text-center p-4 text-gray-400">
//                       No hay mensajes aún. ¡Sé el primero en escribir!
//                     </div>
//                   )}
//                 </div>
                
//                 <form onSubmit={(e) => sendMessage(e, room)} className="flex gap-2">
//                   <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Escribe un mensaje"
//                     className="flex-1 p-2 border rounded"
//                   />
//                   <button 
//                     type="submit" 
//                     className="bg-green-500 text-white px-4 py-2 rounded"
//                     disabled={!connected}
//                   >
//                     Enviar
//                   </button>
//                 </form>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


import { FormEvent, useState } from 'react'
import { useSocketChat } from '../../../hooks/useSocketChat'

export default function ChatRooms() {
  // Estados locales del formulario
  const [initialUsername, setInitialUsername] = useState('')
  const [initialRoomName, setInitialRoomName] = useState('')
  const [roomNameInput, setRoomNameInput] = useState('')
  const [messageInput, setMessageInput] = useState('')
  
  // Usar nuestro custom hook
  const {
    connected,
    username,
    usernameSet,
    activeRooms,
    setUserAndJoinRoom,
    joinRoom,
    leaveRoom,
    sendMessage,
    getRoomMessages,
    getRoomEvents,
    isSocketId
  } = useSocketChat()

  // Manejar el envío del formulario inicial
  const handleInitialJoin = (e: FormEvent) => {
    e.preventDefault()
    if (setUserAndJoinRoom(initialUsername, initialRoomName)) {
      // Limpiar el campo de sala inicial
      setInitialRoomName('')
    }
  }

  // Manejar la unión a una sala adicional
  const handleJoinRoom = (e: FormEvent) => {
    e.preventDefault()
    if (joinRoom(roomNameInput)) {
      setRoomNameInput('')
    }
  }

  // Manejar el envío de un mensaje
  const handleSendMessage = (e: FormEvent, room: string) => {
    e.preventDefault()
    if (sendMessage(room, messageInput)) {
      setMessageInput('')
    }
  }

  // Renderizar formulario inicial si el usuario no ha establecido su nombre
  if (connected && !usernameSet) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Bienvenido al Chat</h1>
        <div className="bg-green-100 p-2 rounded mb-4">
          Status: Conectado
        </div>
        <form onSubmit={handleInitialJoin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-2 font-medium">
              Nombre de usuario
            </label>
            <input
              id="username"
              type="text"
              value={initialUsername}
              onChange={(e) => setInitialUsername(e.target.value)}
              placeholder="Tu nombre"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="initialRoom" className="block mb-2 font-medium">
              Sala de chat
            </label>
            <input
              id="initialRoom"
              type="text"
              value={initialRoomName}
              onChange={(e) => setInitialRoomName(e.target.value)}
              placeholder="Nombre de la sala"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white px-4 py-2 rounded"
          >
            Entrar al chat
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Chat Rooms</h1>
        <div className="bg-green-100 p-2 rounded flex justify-between">
          <span>Status: {connected ? 'Conectado' : 'Desconectado'}</span>
          {usernameSet && <span>Usuario: <strong>{username}</strong></span>}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Unirse a otra sala</h2>
        <form onSubmit={handleJoinRoom} className="flex gap-2">
          <input
            type="text"
            value={roomNameInput}
            onChange={(e) => setRoomNameInput(e.target.value)}
            placeholder="Nombre de la sala"
            className="flex-1 p-2 border rounded"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={!connected || !usernameSet}
          >
            Unirse
          </button>
        </form>
      </div>

      {activeRooms.length === 0 && usernameSet && (
        <div className="text-center p-8 bg-gray-50 rounded-lg border">
          <p className="text-gray-500">No estás en ninguna sala actualmente.</p>
          <p className="text-gray-500 mt-2">Usa el formulario de arriba para unirte a una sala.</p>
        </div>
      )}

      {activeRooms.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Salas activas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeRooms.map(room => {
              const roomMessages = getRoomMessages(room)
              const roomEvents = getRoomEvents(room)
              
              return (
                <div key={room} className="border rounded p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Sala: {room}</h3>
                    <button 
                      onClick={() => leaveRoom(room)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Salir
                    </button>
                  </div>
                  
                  <div className="h-60 overflow-y-auto mb-4 border rounded p-2 bg-gray-50">
                    {roomMessages.map((msg, idx) => (
                      <div key={idx} className={`mb-2 ${isSocketId(msg.senderId) ? 'text-right' : ''}`}>
                        <div className={`inline-block px-3 py-2 rounded-lg ${
                          isSocketId(msg.senderId) 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-800'
                        }`}>
                          <div className="font-semibold text-sm">
                            {isSocketId(msg.senderId) ? 'Tú' : msg.username}
                          </div>
                          <p>{msg.message}</p>
                          <div className="text-xs opacity-75 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {roomEvents.map((event, idx) => (
                      <div key={`event-${idx}`} className="text-xs text-gray-500 italic my-1 text-center">
                        {event.type === 'user-joined' && `${event.username} se unió a la sala`}
                        {event.type === 'user-left' && `${event.username} abandonó la sala`}
                        {event.type === 'user-disconnected' && `${event.username} se desconectó`}
                      </div>
                    ))}
                      
                    {roomMessages.length === 0 && roomEvents.length === 0 && (
                      <div className="text-center p-4 text-gray-400">
                        No hay mensajes aún. ¡Sé el primero en escribir!
                      </div>
                    )}
                  </div>
                  
                  <form onSubmit={(e) => handleSendMessage(e, room)} className="flex gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Escribe un mensaje"
                      className="flex-1 p-2 border rounded"
                    />
                    <button 
                      type="submit" 
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      disabled={!connected}
                    >
                      Enviar
                    </button>
                  </form>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}