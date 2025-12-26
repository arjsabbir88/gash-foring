"use client"

import { X } from "lucide-react"

interface Booking {
  _id: string
  eventName: string
  eventDate: string
  guestName: string
  mobileNumber: string
  locationFrom: string
  locationTo: string
  busSeats: number
  bookingMoney: number
  due: number
  status: string
  createdAt: string
}

interface Props {
  booking: Booking
  onClose: () => void
}

export default function ViewDetailsModal({ booking, onClose }: Props) {
  const details = [
    { label: "অতিথির নাম", value: booking.guestName },
    { label: "ইভেন্ট নাম", value: booking.eventName },
    { label: "ইভেন্ট তারিখ", value: new Date(booking.eventDate).toLocaleDateString("bn-BD") },
    { label: "মোবাইল নাম্বার", value: booking.mobileNumber },
    { label: "লোকেশন from", value: booking.locationFrom },
    { label: "লোকেশন to", value: booking.locationTo },
    { label: "বাস সিট", value: booking.busSeats },
    { label: "বুকিং মানি", value: `${booking.bookingMoney} টাকা` },
    { label: "বাকী (due)", value: `${booking.due} টাকা` },
    { label: "স্ট্যাটাস", value: booking.status },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#01573c] text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">বুকিং বিস্তারিত</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#08d494] rounded transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {details.map((item, index) => (
            <div key={index} className="border-b border-border pb-4 last:border-b-0">
              <p className="text-sm font-medium text-text-secondary mb-1">{item.label}</p>
              <p className="text-base font-semibold text-text-primary">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-cream px-6 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-[#01573c] hover:bg-primary-dark text-white rounded-lg transition-colors font-medium"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  )
}
