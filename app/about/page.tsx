"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Cpu, Zap, ShieldCheck } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-3xl sm:text-4xl md:text-5xl md:text-6xl font-bold text-[var(--rgb-primary)] neon-text mb-6">
            ABOUT HYPERBYTE
          </h1>

          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-14">
            HYPERBYTE is a futuristic gaming gear brand built for elite gamers,
            creators, streamers, and RGB lovers.
          </p>

          <div className="grid md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Performance", icon: Cpu },
              { title: "RGB Power", icon: Zap },
              { title: "Premium Quality", icon: ShieldCheck },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-8 shadow-[0_0_30px_var(--rgb-primary)] hover:scale-105 transition-all duration-300"
              >
                <item.icon className="w-14 h-14 text-[var(--rgb-primary)] mx-auto mb-5" />

                <h2 className="text-3xl font-bold mb-3">
                  {item.title}
                </h2>

                <p className="text-gray-400">
                  Designed with futuristic visuals, smooth performance, and a
                  premium cyberpunk gaming experience.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}