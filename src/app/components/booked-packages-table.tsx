"use client"

import { useState } from "react"
import { Eye, Edit2, Trash2, AlertCircle } from "lucide-react"
import ViewDetailsModal from "./view-details-modal"
import StatusModal from "./status-modal"

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
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled"
  createdAt: string
}

interface Props {
  bookings: Booking[]
  onBookingsChange: () => void
}

export default function BookedPackagesTable({ bookings, onBookingsChange }: Props) {
  const [viewModal, setViewModal] = useState<Booking | null>(null)
  const [statusModal, setStatusModal] = useState<Booking | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)


  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true)
      const response = await fetch(`https://gash-foring-server.vercel.app/api/bookings/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Delete failed")
      }

      setDeleteId(null)
      onBookingsChange()
    } catch (error) {
      alert("বুকিং মুছতে ব্যর্থ হয়েছে")
      console.error("Delete error:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#01573c] text-white">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">অতিথির নাম</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold hidden sm:table-cell">
                  ইভেন্ট নাম
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold hidden md:table-cell">
                  তারিখ
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold hidden lg:table-cell">
                  স্থান
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">স্ট্যাটাস</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">কর্ম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 sm:px-6 py-6 sm:py-8 text-center text-text-secondary text-sm">
                    কোন বুকিং নেই
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-cream/50 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-text-primary">
                      {booking.guestName}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-text-secondary hidden sm:table-cell">
                      {booking.eventName}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-text-secondary hidden md:table-cell">
                      {new Date(booking.eventDate).toLocaleDateString("bn-BD")}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-text-secondary hidden lg:table-cell">
                      {booking.locationFrom} → {booking.locationTo}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex gap-1 sm:gap-2">
                        <button
                          onClick={() => setViewModal(booking)}
                          className="p-1.5 sm:p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                          title="বিস্তারিত দেখুন"
                        >
                          <Eye size={16} className="sm:w-4.5 sm:h-4.5" />
                        </button>
                        <button
                          onClick={() => setStatusModal(booking)}
                          className="p-1.5 sm:p-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 rounded-lg transition-colors"
                          title="স্ট্যাটাস পরিবর্তন করুন"
                        >
                          <Edit2 size={16} className="sm:w-4.5 sm:h-4.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(booking._id)}
                          className="p-1.5 sm:p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 size={16} className="sm:w-4.5 sm:h-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {viewModal && <ViewDetailsModal booking={viewModal} onClose={() => setViewModal(null)} />}

      {/* Status Update Modal */}
      {statusModal && (
        <StatusModal
          booking={statusModal}
          onClose={() => setStatusModal(null)}
          onSuccess={() => {
            setStatusModal(null)
            onBookingsChange()
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-4 sm:p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-text-primary">নিশ্চিত করুন</h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  এই বুকিং মুছে ফেলতে চান? এই পদক্ষেপ বাতিল করা যাবে না।
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-text-primary border border-border rounded-lg hover:bg-cream transition-colors"
              >
                বাতিল
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={isDeleting}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors"
              >
                {isDeleting ? "মুছছি..." : "মুছুন"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
