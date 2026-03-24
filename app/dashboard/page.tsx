'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  User, 
  Package, 
  Heart, 
  MapPin,
  Clock,
  Check,
  Truck,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  Trash2,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagicButton } from '@/components/ui/magic-button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSavedDesignsStore, useBuilderStore } from '@/lib/store'
import { formatPrice } from '@/lib/data'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-03-20',
    status: 'delivered',
    items: ['Enchanted Rose Box', 'Custom Snack Box'],
    total: 750000
  },
  {
    id: 'ORD-002',
    date: '2024-03-18',
    status: 'shipping',
    items: ['Birthday Bliss Box'],
    total: 550000
  },
  {
    id: 'ORD-003',
    date: '2024-03-15',
    status: 'processing',
    items: ['Lavender Dreams'],
    total: 480000
  }
]

const statusConfig = {
  pending: { label: 'Pending Payment', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
  processing: { label: 'Processing', icon: Package, color: 'text-blue-500 bg-blue-500/10' },
  shipping: { label: 'On The Way', icon: Truck, color: 'text-purple-500 bg-purple-500/10' },
  delivered: { label: 'Delivered', icon: Check, color: 'text-green-500 bg-green-500/10' }
}

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('orders')
  const { designs, removeDesign } = useSavedDesignsStore()
  const { selectBase, addComponent, setMessage, setEnvelopeStyle, setStep } = useBuilderStore()
  
  const handleReorder = (design: typeof designs[0]) => {
    // Load the saved design into the builder
    selectBase(design.base)
    design.components.forEach(comp => {
      for (let i = 0; i < comp.quantity; i++) {
        addComponent(comp)
      }
    })
    if (design.message) setMessage(design.message)
    if (design.envelopeStyle) setEnvelopeStyle(design.envelopeStyle)
    setStep(4) // Go to preview
    
    toast.success('Design loaded! Redirecting to builder...')
    router.push('/builder')
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold">My Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Magic Maker!</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 grid w-full grid-cols-3 lg:w-auto lg:grid-cols-none lg:flex">
            <TabsTrigger value="orders" className="gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">My Orders</span>
              <span className="sm:hidden">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="designs" className="gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Saved Designs</span>
              <span className="sm:hidden">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-xl font-semibold">Order History</h2>
              
              {mockOrders.length > 0 ? (
                <div className="space-y-4">
                  {mockOrders.map((order, index) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig]
                    const StatusIcon = status.icon
                    
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-2xl border bg-card p-6"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-4">
                            <div className={cn(
                              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                              status.color
                            )}>
                              <StatusIcon className="h-6 w-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{order.id}</p>
                                <Badge variant="outline" className={cn("text-xs", status.color)}>
                                  {status.label}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                              <p className="mt-1 text-sm">
                                {order.items.join(', ')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                            <p className="font-serif text-lg font-semibold">
                              {formatPrice(order.total)}
                            </p>
                            <Button variant="outline" size="sm">
                              View Details
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border bg-card py-16">
                  <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <h3 className="font-serif text-lg font-semibold">No orders yet</h3>
                  <p className="mt-1 text-muted-foreground">
                    Start creating magic and your orders will appear here
                  </p>
                  <Link href="/catalog">
                    <MagicButton className="mt-6">Browse Catalog</MagicButton>
                  </Link>
                </div>
              )}
            </motion.div>
          </TabsContent>
          
          {/* Saved Designs Tab */}
          <TabsContent value="designs">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-xl font-semibold">Saved Designs</h2>
              
              {designs.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {designs.map((design, index) => (
                    <motion.div
                      key={design.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-2xl border bg-card"
                    >
                      {/* Preview */}
                      <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
                        <div className="flex h-full items-center justify-center">
                          <Sparkles className="h-12 w-12 text-primary/30" />
                        </div>
                        
                        {/* Delete Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => {
                            removeDesign(design.id)
                            toast.success('Design removed')
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </div>
                      
                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-serif font-semibold">{design.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {design.base.name} with {design.components.length} items
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <p className="font-serif font-semibold text-primary">
                            {formatPrice(design.totalPrice)}
                          </p>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReorder(design)}
                          >
                            <RefreshCw className="mr-1 h-3 w-3" />
                            Re-order
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border bg-card py-16">
                  <Heart className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <h3 className="font-serif text-lg font-semibold">No saved designs</h3>
                  <p className="mt-1 text-muted-foreground">
                    Save your custom creations for later
                  </p>
                  <Link href="/builder">
                    <MagicButton className="mt-6">
                      <Sparkles className="h-4 w-4" />
                      Start Creating
                    </MagicButton>
                  </Link>
                </div>
              )}
            </motion.div>
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border bg-card p-6">
                <h2 className="mb-6 font-serif text-xl font-semibold">Profile Information</h2>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Magic Maker" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="magic@artful.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="081234567890" />
                  </div>
                  <div>
                    <Label htmlFor="birthday">Birthday</Label>
                    <Input id="birthday" type="date" />
                  </div>
                </div>
                
                <Button className="mt-6">Save Changes</Button>
              </div>
              
              <div className="rounded-2xl border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-serif text-xl font-semibold">Saved Addresses</h2>
                  <Button variant="outline" size="sm">
                    Add New
                  </Button>
                </div>
                
                <div className="rounded-xl border bg-muted/50 p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Home</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Jl. Magic Street No. 123, Jakarta Selatan, DKI Jakarta 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
