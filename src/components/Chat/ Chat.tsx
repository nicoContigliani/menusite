// /components/Chat.tsx
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io({ path: "/api/socket" });

export default function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ name: string; message: string }[]>([]);
  console.log("🚀 ~ Chat ~ messages:", messages)

  useEffect(() => {
    socket.on("receive_message", (data:any) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const joinRoom = () => {
    if (name && room) {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit("send_message", { room, message, name });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat en Next.js</h1>
      <input placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Sala" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Unirse</button>

      <div>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.name}: </strong>{msg.message}</p>
        ))}
      </div>
      <input placeholder="Mensaje" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
