"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/context/cart-context"
import ReviewSection from "@/components/review-section"

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", params.id as string)

      const snapshot = await getDoc(docRef)

      if (snapshot.exists()) {
        setProduct({
          id: snapshot.id,
          ...snapshot.data(),
        })
      }
    }

    fetchProduct()
  }, [params.id])

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

          <img
            src={product.image}
            className="w-full rounded-3xl border border-[var(--rgb-primary)] shadow-[0_0_30px_var(--rgb-primary)]"
          />

          <div>
            <h1 className="text-6xl font-bold text-[var(--rgb-primary)] neon-text mb-6">
              {product.name}
            </h1>

            <p className="text-gray-400 text-xl mb-6">
              {product.description || "Premium gaming product"}
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-5xl font-bold text-[var(--rgb-primary)]">
                ${product.price}
              </p>

              <p className="text-gray-400">
                Category: {product.category}
              </p>

              {product.genre && (
                <p className="text-gray-400">
                  Genre: {product.genre}
                </p>
              )}

              {product.platform && (
                <p className="text-gray-400">
                  Platform: {product.platform}
                </p>
              )}
            </div>

            <button
              onClick={() => addToCart(product)}
              className="px-10 py-5 rounded-2xl bg-[var(--rgb-primary)] text-black font-bold text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_var(--rgb-primary)]"
            >
              Add To Cart
            </button>
          </div>
        </div>

        <ReviewSection productId={product.id} />
      </section>

      <Footer />
    </main>
  )
}