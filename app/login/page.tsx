"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { sendEmailVerification } from "firebase/auth"
import { useToast } from "@/components/toast"
import toasts from "@/config/toasts.json"
import { FcGoogle } from "react-icons/fc"

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export default function LoginPage() {
  const { showToast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  const handleLogin = async () => {
    if (!email || !password) {
      showToast(toasts.fillAllFields)

      return
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user)

        showToast(toasts.checkVerificationMail)
        return
      }

      localStorage.setItem("loggedIn", "true")

      showToast(toasts.loginSuccess)

      router.push(redirect)
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        showToast(toasts.invalidCredentials)
      } else if (error.code === "auth/user-not-found") {
        showToast(toasts.userNotFound)
      } else {
        showToast(toasts.loginFailed)
      }
    }

  }
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)

      showToast(toasts.loginSuccess)
      router.push(redirect)
    } catch (error: any) {
      showToast(error.message || toasts.loginFailed)
    }
  }
  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--rgb-primary)]/20 rounded-full blur-[120px] animate-pulse" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />

        <div className="absolute inset-0 cyber-grid opacity-20" />

      </div>
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-5 py-3 rounded-2xl border border-[var(--rgb-primary)] bg-black/40 backdrop-blur-xl bg-[var(--rgb-primary)]/20
 hover:bg-[var(--rgb-primary)] hover:text-black transition-all duration-300 shadow-[0_0_20px_var(--rgb-primary)]"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>
      <div className="relative z-10 w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-[var(--rgb-primary)] rounded-3xl p-8 shadow-[0_0_40px_var(--rgb-primary)]">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8"
          style={{
            color: "var(--rgb-primary)",
            textShadow: "0 0 20px var(--rgb-primary)",
          }}
        >
          LOGIN
        </h1>


        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full py-4 rounded-2xl bg-[var(--rgb-primary)] text-black font-bold text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_var(--rgb-primary)]"
          >
            Login
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-full py-4 rounded-2xl border border-[var(--rgb-primary)] flex items-center justify-center gap-4 text-white font-bold text-xl hover:bg-zinc-900 transition-all duration-300"
          >
            <FcGoogle size={28} />

            Sign in with Google
          </button>

          <p className="text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-bold"
              style={{
                color: "var(--rgb-primary)",
              }}
            >
              Signup
            </Link>
          </p>

        </div>
      </div>
    </main>
  )
}