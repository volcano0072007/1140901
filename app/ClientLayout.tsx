"use client"

import type React from "react"
// <CHANGE> 更換為更適合銀行業的專業字體組合
import { Inter } from "next/font/google"
import { Noto_Sans_TC } from "next/font/google"
import "./globals.css"

// <CHANGE> Inter 字體提供更好的數字顯示，適合金融應用
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// <CHANGE> Noto Sans TC 提供更好的中文顯示效果
const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-tc",
  weight: ["300", "400", "500", "600", "700"],
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW" className={`${inter.variable} ${notoSansTC.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* <CHANGE> 添加專業的字體渲染優化 */}
        <style jsx global>{`
          body {
            font-family: var(--font-noto-sans-tc), var(--font-inter), system-ui, sans-serif;
          }
        `}</style>
        {children}
      </body>
    </html>
  )
}
