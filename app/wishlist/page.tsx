'use client'

import { useWishlist } from '@/context/WishlistContext'
import { products } from '@/lib/products'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id))

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Heart size={48} className="text-primary/40" />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">Your Wishlist is Empty</h1>
          <p className="text-primary/60 mb-8">
            Save your favorite items to your wishlist to view them later
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 rounded-lg bg-primary text-background font-semibold hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-background to-primary/5 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">My Wishlist</h1>
          <p className="text-primary/60">{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-xl backdrop-blur-md bg-primary/5 border border-primary/20 overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Image Container */}
              <div className="relative h-48 bg-primary/10 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <Heart size={40} className="text-primary/20" />
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/20 text-primary hover:text-accent hover:border-accent/40 transition-all"
                >
                  <Heart size={18} fill="currentColor" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-primary mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-primary/60 mb-3">{product.category}</p>

                {/* Price and Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-primary">₹{product.price}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-primary">{product.rating}</span>
                    <span className="text-xs text-primary/60">({product.reviews})</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <Link
                    href={`/product/${product.id}`}
                    className="block text-center px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors text-sm"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => {
                      addToCart(product.id)
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-background font-medium hover:bg-primary/90 transition-colors text-sm"
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
