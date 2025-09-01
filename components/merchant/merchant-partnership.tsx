"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Store, Gift, Star, Crown, Award, Sparkles } from "lucide-react"

interface MerchantPartnershipProps {
  onBack: () => void
}

export default function MerchantPartnership({ onBack }: MerchantPartnershipProps) {
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null)

  const partnerMerchants = [
    {
      id: "family-mart",
      name: "全家便利商店",
      category: "便利商店",
      memberLevel: "金卡會員",
      points: 2580,
      nextLevelPoints: 3000,
      bankPoints: 156,
      merchantPoints: 2580,
      benefits: ["消費滿100送10點", "生日月雙倍點數", "專屬優惠券"],
      monthlySpending: 3200,
      transactions: 18,
      logo: "🏪",
      tier: "gold",
    },
    {
      id: "starbucks",
      name: "星巴克咖啡",
      category: "餐飲",
      memberLevel: "綠星會員",
      points: 890,
      nextLevelPoints: 1500,
      bankPoints: 89,
      merchantPoints: 890,
      benefits: ["買10送1", "生日免費飲品", "新品優先體驗"],
      monthlySpending: 1560,
      transactions: 12,
      logo: "☕",
      tier: "green",
    },
    {
      id: "shin-kong",
      name: "新光三越",
      category: "百貨",
      memberLevel: "白金會員",
      points: 15600,
      nextLevelPoints: 20000,
      bankPoints: 780,
      merchantPoints: 15600,
      benefits: ["消費回饋5%", "VIP專屬活動", "免費停車2小時"],
      monthlySpending: 8900,
      transactions: 6,
      logo: "🏬",
      tier: "platinum",
    },
    {
      id: "eslite",
      name: "誠品書店",
      category: "文化",
      memberLevel: "悅讀會員",
      points: 1240,
      nextLevelPoints: 2000,
      bankPoints: 62,
      merchantPoints: 1240,
      benefits: ["購書95折", "講座優先報名", "咖啡廳9折"],
      monthlySpending: 980,
      transactions: 4,
      logo: "📚",
      tier: "silver",
    },
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "text-purple-600 bg-purple-50"
      case "gold":
        return "text-yellow-600 bg-yellow-50"
      case "silver":
        return "text-gray-600 bg-gray-50"
      case "green":
        return "text-green-600 bg-green-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "platinum":
        return <Crown className="h-4 w-4" />
      case "gold":
        return <Award className="h-4 w-4" />
      case "silver":
        return <Star className="h-4 w-4" />
      default:
        return <Gift className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            <h1 className="text-lg font-semibold">合作商家會員</h1>
          </div>
        </div>
      </header>

      <div className="p-4 pb-20">
        {/* Summary Card */}
        <Card className="mb-6 border-accent/20 bg-gradient-to-r from-accent/5 to-accent/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">整合會員權益</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">
                  {partnerMerchants.reduce((sum, merchant) => sum + merchant.bankPoints, 0)}
                </p>
                <p className="text-sm text-muted-foreground">土銀點數總計</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {partnerMerchants.reduce((sum, merchant) => sum + merchant.merchantPoints, 0)}
                </p>
                <p className="text-sm text-muted-foreground">商家點數總計</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-background/50 rounded-lg">
              <p className="text-sm font-medium mb-1">本月整合效益</p>
              <p className="text-xs text-muted-foreground">
                透過土銀支付，同步累積銀行與商家點數，提升{" "}
                {Math.round(
                  (partnerMerchants.reduce((sum, merchant) => sum + merchant.bankPoints, 0) /
                    partnerMerchants.reduce((sum, merchant) => sum + merchant.merchantPoints, 0)) *
                    100,
                )}
                % 回饋效率
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Partner Merchants */}
        <div className="space-y-4">
          {partnerMerchants.map((merchant) => (
            <Card key={merchant.id} className="cursor-pointer hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{merchant.logo}</div>
                    <div>
                      <h3 className="font-semibold">{merchant.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {merchant.category}
                        </Badge>
                        <Badge className={`text-xs ${getTierColor(merchant.tier)}`}>
                          {getTierIcon(merchant.tier)}
                          <span className="ml-1">{merchant.memberLevel}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">本月消費</p>
                    <p className="font-semibold">NT$ {merchant.monthlySpending.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{merchant.transactions} 筆交易</p>
                  </div>
                </div>

                {/* Points Progress */}
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">商家點數進度</span>
                      <span className="text-sm text-accent">
                        {merchant.points} / {merchant.nextLevelPoints}
                      </span>
                    </div>
                    <Progress value={(merchant.points / merchant.nextLevelPoints) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      距離下一等級還需 {merchant.nextLevelPoints - merchant.points} 點
                    </p>
                  </div>

                  {/* Dual Points Display */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-accent/10 rounded-lg p-2 text-center">
                      <p className="text-lg font-bold text-accent">{merchant.bankPoints}</p>
                      <p className="text-xs text-muted-foreground">土銀點數</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-2 text-center">
                      <p className="text-lg font-bold text-primary">{merchant.merchantPoints}</p>
                      <p className="text-xs text-muted-foreground">商家點數</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <p className="text-sm font-medium mb-2">會員專屬權益</p>
                    <div className="space-y-1">
                      {merchant.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          <span className="text-xs text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Benefits */}
        <Card className="mt-6 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">整合支付優勢</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">一次支付，雙重累積：同時獲得銀行與商家點數</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">自動記帳：支付完成即時分類記錄，無需手動輸入</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">會員等級同步：即時更新各商家會員狀態與權益</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">智慧推薦：AI分析最佳支付方案，最大化回饋效益</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
