export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-gray-400 text-sm">
      <span className="animate-pulse">●</span>
      <span className="animate-pulse delay-100">●</span>
      <span className="animate-pulse delay-200">●</span>
      <span>AI is thinking...</span>
    </div>
  );
}