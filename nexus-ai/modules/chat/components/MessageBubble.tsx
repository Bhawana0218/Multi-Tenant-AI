export function MessageBubble({ message }: any) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-md px-4 py-3 rounded-2xl shadow-sm
          ${isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-900"}
        `}
      >
        {/* Message content */}
        <p>{message.content}</p>

        {/* 🔥 AI Steps */}
        {!isUser && message.steps && (
          <div className="text-xs text-gray-400 mt-2">
            {message.steps.join(" • ")}
          </div>
        )}
      </div>
    </div>
  );
}