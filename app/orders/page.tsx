'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Clock, Truck, Check, ChevronRight, ArrowLeft, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'

const mockOrders = [
  {
    id: 'ORD-001234',
    date: '2025-03-20',
    status: 'delivered',
    items: 3,
    total: 450000,
    products: ['Buket Bunga Kering', 'Frame Foto Custom', 'Ganci Akrilik']
  },
  {
    id: 'ORD-001233',
    date: '2025-03-15',
    status: 'shipping',
    items: 2,
    total: 275000,
    products: ['Brownies Kukus', 'Tas Slempang Minimalis']
  },
  {
    id: 'ORD-001232',
    date: '2025-03-10',
    status: 'processing',
    items: 1,
    total: 125000,
    products: ['Hampers Baby Shower']
  },
  {
    id: 'ORD-001231',
    date: '2025-03-05',
    status: 'delivered',
    items: 4,
    total: 680000,
    products: ['Blazer Brokat Premium', 'Obi Belt', 'Frame Quote Motivasi', 'Dompet Mini Quilling']
  },
  {
    id: 'ORD-001230',
    date: '2025-02-28',
    status: 'delivered',
    items: 2,
    total: 520000,
    products: ['Hampers Lamaran Premium', 'Buket Boneka Mini']
  },
]

const statusConfig = {
  pending: { label: 'Pending Payment', icon: Clock, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  processing: { label: 'Processing', icon: Package, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  shipping: { label: 'In Transit', icon: Truck, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  delivered: { label: 'Delivered', icon: Check, color: 'text-green-500', bgColor: 'bg-green-500/10' }
}

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="mb-6 inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl">
            Order History
          </h1>
          <p className="mt-2 text-muted-foreground">
            View and manage all your orders
          </p>
        </div>
      </section>
      
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {mockOrders.map((order, index) => {
            const status = statusConfig[order.status as keyof typeof statusConfig]
            const StatusIcon = status.icon
            
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl border bg-card transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-lg font-semibold">{order.id}</h3>
                        <div className={cn('inline-flex items-center gap-2 rounded-full px-3 py-1', status.bgColor)}>
                          <StatusIcon className={cn('h-4 w-4', status.color)} />
                          <span className={cn('text-xs font-medium', status.color)}>
                            {status.label}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{order.items} items</p>
                      <p className="font-serif text-2xl font-bold text-primary">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Products */}
                  <div className="mb-4 border-t pt-4">
                    <p className="mb-3 text-sm font-medium text-muted-foreground">Items:</p>
                    <ul className="space-y-2">
                      {order.products.map((product, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Invoice
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
