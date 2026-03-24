'use client'

import { motion } from 'framer-motion'
import { Check, Mail, Sparkles } from 'lucide-react'
import { useBuilderStore } from '@/lib/store'
import { envelopeStyles } from '@/lib/data'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function StepMessage() {
  const { message, setMessage, envelopeStyle, setEnvelopeStyle } = useBuilderStore()
  
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
      
      {/* Envelope Style Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Choose Envelope Style
        </Label>
        <div className="grid gap-4 sm:grid-cols-3">
          {envelopeStyles.map((style, index) => {
            const isSelected = envelopeStyle?.id === style.id
            
            return (
              <motion.button
                key={style.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setEnvelopeStyle(style)}
                className={cn(
                  "group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50"
                )}
              >
                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                  >
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </motion.div>
                )}
                
                {/* Envelope Icon */}
                <div className={cn(
                  "mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full transition-colors",
                  isSelected ? "bg-primary/20" : "bg-muted"
                )}>
                  <Mail className={cn(
                    "h-8 w-8 transition-colors",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                
                <p className="text-center font-medium">{style.name}</p>
              </motion.button>
            )
          })}
        </div>
      </div>
      
      {/* Preview */}
      {(message || envelopeStyle) && (
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
            {envelopeStyle && (
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {envelopeStyle.name} Envelope
              </p>
            )}
            <p className="whitespace-pre-wrap font-serif text-lg italic leading-relaxed text-foreground">
              {message || 'Your message will appear here...'}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
