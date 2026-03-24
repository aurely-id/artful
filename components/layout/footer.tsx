'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Sparkles, 
  Instagram, 
  Send,
  Heart
} from 'lucide-react'
import { toast } from 'sonner'

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/catalog' },
    { label: 'Custom Builder', href: '/builder' },
    { label: 'Best Sellers', href: '/catalog?filter=bestseller' },
    { label: 'New Arrivals', href: '/catalog?filter=new' },
  ],
  company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Magic Stories', href: '/stories' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
  support: [
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Track Order', href: '/track' },
    { label: 'Gift Cards', href: '/gift-cards' },
  ],
}

export function Footer() {
  const [email, setEmail] = useState('')
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Welcome to our magical community!')
      setEmail('')
    }
  }
  
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-semibold">ArtFul</span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Every gift has its magic. We help you craft meaningful moments 
              and turn your feelings into beautiful, tangible expressions of love.
            </p>
            
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-full bg-background"
              />
              <Button type="submit" size="icon" className="h-10 w-10 shrink-0 rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="mb-4 font-serif font-semibold">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-serif font-semibold">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-serif font-semibold">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-3 w-3 fill-rose text-rose" /> by ArtFul Ollivianders
          </p>
          
          {/* Social */}
          <div className="flex items-center gap-4">
            <Link 
              href="https://instagram.com" 
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link 
              href="https://tiktok.com" 
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              <span className="sr-only">TikTok</span>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ArtFul Ollivianders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
