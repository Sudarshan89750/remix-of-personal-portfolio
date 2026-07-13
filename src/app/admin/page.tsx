import Link from "next/link"
import { db } from "@/db"
import { competitions, winners, registrations } from "@/db/schema"
import { desc, count } from "drizzle-orm"
import { Plus, Award, Trophy, Users } from "lucide-react"

export const revalidate = 0

export default async function AdminDashboard() {
  const compCount = await db.select({ count: count() }).from(competitions)
  const winnerCount = await db.select({ count: count() }).from(winners)
  const regCount = await db.select({ count: count() }).from(registrations)
  const latestCompetitions = await db.select().from(competitions).orderBy(desc(competitions.id)).limit(5)

  const stats = [
    { label: "Competitions", value: compCount[0]?.count ?? 0, icon: Award, href: "/admin/competitions" },
    { label: "Winners", value: winnerCount[0]?.count ?? 0, icon: Trophy, href: "/admin/winners" },
    { label: "Registrations", value: regCount[0]?.count ?? 0, icon: Users, href: "/admin/competitions" },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage competitions, winners, and content.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <Link key={s.label} href={s.href} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Icon className="size-4 text-red-400" />
                </div>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
            </Link>
          )
        })}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Latest Competitions</h2>
          <Link href="/admin/competitions/new" className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
            <Plus className="size-3" />
            New
          </Link>
        </div>
        {latestCompetitions.length === 0 ? (
          <p className="text-sm text-zinc-600 py-8 text-center">No competitions yet. Create your first one.</p>
        ) : (
          <div className="space-y-2">
            {latestCompetitions.map((c) => (
              <Link key={c.id} href={`/admin/competitions/${c.id}`} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-zinc-800/60 transition-colors text-sm">
                <div>
                  <span className="font-medium">{c.title}</span>
                  <span className="text-zinc-500 ml-2">S{c.season}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === "open" ? "bg-green-500/10 text-green-400" : "bg-zinc-800 text-zinc-500"}`}>{c.status}</span>
                  <span className="text-xs text-zinc-600">{c.deadline?.toString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
