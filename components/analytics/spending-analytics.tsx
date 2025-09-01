"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, PieChart, BarChart3, Download } from "lucide-react"

interface SpendingAnalyticsProps {
  onBack: () => void
}

export default function SpendingAnalytics({ onBack }: SpendingAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedView, setSelectedView] = useState("category")

  const monthlyData = {
    totalSpending: 18450,
    totalCashback: 892,
    previousMonth: 16200,
    growth: 13.9,
    categories: [
      { name: "餐飲", amount: 7380, percentage: 40, color: "bg-blue-500", change: 5.2 },
      { name: "購物", amount: 5535, percentage: 30, color: "bg-green-500", change: -2.1 },
      { name: "交通", amount: 3690, percentage: 20, color: "bg-yellow-500", change: 8.7 },
      { name: "娛樂", amount: 1107, percentage: 6, color: "bg-purple-500", change: 15.3 },
      { name: "其他", amount: 738, percentage: 4, color: "bg-gray-500", change: -5.8 },
    ],
    dailySpending: [
      { day: "週一", amount: 2100 },
      { day: "週二", amount: 1800 },
      { day: "週三", amount: 3200 },
      { day: "週四", amount: 2800 },
      { day: "週五", amount: 3500 },
      { day: "週六", amount: 2900 },
      { day: "週日", amount: 2150 },
    ],
  }

  const topMerchants = [
    { name: "全家便利商店", amount: 2340, transactions: 18, category: "餐飲" },
    { name: "新光三越", amount: 1890, transactions: 3, category: "購物" },
    { name: "星巴克", amount: 1560, transactions: 12, category: "餐飲" },
    { name: "台北捷運", amount: 1200, transactions: 24, category: "交通" },
    { name: "誠品書店", amount: 980, transactions: 4, category: "娛樂" },
  ]

  const maxDailyAmount = Math.max(...monthlyData.dailySpending.map((d) => d.amount))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <h1 className="text-lg font-semibold">消費分析</h1>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex bg-primary-foreground/10 rounded-lg p-1">
          <Button
            variant={selectedPeriod === "week" ? "secondary" : "ghost"}
            size="sm"
            className="flex-1 text-primary-foreground"
            onClick={() => setSelectedPeriod("week")}
          >
            本週
          </Button>
          <Button
            variant={selectedPeriod === "month" ? "secondary" : "ghost"}
            size="sm"
            className="flex-1 text-primary-foreground"
            onClick={() => setSelectedPeriod("month")}
          >
            本月
          </Button>
          <Button
            variant={selectedPeriod === "quarter" ? "secondary" : "ghost"}
            size="sm"
            className="flex-1 text-primary-foreground"
            onClick={() => setSelectedPeriod("quarter")}
          >
            本季
          </Button>
        </div>
      </header>

      <div className="p-4 pb-20">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">總消費</p>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold">NT$ {monthlyData.totalSpending.toLocaleString()}</p>
              <p className="text-xs text-green-600">+{monthlyData.growth}% vs 上月</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">總回饋</p>
                <TrendingUp className="h-4 w-4 text-accent" />
              </div>
              <p className="text-2xl font-bold text-accent">NT$ {monthlyData.totalCashback}</p>
              <p className="text-xs text-muted-foreground">回饋率 4.8%</p>
            </CardContent>
          </Card>
        </div>

        {/* View Selector */}
        <div className="flex bg-muted rounded-lg p-1 mb-6">
          <Button
            variant={selectedView === "category" ? "default" : "ghost"}
            size="sm"
            className="flex-1"
            onClick={() => setSelectedView("category")}
          >
            <PieChart className="h-4 w-4 mr-2" />
            分類分析
          </Button>
          <Button
            variant={selectedView === "trend" ? "default" : "ghost"}
            size="sm"
            className="flex-1"
            onClick={() => setSelectedView("trend")}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            趨勢分析
          </Button>
        </div>

        {/* Category Analysis */}
        {selectedView === "category" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">消費類別分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">NT$ {category.amount.toLocaleString()}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                            {category.change > 0 ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            )}
                            <span className={`text-xs ${category.change > 0 ? "text-green-600" : "text-red-600"}`}>
                              {category.change > 0 ? "+" : ""}
                              {category.change}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">常用商家</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topMerchants.map((merchant, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{merchant.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{merchant.transactions} 筆交易</span>
                          <Badge variant="outline" className="text-xs">
                            {merchant.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">NT$ {merchant.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Trend Analysis */}
        {selectedView === "trend" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">每日消費趨勢</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.dailySpending.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{day.day}</span>
                        <span className="font-semibold">NT$ {day.amount.toLocaleString()}</span>
                      </div>
                      <Progress value={(day.amount / maxDailyAmount) * 100} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">消費洞察</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-accent" />
                      <span className="font-medium text-accent">消費增長</span>
                    </div>
                    <p className="text-sm text-muted-foreground">本月消費比上月增加 13.9%，主要來自餐飲類別的增長</p>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-600">消費習慣</span>
                    </div>
                    <p className="text-sm text-muted-foreground">週五是您消費最高的日子，建議在這天使用高回饋信用卡</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-600">回饋優化</span>
                    </div>
                    <p className="text-sm text-muted-foreground">使用 AI 推薦支付方式，本月已為您節省 NT$ 156</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Export Options */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium text-sm">匯出報告</p>
                  <p className="text-xs text-muted-foreground">下載詳細消費分析報告</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                匯出 PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
