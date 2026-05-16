"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import type { User as FirebaseUser } from "firebase/auth"
import { Menu, X, ShoppingCart, Hexagon, User, Heart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/games", label: "Games" },
  { href: "/library", label: "Library" },
  { href: "/customizer", label: "RGB" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { cartCount, cartItems, removeFromCart, cartTotal } = useCart()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (!currentUser) {
        setIsAdmin(false)
        return
      }

      try {
        const adminSnap = await getDoc(doc(db, "admins", currentUser.uid))
        setIsAdmin(adminSnap.exists())
      } catch (error) {
        console.error("Admin check failed:", error)
        setIsAdmin(false)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-black/80 border-b border-[var(--rgb-primary)] shadow-[0_0_30px_var(--rgb-primary)]"
          : "glass-strong"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2 group min-w-0"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative shrink-0">
              <Hexagon className="w-9 h-9 sm:w-10 sm:h-10 text-primary fill-primary/20 group-hover:fill-primary/40 transition-all duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">
                HX
              </span>
            </div>

            <span className="font-[family-name:var(--font-orbitron)] text-sm sm:text-lg md:text-xl font-bold tracking-wider truncate">
              <span className="text-primary neon-text">HYPERBYTE</span>
              <span className="hidden sm:inline text-foreground ml-1">
                GAMING
              </span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-[family-name:var(--font-rajdhani)] text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/wishlist"
              className="relative p-2 text-muted-foreground hover:text-[var(--rgb-primary)] transition-all duration-300"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>

            <button
              onClick={() => setUserOpen(true)}
              className="p-2 text-muted-foreground hover:bg-[var(--rgb-primary)]/20 transition-all duration-300 rounded-xl"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <button
                  onClick={() => signOut(auth)}
                  className="px-4 py-2 rounded-xl border border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-xl border border-[var(--rgb-primary)] bg-[var(--rgb-primary)]/20 hover:bg-[var(--rgb-primary)] hover:text-black transition-all duration-300"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-xl bg-[var(--rgb-primary)] text-black font-bold hover:scale-105 transition-all duration-300"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>

            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden py-5 border-t border-[var(--rgb-primary)] bg-black/95 backdrop-blur-xl rounded-b-3xl shadow-[0_0_30px_var(--rgb-primary)]">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-rajdhani)] text-base font-bold uppercase tracking-widest text-muted-foreground hover:text-[var(--rgb-primary)] hover:translate-x-2 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-[var(--rgb-primary)]/10"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {!user && (
                <div className="grid grid-cols-2 gap-3 px-4 pt-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-3 rounded-xl border border-[var(--rgb-primary)] text-[var(--rgb-primary)] font-bold"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-3 rounded-xl bg-[var(--rgb-primary)] text-black font-bold"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex justify-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[90%] sm:w-full max-w-md h-full bg-zinc-950 border-l-2 border-[var(--rgb-primary)] p-4 sm:p-6 shadow-[0_0_50px_var(--rgb-primary)] rounded-l-[30px] sm:rounded-l-[40px] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--rgb-primary)]">
                Your Cart
              </h2>

              <button
                onClick={() => setCartOpen(false)}
                className="text-white hover:text-[var(--rgb-primary)] text-3xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-400">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 sm:gap-4 bg-zinc-900 p-3 sm:p-4 rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm sm:text-base truncate">
                        {item.name}
                      </h3>

                      <p className="text-[var(--rgb-primary)]">
                        ${item.price.toFixed(2)}
                      </p>

                      <p className="text-gray-400 text-sm">
                        Qty: {item.quantity}
                      </p>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 text-sm mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}

              {cartItems.length > 0 && (
                <div className="border-t border-[var(--rgb-primary)] pt-4">
                  <p className="text-xl sm:text-2xl font-bold text-[var(--rgb-primary)]">
                    Total: ${cartTotal.toFixed(2)}
                  </p>

                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="block text-center mt-4 w-full bg-[var(--rgb-primary)] text-black py-3 rounded-xl font-bold"
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

     {userOpen && (
  <div
    onClick={() => setUserOpen(false)}
    className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-md"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        fixed top-0 left-0
        h-screen
        w-[300px] sm:w-[340px]
        bg-gradient-to-b from-zinc-950 via-black to-zinc-950
        border-r border-[var(--rgb-primary)]
        shadow-[0_0_40px_var(--rgb-primary)]
        p-6
        flex flex-col
        animate-[slideInLeft_.35s_ease]
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[var(--rgb-primary)]">
            User Panel
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Welcome back
          </p>
        </div>

        <button
          onClick={() => setUserOpen(false)}
          className="
            w-10 h-10
            rounded-xl
            bg-zinc-900
            hover:bg-[var(--rgb-primary)]
            hover:text-black
            transition-all duration-300
            flex items-center justify-center
          "
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-1">
        {isAdmin && (
          <Link
            href="/admin"
            onClick={() => setUserOpen(false)}
            className="
              p-4 rounded-2xl
              bg-red-500
              text-white
              font-bold
              hover:scale-[1.02]
              hover:bg-red-600
              transition-all duration-300
            "
          >
            Admin Panel
          </Link>
        )}

        <Link
          href="/profile"
          onClick={() => setUserOpen(false)}
          className="
            p-4 rounded-2xl
            bg-zinc-900
            border border-zinc-800
            hover:border-[var(--rgb-primary)]
            hover:bg-[var(--rgb-primary)]/10
            hover:text-[var(--rgb-primary)]
            transition-all duration-300
          "
        >
          Profile Dashboard
        </Link>

        <Link
          href="/tracking"
          onClick={() => setUserOpen(false)}
          className="
            p-4 rounded-2xl
            bg-zinc-900
            border border-zinc-800
            hover:border-[var(--rgb-primary)]
            hover:bg-[var(--rgb-primary)]/10
            hover:text-[var(--rgb-primary)]
            transition-all duration-300
          "
        >
          Track Orders
        </Link>

        <Link
          href="/wishlist"
          onClick={() => setUserOpen(false)}
          className="
            p-4 rounded-2xl
            bg-zinc-900
            border border-zinc-800
            hover:border-[var(--rgb-primary)]
            hover:bg-[var(--rgb-primary)]/10
            hover:text-[var(--rgb-primary)]
            transition-all duration-300
          "
        >
          Wishlist
        </Link>

        {!user && (
          <>
            <Link
              href="/login"
              onClick={() => setUserOpen(false)}
              className="
                p-4 rounded-2xl
                text-center
                border border-[var(--rgb-primary)]
                text-[var(--rgb-primary)]
                hover:bg-[var(--rgb-primary)]
                hover:text-black
                transition-all duration-300
              "
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setUserOpen(false)}
              className="
                p-4 rounded-2xl
                text-center
                bg-[var(--rgb-primary)]
                text-black
                font-bold
                hover:scale-[1.02]
                transition-all duration-300
              "
            >
              Create Account
            </Link>
          </>
        )}
      </div>

      {/* Footer */}
      {user && (
        <button
          onClick={() => {
            signOut(auth)
            setUserOpen(false)
          }}
          className="
            mt-6
            w-full
            p-4
            rounded-2xl
            bg-red-500
            text-white
            font-bold
            hover:bg-red-600
            transition-all duration-300
          "
        >
          Logout
        </button>
      )}
    </div>
  </div>
)}
     
    </nav>
  )
}