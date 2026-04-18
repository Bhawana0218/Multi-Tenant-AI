"use client";

export function Sidebar() {
  return (
    <div className="space-y-4">
      <button className="w-full bg-blue-600 text-white p-2 rounded-lg">
        + New Chat
      </button>

      <div className="space-y-2">
        {/* Dummy conversations (later dynamic) */}
        <div className="p-2 rounded hover:bg-gray-200 cursor-pointer">
          Sales Strategy Chat
        </div>
        <div className="p-2 rounded hover:bg-gray-200 cursor-pointer">
          Lead Analysis
        </div>
      </div>
    </div>
  );
}