'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Loader2, Lock, CheckCircle } from 'lucide-react'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  const totalPrice = getTotalPrice()
  const formattedTotal = `₹${totalPrice.toLocaleString('en-IN')}`

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl text-primary/20">◆</div>
          <h2 className="text-3xl font-bold text-primary">Your cart is empty</h2>
          <p className="text-lg text-primary/60">
            Please add items before proceeding to checkout
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-background font-bold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:scale-105"
          >
            <ChevronLeft size={18} />
            Back to Shopping
          </Link>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError('')

    try {
      // Validate form
      if (!formData.firstName || !formData.email || !formData.phone || !formData.address) {
        setError('Please fill in all required fields')
        setIsProcessing(false)
        return
      }

      // Create order via API
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice,
          currency: 'INR',
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          cartItems: cart,
        }),
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }

      const orderData = await orderResponse.json()

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: totalPrice * 100,
        currency: 'INR',
        name: 'Luxe Silver',
        description: 'Premium Sterling Silver Jewelry',
        order_id: orderData.id,
        customer_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async (response: any) => {
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: orderData.id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            })

            if (verifyResponse.ok) {
              clearCart()
              router.push(`/order-confirmation?orderId=${orderData.id}`)
            } else {
              setError('Payment verification failed')
            }
          } catch (err) {
            console.error('Payment error:', err)
            setError('An error occurred during payment')
          }
          setIsProcessing(false)
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#ca94c1',
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (err) {
      console.error('Error:', err)
      setError('An error occurred. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="relative px-4 py-16 md:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            Checkout
          </h1>
          <p className="text-lg text-primary/60">
            Complete your purchase securely
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="backdrop-blur-md bg-destructive/20 border border-destructive/50 rounded-2xl p-6 flex items-start gap-4">
                  <div className="text-destructive flex-shrink-0 mt-1">⚠</div>
                  <div>
                    <p className="font-semibold text-destructive mb-1">Error</p>
                    <p className="text-sm text-destructive/80">{error}</p>
                  </div>
                </div>
              )}

              {/* Shipping Information */}
              <div className="backdrop-blur-md bg-background/30 border border-primary/20 rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 space-y-6">
                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
                  Shipping Information
                </h2>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl backdrop-blur-md bg-primary/20 border border-primary/40 px-4 py-3 text-primary placeholder-primary/40 focus:outline-none focus:border-primary/60 focus:bg-primary/30 transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full rounded-xl backdrop-blur-md bg-primary/20 border border-primary/40 px-4 py-3 text-primary placeholder-primary/40 focus:outline-none focus:border-primary/60 focus:bg-primary/30 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl backdrop-blur-md bg-primary/20 border border-primary/40 px-4 py-3 text-primary placeholder-primary/40 focus:outline-none focus:border-primary/60 focus:bg-primary/30 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl backdrop-blur-md bg-primary/20 border border-primary/40 px-4 py-3 text-primary placeholder-primary/40 focus:outline-none focus:border-primary/60 focus:bg-primary/30 transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-3">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl backdrop-blur-md bg-primary/20 border border-primary/40 px-4 py-3 text-primary placeholder-primary/40 focus:outline-none focus:border-primary/60 focus:bg-primary/30 transition-all"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full rounded-xl backdrop-blur-md bg-primary/20 border border-primary/40 px-4 py-3 text-primary placeholder-primary/40 focus:outline-none focus:border-primary/60 focus:bg-primary/30 transition-all"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full rounded-xl backdrop-blur-md bg-primary/20 border border-primary/40 px-4 py-3 text-primary placeholder-primary/40 focus:outline-none focus:border-primary/60 focus:bg-primary/30 transition-all"
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full rounded-xl backdrop-blur-md bg-primary/20 border border-primary/40 px-4 py-3 text-primary placeholder-primary/40 focus:outline-none focus:border-primary/60 focus:bg-primary/30 transition-all"
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="backdrop-blur-md bg-background/30 border border-primary/20 rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 space-y-4">
                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <Lock size={24} className="text-accent" />
                  Payment Method
                </h2>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-primary">Secure Razorpay Checkout</p>
                    <p className="text-sm text-primary/60 mt-1">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-gradient-to-r from-primary to-accent text-background font-bold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isProcessing && <Loader2 size={20} className="animate-spin" />}
                {isProcessing ? 'Processing Secure Payment...' : 'Complete Payment'}
              </button>

              <Link
                href="/cart"
                className="flex items-center justify-center gap-2 text-primary hover:text-accent transition-colors group"
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back to Cart
              </Link>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-md bg-background/30 border border-primary/20 rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 sticky top-24 space-y-6">
              <h2 className="text-2xl font-bold text-primary">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 pb-6 border-b border-primary/10 max-h-72 overflow-y-auto">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-primary/70 animate-in fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="line-clamp-1 flex-1">{item.name}</span>
                    <span className="text-primary/50 mx-2">×{item.quantity}</span>
                    <span className="font-semibold text-primary flex-shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 pb-6 border-b border-primary/10">
                <div className="flex justify-between text-sm text-primary/70">
                  <span>Subtotal</span>
                  <span>{formattedTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-primary/70">
                  <span>Shipping</span>
                  <span className="font-bold text-accent">Free</span>
                </div>
                <div className="flex justify-between text-sm text-primary/70">
                  <span>Tax</span>
                  <span>Calculated at payment</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary/60">Total Amount</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {formattedTotal}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-primary/10 space-y-2 text-xs text-primary/60 text-center">
                <p className="flex items-center justify-center gap-2">
                  <Lock size={14} />
                  SSL Encrypted
                </p>
                <p>✓ 100% Secure Payment</p>
                <p>✓ Verified 925 Silver</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
