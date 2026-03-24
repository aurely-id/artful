'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Trash2, Sparkles, Package } from 'lucide-react'
import { useBuilderStore } from '@/lib/store'
import { products, subcategories, formatPrice } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export function StepComponents() {
  const { 
    selectedBase, 
    selectedComponents, 
    addItem, 
    removeItem, 
    updateItemQuantity,
    getTotalPrice 
  } = useBuilderStore()
  
  const categorySubcats = selectedBase ? subcategories[selectedBase] || [] : []
  const [activeSubcategory, setActiveSubcategory] = useState<string>(categorySubcats[0] || '')
  
  const categoryProducts = selectedBase 
    ? products.filter(p => p.category === selectedBase)
    : []
  
  const filteredProducts = activeSubcategory 
    ? categoryProducts.filter(p => p.subcategory === activeSubcategory)
    : categoryProducts
  
  const getItemQuantity = (itemId: number) => {
    const item = selectedComponents.find(c => c.id === String(itemId))
    return item?.quantity || 0
  }
  
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Product Selection */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">
            Add Your Magic Items
          </h2>
          <p className="mt-2 text-muted-foreground">
            Select products to fill your custom gift
          </p>
        </div>
        
        {categorySubcats.length > 0 && (
          <div className="mb-6">
            <Tabs value={activeSubcategory} onValueChange={setActiveSubcategory}>
              <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))` }}>
                {categorySubcats.map(subcat => (
                  <TabsTrigger key={subcat} value={subcat} className="text-xs md:text-sm">
                    {subcat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
        
        <ScrollArea className="h-[600px] rounded-lg border p-4">
          <div className="grid gap-4 pr-4 sm:grid-cols-2">
            {filteredProducts.map((product) => {
              const quantity = getItemQuantity(product.id)
              const isSelected = quantity > 0
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border-2 p-3 transition-all",
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  )}
                >
                  {/* Image Placeholder */}
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <Sparkles className="h-8 w-8 text-primary/30" />
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="mt-3 space-y-2">
                    <h4 className="text-sm font-medium line-clamp-2">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-semibold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      
                      {isSelected ? (
                        <div className="flex items-center gap-1 rounded-full border border-primary bg-primary/10 px-2 py-1">
                          <button
                            onClick={() => updateItemQuantity(String(product.id), Math.max(0, quantity - 1))}
                            className="text-primary hover:text-primary"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-4 text-center text-xs font-medium">{quantity}</span>
                          <button
                            onClick={() => updateItemQuantity(String(product.id), quantity + 1)}
                            className="text-primary hover:text-primary"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addItem({
                            id: String(product.id),
                            name: product.name,
                            price: product.price,
                            description: product.description,
                            category: product.category,
                            subcategory: product.subcategory
                          })}
                          className="h-7 w-7 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>
      </div>
      
      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-2xl border bg-card p-4">
          <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold">
            <Package className="h-5 w-5 text-primary" />
            Your Magic Box
          </h3>
          
          {/* Selected Components */}
          <ScrollArea className="h-[380px]">
            <AnimatePresence mode="popLayout">
              {selectedComponents.length > 0 ? (
                <div className="space-y-2 pr-3">
                  {selectedComponents.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between rounded-lg border bg-background p-2"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted">
                          <Sparkles className="h-4 w-4 text-primary/50" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatPrice(item.price)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <p className="text-sm font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 flex-col items-center justify-center text-center">
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
