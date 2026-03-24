'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCartStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  Search, 
  User, 
  ShoppingBag, 
  Menu, 
  Sparkles,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/builder', label: 'Builder' },
  { href: '/stories', label: 'Stories' },
]

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const cartItemCount = useCartStore((state) => state.getTotalItems())
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
            ArtFul
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Search */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search magic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-48 rounded-full border border-input bg-background px-4 text-sm outline-none ring-ring focus:ring-2"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => {
                    setIsSearchOpen(false)
                    setSearchQuery('')
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>
          
          {/* User */}
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <Link href="/dashboard">
              <User className="h-4 w-4" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          
          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart ({cartItemCount} items)</span>
            </Link>
          </Button>
        </div>
        
        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 pt-6">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search magic..."
                    className="h-10 w-full rounded-full border border-input bg-background pl-10 pr-4 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
                
                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                
                {/* Mobile Actions */}
                <div className="mt-4 flex flex-col gap-2">
                  <Button asChild className="w-full justify-start gap-2">
                    <Link href="/builder">
                      <Sparkles className="h-4 w-4" />
                      Start Creating
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start gap-2">
                    <Link href="/dashboard">
                      <User className="h-4 w-4" />
                      My Account
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
