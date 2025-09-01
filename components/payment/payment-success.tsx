"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Home, Share2, Download, Gift, Sparkles, TrendingUp } from "lucide-react"

interface PaymentSuccessProps {
  transactionData: any
  onBackToHome: () => void
}

export default function PaymentSuccess({ transactionData, onBackToHome }: PaymentSuccessProps) {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    setShowAnimation(true)
  }, [])

  const rewards = {
    cashback: 110.6,
    points: 158,
    xp: 15,
    levelProgress: 75,
    nextLevel: "小樹苗 Lv.4",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Success Header */}
      <div className="bg-gradient-to-b from-accent to-accent/80 text-accent-foreground p-6 text-center">
        <div
          className={`transition-all duration-1000 ${showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
        >
          <CheckCircle className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">支付成功！</h1>
          <p className="text-accent-foreground/80">交易已完成，感謝您的使用</p>
        </div>
      </div>

      <div className="p-4 -mt-4">
        {/* Transaction Details */}
        <Card className="mb-4 shadow-lg">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <p className="text-muted-foreground text-sm">支付金額</p>
              <p className="text-3xl font-bold">NT$ {transactionData.amount.toLocaleString()}</p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">商家</span>
                <span className="font-medium">{transactionData.merchantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">支付方式</span>
                <span className="font-medium">土銀聯名卡 **** 1234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">交易時間</span>
                <span className="font-medium">{new Date().toLocaleString("zh-TW")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">交易編號</span>
                <span className="font-medium text-sm">TXN{Date.now().toString().slice(-8)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Summary */}
        <Card className="mb-4 border-accent/20 bg-gradient-to-r from-accent/5 to-accent/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">獲得獎勵</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-accent/10 rounded-full p-3 w-fit mx-auto mb-2">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <p className="text-lg font-bold text-accent">NT$ {rewards.cashback}</p>
                <p className="text-xs text-muted-foreground">現金回饋</p>
              </div>

              <div className="text-center">
                <div className="bg-accent/10 rounded-full p-3 w-fit mx-auto mb-2">
                  <Gift className="h-6 w-6 text-accent" />
                </div>
                <p className="text-lg font-bold text-accent">{rewards.points}</p>
                <p className="text-xs text-muted-foreground">紅利點數</p>
              </div>

              <div className="text-center">
                <div className="bg-accent/10 rounded-full p-3 w-fit mx-auto mb-2">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <p className="text-lg font-bold text-accent">+{rewards.xp}</p>
                <p className="text-xs text-muted-foreground">經驗值</p>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">小土苗成長進度</span>
                <span className="text-sm text-accent">{rewards.levelProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${rewards.levelProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                距離 {rewards.nextLevel} 還差 {100 - rewards.levelProgress}%
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Auto Services */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">自動完成服務</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">已自動記帳至「{transactionData.category || "百貨購物"}」分類</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">已累積商家會員點數 +{rewards.points}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">已同步更新商家會員等級</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">已更新消費分析報告</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">已完成雙重點數累積（銀行+商家）</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-accent hover:bg-accent/90" size="lg" onClick={onBackToHome}>
            <Home className="h-5 w-5 mr-2" />
            返回首頁
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5 mr-2" />
              分享
            </Button>

            <Button variant="outline" size="lg">
              <Download className="h-5 w-5 mr-2" />
              下載收據
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
