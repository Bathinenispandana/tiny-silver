'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, Mail } from 'lucide-react'
import { useEffect, useState, Suspense } from 'react'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate order processing
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!orderId) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Order not found</h2>
            <p className="text-muted-foreground mb-8">
              Please check your email for order details
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-20">
        {/* Success Icon */}
        {!isLoading && (
          <div className="text-center mb-8 animate-in fade-in zoom-in duration-500">
            <CheckCircle className="mx-auto h-20 w-20 text-green-600 mb-6" />
          </div>
        )}

        {/* Main Content */}
        <div className="rounded-lg border border-border bg-card p-8 sm:p-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your order has been confirmed and will be processed shortly
          </p>

          {/* Order Details */}
          <div className="bg-muted/30 rounded-md p-6 mb-8 text-left">
            <p className="text-sm text-muted-foreground mb-2">Order Number</p>
            <p className="text-2xl font-bold text-foreground font-mono break-all">
              {orderId}
            </p>
          </div>

          {/* Status */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <div className="rounded-md border border-border p-4">
              <div className="text-2xl mb-2">✓</div>
              <p className="font-semibold text-foreground">Payment Confirmed</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your payment has been processed successfully
              </p>
            </div>
            <div className="rounded-md border border-border p-4">
              <div className="text-2xl mb-2">📦</div>
              <p className="font-semibold text-foreground">Being Prepared</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your items are being carefully packaged
              </p>
            </div>
            <div className="rounded-md border border-border p-4">
              <div className="text-2xl mb-2">🚚</div>
              <p className="font-semibold text-foreground">Shipping Soon</p>
              <p className="text-xs text-muted-foreground mt-1">
                You&apos;ll receive tracking information
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 mb-8">
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address with order details and tracking information.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted">
                <Mail className="h-4 w-4" />
                Resend Confirmation
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted">
                <Download className="h-4 w-4" />
                Download Invoice
              </button>
            </div>
          </div>

          {/* What&apos;s Next */}
          <div className="bg-muted/20 rounded-md p-6 text-left mb-8">
            <h2 className="font-semibold text-foreground mb-3">What&apos;s Next?</h2>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="inline-block w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold mr-2">
                  1
                </span>
                Check your email for order confirmation
              </li>
              <li>
                <span className="inline-block w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold mr-2">
                  2
                </span>
                We&apos;ll prepare and verify your items
              </li>
              <li>
                <span className="inline-block w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold mr-2">
                  3
                </span>
                Receive your package within 5-7 business days
              </li>
              <li>
                <span className="inline-block w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold mr-2">
                  4
                </span>
                Enjoy your premium Luxe Silver pieces!
              </li>
            </ol>
          </div>

          {/* Contact Support */}
          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Have questions about your order?
            </p>
            <a
              href="mailto:support@luxesilver.com"
              className="inline-flex items-center justify-center gap-2 text-accent hover:underline font-medium"
            >
              Contact Our Support Team
            </a>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Browse more of our premium collection
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
