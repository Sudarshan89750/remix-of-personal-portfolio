import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getExpectedToken } from "@/lib/admin-auth"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) return NextResponse.next()
  if (pathname === "/admin/login" || pathname === "/api/admin/login") return NextResponse.next()

  const expected = getExpectedToken()
  if (!expected) {
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  const cookie = request.cookies.get("admin_token")?.value

  if (cookie !== expected) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
