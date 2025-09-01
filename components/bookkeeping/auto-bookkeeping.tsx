"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, TrendingUp, PieChart, Calendar, Tag, MapPin, Receipt } from "lucide-react"

interface AutoBookkeepingProps {
  onBack: () => void
}

export default function AutoBookkeeping({ onBack }: AutoBookkeepingProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const bookkeepingData = {
    totalTransactions: 89,
    totalAmount: 18450,
    autoCategories: 87,
    manualAdjustments: 2,
    categories: [
      {
        name: "餐飲",
        amount: 7380,
        transactions: 32,
        percentage: 40,
        color: "bg-blue-500",
        subcategories: [
          { name: "便利商店", amount: 2340, transactions: 18 },
          { name: "咖啡廳", amount: 1560, transactions: 12 },
          { name: "餐廳", amount: 3480, transactions: 2 },
        ],
      },
      {
        name: "購物",
        amount: 5535,
        percentage: 30,
        transactions: 8,
        color: "bg-green-500",
        subcategories: [
          { name: "百貨公司", amount: 3890, transactions: 3 },
          { name: "網路購物", amount: 1645, transactions: 5 },
        ],
      },
      {
        name: "交通",
        amount: 3690,
        percentage: 20,
        transactions: 28,
        color: "bg-yellow-500",
        subcategories: [
          { name: "捷運/公車", amount: 1200, transactions: 24 },
          { name: "計程車", amount: 890, transactions: 3 },
          { name: "加油", amount: 1600, transactions: 1 },
        ],
      },
      {
        name: "娛樂",
        amount: 1107,
        percentage: 6,
        transactions: 6,
        color: "bg-purple-500",
        subcategories: [
          { name: "電影", amount: 580, transactions: 2 },
          { name: "書店", amount: 527, transactions: 4 },
        ],
      },
      {
        name: "其他",
        amount: 738,
        percentage: 4,
        transactions: 15,
        color: "bg-gray-500",
        subcategories: [
          { name: "醫療", amount: 450, transactions: 2 },
          { name: "雜項", amount: 288, transactions: 13 },
        ],
      },
    ],
    recentTransactions: [
      {
        id: "1",
        merchant: "全家便利商店",
        amount: 120,
        category: "餐飲",
        subcategory: "便利商店",
        location: "台北市信義區",
        time: "2024-01-15 14:30",
        autoTagged: true,
        bankPoints: 3.6,
        merchantPoints: 12,
        paymentMethod: "土銀聯名卡",
      },
      {
        id: "2",
        merchant: "星巴克咖啡",
        amount: 165,
        category: "餐飲",
        subcategory: "咖啡廳",
        location: "台北市大安區",
        time: "2024-01-15 09:15",
        autoTagged: true,
        bankPoints: 8.25,
        merchantPoints: 16,
        paymentMethod: "土銀聯名卡",
      },
      {
        id: "3",
        merchant: "新光三越",
        amount: 2890,
        category: "購物",
        subcategory: "百貨公司",
        location: "台北市信義區",
        time: "2024-01-14 16:45",
        autoTagged: true,
        bankPoints: 202.3,
        merchantPoints: 289,
        paymentMethod: "土銀聯名卡",
      },
    ],
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
            <BookOpen className="h-5 w-5" />
            <h1 className="text-lg font-semibold">智慧記帳</h1>
          </div>
        </div>
      </header>

      <div className="p-4 pb-20">
        {/* Auto-Bookkeeping Summary */}
        <Card className="mb-6 border-accent/20 bg-gradient-to-r from-accent/5 to-accent/10">
          <CardHeader>
            <CardTitle className="text-lg">自動記帳效率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{bookkeepingData.autoCategories}</p>
                <p className="text-sm text-muted-foreground">自動分類筆數</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {Math.round((bookkeepingData.autoCategories / bookkeepingData.totalTransactions) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">自動化準確率</p>
              </div>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">本月記帳進度</span>
                <span className="text-sm text-accent">{bookkeepingData.totalTransactions} 筆</span>
              </div>
              <Progress value={98} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                僅需手動調整 {bookkeepingData.manualAdjustments} 筆，節省 95% 記帳時間
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Period Selector */}
        <div className="flex bg-muted rounded-lg p-1 mb-6">
          <Button
            variant={selectedPeriod === "week" ? "default" : "ghost"}
            size="sm"
            className="flex-1"
            onClick={() => setSelectedPeriod("week")}
          >
            本週
          </Button>
          <Button
            variant={selectedPeriod === "month" ? "default" : "ghost"}
            size="sm"
            className="flex-1"
            onClick={() => setSelectedPeriod("month")}
          >
            本月
          </Button>
          <Button
            variant={selectedPeriod === "quarter" ? "default" : "ghost"}
            size="sm"
            className="flex-1"
            onClick={() => setSelectedPeriod("quarter")}
          >
            本季
          </Button>
        </div>

        {/* Category Breakdown */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">智慧分類統計</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookkeepingData.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.transactions} 筆
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">NT$ {category.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{category.percentage}%</p>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />

                  {selectedCategory === category.name && (
                    <div className="ml-7 space-y-2 animate-in slide-in-from-top-2 duration-300">
                      {category.subcategories.map((sub, subIndex) => (
                        <div key={subIndex} className="flex items-center justify-between py-1 px-2 bg-muted/30 rounded">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                            <span className="text-sm">{sub.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {sub.transactions} 筆
                            </Badge>
                          </div>
                          <span className="text-sm font-medium">NT$ {sub.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Auto-Tagged Transactions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">最近自動記帳</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bookkeepingData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{transaction.merchant}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{transaction.location}</span>
                        <Calendar className="h-3 w-3 ml-2" />
                        <span>{transaction.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">NT$ {transaction.amount}</p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.paymentMethod}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-4 w-4 text-accent" />
                    <Badge className="bg-accent/10 text-accent">{transaction.category}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {transaction.subcategory}
                    </Badge>
                    {transaction.autoTagged && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-600">
                        自動分類
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-accent/10 rounded p-2 text-center">
                      <p className="font-medium text-accent">+{transaction.bankPoints}</p>
                      <p className="text-xs text-muted-foreground">土銀點數</p>
                    </div>
                    <div className="bg-primary/10 rounded p-2 text-center">
                      <p className="font-medium text-primary">+{transaction.merchantPoints}</p>
                      <p className="text-xs text-muted-foreground">商家點數</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Auto-Bookkeeping Features */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">智慧記帳功能</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Receipt className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium text-sm">即時自動分類</p>
                  <p className="text-xs text-muted-foreground">支付完成立即依商家類型自動分類記帳</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PieChart className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium text-sm">智慧消費分析</p>
                  <p className="text-xs text-muted-foreground">AI分析消費模式，提供個人化理財建議</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium text-sm">雙重點數累積</p>
                  <p className="text-xs text-muted-foreground">同步記錄銀行與商家點數，最大化回饋效益</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
