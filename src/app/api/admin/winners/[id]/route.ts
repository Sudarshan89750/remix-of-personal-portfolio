import { NextResponse } from "next/server"
import { db } from "@/db"
import { winners } from "@/db/schema"
import { eq } from "drizzle-orm"
import { verifyAdminAuth } from "@/lib/admin-auth"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdminAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const numericId = Number(id)
  if (isNaN(numericId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 })

  try {
    const body = await request.json()
    const { competitionId, name, instagramHandle, imageUrl, rank, title, prizes } = body

    const updated = await db.update(winners).set({
      competitionId, name, instagramHandle,
      imageUrl: imageUrl || null,
      rank, title: title || null,
      prizes: prizes || [],
    }).where(eq(winners.id, numericId)).returning()

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
    await db.delete(winners).where(eq(winners.id, numericId))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
