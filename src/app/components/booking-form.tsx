"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, CheckCircle, Loader } from "lucide-react"

export default function BookingForm() {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    guestName: "",
    mobileNumber: "",
    locationFrom: "",
    locationTo: "",
    busSeats: "",
    bookingMoney: "",
    due: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage("")
    setErrorMessage("")



    try {
      const response = await fetch("https://gash-foring-server.vercel.app/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          eventDate: new Date(formData.eventDate).toISOString(),
          bookingMoney: Number.parseFloat(formData.bookingMoney),
          due: Number.parseFloat(formData.due || "0"),
        }),
      })

      if (!response.ok) {
        throw new Error("Booking failed")
      }

      setSuccessMessage("আপনার বুকিং সফলভাবে সম্পন্ন হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।")

      setFormData({
        eventName: "",
        eventDate: "",
        guestName: "",
        mobileNumber: "",
        locationFrom: "",
        locationTo: "",
        busSeats: "",
        bookingMoney: "",
        due: "",
      })

      setTimeout(() => setSuccessMessage(""), 5000)
    } catch (error) {
      setErrorMessage("বুকিং ব্যর্থ হয়েছে। আবার চেষ্টা করুন।")
      console.error("Booking error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-cream py-8 sm:py-12 px-3 sm:px-4 md:px-8">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#01573c] mb-3 sm:mb-4 text-pretty">
            আপনার ভ্রমণ বুক করুন
          </h1>
          <p className="text-base sm:text-lg text-text-secondary">ঘাসফড়িং ট্যুর অ্যান্ড ট্রাভেল</p>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={20} />
            <p className="text-sm sm:text-base text-green-700">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
            <p className="text-sm sm:text-base text-red-700">{errorMessage}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* ইভেন্ট নাম */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-text-primary mb-2">ইভেন্ট নাম</label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="যেমন: পরিবার ভ্রমণ"
              />
            </div>

            {/* ইভেন্ট তারিখ */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-text-primary mb-2">ইভেন্ট তারিখ</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* গেস্টের নাম */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-text-primary mb-2">গেস্টের নাম</label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="আপনার নাম"
              />
            </div>

            {/* মোবাইল নাম্বার */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-text-primary mb-2">মোবাইল নাম্বার</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="01XXXXXXXXX"
              />
            </div>

            {/* লোকেশন from */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-text-primary mb-2">লোকেশন from</label>
              <input
                type="text"
                name="locationFrom"
                value={formData.locationFrom}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="যেমন: ঢাকা"
              />
            </div>

            {/* লোকেশন to */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-text-primary mb-2">লোকেশন to</label>
              <input
                type="text"
                name="locationTo"
                value={formData.locationTo}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="যেমন: সিলেট"
              />
            </div>

            {/* সিট নাম্বার */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-text-primary mb-2">বাস সিট নাম্বার</label>
              <input
                type="text"
                name="busSeats"
                value={formData.busSeats}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="যেমন: 25"
              />
            </div>

            {/* বুকিং মানি */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-text-primary mb-2">বুকিং মানি (টাকা)</label>
              <input
                type="number"
                name="bookingMoney"
                value={formData.bookingMoney}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="যেমন: 5000"
              />
            </div>

            {/* বাকী (due) */}
            <div className="md:col-span-2 md:w-1/2">
              <label className="block text-xs sm:text-sm font-medium text-text-primary mb-2">বাকী (due) টাকা</label>
              <input
                type="number"
                name="due"
                value={formData.due}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="যেমন: 2000 (ঐচ্ছিক)"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 sm:mt-8 bg-[#01573c] hover:cursor-pointer hover:bg-[#0ada98] hover:text-black disabled:bg-primary/50 text-white font-bold py-2.5 sm:py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin" />
                প্রক্রিয়াকরণ...
              </>
            ) : (
              "বুকিং সম্পূর্ণ করুন"
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
