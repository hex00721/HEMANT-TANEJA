"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  TicketPercent,
} from "lucide-react"
import { Package, Users, DollarSign, ShoppingCart, } from "lucide-react"
import { useEffect, useState } from "react"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/toast"
import toasts from "@/config/toasts.json"
import AdminChart from "@/components/admin-chart"
import { storage } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Link from "next/link"


const gameImages: Record<string, string> = {
  "Cyberpunk 2077": "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg",
  "GTA V": "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/capsule_616x353.jpg",
  "Red Dead Redemption 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg",
  "Elden Ring": "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg",
  "Call of Duty MW3": "https://cdn.cloudflare.steamstatic.com/steam/apps/2519060/capsule_616x353.jpg",
  "Black Myth Wukong": "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/capsule_616x353.jpg",
  "Spider-Man 2": "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/0f6d8d5d2a8c4e9d.png",
  "God of War Ragnarok": "https://image.api.playstation.com/vulcan/ap/rnd/202109/2821/e0LWs8M8.png",
  "Forza Horizon 5": "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/capsule_616x353.jpg",
  "Hogwarts Legacy": "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/capsule_616x353.jpg",
  "Resident Evil 4": "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/capsule_616x353.jpg",
  "Starfield": "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/capsule_616x353.jpg",
  "The Last of Us": "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/capsule_616x353.jpg",
  "Assassin's Creed Mirage": "https://cdn.cloudflare.steamstatic.com/steam/apps/3035570/capsule_616x353.jpg",
  "Battlefield 2042": "https://cdn.cloudflare.steamstatic.com/steam/apps/1517290/capsule_616x353.jpg",
  "Alan Wake 2": "https://gaming-cdn.com/images/products/13808/orig/alan-wake-2-pc-game-epic-games-cover.jpg",
  "Baldur's Gate 3": "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/capsule_616x353.jpg",
  "Helldivers 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/553850/capsule_616x353.jpg",
  "Ghost of Tsushima": "https://image.api.playstation.com/vulcan/ap/rnd/202010/0223/8K6v.png",
  "Mortal Kombat 1": "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/capsule_616x353.jpg",
  "Tekken 8": "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/capsule_616x353.jpg",
  "Far Cry 6": "https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/capsule_616x353.jpg",
  "Need for Speed Heat": "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/capsule_616x353.jpg",
  "Watch Dogs Legion": "https://cdn.cloudflare.steamstatic.com/steam/apps/2239550/capsule_616x353.jpg",
  "Death Stranding": "https://cdn.cloudflare.steamstatic.com/steam/apps/1850570/capsule_616x353.jpg",
  "Sekiro": "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/capsule_616x353.jpg",
  "Dark Souls 3": "https://cdn.cloudflare.steamstatic.com/steam/apps/374320/capsule_616x353.jpg",
  "The Witcher 3": "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/capsule_616x353.jpg",
  "Minecraft": "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/MC-Vanilla_Updates-Carousel-0_Wild-Update_800x450.jpg",
  "CS2": "https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg",
  "Apex Legends": "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_616x353.jpg",
  "PUBG": "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_616x353.jpg",
  "Dying Light 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/capsule_616x353.jpg",
  "Days Gone": "https://cdn.cloudflare.steamstatic.com/steam/apps/1259420/capsule_616x353.jpg",
  "Detroit Become Human": "https://cdn.cloudflare.steamstatic.com/steam/apps/1222140/capsule_616x353.jpg",
  "EA FC 24": "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/capsule_616x353.jpg",
}

export default function AdminPage() {
  const { showToast } = useToast()
  const router = useRouter()

  const [checkingAdmin, setCheckingAdmin] = useState(true)
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [showDeleteGamesModal, setShowDeleteGamesModal] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")

  const [gameForm, setGameForm] = useState({
    name: "",
    price: "",
    currency: "USD",
    image: "",
    genre: "",
    platform: "PC",
    description: "",
    stock: "5",
    file: null as File | null,
  })
  const [editingProduct, setEditingProduct] = useState<any>(null)

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    currency: "USD",
    image: "",
    category: "Keyboard",

    stock: "5",
    file: null as File | null,
  })


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login")
        return
      }

      const adminSnap = await getDoc(doc(db, "admins", user.uid))

      if (!adminSnap.exists()) {
        showToast(toasts.adminAccessDenied)
        router.push("/")
        return
      }

      setCheckingAdmin(false)
    })

    return () => unsubscribe()
  }, [router, showToast])

  useEffect(() => {
    const fetchData = async () => {
      const orderSnapshot = await getDocs(collection(db, "orders"))
      const productSnapshot = await getDocs(collection(db, "products"))

      setOrders(
        orderSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )

      setProducts(
        productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    }

    fetchData()
  }, [])

  const updateOrderStatus = async (orderId: string, status: string) => {
    await updateDoc(doc(db, "orders", orderId), { status })

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    )
  }
  const uploadImage = async (file: File) => {
    const storageRef = ref(
      storage,
      `products/${Date.now()}-${file.name}`
    )

    await uploadBytes(storageRef, file)

    return await getDownloadURL(storageRef)
  }
  const addGame = async () => {
    if (
      !gameForm.name ||
      !gameForm.price ||
      (!gameForm.image && !gameForm.file) ||
      !gameForm.genre ||
      !gameForm.description
    ) {
      showToast(toasts.fillAllFields)
      return
    }
    const imageUrl = gameForm.file
      ? await uploadImage(gameForm.file)
      : gameForm.image

    const newGame = {
      name: gameForm.name,
      price: Number(gameForm.price),
      stock: Number(gameForm.stock),
      currency: gameForm.currency,
      image: imageUrl,
      category: "Game",
      genre: gameForm.genre,
      platform: gameForm.platform,
      description: gameForm.description,
      createdAt: new Date(),
    }


    const docRef = await addDoc(collection(db, "products"), newGame)

    setProducts((prev) => [...prev, { id: docRef.id, ...newGame }])

    setGameForm({
      name: "",
      price: "",
      currency: "USD",
      image: "",
      genre: "",
      platform: "PC",
      description: "",
      stock: "5",
      file: null as File | null,
    })
  }

  const addProduct = async () => {
    if (
      !productForm.name ||
      !productForm.price ||
      (!productForm.image && !productForm.file) ||
      !productForm.category
    ) {
      showToast(toasts.fillAllFields)
      return
    }
    const imageUrl = productForm.file
      ? await uploadImage(productForm.file)
      : productForm.image

    const newProduct = {
      name: productForm.name,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
      image: imageUrl,
      category: productForm.category,
      currency: productForm.currency,
      createdAt: new Date(),
    }

    const docRef = await addDoc(collection(db, "products"), newProduct)

    setProducts((prev) => [...prev, { id: docRef.id, ...newProduct }])

    setProductForm({
      name: "",
      price: "",
      currency: "USD",
      image: "",
      category: "Keyboard",
      stock: "5",
      file: null as File | null,
    })
  }

  const deleteProduct = async (productId: string) => {
    await deleteDoc(doc(db, "products", productId))
    setProducts((prev) => prev.filter((product) => product.id !== productId))
  }
  const deleteAllGames = async () => {
    if (deleteConfirmText !== "MEOW MEOW") {
      showToast("Type DELETE GAMES correctly")
      return
    }

    const gamesQuery = query(
      collection(db, "products"),
      where("category", "==", "Game")
    )

    const snapshot = await getDocs(gamesQuery)

    if (snapshot.empty) {
      showToast("No games found")
      return
    }

    for (const gameDoc of snapshot.docs) {
      await deleteDoc(doc(db, "products", gameDoc.id))
    }

    setProducts((prev) =>
      prev.filter((product) => product.category !== "Game")
    )

    showToast("All games deleted successfully")
    setShowDeleteGamesModal(false)
    setDeleteConfirmText("")
  }

  const generateGames = async () => {
    const aaaGames = Object.keys(gameImages)
    const newGames: any[] = []

    for (let i = 1; i <= 120; i++) {
      const game = aaaGames[Math.floor(Math.random() * aaaGames.length)]

      const newGame = {
        name: `${game} Deluxe Edition ${i}`,
        price: Math.floor(Math.random() * 80) + 20,
        currency: "USD",
        image: gameImages[game],
        category: "Game",
        genre: "Action RPG",
        platform: "PC",
        description: `${game} premium AAA digital edition with next generation gameplay.`,
        stock: 5,
        createdAt: new Date(),
      }

      const docRef = await addDoc(collection(db, "products"), newGame)

      newGames.push({
        id: docRef.id,
        ...newGame,
      })
    }

    setProducts((prev) => [...prev, ...newGames])
    showToast("120 AAA Games Added With Real Posters")
  }
  const updateProduct = async () => {
    if (!editingProduct) return

    await updateDoc(doc(db, "products", editingProduct.id), {
      name: editingProduct.name,
      price: Number(editingProduct.price),
      stock: Number(editingProduct.stock),
      currency: editingProduct.currency,
      image: editingProduct.image,
      category: editingProduct.category,
      genre: editingProduct.genre || "",
      platform: editingProduct.platform || "",
      description: editingProduct.description || "",
    })

    setProducts((prev) =>
      prev.map((product) =>
        product.id === editingProduct.id
          ? {
            ...editingProduct,
            price: Number(editingProduct.price),
            stock: Number(editingProduct.stock),
          }
          : product
      )
    )
    setEditingProduct(null)
    showToast("Product updated successfully")
  }
  const exportOrdersCSV = () => {
    const headers = [
      "Customer",
      "Email",
      "Total",
      "Status",
      "Payment Method",
    ]

    const rows = orders.map((order) => [
      order.customerName,
      order.email,
      order.total,
      order.status,
      order.paymentMethod,
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "orders.csv"
    link.click()
  }

  if (checkingAdmin) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl text-[var(--rgb-primary)]">
          Checking admin access...
        </h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-28 sm:pt-32 pb-20 px-3 sm:px-4 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto overflow-hidden">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--rgb-primary)] neon-text mb-10">
            ADMIN DASHBOARD
          </h1>

          <div className="mb-12">
            <AdminChart orders={orders} products={products} />
          </div>
          <button
            onClick={exportOrdersCSV}
            className="mt-6 px-8 py-4 rounded-2xl bg-green-500 text-white font-bold shadow-[0_0_25px_#22c55e]"
          >
            Export Orders CSV
          </button>



          <button
            onClick={generateGames}
            className="mb-8 px-8 py-4 rounded-2xl bg-[var(--rgb-primary)] text-black font-bold shadow-[0_0_25px_var(--rgb-primary)]"
          >
            Generate 120 AAA Games With Posters
          </button>

          <button
            onClick={() => setShowDeleteGamesModal(true)}
            className="ml-4 mb-8 px-8 py-4 rounded-2xl bg-red-600 text-white font-bold shadow-[0_0_25px_#ef4444] hover:scale-105 transition-all duration-300"
          >
            Delete All Games
          </button>


          <Link
            href="/admin/coupons"
            className="ml-4 inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-purple-500 text-white font-bold shadow-[0_0_25px_#a855f7] hover:scale-105 transition-all duration-300"
          >
            <TicketPercent className="w-5 h-5" />
            Coupon Generator
          </Link>

          <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-6 mb-12 shadow-[0_0_25px_var(--rgb-primary)]">
            <h2 className="text-3xl font-bold text-[var(--rgb-primary)] mb-6">
              Add Game
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Game Name"
                value={gameForm.name}
                onChange={(e) =>
                  setGameForm({ ...gameForm, name: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              />

              <input
                type="number"
                placeholder="Price"
                value={gameForm.price}
                onChange={(e) =>
                  setGameForm({ ...gameForm, price: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={gameForm.stock}
                onChange={(e) =>
                  setGameForm({ ...gameForm, stock: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              />

              <select
                value={gameForm.currency}
                onChange={(e) =>
                  setGameForm({ ...gameForm, currency: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              >
                <option value="USD">$ USD</option>
                <option value="INR">₹ INR</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">
                  Upload Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setGameForm({
                      ...gameForm,
                      file: e.target.files?.[0] || null,
                    })
                  }
                  className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">
                  OR Image URL
                </label>

                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={gameForm.image}
                  onChange={(e) =>
                    setGameForm({ ...gameForm, image: e.target.value })
                  }
                  className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
                />
              </div>



              <input
                type="text"
                placeholder="Genre e.g. Action, Racing"
                value={gameForm.genre}
                onChange={(e) =>
                  setGameForm({ ...gameForm, genre: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              />

              <select
                value={gameForm.platform}
                onChange={(e) =>
                  setGameForm({ ...gameForm, platform: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              >
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Nintendo">Nintendo</option>
                <option value="Multi-platform">Multi-platform</option>
              </select>
            </div>

            <textarea
              placeholder="Game Description"
              value={gameForm.description}
              onChange={(e) =>
                setGameForm({ ...gameForm, description: e.target.value })
              }
              className="mt-4 w-full min-h-32 bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
            />

            <button
              onClick={addGame}
              className="mt-6 px-8 py-3 rounded-xl bg-[var(--rgb-primary)] text-black font-bold"
            >
              Add Game
            </button>
          </div>

          <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-6 mb-12 shadow-[0_0_25px_var(--rgb-primary)]">
            <h2 className="text-3xl font-bold text-[var(--rgb-primary)] mb-6">
              Add Product
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={productForm.name}
                onChange={(e) =>
                  setProductForm({ ...productForm, name: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              />

              <input
                type="number"
                placeholder="Price"
                value={productForm.price}
                onChange={(e) =>
                  setProductForm({ ...productForm, price: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={productForm.stock}
                onChange={(e) =>
                  setProductForm({ ...productForm, stock: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              />

              <select
                value={productForm.currency}
                onChange={(e) =>
                  setProductForm({ ...productForm, currency: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              >
                <option value="USD">$ USD</option>
                <option value="INR">₹ INR</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>

              <input
                type="text"
                placeholder="Image URL"
                value={productForm.image}
                onChange={(e) =>
                  setProductForm({ ...productForm, image: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              />

              <select
                value={productForm.category}
                onChange={(e) =>
                  setProductForm({ ...productForm, category: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              >
                <option value="Keyboard">Keyboard</option>
                <option value="Mouse">Mouse</option>
                <option value="Headset">Headset</option>
                <option value="PC">PC</option>
                <option value="Bundle">Bundle</option>
                <option value="Game">Game</option>
              </select>
            </div>

            <button
              onClick={addProduct}
              className="mt-6 px-8 py-3 rounded-xl bg-[var(--rgb-primary)] text-black font-bold"
            >
              Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-5 shadow-[0_0_20px_var(--rgb-primary)]"
              >
                <img
                  src={product.image}
                  className="w-full h-40 object-cover rounded-2xl mb-4"
                />

                <h3 className="font-bold text-lg">{product.name}</h3>

                <p className="text-[var(--rgb-primary)] font-bold">
                  {product.currency} {product.price}
                </p>

                <p className="text-gray-400">{product.category}</p>
                <div className="mt-2">
                  <p className="text-gray-400 text-sm">
                    Stock: {product.stock ?? 0}
                  </p>

                  {product.stock <= 0 ? (
                    <div className="mt-2 inline-block px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
                      OUT OF STOCK
                    </div>
                  ) : product.stock <= 5 ? (
                    <div className="mt-2 inline-block px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold">
                      LOW STOCK
                    </div>
                  ) : (
                    <div className="mt-2 inline-block px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                      IN STOCK
                    </div>
                  )}
                </div>


                {product.genre && (
                  <p className="text-gray-400 text-sm">Genre: {product.genre}</p>
                )}

                {product.platform && (
                  <p className="text-gray-400 text-sm">
                    Platform: {product.platform}
                  </p>
                )}
                <button
                  onClick={() => setEditingProduct(product)}
                  className="mt-4 w-full py-2 rounded-xl bg-[var(--rgb-primary)] text-black font-bold hover:scale-105 transition-all duration-300"
                >
                  Edit Product
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="mt-4 w-full py-2 rounded-xl bg-red-500 text-white font-bold hover:scale-105 transition-all duration-300"
                >
                  Delete Product
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-6 shadow-[0_0_25px_var(--rgb-primary)]"
              >
                <div className="flex flex-wrap justify-between gap-4 mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">Customer</p>
                    <h2 className="font-bold text-xl">{order.customerName}</h2>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <h2 className="font-bold">{order.email}</h2>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Total</p>
                    <h2 className="font-bold text-[var(--rgb-primary)]">
                      ${order.total?.toFixed(2)}
                    </h2>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <h2 className="font-bold">{order.status}</h2>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      className="mt-2 bg-black border border-[var(--rgb-primary)] rounded-xl px-4 py-2 outline-none"
                    >
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {order.items?.map((item: any) => (
                    <div
                      key={item.id}
                      className="bg-black rounded-2xl p-4 flex gap-4"
                    >
                      <img
                        src={item.image}
                        className="w-20 h-20 object-cover rounded-xl"
                      />

                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-gray-400 text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {editingProduct && (
        <div className="fixed inset-0 bg-black/80 z-[99999] flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-8 w-full max-w-2xl shadow-[0_0_40px_var(--rgb-primary)]">
            <h2 className="text-4xl font-bold text-[var(--rgb-primary)] mb-6">
              Edit Product
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              />

              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, price: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={editingProduct.stock || ""}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, stock: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              />

              <input
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, image: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none md:col-span-2"
              />

              <select
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, category: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              >
                <option value="Keyboard">Keyboard</option>
                <option value="Mouse">Mouse</option>
                <option value="Headset">Headset</option>
                <option value="PC">PC</option>
                <option value="Bundle">Bundle</option>
                <option value="Game">Game</option>
              </select>

              <select
                value={editingProduct.currency || "USD"}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, currency: e.target.value })
                }
                className="bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
              >
                <option value="USD">$ USD</option>
                <option value="INR">₹ INR</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
            </div>

            <textarea
              value={editingProduct.description || ""}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, description: e.target.value })
              }
              placeholder="Description"
              className="mt-4 w-full min-h-28 bg-black border border-[var(--rgb-primary)] rounded-xl p-3 outline-none"
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={updateProduct}
                className="px-8 py-3 rounded-xl bg-[var(--rgb-primary)] text-black font-bold"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEditingProduct(null)}
                className="px-8 py-3 rounded-xl bg-red-500 text-white font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      {showDeleteGamesModal && (
  <div className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-zinc-950 border border-red-500 rounded-3xl p-8 shadow-[0_0_40px_#ef4444]">
      
      <h2 className="text-3xl font-bold text-red-500 mb-4">
        Delete All Games
      </h2>

      <p className="text-gray-300 mb-6">
        This action is permanent and cannot be undone.
      </p>

      <p className="text-sm text-gray-400 mb-3">
        Type:
        <span className="text-red-400 font-bold ml-2">
          PASSWORD 
        </span>
      </p>

      <input
        type="text"
        value={deleteConfirmText}
        onChange={(e) => setDeleteConfirmText(e.target.value)}
        placeholder="Type confirmation"
        className="w-full bg-black border border-red-500 rounded-2xl p-4 outline-none text-white mb-6"
      />

      <div className="flex gap-4">
        <button
          onClick={() => {
            setShowDeleteGamesModal(false)
            setDeleteConfirmText("")
          }}
          className="flex-1 py-4 rounded-2xl bg-zinc-800 text-white font-bold"
        >
          Cancel
        </button>

        <button
          onClick={deleteAllGames}
          className="flex-1 py-4 rounded-2xl bg-red-600 text-white font-bold shadow-[0_0_25px_#ef4444]"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </main>
  )
}