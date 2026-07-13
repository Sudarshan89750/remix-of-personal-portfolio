import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { verifyAdminAuth } from "@/lib/admin-auth"

export async function POST(request: Request) {
  if (!verifyAdminAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = path.extname(file.name) || ".jpg"
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    const filepath = path.join(uploadDir, filename)

    await mkdir(uploadDir, { recursive: true })
    await writeFile(filepath, buffer)

    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
