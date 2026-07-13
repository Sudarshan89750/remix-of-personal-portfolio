import React from "react"
import Link from "next/link"
import Image from "next/image"
import { db } from "@/db"
import { winners, competitions } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { ScrollReveal } from "../ui/scroll-reveal"
import { InstagramIcon } from "@/components/ui/icons"
import { Gift, Banknote, Trophy } from "lucide-react"

export const revalidate = 0

export async function WinnersSection() {
  const allWinners = await db.select().from(winners).orderBy(desc(winners.createdAt)).limit(6)

  if (allWinners.length === 0) return null

  const compMap = new Map<number, { title: string; slug: string }>()
  try {
    const comps = await db.select({ id: competitions.id, title: competitions.title, slug: competitions.slug }).from(competitions)
    comps.forEach((c) => compMap.set(c.id, { title: c.title, slug: c.slug }))
  } catch {}

  return (
    <section className="py-20 md:py-24 bg-surface-alt/10 border-b border-border" aria-label="Past winners showcase">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-3 mb-12 md:mb-16 max-w-2xl">
          <ScrollReveal>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand/70">Hall of Fame</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold font-display leading-tight tracking-tight max-w-xl">
              Winners. <span className="text-brand italic font-semibold">On the record.</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allWinners.map((w, idx) => {
            const comp = compMap.get(w.competitionId)
            const prizeList = (w.prizes as { label: string; type: string; amount?: number; imageUrl?: string }[] | null) || []

            return (
              <ScrollReveal key={w.id} delay={0.05 * idx}>
                <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-brand/20 transition-colors duration-300 group">
                  <div className="relative aspect-[4/3] bg-zinc-800 overflow-hidden">
                    {w.photoUrl ? (
                      <Image src={w.photoUrl} alt={w.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-102 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                        <Trophy className="size-12" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-brand/15 text-brand border border-brand/20">
                        <span className="size-1.5 rounded-full bg-brand" />
                        #{w.position}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-3">
                    <div>
                      <h3 className="font-display font-bold text-base text-foreground">{w.name}</h3>
                      <a href={`https://instagram.com/${w.instagramHandle.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-brand flex items-center gap-1.5 mt-0.5 transition-colors">
                        <InstagramIcon className="size-3.5" />
                        {w.instagramHandle}
                      </a>
                    </div>

                    {comp && (
                      <Link href={`/competitions/${comp.slug}`} className="text-[11px] font-mono tracking-wider text-zinc-500 hover:text-brand transition-colors">
                        {comp.title}
                      </Link>
                    )}

                    {prizeList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border/50">
                        {prizeList.map((p, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800/50 text-zinc-400 border border-border/60">
                            {p.type === "cash" ? <Banknote className="size-3" /> : p.imageUrl ? (
                              <span className="size-3 rounded overflow-hidden shrink-0">
                                <Image src={p.imageUrl} alt="" width={12} height={12} className="object-cover size-full" />
                              </span>
                            ) : <Gift className="size-3" />}
                            {p.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
