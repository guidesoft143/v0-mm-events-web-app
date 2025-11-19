"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers"
import { motion } from "framer-motion"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/indian-fashion-model-dark-red-luxury.jpg"
          alt="MM Events Model"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        
        {/* Animated Particles/Dust Effect (CSS only for performance) */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-6 px-6 py-2 border border-red-500/30 rounded-full bg-red-950/20 backdrop-blur-sm"
        >
          <span className="text-red-400 text-sm tracking-[0.2em] uppercase font-medium">
            {t.hero.subtitle}
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold mb-8 tracking-tight"
        >
          <span className="block text-white drop-shadow-2xl">UNLEASH THE</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-800 drop-shadow-2xl">
            POWER IN YOU
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-12 font-light leading-relaxed"
        >
          Discover the essence of Indian fashion with MM Events. We curate world-class fashion shows, 
          model management, and luxury lifestyle events.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-10 py-8 text-lg rounded-none border border-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all hover:shadow-[0_0_40px_rgba(220,38,38,0.7)]">
            {t.hero.cta}
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white px-10 py-8 text-lg rounded-none backdrop-blur-sm">
            {t.hero.explore}
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-red-500 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
