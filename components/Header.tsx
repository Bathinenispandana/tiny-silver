'use client'

import { useState, useEffect } from 'react'
import { Search, X, Heart, ShoppingBag, MapPin, User, Store } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { products } from '@/lib/products'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'


export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [showResults, setShowResults] = useState(false)
  const [pincode, setPincode] = useState('110001')
  const [showPincodeDropdown, setShowPincodeDropdown] = useState(false)
  const router = useRouter()
  const { wishlist } = useWishlist()
  const { cart } = useCart()

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setShowResults(true)
    const query = searchQuery.toLowerCase()
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query)
    )
    setSearchResults(filtered)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setShowResults(false)
    }
  }

  const cartCount = cart?.length || 0

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-sidebar-border">
      <div className="max-w-7xl px-10">
        {/* Header Row */}
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/tinysilver.webp"
              alt="Luxe Silver Logo"
              width={10}
              height={10}
              className="w-20 h-22 object-contain"
            />    
          </Link>

          {/* Location Section */}
          <div className="flex-shrink-0 relative">
            <button
              onClick={() => setShowPincodeDropdown(!showPincodeDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all group"
            >
              <Heart size={16} className="text-accent" />
              <div className="text-left">
                <p className="text-xs text-white font-medium">Where to Deliver?</p>
                <p className="text-sm font-semibold text-accent/60">Update Delivery Pincode</p>
              </div>
            </button>

            {/* Pincode Dropdown */}
            {showPincodeDropdown && (
              <div className="absolute top-full mt-2 left-0 bg-background border border-primary/30 rounded-lg shadow-lg p-3 min-w-48 z-50">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                  className="w-full px-3 py-2 border border-primary/20 rounded-lg text-accent placeholder:text-accent/40 outline-none focus:border-primary/60 bg-primary/5 text-sm"
                />
                <button
                  onClick={() => {
                    setShowPincodeDropdown(false)
                  }}
                  className="w-full mt-2 px-3 py-2 bg-primary text-accent rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
                >
                  Apply
                </button>
                <p className="text-xs text-accent/50 mt-2">Current: {pincode}</p>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl flex items-center gap-3 bg-primary/5 border border-primary/30 rounded-lg px-4 py-3 hover:border-primary/60 transition-all">
            <Search size={20} className="text-accent/60 flex-shrink-0" />
            <input
              type="text"
              placeholder={`Search "Pendants"`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-accent placeholder:text-accent/50 outline-none text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setShowResults(false)
                }}
                className="text-primary/40 hover:text-primary transition-colors flex-shrink-0"
              >
                <X size={18} />
              </button>
            )}
          </form>

          {/* Right Icons with Labels */}
          <div className="flex-shrink-0 flex items-end gap-6">
        

            {/* Account */}
            <Link
              href="/account"
              className="flex flex-col items-center gap-1 text-accent/50 hover:text-accent transition-colors group"
            >
              <User size={22} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium uppercase tracking-wider">Account</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="flex flex-col items-center gap-1 text-accent/50 hover:text-accent transition-colors group relative"
            >
              <div className="relative">
                <Heart size={22} className="group-hover:scale-110 transition-transform" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex flex-col items-center gap-1 text-accent/50 hover:text-accent transition-colors group relative"
            >
              <div className="relative">
                <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">Cart</span>
            </Link>
          </div>
        </div>

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-background border border-primary/30 rounded-xl shadow-2xl shadow-primary/20 max-h-96 overflow-y-auto z-50">
            <div className="p-2">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => {
                    setSearchQuery('')
                    setShowResults(false)
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <Search size={14} className="text-primary/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-primary font-medium group-hover:text-accent transition-colors truncate text-sm">
                      {product.name}
                    </p>
                    <span className="text-xs text-primary/50">{product.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {showResults && searchResults.length === 0 && searchQuery.trim() && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-background border border-primary/30 rounded-xl shadow-2xl shadow-primary/20 p-4 text-center z-50">
            <p className="text-primary/60 text-sm font-medium">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}
