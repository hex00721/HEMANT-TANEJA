"use client"

import { useEffect, useState } from "react"
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db, auth } from "@/lib/firebase"

export default function ReviewSection({
  productId,
}: {
  productId: string
}) {
  const [reviews, setReviews] = useState<any[]>([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  const fetchReviews = async () => {
    const q = query(
      collection(db, "reviews"),
      where("productId", "==", productId)
    )

    const snapshot = await getDocs(q)

    setReviews(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    )
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const submitReview = async () => {
    if (!auth.currentUser) return

    await addDoc(collection(db, "reviews"), {
      productId,
      rating,
      comment,
      user: auth.currentUser.email,
      createdAt: new Date(),
    })

    setComment("")
    fetchReviews()
  }

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-[var(--rgb-primary)] mb-6">
        Reviews
      </h2>

      <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-6 mb-8">
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full mb-4 bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
        >
          <option value={5}>★★★★★</option>
          <option value={4}>★★★★☆</option>
          <option value={3}>★★★☆☆</option>
          <option value={2}>★★☆☆☆</option>
          <option value={1}>★☆☆☆☆</option>
        </select>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full min-h-32 bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
        />

        <button
          onClick={submitReview}
          className="mt-5 px-8 py-4 rounded-2xl bg-[var(--rgb-primary)] text-black font-bold"
        >
          Submit Review
        </button>
      </div>

      <div className="space-y-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-2xl p-5"
          >
            <div className="flex justify-between mb-3">
              <p className="font-bold">
                {review.user}
              </p>

              <p className="text-yellow-400">
                {"★".repeat(review.rating)}
              </p>
            </div>

            <p className="text-gray-300">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}