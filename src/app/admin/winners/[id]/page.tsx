import { db } from "@/db"
import { winners } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { WinnerForm } from "../form"

export const revalidate = 0

export default async function EditWinner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const numericId = Number(id)
  if (isNaN(numericId)) notFound()

  const result = await db.select().from(winners).where(eq(winners.id, numericId)).limit(1)
  if (!result[0]) notFound()

  const winner = { ...result[0], prizes: (result[0].prizes || []) as { label: string; type: "cash" | "gift"; amount?: number; imageUrl?: string }[] }
  return <WinnerForm winner={winner as any} />
}
