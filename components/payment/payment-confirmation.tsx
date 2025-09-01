"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Sparkles, CreditCard, Wallet, ChevronRight, Shield, MapPin, Gift } from "lucide-react"

interface PaymentConfirmationProps {
  merchantData: any
  onBack: () => void
  onConfirm: (paymentMethod: string) => void
}

export default function PaymentConfirmation({ merchantData, onBack, onConfirm }: PaymentConfirmationProps) {
  const [selectedPayment, setSelectedPayment] = useState("recommended")

  const aiRecommendation = {
    method: "土銀聯名卡",
    cashback: "7%",
    amount: 110.6,
    reason: "百貨週年慶 + 聯名卡專屬優惠",
    savings: "比其他方式多賺 NT$ 63",
  }

  const paymentMethods = [
    {
      id: "recommended",
      name: "土銀聯名卡",
      type: "信用卡",
      number: "**** 1234",
      cashback: "7%",
      amount: 110.6,
      isRecommended: true,
    },
    {
      id: "debit",
      name: "土銀數位帳戶",
      type: "金融卡",
      number: "**** 5678",
      cashback: "2%",
      amount: 31.6,
      isRecommended: false,
    },
    {
      id: "credit2",
      name: "其他信用卡",
      type: "信用卡",
      number: "**** 9012",
      cashback: "3%",
      amount: 47.4,
      isRecommended: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">確認支付</h1>
        </div>
      </header>

      <div className="p-4 pb-24">
        {/* Merchant Info */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold">{merchantData.merchantName}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{merchantData.location}</span>
                </div>
              </div>
              <Badge variant="outline">{merchantData.category}</Badge>
            </div>

            <Separator className="my-3" />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">支付金額</span>
              <span className="text-2xl font-bold">NT$ {merchantData.amount.toLocaleString()}</span>
            </div>

            {merchantData.promotions?.length > 0 && (
              <div className="mt-3 p-2 bg-accent/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-accent">{merchantData.promotions[0].description}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Recommendation */}
        <Card className="mb-4 border-accent/20 bg-gradient-to-r from-accent/5 to-accent/10">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">AI 智慧推薦</CardTitle>
              <Badge className="bg-accent text-accent-foreground ml-auto">最佳選擇</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{aiRecommendation.method}</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-accent">+NT$ {aiRecommendation.amount}</span>
                  <p className="text-xs text-muted-foreground">{aiRecommendation.cashback} 回饋</p>
                </div>
              </div>

              <div className="bg-background/50 rounded-lg p-3">
                <p className="text-sm font-medium mb-1">{aiRecommendation.reason}</p>
                <p className="text-xs text-accent">{aiRecommendation.savings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">選擇支付方式</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedPayment === method.id ? "border-accent bg-accent/5" : "border-border hover:bg-muted/30"
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {method.type === "信用卡" ? (
                      <CreditCard className="h-5 w-5 text-primary" />
                    ) : (
                      <Wallet className="h-5 w-5 text-primary" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{method.name}</span>
                        {method.isRecommended && (
                          <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
                            推薦
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{method.number}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-semibold text-accent">+NT$ {method.amount}</span>
                    <p className="text-xs text-muted-foreground">{method.cashback} 回饋</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium text-sm">安全保障</p>
                <p className="text-xs text-muted-foreground">支付時將使用生物辨識或密碼驗證</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <Button className="w-full bg-accent hover:bg-accent/90" size="lg" onClick={() => onConfirm(selectedPayment)}>
          確認支付 NT$ {merchantData.amount.toLocaleString()}
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
