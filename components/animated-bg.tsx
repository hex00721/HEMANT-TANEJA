"use client"

export function AnimatedBg() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--rgb-primary)]/20 rounded-full blur-[130px] animate-pulse" />

      <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[130px] animate-pulse delay-1000" />

      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-[var(--rgb-primary)]/10 rounded-full blur-[160px] animate-pulse delay-500" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
    </div>
  )
}