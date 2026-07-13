import { NextResponse } from "next/server"
import { db } from "@/db"
import { winners } from "@/db/schema"
import { desc } from "drizzle-orm"
import { verifyAdminAuth } from "@/lib/admin-auth"

export async function GET(request: Request) {
  if (!verifyAdminAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const all = await db.select().from(winners).orderBy(desc(winners.createdAt))
    return NextResponse.json(all)
  } catch {
    return NextResponse.json({ error: "Failed to fetch winners" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!verifyAdminAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await request.json()
    const { competitionId, name, instagramHandle, imageUrl, prizeAmount, rank, title } = body

    if (!competitionId || !name || !instagramHandle || !rank) {
      return NextResponse.json({ error: "Missing required fields: competitionId, name, instagramHandle, rank" }, { status: 400 })
    }

    const inserted = await db.insert(winners).values({
      competitionId,
      name,
      instagramHandle,
      imageUrl: imageUrl || null,
      prizeAmount: prizeAmount || null,
      rank,
      title: title || null,
    }).returning()

    return NextResponse.json(inserted[0], { status: 201 })
  } catch {
    console.error("POST /api/admin/winners error")
    return NextResponse.json({ error: "Failed to create winner" }, { status: 500 })
  }
}
