'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { LoginModal } from '@/components/LoginModal'
import { SignupModal } from '@/components/SignupModal'
import { ShoppingCart, X, ChevronLeft, ArrowRight, Trash2 } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const { isLoggedIn } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const totalPrice = getTotalPrice()
  const formattedTotal = `₹${totalPrice.toLocaleString('en-IN')}`

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true)
    } else {
      // Proceed to checkout
      window.location.href = '/checkout'
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Empty Cart State */}
        <div className="flex items-center justify-center py-32">
          <div className="text-center space-y-8 max-w-md">
            <div className="text-6xl text-primary/20 animate-bounce">
              <ShoppingCart size={80} className="mx-auto" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-primary">Your cart is empty</h2>
              <p className="text-lg text-primary/60">
                Discover our premium collection of handcrafted sterling silver jewelry
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-background font-bold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:scale-105"
            >
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    )
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
            Shopping Cart
          </h1>
          <p className="text-lg text-primary/60">
            {cart.length} item{cart.length !== 1 ? 's' : ''} waiting for checkout
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="backdrop-blur-md bg-background/30 border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex gap-6 p-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 border border-primary/20 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                        {item.category}
                      </p>
                      <Link
                        href={`/product/${item.id}`}
                        className="text-lg md:text-xl font-bold text-primary hover:text-accent transition-colors line-clamp-2 mb-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-primary/60 line-clamp-1">
                        ₹{item.price.toLocaleString('en-IN')} each
                      </p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col items-end justify-between gap-4">
                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xs text-primary/60 mb-1">Subtotal</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="h-9 w-9 flex items-center justify-center rounded-lg backdrop-blur-md bg-primary/20 border border-primary/40 text-primary hover:border-primary/60 hover:bg-primary/30 transition-all"
                      >
                        −
                      </button>
                      <span className="h-9 w-9 flex items-center justify-center font-bold text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-9 w-9 flex items-center justify-center rounded-lg backdrop-blur-md bg-primary/20 border border-primary/40 text-primary hover:border-primary/60 hover:bg-primary/30 transition-all"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-lg text-primary/60 hover:text-destructive hover:bg-destructive/10 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mt-6 group"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            {/* Summary Card */}
            <div className="backdrop-blur-md bg-background/30 border border-primary/20 rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 sticky top-24 space-y-6">
              <h2 className="text-2xl font-bold text-primary">Order Summary</h2>

              {/* Items Breakdown */}
              <div className="space-y-3 pb-6 border-b border-primary/10">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-primary/70"
                  >
                    <span className="line-clamp-1">{item.name} × {item.quantity}</span>
                    <span className="font-semibold text-primary flex-shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Summary */}
              <div className="space-y-3 pb-6 border-b border-primary/10">
                <div className="flex justify-between text-primary/70">
                  <span>Subtotal</span>
                  <span>{formattedTotal}</span>
                </div>
                <div className="flex justify-between text-primary/70">
                  <span>Shipping</span>
                  <span className="font-bold text-accent">Free</span>
                </div>
                <div className="flex justify-between text-primary/70">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-primary/60">Total Amount</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {formattedTotal}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 px-6 bg-gradient-to-r from-primary to-accent text-background font-bold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:scale-105 text-center mb-3 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>

                {/* Continue Shopping */}
                <button className="w-full py-3 px-6 border border-primary/30 text-primary font-semibold rounded-xl hover:border-primary/60 hover:bg-primary/10 transition-all">
                  Save for Later
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-primary/10 space-y-2 text-xs text-primary/60 text-center">
                <p className="flex items-center justify-center gap-2">
                  <span>✓</span> Secure Checkout
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span>✓</span> Authentic 925 Silver
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span>✓</span> Lifetime Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login/Signup Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => {
          setShowLoginModal(false)
          setShowSignupModal(true)
        }}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false)
          setShowLoginModal(true)
        }}
      />
    </div>
  )
}
