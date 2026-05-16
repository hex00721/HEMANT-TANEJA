"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { User, Mail, Package, Heart, Settings } from "lucide-react"
import { useEffect, useState } from "react"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useWishlist } from "@/context/wishlist-context"
import Link from "next/link"
import { signOut } from "firebase/auth"
import { useRecentlyViewed } from "@/context/recently-viewed-context"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useToast } from "@/components/toast"
import toasts from "@/config/toasts.json"
import { collection, getDocs, query, where } from "firebase/firestore"
import { updateProfile } from "firebase/auth"
import OrderTimeline from "@/components/order-timeline"
import { updateDoc } from "firebase/firestore"
import InvoiceButton from "@/components/invoice-button"

export default function ProfilePage() {
  const [orderFilter, setOrderFilter] = useState("All")
  const [orders, setOrders] = useState<any[]>([])

  const { viewed } = useRecentlyViewed()
  const [user, setUser] = useState<any>(null)
  const { wishlistItems } = useWishlist()
  const [activeTab, setActiveTab] = useState("Dashboard")
  const { showToast } = useToast()

  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    address: "",
  })
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          const data = userSnap.data()

          setProfileForm({
            name: data.name || currentUser.displayName || "",
            phone: data.phone || "",
            address: data.address || "",
          })
        } else {
          setProfileForm({
            name: currentUser.displayName || "",
            phone: "",
            address: "",
          })
        }
        const q = query(
          collection(db, "orders"),
          where("userId", "==", currentUser.uid)
        )

        const snapshot = await getDocs(q)

        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      }
    })


    return () => unsubscribe()
  }, [])

  const cancelOrder = async (orderId: string) => {
    await updateDoc(doc(db, "orders", orderId), {
      status: "Cancelled",
    })

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      )
    )

    showToast("Order cancelled successfully")
  }
  const saveProfile = async () => {
    if (!user) {
      showToast(toasts.loginBeforeCheckout)
      return
    }

    await setDoc(
      doc(db, "users", user.uid),
      {
        name: profileForm.name,
        phone: profileForm.phone,
        address: profileForm.address,
        email: user.email,
        updatedAt: new Date(),
      },
      { merge: true }
    )

    await updateProfile(user, {
      displayName: profileForm.name,
    })

    setUser({
      ...user,
      displayName: profileForm.name,
    })

    showToast("Profile saved successfully")
    setActiveTab("Dashboard")
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--rgb-primary)] neon-text mb-10">
            USER DASHBOARD
          </h1>

          <div className="grid lg:grid-cols-[280px_1fr] gap-5 sm:p-8 md:p-10 items-start">
            <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-8 shadow-[0_0_30px_var(--rgb-primary)] h-fit ">
              <div className="w-28 h-28 rounded-full bg-[var(--rgb-primary)] text-black flex items-center justify-center mx-auto mb-6">
                <User className="w-14 h-14" />
              </div>

              <h2 className="text-3xl font-bold text-center">
                {user?.displayName || "Guest User"}
              </h2>

              <p className="text-gray-400 text-center mt-2 mb-8">
                {user ? "Elite Gamer Account" : "Please login"}
              </p>

              <div className="space-y-4">
                {[
                  "Dashboard",
                  "Orders",
                  "My Games",
                  "Wishlist",
                  "Settings",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveTab(item)}
                    className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === item
                      ? "bg-[var(--rgb-primary)] text-black"
                      : "bg-black border border-[var(--rgb-primary)] text-[var(--rgb-primary)] hover:bg-[var(--rgb-primary)] hover:text-black"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>


            <div className="lg:col-span-2">
              {activeTab === "Dashboard" && (
                <>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Email",
                        value: user?.email || "Not logged in",
                        icon: Mail,
                      },
                      {
                        title: "Orders",
                        value: "View Order History",
                        icon: Package,
                      },
                      {
                        title: "Wishlist",
                        value: `${wishlistItems.length} Saved Items`,
                        icon: Heart,
                      },
                      {
                        title: "Settings",
                        value: "Manage Account",
                        icon: Settings,
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-6 shadow-[0_0_20px_var(--rgb-primary)]"
                      >
                        <item.icon className="w-10 h-10 text-[var(--rgb-primary)] mb-4" />

                        <h3 className="text-2xl font-bold">
                          {item.title}
                        </h3>

                        <p className="text-gray-400 mt-2">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 mb-10">
                    <h2 className="text-4xl font-bold text-[var(--rgb-primary)] mb-8">
                      Recently Viewed
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {viewed.map((product) => (
                        <div
                          key={product.id}
                          className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-4 shadow-[0_0_20px_var(--rgb-primary)]"
                        >
                          <img
                            src={product.image}
                            className="w-full h-40 object-cover rounded-2xl mb-4"
                          />

                          <h3 className="font-bold text-lg">
                            {product.name}
                          </h3>

                          <p className="text-[var(--rgb-primary)] font-bold">
                            ${product.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Orders" && (
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-[var(--rgb-primary)]">
                    My Orders
                  </h2>
                  <div className="flex gap-3 flex-wrap mt-4 mb-6">
                    {[
                      "All",
                      "Packed",
                      "Shipped",
                      "Out for Delivery",
                      "Delivered",
                      "Cancelled",
                    ].map((status) => (
                      <button
                        key={status}
                        onClick={() => setOrderFilter(status)}
                        className={`px-5 py-2 rounded-xl font-bold transition-all duration-300 ${orderFilter === status
                            ? "bg-[var(--rgb-primary)] text-black"
                            : "bg-zinc-900 border border-[var(--rgb-primary)] text-[var(--rgb-primary)]"
                          }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-5 sm:p-8 md:p-10">
                      <p className="text-gray-400">No orders found.</p>
                    </div>
                  ) : (
                    orders
                      .filter(
                        (order) =>
                          orderFilter === "All" || order.status === orderFilter
                      )
                      .map((order) => (
                        <div
                          key={order.id}
                          className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-6 shadow-[0_0_25px_var(--rgb-primary)]"
                        >
                          <div className="flex flex-wrap justify-between gap-4 mb-6">
                            <div>
                              <p className="text-gray-400 text-sm">Order ID</p>
                              <h3 className="font-bold text-[var(--rgb-primary)]">
                                {order.id}
                              </h3>
                            </div>

                            <div>
                              <p className="text-gray-400 text-sm">Status</p>
                              <h3 className="font-bold">{order.status}</h3>
                            </div>

                            <div>
                              <p className="text-gray-400 text-sm">Total</p>
                              <h3 className="font-bold text-[var(--rgb-primary)]">
                                ${order.total?.toFixed(2)}
                              </h3>
                              <OrderTimeline currentStatus={order.status} />
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {order.items?.map((item: any) => (
                              <div>
                                <h3 className="font-bold">{item.name}</h3>

                                <p className="text-gray-400 text-sm">
                                  Qty: {item.quantity}
                                </p>

                                {item.licenseKey && (
                                  <div className="mt-2">
                                    <p className="text-xs text-gray-400">
                                      Game License Key
                                    </p>

                                    <div className="bg-black border border-[var(--rgb-primary)] rounded-xl px-3 py-2 text-[var(--rgb-primary)] font-bold tracking-wider mt-1">
                                      {item.licenseKey}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          <Link
                            href="/tracking"
                            className="inline-block mt-6 px-6 py-3 rounded-xl bg-[var(--rgb-primary)] text-black font-bold"
                          >
                            Track Order
                          </Link>
                          <InvoiceButton order={order} />

                        </div>
                      ))
                  )}
                </div>
              )}
              {activeTab === "My Games" && (
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-[var(--rgb-primary)]">
                    My Games Library
                  </h2>

                  {orders
                    .flatMap((order) => order.items || [])
                    .filter((item: any) => item.category === "Game")
                    .length === 0 ? (
                    <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-5 sm:p-8 md:p-10">
                      <p className="text-gray-400">No games purchased yet.</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {orders
                        .flatMap((order) => order.items || [])
                        .filter((item: any) => item.category === "Game")
                        .map((game: any) => (
                          <div
                            key={game.id}
                            className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-5 shadow-[0_0_25px_var(--rgb-primary)]"
                          >
                            <img
                              src={game.image}
                              className="w-full h-44 object-cover rounded-2xl mb-4"
                            />

                            <h3 className="text-xl font-bold">{game.name}</h3>

                            <p className="text-gray-400 mt-2">
                              Owned Digital Game
                            </p>

                            <button className="mt-5 w-full py-3 rounded-xl bg-[var(--rgb-primary)] text-black font-bold">
                              Download
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "Wishlist" && (
                <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-5 sm:p-8 md:p-10">
                  <h2 className="text-4xl font-bold text-[var(--rgb-primary)] mb-4">
                    Wishlist
                  </h2>

                  <p className="text-gray-400 mb-8">
                    You currently have {wishlistItems.length} saved items.
                  </p>

                  <Link
                    href="/wishlist"
                    className="inline-block px-8 py-4 rounded-2xl bg-[var(--rgb-primary)] text-black font-bold hover:scale-105 transition-all duration-300"
                  >
                    Open Wishlist
                  </Link>
                </div>
              )}
              {activeTab === "Settings" && (
                <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-5 sm:p-8 md:p-10">
                  <h2 className="text-4xl font-bold text-[var(--rgb-primary)] mb-6">
                    Settings
                  </h2>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Display Name"
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      className="w-full bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
                    />

                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={profileForm.phone}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, phone: e.target.value })
                      }
                      className="w-full bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
                    />

                    <textarea
                      placeholder="Address"
                      value={profileForm.address}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, address: e.target.value })
                      }
                      className="w-full min-h-28 bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <button
                      onClick={saveProfile}
                      className="px-8 py-4 rounded-2xl bg-[var(--rgb-primary)] text-black font-bold hover:scale-105 transition-all duration-300"
                    >
                      Save Profile
                    </button>

                    <button
                      onClick={() => signOut(auth)}
                      className="px-8 py-4 rounded-2xl bg-red-500 text-white font-bold hover:scale-105 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}