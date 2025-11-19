"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, CheckCircle } from 'lucide-react'
import { motion } from "framer-motion"

export function TrainingTeaser() {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-900/20 border border-red-500/20 text-red-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              AI-Powered Training
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
              Master the Art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Modeling & Posing</span>
            </h2>
            
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Access our world-class training modules powered by AI. Learn ramp walk, 
              posing techniques, and facial expressions from the comfort of your home.
            </p>
            
            <ul className="space-y-4 mb-10">
              {['AI-Generated Posing Drills', 'Virtual Ramp Walk Simulator', 'Personalized Feedback', 'Certification on Completion'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-red-500" />
                  {item}
                </li>
              ))}
            </ul>
            
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-none px-8">
              Start Free Trial
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl group cursor-pointer">
              <Image
                src="/fashion-model-training-studio.jpg"
                alt="Training Video"
                width={1280}
                height={720}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                <div className="w-20 h-20 rounded-full bg-red-600/90 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-lg shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-bold">98% Match</p>
                  <p className="text-xs text-gray-400">Pose Accuracy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
