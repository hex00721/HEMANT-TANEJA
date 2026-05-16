"use client"

import { useEffect } from "react"

export function ThemeLoader() {
  useEffect(() => {
    const savedColor = localStorage.getItem("rgbColor")

    if (savedColor) {
      document.documentElement.style.setProperty("--rgb-primary", savedColor)
    }
  }, [])

  return null
}