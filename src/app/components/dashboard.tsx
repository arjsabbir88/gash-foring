"use client"

import { useState, useEffect } from "react"
import BookedPackagesTable from "./booked-packages-table"
import { Loader, Download } from "lucide-react"
import Sidebar from "./sidebar"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function Dashboard({ bookingsData }: { bookingsData: any[] }) {
  const [bookings, setBookings] = useState(bookingsData)
  const [isLoading, setIsLoading] = useState(false)

  const fetchBookings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("https://gash-foring-server.vercel.app/api/bookings")
      if (!response.ok) {
        throw new Error("Failed to fetch bookings")
      }
      const data = await response.json()
      setBookings(data)
    } catch (err) {
      console.error("Error fetching bookings:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true)
      const doc = new jsPDF()

      // Load Bangla Font
      const fontUrl = "/fonts/SolaimanLipi.ttf"
      const fontResponse = await fetch(fontUrl)
      const fontBlob = await fontResponse.blob()

      const base64Font = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const result = reader.result as string
          resolve(result.split(",")[1])
        }
        reader.readAsDataURL(fontBlob)
      })

      doc.addFileToVFS("SolaimanLipi.ttf", base64Font)
      doc.addFont("SolaimanLipi.ttf", "SolaimanLipi", "normal")
      doc.setFont("SolaimanLipi")

      // Add Header
      doc.setFontSize(22)
      doc.setTextColor(1, 87, 60)
      doc.text("Gash Foring", 105, 20, { align: "center" })

      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.text("Booking Report", 105, 28, { align: "center" })

      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(`Date: ${new Date().toLocaleDateString("en-US")}`, 105, 35, { align: "center" })

      // Draw a line
      doc.setDrawColor(1, 87, 60)
      doc.setLineWidth(0.5)
      doc.line(20, 38, 190, 38)

      let yPosition = 45
      const pageHeight = 280
      const cardHeight = 50

      bookings.forEach((booking: any, index: number) => {
        // Check if we need a new page
        if (yPosition + cardHeight > pageHeight) {
          doc.addPage()
          yPosition = 20
        }

        // Card background
        doc.setFillColor(245, 245, 245)
        doc.rect(15, yPosition, 180, cardHeight, "F")

        // Card border
        doc.setDrawColor(1, 87, 60)
        doc.setLineWidth(0.3)
        doc.rect(15, yPosition, 180, cardHeight, "S")

        // Customer number
        doc.setFontSize(10)
        doc.setTextColor(1, 87, 60)
        doc.text(`#${index + 1}`, 18, yPosition + 6)

        // Left column
        doc.setFontSize(9)
        doc.setTextColor(0, 0, 0)

        doc.text(`Name: ${booking.guestName}`, 18, yPosition + 12)
        doc.text(`Event: ${booking.eventName}`, 18, yPosition + 18)
        doc.text(`Phone: ${booking.mobileNumber}`, 18, yPosition + 24)
        doc.text(`Date: ${new Date(booking.eventDate).toLocaleDateString("en-US")}`, 18, yPosition + 30)

        // Right column
        doc.text(`From: ${booking.locationFrom}`, 110, yPosition + 12)
        doc.text(`To: ${booking.locationTo}`, 110, yPosition + 18)
        doc.text(`Seats: ${booking.busSeats}`, 110, yPosition + 24)
        doc.text(`Booking Money: ${booking.bookingMoney} Tk`, 110, yPosition + 30)

        // Bottom row
        doc.text(`Due: ${booking.due} Tk`, 18, yPosition + 36)

        // Status badge
        const statusText = booking.status === "Confirmed" ? "Confirmed" :
          booking.status === "Pending" ? "Pending" :
            booking.status === "Completed" ? "Completed" : "Cancelled"

        const statusColor = booking.status === "Confirmed" ? [34, 197, 94] :
          booking.status === "Pending" ? [234, 179, 8] :
            booking.status === "Completed" ? [59, 130, 246] : [239, 68, 68]

        doc.setFillColor(statusColor[0], statusColor[1], statusColor[2])
        doc.roundedRect(110, yPosition + 33, 30, 6, 2, 2, "F")
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(8)
        doc.text(statusText, 125, yPosition + 37, { align: "center" })

        yPosition += cardHeight + 5
      })

      // Footer
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      const totalPages = doc.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i)
        doc.text(`Page ${i} of ${totalPages}`, 105, 290, { align: "center" })
      }

      doc.save(`gash-foring-bookings-${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error("PDF generation failed:", error)
      alert("পিডিএফ ডাউনলোড করতে একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-cream">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-8">

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#01573c] mb-2">ড্যাশবোর্ড</h1>
              <p className="text-text-secondary">বুক করা প্যাকেজ পরিচালনা করুন</p>
            </div>

            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-[#01573c] hover:bg-[#01402c] disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors shadow-md"
            >
              {isDownloading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>তৈরি হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Download size={20} />
                  <span>পিডিএফ ডাউনলোড</span>
                </>
              )}
            </button>
          </div>

          {/* Loading State */}
          <BookedPackagesTable bookings={bookings} onBookingsChange={fetchBookings} />
        </div>
      </main>
    </div>
  )
}
