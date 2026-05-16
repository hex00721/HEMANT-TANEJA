"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X, ShoppingCart, Hexagon, User, Heart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"




const navLinks = [

  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/games", label: "Games" },
  { href: "/library", label: "Library" },
  { href: "/customizer", label: "RGB Customizer" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<any>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAdmin(false)
        return
      }

      const adminRef = doc(db, "admins", user.uid)
      const adminSnap = await getDoc(adminRef)

      setIsAdmin(adminSnap.exists())
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const [userOpen, setUserOpen] = useState(false)
  const { cartCount, cartItems, removeFromCart, cartTotal } = useCart()
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${scrolled
        ? "backdrop-blur-2xl bg-black/80 border-b border-[var(--rgb-primary)] shadow-[0_0_30px_var(--rgb-primary)]"
        : "glass-strong"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"
            }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Hexagon className="w-10 h-10 text-primary fill-primary/20 group-hover:fill-primary/40 transition-all duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">
                HX
              </span>
            </div>
            <span className="font-[family-name:var(--font-orbitron)] text-xl font-bold tracking-wider">
              <span className="text-primary neon-text">HYPERBYTE</span>
              <span className="text-foreground ml-1">GAMING</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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



          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/wishlist"
              className="relative p-2 text-muted-foreground hover:text-[var(--rgb-primary)] transition-all duration-300"
            >
              <Heart className="w-6 h-6" />
            </Link>
            <button
              onClick={() => setUserOpen(true)}
              className="p-2 text-muted-foreground hover:bg-[var(--rgb-primary)]/20 transition-all duration-300 rounded-xl"
            >
              <User className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            <button
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
        </div>


        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-[var(--rgb-primary)] bg-black/90 backdrop-blur-xl animate-in slide-in-from-top duration-300 rounded-b-3xl shadow-[0_0_30px_var(--rgb-primary)]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-rajdhani)] text-lg font-bold uppercase tracking-widest text-muted-foreground hover:text-[var(--rgb-primary)] hover:translate-x-2 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-[var(--rgb-primary)]/10"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>{cartOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-300">
          <div className="w-full max-w-md h-full bg-zinc-950 border-l-2 border-[var(--rgb-primary)] p-6 shadow-[0_0_50px_var(--rgb-primary)] rounded-l-[40px] animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold bg-[var(--rgb-primary)]/20
">Your Cart</h2>

              <button
                onClick={() => setCartOpen(false)}
                className="text-white hover:bg-[var(--rgb-primary)]/20
 text-3xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-400">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-zinc-900 p-4 rounded-xl">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-lg" />

                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="bg-[var(--rgb-primary)]/20
">${item.price.toFixed(2)}</p>
                      <p className="text-gray-400">Qty: {item.quantity}</p>

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
                  <p className="text-2xl font-bold bg-[var(--rgb-primary)]/20
">
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
      )}{userOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex justify-start animate-in fade-in duration-300">

          <div className="w-full max-w-sm h-full bg-zinc-950 border-r-2 border-[var(--rgb-primary)] p-6 shadow-[0_0_50px_var(--rgb-primary)] rounded-r-[40px] animate-in slide-in-from-left duration-500">

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-[var(--rgb-primary)]">
                User Panel
              </h2>

              <button
                onClick={() => setUserOpen(false)}
                className="text-white hover:text-[var(--rgb-primary)] text-3xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setUserOpen(false)}
                  className="block p-4 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all"
                >
                  Admin Panel
                </Link>
              )}

              <Link
                href="/profile"
                onClick={() => setUserOpen(false)}
                className="block p-4 rounded-xl bg-zinc-900 hover:bg-[var(--rgb-primary)] hover:text-black transition-all"
              >
                Profile Dashboard
              </Link>

              <Link
                href="/tracking"
                onClick={() => setUserOpen(false)}
                className="block p-4 rounded-xl bg-zinc-900 hover:bg-[var(--rgb-primary)] hover:text-black transition-all"
              >
                Track Orders
              </Link>

              {!user && (
                <>
                  <Link
                    href="/login"
                    className="block p-4 rounded-xl bg-zinc-900 hover:bg-[var(--rgb-primary)] hover:text-black transition-all"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setUserOpen(false)}
                    className="block p-4 rounded-xl bg-zinc-900 hover:bg-[var(--rgb-primary)] hover:text-black transition-all"
                  >
                    Create Account
                  </Link>
                </>
              )}
              {user && (
                <button
                  onClick={() => {
                    signOut(auth)
                    setUserOpen(false)
                  }}
                  className="w-full text-left p-4 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              )}



            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
