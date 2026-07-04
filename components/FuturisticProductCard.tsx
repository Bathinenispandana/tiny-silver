'use client'

import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  rating: number
  reviews: number
}

export function FuturisticProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group relative h-full cursor-pointer">
        {/* Glassmorphism card */}
        <div className="relative h-96 bg-background/40 backdrop-blur-md border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-primary/30">
          {/* Image Container */}
          <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className="absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md bg-background/40 border border-primary/20 hover:border-primary/50 text-primary hover:text-accent transition-all duration-300 transform scale-0 group-hover:scale-100"
            >
              <Heart
                size={20}
                fill={isWishlisted ? 'currentColor' : 'none'}
                className={isWishlisted ? 'text-accent' : ''}
              />
            </button>

            {/* Rating Badge */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full backdrop-blur-md bg-primary/20 border border-primary/40 text-primary text-xs font-semibold">
              ★ {product.rating} ({product.reviews})
            </div>
          </div>

          {/* Info Section */}
          <div className="p-4 space-y-3">
            {/* Category */}
            <p className="text-xs font-semibold text-accent uppercase tracking-wide">
              {product.category}
            </p>

            {/* Product Name */}
            <h3 className="text-lg font-bold text-primary line-clamp-2 group-hover:text-accent transition-colors duration-300">
              {product.name}
            </h3>

            {/* Price and Cart Button */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ₹{product.price.toLocaleString()}
              </div>

              <button
                onClick={handleAddToCart}
                className={`p-2 rounded-lg backdrop-blur-md transition-all duration-300 transform ${
                  isAdded
                    ? 'bg-accent/30 border border-accent text-accent'
                    : 'bg-primary/20 border border-primary/40 text-primary hover:border-primary/60 hover:bg-primary/30'
                }`}
              >
                <ShoppingCart size={18} />
              </button>
            </div>

            {/* Hover CTA */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
              <div className="w-full py-2 bg-gradient-to-r from-primary to-accent text-background rounded-lg font-semibold text-center text-sm">
                View Details
              </div>
            </div>
          </div>

          {/* Border glow effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>
    </Link>
  )
}
