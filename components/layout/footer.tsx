"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-red-600 flex items-center justify-center text-white font-serif font-bold text-xl rounded-sm">
                MM
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-widest text-lg leading-none">EVENTS</span>
                <span className="text-red-500 text-[10px] tracking-[0.2em] uppercase">Fashions</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              India's premier fashion and modeling platform. We discover, train, and manage the next generation of supermodels.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Models', 'Upcoming Events', 'Training Academy', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-4">
              {['Model Management', 'Portfolio Shoots', 'Fashion Shows', 'Casting Calls', 'Brand Endorsements'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                <span className="text-gray-400">123 Fashion Avenue, Jubilee Hills, Hyderabad, Telangana 500033</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-gray-400">info@mmevents.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 MM Events. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
