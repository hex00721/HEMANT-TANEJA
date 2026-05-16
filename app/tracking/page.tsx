"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle2, Package, Truck, Home } from "lucide-react"

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">

        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-20" />

        <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[120px]" />

        <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-fuchsia-500/20 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-4xl mx-auto">

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-[var(--rgb-primary)] rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_0_40px_var(--rgb-primary)]">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-[var(--rgb-primary)]/20
 text-center mb-4">
              ORDER TRACKING
            </h1>

            <p className="text-center text-gray-400 mb-14 text-lg">
              Track your HYPERBYTE gaming gear delivery
            </p>

            {/* Tracking ID */}
            <div className="bg-black rounded-2xl border border-[var(--rgb-primary)] p-6 mb-12 text-center">
              <p className="text-gray-400 mb-2">
                Tracking ID
              </p>

              <h2 className="text-3xl font-bold bg-[var(--rgb-primary)]/20
 tracking-widest">
                HX-4921-ELITE
              </h2>
            </div>

            {/* Timeline */}
            <div className="space-y-10">

              {/* Packed */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-cyan-400/20 border border-[var(--rgb-primary)] flex items-center justify-center shadow-[0_0_25px_#00ffff]">
                  <Package className="w-10 h-10 bg-[var(--rgb-primary)]/20
" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    Order Packed
                  </h3>

                  <p className="text-gray-400">
                    Your gaming gear has been packed successfully.
                  </p>
                </div>

                <CheckCircle2 className="ml-auto text-green-400 w-8 h-8" />
              </div>

              {/* Shipped */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-fuchsia-500/20 border border-fuchsia-500 flex items-center justify-center shadow-[0_0_25px_#ff00ff]">
                  <Truck className="w-10 h-10 text-fuchsia-400" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    Shipped
                  </h3>

                  <p className="text-gray-400">
                    Your order is on the way to your location.
                  </p>
                </div>

                <CheckCircle2 className="ml-auto text-green-400 w-8 h-8" />
              </div>

              {/* Delivery */}
              <div className="flex items-center gap-6 opacity-60">
                <div className="w-20 h-20 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center shadow-[0_0_25px_#ffff00]">
                  <Home className="w-10 h-10 text-yellow-400" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    Out For Delivery
                  </h3>

                  <p className="text-gray-400">
                    Delivery partner will arrive soon.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}