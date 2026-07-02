'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { products } from '@/lib/products'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(products)
  const router = useRouter()

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(products)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query)
    )
    setSearchResults(filtered)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 animate-in fade-in">
      <div className="w-full max-w-2xl mx-4 animate-in slide-in-from-top-8 duration-300">
        <div className="bg-background border border-primary/30 rounded-2xl shadow-2xl shadow-primary/20">
          {/* Search Input */}
          <div className="relative p-6 border-b border-primary/20">
            <form onSubmit={handleSearch} className="flex items-center gap-4">
              <Search size={24} className="text-primary flex-shrink-0" />
              <input
                type="text"
                placeholder="Search products, materials, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-primary placeholder:text-primary/50 outline-none text-lg font-medium"
                autoFocus
              />
              <button
                type="button"
                onClick={onClose}
                className="text-primary/60 hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchResults.length > 0 ? (
              <div className="p-4 space-y-2">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={onClose}
                    className="block p-3 rounded-lg hover:bg-primary/10 transition-colors duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <Search size={16} className="text-primary/50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-primary font-medium group-hover:text-accent transition-colors truncate">
                          {product.name}
                        </p>
                        <p className="text-primary/60 text-sm line-clamp-1">{product.description}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-primary/50">{product.category}</span>
                          <span className="text-sm font-semibold text-accent">₹{product.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-primary/60 font-medium">No products found for "{searchQuery}"</p>
                <p className="text-primary/40 text-sm mt-2">Try searching for categories, materials, or product names</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {searchResults.length > 0 && (
            <div className="border-t border-primary/20 p-4 text-center">
              <button
                onClick={handleSearch}
                className="w-full py-2 bg-gradient-to-r from-primary to-accent text-background font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                View All Results for "{searchQuery}"
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
