'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Package, 
  Heart, 
  MessageCircle, 
  ArrowRight,
  Star,
  Quote
} from 'lucide-react'
import { MagicButton } from '@/components/ui/magic-button'
import { ProductCard } from '@/components/product/product-card'
import { products, stories, formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'

const howItWorks = [
  {
    step: 1,
    title: 'Choose Your Base',
    description: 'Select from flower boxes, snack boxes, premium wraps, and more',
    icon: Package,
  },
  {
    step: 2,
    title: 'Add Magic Items',
    description: 'Pick flowers, snacks, photos, and accessories to fill your box',
    icon: Heart,
  },
  {
    step: 3,
    title: 'Write a Secret Message',
    description: 'Add a personal note with a beautiful envelope style',
    icon: MessageCircle,
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)
  const featuredStories = stories.slice(0, 3)
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-rose/20" />
        
        {/* Decorative Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-32 top-1/2 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-32 w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          
          {/* Floating sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className={cn(
                "text-primary/40",
                i % 2 === 0 ? "h-4 w-4" : "h-6 w-6"
              )} />
            </motion.div>
          ))}
        </div>
        
        {/* Content */}
        <div className="container relative mx-auto flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary"
          >
            <Sparkles className="h-4 w-4" />
            <span>Magic Gift House</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            <span className="text-balance">Every Gift Has Its</span>{' '}
            <span className="relative inline-block text-primary">
              Magic
              <motion.span
                className="absolute -right-6 -top-6"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-8 w-8 text-primary/60" />
              </motion.span>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Create unforgettable moments with custom gift boxes crafted just for your 
            special someone. Flowers, treats, memories - all wrapped in magic.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/builder">
              <MagicButton size="lg">
                <Sparkles className="h-5 w-5" />
                Start Creating Magic
                <ArrowRight className="h-5 w-5" />
              </MagicButton>
            </Link>
            <Link href="/catalog">
              <MagicButton variant="outline" size="lg">
                Browse Collections
              </MagicButton>
            </Link>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex items-center gap-8 text-center md:gap-16"
          >
            {[
              { value: '10K+', label: 'Happy Customers' },
              { value: '50+', label: 'Unique Items' },
              { value: '4.9', label: 'Average Rating' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="border-y bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            {...fadeInUp}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              How the Magic Works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Create your perfect gift in three simple steps
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative text-center"
              >
                {/* Connector Line */}
                {index < howItWorks.length - 1 && (
                  <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent md:block" />
                )}
                
                {/* Step Circle */}
                <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-serif font-bold text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                
                <h3 className="mb-2 font-serif text-xl font-semibold">{item.title}</h3>
                <p className="mx-auto max-w-xs text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link href="/builder">
              <MagicButton>
                Try the Builder
                <ArrowRight className="h-4 w-4" />
              </MagicButton>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row"
          >
            <div>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                Pre-Made Bundles
              </h2>
              <p className="mt-2 text-muted-foreground">
                Curated collections ready to spark joy
              </p>
            </div>
            <Link href="/catalog">
              <MagicButton variant="outline">
                View All
                <ArrowRight className="h-4 w-4" />
              </MagicButton>
            </Link>
          </motion.div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Custom Builder CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl border-2 border-primary/20 bg-card p-8 shadow-xl md:p-12"
          >
            <div className="flex flex-col items-center gap-8 md:flex-row">
              {/* Visual */}
              <div className="flex-1">
                <div className="relative mx-auto h-48 w-48 md:h-64 md:w-64">
                  <div className="absolute inset-0 animate-glow rounded-full bg-primary/20" />
                  <div className="absolute inset-4 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-secondary/30">
                    <Sparkles className="h-20 w-20 text-primary animate-float" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-serif text-2xl font-bold md:text-3xl">
                  Create Your Own Magic
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Design a one-of-a-kind gift that tells your unique story. 
                  Choose every element, add a heartfelt message, and create 
                  something truly magical.
                </p>
                <div className="mt-6">
                  <Link href="/builder">
                    <MagicButton size="lg">
                      Start Building
                      <ArrowRight className="h-4 w-4" />
                    </MagicButton>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Magic Stories (Testimonials) */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Magic Stories
            </h2>
            <p className="mt-3 text-muted-foreground">
              Real moments, real magic, real smiles
            </p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {featuredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <Quote className="mb-4 h-8 w-8 text-primary/30" />
                
                <p className="mb-6 text-muted-foreground italic line-clamp-4">
                  {`"${story.excerpt}"`}
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <span className="font-serif font-bold text-primary">
                      {story.author[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{story.author}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <Link 
                  href={`/stories/${story.id}`}
                  className="absolute inset-0"
                  aria-label={`Read ${story.author}'s story`}
                />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href="/stories">
              <MagicButton variant="outline">
                Read More Stories
                <ArrowRight className="h-4 w-4" />
              </MagicButton>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl"
          >
            <Sparkles className="mx-auto mb-6 h-12 w-12 text-primary" />
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Ready to Create Magic?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of happy customers who have shared love through our magical gifts.
            </p>
            <div className="mt-8">
              <Link href="/builder">
                <MagicButton size="lg">
                  <Sparkles className="h-5 w-5" />
                  Start Your Journey
                </MagicButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
