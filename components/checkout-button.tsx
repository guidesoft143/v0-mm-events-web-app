"use client"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutButtonProps {
  eventId: string
  userId: string
  amount: number
  title: string
}

export function CheckoutButton({ eventId, userId, amount, title }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          userId,
          amount,
          title,
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) console.error("Stripe error:", error)
      }
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={loading}
      className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold"
    >
      {loading ? (
        <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        `Register & Pay ₹${amount}`
      )}
    </Button>
  )
}
