'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart } = useCart()

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 md:py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground font-bold text-lg">
              L
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              Luxe Silver
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 md:flex">
            <Link
              href="/products"
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Products
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Contact
            </Link>
          </nav>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center transition-colors hover:text-accent"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-muted"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link
                href="/products"
                className="text-sm font-medium text-foreground transition-colors hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-foreground transition-colors hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-foreground transition-colors hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
