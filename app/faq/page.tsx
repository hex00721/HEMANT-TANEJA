"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Orders usually arrive within 3-7 business days.",
  },
  {
    question: "Do products include RGB customization?",
    answer: "Yes. Most HYPERBYTE products support full RGB customization.",
  },
  {
    question: "Can I return products?",
    answer: "Yes. We offer a 7-day replacement and return policy.",
  },
  {
    question: "What payment methods are supported?",
    answer: "We support Cards, UPI, and Cash on Delivery.",
  },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-[var(--rgb-primary)] neon-text mb-12 text-center">
            FAQ
          </h1>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-6 shadow-[0_0_25px_var(--rgb-primary)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">
                    {faq.question}
                  </h2>

                  <ChevronDown className="w-6 h-6 text-[var(--rgb-primary)]" />
                </div>

                <p className="text-gray-400 text-lg">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}