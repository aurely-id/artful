'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Tag, ArrowRight, Sparkles, Quote } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { stories } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto flex items-center justify-center gap-2"
          >
            <Quote className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-primary">Real Stories, Real Magic</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-serif text-3xl font-bold md:text-5xl"
          >
            Magic Stories
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            Discover heartwarming stories from our community. Every gift carries a 
            story, and every story is a celebration of love and connection.
          </motion.p>
        </div>
        
        {/* Decorative */}
        <div className="pointer-events-none absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl" />
      </section>
      
      {/* Stories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Featured Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link 
              href={`/stories/${stories[0].id}`}
              className="group block overflow-hidden rounded-3xl border bg-card"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 to-secondary/10 md:aspect-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-20 w-20 text-primary/20" />
                  </div>
                  <Badge className="absolute left-4 top-4">Featured</Badge>
                </div>
                
                {/* Content */}
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(stories[0].date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {stories[0].tags.map(t => t.replace('-', ' ')).join(', ')}
                    </span>
                  </div>
                  
                  <h2 className="font-serif text-2xl font-bold transition-colors group-hover:text-primary md:text-3xl">
                    {stories[0].title}
                  </h2>
                  
                  <p className="mt-4 text-muted-foreground">
                    {stories[0].excerpt}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                      <span className="font-serif font-bold text-primary">
                        {stories[0].author[0]}
                      </span>
                    </div>
                    <span className="font-medium">{stories[0].author}</span>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-2 font-medium text-primary">
                    Read Full Story
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
          
          {/* Other Stories */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.slice(1).map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Link 
                  href={`/stories/${story.id}`}
                  className="group block overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-primary/20" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(story.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    
                    <h3 className="font-serif text-lg font-semibold transition-colors group-hover:text-primary line-clamp-2">
                      {story.title}
                    </h3>
                    
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {story.excerpt}
                    </p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {story.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs capitalize">
                          {tag.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                        <span className="text-xs font-bold text-primary">
                          {story.author[0]}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{story.author}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="mx-auto max-w-xl rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 p-8">
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h3 className="font-serif text-xl font-semibold">Share Your Story</h3>
              <p className="mt-2 text-muted-foreground">
                Have a magical moment to share? We would love to hear your story!
              </p>
              <Link 
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 font-medium text-primary hover:underline"
              >
                Submit Your Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
