'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useBuilderStore } from '@/lib/store'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function StepMessage() {
  const { message, setMessage } = useBuilderStore()
  
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          Add Your Magic Message
        </h2>
        <p className="mt-2 text-muted-foreground">
          Write a personal note that will be included with your gift
        </p>
      </div>
      
      {/* Message Input */}
      <div className="space-y-3">
        <Label htmlFor="message" className="text-base font-medium">
          Your Message
        </Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your heartfelt message here..."
          className="min-h-[150px] resize-none rounded-xl border-2 p-4 text-base transition-all focus:border-primary"
          maxLength={500}
        />
        <p className="text-right text-xs text-muted-foreground">
          {message.length}/500 characters
        </p>
      </div>
      
      {/* Preview */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-serif font-semibold">Message Preview</h3>
          </div>
          
          <div className="rounded-xl bg-background p-6 shadow-sm">
            <p className="whitespace-pre-wrap font-serif text-lg italic leading-relaxed text-foreground">
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
