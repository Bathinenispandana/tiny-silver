'use client'

import { useState } from 'react'
import { Mail, Send } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate subscription
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsSubscribed(true)
    setEmail('')
    setTimeout(() => setIsSubscribed(false), 3000)
    setLoading(false)
  }

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-primary/70">
            Get exclusive access to new collections and special offers
          </p>
        </div>

        {/* Newsletter Form - Glassmorphism */}
        <form
          onSubmit={handleSubmit}
          className="relative backdrop-blur-md bg-background/30 border border-primary/30 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 shadow-2xl shadow-primary/20"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-accent rounded-full blur-2xl" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3">
            {/* Email Input */}
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading}
                className="w-full pl-12 pr-4 py-3 bg-background/40 border border-primary/20 rounded-xl text-primary placeholder-primary/40 focus:outline-none focus:border-primary/60 focus:bg-background/60 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isSubscribed}
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-background font-bold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 min-w-fit"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
              ) : isSubscribed ? (
                '✓ Subscribed!'
              ) : (
                <>
                  <Send size={18} />
                  Subscribe
                </>
              )}
            </button>
          </div>

          {/* Success message */}
          {isSubscribed && (
            <div className="mt-4 p-3 bg-accent/20 border border-accent/50 rounded-lg text-accent text-sm font-medium text-center animate-in fade-in">
              Thank you for subscribing! Check your email for exclusive offers.
            </div>
          )}

          {/* Privacy note */}
          <p className="text-xs text-primary/50 text-center mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  )
}
