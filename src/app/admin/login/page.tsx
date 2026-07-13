"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Camera, Lock } from "lucide-react"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        setError("Invalid password")
        return
      }

      let from = searchParams.get("from") || "/admin"
      if (!from.startsWith("/")) from = "/admin"
      router.push(from)
      router.refresh()
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="size-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Camera className="size-6 text-red-400" />
            </div>
            <div className="text-center">
              <h1 className="text-lg font-bold text-zinc-100">Admin Login</h1>
              <p className="text-sm text-zinc-500 mt-1">PhotoGigs dashboard</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-medium text-zinc-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50"
                  placeholder="Enter admin password"
                  autoFocus
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          Defined in <span className="font-mono">ADMIN_PASSWORD</span> env variable
        </p>
      </div>
    </div>
  )
}
