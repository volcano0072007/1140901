"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, RefreshCw, Shield, Clock } from "lucide-react"

interface PaymentCodeDisplayProps {
  onBack: () => void
}

export default function PaymentCodeDisplay({ onBack }: PaymentCodeDisplayProps) {
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 300 // Reset to 5 minutes
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      setTimeLeft(300)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="land-bank-gradient text-primary-foreground p-4 trust-shadow">
        <div className="flex items-center gap-3 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold professional-text">台灣土地銀行</h1>
        </div>
        <div className="text-center">
          <p className="text-sm text-primary-foreground/80">付款碼</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 flex flex-col items-center">
        {/* Timer and Security Info */}
        <div className="w-full max-w-sm mb-6">
          <Card className="bg-muted/30 border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium professional-text">安全付款碼</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-lg font-bold text-accent">{formatTime(timeLeft)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">付款碼將自動更新以確保安全</p>
            </CardContent>
          </Card>
        </div>

        {/* QR Code */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 trust-shadow">
          {/* Taiwan Pay Logo and dual QR code layout */}
          <div className="flex flex-col items-center space-y-4">
            {/* Taiwan Pay Logo */}
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%88%AA%E5%9C%96%202025-08-25%20%E4%B8%8B%E5%8D%884.02.14-T0wExUPTIOwQ4J1sF1QblqMpoNECu8.png"
              alt="台灣Pay"
              className="w-32 h-auto"
            />

            {/* Small QR Code */}
            <div className="w-24 h-24 bg-white flex items-center justify-center border border-gray-200">
              <div className="w-full h-full bg-black/10 flex items-center justify-center">
                <div className="grid grid-cols-8 gap-px w-20 h-20">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Large QR Code with Land Bank Logo */}
            <div className="w-48 h-48 bg-white flex items-center justify-center border border-gray-200 relative">
              <div className="w-full h-full bg-black/10 flex items-center justify-center">
                <div className="grid grid-cols-16 gap-px w-44 h-44">
                  {Array.from({ length: 256 }).map((_, i) => (
                    <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                  ))}
                </div>
              </div>
              {/* Land Bank Logo in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">土銀</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barcode */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6 trust-shadow">
          <div className="w-64 h-16 bg-white flex items-center justify-center">
            <img src="/barcode-for-taiwan-land-bank-payment.png" alt="付款條碼" className="w-full h-full" />
          </div>
        </div>

        {/* Account Info */}
        <Card className="w-full max-w-sm mb-6 trust-shadow">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">付款帳戶</span>
                <span className="font-medium professional-text">台灣土地銀行</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">帳戶號碼</span>
                <span className="font-medium">****-****-2456</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">可用餘額</span>
                <span className="font-bold text-primary">NT$ 125,680</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Refresh Button */}
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="w-full max-w-sm bg-primary hover:bg-primary/90 professional-text"
        >
          {isRefreshing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              更新中...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              重新整理付款碼
            </>
          )}
        </Button>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg max-w-sm">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• 付款碼每5分鐘自動更新</p>
              <p>• 請勿將付款碼截圖或分享他人</p>
              <p>• 土地銀行提供銀行級安全保障</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
