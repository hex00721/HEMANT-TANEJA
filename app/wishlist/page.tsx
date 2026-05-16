"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-[var(--rgb-primary)]/20 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-[var(--rgb-primary)] mb-4 neon-text">
            MY WISHLIST
          </h1>

          <p className="text-gray-400 mb-12">
            Your saved gaming gear collection.
          </p>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-24 bg-zinc-900/70 border border-[var(--rgb-primary)] rounded-3xl shadow-[0_0_30px_var(--rgb-primary)]">
              <Heart className="w-24 h-24 mx-auto text-[var(--rgb-primary)] mb-6 animate-pulse" />

              <h2 className="text-3xl font-bold mb-3">
                Wishlist Empty
              </h2>

              <p className="text-gray-400">
                Add products using the heart icon.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-zinc-900/80 border border-[var(--rgb-primary)] rounded-3xl p-5 shadow-[0_0_25px_var(--rgb-primary)] hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-105 transition-all duration-300"
                  />

                  <p className="text-sm text-[var(--rgb-primary)] uppercase tracking-widest mb-2">
                    {item.category}
                  </p>

                  <h2 className="font-bold text-lg mb-2">
                    {item.name}
                  </h2>

                  <p className="text-[var(--rgb-primary)] font-bold text-xl mb-5">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        })
                      }
                      className="flex-1 py-3 rounded-xl bg-[var(--rgb-primary)] text-black font-bold flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="px-4 rounded-xl bg-red-500 text-white"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}