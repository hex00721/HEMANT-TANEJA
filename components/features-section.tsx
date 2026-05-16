"use client"

import { Zap, Shield, Palette, Headphones } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Speed",
    description: "Ultra-low latency response times for competitive edge in every game.",
  },
  {
    icon: Shield,
    title: "Built to Last",
    description: "Military-grade durability with premium materials that withstand intense gaming sessions.",
  },
  {
    icon: Palette,
    title: "16.8M Colors",
    description: "Full RGB spectrum with customizable lighting effects and sync capabilities.",
  },
  {
    icon: Headphones,
    title: "Immersive Audio",
    description: "Crystal clear 7.1 surround sound for complete battlefield awareness.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative py-24 bg-secondary/30">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block font-[family-name:var(--font-rajdhani)] text-sm font-semibold uppercase tracking-widest text-primary">
            Why Choose HYPERBYTE
          </span>
          <h2 className="font-[family-name:var(--font-orbitron)] text-4xl sm:text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-foreground">ENGINEERED FOR</span>
            <span className="text-primary neon-text ml-3">VICTORY</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 glass rounded-2xl neon-border hover:scale-[1.02] transition-all duration-500"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 rounded-2xl bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              <div className="relative space-y-4">
                {/* Icon */}
                <div className="inline-flex p-4 glass-strong rounded-xl neon-border group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-[family-name:var(--font-rajdhani)] text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
