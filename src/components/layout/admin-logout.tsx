"use client"

export function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return (
    <button onClick={handleLogout} className="text-xs text-zinc-500 hover:text-red-400 transition-colors text-left w-full">
      Log out
    </button>
  )
}
