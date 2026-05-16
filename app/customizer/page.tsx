"use client";

import { useState, useRef } from "react";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/components/toast"
import toasts from "@/config/toasts.json"
import { useEffect } from "react"


export default function CustomizerPage() {
  useEffect(() => {
  const savedColor = localStorage.getItem("rgbColor")

  if (savedColor) {
    setColor(savedColor)
    document.documentElement.style.setProperty("--rgb-primary", savedColor)
  }
}, [])
  const { showToast } = useToast()
  const changeRGB = (color: string) => {
    
    document.documentElement.style.setProperty("--rgb-primary", color)
    localStorage.setItem("rgbColor", color)
  }
  const [color, setColor] = useState(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("rgbColor") || "#00ffff"
  }

  return "#00ffff"
});
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const captureRef = useRef(null);
  const downloadSetup = () => {

    showToast(toasts.downloadSetup);

  };

  return (
    <div
      className="min-h-screen bg-black text-white p-10"
      
      style={{
        background: "#000000",
      }}
    >
      <div className="mb-8">
  <Link
    href="/"
    className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/20 bg-zinc-900/70 backdrop-blur-xl hover:scale-105 transition-all duration-300"
    style={{
      borderColor: color,
      boxShadow: `0 0 20px ${color}`,
      color: color,
    }}
  >
    <ArrowLeft className="w-5 h-5" />

    <span className="font-bold tracking-widest">
      BACK
    </span>
  </Link>
</div>

      <div className="flex flex-col items-center gap-6 mt-10 mb-12">
        <h2 className="text-2xl font-bold tracking-widest bg-[var(--rgb-primary)]/20
 neon-text">
          SELECT RGB THEME
        </h2>

        <div className="flex gap-6 bg-zinc-900/80 border border-[var(--rgb-primary)] rounded-3xl p-6 shadow-[0_0_40px_var(--rgb-primary)]">
          {[
            { color: "#00ffff", name: "Cyan", className: "bg-cyan-400 shadow-[0_0_30px_var(--rgb-primary)]" },
            { color: "#ff00ff", name: "Pink", className: "bg-fuchsia-500 shadow-[0_0_30px_#ff00ff]" },
            { color: "#00ff00", name: "Green", className: "bg-green-500 shadow-[0_0_30px_#00ff00]" },
            { color: "#ff0000", name: "Red", className: "bg-red-500 shadow-[0_0_30px_#ff0000]" },
          ].map((item) => (
            <button
              key={item.color}
              onClick={() => {
                setColor(item.color)
                changeRGB(item.color)
              }}
              className={`relative w-20 h-20 rounded-full ${item.className} hover:scale-125 transition-all duration-300 animate-pulse border-4 border-white/20`}
              title={item.name}
            >
              <span className="absolute inset-0 rounded-full animate-ping opacity-40 bg-white" />
            </button>
          ))}
        </div>
      </div>
      {/* TITLE */}
      <div className="text-center mb-12">

        <h1
          className="text-6xl font-bold mb-4"
          style={{
            color: color,
            textShadow: `0 0 20px ${color}`,
          }}
        >
          RGB CUSTOMIZER
        </h1>

        <p className="text-gray-400 text-xl">
          Customize your dream gaming setup
        </p>

      </div>

      {/* COLOR PICKER */}
      <div className="flex justify-center mb-12">
        <div className="relative group mt-4">

          <div
            className="absolute -inset-6 rounded-[40px] blur-3xl opacity-70 animate-pulse"
            style={{
              background: `
        radial-gradient(circle, ${color} 0%, transparent 70%)
      `,
            }}
          />

          <div
            className="absolute inset-0 rounded-[40px] animate-spin"
            style={{
              animationDuration: "6s",
              background: `
        conic-gradient(
          from 0deg,
          ${color},
          #ffffff,
          ${color},
          #111111,
          ${color}
        )
      `,
              padding: "3px",
            }}
          >
            <div className="w-full h-full bg-black rounded-[40px]" />
          </div>

          <label
            className="relative flex flex-col items-center justify-center w-56 h-32 rounded-[40px] overflow-hidden cursor-pointer hover:scale-110 transition-all duration-500"
            style={{
              background: `
        linear-gradient(
          135deg,
          ${color},
          #111111
        )
      `,
              boxShadow: `
        0 0 20px ${color},
        0 0 60px ${color}
      `,
            }}
          >

            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute top-0 left-[-120%] w-[80%] h-full rotate-12 bg-white/20 blur-2xl"
                style={{
                  animation: "shine 3s linear infinite",
                }}
              />
            </div>

            <span className="relative text-white text-2xl font-black tracking-[6px]">
              CUSTOM 
            </span>

            <span className="relative text-white/70 text-sm tracking-[4px] mt-2">
              PICK YOUR ENERGY
            </span>

            <input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value)
                changeRGB(e.target.value)
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </div>
      </div>
      {/* PRODUCTS */}
      <div
        ref={captureRef}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 bg-black p-10 rounded-3xl"
      >
        {[
          {
            name: "RGB Keyboard",
            price: "$129",
            specs: "Mechanical • RGB • Wireless",
            image:
              "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
          },
          {
            name: "Gaming Mouse",
            price: "$79",
            specs: "16000 DPI • Ultra Light",
            image:
              "https://images.unsplash.com/photo-1527814050087-3793815479db",
          },
          {
            name: "RGB Headset",
            price: "$149",
            specs: "7.1 Surround • Noise Cancel",
            image:
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
          },
          {
            name: "Gaming PC",
            price: "$2499",
            specs: "RTX 4090 • i9 • 64GB RAM",
            image:
              "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-3xl p-6 border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: color,
              boxShadow: `0 0 30px ${color}`,
            }}
          >
            <img
              src={item.image}
              className="h-48 w-full object-cover rounded-2xl mb-5 border"
              style={{
                borderColor: color,
                boxShadow: `0 0 20px ${color}`,
              }}
            />

            <h2 className="text-2xl font-bold mb-3">
              {item.name}
            </h2>

            <p className="bg-[var(--rgb-primary)]/20
 font-bold text-xl mb-2">
              {item.price}
            </p>

            <p className="text-gray-400 mb-5">
              {item.specs}
            </p>

            <button
              onClick={() => setSelectedProduct(item)}
              className="w-full py-3 rounded-xl font-bold text-black transition-all duration-300 hover:scale-105"
              style={{
                background: color,
              }}
            >
              Customize
            </button>
          </div>
        ))}
      </div>


      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">

          <div
            className="bg-zinc-900 rounded-3xl p-8 max-w-xl w-full border relative"
            style={{
              borderColor: color,
              boxShadow: `0 0 40px ${color}`,
            }}
          >

            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-white text-3xl"
            >
              ×
            </button>

            <img
              src={selectedProduct.image}
              className="w-full h-80 object-cover rounded-2xl mb-6"
            />

            <h2
              className="text-4xl font-bold mb-4"
              style={{
                color: color,
                textShadow: `0 0 20px ${color}`,
              }}
            >
              {selectedProduct.name}
            </h2>

            <p className="text-3xl bg-[var(--rgb-primary)]/20
 font-bold mb-4">
              {selectedProduct.price}
            </p>

            <p className="text-gray-300 text-lg mb-8">
              {selectedProduct.specs}
            </p>

            <button
              className="w-full py-4 rounded-2xl text-black font-bold text-xl"
              style={{
                background: color,
                boxShadow: `0 0 30px ${color}`,
              }}
            >
              Buy Now
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
