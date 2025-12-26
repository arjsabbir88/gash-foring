"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface Booking {
  _id: string
  status: string
}

interface Props {
  booking: Booking
  onClose: () => void
  onSuccess: () => void
}

export default function StatusModal({ booking, onClose, onSuccess }: Props) {
  const [status, setStatus] = useState(booking.status)
  const [isLoading, setIsLoading] = useState(false)

  const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`https://gash-foring-server.vercel.app/api/bookings/${booking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Update failed")
      }

      onSuccess()
    } catch (error) {
      alert("স্ট্যাটাস আপডেট ব্যর্থ হয়েছে")
      console.error("Update error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-300 rounded-lg shadow-lg max-w-sm w-full">
        {/* Header */}
        <div className="bg-[#01573c] text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">স্ট্যাটাস পরিবর্তন করুন</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#03d391] rounded transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#01573c] mb-3">নতুন স্ট্যাটাস নির্বাচন করুন</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01573c]"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-text-primary border border-border rounded-lg hover:bg-cream transition-colors"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-[#01573c] hover:bg-[#05c085] hover:text-black disabled:bg-primary/50 text-white rounded-lg transition-colors"
            >
              {isLoading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
