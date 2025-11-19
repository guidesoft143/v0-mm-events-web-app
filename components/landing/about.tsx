"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-900/5 blur-[100px]" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-red-600/20 blur-xl rounded-full opacity-50" />
            <div className="relative aspect-[3/4] border border-white/10 bg-white/5 p-2 group">
              <Image
                src="/indian-fashion-model-saree-elegant.jpg"
                alt="About MM Events"
                width={600}
                height={800}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/80 backdrop-blur-md border border-white/10">
                <p className="text-red-500 font-serif italic text-xl">"Elegance is the only beauty that never fades."</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-red-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm">About MM Events</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
              Redefining <span className="italic text-gray-500">Indian Fashion</span> & Modeling Standards
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed text-lg font-light">
              MM Events is a premier platform dedicated to showcasing the vibrant talent of India. 
              We bridge the gap between aspiring models and the global fashion industry through 
              meticulously curated events and professional management.
            </p>
            <p className="text-gray-400 mb-10 leading-relaxed text-lg font-light">
              Our mission is to empower talent through comprehensive training, exposure, and 
              opportunities that celebrate the diversity and elegance of Indian culture.
            </p>
            
            <div className="flex gap-6">
              <Button variant="link" className="text-white hover:text-red-500 p-0 text-lg group">
                Read Our Story <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
