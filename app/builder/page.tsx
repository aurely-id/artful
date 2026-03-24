'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useBuilderStore } from '@/lib/store'
import { StepBase } from '@/components/builder/step-base'
import { StepComponents } from '@/components/builder/step-components'
import { StepMessage } from '@/components/builder/step-message'
import { StepPreview } from '@/components/builder/step-preview'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const steps = [
  { id: 'base', title: 'Choose Category', component: StepBase },
  { id: 'components', title: 'Add Items', component: StepComponents },
  { id: 'message', title: 'Add Message', component: StepMessage },
  { id: 'preview', title: 'Review & Order', component: StepPreview },
]

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const { selectedBase, selectedComponents } = useBuilderStore()
  
  const CurrentStepComponent = steps[currentStep].component
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1
  
  const canProceed = () => {
    if (currentStep === 0) return !!selectedBase // Need to select base
    if (currentStep === 1) return selectedComponents.length > 0 // Need to select items
    return true
  }
  
  const handleNext = () => {
    if (canProceed() && !isLastStep) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  const progress = ((currentStep + 1) / steps.length) * 100
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
            Create Your Magic Gift
          </h1>
          <p className="mt-2 text-muted-foreground">
            Customize your perfect gift in just 4 steps
          </p>
        </motion.div>
        
        {/* Progress */}
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-xs text-muted-foreground">
                {steps[currentStep].title}
              </span>
            </div>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step Indicators */}
          <div className="mt-6 flex justify-between">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all ${
                    index < currentStep
                      ? 'border-primary bg-primary text-primary-foreground'
                      : index === currentStep
                        ? 'border-primary bg-background text-primary'
                        : 'border-border bg-background text-muted-foreground'
                  }`}
                >
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border bg-card p-8 shadow-sm"
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            disabled={isFirstStep}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep ? 'w-8 bg-primary' : 'w-2 bg-muted'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
          
          <Button
            size="lg"
            onClick={handleNext}
            disabled={!canProceed() || isLastStep}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  )
}
