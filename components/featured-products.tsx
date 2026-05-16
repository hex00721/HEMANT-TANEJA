"use client"

import { ProductCard } from "./product-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const products = [
  {
    id: "rgb-keyboard-pro",
    name: "HYPERBYTE Phantom RGB Keyboard",
    price: 179.99,
    category: "Keyboard",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80",
    rgbColor: "#00ffff",
  },
  {
    id: "gaming-mouse-elite",
    name: "HYPERBYTE Viper Elite Mouse",
    price: 89.99,
    category: "Mouse",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    rgbColor: "#ff00ff",
  },
  {
    id: "rgb-headset-7-1",
    name: "HYPERBYTE Nova 7.1 Headset",
    price: 149.99,
    category: "Headset",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    rgbColor: "#00ff00",
  },
  {
    id: "gaming-pc-titan",
    name: "HYPERBYTE Titan Gaming PC",
    price: 2499.99,
    category: "PC",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    rgbColor: "#ff0000",
  },
]

export function FeaturedProducts() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block font-[family-name:var(--font-rajdhani)] text-sm font-semibold uppercase tracking-widest text-primary">
            Featured Gear
          </span>
          <h2 className="font-[family-name:var(--font-orbitron)] text-4xl sm:text-5xl font-bold">
            <span className="text-foreground">ELITE</span>
            <span className="text-primary neon-text ml-3">COLLECTION</span>
          </h2>
          <p className="font-[family-name:var(--font-rajdhani)] text-lg text-muted-foreground max-w-xl mx-auto">
            Discover our handpicked selection of premium gaming peripherals designed for peak performance.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 px-8 py-4 glass neon-border text-foreground font-[family-name:var(--font-rajdhani)] font-bold uppercase tracking-widest rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
