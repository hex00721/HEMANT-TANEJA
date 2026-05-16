"use client"

import Link from "next/link"
import { Keyboard, Mouse, Headphones, Monitor } from "lucide-react"

const categories = [
  { name: "Keyboards", icon: Keyboard, href: "/shop" },
  { name: "Mouse", icon: Mouse, href: "/shop" },
  { name: "Headsets", icon: Headphones, href: "/shop" },
  { name: "Gaming PCs", icon: Monitor, href: "/shop" },
]

export function FeaturedCategories() {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-[var(--rgb-primary)] neon-text mb-14">
          FEATURED CATEGORIES
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-10 text-center shadow-[0_0_25px_var(--rgb-primary)] hover:scale-105 transition-all duration-300"
            >
              <item.icon className="w-16 h-16 mx-auto mb-6 text-[var(--rgb-primary)] group-hover:scale-125 transition-all duration-300" />

              <h3 className="text-2xl font-bold">
                {item.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}