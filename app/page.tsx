import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/landing/hero"
import { StatsSection } from "@/components/landing/stats"
import { AboutSection } from "@/components/landing/about"
import { FeaturedModels } from "@/components/landing/featured-models"
import { ServicesSection } from "@/components/landing/services"
import { TrainingTeaser } from "@/components/landing/training-teaser"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <FeaturedModels />
      <ServicesSection />
      <TrainingTeaser />
      <Footer />
    </main>
  )
}
