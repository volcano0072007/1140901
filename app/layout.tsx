import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Noto_Sans_TC } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-tc",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "土銀行動 Pay - 臺灣土地銀行",
  description: "臺灣土地銀行官方行動支付應用程式 - 百年信賴，智慧創新",
  generator: "v0.app",
  keywords: "土地銀行,行動支付,數位金融,台灣Pay,安全支付",
  authors: [{ name: "臺灣土地銀行" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW" className={`${inter.variable} ${notoSansTC.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
    </html>
  )
}
