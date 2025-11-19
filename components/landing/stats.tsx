"use client"

import { Star, Users, Calendar, Trophy } from 'lucide-react'
import { useLanguage } from "@/components/providers"
import { motion } from "framer-motion"

export function StatsSection() {
  const { t } = useLanguage()

  const stats = [
    { label: t.stats.events, value: "50+", icon: Star },
    { label: t.stats.models, value: "200+", icon: Users },
    { label: t.stats.clients, value: "100+", icon: Calendar },
    { label: t.stats.success, value: "98%", icon: Trophy },
  ]

  return (
    <section className="relative z-20 -mt-24 container mx-auto px-4 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-8 flex flex-col items-center text-center group hover:border-red-500/50 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="mb-4 p-4 rounded-full bg-red-900/20 border border-red-500/20 group-hover:bg-red-600/20 group-hover:border-red-500/50 transition-colors">
              <stat.icon className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-4xl font-serif font-bold text-white mb-2">{stat.value}</h3>
            <p className="text-gray-400 uppercase tracking-wider text-xs font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
