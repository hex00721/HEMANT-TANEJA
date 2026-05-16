export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 border-4 border-[var(--rgb-primary)] border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_40px_var(--rgb-primary)]" />

        <h2 className="mt-8 text-4xl font-bold text-[var(--rgb-primary)]
 tracking-widest">
          HYPERBYTE
        </h2>

        <p className="mt-3 text-gray-400 uppercase tracking-[0.4em]">
          Loading Gear
        </p>
      </div>
    </div>
  )
}