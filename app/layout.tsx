import type React from "react"
import type { Metadata } from "next"
import { Sora, Quicksand } from "next/font/google"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
})

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
})

export const metadata: Metadata = {
  title: "Roshani Chede Portfolio",
  description: "A creative developer who loves building beautiful, functional experiences",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${quicksand.variable} font-sans`}>{children}</body>
    </html>
  )
}
