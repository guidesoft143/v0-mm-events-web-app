"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import Image from "next/image"
import Link from "next/link"

export default function ModelsPage() {
  const [models, setModels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    gender: "all",
    experience: "all",
    location: "all"
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchModels()
  }, [filters, search])

  const fetchModels = async () => {
    setLoading(true)
    let query = supabase
      .from('model_profiles')
      .select(`
        *,
        profiles!inner (
          full_name,
          avatar_url,
          location
        )
      `)

    if (search) {
      query = query.ilike('profiles.full_name', `%${search}%`)
    }

    if (filters.experience !== 'all') {
      query = query.eq('experience_level', filters.experience)
    }

    // Note: Gender is not in the schema explicitly, assuming it might be in profiles or inferred. 
    // For now, we'll skip gender filter in query or add it if schema supports it.
    
    const { data, error } = await query

    if (data) {
      setModels(data)
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
            Our <span className="text-red-600">Models</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover India's finest talent. From fresh faces to professional supermodels.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Icons.search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by name..." 
                className="pl-10 bg-black/50 border-white/10 text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select onValueChange={(v) => setFilters({...filters, gender: v})}>
              <SelectTrigger className="bg-black/50 border-white/10 text-white">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(v) => setFilters({...filters, experience: v})}>
              <SelectTrigger className="bg-black/50 border-white/10 text-white">
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(v) => setFilters({...filters, location: v})}>
              <SelectTrigger className="bg-black/50 border-white/10 text-white">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Icons.spinner className="h-10 w-10 animate-spin text-red-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/models/${model.id}`}>
                  <Card className="bg-white/5 border-white/10 overflow-hidden group hover:border-red-600/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-[400px] w-full overflow-hidden">
                      <Image
                        src={model.profiles?.avatar_url || "/placeholder.svg"}
                        alt={model.profiles?.full_name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      
                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{model.profiles?.full_name}</h3>
                            <p className="text-red-500 text-sm font-medium">{model.experience_level}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">Model ID</p>
                            <p className="text-white font-mono font-bold">{model.model_no}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 grid grid-cols-3 gap-2 text-center text-sm border-t border-white/5">
                      <div>
                        <p className="text-gray-500 text-xs">Height</p>
                        <p className="text-white">{model.height}cm</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Waist</p>
                        <p className="text-white">{model.waist}"</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Shoes</p>
                        <p className="text-white">{model.shoe_size}</p>
                      </div>
                    </CardContent>
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
