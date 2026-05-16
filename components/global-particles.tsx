"use client"

const particles = [
  { left: "8%", top: "20%" },
  { left: "18%", top: "70%" },
  { left: "32%", top: "40%" },
  { left: "48%", top: "85%" },
  { left: "60%", top: "25%" },
  { left: "75%", top: "60%" },
  { left: "90%", top: "35%" },
  { left: "12%", top: "90%" },
  { left: "40%", top: "10%" },
  { left: "85%", top: "80%" },
]

export function GlobalParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[var(--rgb-primary)] animate-pulse"
          style={{
            left: p.left,
            top: p.top,
            boxShadow: "0 0 20px var(--rgb-primary)",
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  )
}