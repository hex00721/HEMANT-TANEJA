"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const setups = [
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616588589676-62b3bd2f4b1f?q=80&w=1200&auto=format&fit=crop",
]

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-bold text-center text-[var(--rgb-primary)] neon-text mb-6">
            SETUP GALLERY
          </h1>

          <p className="text-center text-gray-400 text-xl mb-14">
            Explore elite RGB battlestations from the HYPERBYTE universe.
          </p>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {setups.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-[var(--rgb-primary)] shadow-[0_0_20px_var(--rgb-primary)]"
              >
                <img
                  src={image}
                  alt="Gaming Setup"
                  className="w-full object-cover group-hover:scale-110 transition-all duration-500"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}