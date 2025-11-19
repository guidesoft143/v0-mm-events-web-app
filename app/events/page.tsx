"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("upcoming")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchEvents()
  }, [filter])

  const fetchEvents = async () => {
    setLoading(true)
    let query = supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true })

    if (filter === 'upcoming') {
      query = query.gte('start_date', new Date().toISOString())
    } else if (filter === 'past') {
      query = query.lt('start_date', new Date().toISOString())
    }

    const { data, error } = await query

    if (data) {
      setEvents(data)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Upcoming <span className="text-red-600">Shows</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the glamour. Join the most prestigious fashion events in India.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 p-1 rounded-full border border-white/10 inline-flex">
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "upcoming" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setFilter("past")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "past" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Icons.spinner className="h-10 w-10 animate-spin text-red-600" />
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/events/${event.id}`}>
                  <Card className="bg-white/5 border-white/10 overflow-hidden group hover:border-red-600/50 transition-all">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                        <Image
                          src={event.banner_image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
                          {event.event_type}
                        </div>
                      </div>
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                                {event.title}
                              </h3>
                              <p className="text-gray-400 flex items-center gap-2">
                                <Icons.mapPin className="h-4 w-4" />
                                {event.location}
                              </p>
                            </div>
                            <div className="text-center bg-white/5 p-3 rounded-lg border border-white/10 min-w-[80px]">
                              <p className="text-red-500 font-bold text-xl">
                                {event.start_date ? format(new Date(event.start_date), "dd") : "--"}
                              </p>
                              <p className="text-gray-400 text-xs uppercase">
                                {event.start_date ? format(new Date(event.start_date), "MMM") : "--"}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-300 line-clamp-2 mb-6">
                            {event.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                              <Icons.users className="h-4 w-4" />
                              {event.max_participants || "Unlimited"} Spots
                            </span>
                            <span className="flex items-center gap-2">
                              <Icons.clock className="h-4 w-4" />
                              {event.start_date ? format(new Date(event.start_date), "h:mm a") : "--"}
                            </span>
                          </div>
                          <Button className="bg-white/10 hover:bg-red-600 text-white border border-white/10 hover:border-red-600 transition-all">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
