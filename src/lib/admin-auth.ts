import crypto from "crypto"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const SALT = process.env.ADMIN_SALT || "photogigs-salt"

export function hashToken(val: string): string {
  return crypto.createHash("sha256").update(val + SALT).digest("hex")
}

export function getExpectedToken(): string | null {
  if (!ADMIN_PASSWORD) return null
  return hashToken(ADMIN_PASSWORD)
}

export function verifyAdminAuth(request: Request): boolean {
  const expected = getExpectedToken()
  if (!expected) return false

  const cookieHeader = request.headers.get("cookie") || ""
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map(c => {
      const [k, ...v] = c.trim().split("=")
      return [k, v.join("=")]
    })
  )

  return cookies["admin_token"] === expected
}
