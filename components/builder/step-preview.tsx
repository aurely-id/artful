'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Package, 
  Sparkles, 
  ShoppingBag,
  Check
} from 'lucide-react'
import { useBuilderStore, useCartStore } from '@/lib/store'
import { formatPrice, categories } from '@/lib/data'
import { MagicButton } from '@/components/ui/magic-button'
import { toast } from 'sonner'

export function StepPreview() {
  const router = useRouter()
  const { 
    selectedBase, 
    selectedComponents, 
    message, 
    getTotalPrice,
    reset 
  } = useBuilderStore()
  const addToCart = useCartStore((state) => state.addItem)
  
  const baseInfo = categories.find(c => c.slug === selectedBase)
  
  const handleAddToCart = () => {
    if (!selectedBase) {
      toast.error('Please select a category first')
      return
    }
    
    const cartItem = {
      id: `custom-${Date.now()}`,
      type: 'custom' as const,
      name: `Custom ${baseInfo?.name || 'Gift Box'}`,
      selectedBase,
      selectedComponents,
      message,
      totalPrice: getTotalPrice(),
      quantity: 1
    }
    
    addToCart(cartItem as any)
    toast.success('Added to cart!')
    reset()
    router.push('/cart')
  }
  
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20"
        >
          <Sparkles className="h-8 w-8 text-primary" />
        </motion.div>
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          Your Magic is Ready!
        </h2>
        <p className="mt-2 text-muted-foreground">
          Review your creation before adding to cart
        </p>
      </div>
      
      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl border-2 border-primary/20 bg-card shadow-lg"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold">
                {baseInfo?.name || 'Your Custom Gift'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {baseInfo?.count} items available
              </p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="divide-y p-6">
          {/* Category */}
          <div className="pb-4">
            <h4 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Category
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{baseInfo?.name}</p>
                  <p className="text-xs text-muted-foreground">{baseInfo?.description}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Components */}
          {selectedComponents.length > 0 && (
            <div className="py-4">
              <h4 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Selected Items ({selectedComponents.length})
              </h4>
              <div className="space-y-2">
                {selectedComponents.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">
                        {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Message */}
          {message && (
            <div className="py-4">
              <h4 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Personal Message
              </h4>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="whitespace-pre-wrap font-serif italic text-foreground">
                  {`"${message}"`}
                </p>
              </div>
            </div>
          )}
          
          {/* Total */}
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg font-semibold">Total</span>
              <span className="font-serif text-2xl font-bold text-primary">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <MagicButton
          size="lg"
          onClick={handleAddToCart}
          className="sm:w-auto"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </MagicButton>
      </div>
    </div>
  )
}
