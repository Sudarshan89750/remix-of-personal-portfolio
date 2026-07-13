import Link from "next/link"
import { Camera, LayoutDashboard, Trophy, Award, ArrowLeft } from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Competitions", href: "/admin/competitions", icon: Award },
  { label: "Winners", href: "/admin/winners", icon: Trophy },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      <aside className="w-56 border-r border-zinc-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-zinc-800">
          <Link href="/admin" className="flex items-center gap-2">
            <Camera className="size-5 text-red-400" />
            <span className="font-bold text-sm tracking-tight">PhotoGigs Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors"
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-zinc-800">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            <ArrowLeft className="size-3" />
            Back to site
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
