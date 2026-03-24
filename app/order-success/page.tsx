'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Package, Truck, Mail, ArrowRight } from 'lucide-react'
import { MagicButton } from '@/components/ui/magic-button'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || `ORD-${Date.now().toString().slice(-8)}`
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
          >
            <Check className="h-12 w-12 text-green-600" />
          </motion.div>
          
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-serif text-4xl font-bold sm:text-5xl">
              Order Confirmed!
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Thank you for your magical purchase
            </p>
          </motion.div>
          
          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 rounded-2xl border-2 border-primary/20 bg-card p-8"
          >
            <div className="space-y-6">
              <div className="border-b pb-6">
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-serif text-2xl font-bold text-primary">{orderId}</p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    icon: Mail,
                    title: 'Confirmation Email',
                    description: 'Sent to your email address'
                  },
                  {
                    icon: Package,
                    title: 'Order Processing',
                    description: 'We are preparing your gift'
                  },
                  {
                    icon: Truck,
                    title: 'Shipping Soon',
                    description: 'Track your delivery'
                  }
                ].map((step, index) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
          
          {/* What to Expect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 rounded-xl border bg-card/50 p-6 text-left"
          >
            <h2 className="mb-4 font-serif text-lg font-semibold">What to Expect Next</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  1
                </span>
                <span>You will receive a confirmation email with your order details within minutes</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  2
                </span>
                <span>Our team will carefully prepare and package your magical gift</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  3
                </span>
                <span>You will receive a tracking link when your order ships</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  4
                </span>
                <span>Your gift will arrive beautifully wrapped and ready to delight</span>
              </li>
            </ul>
          </motion.div>
          
          {/* FAQ Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Any questions? Check our{' '}
            <Link href="/faq" className="text-primary hover:underline font-medium">
              FAQ page
            </Link>
            {' '}or contact us at{' '}
            <a href="mailto:support@artful.com" className="text-primary hover:underline font-medium">
              support@artful.com
            </a>
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/builder">
              <MagicButton size="lg" className="gap-2 w-full sm:w-auto">
                Create Another Gift
                <ArrowRight className="h-4 w-4" />
              </MagicButton>
            </Link>
            <Link href="/">
              <button className="w-full rounded-lg border border-primary bg-background px-8 py-3 font-medium text-primary transition-all hover:bg-primary/5 sm:w-auto">
                Return to Home
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
