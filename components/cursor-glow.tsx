"use client"

import { useEffect, useState } from "react"

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", move)

    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-[999999] w-10 h-10 rounded-full blur-xl opacity-70"
      style={{
        left: position.x - 20,
        top: position.y - 20,
        background: "var(--rgb-primary)",
        boxShadow: "0 0 40px var(--rgb-primary)",
      }}
    />
  )
}