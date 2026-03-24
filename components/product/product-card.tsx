'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ShoppingBag, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatPrice, type Product } from '@/lib/data'
import { useCartStore, type CartItem } from '@/lib/store'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const cartItem: CartItem = {
      id: `product-${product.id}-${Date.now()}`,
      type: 'product',
      product,
      totalPrice: product.price,
      quantity: 1
    }
    
    addItem(cartItem)
    toast.success(`${product.name} added to cart!`)
  }
  
  const getBadgeInfo = () => {
    if (product.isBestSeller) {
      return { text: 'Best Seller', variant: 'default' as const }
    }
    if (product.isNew) {
      return { text: 'New', variant: 'secondary' as const }
    }
    return null
  }
  
  const badgeInfo = getBadgeInfo()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn("group relative", className)}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
          {/* Product Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="h-16 w-16 text-primary/20" />
          </div>
          
          {/* Badge */}
          {badgeInfo && (
            <Badge 
              variant={badgeInfo.variant}
              className="absolute left-3 top-3 z-10"
            >
              {badgeInfo.text}
            </Badge>
          )}
          
          {/* Quick Add Button */}
          <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button 
              onClick={handleAddToCart}
              className="w-full gap-2 rounded-xl bg-background/90 text-foreground shadow-lg backdrop-blur hover:bg-background"
            >
              <ShoppingBag className="h-4 w-4" />
              Quick Add
            </Button>
          </div>
          
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 ring-2 ring-primary/50 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        
        {/* Product Info */}
        <div className="mt-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-base font-medium leading-tight text-foreground line-clamp-2">
              {product.name}
            </h3>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
