"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Package } from "lucide-react"
import { useEffect, useState } from "react"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false)
        return
      }

      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid)
      )

      const snapshot = await getDocs(q)

      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-[var(--rgb-primary)] neon-text mb-10">
            Order History
          </h1>

          {loading ? (
            <p className="text-gray-400">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 border border-[var(--rgb-primary)] rounded-3xl">
              <Package className="w-20 h-20 mx-auto text-[var(--rgb-primary)] mb-6" />
              <p className="text-gray-400 text-xl">No orders found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-6 shadow-[0_0_25px_var(--rgb-primary)]"
                >
                  <div className="flex justify-between gap-4 flex-wrap mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Order ID</p>
                      <h2 className="font-bold text-[var(--rgb-primary)]">
                        {order.id}
                      </h2>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <h2 className="font-bold">{order.status}</h2>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Total</p>
                      <h2 className="font-bold text-[var(--rgb-primary)]">
                        ${order.total?.toFixed(2)}
                      </h2>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.items?.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex gap-3 bg-black p-3 rounded-xl"
                      >
                        <img
                          src={item.image}
                          className="w-16 h-16 object-cover rounded-lg"
                        />

                        <div>
                          <h3 className="font-bold text-sm">{item.name}</h3>
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
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}