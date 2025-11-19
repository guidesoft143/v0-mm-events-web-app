"use client"

import { Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/providers"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="glass-card hover:bg-red-900/20 text-white">
          <Globe className="size-5" />
          <span className="sr-only">Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-panel border-white/10 bg-black/90 text-white">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className="focus:bg-red-900/50 focus:text-white cursor-pointer"
        >
          English {language === 'en' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('te')}
          className="focus:bg-red-900/50 focus:text-white cursor-pointer font-serif"
        >
          తెలుగు (Telugu) {language === 'te' && '✓'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
