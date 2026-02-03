import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ঘাসফড়িং ট্যুর অ্যান্ড ট্রাভেল | বাংলাদেশ ট্যুর গাইড",
  description:
    "ঘাসফড়িং ট্যুর অ্যান্ড ট্রাভেল - বাংলাদেশের সেরা ট্যুর প্যাকেজ এবং ট্রাভেল সেবা। দেশের সবচেয়ে সুন্দর দর্শনীয় স্থানগুলি আবিষ্কার করুন।",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Gash Foring",
  },
  icons: {
    icon: [
      {
        url: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/icon-192x192.png",
  },
  openGraph: {
    title: "ঘাসফড়িং ট্যুর অ্যান্ড ট্রাভেল",
    description: "বাংলাদেশের সেরা ট্যুর প্যাকেজ এবং ট্রাভেল সেবা",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#01573c",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn">
      <body className={`font-sans antialiased`}>
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
