'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Truck, 
  CreditCard, 
  ChevronLeft,
  Check,
  Sparkles,
  Package
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { MagicButton } from '@/components/ui/magic-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/data'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(10, 'Please enter your full address'),
  city: z.string().min(2, 'Please enter your city'),
  postalCode: z.string().min(5, 'Please enter a valid postal code'),
  notes: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

const shippingOptions = [
  { id: 'regular', name: 'Regular Delivery', price: 25000, eta: '3-5 business days' },
  { id: 'express', name: 'Express Delivery', price: 50000, eta: '1-2 business days' },
  { id: 'same-day', name: 'Same Day Delivery', price: 100000, eta: 'Today (order before 2 PM)' },
]

const paymentMethods = [
  { id: 'transfer', name: 'Bank Transfer', description: 'Manual transfer to our account' },
  { id: 'va', name: 'Virtual Account', description: 'BCA, Mandiri, BNI, BRI' },
  { id: 'ewallet', name: 'E-Wallet', description: 'GoPay, OVO, Dana, ShopeePay' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [selectedShipping, setSelectedShipping] = useState('regular')
  const [selectedPayment, setSelectedPayment] = useState('transfer')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema)
  })
  
  const subtotal = getTotalPrice()
  const shippingCost = shippingOptions.find(s => s.id === selectedShipping)?.price || 0
  const total = subtotal + shippingCost
  
  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success('Order placed successfully!')
    clearCart()
    router.push('/dashboard')
    
    setIsSubmitting(false)
  }
  
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-2xl font-bold">Nothing to checkout</h1>
          <p className="mt-2 text-muted-foreground">
            Add some items to your cart first
          </p>
          <Link href="/catalog">
            <MagicButton className="mt-8">Browse Catalog</MagicButton>
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-serif text-2xl font-bold">Checkout</h1>
              <p className="text-sm text-muted-foreground">Complete your magical order</p>
            </div>
          </div>
        </div>
      </section>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form Sections */}
            <div className="space-y-6 lg:col-span-2">
              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border bg-card p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-lg font-semibold">Shipping Address</h2>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      {...register('fullName')}
                      placeholder="Enter your full name"
                      className={cn(errors.fullName && "border-destructive")}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="your@email.com"
                      className={cn(errors.email && "border-destructive")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      placeholder="08xxxxxxxxxx"
                      className={cn(errors.phone && "border-destructive")}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      {...register('address')}
                      placeholder="Enter your full address"
                      className={cn(errors.address && "border-destructive")}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      {...register('city')}
                      placeholder="Your city"
                      className={cn(errors.city && "border-destructive")}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      {...register('postalCode')}
                      placeholder="12345"
                      className={cn(errors.postalCode && "border-destructive")}
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-xs text-destructive">{errors.postalCode.message}</p>
                    )}
                  </div>
                  
                  <div className="sm:col-span-2">
                    <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      {...register('notes')}
                      placeholder="Any special instructions for delivery?"
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* Shipping Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border bg-card p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-lg font-semibold">Shipping Method</h2>
                </div>
                
                <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
                  <div className="space-y-3">
                    {shippingOptions.map((option) => (
                      <label
                        key={option.id}
                        className={cn(
                          "flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all",
                          selectedShipping === option.id 
                            ? "border-primary bg-primary/5" 
                            : "hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div>
                            <p className="font-medium">{option.name}</p>
                            <p className="text-sm text-muted-foreground">{option.eta}</p>
                          </div>
                        </div>
                        <p className="font-serif font-semibold">
                          {formatPrice(option.price)}
                        </p>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </motion.div>
              
              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border bg-card p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-lg font-semibold">Payment Method</h2>
                </div>
                
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all",
                          selectedPayment === method.id 
                            ? "border-primary bg-primary/5" 
                            : "hover:border-primary/50"
                        )}
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </motion.div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-24 rounded-2xl border bg-card p-6"
              >
                <h2 className="mb-4 font-serif text-lg font-semibold">Order Summary</h2>
                
                {/* Items */}
                <div className="mb-4 max-h-48 space-y-3 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Sparkles className="h-5 w-5 text-primary/30" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.totalPrice * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-serif text-xl font-bold text-primary">
                    {formatPrice(total)}
                  </span>
                </div>
                
                <MagicButton 
                  type="submit"
                  className="mt-6 w-full" 
                  size="lg"
                  loading={isSubmitting}
                >
                  {!isSubmitting && <Check className="h-4 w-4" />}
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </MagicButton>
                
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  By placing this order, you agree to our Terms of Service
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
