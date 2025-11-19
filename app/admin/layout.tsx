"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter, usePathname } from 'next/navigation'
import Link from "next/link"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') {
        router.push('/dashboard')
        return
      }

      setLoading(false)
    }
    checkAdmin()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Icons.spinner className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  const sidebarItems = [
    { icon: Icons.layoutDashboard, label: "Overview", href: "/admin" },
    { icon: Icons.users, label: "Users", href: "/admin/users" },
    { icon: Icons.calendar, label: "Events", href: "/admin/events" },
    { icon: Icons.fileText, label: "Applications", href: "/admin/applications" },
    { icon: Icons.settings, label: "Settings", href: "/admin/settings" },
  ]

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-black hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-white">
            MM <span className="text-red-600">ADMIN</span>
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 ${
                  pathname === item.href 
                    ? "bg-red-600 text-white hover:bg-red-700" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-500 hover:text-red-400 hover:bg-red-900/20"
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/login')
            }}
          >
            <Icons.logOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-white font-semibold capitalize">
            {pathname.split('/').pop() || 'Overview'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
