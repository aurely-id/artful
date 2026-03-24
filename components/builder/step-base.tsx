'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, Gift, Shirt, Briefcase, Cookie, PartyPopper } from 'lucide-react'
import { useBuilderStore } from '@/lib/store'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ReactNode> = {
  Gift: <Gift className="h-12 w-12" />,
  Shirt: <Shirt className="h-12 w-12" />,
  Briefcase: <Briefcase className="h-12 w-12" />,
  Cookie: <Cookie className="h-12 w-12" />,
  PartyPopper: <PartyPopper className="h-12 w-12" />,
  Sparkles: <Sparkles className="h-12 w-12" />,
}

export function StepBase() {
  const { selectedBase, setBase } = useBuilderStore()
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          Choose Your Category
        </h2>
        <p className="mt-2 text-muted-foreground">
          Select the category for your magical gift creation
        </p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => {
          const isSelected = selectedBase === category.slug
          
          return (
            <motion.button
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setBase(category.slug)}
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
                  <div className={cn(
                    "transition-all duration-300",
                    isSelected ? "text-primary" : "text-primary/30 group-hover:text-primary/50"
                  )}>
                    {iconMap[category.icon] || <Sparkles className="h-12 w-12" />}
                  </div>
                </div>
                
                {/* Glow Effect */}
                {isSelected && (
                  <div className="absolute inset-0 animate-glow rounded-xl" />
                )}
              </div>
              
              {/* Info */}
              <div className="mt-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-serif text-lg font-medium">{category.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{category.count} items</span>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
