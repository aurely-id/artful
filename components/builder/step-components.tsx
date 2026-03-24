'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Trash2, Sparkles, Package } from 'lucide-react'
import { useBuilderStore } from '@/lib/store'
import { builderItems, formatPrice, getComponentsByCategory, type BuilderItem } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'flowers', label: 'Flowers', icon: '🌸' },
  { id: 'snacks', label: 'Snacks', icon: '🍫' },
  { id: 'photos', label: 'Photos', icon: '📷' },
  { id: 'accessories', label: 'Accessories', icon: '✨' },
] as const

export function StepComponents() {
  const [activeCategory, setActiveCategory] = useState<BuilderItem['category']>('flowers')
  const { 
    selectedBase, 
    selectedComponents, 
    addComponent, 
    removeComponent, 
    updateComponentQuantity,
    getTotalPrice 
  } = useBuilderStore()
  
  const categoryComponents = getComponentsByCategory(activeCategory)
  
  const getComponentQuantity = (componentId: string) => {
    const item = selectedComponents.find(c => c.id === componentId)
    return item?.quantity || 0
  }
  
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Component Selection */}
      <div className="lg:col-span-2">
        <div className="mb-4">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">
            Add Your Magic
          </h2>
          <p className="mt-2 text-muted-foreground">
            Select items to fill your {selectedBase?.name || 'box'}
          </p>
        </div>
        
        <Tabs 
          value={activeCategory} 
          onValueChange={(v) => setActiveCategory(v as Component['category'])}
          className="w-full"
        >
          <TabsList className="mb-4 grid w-full grid-cols-4">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="gap-1 text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">{cat.icon}</span>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0">
              <div className="grid gap-3 sm:grid-cols-2">
                {getComponentsByCategory(cat.id).map((component, index) => {
                  const quantity = getComponentQuantity(component.id)
                  const isSelected = quantity > 0
                  
                  return (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "group relative overflow-hidden rounded-xl border bg-card p-3 transition-all duration-300",
                        isSelected 
                          ? "border-primary shadow-md" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex gap-3">
                        {/* Image */}
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                            <Sparkles className="h-6 w-6 text-primary/30" />
                          </div>
                        </div>
                        
                        {/* Info */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h4 className="font-medium text-sm leading-tight">{component.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {component.description}
                            </p>
                          </div>
                          <p className="font-serif text-sm font-semibold text-primary">
                            {formatPrice(component.price)}
                          </p>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex flex-col items-center justify-center">
                          {isSelected ? (
                            <div className="flex items-center gap-1">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateComponentQuantity(component.id, quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-6 text-center text-sm font-medium">
                                {quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => addComponent(component)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 gap-1"
                              onClick={() => addComponent(component)}
                            >
                              <Plus className="h-3 w-3" />
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-2xl border bg-card p-4">
          <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold">
            <Package className="h-5 w-5 text-primary" />
            Your Magic Box
          </h3>
          
          {/* Base */}
          {selectedBase && (
            <div className="mb-4 rounded-lg bg-muted/50 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Base</p>
                  <p className="font-medium">{selectedBase.name}</p>
                </div>
                <p className="font-serif text-sm font-semibold">
                  {formatPrice(selectedBase.price)}
                </p>
              </div>
            </div>
          )}
          
          {/* Selected Components */}
          <ScrollArea className="h-[280px]">
            <AnimatePresence mode="popLayout">
              {selectedComponents.length > 0 ? (
                <div className="space-y-2 pr-2">
                  {selectedComponents.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between rounded-lg border bg-background p-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                          <Sparkles className="h-4 w-4 text-primary/50" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatPrice(item.price)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => removeComponent(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex h-32 flex-col items-center justify-center text-center">
                  <Package className="mb-2 h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    No items added yet
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Select items from the left
                  </p>
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>
          
          {/* Total */}
          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="font-serif text-xl font-bold text-primary">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
