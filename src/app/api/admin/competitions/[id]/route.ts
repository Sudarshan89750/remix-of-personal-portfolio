import { NextResponse } from "next/server"
import { db } from "@/db"
import { competitions } from "@/db/schema"
import { eq } from "drizzle-orm"
import { verifyAdminAuth } from "@/lib/admin-auth"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdminAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const numericId = Number(id)
  if (isNaN(numericId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  const result = await db.select().from(competitions).where(eq(competitions.id, numericId)).limit(1)
  if (!result[0]) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(result[0])
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdminAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const numericId = Number(id)
  if (isNaN(numericId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 })

  try {
    const body = await request.json()
    const { title, subtitle, slug, season, description, status, prizeInr, entryFeeInr, deadline, hashtag, featured, heroPosterUrl, upiId, prizeDescription, platforms, scoring, steps } = body

    const updated = await db.update(competitions).set({
      title, subtitle, slug, season, description, status,
      prizeINR: prizeInr, entryFeeINR: entryFeeInr, deadline: new Date(deadline),
      hashtag, featured: featured ?? false,
      heroPosterUrl: heroPosterUrl || null,
      upiId: upiId || null,
      prizeDescription: prizeDescription || null,
      platforms: JSON.stringify(platforms),
      scoring: JSON.stringify(scoring),
      steps: JSON.stringify(steps),
    }).where(eq(competitions.id, numericId)).returning()

    return NextResponse.json(updated[0])
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdminAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const numericId = Number(id)
  if (isNaN(numericId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  try {
    await db.delete(competitions).where(eq(competitions.id, numericId))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
