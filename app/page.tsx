"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { LiveStats } from "@/components/live-stats"
import { FeaturedCategories } from "@/components/featured-categories"
import { Newsletter } from "@/components/newsletter"
import { useToast } from "@/components/toast"
import toasts from "@/config/toasts.json"
import { useCart } from "@/context/cart-context"
import { toast } from "@/components/ui/use-toast"

export default function HomePage() {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  return (
    <main className="min-h-screen">
      <Navbar />

      <Hero />

      <LiveStats />

      <FeaturedCategories />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 px-8">
        {[
          {
            name: "RGB Keyboard",
            price: "$129",
            rating: "4.8",
            image:
              "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
          },
          {
            name: "Gaming Mouse",
            price: "$79",
            rating: "4.9",
            image:
              "https://images.unsplash.com/photo-1527814050087-3793815479db",
          },
          {
            name: "RGB Headset",
            price: "$149",
            rating: "4.7",
            image:
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
          },
          {
            name: "Gaming PC",
            price: "$2499",
            rating: "5.0",
            image:
              "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
          },
        ].map((product, index) => (
          <div
            key={index}
            className="
      group
      relative
      bg-[#0b0b12]
      rounded-3xl
      overflow-hidden
      border border-[var(--rgb-primary)]/30
      transition-all duration-500
      hover:-translate-y-2
      hover:shadow-[0_0_35px_var(--rgb-primary)]
    "
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.18),transparent_70%)]" />

            {/* Image */}
            <div className="relative overflow-hidden h-60">
              <img
                src={product.image}
                alt={product.name}
                className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
        "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-black/70 border border-[var(--rgb-primary)] text-[var(--rgb-primary)] shadow-[0_0_10px_var(--rgb-primary)]">
                  Gaming
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-6 flex flex-col">
              <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-[var(--rgb-primary)] transition-colors duration-300">
                {product.name}
              </h2>

              <div className="flex items-center justify-between mb-5">
                <span className="text-yellow-400 text-lg">
                  ⭐ {product.rating}
                </span>

                <span className="text-3xl font-bold text-[var(--rgb-primary)]">
                  {product.price}
                </span>
              </div>

              {/* RGB Dots */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {["#00ffff", "#ff00ff", "#00ff00", "#ff0000", "#ffff00"].map(
                    (color) => (
                      <div
                        key={color}
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: color,
                          boxShadow: `0 0 10px ${color}`,
                        }}
                      />
                    )
                  )}
                </div>

                <span className="text-xs uppercase tracking-widest text-gray-500">
                  RGB Enabled
                </span>
              </div>

              <button
                onClick={() => {
                  addToCart({
                    id: product.name.toLowerCase().replaceAll(" ", "-"),
                    name: product.name,
                    price: Number(product.price.replace("$", "")),
                    image: product.image,
                  })

                  toast({
                    title: "Added to Cart",
                    description: `${product.name} added successfully`,
                  })
                }}
                className="
          w-full
          py-3
          rounded-2xl
          bg-[var(--rgb-primary)]
          text-black
          font-bold
          transition-all
          duration-300
          hover:scale-[1.03]
          hover:shadow-[0_0_25px_var(--rgb-primary)]
        "
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}

      </div>

      <FeaturedProducts />

      <FeaturesSection />

      <Newsletter />

      <Footer />
    </main>
  )
}