"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type ViewedProduct = {
  id: string
  name: string
  price: number
  image: string
}

type RecentlyViewedContextType = {
  viewed: ViewedProduct[]
  addViewed: (product: ViewedProduct) => void
}

const RecentlyViewedContext =
  createContext<RecentlyViewedContextType | null>(null)

export function RecentlyViewedProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [viewed, setViewed] = useState<ViewedProduct[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("recentlyViewed")

    if (saved) {
      setViewed(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(viewed)
    )
  }, [viewed])

  const addViewed = (product: ViewedProduct) => {
    setViewed((prev) => {
      const filtered = prev.filter(
        (p) => p.id !== product.id
      )

      return [product, ...filtered].slice(0, 8)
    })
  }

  return (
    <RecentlyViewedContext.Provider
      value={{ viewed, addViewed }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)

  if (!context) {
    throw new Error(
      "useRecentlyViewed must be used inside RecentlyViewedProvider"
    )
  }

  return context
}