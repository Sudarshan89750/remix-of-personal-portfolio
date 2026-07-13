"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, Save, Upload, Plus, X, Gift, Banknote } from "lucide-react"
import Link from "next/link"

interface PrizeItem {
  label: string
  type: "cash" | "gift"
  amount?: number
  imageUrl?: string
}

interface WinnerData {
  id: number
  competitionId: number
  name: string
  instagramHandle: string
  imageUrl: string | null
  rank: number
  title: string | null
  prizes: PrizeItem[]
}

export function WinnerForm({ winner }: { winner?: WinnerData }) {
  const router = useRouter()
  const isEditing = !!winner
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [prizeUploading, setPrizeUploading] = useState<number | null>(null)
  const [competitions, setCompetitions] = useState<{ id: number; title: string; season: string }[]>([])

  const [form, setForm] = useState({
    competitionId: winner?.competitionId ?? "",
    name: winner?.name ?? "",
    instagramHandle: winner?.instagramHandle ?? "",
    imageUrl: winner?.imageUrl ?? "",
    rank: winner?.rank ?? "",
    title: winner?.title ?? "",
  })

  const [prizes, setPrizes] = useState<PrizeItem[]>(winner?.prizes ?? [])

  useEffect(() => {
    fetch("/api/admin/competitions").then((r) => r.json()).then(setCompetitions).catch(() => {})
  }, [])

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (data.url) setField("imageUrl", data.url)
    } catch {
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  async function handlePrizeUpload(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPrizeUploading(idx)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (data.url) {
        setPrizes((prev) => prev.map((p, i) => i === idx ? { ...p, imageUrl: data.url } : p))
      }
    } catch {
      alert("Upload failed")
    } finally {
      setPrizeUploading(null)
    }
  }

  function addPrize() {
    setPrizes((prev) => [...prev, { label: "", type: "cash" }])
  }

  function updatePrize(idx: number, patch: Partial<PrizeItem>) {
    setPrizes((prev) => prev.map((p, i) => i === idx ? { ...p, ...patch } : p))
  }

  function removePrize(idx: number) {
    setPrizes((prev) => prev.filter((_, i) => i !== idx))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const body = {
        ...form,
        competitionId: Number(form.competitionId),
        rank: Number(form.rank),
        prizes,
      }

      const url = isEditing ? `/api/admin/winners/${winner.id}` : "/api/admin/winners"
      const method = isEditing ? "PUT" : "POST"
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (!res.ok) {
        throw new Error("Failed to save")
      }
      router.push("/admin/winners")
      router.refresh()
    } catch {
      alert("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50"
  const labelClass = "text-xs font-medium text-zinc-400"
  const fieldClass = "flex flex-col gap-1.5"

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/winners" className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors">
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{isEditing ? "Edit Winner" : "Add Winner"}</h1>
          <p className="text-sm text-zinc-500 mt-1">{isEditing ? `#${winner.rank} ${winner.name}` : "Record a competition winner"}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-zinc-300 border-b border-zinc-800 pb-3">Winner Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className={fieldClass}>
              <label className={labelClass}>Competition *</label>
              <select className={inputClass} value={form.competitionId} onChange={(e) => setField("competitionId", e.target.value)} required>
                <option value="">Select competition</option>
                {competitions.map((c) => (
                  <option key={c.id} value={c.id}>S{c.season} — {c.title}</option>
                ))}
              </select>
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Rank *</label>
              <input className={inputClass} type="number" value={form.rank} onChange={(e) => setField("rank", e.target.value)} placeholder="1" required min="1" />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Full Name *</label>
              <input className={inputClass} value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Aarav Sharma" required />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Instagram Handle *</label>
              <input className={inputClass} value={form.instagramHandle} onChange={(e) => setField("instagramHandle", e.target.value)} placeholder="@aarav_shoots" required />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Title (optional)</label>
              <input className={inputClass} value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="e.g. Grand Prize Winner" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-semibold text-zinc-300">Prizes</h2>
            <button type="button" onClick={addPrize} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors">
              <Plus className="size-3.5" />
              Add Prize
            </button>
          </div>

          {prizes.length === 0 && (
            <p className="text-sm text-zinc-600 py-4 text-center">No prizes added yet. Click &quot;Add Prize&quot; to add cash or gift items.</p>
          )}

          {prizes.map((prize, idx) => (
            <div key={idx} className="bg-zinc-800/40 border border-zinc-700/60 rounded-lg p-4 space-y-3 relative">
              <button type="button" onClick={() => removePrize(idx)} className="absolute top-3 right-3 p-1 rounded-md hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors">
                <X className="size-3.5" />
              </button>

              <div className="grid grid-cols-3 gap-3">
                <div className={fieldClass}>
                  <label className={labelClass}>Type</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => updatePrize(idx, { type: "cash", imageUrl: undefined })} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs border transition-colors ${prize.type === "cash" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-300"}`}>
                      <Banknote className="size-3.5" />
                      Cash
                    </button>
                    <button type="button" onClick={() => updatePrize(idx, { type: "gift", amount: undefined })} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs border transition-colors ${prize.type === "gift" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-300"}`}>
                      <Gift className="size-3.5" />
                      Gift
                    </button>
                  </div>
                </div>

                <div className={fieldClass}>
                  <label className={labelClass}>Label *</label>
                  <input className={inputClass} value={prize.label} onChange={(e) => updatePrize(idx, { label: e.target.value })} placeholder={prize.type === "cash" ? "₹50,000 Cash Prize" : "Sony Alpha Camera"} required />
                </div>

                {prize.type === "cash" && (
                  <div className={fieldClass}>
                    <label className={labelClass}>Amount (₹)</label>
                    <input className={inputClass} type="number" value={prize.amount ?? ""} onChange={(e) => updatePrize(idx, { amount: e.target.value ? Number(e.target.value) : undefined })} placeholder="50000" />
                  </div>
                )}

                {prize.type === "gift" && (
                  <div className={fieldClass}>
                    <label className={labelClass}>Gift Image</label>
                    <div className="flex items-center gap-2">
                      <input className={inputClass} value={prize.imageUrl ?? ""} onChange={(e) => updatePrize(idx, { imageUrl: e.target.value })} placeholder="/uploads/prize.jpg" />
                      <label className="flex items-center gap-1.5 px-2.5 py-2 bg-zinc-800 rounded-lg text-xs text-zinc-400 hover:bg-zinc-700 cursor-pointer transition-colors shrink-0">
                        <Upload className="size-3.5" />
                        {prizeUploading === idx ? "..." : "Upload"}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePrizeUpload(idx, e)} disabled={prizeUploading === idx} />
                      </label>
                    </div>
                    {prize.imageUrl && (
                      <img src={prize.imageUrl} alt="" className="mt-1.5 h-12 w-12 object-cover rounded-lg border border-zinc-700" />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-300 border-b border-zinc-800 pb-3">Winner Photo</h2>
          <div className={fieldClass}>
            <label className={labelClass}>Photo URL</label>
            <input className={inputClass} value={form.imageUrl} onChange={(e) => setField("imageUrl", e.target.value)} placeholder="https://... or /uploads/..." />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700 cursor-pointer transition-colors">
              <Upload className="size-4" />
              {uploading ? "Uploading..." : "Upload Photo"}
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
            {form.imageUrl && (
              <img src={form.imageUrl} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-zinc-700" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end pb-6">
          <Link href="/admin/winners" className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors">Cancel</Link>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50">
            <Save className="size-4" />
            {saving ? "Saving..." : isEditing ? "Update Winner" : "Add Winner"}
          </button>
        </div>
      </form>
    </div>
  )
}
