"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ExamsPage() {
  const [exams, setExams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchExams = async () => {
      const { data } = await supabase
        .from('exams')
        .select('*')
        .eq('status', 'upcoming')
        .order('exam_date', { ascending: true })
      
      if (data) setExams(data)
      setLoading(false)
    }
    fetchExams()
  }, [])

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Certification <span className="text-red-600">Exams</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Validate your skills and get certified by MM Events. Join the elite league of professional models.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Icons.spinner className="h-10 w-10 animate-spin text-red-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exams.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-red-600/50 transition-all h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-red-600 hover:bg-red-700">Certification</Badge>
                      <span className="text-sm text-gray-400">{exam.duration_minutes} mins</span>
                    </div>
                    <CardTitle className="text-xl text-white">{exam.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4 mb-6">
                      <p className="text-gray-400 text-sm line-clamp-3">
                        {exam.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Icons.calendar className="h-4 w-4 text-red-500" />
                        <span>{new Date(exam.exam_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Icons.checkCircle className="h-4 w-4 text-red-500" />
                        <span>Passing Score: {exam.passing_marks}/{exam.total_marks}</span>
                      </div>
                    </div>
                    
                    <Link href={`/exams/${exam.id}`}>
                      <Button className="w-full bg-white/10 hover:bg-red-600 text-white border border-white/10 hover:border-red-600 transition-all">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
