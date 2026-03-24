'use client'

import { use, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { ProductCard } from '@/components/product/product-card'
import { 
  categories, 
  products, 
  getCategoryBySlug, 
  getProductsByCategory,
  formatPrice,
  type Category 
} from '@/lib/data'
import { cn } from '@/lib/utils'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

const allTags = ['birthday', 'anniversary', 'graduation', 'thank-you', 'romantic', 'wedding', 'congratulations', 'get-well']

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params)
  const category = getCategoryBySlug(slug)
  
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [sortBy, setSortBy] = useState('featured')
  
  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 font-serif text-2xl font-bold">Category Not Found</h1>
          <Link href="/catalog">
            <Button>Back to Catalog</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  const categoryProducts = getProductsByCategory(slug)
  
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(product => {
      // Tags
      if (selectedTags.length > 0 && !selectedTags.some(tag => product.tags.includes(tag))) {
        return false
      }
      
      // Price
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }
      
      return true
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return b.id - a.id
        default:
          return 0
      }
    })
  }, [categoryProducts, selectedTags, priceRange, sortBy])
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{category.name}</span>
          </nav>
          
          {/* Title */}
          <div className="space-y-2">
            <h1 className="font-serif text-4xl font-bold md:text-5xl">
              {category.name}
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="hidden space-y-6 lg:block">
            {/* Sort */}
            <div className="space-y-3">
              <h3 className="font-serif font-semibold">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            
            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="font-serif font-semibold">Price Range</h3>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={1000000}
                step={10000}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
            
            {/* Tags */}
            <div className="space-y-3">
              <h3 className="font-serif font-semibold">Occasion</h3>
              <div className="space-y-2">
                {allTags.map(tag => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <label
                      htmlFor={tag}
                      className="cursor-pointer text-sm capitalize"
                    >
                      {tag.replace('-', ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {categoryProducts.length} products
              </p>
              <Button variant="outline" size="sm" className="lg:hidden gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </Button>
            </div>
            
            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 p-12 text-center">
                <p className="text-muted-foreground">
                  No products match your filters. Try adjusting your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
