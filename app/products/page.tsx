'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { FuturisticProductCard } from '@/components/FuturisticProductCard'
import { MasonryGrid } from '@/components/MasonryGrid'
import { products, categories } from '@/lib/products'
import { Filter, X, ChevronDown, Search } from 'lucide-react'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')?.toLowerCase() || ''
  
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name')
  const [showFilters, setShowFilters] = useState(false)

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery) ||
        p.material.toLowerCase().includes(searchQuery)
      )
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    return filtered
  }, [searchQuery, selectedCategory])

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      return a.name.localeCompare(b.name)
    })
  }, [filteredProducts, sortBy])

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
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Collection'}
          </h1>
          <p className="text-lg text-primary/60 max-w-2xl flex items-center gap-2">
            {searchQuery ? (
              <>
                <Search size={20} />
                Found {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} matching your search
              </>
            ) : (
              'Discover our complete range of premium sterling silver jewelry, crafted to perfection'
            )}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72">
            {/* Mobile Filter Button */}
            <div className="flex items-center justify-between lg:hidden mb-6">
              <h2 className="text-lg font-bold text-primary">Filters</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-lg backdrop-blur-md bg-primary/20 border border-primary/40 text-primary hover:border-primary/60 transition-all"
              >
                {showFilters ? <X size={20} /> : <Filter size={20} />}
              </button>
            </div>

            {/* Filter Panel */}
            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Search Filter */}
              {searchQuery && (
                <div className="pb-6 border-b border-primary/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-primary flex items-center gap-2">
                      <span className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
                      Active Search
                    </h3>
                    <a
                      href="/products"
                      className="text-xs text-accent hover:text-primary transition-colors"
                    >
                      Clear
                    </a>
                  </div>
                  <p className="text-sm text-primary/70 px-4 py-2 rounded-lg backdrop-blur-md bg-primary/10 border border-primary/20">
                    "{searchQuery}"
                  </p>
                </div>
              )}

              {/* Category Filter */}
              <div>
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setShowFilters(false)
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-primary to-accent text-background font-semibold shadow-lg shadow-primary/30'
                          : 'text-primary hover:bg-primary/10 border border-transparent hover:border-primary/30'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div className="pt-6 border-t border-primary/20">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
                  Sort By
                </h3>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-primary/20 border border-primary/40 text-primary focus:border-primary/60 focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" size={18} />
                </div>
              </div>

              {/* Active Filters Reset */}
              {(selectedCategory !== 'All' || sortBy !== 'name') && (
                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setSortBy('name')
                  }}
                  className="w-full py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 text-sm font-medium"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="mb-8 flex items-center justify-between backdrop-blur-md bg-background/30 border border-primary/20 rounded-xl p-4">
              <div>
                <p className="text-sm text-primary/60">
                  Showing <span className="font-bold text-primary">{sortedProducts.length}</span> product{sortedProducts.length !== 1 ? 's' : ''}
                </p>
                {selectedCategory !== 'All' && (
                  <p className="text-xs text-primary/50 mt-1">
                    Filtered by: <span className="font-semibold">{selectedCategory}</span>
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-primary/60">Sorted: <span className="font-semibold text-primary">
                  {sortBy === 'name' && 'A-Z'}
                  {sortBy === 'price-asc' && 'Price ↑'}
                  {sortBy === 'price-desc' && 'Price ↓'}
                </span></p>
              </div>
            </div>

            {/* Products Masonry Grid */}
            {sortedProducts.length > 0 ? (
              <MasonryGrid products={sortedProducts} columns={3} />
            ) : (
              <div className="flex h-96 items-center justify-center rounded-2xl backdrop-blur-md bg-background/30 border border-primary/20">
                <div className="text-center space-y-4">
                  <p className="text-2xl text-primary/30">◆</p>
                  <p className="text-lg font-semibold text-primary">No products found</p>
                  <p className="text-sm text-primary/60">
                    Try adjusting your filters or browse all categories
                  </p>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-primary to-accent text-background rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-primary/50 transition-all"
                  >
                    View All Products
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
