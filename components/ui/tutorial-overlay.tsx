"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ArrowRight, ArrowLeft } from "lucide-react"

interface TutorialStep {
  target: string
  title: string
  content: string
  position: "top" | "bottom" | "left" | "right"
}

interface TutorialOverlayProps {
  steps: TutorialStep[]
  onComplete: () => void
  onSkip: () => void
}

export default function TutorialOverlay({ steps, onComplete, onSkip }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      {/* Spotlight effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/70" />
        {/* This would typically use more complex positioning based on target element */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-transparent border-4 border-accent rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.7)]" />
      </div>

      {/* Tutorial Card */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-20">
        <Card className="w-80 bg-background border-accent">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{currentStepData.title}</h3>
                <p className="text-sm text-muted-foreground">{currentStepData.content}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onSkip} className="ml-2">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-accent" : "bg-muted"}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button variant="outline" size="sm" onClick={handlePrevious}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    上一步
                  </Button>
                )}
                <Button size="sm" onClick={handleNext} className="bg-accent hover:bg-accent/90">
                  {currentStep < steps.length - 1 ? (
                    <>
                      下一步
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    "完成"
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm" onClick={onSkip} className="text-muted-foreground">
                跳過教學
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
