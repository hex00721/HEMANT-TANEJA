"use client"

import { useEffect, useState } from "react"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import GameLauncher from "@/components/game-launcher"

export default function LibraryPage() {
  const [games, setGames] = useState<any[]>([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return

      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid)
      )

      const snapshot = await getDocs(q)

      const purchasedGames: any[] = []

      snapshot.docs.forEach((doc) => {
        const order = doc.data()

        order.items?.forEach((item: any) => {
          if (item.category === "Game") {
            purchasedGames.push(item)
          }
        })
      })

      setGames(purchasedGames)
    })

    return () => unsubscribe()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-6xl font-bold text-[var(--rgb-primary)] neon-text mb-12">
            MY GAME LIBRARY
          </h1>

          <div className="space-y-8">
  {games.map((game, index) => (
    <GameLauncher
      key={index}
      game={game}
    />
  ))}
</div>
        </div>
      </section>

      <Footer />
    </main>
  )
}