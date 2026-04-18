"use client";

import { Sidebar } from "@/modules/chat/components/Sidebar";

export default function ChatLayout({ children }: any) {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-64 border-r bg-gray-50 p-4">
        <Sidebar />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}