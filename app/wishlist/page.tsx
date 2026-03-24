'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Trash2, ShoppingCart, ArrowLeft, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagicButton } from '@/components/ui/magic-button'
import { useWishlistStore } from '@/lib/store'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/data'
import { toast } from 'sonner'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const { addProduct } = useCartStore()
  
  const handleAddToCart = (product: any) => {
    addProduct(product)
    toast.success(`${product.name} added to cart!`)
  }
  
  const handleRemove = (productId: number) => {
    removeItem(productId)
    toast.success('Item removed from wishlist')
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold sm:text-4xl">
                My Wishlist
              </h1>
              <p className="mt-1 text-muted-foreground">
                {items.length} items saved
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-xl border bg-card transition-all hover:border-primary hover:shadow-lg"
              >
                {/* Image Placeholder */}
                <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <Heart className="mx-auto mb-2 h-12 w-12 text-primary/20" />
                      <p className="text-xs text-muted-foreground">Product Image</p>
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 bg-white/90 hover:bg-white"
                    onClick={() => handleRemove(product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                  
                  {/* Badge */}
                  {product.isBestSeller && (
                    <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      Best Seller
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="line-clamp-2 font-medium">{product.name}</h3>
                  
                  {/* Rating */}
                  {product.rating && (
                    <div className="mt-2 flex items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  )}
                  
                  {/* Price */}
                  <div className="mt-3 flex items-baseline gap-2">
                    <p className="font-serif text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </p>
                    {product.originalPrice && (
                      <p className="text-sm line-through text-muted-foreground">
                        {formatPrice(product.originalPrice)}
                      </p>
                    )}
                  </div>
                  
                  {/* Add to Cart Button */}
                  <Button
                    className="mt-4 w-full gap-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border bg-card py-20">
            <Heart className="mb-4 h-16 w-16 text-muted-foreground/30" />
            <h2 className="font-serif text-2xl font-bold">Your wishlist is empty</h2>
            <p className="mt-2 max-w-sm text-center text-muted-foreground">
              Start adding your favorite items to your wishlist and come back anytime
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/catalog">
                <MagicButton>Browse Catalog</MagicButton>
              </Link>
              <Link href="/builder">
                <Button variant="outline">Create Custom Gift</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
