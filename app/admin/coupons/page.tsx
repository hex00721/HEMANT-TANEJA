"use client"

import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { motion } from "framer-motion"
import { TicketPercent, Copy, Check } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Download } from "lucide-react"


export default function AdminCouponsPage() {
  const [percentage, setPercentage] = useState(10)
  const [quantity, setQuantity] = useState(1)
  const [usageType, setUsageType] = useState("one-time")
  const [expiryType, setExpiryType] = useState("days")
  const [expiryDays, setExpiryDays] = useState(7)
  const [expiryDate, setExpiryDate] = useState("")
  const [minimumOrder, setMinimumOrder] = useState(999)

  const [generatedCoupons, setGeneratedCoupons] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedCode, setCopiedCode] = useState("")

  const generateCoupons = async () => {
    try {
      setLoading(true)

      const codes: string[] = []

      let finalExpiryDate: Date | null = null

      if (expiryType === "days") {
        finalExpiryDate = new Date(
          Date.now() + Number(expiryDays) * 24 * 60 * 60 * 1000
        )
      }

      if (expiryType === "date" && expiryDate) {
        finalExpiryDate = new Date(expiryDate)
      }

      for (let i = 1; i <= quantity; i++) {
        const random = Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()

        const code = `HYPER-${percentage}-${random}`

        await addDoc(collection(db, "coupons"), {
          code,
          discount: Number(percentage),
          active: true,

          usageType,
          usageLimit: usageType === "one-time" ? 1 : 50,
          usedCount: 0,

          minimumOrder: Number(minimumOrder),
          expiresAt: finalExpiryDate,

          createdAt: serverTimestamp(),
        })

        codes.push(code)
      }

      setGeneratedCoupons(codes)
    } catch (error) {
      console.error("Coupon generation failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyCoupon = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(code)

    setTimeout(() => {
      setCopiedCode("")
    }, 2000)


  }

      const downloadCouponsCSV = () => {
  if (generatedCoupons.length === 0) return

  const headers = [
    "Coupon Code",
    "Discount %",
    "Usage Type",
    "Minimum Order",
    "Expiry Type",
  ]

  const rows = generatedCoupons.map((code) => [
    code,
    percentage,
    usageType,
    minimumOrder,
    expiryType,
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
  link.download = "hyperbyte-coupons.csv"

  link.click()
}

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--rgb-primary)] neon-text">
              Coupon Generator
            </h1>

            <p className="text-zinc-400 mt-3">
              Generate advanced HYPERBYTE discount coupons.
            </p>
          </div>

          <div className="bg-zinc-950 border border-[var(--rgb-primary)] rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_var(--rgb-primary)] space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm uppercase tracking-widest text-zinc-400 mb-3">
                  Discount Percentage
                </label>

                <div className="relative">
                  <TicketPercent className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--rgb-primary)] w-5 h-5" />

                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    className="w-full bg-black border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-[var(--rgb-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-zinc-400 mb-3">
                  Coupon Quantity
                </label>

                <input
                  type="number"
                  min={1}
                  max={100}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-4 outline-none focus:border-[var(--rgb-primary)]"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-zinc-400 mb-3">
                  Usage Type
                </label>

                <select
                  value={usageType}
                  onChange={(e) => setUsageType(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-4 outline-none focus:border-[var(--rgb-primary)]"
                >
                  <option value="one-time">One Time Use</option>
                  <option value="multiple">Multiple Use</option>
                </select>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-zinc-400 mb-3">
                  Minimum Order
                </label>

                <input
                  type="number"
                  min={0}
                  value={minimumOrder}
                  onChange={(e) => setMinimumOrder(Number(e.target.value))}
                  className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-4 outline-none focus:border-[var(--rgb-primary)]"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-zinc-400 mb-3">
                  Expiry Type
                </label>

                <select
                  value={expiryType}
                  onChange={(e) => setExpiryType(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-4 outline-none focus:border-[var(--rgb-primary)]"
                >
                  <option value="days">Expire After Days</option>
                  <option value="date">Specific Date</option>
                  <option value="none">No Expiry</option>
                </select>
              </div>

              {expiryType === "days" && (
                <div>
                  <label className="block text-sm uppercase tracking-widest text-zinc-400 mb-3">
                    Expire After Days
                  </label>

                  <input
                    type="number"
                    min={1}
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(Number(e.target.value))}
                    className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-4 outline-none focus:border-[var(--rgb-primary)]"
                  />
                </div>
              )}

              {expiryType === "date" && (
                <div>
                  <label className="block text-sm uppercase tracking-widest text-zinc-400 mb-3">
                    Expiry Date
                  </label>

                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-4 outline-none focus:border-[var(--rgb-primary)]"
                  />
                </div>
              )}
            </div>

            <button
              onClick={generateCoupons}
              disabled={loading}
              className="w-full bg-[var(--rgb-primary)] text-black py-4 rounded-2xl font-bold hover:scale-[1.02] hover:shadow-[0_0_30px_var(--rgb-primary)] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Generating..." : `Generate ${quantity} Coupon${quantity > 1 ? "s" : ""}`}
            </button>

            {generatedCoupons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black border border-green-500 rounded-2xl p-5"
              >
                <p className="text-sm text-zinc-400 uppercase tracking-widest mb-4">
                  Generated Coupons
                </p>
                <button
  onClick={downloadCouponsCSV}
  className="mb-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500 text-white font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_#22c55e]"
>
  <Download className="w-5 h-5" />
  Download CSV
</button>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {generatedCoupons.map((code) => (
                    <div
                      key={code}
                      className="flex items-center justify-between gap-4 bg-zinc-950 border border-zinc-800 rounded-xl p-3"
                    >
                      <div>
                        <h2 className="text-lg font-bold text-green-400 break-all">
                          {code}
                        </h2>

                        <p className="text-zinc-500 text-sm">
                          {percentage}% OFF ·{" "}
                          {usageType === "one-time"
                            ? "One Time Use"
                            : "Multiple Use"}
                        </p>
                      </div>

                      <button
                        onClick={() => copyCoupon(code)}
                        className="w-11 h-11 shrink-0 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center"
                      >
                        {copiedCode === code ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-white" />
                        )}

                      </button>
                      
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}