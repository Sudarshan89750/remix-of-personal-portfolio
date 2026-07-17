import Link from "next/link"
import { db } from "@/db"
import { winners, competitions } from "@/db/schema"
import { desc } from "drizzle-orm"
import { Plus, Pencil, ExternalLink, Gift, Banknote } from "lucide-react"
import { DeleteButton } from "./delete-button"
import type { PrizeItem } from "@/data/competitions"

export const revalidate = 0

export default async function WinnersList() {
  const allWinners = await db.select().from(winners).orderBy(desc(winners.createdAt))
  const totalCount = allWinners.length

  const compMap = new Map<number, string>()
  try {
    const comps = await db.select({ id: competitions.id, title: competitions.title }).from(competitions)
    comps.forEach((c) => compMap.set(c.id, c.title))
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Winners</h1>
          <p className="text-sm text-zinc-500 mt-1">{totalCount} total</p>
        </div>
        <Link
          href="/admin/winners/new"
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors"
        >
          <Plus className="size-4" />
          Add Winner
        </Link>
      </div>

      {allWinners.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500 text-sm">No winners yet.</p>
          <Link href="/admin/winners/new" className="text-red-400 text-sm mt-2 inline-block hover:text-red-300">
            Add your first winner
          </Link>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-zinc-500 text-xs">
                <th className="p-3 font-medium">Rank</th>
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Instagram</th>
                <th className="p-3 font-medium">Competition</th>
                <th className="p-3 font-medium">Prizes</th>
                <th className="p-3 font-medium">Photo</th>
                <th className="p-3 font-medium w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allWinners.map((w) => {
                const prizeList = (w.prizes as PrizeItem[] | null)
                return (
                <tr key={w.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="p-3">
                    <span className="font-mono text-xs bg-zinc-800 px-2 py-0.5 rounded">#{w.position}</span>
                  </td>
                  <td className="p-3 font-medium">{w.name}</td>
                  <td className="p-3">
                    <a href={`https://instagram.com/${w.instagramHandle.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-400 flex items-center gap-1">
                      {w.instagramHandle} <ExternalLink className="size-3" />
                    </a>
                  </td>
                  <td className="p-3 text-zinc-400 text-xs">{compMap.get(w.competitionId) || `ID: ${w.competitionId}`}</td>
                  <td className="p-3">
                    {prizeList?.length ? (
                      <div className="flex flex-wrap gap-1">
                        {prizeList.map((p, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                            {p.type === "cash" ? <Banknote className="size-3" /> : <Gift className="size-3" />}
                            {p.label}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="p-3">
                    {w.photoUrl ? (
                      <a href={w.photoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-red-400">View</a>
                    ) : (
                      <span className="text-xs text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/winners/${w.id}`} className="p-1.5 rounded-md hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors">
                        <Pencil className="size-3.5" />
                      </Link>
                      <DeleteButton id={w.id} />
                    </div>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
