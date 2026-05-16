"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Filter, SlidersHorizontal } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { MotionWrapper } from "@/components/motion-wrapper"
import SearchFilter from "@/components/search-filter"

const allProducts = [
  {
    id: "rgb-keyboard-pro",
    name: "HYPERBYTE Phantom RGB Keyboard",
    price: 179.99,
    category: "Keyboard",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80",
    rgbColor: "#00ffff",
  },
  {
    id: "rgb-keyboard-mini",
    name: "HYPERBYTE Compact 60% Keyboard",
    price: 129.99,
    category: "Keyboard",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
    rgbColor: "#ff00ff",
  },
  {
    id: "gaming-mouse-elite",
    name: "HYPERBYTE Viper Elite Mouse",
    price: 89.99,
    category: "Mouse",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    rgbColor: "#00ff00",
  },
  {
    id: "gaming-mouse-pro",
    name: "HYPERBYTE Strike Pro Mouse",
    price: 129.99,
    category: "Mouse",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    rgbColor: "#ff0000",
  },
  {
    id: "rgb-headset-7-1",
    name: "HYPERBYTE Nova 7.1 Headset",
    price: 149.99,
    category: "Headset",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    rgbColor: "#ffff00",
  },
  {
    id: "rgb-headset-wireless",
    name: "HYPERBYTE Eclipse Wireless Headset",
    price: 199.99,
    category: "Headset",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    rgbColor: "#00ffff",
  },
  {
    id: "gaming-pc-titan",
    name: "HYPERBYTE Titan Gaming PC",
    price: 2499.99,
    category: "PC",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    rgbColor: "#ff00ff",
  },
  {
    id: "gaming-pc-apex",
    name: "HYPERBYTE Apex Pro Gaming PC",
    price: 3499.99,
    category: "PC",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    rgbColor: "#00ff00",
  },
]

const categories = ["All", "Keyboard", "Mouse", "Headset", "PC"]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<any[]>(allProducts)
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())


      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      return 0
    })
  useEffect(() => {

    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"))

      const firebaseProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        rgbColor: "#00ffff",
      }))

      setProducts([...allProducts, ...firebaseProducts])
    }

    fetchProducts()
  }, [])

  return (
    <main className="min-h-screen">
      <MotionWrapper>
        <Navbar />
      </MotionWrapper>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-[family-name:var(--font-rajdhani)] text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Gaming Arsenal
          </span>
          <h1 className="font-[family-name:var(--font-orbitron)] text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">THE</span>
            <span className="text-primary neon-text ml-3">SHOP</span>
          </h1>
          <p className="font-[family-name:var(--font-rajdhani)] text-lg text-muted-foreground max-w-xl mx-auto">
            Browse our complete collection of premium gaming gear. Every product engineered for elite performance.
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="relative py-12">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <SearchFilter
            search={search}
            setSearch={setSearch}
            category={selectedCategory}
            setCategory={setSelectedCategory}
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 p-6 glass rounded-2xl neon-border">
            <input
              type="text"
              placeholder="Search gaming gear..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 px-4 py-3 glass rounded-xl border border-[var(--rgb-primary)] focus:outline-none text-foreground"
            />
            {/* Categories */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-primary mr-2" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-[family-name:var(--font-rajdhani)] font-semibold uppercase tracking-wider text-sm transition-all duration-300 ${selectedCategory === category
                    ? "bg-primary text-primary-foreground neon-box"
                    : "glass text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 glass rounded-lg font-[family-name:var(--font-rajdhani)] font-semibold text-sm text-foreground bg-transparent border border-border focus:border-primary focus:outline-none transition-colors duration-300"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </Reveal>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="font-[family-name:var(--font-rajdhani)] text-xl text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
