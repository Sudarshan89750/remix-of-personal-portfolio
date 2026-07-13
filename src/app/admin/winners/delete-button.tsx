"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

export function DeleteButton({ id }: { id: number }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Delete this winner? This cannot be undone.")) return
    try {
      const res = await fetch(`/api/admin/winners/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      router.refresh()
    } catch {
      alert("Failed to delete winner")
    }
  }

  return (
    <button onClick={handleDelete} className="p-1.5 rounded-md hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors">
      <Trash2 className="size-3.5" />
    </button>
  )
}
