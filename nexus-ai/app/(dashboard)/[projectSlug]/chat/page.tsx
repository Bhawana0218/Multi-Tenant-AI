"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSendMessage } from "@/hooks/useChat";

export default function ChatPage() {
  const params = useParams();
  const projectSlug = params?.projectSlug as string;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const { mutate, isPending } = useSendMessage();

  const sendMessage = () => {
    if (!input.trim() || !projectSlug) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    setInput("");

    mutate(
      {
        projectSlug,
        message: userMessage,
      },
      {
        onSuccess: (data: any) => {
          const last = data?.messages?.at(-1);

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: last?.content || "No response from AI",
            },
          ]);
        },
        onError: (err: any) => {
          setMessages((prev) => [
            ...prev,
            {
              role: "system",
              content: err?.message || "Something went wrong",
            },
          ]);
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-full p-6">
      
      {/* Header */}
      <h1 className="text-xl font-bold mb-4">AI Chat</h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 border p-4 rounded">
        {messages.length === 0 && (
          <p className="text-gray-400">Start a conversation...</p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded max-w-[70%] ${
              m.role === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {m.content}
          </div>
        ))}

        {isPending && (
          <div className="text-gray-400">AI is thinking...</div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border px-4 py-2 rounded"
        />
        <button
          onClick={sendMessage}
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}