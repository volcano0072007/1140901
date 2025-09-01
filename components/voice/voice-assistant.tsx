"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mic, MicOff, Volume2, Send, Sparkles, MessageCircle, Keyboard } from "lucide-react"

import ScanPayment from "@/components/payment/scan-payment"
import PaymentConfirmation from "@/components/payment/payment-confirmation"
import PaymentSuccess from "@/components/payment/payment-success"
import PaymentCodeDisplay from "@/components/payment/payment-code-display"

interface VoiceAssistantProps {
  onBack: () => void
}

export default function VoiceAssistant({ onBack }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [keyboardInput, setKeyboardInput] = useState("")
  const [inputMode, setInputMode] = useState<"voice" | "keyboard">("voice")
  const [currentView, setCurrentView] = useState<
    | "assistant"
    | "scan-payment"
    | "payment-confirmation"
    | "payment-success"
    | "payment-code"
    | "bill-payment"
    | "transfer"
  >("assistant")
  const [merchantData, setMerchantData] = useState(null)
  const [transactionData, setTransactionData] = useState(null)

  const [conversation, setConversation] = useState([
    {
      type: "assistant",
      message: "您好！我是土銀智慧助理，可以幫您進行支付、查詢消費記錄、繳費等操作。請問需要什麼協助？",
      timestamp: new Date(),
    },
  ])

  const commonCommands = [
    { text: "我要付錢", action: "payment" },
    { text: "查看消費記錄", action: "transactions" },
    { text: "繳水電費", action: "bills" },
    { text: "查看帳戶餘額", action: "balance" },
    { text: "轉帳給朋友", action: "transfer" },
    { text: "查看本月花費", action: "monthly_spending" },
  ]

  const handleVoiceCommand = (command: string) => {
    const newUserMessage = {
      type: "user",
      message: command,
      timestamp: new Date(),
    }

    let assistantResponse = ""

    // 模擬語音指令處理並實際導航到功能頁面
    if (command.includes("付錢") || command.includes("支付")) {
      assistantResponse = "好的，我來幫您開啟掃碼支付功能。"
      // Navigate to scan payment
      setTimeout(() => {
        setCurrentView("scan-payment")
      }, 1500)
    } else if (command.includes("出示付款碼") || command.includes("付款碼")) {
      assistantResponse = "好的，我來為您顯示付款碼。"
      setTimeout(() => {
        setCurrentView("payment-code")
      }, 1500)
    } else if (command.includes("繳費") || command.includes("水電")) {
      assistantResponse = "我來幫您開啟繳費功能。正在準備繳費頁面..."
      // For now, show a mock bill payment interface
      setTimeout(() => {
        setCurrentView("bill-payment")
      }, 1500)
    } else if (command.includes("轉帳")) {
      assistantResponse = "好的，我來幫您開啟轉帳功能。正在準備轉帳頁面..."
      setTimeout(() => {
        setCurrentView("transfer")
      }, 1500)
    } else if (command.includes("消費") || command.includes("記錄")) {
      assistantResponse = "正在為您查詢最近的消費記錄...您本月已消費 NT$ 18,450，獲得回饋 NT$ 892。"
    } else if (command.includes("餘額") || command.includes("帳戶")) {
      assistantResponse = "您的帳戶餘額為 NT$ 125,680。需要查看詳細資訊嗎？"
    } else if (command.includes("本月") || command.includes("花費")) {
      assistantResponse = "您本月總消費為 NT$ 18,450，主要支出類別：餐飲 40%、購物 30%、交通 20%、其他 10%。"
    } else {
      assistantResponse = "抱歉，我沒有完全理解您的需求。您可以說「我要付錢」、「查看消費記錄」或「繳水電費」等指令。"
    }

    const newAssistantMessage = {
      type: "assistant",
      message: assistantResponse,
      timestamp: new Date(),
    }

    setConversation((prev) => [...prev, newUserMessage, newAssistantMessage])
    setTranscript("")
  }

  const handleScanComplete = (data: any) => {
    setMerchantData(data)
    setCurrentView("payment-confirmation")
  }

  const handlePaymentConfirm = (paymentMethod: string) => {
    const mockTransactionData = {
      ...merchantData,
      paymentMethod,
      transactionId: `TXN${Date.now().toString().slice(-8)}`,
      timestamp: new Date(),
    }
    setTransactionData(mockTransactionData)
    setCurrentView("payment-success")
  }

  const handleBackToAssistant = () => {
    setCurrentView("assistant")
    setMerchantData(null)
    setTransactionData(null)
  }

  const startListening = () => {
    setIsListening(true)
    // 模擬語音識別
    setTimeout(() => {
      setIsListening(false)
      setTranscript("我要查看本月消費記錄")
    }, 2000)
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const handleSendCommand = () => {
    const command = inputMode === "voice" ? transcript : keyboardInput
    if (command.trim()) {
      handleVoiceCommand(command)
      if (inputMode === "keyboard") {
        setKeyboardInput("")
      }
    }
  }

  const handleKeyboardSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendCommand()
    }
  }

  if (currentView === "scan-payment") {
    return <ScanPayment onBack={handleBackToAssistant} onScanComplete={handleScanComplete} />
  }

  if (currentView === "payment-confirmation" && merchantData) {
    return (
      <PaymentConfirmation
        merchantData={merchantData}
        onBack={() => setCurrentView("scan-payment")}
        onConfirm={handlePaymentConfirm}
      />
    )
  }

  if (currentView === "payment-success" && transactionData) {
    return <PaymentSuccess transactionData={transactionData} onBackToHome={handleBackToAssistant} />
  }

  if (currentView === "payment-code") {
    return <PaymentCodeDisplay onBack={handleBackToAssistant} />
  }

  if (currentView === "bill-payment") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleBackToAssistant} className="text-primary-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">繳費服務</h1>
          </div>
        </header>
        <div className="p-4">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-lg mb-4">繳費功能開發中</p>
              <p className="text-muted-foreground mb-4">即將支援水費、電費、電話費等各種繳費服務</p>
              <Button onClick={handleBackToAssistant}>返回助理</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === "transfer") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleBackToAssistant} className="text-primary-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">轉帳服務</h1>
          </div>
        </header>
        <div className="p-4">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-lg mb-4">轉帳功能開發中</p>
              <p className="text-muted-foreground mb-4">即將支援好友轉帳、帳號轉帳等服務</p>
              <Button onClick={handleBackToAssistant}>返回助理</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-accent text-accent-foreground p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-accent-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <h1 className="text-lg font-semibold">AI 語音助理</h1>
          </div>
        </div>
      </header>

      <div className="p-4 pb-32">
        {/* Conversation */}
        <div className="space-y-4 mb-6">
          {conversation.map((message, index) => (
            <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === "user" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString("zh-TW", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Commands */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">常用指令</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {commonCommands.map((command, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto p-3 bg-transparent"
                  onClick={() => handleVoiceCommand(command.text)}
                >
                  <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-xs">{command.text}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Voice Input Status */}
        {isListening && (
          <Card className="mb-4 border-accent bg-accent/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Mic className="h-6 w-6 text-accent" />
                  <div className="absolute -inset-2 border-2 border-accent rounded-full animate-ping"></div>
                </div>
                <div>
                  <p className="font-medium text-accent">正在聆聽...</p>
                  <p className="text-sm text-muted-foreground">請說出您的指令</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Input Methods */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            {/* Input mode toggle buttons */}
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant={inputMode === "voice" ? "default" : "outline"}
                size="sm"
                onClick={() => setInputMode("voice")}
                className="flex-1"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                語音輸入
              </Button>
              <Button
                variant={inputMode === "keyboard" ? "default" : "outline"}
                size="sm"
                onClick={() => setInputMode("keyboard")}
                className="flex-1"
              >
                <Keyboard className="h-4 w-4 mr-2" />
                鍵盤輸入
              </Button>
            </div>

            {/* Voice Input Mode */}
            {inputMode === "voice" && (
              <>
                {transcript && (
                  <div className="mb-3 p-2 bg-background rounded border">
                    <p className="text-sm">{transcript}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    className={`flex-1 ${isListening ? "bg-red-500 hover:bg-red-600" : "bg-accent hover:bg-accent/90"}`}
                    onClick={isListening ? stopListening : startListening}
                  >
                    {isListening ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
                    {isListening ? "停止聆聽" : "開始說話"}
                  </Button>

                  {transcript && (
                    <Button variant="outline" onClick={handleSendCommand}>
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </>
            )}

            {/* Keyboard Input Mode */}
            {inputMode === "keyboard" && (
              <div className="space-y-3">
                <Input
                  placeholder="請輸入您的指令..."
                  value={keyboardInput}
                  onChange={(e) => setKeyboardInput(e.target.value)}
                  onKeyDown={handleKeyboardSubmit}
                  className="w-full"
                />
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-accent hover:bg-accent/90"
                    onClick={handleSendCommand}
                    disabled={!keyboardInput.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    發送指令
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  提示：您可以直接輸入「我要付錢」、「查看消費記錄」等指令，或按 Enter 鍵發送
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
