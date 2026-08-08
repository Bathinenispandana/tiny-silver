'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface WishlistContextType {
  wishlist: number[]
  addToWishlist: (productId: number) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      setWishlist(JSON.parse(saved))
    }
    setIsHydrated(true)
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, isHydrated])

  const addToWishlist = (productId: number) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev
      return [...prev, productId]
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== productId))
  }

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId)
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}
