'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Grid3X3, List, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ProductCard } from '@/components/product/product-card'
import { products, formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'

const categories = ['All', 'Flowers', 'Snacks', 'Special', 'Wellness', 'Comfort']
const tags = ['birthday', 'anniversary', 'graduation', 'thank-you', 'romantic', 'get-well', 'congratulations']

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      // Category
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false
      }
      
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
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return a.badge === 'New' ? -1 : 1
        default:
          return a.badge === 'Best Seller' ? -1 : 1
      }
    })
  }, [searchQuery, selectedCategory, selectedTags, priceRange, sortBy])
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedTags([])
    setPriceRange([0, 1000000])
  }
  
  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedTags.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000000
  
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 font-medium">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Tags */}
      <div>
        <h3 className="mb-3 font-medium">Occasions</h3>
        <div className="space-y-2">
          {tags.map(tag => (
            <label key={tag} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => toggleTag(tag)}
              />
              <span className="text-sm capitalize">{tag.replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div>
        <h3 className="mb-3 font-medium">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={1000000}
          step={50000}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
      
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  )
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-serif text-3xl font-bold md:text-4xl">
              Our Collection
            </h1>
            <p className="mt-2 text-muted-foreground">
              Discover curated gift bundles for every occasion
            </p>
          </motion.div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-4">
            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      Active
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            
            {/* View Toggle */}
            <div className="hidden items-center rounded-lg border p-1 md:flex">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedCategory !== 'All' && (
              <Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedTags.map(tag => (
              <Badge key={tag} variant="secondary" className="gap-1 capitalize">
                {tag.replace('-', ' ')}
                <button onClick={() => toggleTag(tag)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 1000000) && (
              <Badge variant="secondary" className="gap-1">
                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                <button onClick={() => setPriceRange([0, 1000000])}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border bg-card p-6">
              <h2 className="mb-4 font-serif text-lg font-semibold">Filters</h2>
              <FilterContent />
            </div>
          </aside>
          
          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
                <div className={cn(
                  "grid gap-6",
                  viewMode === 'grid' 
                    ? "sm:grid-cols-2 xl:grid-cols-3" 
                    : "grid-cols-1"
                )}>
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
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="font-serif text-xl font-semibold">No products found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
