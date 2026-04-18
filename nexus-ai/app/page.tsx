"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-zinc-900 to-zinc-950 text-white flex flex-col">

      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight">
          Nexus AI ⚡
        </h1>

        <div className="flex gap-4 text-sm">
          <Link
            href="/demo-project/chat"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Open Chat
          </Link>

          <Link
            href="/demo-project/admin"
            className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            Admin Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">

        <h2 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
          Multi-Tenant AI Assistant
          <span className="text-blue-500"> for Modern Products</span>
        </h2>

        <p className="mt-6 max-w-xl text-gray-400 text-lg">
          Build scalable AI-powered assistants with project-level isolation,
          configurable dashboards, and real-time integrations.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/demo-project/chat"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium"
          >
            🚀 Start Chat
          </Link>

          <Link
            href="/demo-project/admin"
            className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition font-medium"
          >
            ⚙️ View Admin Dashboard
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
            <h3 className="text-lg font-semibold mb-2">🧠 AI Chat Engine</h3>
            <p className="text-gray-400 text-sm">
              Real-time assistant powered by OpenRouter with controlled execution flow.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
            <h3 className="text-lg font-semibold mb-2">🏢 Multi-Tenant System</h3>
            <p className="text-gray-400 text-sm">
              Projects, users, and product instances fully isolated and secure.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
            <h3 className="text-lg font-semibold mb-2">📊 Config-Driven Admin</h3>
            <p className="text-gray-400 text-sm">
              Modify dashboard UI dynamically from MongoDB — no redeploy needed.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t border-white/10">
        Built with Next.js · MongoDB · OpenRouter · TanStack Query
      </footer>
    </div>
  );
}