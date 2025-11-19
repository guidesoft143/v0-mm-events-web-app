"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import Image from "next/image"

export default function CertificatesPage() {
  const [verifyCode, setVerifyCode] = useState("")
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate verification for now as we don't have backend logic connected for public verification yet
    // In real app, this would call Supabase
    setTimeout(() => {
      if (verifyCode === "MM123456") {
        setVerificationResult({
          valid: true,
          holder: "Priya Sharma",
          course: "Advanced Modeling & Etiquette",
          date: "2024-11-15",
          id: "MM-CERT-2024-001"
        })
      } else {
        setVerificationResult({ valid: false })
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Verify <span className="text-red-600">Certificates</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Ensure the authenticity of MM Events certifications. Enter the unique certificate ID to verify credentials.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-red-900/20 flex items-center justify-center shrink-0">
                  <Icons.shieldCheck className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Tamper-Proof</h3>
                  <p className="text-gray-400">Digital signatures ensure certificates cannot be forged.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-red-900/20 flex items-center justify-center shrink-0">
                  <Icons.globe className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Global Recognition</h3>
                  <p className="text-gray-400">Accepted by top agencies and fashion houses worldwide.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Verification Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardContent className="p-8">
                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Certificate ID</label>
                    <Input 
                      placeholder="e.g. MM-CERT-2024-XXX" 
                      className="bg-black/50 border-white/10 text-white h-12"
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
                    disabled={loading}
                  >
                    {loading ? <Icons.spinner className="animate-spin" /> : "Verify Now"}
                  </Button>
                </form>

                {verificationResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-8 p-6 rounded-xl border ${
                      verificationResult.valid 
                        ? "bg-green-900/20 border-green-500/30" 
                        : "bg-red-900/20 border-red-500/30"
                    }`}
                  >
                    {verificationResult.valid ? (
                      <div className="text-center space-y-2">
                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icons.check className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Valid Certificate</h3>
                        <p className="text-gray-300">Issued to <span className="text-white font-bold">{verificationResult.holder}</span></p>
                        <p className="text-sm text-gray-400">{verificationResult.course}</p>
                        <p className="text-xs text-gray-500">Issued on {verificationResult.date}</p>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icons.x className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Invalid Certificate</h3>
                        <p className="text-gray-300">The certificate ID provided could not be found.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
