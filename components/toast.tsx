"use client"

import { createContext, useContext, useState } from "react"

type ToastContextType = {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("")

  const showToast = (msg: string) => {
    setMessage(msg)

    setTimeout(() => {
      setMessage("")
    }, 2500)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {message && (
        <div className="fixed bottom-8 right-8 z-[999999] bg-zinc-900 border border-[var(--rgb-primary)] text-white px-6 py-4 rounded-2xl shadow-[0_0_30px_var(--rgb-primary)]">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider")
  }

  return context
}