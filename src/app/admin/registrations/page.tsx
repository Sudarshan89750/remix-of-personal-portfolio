import Link from "next/link"
import { db } from "@/db"
import { registrations, competitions, users } from "@/db/schema"
import { desc } from "drizzle-orm"

export const revalidate = 0

export default async function RegistrationsList() {
  const all = await db.select().from(registrations).orderBy(desc(registrations.createdAt))
  const totalCount = all.length

  const compMap = new Map<number, string>()
  try {
    const comps = await db.select({ id: competitions.id, title: competitions.title }).from(competitions)
    comps.forEach((c) => compMap.set(c.id, c.title))
  } catch {}

  const userMap = new Map<string, string>()
  try {
    const usrs = await db.select({ id: users.id, fullName: users.fullName }).from(users)
    usrs.forEach((u) => userMap.set(u.id, u.fullName || "—"))
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Registrations</h1>
          <p className="text-sm text-zinc-500 mt-1">{totalCount} total</p>
        </div>
      </div>

      {all.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500 text-sm">No registrations yet.</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-zinc-500 text-xs">
                <th className="p-3 font-medium">ID</th>
                <th className="p-3 font-medium">User</th>
                <th className="p-3 font-medium">Instagram</th>
                <th className="p-3 font-medium">Competition</th>
                <th className="p-3 font-medium">Payment</th>
                <th className="p-3 font-medium">Transaction</th>
                <th className="p-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {all.map((r) => (
                <tr key={r.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="p-3 text-zinc-400 font-mono text-xs">{r.id}</td>
                  <td className="p-3 font-medium text-xs">{userMap.get(r.userId || "") || r.userId?.slice(0, 8) || "—"}</td>
                  <td className="p-3 text-zinc-300">{r.instagramHandle || "—"}</td>
                  <td className="p-3 text-zinc-400 text-xs">{compMap.get(r.competitionId || 0) || `ID: ${r.competitionId}`}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.paymentStatus === "paid" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}`}>
                      {r.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-xs text-zinc-500">{r.transactionId || "—"}</td>
                  <td className="p-3 text-xs text-zinc-500">{r.createdAt?.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
