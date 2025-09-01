"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  Phone,
  ChevronRight,
  Fingerprint,
  Eye,
  EyeOff,
} from "lucide-react"

interface UserProfileProps {
  onBack: () => void
}

export default function UserProfile({ onBack }: UserProfileProps) {
  const [notifications, setNotifications] = useState(true)
  const [biometric, setBiometric] = useState(true)
  const [showAccountNumber, setShowAccountNumber] = useState(false)

  const userInfo = {
    name: "陳美玲",
    phone: "0912-345-678",
    email: "meiling@example.com",
    accountNumber: "123-456-789012",
    memberSince: "2020年3月",
    level: "小樹苗 Lv.3",
    totalTransactions: 1247,
    totalCashback: 15680,
  }

  const menuItems = [
    {
      icon: CreditCard,
      title: "我的卡片",
      description: "管理信用卡和金融卡",
      action: () => {},
    },
    {
      icon: Bell,
      title: "通知設定",
      description: "推播和提醒設定",
      action: () => {},
      hasSwitch: true,
      switchValue: notifications,
      onSwitchChange: setNotifications,
    },
    {
      icon: Shield,
      title: "安全設定",
      description: "密碼和生物辨識",
      action: () => {},
    },
    {
      icon: Fingerprint,
      title: "生物辨識",
      description: "指紋和臉部辨識",
      action: () => {},
      hasSwitch: true,
      switchValue: biometric,
      onSwitchChange: setBiometric,
    },
    {
      icon: HelpCircle,
      title: "幫助中心",
      description: "常見問題和使用說明",
      action: () => {},
    },
    {
      icon: Phone,
      title: "聯絡客服",
      description: "24小時客服專線",
      action: () => {},
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">個人資料</h1>
        </div>
      </header>

      <div className="p-4 pb-20">
        {/* User Info Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{userInfo.name}</h2>
                <p className="text-muted-foreground">{userInfo.phone}</p>
                <Badge className="mt-1 bg-accent text-accent-foreground">{userInfo.level}</Badge>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">會員編號</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{showAccountNumber ? userInfo.accountNumber : "***-***-***012"}</span>
                  <Button variant="ghost" size="sm" onClick={() => setShowAccountNumber(!showAccountNumber)}>
                    {showAccountNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">加入時間</span>
                <span className="font-medium">{userInfo.memberSince}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">總交易次數</span>
                <span className="font-medium">{userInfo.totalTransactions.toLocaleString()} 次</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">累積回饋</span>
                <span className="font-medium text-accent">NT$ {userInfo.totalCashback.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">設定與服務</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div key={index}>
                  <div
                    className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                    onClick={item.action}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.hasSwitch ? (
                        <Switch
                          checked={item.switchValue}
                          onCheckedChange={item.onSwitchChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  {index < menuItems.length - 1 && <Separator />}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <Card className="mt-6 bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium text-sm">安全保障</p>
                <p className="text-xs text-muted-foreground">土地銀行提供銀行級資安防護，您的資料絕對安全</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Version Info */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>土銀行動 Pay v1.0</p>
          <p>© 2025 土地銀行 版權所有</p>
        </div>
      </div>
    </div>
  )
}
