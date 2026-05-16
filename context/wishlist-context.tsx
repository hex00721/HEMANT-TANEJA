"use client"

import { createContext, useContext, useEffect, useState } from "react"

type WishlistItem = {
  id: string
  name: string
  price: number
  image: string
  category: string
}

type WishlistContextType = {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("wishlist")
    if (saved) {
      setWishlistItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      const exists = prev.find((p) => p.id === item.id)

      if (exists) {
        return prev.filter((p) => p.id !== item.id)
      }

      return [...prev, item]
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const isWishlisted = (id: string) => {
    return wishlistItems.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider")
  }

  return context
}