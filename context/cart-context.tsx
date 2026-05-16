"use client"

import { createContext, useContext, useState , useEffect} from "react"

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  cartCount: number
  cartTotal: number
}


const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  
  
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  useEffect(() => {
  const savedCart = localStorage.getItem("cart")

  if (savedCart) {
    setCartItems(JSON.parse(savedCart))
  }
}, [])

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItems))
}, [cartItems])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id)

      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      }

      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }

  return context
}