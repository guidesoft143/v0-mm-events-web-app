"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*, model_profiles(*)')
          .eq('id', user.id)
          .single()
        setProfile(data)
      }
      setLoading(false)
    }
    getProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Icons.spinner className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, <span className="text-red-600">{profile?.full_name}</span>
            </h1>
            <p className="text-gray-400 mt-1">
              Model ID: <span className="text-white font-mono">{profile?.model_profiles?.[0]?.model_no || 'Pending'}</span>
            </p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            Edit Profile
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Upcoming Events", value: "3", icon: Icons.calendar },
            { label: "Applications", value: "12", icon: Icons.fileText },
            { label: "Profile Views", value: "1.2k", icon: Icons.eye },
            { label: "Rating", value: "4.8", icon: Icons.star },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-red-600 opacity-80" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">Overview</TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-red-600">My Events</TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-red-600">Results & Certs</TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-red-600">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Events */}
              <Card className="lg:col-span-2 bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Upcoming Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="h-12 w-12 rounded-full bg-red-900/20 flex items-center justify-center text-red-500 font-bold">
                          {20 + i}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">Fashion Week Audition</h4>
                          <p className="text-sm text-gray-400">Hyderabad Convention Center • 10:00 AM</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10">
                          Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Profile Status */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Profile Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Completion</span>
                    <span className="text-green-400">85%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }} />
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Icons.check className="h-4 w-4 text-green-500" />
                      <span>Basic Info</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Icons.check className="h-4 w-4 text-green-500" />
                      <span>Portfolio Upload</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Icons.check className="h-4 w-4 text-green-500" />
                      <span>Measurements</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="h-4 w-4 rounded-full border border-gray-500" />
                      <span>Video Intro</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Exam Results & Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-yellow-500/20 flex items-center justify-center">
                        <Icons.trophy className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Advanced Modeling Course</h4>
                        <p className="text-sm text-gray-400">Completed on Nov 15, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                      Download Cert
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
