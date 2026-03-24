import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles, Gift, Zap } from 'lucide-react'
import { MagicButton } from '@/components/ui/magic-button'

export const metadata: Metadata = {
  title: 'Artful - Create & Send Magic Gifts',
  description: 'Create personalized gift boxes with custom items and heartfelt messages',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="font-serif">Artful</span>
            </div>
            <Link href="/builder">
              <MagicButton>Create Gift</MagicButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Create magic, one gift at a time</span>
          </div>
          
          <h1 className="mx-auto max-w-3xl font-serif text-5xl font-bold leading-tight sm:text-6xl">
            Personalized Gifts, <span className="text-primary">Perfectly Crafted</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
            Design custom gift boxes with your favorite items and heartfelt messages. Make every moment special with thoughtfully personalized gifts.
          </p>
          
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/builder">
              <MagicButton size="lg" className="w-full gap-2 sm:w-auto">
                Start Creating
                <ArrowRight className="h-4 w-4" />
              </MagicButton>
            </Link>
            <button className="rounded-lg border border-border bg-background px-8 py-3 font-medium transition-all hover:border-primary hover:bg-primary/5">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-16 text-center font-serif text-3xl font-bold sm:text-4xl">
          Why Choose Artful?
        </h2>
        
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              icon: Gift,
              title: 'Fully Customizable',
              description: 'Choose from a wide variety of items to create your perfect gift box',
            },
            {
              icon: Zap,
              title: 'Quick & Easy',
              description: 'Design and order your gift in just 4 simple steps',
            },
            {
              icon: Sparkles,
              title: 'Personal Touch',
              description: 'Add heartfelt messages to make your gift extra special',
            },
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-8 transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 p-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">Ready to Create Magic?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Start designing your personalized gift today
          </p>
          <Link href="/builder">
            <MagicButton size="lg">
              Create Your Gift
              <ArrowRight className="h-4 w-4" />
            </MagicButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Artful. Create magic, one gift at a time.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
