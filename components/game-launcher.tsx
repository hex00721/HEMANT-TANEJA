"use client"

export default function GameLauncher({
  game,
}: {
  game: any
}) {
  return (
    <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-6 shadow-[0_0_25px_var(--rgb-primary)]">
      
      <div className="flex gap-6 items-center">

        <img
          src={game.image}
          className="w-40 h-40 object-cover rounded-2xl"
        />

        <div className="flex-1">
          <h2 className="text-4xl font-bold text-[var(--rgb-primary)] mb-3">
            {game.name}
          </h2>

          <p className="text-gray-400 mb-6">
            READY TO PLAY
          </p>

          <div className="flex gap-4">
            <button
              className="px-8 py-4 rounded-2xl bg-[var(--rgb-primary)] text-black font-bold text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_25px_var(--rgb-primary)]"
              onClick={() =>
                alert(`Launching ${game.name}...`)
              }
            >
              PLAY
            </button>

            <button
              className="px-8 py-4 rounded-2xl border border-[var(--rgb-primary)] text-[var(--rgb-primary)] font-bold hover:bg-[var(--rgb-primary)] hover:text-black transition-all duration-300"
            >
              SETTINGS
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}