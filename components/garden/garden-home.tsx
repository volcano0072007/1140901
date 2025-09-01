"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Sparkles,
  Trophy,
  Calendar,
  CheckCircle,
  Star,
  Zap,
  Target,
  Award,
  Droplets,
  Sun,
  Gift,
  BookOpen,
  CreditCard,
  Wallet,
  Settings,
  Home,
  Gem,
  Apple,
} from "lucide-react"

interface GardenHomeProps {
  onBack: () => void
}

export default function GardenHome({ onBack }: GardenHomeProps) {
  const [selectedTab, setSelectedTab] = useState("garden")
  const [isGrowing, setIsGrowing] = useState(false)
  const [showGrowthEffect, setShowGrowthEffect] = useState(false)
  const [isWatering, setIsWatering] = useState(false)
  const [isSunbathing, setIsSunbathing] = useState(false)
  const [showMicroGrowth, setShowMicroGrowth] = useState(false)
  const [canHarvestFruit, setCanHarvestFruit] = useState(false)

  const [plant, setPlant] = useState({
    level: 6,
    name: "小屋",
    xp: 180,
    nextLevelXp: 200,
    progress: 90,
    growthStage: 3, // 1: 地基(Lv.1), 2: 框架(Lv.5), 3: 小屋(Lv.6-14), 4: 房屋(Lv.15-29), 5: 豪宅(Lv.30+)
    plantName: "我的小屋", // User customizable name
  })

  const [resources, setResources] = useState({
    waterDrops: 25, // 💧 活躍度資源
    sunlight: 8, // ☀️ 價值貢獻資源
    diamonds: 3, // 💎 核心金融行為資源
  })

  const [onboardingTasks, setOnboardingTasks] = useState([
    {
      id: "welcome",
      title: "初次見面",
      description: "歡迎來到小屋打造！領取你的建材禮包",
      reward: { waterDrops: 10, sunlight: 0, diamonds: 0 },
      completed: true,
      icon: Gift,
      category: "onboarding",
    },
    {
      id: "setup-account",
      title: "打地基",
      description: "綁定你的銀行帳戶，為小屋打下穩固的地基",
      reward: { waterDrops: 0, sunlight: 20, diamonds: 0 },
      completed: false,
      icon: Settings,
      category: "onboarding",
    },
    {
      id: "first-payment",
      title: "第一次建造",
      description: "完成一筆模擬支付，開始建造你的小屋！",
      reward: { waterDrops: 5, sunlight: 0, diamonds: 0 },
      completed: false,
      icon: CreditCard,
      category: "onboarding",
    },
  ])

  const [dailyTasks, setDailyTasks] = useState([
    {
      id: 1,
      title: "每日登入",
      description: "開啟 App 並查看首頁",
      reward: { waterDrops: 1, sunlight: 0, diamonds: 0 },
      completed: true,
      icon: Calendar,
      category: "daily",
    },
    {
      id: 2,
      title: "完成一筆支付",
      description: "使用掃碼支付或出示付款碼",
      reward: { waterDrops: 5, sunlight: 0, diamonds: 0 },
      completed: false,
      icon: Zap,
      category: "daily",
    },
    {
      id: 3,
      title: "查看理財小知識",
      description: "瀏覽一則理財小知識",
      reward: { waterDrops: 1, sunlight: 0, diamonds: 0 },
      completed: true,
      icon: BookOpen,
      category: "daily",
    },
    {
      id: 4,
      title: "完成帳單繳費",
      description: "成功繳納一筆帳單",
      reward: { waterDrops: 0, sunlight: 10, diamonds: 0 },
      completed: false,
      icon: Wallet,
      category: "daily",
    },
  ])

  const [coreFinancialTasks, setCoreFinancialTasks] = useState([
    {
      id: "mortgage-payment",
      title: "房貸專屬核心行為",
      description: "每月成功自動扣繳房貸",
      reward: { waterDrops: 0, sunlight: 0, diamonds: 1 },
      completed: false,
      icon: Home,
      category: "core",
      frequency: "monthly",
      isCore: true,
    },
  ])

  const achievements = [
    {
      id: 1,
      title: "首次支付",
      description: "完成第一筆行動支付",
      reward: { waterDrops: 10, sunlight: 5, diamonds: 0 },
      unlocked: true,
      icon: Trophy,
    },
    {
      id: 2,
      title: "連續登入 7 天",
      description: "養成良好的使用習慣",
      reward: { waterDrops: 20, sunlight: 10, diamonds: 0 },
      unlocked: false,
      progress: 5,
      total: 7,
      icon: Star,
    },
    {
      id: 3,
      title: "夜市之王",
      description: "在5個不同的夜市完成支付",
      reward: { waterDrops: 30, sunlight: 15, diamonds: 0 },
      unlocked: false,
      progress: 2,
      total: 5,
      icon: Award,
    },
    {
      id: 4,
      title: "房貸達人",
      description: "連續3個月成功自動扣繳房貸",
      reward: { waterDrops: 0, sunlight: 50, diamonds: 5 },
      unlocked: false,
      progress: 1,
      total: 3,
      icon: Home,
    },
  ]

  const gardenItems = [
    { id: 1, name: "小樹苗", level: 3, unlocked: true },
    { id: 2, name: "花朵", level: 1, unlocked: true },
    { id: 3, name: "蝴蝶", level: 0, unlocked: false },
    { id: 4, name: "彩虹", level: 0, unlocked: false },
  ]

  const getGrowthStageInfo = (level: number) => {
    if (level === 1) return { stage: 1, name: "地基", description: "剛剛開始的地基工程，正在為未來打下基礎" }
    if (level >= 2 && level <= 4) return { stage: 2, name: "框架", description: "搭建起了基本框架，房屋的雛形開始顯現" }
    if (level >= 5 && level <= 14)
      return { stage: 3, name: "小屋", description: "一間溫馨的小屋正在成形，每天都有新進展" }
    if (level >= 15 && level <= 29) return { stage: 4, name: "房屋", description: "已經建成一棟完整的房屋，設施齊全" }
    if (level >= 30) return { stage: 5, name: "豪宅", description: "豪華的大宅院，擁有精美的裝潢和庭院" }
    return { stage: 1, name: "地基", description: "剛剛開始的地基工程" }
  }

  const getBackgroundStyle = (level: number) => {
    if (level === 1) {
      return "bg-gradient-to-b from-amber-100 to-amber-200" // Just soil
    }
    if (level >= 2 && level <= 4) {
      return "bg-gradient-to-b from-amber-100 via-green-50 to-green-100" // Soil with hints of grass
    }
    if (level >= 5 && level <= 14) {
      return "bg-gradient-to-b from-sky-100 via-green-50 to-green-200" // Grass and sky
    }
    if (level >= 15 && level <= 29) {
      return "bg-gradient-to-b from-blue-200 via-sky-100 to-green-300" // Blue sky and lush grass
    }
    if (level >= 30) {
      return "bg-gradient-to-b from-blue-300 via-sky-200 to-green-400" // Manor scenery
    }
    return "bg-gradient-to-b from-amber-100 to-amber-200"
  }

  const triggerMicroGrowth = () => {
    setShowMicroGrowth(true)
    setTimeout(() => setShowMicroGrowth(false), 1000)
  }

  const [rewards, setRewards] = useState({
    cashVouchers: [
      { id: 1, amount: 10, expiryDays: 7, obtained: new Date() },
      { id: 2, amount: 50, expiryDays: 7, obtained: new Date() },
    ],
    serviceVouchers: [
      { id: 1, type: "loan_rate", discount: "0.1%", description: "信貸利率減免券", obtained: new Date() },
    ],
    partnerVouchers: [
      { id: 1, brand: "7-ELEVEN", value: "20元購物金", description: "7-ELEVEN 20元購物金", obtained: new Date() },
    ],
    decorations: [
      { id: 1, name: "黃金紀念碑", rarity: "legendary", unlocked: false, description: "連續登入365天獎勵" },
      { id: 2, name: "冠軍獎盃", rarity: "epic", unlocked: false, description: "夜市支付王排行榜前三名" },
      {
        id: 3,
        name: "幸福燈塔",
        rarity: "exclusive",
        unlocked: false,
        description: "房貸戶專屬裝飾",
        requiresMortgage: true,
      },
    ],
  })

  const [chestAvailable, setChestAvailable] = useState(false)
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [lastReward, setLastReward] = useState(null)
  const [showDiamondShop, setShowDiamondShop] = useState(false)
  const [treePlantingUnlocked, setTreePlantingUnlocked] = useState(false)

  const addExperience = (xp: number) => {
    const newXp = plant.xp + xp
    const newProgress = (newXp / plant.nextLevelXp) * 100
    const oldProgress = plant.progress

    // Check for micro-growth events at 20%, 40%, 60%, 80% intervals
    const checkpoints = [20, 40, 60, 80]
    const crossedCheckpoint = checkpoints.find((checkpoint) => oldProgress < checkpoint && newProgress >= checkpoint)

    if (crossedCheckpoint) {
      triggerMicroGrowth()
    }

    // Level up logic with specific thresholds
    if (newXp >= plant.nextLevelXp) {
      const newLevel = plant.level + 1
      const stageInfo = getGrowthStageInfo(newLevel)

      // Major level up animation for key thresholds
      if ([5, 15, 30, 50].includes(newLevel)) {
        triggerGrowthAnimation()
        setChestAvailable(true)
      }

      // Enable fruit harvesting at level 50
      if (newLevel >= 50) {
        setCanHarvestFruit(true)
      }

      if (newLevel >= 100) {
        setTreePlantingUnlocked(true)
      }

      setPlant((prev) => ({
        ...prev,
        level: newLevel,
        growthStage: stageInfo.stage,
        name: stageInfo.name,
        xp: newXp - prev.nextLevelXp,
        nextLevelXp: prev.nextLevelXp + 200,
        progress: ((newXp - prev.nextLevelXp) / (prev.nextLevelXp + 200)) * 100,
      }))
    } else {
      setPlant((prev) => ({
        ...prev,
        xp: newXp,
        progress: newProgress,
      }))
    }
  }

  const completeTask = (taskId: number | string, category: string) => {
    if (category === "onboarding") {
      const task = onboardingTasks.find((t) => t.id === taskId)
      if (!task || task.completed) return

      setOnboardingTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t)))
      setResources((prev) => ({
        waterDrops: prev.waterDrops + task.reward.waterDrops,
        sunlight: prev.sunlight + task.reward.sunlight,
        diamonds: prev.diamonds + task.reward.diamonds,
      }))
    } else if (category === "core") {
      const task = coreFinancialTasks.find((t) => t.id === taskId)
      if (!task || task.completed) return

      setCoreFinancialTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t)))
      setResources((prev) => ({
        waterDrops: prev.waterDrops + task.reward.waterDrops,
        sunlight: prev.sunlight + task.reward.sunlight,
        diamonds: prev.diamonds + task.reward.diamonds,
      }))
    } else {
      const task = dailyTasks.find((t) => t.id === taskId)
      if (!task || task.completed) return

      setDailyTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t)))
      setResources((prev) => ({
        waterDrops: prev.waterDrops + task.reward.waterDrops,
        sunlight: prev.sunlight + task.reward.sunlight,
        diamonds: prev.diamonds + task.reward.diamonds,
      }))
    }
  }

  const triggerGrowthAnimation = () => {
    setIsGrowing(true)
    setShowGrowthEffect(true)

    setTimeout(() => {
      setIsGrowing(false)
    }, 2000)

    setTimeout(() => {
      setShowGrowthEffect(false)
    }, 3000)
  }

  const renderTree = () => {
    const level = plant.level
    const stageInfo = getGrowthStageInfo(level)
    const stage = stageInfo.stage

    switch (stage) {
      case 1: // 種子 (Lv.1)
        return (
          <div className="relative">
            <div
              className={`w-4 h-4 bg-amber-800 rounded-full mx-auto transition-all duration-500 ${showMicroGrowth ? "scale-110" : ""}`}
            >
              {/* Breathing animation */}
              <div className="w-full h-full bg-amber-700 rounded-full animate-pulse"></div>
            </div>
            {isGrowing && <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-yellow-400 animate-bounce" />}
            {isWatering && (
              <div className="absolute -top-4 -left-2">
                <Droplets className="h-4 w-4 text-blue-400 animate-bounce" />
                <div className="w-1 h-6 bg-blue-300 opacity-60 animate-pulse"></div>
              </div>
            )}
            {isSunbathing && <Sun className="absolute -top-3 -right-3 h-4 w-4 text-yellow-400 animate-pulse" />}
          </div>
        )

      case 2: // 嫩芽 (Lv.2-4)
        return (
          <div className="relative">
            <div
              className={`w-2 h-8 bg-green-600 rounded-sm mx-auto transition-all duration-500 ${showMicroGrowth ? "h-10" : ""}`}
            ></div>
            <div
              className={`w-8 h-4 bg-green-400 rounded-full -mt-2 mx-auto transition-all duration-500 ${showMicroGrowth ? "w-10 h-5" : ""}`}
            >
              <div className="w-6 h-3 bg-green-300 rounded-full mx-auto mt-0.5"></div>
            </div>
            {isGrowing && <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-yellow-400 animate-bounce" />}
            {isWatering && (
              <div className="absolute -top-5 -left-3">
                <Droplets className="h-4 w-4 text-blue-400 animate-bounce" />
                <div className="w-1 h-8 bg-blue-300 opacity-60 animate-pulse"></div>
              </div>
            )}
            {isSunbathing && <Sun className="absolute -top-4 -right-4 h-5 w-5 text-yellow-400 animate-pulse" />}
          </div>
        )

      case 3: // 小樹苗 (Lv.5-14)
        return (
          <div className="relative">
            <div
              className={`w-3 h-12 bg-amber-600 rounded-sm mx-auto transition-all duration-500 ${showMicroGrowth ? "h-14" : ""}`}
            ></div>
            <div
              className={`w-12 h-12 bg-green-500 rounded-full -mt-6 mx-auto relative transition-all duration-500 ${showMicroGrowth ? "w-14 h-14" : ""}`}
            >
              <div className="w-8 h-8 bg-green-400 rounded-full absolute top-1 left-2"></div>
              <div className="w-6 h-6 bg-green-300 rounded-full absolute bottom-1 right-1"></div>
              {/* New leaves based on level */}
              {level >= 8 && <div className="w-4 h-4 bg-green-200 rounded-full absolute top-2 right-0"></div>}
              {level >= 12 && <div className="w-4 h-4 bg-green-200 rounded-full absolute bottom-2 left-0"></div>}
            </div>
            {isGrowing && <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-bounce" />}
            {isWatering && (
              <div className="absolute -top-6 -left-4">
                <Droplets className="h-5 w-5 text-blue-400 animate-bounce" />
                <div className="w-1 h-10 bg-blue-300 opacity-60 animate-pulse"></div>
              </div>
            )}
            {isSunbathing && <Sun className="absolute -top-6 -right-6 h-6 w-6 text-yellow-400 animate-pulse" />}
          </div>
        )

      case 4: // 小樹 (Lv.15-29)
        return (
          <div className="relative">
            <div
              className={`w-4 h-16 bg-amber-600 rounded-sm mx-auto transition-all duration-500 ${showMicroGrowth ? "h-18" : ""}`}
            ></div>
            <div
              className={`w-18 h-18 bg-green-500 rounded-full -mt-10 mx-auto relative transition-all duration-500 ${showMicroGrowth ? "w-20 h-20" : ""}`}
            >
              <div className="w-14 h-14 bg-green-400 rounded-full absolute top-1 left-2"></div>
              <div className="w-10 h-10 bg-green-600 rounded-full absolute bottom-2 right-1"></div>
              <div className="w-8 h-8 bg-green-300 rounded-full absolute top-3 right-3"></div>
              <div className="w-6 h-6 bg-green-200 rounded-full absolute bottom-3 left-1"></div>
              {/* Flower buds for higher levels */}
              {level >= 25 && (
                <>
                  <div className="w-3 h-3 bg-pink-300 rounded-full absolute top-4 left-4"></div>
                  <div className="w-3 h-3 bg-pink-300 rounded-full absolute top-6 right-2"></div>
                </>
              )}
            </div>
            {isGrowing && <Sparkles className="absolute -top-2 -right-2 h-7 w-7 text-yellow-400 animate-bounce" />}
            {isWatering && (
              <div className="absolute -top-8 -left-6">
                <Droplets className="h-6 w-6 text-blue-400 animate-bounce" />
                <div className="w-1 h-12 bg-blue-300 opacity-60 animate-pulse"></div>
              </div>
            )}
            {isSunbathing && <Sun className="absolute -top-8 -right-8 h-7 w-7 text-yellow-400 animate-pulse" />}
          </div>
        )

      case 5: // 大樹 (Lv.30+)
        return (
          <div className="relative">
            <div
              className={`w-5 h-20 bg-amber-700 rounded-sm mx-auto transition-all duration-500 ${showMicroGrowth ? "h-22" : ""}`}
            ></div>
            <div
              className={`w-24 h-24 bg-green-500 rounded-full -mt-12 mx-auto relative transition-all duration-500 ${showMicroGrowth ? "w-26 h-26" : ""}`}
            >
              <div className="w-20 h-20 bg-green-400 rounded-full absolute top-1 left-2"></div>
              <div className="w-16 h-16 bg-green-600 rounded-full absolute bottom-2 right-1"></div>
              <div className="w-12 h-12 bg-green-300 rounded-full absolute top-3 right-3"></div>
              <div className="w-10 h-10 bg-green-200 rounded-full absolute bottom-3 left-1"></div>

              {/* Blooming flowers */}
              <div className="w-4 h-4 bg-pink-400 rounded-full absolute top-6 left-6"></div>
              <div className="w-4 h-4 bg-pink-400 rounded-full absolute top-8 right-4"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full absolute bottom-6 left-4"></div>
              <div className="w-4 h-4 bg-purple-400 rounded-full absolute bottom-8 right-6"></div>

              {/* Fruits for level 50+ */}
              {level >= 50 && (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full absolute top-10 left-8"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full absolute top-12 right-6"></div>
                  <div className="w-3 h-3 bg-orange-500 rounded-full absolute bottom-10 left-6"></div>
                </>
              )}
            </div>

            <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-pulse" />
            <Star className="absolute -top-1 -left-2 h-5 w-5 text-yellow-300 animate-pulse" />
            <Star className="absolute top-2 right-4 h-4 w-4 text-pink-300 animate-pulse" />

            {isWatering && (
              <div className="absolute -top-10 -left-8">
                <Droplets className="h-7 w-7 text-blue-400 animate-bounce" />
                <div className="w-2 h-16 bg-blue-300 opacity-60 animate-pulse"></div>
              </div>
            )}
            {isSunbathing && <Sun className="absolute -top-10 -right-10 h-8 w-8 text-yellow-400 animate-pulse" />}
          </div>
        )

      default:
        return renderTree()
    }
  }

  const openChest = () => {
    if (!chestAvailable) return

    const rewardTypes = [
      { type: "cash", weight: 60 },
      { type: "partner", weight: 30 },
      { type: "decoration", weight: 10 },
    ]

    const totalWeight = rewardTypes.reduce((sum, type) => sum + type.weight, 0)
    const random = Math.random() * totalWeight
    let currentWeight = 0
    let selectedType = "cash"

    for (const type of rewardTypes) {
      currentWeight += type.weight
      if (random <= currentWeight) {
        selectedType = type.type
        break
      }
    }

    let newReward = null

    if (selectedType === "cash") {
      const amounts = [5, 10, 50, 888]
      const weights = [50, 30, 15, 5] // 888元極低機率
      const totalAmountWeight = weights.reduce((sum, w) => sum + w, 0)
      const amountRandom = Math.random() * totalAmountWeight
      let currentAmountWeight = 0
      let selectedAmount = 5

      for (let i = 0; i < amounts.length; i++) {
        currentAmountWeight += weights[i]
        if (amountRandom <= currentAmountWeight) {
          selectedAmount = amounts[i]
          break
        }
      }

      newReward = {
        type: "cash",
        amount: selectedAmount,
        expiryDays: 7,
        obtained: new Date(),
      }

      setRewards((prev) => ({
        ...prev,
        cashVouchers: [...prev.cashVouchers, { ...newReward, id: Date.now() }],
      }))
    } else if (selectedType === "partner") {
      const partnerRewards = [
        { brand: "7-ELEVEN", value: "20元購物金", description: "7-ELEVEN 20元購物金" },
        { brand: "全家", value: "茶葉蛋兌換券", description: "全家茶葉蛋免費兌換券" },
        { brand: "cama café", value: "中杯美式買一送一", description: "cama café 中杯美式買一送一券" },
        { brand: "foodpanda", value: "50元外送優惠", description: "foodpanda 50元外送優惠碼" },
      ]

      const selectedPartner = partnerRewards[Math.floor(Math.random() * partnerRewards.length)]
      newReward = {
        type: "partner",
        ...selectedPartner,
        obtained: new Date(),
      }

      setRewards((prev) => ({
        ...prev,
        partnerVouchers: [...prev.partnerVouchers, { ...newReward, id: Date.now() }],
      }))
    }

    setLastReward(newReward)
    setShowRewardModal(true)
    setChestAvailable(false)
  }

  const diamondShopItems = [
    { id: 1, name: "信貸利率減免券 (-0.1%)", cost: 5, type: "service", description: "下次申請信貸時享有利率優惠" },
    { id: 2, name: "基金申購手續費 3 折券", cost: 3, type: "service", description: "基金申購手續費享 3 折優惠" },
    { id: 3, name: "外幣換匯減分券", cost: 2, type: "service", description: "外幣換匯享減分優惠" },
    { id: 4, name: "跨行轉帳免手續費 x5", cost: 1, type: "service", description: "5次跨行轉帳免手續費" },
    {
      id: 5,
      name: "幸福燈塔",
      cost: 10,
      type: "decoration",
      description: "房貸戶專屬莊園裝飾",
      requiresMortgage: true,
    },
    { id: 6, name: "金色屋頂", cost: 8, type: "decoration", description: "房貸戶專屬莊園裝飾", requiresMortgage: true },
  ]

  const purchaseFromDiamondShop = (item) => {
    if (resources.diamonds < item.cost) return

    setResources((prev) => ({
      ...prev,
      diamonds: prev.diamonds - item.cost,
    }))

    if (item.type === "service") {
      setRewards((prev) => ({
        ...prev,
        serviceVouchers: [
          ...prev.serviceVouchers,
          {
            id: Date.now(),
            type: item.id,
            description: item.name,
            obtained: new Date(),
          },
        ],
      }))
    } else if (item.type === "decoration") {
      setRewards((prev) => ({
        ...prev,
        decorations: prev.decorations.map((dec) => (dec.name === item.name ? { ...dec, unlocked: true } : dec)),
      }))
    }
  }

  const plantRealTree = () => {
    if (!treePlantingUnlocked || plant.level < 100) return

    // Simulate tree planting process
    setRewards((prev) => ({
      ...prev,
      decorations: [
        ...prev.decorations,
        {
          id: Date.now(),
          name: "真樹紀念碑",
          rarity: "ultimate",
          unlocked: true,
          description: "感謝您的用心培育，土地銀行已以您的名義種下一棵真正的樹苗！",
          treeId: `TREE-${Date.now()}`,
          location: "台灣山林保育區",
          coordinates: "24.1477°N, 120.6736°E",
        },
      ],
    }))

    setTreePlantingUnlocked(false)
  }

  const harvestFruit = () => {
    if (!canHarvestFruit || plant.level < 50) return

    // Random rewards from fruit
    const rewards = [
      { waterDrops: 5, sunlight: 0, diamonds: 0 },
      { waterDrops: 0, sunlight: 3, diamonds: 0 },
      { waterDrops: 2, sunlight: 2, diamonds: 0 },
      { waterDrops: 0, sunlight: 0, diamonds: 1 },
    ]

    const reward = rewards[Math.floor(Math.random() * rewards.length)]
    setResources((prev) => ({
      waterDrops: prev.waterDrops + reward.waterDrops,
      sunlight: prev.sunlight + reward.sunlight,
      diamonds: prev.diamonds + reward.diamonds,
    }))

    setCanHarvestFruit(false)
    // Reset harvest availability after 24 hours (simulated as 10 seconds for demo)
    setTimeout(() => setCanHarvestFruit(true), 10000)
  }

  const handleTreeClick = () => {
    if (plant.level >= 15) {
      // Random chance to drop resources
      if (Math.random() < 0.3) {
        setResources((prev) => ({ ...prev, waterDrops: prev.waterDrops + 1 }))
        triggerMicroGrowth()
      }
    }
  }

  const waterPlant = () => {
    // Implementation for watering the plant
    addExperience(5)
    setIsWatering(true)
    setTimeout(() => setIsWatering(false), 1000)
  }

  const giveSunlight = () => {
    // Implementation for giving sunlight to the plant
    addExperience(15)
    setIsSunbathing(true)
    setTimeout(() => setIsSunbathing(false), 1000)
  }

  const giveSpecialCare = () => {
    // Implementation for giving special care to the plant
    addExperience(50)
    setIsGrowing(true)
    setTimeout(() => setIsGrowing(false), 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-accent-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">小屋打造</h1>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <Card className="bg-background/10 border-accent-foreground/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-xs text-accent-foreground/80">水滴</p>
                  <p className="font-bold text-accent-foreground">{resources.waterDrops}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/10 border-accent-foreground/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-yellow-400" />
                <div>
                  <p className="text-xs text-accent-foreground/80">陽光</p>
                  <p className="font-bold text-accent-foreground">{resources.sunlight}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/10 border-accent-foreground/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Gem className="h-4 w-4 text-purple-400" />
                <div>
                  <p className="text-xs text-accent-foreground/80">鑽石</p>
                  <p className="font-bold text-accent-foreground">{resources.diamonds}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="bg-background/10 border-accent-foreground/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-accent-foreground/80 text-sm">目前等級</p>
                <p className="text-xl font-bold text-accent-foreground">
                  {getGrowthStageInfo(plant.level).name} Lv.{plant.level}
                </p>
                <p className="text-xs text-accent-foreground/60 mt-1">{plant.plantName}</p>
              </div>
              <Badge variant="secondary" className="bg-background text-accent">
                {plant.xp}/{plant.nextLevelXp} XP
              </Badge>
            </div>
            <Progress value={plant.progress} className="h-3 mb-2" />
            <p className="text-xs text-accent-foreground/80">距離下一級還需 {plant.nextLevelXp - plant.xp} 經驗值</p>
          </CardContent>
        </Card>
      </header>

      {/* Tab Navigation */}
      <div className="p-4">
        <div className="flex bg-muted rounded-lg p-1 mb-4">
          <Button
            variant={selectedTab === "garden" ? "default" : "ghost"}
            className="flex-1 rounded-md text-xs"
            onClick={() => setSelectedTab("garden")}
          >
            建造進度
          </Button>
          <Button
            variant={selectedTab === "onboarding" ? "default" : "ghost"}
            className="flex-1 rounded-md text-xs"
            onClick={() => setSelectedTab("onboarding")}
          >
            新手任務
          </Button>
          <Button
            variant={selectedTab === "tasks" ? "default" : "ghost"}
            className="flex-1 rounded-md text-xs"
            onClick={() => setSelectedTab("tasks")}
          >
            每日任務
          </Button>
          <Button
            variant={selectedTab === "achievements" ? "default" : "ghost"}
            className="flex-1 rounded-md text-xs"
            onClick={() => setSelectedTab("achievements")}
          >
            成就
          </Button>
        </div>

        {/* Garden View */}
        {selectedTab === "garden" && (
          <div className="space-y-4">
            {/* Virtual Garden */}
            <Card>
              <CardContent className="p-6">
                {chestAvailable && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-yellow-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="h-6 w-6 text-yellow-600" />
                        <div>
                          <p className="font-semibold text-yellow-800">升級寶箱可開啟！</p>
                          <p className="text-sm text-yellow-600">點擊開啟獲得驚喜獎勵</p>
                        </div>
                      </div>
                      <Button onClick={openChest} className="bg-yellow-500 hover:bg-yellow-600">
                        開啟寶箱
                      </Button>
                    </div>
                  </div>
                )}

                <div
                  className={`relative aspect-square rounded-lg mb-4 overflow-hidden transition-all duration-1000 ${
                    isGrowing ? "scale-105 shadow-lg" : ""
                  } ${getBackgroundStyle(plant.level)}`}
                >
                  {plant.level >= 5 && (
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-200 to-blue-100"></div>
                  )}

                  {/* Ground with level-based improvements */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-2/3 transition-all duration-1000 ${
                      plant.level >= 15
                        ? "bg-gradient-to-t from-green-300 to-green-200"
                        : plant.level >= 5
                          ? "bg-gradient-to-t from-green-200 to-green-100"
                          : "bg-gradient-to-t from-amber-200 to-amber-100"
                    } ${isGrowing ? "from-green-400 to-green-300" : ""}`}
                  ></div>

                  {plant.level >= 30 && (
                    <>
                      <div className="absolute bottom-4 left-4 w-8 h-6 bg-amber-600 rounded-sm"></div>
                      <div className="absolute bottom-6 left-5 w-6 h-4 bg-red-600 rounded-t-full"></div>
                      <div className="absolute bottom-2 right-8 w-1 h-8 bg-amber-800"></div>
                      <div className="absolute bottom-8 right-6 w-5 h-5 bg-yellow-200 rounded-full"></div>
                    </>
                  )}

                  {/* Tree (Main Character) with click interaction */}
                  <div
                    className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 cursor-pointer ${
                      isGrowing ? "scale-110" : ""
                    } ${showMicroGrowth ? "scale-105" : ""}`}
                    onClick={handleTreeClick}
                  >
                    {renderTree()}
                  </div>

                  {/* Flowers */}
                  {gardenItems.find((item) => item.name === "花朵")?.unlocked && (
                    <>
                      <div className="absolute bottom-6 left-8 w-3 h-3 bg-pink-400 rounded-full"></div>
                      <div className="absolute bottom-4 right-12 w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="absolute bottom-8 left-20 w-3 h-3 bg-purple-400 rounded-full"></div>
                    </>
                  )}

                  {/* Level indicator */}
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">Lv.{plant.level}</Badge>

                  {showMicroGrowth && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Sparkles className="h-8 w-8 text-green-400 animate-ping" />
                    </div>
                  )}
                </div>

                <div className="text-center mb-4">
                  <h3 className="font-semibold mb-2">我的{getGrowthStageInfo(plant.level).name}正在茁壯成長！</h3>
                  <p className="text-sm text-muted-foreground">{getGrowthStageInfo(plant.level).description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={waterPlant}
                    disabled={resources.waterDrops < 1 || isWatering}
                  >
                    <Droplets className="h-4 w-4 mr-2" />
                    澆水 ({resources.waterDrops < 1 ? "0" : "1"} 💧)
                  </Button>

                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={giveSunlight}
                    disabled={resources.sunlight < 1 || isSunbathing}
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    曬太陽 ({resources.sunlight < 1 ? "0" : "1"} ☀️)
                  </Button>
                </div>

                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={giveSpecialCare}
                  disabled={resources.diamonds < 1 || isGrowing}
                >
                  <Gem className="h-4 w-4 mr-2" />
                  特殊照料 ({resources.diamonds < 1 ? "0" : "1"} 💎)
                </Button>

                {plant.level >= 50 && (
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-3"
                    onClick={harvestFruit}
                    disabled={!canHarvestFruit}
                  >
                    <Apple className="h-4 w-4 mr-2" />
                    收穫果實 {!canHarvestFruit && "(24小時後可再次收穫)"}
                  </Button>
                )}

                <p className="text-xs text-muted-foreground mt-2 text-center">
                  澆水 +5 XP • 曬太陽 +15 XP • 特殊照料 +50 XP
                  {plant.level >= 15 && " • 點擊樹幹有驚喜！"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gem className="h-5 w-5 text-purple-600" />
                  核心金融行為
                </CardTitle>
                <p className="text-sm text-muted-foreground">完成重要的金融行為，獲得珍貴的鑽石獎勵</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {coreFinancialTasks.map((task) => {
                  const IconComponent = task.icon
                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border ${
                        task.completed ? "border-purple-300 bg-purple-100" : "border-purple-200 bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            task.completed ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {task.completed ? <CheckCircle className="h-5 w-5" /> : <IconComponent className="h-5 w-5" />}
                        </div>

                        <div className="flex-1">
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <Badge variant="outline" className="mt-1 text-xs border-purple-300 text-purple-700">
                            {task.frequency}
                          </Badge>
                        </div>

                        <div className="text-right">
                          <Badge className="bg-purple-600 text-white text-xs mb-1">+{task.reward.diamonds} 💎</Badge>
                          {task.completed ? (
                            <p className="text-xs text-purple-600">已完成</p>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs bg-transparent border-purple-300 text-purple-600"
                              onClick={() => completeTask(task.id, "core")}
                            >
                              完成任務
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Garden Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">裝潢收藏</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {gardenItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg border text-center ${
                        item.unlocked ? "border-accent bg-accent/5" : "border-muted bg-muted/30"
                      }`}
                    >
                      <div className={`text-2xl mb-2 ${item.unlocked ? "" : "grayscale opacity-50"}`}>
                        {item.name === "小樹苗" && "🏠"}
                        {item.name === "花朵" && "🪟"}
                        {item.name === "蝴蝶" && "🚪"}
                        {item.name === "彩虹" && "🏡"}
                      </div>
                      <p className="font-medium text-sm">{item.name}</p>
                      {item.unlocked ? (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          Lv.{item.level}
                        </Badge>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-1">未解鎖</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Onboarding Tasks View */}
        {selectedTab === "onboarding" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">新手村任務</CardTitle>
                  <Badge variant="outline">
                    {onboardingTasks.filter((task) => task.completed).length}/{onboardingTasks.length}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">完成新手任務，快速學會所有功能！</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {onboardingTasks.map((task) => {
                  const IconComponent = task.icon
                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border ${
                        task.completed ? "border-accent bg-accent/5" : "border-border bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            task.completed ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {task.completed ? <CheckCircle className="h-5 w-5" /> : <IconComponent className="h-5 w-5" />}
                        </div>

                        <div className="flex-1">
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>

                        <div className="text-right">
                          <div className="flex gap-1 mb-1">
                            {task.reward.waterDrops > 0 && (
                              <Badge className="bg-blue-500 text-white text-xs">+{task.reward.waterDrops} 💧</Badge>
                            )}
                            {task.reward.sunlight > 0 && (
                              <Badge className="bg-yellow-500 text-white text-xs">+{task.reward.sunlight} ☀️</Badge>
                            )}
                            {task.reward.diamonds > 0 && (
                              <Badge className="bg-purple-600 text-white text-xs">+{task.reward.diamonds} 💎</Badge>
                            )}
                          </div>
                          {task.completed ? (
                            <p className="text-xs text-accent">已完成</p>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs bg-transparent"
                              onClick={() => completeTask(task.id, "onboarding")}
                            >
                              完成任務
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "tasks" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">每日任務</CardTitle>
                  <Badge variant="outline">
                    {dailyTasks.filter((task) => task.completed).length}/{dailyTasks.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {dailyTasks.map((task) => {
                  const IconComponent = task.icon
                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border ${
                        task.completed ? "border-accent bg-accent/5" : "border-border bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            task.completed ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {task.completed ? <CheckCircle className="h-5 w-5" /> : <IconComponent className="h-5 w-5" />}
                        </div>

                        <div className="flex-1">
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>

                        <div className="text-right">
                          <div className="flex gap-1 mb-1">
                            {task.reward.waterDrops > 0 && (
                              <Badge className="bg-blue-500 text-white text-xs">+{task.reward.waterDrops} 💧</Badge>
                            )}
                            {task.reward.sunlight > 0 && (
                              <Badge className="bg-yellow-500 text-white text-xs">+{task.reward.sunlight} ☀️</Badge>
                            )}
                            {task.reward.diamonds > 0 && (
                              <Badge className="bg-purple-600 text-white text-xs">+{task.reward.diamonds} 💎</Badge>
                            )}
                          </div>
                          {task.completed ? (
                            <p className="text-xs text-accent">已完成</p>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs bg-transparent"
                              onClick={() => completeTask(task.id, "daily")}
                            >
                              完成任務
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium text-sm">完成任務小提示</p>
                    <p className="text-xs text-muted-foreground">
                      💧 水滴：高頻次活躍行為 • ☀️ 陽光：高價值金融行為 • 💎 鑽石：核心金融行為
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "achievements" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">成就徽章</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border ${
                        achievement.unlocked
                          ? "border-accent bg-gradient-to-r from-accent/5 to-accent/10"
                          : "border-border bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-full ${
                            achievement.unlocked ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{achievement.title}</h4>
                            {achievement.unlocked && (
                              <Badge className="bg-accent text-accent-foreground text-xs">已解鎖</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>

                          {!achievement.unlocked && achievement.progress !== undefined && (
                            <div className="space-y-1">
                              <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                              <p className="text-xs text-muted-foreground">
                                進度: {achievement.progress}/{achievement.total}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <div className="flex gap-1 mb-1">
                            {achievement.reward.waterDrops > 0 && (
                              <Badge className="bg-blue-500 text-white text-xs">
                                +{achievement.reward.waterDrops} 💧
                              </Badge>
                            )}
                            {achievement.reward.sunlight > 0 && (
                              <Badge className="bg-yellow-500 text-white text-xs">
                                +{achievement.reward.sunlight} ☀️
                              </Badge>
                            )}
                            {achievement.reward.diamonds > 0 && (
                              <Badge className="bg-purple-600 text-white text-xs">
                                +{achievement.reward.diamonds} 💎
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDiamondShop(true)}
            className="flex items-center gap-1"
          >
            <span>💎</span>
            鑽石商店
          </Button>

          {treePlantingUnlocked && (
            <Button onClick={plantRealTree} className="bg-green-600 hover:bg-green-700 text-white">
              🌱 種下真樹
            </Button>
          )}
        </div>

        {showRewardModal && lastReward && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
              <div className="text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-lg font-semibold mb-2">恭喜獲得獎勵！</h3>
                {lastReward.type === "cash" && (
                  <div>
                    <p className="text-2xl font-bold text-green-600 mb-2">${lastReward.amount} 現金回饋券</p>
                    <p className="text-sm text-gray-600">有效期限：{lastReward.expiryDays} 天</p>
                  </div>
                )}
                {lastReward.type === "partner" && (
                  <div>
                    <p className="font-semibold text-blue-600 mb-1">{lastReward.brand}</p>
                    <p className="text-lg">{lastReward.value}</p>
                    <p className="text-sm text-gray-600 mt-2">{lastReward.description}</p>
                  </div>
                )}
                <Button onClick={() => setShowRewardModal(false)} className="mt-4 w-full">
                  太棒了！
                </Button>
              </div>
            </div>
          </div>
        )}

        {showDiamondShop && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">💎 鑽石商店</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowDiamondShop(false)}>
                  ✕
                </Button>
              </div>

              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  您目前擁有 <span className="font-semibold">{resources.diamonds}</span> 顆鑽石
                </p>
              </div>

              <div className="space-y-3">
                {diamondShopItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                        {item.requiresMortgage && <p className="text-xs text-orange-600 mt-1">* 房貸戶專屬</p>}
                      </div>
                      <div className="text-right ml-2">
                        <p className="text-sm font-semibold">💎 {item.cost}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => purchaseFromDiamondShop(item)}
                      disabled={resources.diamonds < item.cost}
                      className="w-full"
                    >
                      {resources.diamonds >= item.cost ? "兌換" : "鑽石不足"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
