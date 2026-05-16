"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function GamesPage() {
  const [games, setGames] = useState<any[]>([])

  useEffect(() => {
    const fetchGames = async () => {
      const q = query(
        collection(db, "products"),
        where("category", "==", "Game")
      )

      const snapshot = await getDocs(q)

      setGames(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    }

    fetchGames()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl sm:text-3xl sm:text-4xl md:text-5xl md:text-6xl font-bold text-[var(--rgb-primary)] neon-text mb-12">
            AAA GAMES STORE
          </h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {games.map((game) => (
              <Link
                key={game.id}
                href={`/product/${game.id}`}
                className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl overflow-hidden shadow-[0_0_25px_var(--rgb-primary)] hover:scale-105 transition-all duration-300"
              >
                <img
                  src={game.image}
                  className="w-full h-72 object-cover"
                />

                <div className="p-5">
                  <h2 className="text-2xl font-bold mb-3">
                    {game.name}
                  </h2>

                  <p className="text-gray-400 mb-3">
                    {game.genre}
                  </p>

                  <p className="text-gray-400 mb-5">
                    {game.platform}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-[var(--rgb-primary)]">
                      ${game.price}
                    </span>

                    <span className="px-4 py-2 rounded-xl bg-[var(--rgb-primary)] text-black font-bold">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}