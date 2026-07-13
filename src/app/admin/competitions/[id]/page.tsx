import { db } from "@/db"
import { competitions } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { CompetitionForm } from "../form"

export const revalidate = 0

export default async function EditCompetition({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const numericId = Number(id)
  if (isNaN(numericId)) notFound()

  const competition = await db.select().from(competitions).where(eq(competitions.id, numericId)).limit(1)
  if (!competition[0]) notFound()

  return <CompetitionForm competition={competition[0]} />
}
