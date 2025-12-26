"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User } from "lucide-react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#01573c] text-white shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-9 sm:w-10 h-9 sm:h-10 border border-white bg-white bg-cream rounded-full flex items-center justify-center font-bold text-primary text-sm sm:text-base">
              <img src="https://i.postimg.cc/pV0FfBzb/592880908-1514462246444859-4978450885832853019-n-removebg-preview.png" alt="logo" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-lg font-bold text-cream">ঘাসফড়িং ট্যুর</h1>
              <p className="text-xs text-cream/80 leading-tight">অ্যান্ড ট্রাভেল</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-cream/80 transition-colors font-medium text-sm">
              হোম
            </Link>
            <Link href="/dashboard" className="hover:text-cream/80 transition-colors font-medium text-sm">
              ড্যাশবোর্ড
            </Link>
          </div>

          {/* Desktop Profile Icon */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-primary-dark rounded-full transition-colors">
              <User size={24} className="text-cream" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2 sm:gap-3">
            <button className="p-1.5 sm:p-2 hover:bg-primary-dark rounded-full">
              <User size={20} className="text-cream" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 hover:bg-primary-dark rounded-full"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-white/20">
            <Link
              href="/"
              className="block py-2 px-3 hover:bg-primary-dark rounded transition-colors text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              হোম
            </Link>
            <Link
              href="/dashboard"
              className="block py-2 px-3 hover:bg-primary-dark rounded transition-colors text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              ড্যাশবোর্ড
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
