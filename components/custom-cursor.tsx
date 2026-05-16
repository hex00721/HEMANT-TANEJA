"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", moveCursor)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[999999] mix-blend-screen blur-xl opacity-60"
      style={{
        transform: `translate(${position.x - 32}px, ${position.y - 32}px)`,
        background: "var(--rgb-primary)",
        boxShadow: "0 0 60px var(--rgb-primary)",
        transition: "transform 0.06s linear",
      }}
    />
  )
}