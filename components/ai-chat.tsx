"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  })

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-red-600 text-white shadow-lg flex items-center justify-center hover:bg-red-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Icons.x className="h-6 w-6" /> : <Icons.messageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px]"
          >
            <Card className="bg-black/90 border-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader className="bg-red-900/20 border-b border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
                    <Icons.bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-base">MM Assistant</CardTitle>
                    <p className="text-xs text-gray-400">Ask about events, modeling, or tips</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {messages.length === 0 && (
                      <div className="text-center text-gray-500 mt-8">
                        <p>👋 Hi! I'm your AI assistant.</p>
                        <p className="text-sm mt-2">Ask me about:</p>
                        <div className="flex flex-wrap gap-2 justify-center mt-4">
                          <span className="text-xs bg-white/5 px-2 py-1 rounded-full">Upcoming Events</span>
                          <span className="text-xs bg-white/5 px-2 py-1 rounded-full">Modeling Tips</span>
                          <span className="text-xs bg-white/5 px-2 py-1 rounded-full">Registration</span>
                        </div>
                      </div>
                    )}
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                            m.role === 'user'
                              ? 'bg-red-600 text-white'
                              : 'bg-white/10 text-gray-200'
                          }`}
                        >
                          {m.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Type a message..."
                      className="bg-white/5 border-white/10 text-white focus:ring-red-500"
                    />
                    <Button type="submit" size="icon" className="bg-red-600 hover:bg-red-700">
                      <Icons.send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
