'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export function EnhancedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { cart } = useCart()
  const cartCount = cart?.length || 0

  const categories = [
    { name: 'Necklaces', href: '/products?category=necklaces' },
    { name: 'Rings', href: '/products?category=rings' },
    { name: 'Bracelets', href: '/products?category=bracelets' },
    { name: 'Earrings', href: '/products?category=earrings' },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300">
              <span className="text-background font-bold text-lg">LS</span>
            </div>
            <span className="text-xl font-bold text-primary hidden sm:inline">Luxe Silver</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="text-primary hover:text-accent transition-colors duration-300 font-medium flex items-center gap-2">
                Shop
                <span className="text-xs text-accent">▼</span>
              </button>
              {/* Mega Menu */}
              <div className="absolute top-full left-0 w-96 mt-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-lg bg-background/90 border border-primary/20 rounded-xl shadow-2xl shadow-primary/20 p-6 space-y-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="block px-4 py-3 rounded-lg text-primary hover:bg-primary/10 hover:text-accent transition-all duration-300 font-medium"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/products" className="text-primary hover:text-accent transition-colors duration-300 font-medium">
              Collections
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative text-primary hover:text-accent transition-colors duration-300 hover:bg-primary/10 p-2 rounded-lg">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-primary hover:text-accent transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="block px-4 py-2 rounded-lg text-primary hover:bg-primary/10 hover:text-accent transition-all duration-300"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/products"
              className="block px-4 py-2 rounded-lg text-primary hover:bg-primary/10 hover:text-accent transition-all duration-300"
            >
              Collections
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
