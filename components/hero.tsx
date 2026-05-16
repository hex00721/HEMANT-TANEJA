"use client"


import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { useRef } from "react"
import html2canvas from "html2canvas"

export function Hero() {
  const captureRef = useRef(null)

  const downloadSetup = async () => {

    if (!captureRef.current) return

    const element = captureRef.current as HTMLElement

    const cloned = element.cloneNode(true) as HTMLElement

    cloned.querySelectorAll("*").forEach((el) => {

      const htmlEl = el as HTMLElement

      htmlEl.style.color = "#ffffff"
      htmlEl.style.backgroundColor = "#111111"
      htmlEl.style.borderColor = "#00ffff"
      htmlEl.style.boxShadow = "none"
      htmlEl.style.textShadow = "none"
      htmlEl.style.backdropFilter = "none"
      htmlEl.style.filter = "none"

    })

    cloned.style.position = "fixed"
    cloned.style.top = "-9999px"

    document.body.appendChild(cloned)

    const canvas = await html2canvas(cloned)

    document.body.removeChild(cloned)

    const link = document.createElement("a")

    link.download = "setup.png"

    link.href = canvas.toDataURL("image/png")

    link.click()
  }
  return (
    <section
      ref={captureRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid"
    > <video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
>
  <source
    src="https://videos.pexels.com/video-files/3141211/3141211-uhd_2560_1440_25fps.mp4"
    type="video/mp4"
  />
</video> 

<div className="absolute inset-0 pointer-events-none">
  {[
    { left: "10%", top: "20%" },
    { left: "25%", top: "70%" },
    { left: "40%", top: "30%" },
    { left: "60%", top: "80%" },
    { left: "75%", top: "25%" },
    { left: "90%", top: "60%" },
    { left: "15%", top: "85%" },
    { left: "35%", top: "50%" },
    { left: "55%", top: "15%" },
    { left: "80%", top: "45%" },
  ].map((p, i) => (
    <span
      key={i}
      className="absolute w-1 h-1 rounded-full bg-primary animate-pulse"
      style={{
        left: p.left,
        top: p.top,
        boxShadow: "0 0 20px var(--rgb-primary)",
        animationDelay: `${i * 0.2}s`,
      }}
    />
  ))}
</div>

<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black pointer-events-none" />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* Scanlines Overlay */}
      <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass neon-border rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full pulse-glow" />
            <span className="font-[family-name:var(--font-rajdhani)] text-sm font-semibold uppercase tracking-widest text-primary">
              Next Generation Gaming Gear
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-[family-name:var(--font-orbitron)] text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl md:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="block text-foreground">DOMINATE</span>
            <span className="block text-primary neon-text">THE GAME</span>
          </h1>

          {/* Subheading */}
          <p className="font-[family-name:var(--font-rajdhani)] text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Experience elite performance with our premium RGB gaming peripherals.
            Built for champions, designed for victory.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/shop"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-[family-name:var(--font-rajdhani)] font-bold uppercase tracking-widest rounded-lg neon-box hover:scale-105 transition-all duration-300"
            >
              Explore Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <button
              onClick={downloadSetup}
              className="group inline-flex items-center gap-2 px-8 py-4 glass neon-border text-foreground font-[family-name:var(--font-rajdhani)] font-bold uppercase tracking-widest rounded-lg hover:bg-primary/10 transition-all duration-300 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              Save Setup
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-16 max-w-xl mx-auto">
            {[
              { value: "50K+", label: "Players" },
              { value: "99%", label: "Satisfaction" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-[family-name:var(--font-orbitron)] text-2xl sm:text-3xl font-bold text-primary neon-text">
                  {stat.value}
                </div>
                <div className="font-[family-name:var(--font-rajdhani)] text-sm uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
