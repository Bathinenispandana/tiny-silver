'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/lib/products'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { FuturisticProductCard } from '@/components/FuturisticProductCard'
import { ShoppingCart, ChevronLeft, Heart, Share2, CheckCircle } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products.find((p) => p.id === productId)
  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="text-6xl text-primary/20">◆</div>
          <h1 className="text-3xl font-bold text-primary">Product not found</h1>
          <p className="text-primary/60">The product you're looking for doesn't exist.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-background rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            <ChevronLeft size={18} />
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const formattedPrice = `₹${product.price.toLocaleString('en-IN')}`
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handleAddToCart = async () => {
    setIsAdding(true)
    addToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
    setIsAdding(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="relative px-4 py-6 border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-primary/60 hover:text-primary transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative">
            {/* Background glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl opacity-50" />

            <div className="relative aspect-square rounded-2xl border border-primary/30 bg-background/40 backdrop-blur-md flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Wishlist button */}
            <button
              onClick={() => {
                if (isInWishlist(productId)) {
                  removeFromWishlist(productId)
                } else {
                  addToWishlist(productId)
                }
              }}
              className="absolute top-6 right-6 z-10 p-3 rounded-full backdrop-blur-md bg-background/40 border border-primary/30 text-primary hover:border-primary/60 hover:bg-background/60 transition-all transform hover:scale-110"
            >
              <Heart
                size={20}
                fill={isInWishlist(productId) ? 'currentColor' : 'none'}
                className={isInWishlist(productId) ? 'text-accent' : ''}
              />
            </button>

            {/* Share button */}
            <button className="absolute top-6 left-6 z-10 p-3 rounded-full backdrop-blur-md bg-background/40 border border-primary/30 text-primary hover:border-primary/60 hover:bg-background/60 transition-all transform hover:scale-110">
              <Share2 size={20} />
            </button>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between space-y-8">
            {/* Header Info */}
            <div className="space-y-6">
              {/* Category & Rating */}
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full backdrop-blur-md bg-primary/20 border border-primary/40 text-xs font-bold text-primary uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="text-sm text-primary/60">
                  ★ {product.rating} ({product.reviews} reviews)
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-lg text-primary/70 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="pt-4 border-t border-primary/10">
                <p className="text-sm text-primary/60 mb-2">Starting from</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {formattedPrice}
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg backdrop-blur-md bg-background/40 border border-primary/20 w-fit">
                {product.inStock ? (
                  <>
                    <CheckCircle size={18} className="text-accent" />
                    <span className="font-semibold text-primary">In Stock</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    <span className="font-semibold text-primary">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 p-6 rounded-2xl backdrop-blur-md bg-background/30 border border-primary/20">
              <h3 className="font-bold text-primary mb-4">Product Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                  <span className="text-sm text-primary/60">Material</span>
                  <span className="font-semibold text-primary">{product.material}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                  <span className="text-sm text-primary/60">Weight</span>
                  <span className="font-semibold text-primary">{product.weight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary/60">Dimensions</span>
                  <span className="font-semibold text-primary">{product.dimensions}</span>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 pt-6 border-t border-primary/10">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-primary">Quantity:</span>
                <div className="flex items-center gap-1 p-2 rounded-lg backdrop-blur-md bg-primary/20 border border-primary/40">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.inStock}
                    className="h-8 w-8 flex items-center justify-center hover:bg-primary/30 rounded-md transition-all disabled:opacity-50"
                  >
                    −
                  </button>
                  <span className="h-8 w-12 flex items-center justify-center font-bold text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                    className="h-8 w-8 flex items-center justify-center hover:bg-primary/30 rounded-md transition-all disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className={`w-full py-4 px-6 font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform ${
                  addedToCart
                    ? 'bg-accent/30 border border-accent text-accent'
                    : product.inStock
                    ? 'bg-gradient-to-r from-primary to-accent text-background hover:shadow-lg hover:shadow-primary/50 hover:scale-105'
                    : 'bg-primary/30 text-primary/50 cursor-not-allowed'
                }`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle size={20} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>

              <Link
                href="/cart"
                className="w-full py-4 px-6 font-bold rounded-xl text-center text-primary border border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-primary/10">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-primary mb-2">Related Products</h2>
              <p className="text-primary/60">You might also like these items</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <FuturisticProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
