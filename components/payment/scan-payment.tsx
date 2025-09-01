"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, QrCode, Camera, Flashlight, ImageIcon } from "lucide-react"

interface ScanPaymentProps {
  onBack: () => void
  onScanComplete: (merchantData: any) => void
}

export default function ScanPayment({ onBack, onScanComplete }: ScanPaymentProps) {
  const [isFlashOn, setIsFlashOn] = useState(false)

  const handleMockScan = () => {
    // 模擬掃描商家QR Code
    const mockMerchantData = {
      merchantName: "新光三越信義新天地",
      merchantId: "A12345678",
      amount: 1580,
      category: "百貨購物",
      location: "台北市信義區",
      promotions: [
        {
          type: "merchant",
          description: "週年慶滿千送百",
          discount: 158,
        },
      ],
    }
    onScanComplete(mockMerchantData)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">掃碼支付</h1>
        </div>
      </header>

      {/* Scanner Area */}
      <div className="p-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative aspect-square bg-muted rounded-lg flex items-center justify-center mb-4">
              {/* Mock Camera View */}
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 rounded-lg flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-accent border-dashed rounded-lg flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-accent" />
                </div>
              </div>

              {/* Scanner Overlay */}
              <div className="absolute inset-4 border-2 border-accent rounded-lg">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-accent rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-accent rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-accent rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-accent rounded-br-lg"></div>
              </div>
            </div>

            <p className="text-center text-muted-foreground mb-4">將商家的 QR Code 對準掃描框</p>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFlashOn(!isFlashOn)}
                className={isFlashOn ? "bg-accent text-accent-foreground" : ""}
              >
                <Flashlight className="h-5 w-5 mr-2" />
                {isFlashOn ? "關閉" : "開啟"}閃光燈
              </Button>

              <Button variant="outline" size="lg">
                <ImageIcon className="h-5 w-5 mr-2" />
                相簿
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-accent hover:bg-accent/90" size="lg" onClick={handleMockScan}>
            <Camera className="h-5 w-5 mr-2" />
            模擬掃描 (測試用)
          </Button>

          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">掃描小提示</p>
                  <p className="text-xs text-muted-foreground">確保 QR Code 清晰可見</p>
                </div>
                <Badge variant="outline">安全掃描</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
