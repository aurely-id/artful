'use client'

import { use } from 'react'
import { notFound, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Sparkles,
  ChevronRight,
  Minus,
  Plus,
  Check
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MagicButton } from '@/components/ui/magic-button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProductCard } from '@/components/product/product-card'
import { products, getProductById, formatPrice } from '@/lib/data'
import { useCartStore, type CartItem } from '@/lib/store'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const product = getProductById(id)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const addToCart = useCartStore((state) => state.addItem)
  
  if (!product) {
    notFound()
  }
  
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4)
  
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      type: 'premade',
      name: product.name,
      components: [],
      totalPrice: product.price,
      quantity,
      image: product.image
    }
    
    addToCart(cartItem)
    toast.success(`${product.name} added to cart!`)
  }
  
  const handleCustomize = () => {
    router.push('/builder')
  }
  
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/catalog" className="hover:text-foreground">Catalog</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>
      
      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                  <Sparkles className="h-24 w-24 text-primary/20" />
                </div>
                
                {product.badge && (
                  <Badge 
                    className="absolute left-4 top-4"
                    variant={product.badge === 'Best Seller' ? 'default' : 'secondary'}
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>
              
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <button
                    key={i}
                    className={cn(
                      "aspect-square overflow-hidden rounded-xl border-2 bg-muted transition-all",
                      i === 0 ? "border-primary" : "border-transparent hover:border-primary/50"
                    )}
                  >
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                      <Sparkles className="h-6 w-6 text-primary/20" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
            
            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Header */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-muted text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
                
                <h1 className="font-serif text-3xl font-bold md:text-4xl">
                  {product.name}
                </h1>
                
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              
              <Separator />
              
              {/* Description */}
              <div>
                <h3 className="mb-2 font-medium">Description</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>
              
              {/* Tags */}
              <div>
                <h3 className="mb-2 font-medium">Perfect for</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="capitalize">
                      {tag.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div>
                <h3 className="mb-2 font-medium">Quantity</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-full border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {product.inStock && (
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <Check className="h-4 w-4" />
                      In Stock
                    </span>
                  )}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <MagicButton 
                  size="lg" 
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </MagicButton>
                <Button 
                  variant="outline" 
                  size="lg"
                  className={cn(
                    "transition-colors",
                    isWishlisted && "border-rose text-rose"
                  )}
                  onClick={() => {
                    setIsWishlisted(!isWishlisted)
                    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!')
                  }}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Customize CTA */}
              <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold">Want to customize?</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Use this bundle as inspiration and create your own unique gift
                    </p>
                    <Button 
                      variant="link" 
                      className="mt-2 h-auto p-0 text-primary"
                      onClick={handleCustomize}
                    >
                      Open Custom Builder
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 font-serif text-2xl font-bold">You May Also Like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
