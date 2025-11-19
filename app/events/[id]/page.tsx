"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Image from "next/image"
import { format } from "date-fns"
import { useParams } from 'next/navigation'
import { CheckoutButton } from "@/components/checkout-button"

export default function EventDetailsPage() {
  const { id } = useParams()
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()
      
      setEvent(data)
      setLoading(false)
    }
    fetchEvent()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Icons.spinner className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  if (!event) return null

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      {/* Hero Banner */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={event.banner_image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
              {event.event_type}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Icons.calendar className="h-5 w-5 text-red-500" />
                {event.start_date ? format(new Date(event.start_date), "MMMM dd, yyyy") : "--"}
              </div>
              <div className="flex items-center gap-2">
                <Icons.clock className="h-5 w-5 text-red-500" />
                {event.start_date ? format(new Date(event.start_date), "h:mm a") : "--"}
              </div>
              <div className="flex items-center gap-2">
                <Icons.mapPin className="h-5 w-5 text-red-500" />
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">About the Event</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>

            {/* Gallery */}
            {event.gallery_images && event.gallery_images.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Event Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.gallery_images.map((img: string, i: number) => (
                    <div key={i} className="relative h-48 rounded-lg overflow-hidden">
                      <Image src={img || "/placeholder.svg"} alt={`Gallery ${i}`} fill className="object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Registration Details</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-gray-400">Registration Fee</span>
                  <span className="text-2xl font-bold text-white">
                    {event.registration_fee > 0 ? `₹${event.registration_fee}` : "Free"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Available Spots</span>
                  <span className="text-white font-mono">{event.max_participants || "Unlimited"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 font-bold uppercase text-sm">{event.status}</span>
                </div>
              </div>

              {event.registration_fee > 0 ? (
                <CheckoutButton 
                  eventId={event.id}
                  userId="current-user-id" // You'll need to get this from auth context
                  amount={event.registration_fee}
                  title={`Registration: ${event.title}`}
                />
              ) : (
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold mb-4">
                  Register for Free
                </Button>
              )}
              <p className="text-xs text-center text-gray-500">
                By registering, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
