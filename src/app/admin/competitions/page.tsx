import Link from "next/link"
import { db } from "@/db"
import { competitions } from "@/db/schema"
import { desc } from "drizzle-orm"
import { Plus, Pencil } from "lucide-react"
import { DeleteButton } from "./delete-button"

export const revalidate = 0

export default async function CompetitionsList() {
  const allCompetitions = await db.select().from(competitions).orderBy(desc(competitions.id))
  const totalCount = allCompetitions.length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Competitions</h1>
          <p className="text-sm text-zinc-500 mt-1">{totalCount} total</p>
        </div>
        <Link
          href="/admin/competitions/new"
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors"
        >
          <Plus className="size-4" />
          New Competition
        </Link>
      </div>

      {allCompetitions.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500 text-sm">No competitions yet.</p>
          <Link href="/admin/competitions/new" className="text-red-400 text-sm mt-2 inline-block hover:text-red-300">Create one</Link>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-zinc-500 text-xs">
                <th className="p-3 font-medium">ID</th>
                <th className="p-3 font-medium">Title</th>
                <th className="p-3 font-medium">Season</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Prize</th>
                <th className="p-3 font-medium">Slug</th>
                <th className="p-3 font-medium w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCompetitions.map((c) => (
                <tr key={c.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="p-3 text-zinc-400 font-mono text-xs">{c.id}</td>
                  <td className="p-3 font-medium">{c.title}</td>
                  <td className="p-3 text-zinc-400">S{c.season}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === "open" ? "bg-green-500/10 text-green-400" : c.status === "upcoming" ? "bg-blue-500/10 text-blue-400" : "bg-zinc-800 text-zinc-500"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3 text-zinc-300">₹{c.prizeINR?.toLocaleString()}</td>
                  <td className="p-3 text-zinc-500 font-mono text-xs">{c.slug}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/competitions/${c.id}`} className="p-1.5 rounded-md hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors">
                        <Pencil className="size-3.5" />
                      </Link>
                      <DeleteButton id={c.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
