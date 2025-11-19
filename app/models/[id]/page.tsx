"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Image from "next/image"
import { useParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ModelDetailsPage() {
  const { id } = useParams()
  const [model, setModel] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchModel = async () => {
      const { data } = await supabase
        .from('model_profiles')
        .select(`
          *,
          profiles!inner (
            full_name,
            avatar_url,
            bio,
            location,
            languages,
            verified
          )
        `)
        .eq('id', id)
        .single()
      
      setModel(data)
      setLoading(false)
    }
    fetchModel()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Icons.spinner className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  if (!model) return null

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Sidebar - Profile Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={model.profiles?.avatar_url || "/placeholder.svg"}
                alt={model.profiles?.full_name}
                fill
                className="object-cover"
              />
              {model.profiles?.verified && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                  <Icons.check className="h-4 w-4" />
                </div>
              )}
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white">{model.profiles?.full_name}</h1>
                  <p className="text-red-500 font-medium">{model.experience_level} Model</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Model ID</p>
                  <p className="text-white font-mono font-bold text-lg">{model.model_no}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-gray-300">
                  <Icons.mapPin className="h-5 w-5 text-red-600" />
                  <span>{model.profiles?.location || "Location not set"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Icons.globe className="h-5 w-5 text-red-600" />
                  <span>{model.profiles?.languages?.join(", ") || "English"}</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10">
                  Contact
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Height", value: `${model.height}cm` },
                { label: "Bust", value: `${model.bust}"` },
                { label: "Waist", value: `${model.waist}"` },
                { label: "Hips", value: `${model.hips}"` },
                { label: "Shoes", value: model.shoe_size },
                { label: "Eyes", value: model.eye_color },
                { label: "Hair", value: model.hair_color },
                { label: "Skin", value: model.skin_tone },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</p>
                  <p className="text-white font-bold text-lg mt-1">{stat.value || "--"}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="portfolio" className="w-full">
              <TabsList className="bg-white/5 border border-white/10 p-1 w-full justify-start">
                <TabsTrigger value="portfolio" className="data-[state=active]:bg-red-600">Portfolio</TabsTrigger>
                <TabsTrigger value="about" className="data-[state=active]:bg-red-600">About</TabsTrigger>
                <TabsTrigger value="videos" className="data-[state=active]:bg-red-600">Videos</TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {model.portfolio_images?.map((img: string, i: number) => (
                    <div key={i} className="relative h-64 rounded-lg overflow-hidden group">
                      <Image 
                        src={img || "/placeholder.svg"} 
                        alt={`Portfolio ${i}`} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Icons.maximize className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )) || (
                    <div className="col-span-full text-center py-12 text-gray-500">
                      No portfolio images uploaded yet.
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="about" className="mt-6">
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">Biography</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {model.profiles?.bio || "No biography available."}
                  </p>
                  
                  <h3 className="text-xl font-bold text-white mt-8 mb-4">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {model.specializations?.map((spec: string, i: number) => (
                      <span key={i} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="videos" className="mt-6">
                {model.video_intro_url ? (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
                    <video 
                      src={model.video_intro_url} 
                      controls 
                      className="w-full h-full object-cover"
                      poster={model.profiles?.avatar_url}
                    />
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 bg-white/5 rounded-2xl border border-white/10">
                    No video introduction available.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
