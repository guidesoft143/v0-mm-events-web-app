"use client"

import { Camera, Video, Shirt, GraduationCap, Users, Sparkles } from 'lucide-react'
import { motion } from "framer-motion"

const services = [
  {
    icon: Camera,
    title: "Portfolio Shoots",
    description: "Professional photoshoots with top photographers and stylists to build your book."
  },
  {
    icon: Users,
    title: "Casting Management",
    description: "Connect with top production houses and brands for casting opportunities."
  },
  {
    icon: GraduationCap,
    title: "Model Training",
    description: "Comprehensive training in ramp walk, posing, and grooming by industry experts."
  },
  {
    icon: Shirt,
    title: "Fashion Rental",
    description: "Access designer wear and accessories for your shoots and events."
  },
  {
    icon: Video,
    title: "Video Intros",
    description: "High-quality video introductions and showreels for your profile."
  },
  {
    icon: Sparkles,
    title: "Event Management",
    description: "Full-service fashion show and event organization and management."
  }
]

export function ServicesSection() {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-red-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm">Our Services</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">Comprehensive Modeling Ecosystem</h3>
          <p className="text-gray-400">
            Everything you need to succeed in the fashion industry, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 group hover:bg-white/10 border border-white/5 hover:border-red-500/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-neutral-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">{service.title}</h4>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
