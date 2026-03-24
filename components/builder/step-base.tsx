'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { useBuilderStore } from '@/lib/store'
import { bases, formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'

export function StepBase() {
  const { selectedBase, selectBase } = useBuilderStore()
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          Choose Your Base
        </h2>
        <p className="mt-2 text-muted-foreground">
          Select the perfect foundation for your magical creation
        </p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bases.map((base, index) => {
          const isSelected = selectedBase?.id === base.id
          
          return (
            <motion.button
              key={base.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => selectBase(base)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border-2 bg-card p-4 text-left transition-all duration-300",
                isSelected 
                  ? "border-primary shadow-lg shadow-primary/20" 
                  : "border-border hover:border-primary/50 hover:shadow-md"
              )}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                >
                  <Check className="h-4 w-4 text-primary-foreground" />
                </motion.div>
              )}
              
              {/* Image Placeholder */}
              <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                  <Sparkles className={cn(
                    "h-12 w-12 transition-all duration-300",
                    isSelected ? "text-primary" : "text-primary/30 group-hover:text-primary/50"
                  )} />
                </div>
                
                {/* Glow Effect */}
                {isSelected && (
                  <div className="absolute inset-0 animate-glow rounded-xl" />
                )}
              </div>
              
              {/* Info */}
              <div className="mt-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-serif text-lg font-medium">{base.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {base.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{base.size}</span>
                  <span className="font-serif text-lg font-semibold text-primary">
                    {formatPrice(base.price)}
                  </span>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
