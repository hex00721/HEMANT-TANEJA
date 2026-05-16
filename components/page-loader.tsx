"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const timeout = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[999999] bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 border-4 border-[var(--rgb-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-[0_0_40px_var(--rgb-primary)]" />

        <h2 className="text-3xl font-bold text-[var(--rgb-primary)] neon-text">
          HYPERBYTE
        </h2>
      </div>
    </div>
  )
}