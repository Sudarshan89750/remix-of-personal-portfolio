import { NextResponse } from "next/server"
import { db } from "@/db"
import { competitions } from "@/db/schema"
import { desc } from "drizzle-orm"
import { verifyAdminAuth } from "@/lib/admin-auth"

export async function GET(request: Request) {
  if (!verifyAdminAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const all = await db.select().from(competitions).orderBy(desc(competitions.id))
    return NextResponse.json(all)
  } catch {
    return NextResponse.json({ error: "Failed to fetch competitions" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!verifyAdminAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await request.json()
    const { title, subtitle, slug, season, description, status, prizeInr, entryFeeInr, deadline, hashtag, featured, heroPosterUrl, upiId, prizeDescription, platforms, scoring, steps } = body

    if (!title || !slug || !season || !description || !status || !prizeInr || !entryFeeInr || !deadline || !hashtag) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const inserted = await db.insert(competitions).values({
      title, subtitle, slug, season, description, status,
      prizeINR: prizeInr, entryFeeINR: entryFeeInr, deadline: new Date(deadline),
      hashtag, featured: featured ?? false,
      heroPosterUrl: heroPosterUrl || null,
      upiId: upiId || null,
      prizeDescription: prizeDescription || null,
      platforms: JSON.stringify(platforms),
      scoring: JSON.stringify(scoring),
      steps: JSON.stringify(steps),
    }).returning()

    return NextResponse.json(inserted[0], { status: 201 })
  } catch {
    console.error("POST /api/admin/competitions error")
    return NextResponse.json({ error: "Failed to create competition" }, { status: 500 })
  }
}
