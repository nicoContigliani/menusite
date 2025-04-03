// // /components/Chat.tsx
// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io({ path: "/api/socket" });

// export default function Chat() {
//   const [name, setName] = useState("");
//   const [room, setRoom] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<{ name: string; message: string }[]>([]);
//   console.log("🚀 ~ Chat ~ messages:", messages)

//   useEffect(() => {
//     socket.on("receive_message", (data:any) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, []);

//   const joinRoom = () => {
//     if (name && room) {
//       socket.emit("join_room", room);
//     }
//   };

//   const sendMessage = () => {
//     if (message) {
//       socket.emit("send_message", { room, message, name });
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <h1>Chat en Next.js</h1>
//       <input placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
//       <input placeholder="Sala" onChange={(e) => setRoom(e.target.value)} />
//       <button onClick={joinRoom}>Unirse</button>

//       <div>
//         {messages.map((msg, index) => (
//           <p key={index}><strong>{msg.name}: </strong>{msg.message}</p>
//         ))}
//       </div>
//       <input placeholder="Mensaje" value={message} onChange={(e) => setMessage(e.target.value)} />
//       <button onClick={sendMessage}>Enviar</button>
//     </div>
//   );
// }


// components/Chat.tsx
import { useEffect, useState } from "react";
import io from "socket.io-client";

// Conexión al servidor Socket.io en localhost:4000
// const socket = io("http://localhost:4000"); // Cambia esto


// const socket = io("https://glitch.com/edit/#!/translucent-salt-moonstone?path=server.js%3A1%3A0")

const socket = io("https://socketserver-t4g9.onrender.com", {
  transports: ["websocket"], // Fuerza el uso de WebSockets
});

export default function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ name: string; message: string }[]>([]);

  useEffect(() => {
    // Escucha el evento 'new_message' (ajustado al servidor)
    socket.on("new_message", (data: { from: string; message: string }) => {
      setMessages((prev) => [...prev, { name: data.from, message: data.message }]);
    });

    return () => {
      socket.off("new_message");
    };
  }, []);

  const joinRoom = () => {
    if (name && room) {
      socket.emit("join_channel", room); // Evento ajustado al servidor
    }
  };

  const sendMessage = () => {
    if (message && room) {
      socket.emit("send_message", { 
        channel: room, // Asegúrate de enviar 'channel' (como espera el servidor)
        name, 
        message 
      });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat en Next.js + Socket.io</h1>
      <input placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Sala" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Unirse</button>

      <div>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.name}: </strong>{msg.message}</p>
        ))}
      </div>
      <input 
        placeholder="Mensaje" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}