"use client"

const stats = [
  {
    value: "50K+",
    label: "Gamers",
  },
  {
    value: "120K+",
    label: "Orders",
  },
  {
    value: "99%",
    label: "Satisfaction",
  },
  {
    value: "24/7",
    label: "Support",
  },
]

export function LiveStats() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-zinc-900/80 border border-[var(--rgb-primary)] rounded-3xl p-10 text-center shadow-[0_0_30px_var(--rgb-primary)] hover:scale-105 transition-all duration-300"
            >
              <h2 className="text-5xl font-bold text-[var(--rgb-primary)] neon-text mb-4">
                {stat.value}
              </h2>

              <p className="text-gray-400 text-xl uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}