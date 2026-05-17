"use client"

import { ShoppingCart, Eye, X, Heart, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/components/toast"
import { motion } from "framer-motion"
import toasts from "@/config/toasts.json"
import Link from "next/link"
import { useRecentlyViewed } from "@/context/recently-viewed-context"

interface ProductCardProps {
  id: string
  name: string
  price: number
  category: string
  image: string
  rgbColor?: string
}

export function ProductCard({
  id,
  name,
  price,
  category,
  image,
  rgbColor = "cyan",
}: ProductCardProps) {
  const { addViewed } = useRecentlyViewed()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const { addToCart } = useCart()
  const { showToast } = useToast()
  const { addToWishlist, isWishlisted } = useWishlist()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [open])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="group relative z-10 hover:z-40 rounded-2xl transition-all duration-300 reveal h-full"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          setRotate({
            x: (y / rect.height - 0.5) * -10,
            y: (x / rect.width - 0.5) * 10,
          })
        }}
        onMouseLeave={() => setRotate({ x: 0, y: 0 })}
        style={{
          transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{
            background: `linear-gradient(135deg, ${rgbColor}, transparent)`,
          }}
        />

        <div className="relative bg-[#0b0b12] rounded-2xl overflow-hidden border border-[var(--rgb-primary)]/40 h-full flex flex-col shadow-[0_0_25px_var(--rgb-primary)]">
          <Link href={`/product/${id}`} className="block">
            <div className="relative aspect-[16/9] overflow-hidden bg-black rounded-t-2xl">
              <img
                src={image}
                alt={name}
               className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-black/70 border border-[var(--rgb-primary)] text-[var(--rgb-primary)] shadow-[0_0_12px_var(--rgb-primary)]">
                  {category}
                </span>
              </div>
            </div>
          </Link>

          <div className="flex flex-col flex-1 p-6">
            <Link href={`/product/${id}`}>
              <h3 className="font-[family-name:var(--font-orbitron)] text-[24px] leading-tight font-bold text-white min-h-[64px] group-hover:text-[var(--rgb-primary)] transition-colors duration-300">
                {name}
              </h3>
            </Link>

            <div className="flex items-center justify-between gap-3 mt-5">
              <span className="text-[28px] font-bold text-[var(--rgb-primary)]">
                ${price.toFixed(2)}
              </span>

              <button
                type="button"
                onClick={() => {
                  addViewed({ id, name, price, image })
                  setOpen(true)
                }}
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-[var(--rgb-primary)] transition-all duration-300 whitespace-nowrap"
              >
                View Details →
              </button>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-6">
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

              <span className="text-xs uppercase tracking-wider text-gray-500">
                RGB Enabled
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  addToWishlist({ id, name, price, image, category })
                  showToast(toasts.addedToWishlist)
                }}
                className="p-3 rounded-xl bg-black/70 border border-[var(--rgb-primary)] text-[var(--rgb-primary)] hover:bg-[var(--rgb-primary)] hover:text-black transition-all"
              >
                <Heart
                  className="w-5 h-5 mx-auto"
                  fill={isWishlisted(id) ? "var(--rgb-primary)" : "none"}
                />
              </button>

              <button
                type="button"
                onClick={() => {
                  addViewed({ id, name, price, image })
                  setOpen(true)
                }}
                className="p-3 rounded-xl bg-black/70 border border-[var(--rgb-primary)] text-[var(--rgb-primary)] hover:bg-[var(--rgb-primary)] hover:text-black transition-all"
              >
                <Eye className="w-5 h-5 mx-auto" />
              </button>

              <button
                type="button"
                onClick={() => addToCart({ id, name, price, image })}
                className="p-3 rounded-xl bg-black/70 border border-[var(--rgb-primary)] text-[var(--rgb-primary)] hover:bg-[var(--rgb-primary)] hover:text-black transition-all"
              >
                <ShoppingCart className="w-5 h-5 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[999999] bg-black/90 flex items-start justify-center pt-28 pb-10 px-6 overflow-y-auto">
            <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl max-w-xl w-full p-8 relative shadow-[0_0_40px_var(--rgb-primary)]">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 text-white hover:bg-[var(--rgb-primary)]/20 rounded-full p-2"
              >
                <X size={28} />
              </button>

              <img
                src={image}
                alt={name}
                className="w-full h-72 object-cover rounded-2xl mb-6"
              />

              <h2 className="text-4xl font-bold mb-4 text-[var(--rgb-primary)]">
                {name}
              </h2>

              <p className="text-3xl font-bold mb-6">${price.toFixed(2)}</p>

              <p className="text-gray-400 mb-8 text-lg">
                Premium RGB gaming hardware engineered for elite gamers and
                maximum performance.
              </p>

              <div className="mb-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-[var(--rgb-primary)]"
                      fill="var(--rgb-primary)"
                    />
                  ))}

                  <span className="ml-3 text-gray-400 text-sm">
                    5.0 / 5.0
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-black/60 border border-[var(--rgb-primary)] rounded-2xl p-4">
                    <p className="font-bold text-[var(--rgb-primary)]">
                      CyberNinja
                    </p>
                    <p className="text-gray-300 text-sm">
                      Amazing RGB quality and premium gaming feel.
                    </p>
                  </div>

                  <div className="bg-black/60 border border-[var(--rgb-primary)] rounded-2xl p-4">
                    <p className="font-bold text-[var(--rgb-primary)]">
                      EliteGamer
                    </p>
                    <p className="text-gray-300 text-sm">
                      Performance is smooth, design is futuristic.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart({ id, name, price, image })
                  showToast(toasts.addedToCart)
                  setOpen(false)
                }}
                className="w-full py-4 rounded-2xl bg-[var(--rgb-primary)] text-black font-bold text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_var(--rgb-primary)]"
              >
                Add To Cart
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}