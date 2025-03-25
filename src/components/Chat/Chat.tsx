"use client"

import type React from "react"
import { useState } from "react"
import { ChatMessage } from "../../../types/socket"
import { useSocket } from "../../../hooks/useSocket"

export const Chat: React.FC = () => {
  const { isConnected, messages, sendMessage } = useSocket()
  const [messageText, setMessageText] = useState("")
  const [username, setUsername] = useState("User")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageText.trim()) {
      sendMessage({
        user: username,
        text: messageText,
      })
      setMessageText("")
    }
  }

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-4 border-b">
        <h2 className="text-lg font-semibold">Real-time Chat</h2>
        <div className="text-sm">
          Status:{" "}
          {isConnected ? (
            <span className="text-green-500">Connected</span>
          ) : (
            <span className="text-red-500">Disconnected</span>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">No messages yet</div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg: ChatMessage) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.user === username ? "ml-auto bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <div className="font-semibold text-sm">{msg.user}</div>
                <div>{msg.text}</div>
                <div className="text-xs opacity-70">{new Date(msg.timestamp).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t">
        <div className="mb-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            className="w-full p-2 border rounded text-sm"
          />
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={!isConnected}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

