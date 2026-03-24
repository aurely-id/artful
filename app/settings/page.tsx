'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Lock, Bell, MapPin, CreditCard, LogOut, Save } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    fullName: 'Magic Maker',
    email: 'magic@artful.com',
    phone: '081234567890',
    birthday: '1990-01-15'
  })
  
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: 'Jl. Magic Street No. 123, Jakarta Selatan',
      city: 'Jakarta',
      postalCode: '12345',
      isDefault: true
    }
  ])
  
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    productRecommendations: true
  })
  
  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!')
  }
  
  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="mb-6 inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl">Settings</h1>
          <p className="mt-2 text-muted-foreground">Manage your account and preferences</p>
        </div>
      </section>
      
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-card p-6"
            >
              <h2 className="mb-6 font-serif text-xl font-semibold">Profile Information</h2>
              
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName" className="mb-2">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthday" className="mb-2">Birthday</Label>
                    <Input
                      id="birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveProfile} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </TabsContent>
          
          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border bg-card p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-serif text-xl font-semibold">Saved Addresses</h2>
                  <Button variant="outline" size="sm">Add New Address</Button>
                </div>
                
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="flex items-start gap-4 rounded-xl border border-border p-4">
                      <div className="flex h-5 w-5 items-center justify-center rounded border border-primary bg-primary/10 flex-shrink-0 mt-0.5">
                        {addr.isDefault && <div className="h-3 w-3 rounded-full bg-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{addr.type}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{addr.address}</p>
                        <p className="text-sm text-muted-foreground">{addr.city}, {addr.postalCode}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-card p-6"
            >
              <h2 className="mb-6 font-serif text-xl font-semibold">Notification Preferences</h2>
              
              <div className="space-y-4">
                {[
                  { key: 'orderUpdates', label: 'Order Updates', description: 'Get notified about your order status' },
                  { key: 'promotions', label: 'Promotions', description: 'Receive special offers and discounts' },
                  { key: 'newsletter', label: 'Newsletter', description: 'Weekly tips and product recommendations' },
                  { key: 'productRecommendations', label: 'Product Recommendations', description: 'Personalized suggestions based on your purchases' }
                ].map((notif) => (
                  <div key={notif.key} className="flex items-start justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="font-medium">{notif.label}</p>
                      <p className="text-sm text-muted-foreground">{notif.description}</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[notif.key as keyof typeof notifications]}
                        onChange={() => handleNotificationChange(notif.key)}
                        className="h-4 w-4 rounded border-input"
                      />
                      <span className="text-sm">
                        {notifications[notif.key as keyof typeof notifications] ? 'On' : 'Off'}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Change Password */}
              <div className="rounded-2xl border bg-card p-6">
                <h2 className="mb-6 font-serif text-xl font-semibold">Change Password</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword" className="mb-2">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter your current password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword" className="mb-2">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="mb-2">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                    />
                  </div>
                  <Button onClick={() => toast.success('Password updated!')}>
                    Update Password
                  </Button>
                </div>
              </div>
              
              {/* Danger Zone */}
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
                <h2 className="mb-4 font-serif text-xl font-semibold text-destructive">Danger Zone</h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
