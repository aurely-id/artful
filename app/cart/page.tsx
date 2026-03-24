'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  Sparkles,
  ArrowRight,
  Package
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagicButton } from '@/components/ui/magic-button'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  
  const subtotal = getTotalPrice()
  const shipping = subtotal > 500000 ? 0 : 25000
  const total = subtotal + shipping
  
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Looks like you have not added anything to your cart yet
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/builder">
              <MagicButton>
                <Sparkles className="h-4 w-4" />
                Create Magic
              </MagicButton>
            </Link>
            <Link href="/catalog">
              <MagicButton variant="outline">
                Browse Catalog
              </MagicButton>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="font-serif text-3xl font-bold">Shopping Cart</h1>
              <p className="mt-1 text-muted-foreground">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Button 
              variant="ghost" 
              className="text-muted-foreground"
              onClick={clearCart}
            >
              Clear All
            </Button>
          </motion.div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="mb-4"
                >
                  <div className="rounded-2xl border bg-card p-4 md:p-6">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted md:h-32 md:w-32">
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                          {item.type === 'custom' ? (
                            <Sparkles className="h-8 w-8 text-primary/30" />
                          ) : (
                            <Package className="h-8 w-8 text-primary/30" />
                          )}
                        </div>
                      </div>
                      
                      {/* Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-serif font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground capitalize">
                                {item.type === 'custom' ? 'Custom Creation' : 'Pre-made Bundle'}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {/* Custom item details */}
                          {item.type === 'custom' && item.components.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {item.components.slice(0, 3).map(comp => (
                                <span 
                                  key={comp.id}
                                  className="rounded-full bg-muted px-2 py-0.5 text-xs"
                                >
                                  {comp.name}
                                </span>
                              ))}
                              {item.components.length > 3 && (
                                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                                  +{item.components.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center rounded-full border">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          {/* Price */}
                          <p className="font-serif text-lg font-semibold">
                            {formatPrice(item.totalPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-24 rounded-2xl border bg-card p-6"
            >
              <h2 className="mb-4 font-serif text-xl font-semibold">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600">
                    Free shipping for orders over {formatPrice(500000)}
                  </p>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-serif text-xl font-bold text-primary">
                  {formatPrice(total)}
                </span>
              </div>
              
              <Link href="/checkout">
                <MagicButton className="mt-6 w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </MagicButton>
              </Link>
              
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Secure checkout powered by magic
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
