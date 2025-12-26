"use client"

import { useState, useEffect } from "react"
import BookedPackagesTable from "./booked-packages-table"
import { Loader } from "lucide-react"
import Sidebar from "./sidebar"

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("https://gash-foring-server.vercel.app/api/bookings")
      if (!response.ok) {
        throw new Error("Failed to fetch bookings")
      }
      const data = await response.json()
      setBookings(data)
      setError("")
    } catch (err) {
      setError("বুকিং লোড করতে ব্যর্থ")
      console.error("Error fetching bookings:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    await fetchBookings()
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-cream">
      <Sidebar onRefresh={handleRefresh} />

      <main className="flex-1 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#01573c] mb-2">ড্যাশবোর্ড</h1>
            <p className="text-text-secondary">বুক করা প্যাকেজ পরিচালনা করুন</p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader className="animate-spin text-primary mx-auto mb-4" size={40} />
                <p className="text-text-secondary">লোড হচ্ছে...</p>
              </div>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>
          ) : (
            <BookedPackagesTable bookings={bookings} onBookingsChange={fetchBookings} />
          )}
        </div>
      </main>
    </div>
  )
}
