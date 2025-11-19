"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    models: 0,
    events: 0,
    pending: 0
  })
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchStats = async () => {
      const { count: users } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
      const { count: models } = await supabase.from('model_profiles').select('*', { count: 'exact', head: true })
      const { count: events } = await supabase.from('events').select('*', { count: 'exact', head: true })
      const { count: pending } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('verified', false)

      setStats({
        users: users || 0,
        models: models || 0,
        events: events || 0,
        pending: pending || 0
      })
    }
    fetchStats()
  }, [])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.users}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Icons.users className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Models</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.models}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Icons.star className="h-6 w-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Events</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.events}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <Icons.calendar className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending Verification</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.pending}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Icons.alertCircle className="h-6 w-6 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <Icons.user className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">New user registration</p>
                    <p className="text-gray-500 text-xs">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-red-500 cursor-pointer transition-all text-center">
              <Icons.plus className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-white font-medium">Create Event</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-red-500 cursor-pointer transition-all text-center">
              <Icons.checkSquare className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-white font-medium">Verify Models</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-red-500 cursor-pointer transition-all text-center">
              <Icons.mail className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-white font-medium">Send Broadcast</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-red-500 cursor-pointer transition-all text-center">
              <Icons.fileText className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-white font-medium">Export Data</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
