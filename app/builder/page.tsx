'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react'
import { useBuilderStore } from '@/lib/store'
import { MagicButton } from '@/components/ui/magic-button'
import { StepBase } from '@/components/builder/step-base'
import { StepComponents } from '@/components/builder/step-components'
import { StepMessage } from '@/components/builder/step-message'
import { StepPreview } from '@/components/builder/step-preview'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const steps = [
  { id: 1, name: 'Choose Base', description: 'Select your foundation' },
  { id: 2, name: 'Add Items', description: 'Pick components' },
  { id: 3, name: 'Magic Message', description: 'Add a personal note' },
  { id: 4, name: 'Preview', description: 'Review your creation' },
]

export default function BuilderPage() {
  const { currentStep, setStep, nextStep, prevStep, selectedBase, selectedComponents } = useBuilderStore()
  
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!selectedBase
      case 2:
        return selectedComponents.length > 0
      case 3:
        return true // Message is optional
      case 4:
        return true
      default:
        return false
    }
  }
  
  const handleNext = () => {
    if (!canProceed()) {
      if (currentStep === 1) {
        toast.error('Please select a base to continue')
      } else if (currentStep === 2) {
        toast.error('Please add at least one item')
      }
      return
    }
    nextStep()
  }
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepBase />
      case 2:
        return <StepComponents />
      case 3:
        return <StepMessage />
      case 4:
        return <StepPreview />
      default:
        return <StepBase />
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="font-serif text-3xl font-bold md:text-4xl">
              Custom Gift Builder
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-muted-foreground"
          >
            Create a magical gift in 4 simple steps
          </motion.p>
        </div>
        
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
      </section>
      
      {/* Progress Steps */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-center gap-2 md:gap-4">
              {steps.map((step, index) => {
                const isCompleted = currentStep > step.id
                const isCurrent = currentStep === step.id
                
                return (
                  <li key={step.id} className="flex items-center">
                    <button
                      onClick={() => {
                        if (isCompleted || isCurrent) {
                          setStep(step.id)
                        }
                      }}
                      disabled={!isCompleted && !isCurrent}
                      className={cn(
                        "flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-all md:px-4",
                        isCompleted && "text-primary hover:bg-primary/10",
                        isCurrent && "bg-primary text-primary-foreground shadow-md",
                        !isCompleted && !isCurrent && "text-muted-foreground cursor-not-allowed"
                      )}
                    >
                      <span className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                        isCompleted && "bg-primary text-primary-foreground",
                        isCurrent && "bg-primary-foreground text-primary",
                        !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                      )}>
                        {isCompleted ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          step.id
                        )}
                      </span>
                      <span className="hidden md:block">{step.name}</span>
                    </button>
                    
                    {index < steps.length - 1 && (
                      <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground md:mx-2" />
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation */}
      {currentStep < 4 && (
        <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <MagicButton
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </MagicButton>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Step {currentStep} of {steps.length}
              </p>
            </div>
            
            <MagicButton onClick={handleNext}>
              {currentStep === 3 ? 'Preview' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </MagicButton>
          </div>
        </div>
      )}
    </div>
  )
}
