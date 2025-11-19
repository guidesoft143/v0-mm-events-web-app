"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const models = [
  { name: "Aarav Kumar", role: "Runway Model", image: "/indian-male-model-fashion.jpg" },
  { name: "Priya Singh", role: "Editorial", image: "/indian-female-model-fashion-saree.jpg" },
  { name: "Rohan Das", role: "Commercial", image: "/indian-male-model-suit.jpg" },
  { name: "Zara Khan", role: "High Fashion", image: "/indian-female-model-luxury.jpg" },
  { name: "Vikram Malhotra", role: "Fitness", image: "/indian-male-model-fitness.jpg" },
]

export function FeaturedModels() {
  return (
    <section className="py-24 bg-neutral-950 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-red-500 font-bold tracking-[0.2em] uppercase mb-2 text-sm">Our Talent</h2>
            <h3 className="font-serif text-4xl text-white">Featured Models</h3>
          </div>
          <Button variant="outline" className="hidden md:flex border-white/20 text-white hover:bg-white/10">
            View All Models
          </Button>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {models.map((model, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5"
                >
                  <Image
                    src={model.image || "/placeholder.svg"}
                    alt={model.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-xl font-serif font-bold text-white mb-1">{model.name}</h4>
                    <p className="text-red-400 text-sm uppercase tracking-wider">{model.role}</p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-transparent border-white/20 text-white hover:bg-white/10" />
            <CarouselNext className="static translate-y-0 bg-transparent border-white/20 text-white hover:bg-white/10" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
