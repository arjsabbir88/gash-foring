"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "স্বর্গীয় পর্যটন অভিজ্ঞতা",
      description: "বাংলাদেশের সবচেয়ে সুন্দর দর্শনীয় স্থানগুলি আবিষ্কার করুন",
      image: "https://i.postimg.cc/1XYs8X8c/604932561-122140965482412781-8667983748640686269-n.jpg",
    },
    {
      id: 2,
      title: "অবিস্মরণীয় ভ্রমণ যাত্রা",
      description: "আমাদের পেশাদার গাইডদের সাথে নিরাপদ এবং আরামদায়ক ভ্রমণ",
      image: "https://i.postimg.cc/HnPdrnJY/young-cheerful-travelers-with-backpacks-smiling-walking-canyon.jpg",
    },
    {
      id: 3,
      title: "সাশ্রয়ী মূল্যে বিলাসবহুল ভ্রমণ",
      description: "আপনার বাজেটের মধ্যে সেরা ট্যুর প্যাকেজ পান",
      image: "https://i.postimg.cc/DfC2jjx4/young-travelers-with-backpacks-smiling-giving-highfive-walking-canyon.jpg",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative w-full h-screen max-h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${slide.image}')`,
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 text-pretty leading-tight">
                {slide.title}
              </h2>
              <p className="text-sm text-[#14ffb4] sm:text-base md:text-lg lg:text-xl text-cream mb-6 sm:mb-8 max-w-2xl text-balance px-2">
                {slide.description}
              </p>
              <Link
                href="/booking"
                className="inline-block bg-[#01573c] hover:bg-[#0bd696] text-white hover:text-black font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-colors duration-300 text-sm sm:text-base md:text-lg"
              >
                এখনই বুক করুন
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-2 sm:p-3 rounded-full transition-colors duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="sm:w-7 sm:h-7" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-2 sm:p-3 rounded-full transition-colors duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="sm:w-7 sm:h-7" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-6 sm:w-8" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
