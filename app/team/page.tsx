"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/icons"

const teamMembers = [
  {
    name: "Priya Sharma",
    role: "Founder & CEO",
    image: "/indian-business-woman.jpg",
    bio: "Visionary leader with 15+ years in the fashion industry."
  },
  {
    name: "Rahul Verma",
    role: "Creative Director",
    image: "/indian-creative-director.jpg",
    bio: "Award-winning stylist and creative mind behind our major shows."
  },
  {
    name: "Anita Desai",
    role: "Head of Talent",
    image: "/indian-talent-manager.jpg",
    bio: "Expert in spotting and grooming new talent across India."
  },
  {
    name: "Vikram Singh",
    role: "Event Operations",
    image: "/indian-event-manager.jpg",
    bio: "Ensures every event runs smoothly with military precision."
  }
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Meet The <span className="text-red-600">Team</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The creative minds and industry experts behind MM Events' success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 overflow-hidden group hover:border-red-600/50 transition-colors">
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>
                <CardContent className="p-6 relative -mt-20">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-red-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                  <div className="flex gap-4">
                    <Icons.instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                    <Icons.twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                    <Icons.linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
