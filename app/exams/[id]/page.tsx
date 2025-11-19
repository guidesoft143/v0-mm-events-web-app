"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useParams, useRouter } from 'next/navigation'

export default function ExamDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [exam, setExam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchExam = async () => {
      const { data } = await supabase
        .from('exams')
        .select('*')
        .eq('id', id)
        .single()
      
      setExam(data)
      setLoading(false)
    }
    fetchExam()
  }, [id])

  const handleRegister = async () => {
    setRegistering(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    // Create exam result entry as registration
    const { error } = await supabase
      .from('exam_results')
      .insert({
        exam_id: id,
        user_id: user.id,
        status: 'pending'
      })

    if (error) {
      alert('Already registered or error occurred')
    } else {
      alert('Successfully registered for exam!')
      router.push('/dashboard')
    }
    setRegistering(false)
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 flex items-center justify-center">
      <div className="max-w-3xl w-full px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-red-900" />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{exam.title}</h1>
            <p className="text-gray-400">{exam.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-4 bg-black/30 rounded-xl">
              <Icons.calendar className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 uppercase">Date</p>
              <p className="text-white font-bold">{new Date(exam.exam_date).toLocaleDateString()}</p>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-xl">
              <Icons.clock className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 uppercase">Duration</p>
              <p className="text-white font-bold">{exam.duration_minutes} mins</p>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-xl">
              <Icons.fileText className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 uppercase">Total Marks</p>
              <p className="text-white font-bold">{exam.total_marks}</p>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-xl">
              <Icons.checkCircle className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 uppercase">Passing</p>
              <p className="text-white font-bold">{exam.passing_marks}</p>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleRegister}
              disabled={registering}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold shadow-lg shadow-red-900/20"
            >
              {registering ? (
                <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Register for Exam"
              )}
            </Button>
            <p className="text-center text-xs text-gray-500">
              Registration closes 24 hours before the exam date.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
