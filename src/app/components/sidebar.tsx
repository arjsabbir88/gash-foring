"use client"

import { RefreshCw } from "lucide-react"

interface SidebarProps {
  onRefresh: () => void
}

export default function Sidebar({ onRefresh }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#01573c] text-white p-6 hidden sm:block">
      <div className="mb-8 border-b pb-3">
        <div className="w-12 h-12 bg-white  rounded-full flex items-center justify-center font-bold text-primary text-lg mb-3">
          <img src="https://i.postimg.cc/pV0FfBzb/592880908-1514462246444859-4978450885832853019-n-removebg-preview.png" alt="logo" />
        </div>
        <h2 className="text-xl font-bold">ঘাসফড়িং ট্যুর</h2>
        <p className="text-sm text-cream/80">ড্যাশবোর্ড</p>
      </div>

      <nav className="space-y-4">
        <button className="w-full text-left px-4 py-3 bg-primary-dark rounded-lg hover:bg-primary-light transition-colors font-medium">
          বুক করা প্যাকেজ
        </button>
      </nav>

      <button
        onClick={onRefresh}
        className="w-full mt-8 px-4 py-3 bg-cream/20 hover:bg-cream/30 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
      >
        <RefreshCw size={18} />
        রিফ্রেশ করুন
      </button>
    </aside>
  )
}
