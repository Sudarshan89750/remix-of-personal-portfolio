"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

const defaultScoring = [
  { name: "Views", weight: 25, description: "Total video views within the competition window." },
  { name: "Likes", weight: 30, description: "Total likes on your entry Reel." },
  { name: "Shares", weight: 25, description: "Each share counts as a high-value signal." },
  { name: "Comments", weight: 20, description: "Genuine comments show audience engagement." },
]

const defaultSteps = [
  { title: "Register & Pay", description: "Sign up and pay the entry fee. Your spot is locked.", bullets: ["Fill in your details", "Pay via UPI QR code", "Receive confirmation"] },
  { title: "Create Your Reel", description: "Shoot a mobile video that fits the theme.", bullets: ["Use your smartphone", "Follow the brief guidelines", "Add relevant hashtags"] },
  { title: "Post & Invite", description: "Upload to Instagram Reels and invite @photogigs.in as a collaborator.", bullets: ["Tag @photogigs.in", "Enable collaboration", "Share to your story"] },
  { title: "Win", description: "The entry with the highest verified engagement score wins.", bullets: ["Public leaderboard", "API-verified scores", "Winner announced"] },
]

interface CompetitionData {
  id: number
  title: string
  subtitle: string
  slug: string
  season: string
  description: string
  status: string
  prizeINR: number
  entryFeeINR: number
  deadline: Date
  hashtag: string
  featured: boolean | null
  heroPosterUrl: string | null
  upiId: string | null
  prizeDescription: string | null
  platforms: unknown
  scoring: unknown
  steps: unknown
}

export function CompetitionForm({ competition }: { competition?: CompetitionData }) {
  const router = useRouter()
  const isEditing = !!competition
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    title: competition?.title ?? "",
    subtitle: competition?.subtitle ?? "",
    slug: competition?.slug ?? "",
    season: competition?.season ?? "",
    description: competition?.description ?? "",
    status: competition?.status ?? "upcoming",
    prizeInr: (competition?.prizeINR as number) ?? 0,
    entryFeeInr: (competition?.entryFeeINR as number) ?? 0,
    deadline: competition?.deadline ? new Date(competition.deadline).toISOString().slice(0, 16) : "",
    hashtag: competition?.hashtag ?? "",
    featured: competition?.featured ?? false,
    heroPosterUrl: competition?.heroPosterUrl ?? "",
    upiId: competition?.upiId ?? "",
    prizeDescription: competition?.prizeDescription ?? "",
    platforms: competition?.platforms ? JSON.stringify(competition.platforms, null, 2) : JSON.stringify(["instagram"], null, 2),
    scoring: competition?.scoring ? JSON.stringify(competition.scoring, null, 2) : JSON.stringify(defaultScoring, null, 2),
    steps: competition?.steps ? JSON.stringify(competition.steps, null, 2) : JSON.stringify(defaultSteps, null, 2),
  })

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const body = {
        ...form,
        prizeInr: Number(form.prizeInr),
        entryFeeInr: Number(form.entryFeeInr),
        platforms: JSON.parse(form.platforms),
        scoring: JSON.parse(form.scoring),
        steps: JSON.parse(form.steps),
      }

      const url = isEditing ? `/api/admin/competitions/${competition.id}` : "/api/admin/competitions"
      const method = isEditing ? "PUT" : "POST"

      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save")
      }
      router.push("/admin/competitions")
      router.refresh()
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  function generateSlug(title: string) {
    if (isEditing) return
    set("slug", title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))
  }

  const inputClass = "w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50"
  const labelClass = "text-xs font-medium text-zinc-400"
  const fieldClass = "flex flex-col gap-1.5"

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/competitions" className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors">
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{isEditing ? "Edit Competition" : "New Competition"}</h1>
          <p className="text-sm text-zinc-500 mt-1">{isEditing ? `S${competition.season} — ${competition.title}` : "Create a new photography competition"}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-zinc-300 border-b border-zinc-800 pb-3">Basic Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className={fieldClass}>
              <label className={labelClass}>Title *</label>
              <input className={inputClass} value={form.title} onChange={(e) => { set("title", e.target.value); generateSlug(e.target.value) }} placeholder="e.g. Monsoon Magic" required />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Subtitle *</label>
              <input className={inputClass} value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} placeholder="e.g. Capture the Rain" required />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Slug *</label>
              <input className={inputClass} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="monsoon-magic" required />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Season *</label>
              <input className={inputClass} value={form.season} onChange={(e) => set("season", e.target.value)} placeholder="e.g. 1" required />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Status *</label>
              <select className={inputClass} value={form.status} onChange={(e) => set("status", e.target.value)} required>
                <option value="upcoming">Upcoming</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Featured</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="rounded border-zinc-600 bg-zinc-800 text-red-500 focus:ring-red-500/50" />
                <span className="text-sm text-zinc-400">Show as featured competition</span>
              </label>
            </div>
          </div>
          <div className={fieldClass}>
            <label className={labelClass}>Description *</label>
            <textarea className={inputClass + " h-24 resize-none"} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the competition theme and rules..." required />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-zinc-300 border-b border-zinc-800 pb-3">Pricing & Deadline</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className={fieldClass}>
              <label className={labelClass}>Prize (INR) *</label>
              <input className={inputClass} type="number" value={form.prizeInr} onChange={(e) => set("prizeInr", Number(e.target.value))} required />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Entry Fee (INR) *</label>
              <input className={inputClass} type="number" value={form.entryFeeInr} onChange={(e) => set("entryFeeInr", Number(e.target.value))} required />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Deadline *</label>
              <input className={inputClass} type="datetime-local" value={form.deadline} onChange={(e) => set("deadline", e.target.value)} required />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Prize Description (optional)</label>
              <input className={inputClass} value={form.prizeDescription} onChange={(e) => set("prizeDescription", e.target.value)} placeholder="e.g. Cash prize + feature on our page" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-zinc-300 border-b border-zinc-800 pb-3">Branding & Social</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className={fieldClass}>
              <label className={labelClass}>Hashtag *</label>
              <input className={inputClass} value={form.hashtag} onChange={(e) => set("hashtag", e.target.value)} placeholder="#PhotoGigsChallenge" required />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>UPI ID (optional)</label>
              <input className={inputClass} value={form.upiId} onChange={(e) => set("upiId", e.target.value)} placeholder="photogigs@ybl" />
            </div>
            <div className={fieldClass}>
              <label className={labelClass}>Hero Poster URL (optional)</label>
              <input className={inputClass} value={form.heroPosterUrl} onChange={(e) => set("heroPosterUrl", e.target.value)} placeholder="https://images.pexels.com/..." />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-zinc-300 border-b border-zinc-800 pb-3">JSON Configurations</h2>
          <div className={fieldClass}>
            <label className={labelClass}>Platforms (JSON) *</label>
            <textarea className={inputClass + " h-20 font-mono text-xs"} value={form.platforms} onChange={(e) => set("platforms", e.target.value)} />
          </div>
          <div className={fieldClass}>
            <label className={labelClass}>Scoring Criteria (JSON) *</label>
            <textarea className={inputClass + " h-32 font-mono text-xs"} value={form.scoring} onChange={(e) => set("scoring", e.target.value)} />
          </div>
          <div className={fieldClass}>
            <label className={labelClass}>Steps (JSON) *</label>
            <textarea className={inputClass + " h-40 font-mono text-xs"} value={form.steps} onChange={(e) => set("steps", e.target.value)} />
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end pb-6">
          <Link href="/admin/competitions" className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors">Cancel</Link>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50">
            <Save className="size-4" />
            {saving ? "Saving..." : isEditing ? "Update Competition" : "Create Competition"}
          </button>
        </div>
      </form>
    </div>
  )
}
