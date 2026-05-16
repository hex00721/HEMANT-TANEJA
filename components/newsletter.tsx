"use client"

import { useState } from "react"
import { useToast } from "@/components/toast"
import toasts from "@/config/toasts.json"


export function Newsletter() {
   const { showToast } = useToast()
  const [email, setEmail] = useState("")

  const handleSubscribe = () => {
    if (!email) {
      showToast(toasts.enterEmail)
      return
    }

    showToast(toasts.subscribedSuccessfully)
    setEmail("")
  }

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-[40px] p-5 sm:p-8 md:p-10 text-center shadow-[0_0_40px_var(--rgb-primary)]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--rgb-primary)] neon-text mb-6">
            JOIN THE HYPERBYTE ARMY
          </h2>

          <p className="text-gray-400 text-lg mb-10">
            Get exclusive RGB drops, gaming deals, and futuristic setup inspiration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-black border border-[var(--rgb-primary)] rounded-2xl px-6 py-4 outline-none"
            />

            <button
              onClick={handleSubscribe}
              className="px-8 py-4 rounded-2xl bg-[var(--rgb-primary)] text-black font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_30px_var(--rgb-primary)]"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}