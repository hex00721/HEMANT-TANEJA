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

export default function HomePage() {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  return (
    <main className="min-h-screen">
      <Navbar />

      <Hero />

      <LiveStats />

      <FeaturedCategories />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 px-8">
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
              bg-zinc-900
              rounded-3xl
              overflow-hidden
              border border-cyan-500/30
              transition-all duration-300
              hover:scale-105
              hover:shadow-[0_0_40px_var(--rgb-primary)]
            "
          >
            <div className="overflow-hidden">
              <img
                src={product.image}
                className="
                  h-56
                  w-full
                  object-cover
                  transition-all
                  duration-500
                  group-hover:scale-110
                "
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {product.name}
              </h2>

              <div className="flex items-center justify-between mb-3">
                <span className="text-yellow-400 text-lg">
                  ⭐ {product.rating}
                </span>

                <span className="text-2xl font-bold text-[var(--rgb-primary)]">
                  {product.price}
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

                  showToast(`${product.name} ${toasts.addedToCart}`)
                }}
                className="
    w-full
    py-3
    rounded-xl
    bg-[var(--rgb-primary)]
    text-black
    font-bold
    transition-all
    duration-300
    hover:scale-105
    hover:shadow-[0_0_20px_var(--rgb-primary)]
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