"use client"

import { useEffect, useState } from "react"

const purchases = [
    "Rohan from Delhi purchased HYPERBYTE Titan PC",
    "Aman from Mumbai purchased RGB Phantom Keyboard",
    "Harsh from Punjab purchased Nova 7.1 Headset",
    "Simran from Chandigarh purchased Viper Elite Mouse",
    "Arjun from Bangalore purchased HYPERBYTE Apex Pro Gaming PC",
    "Karan from Hyderabad purchased Eclipse Wireless Headset",
    "Neha from Jaipur purchased RGB Phantom Keyboard",
    "Rahul from Pune purchased Strike Pro Mouse",
    "Priya from Delhi purchased HYPERBYTE Nova Headset",
    "Sahil from Lucknow purchased Titan Gaming PC",
    "Ankit from Noida purchased Compact 60% Keyboard",
    "Tanya from Chandigarh purchased RGB Gaming Bundle",
    "Vikram from Ahmedabad purchased Viper Elite Mouse",
    "Aditya from Kolkata purchased HYPERBYTE Gaming Setup",
]

export function LivePopup() {
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            const random =
                purchases[Math.floor(Math.random() * purchases.length)]

            setMessage(random)
            setVisible(true)

            setTimeout(() => {
                setVisible(false)
            }, 4000)
        }, 10000)

        return () => clearInterval(interval)
    }, [])

    if (!visible) return null

    return (
        <div className="fixed bottom-8 left-8 z-[999999] bg-zinc-900 border border-[var(--rgb-primary)] rounded-2xl px-6 py-4 shadow-[0_0_30px_var(--rgb-primary)] animate-in slide-in-from-left duration-500">
            <p className="text-sm text-gray-400 mb-1">
                LIVE PURCHASE
            </p>

            <h3 className="font-bold text-white">
                {message}
            </h3>
        </div>
    )
}