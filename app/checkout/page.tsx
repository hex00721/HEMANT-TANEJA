
"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useEffect } from "react"
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useToast } from "@/components/toast"
import toasts from "@/config/toasts.json"



export default function CheckoutPage() {
  const [placingOrder, setPlacingOrder] = useState(false)
  const router = useRouter()
  const { showToast } = useToast()
  const { cartItems, cartTotal, clearCart } = useCart()

  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)
  const [appliedCouponId, setAppliedCouponId] = useState("")
  const [appliedCouponCode, setAppliedCouponCode] = useState("")
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user)
      setCheckingAuth(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    setDiscount(0)
    setAppliedCouponId("")
    setAppliedCouponCode("")
  }, [cartTotal])



  const [success, setSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }
  const applyCoupon = async () => {
    try {
      if (!coupon.trim()) {
        showToast("Enter coupon code")
        return
      }

      const couponQuery = query(
        collection(db, "coupons"),
        where("code", "==", coupon.trim().toUpperCase())
      )

      const couponSnapshot = await getDocs(couponQuery)

      if (couponSnapshot.empty) {
        setDiscount(0)
        showToast("Invalid coupon")
        return
      }

      const couponDoc = couponSnapshot.docs[0]
      const couponData = couponDoc.data()

      if (!couponData.active) {
        setDiscount(0)
        showToast("Coupon is inactive")
        return
      }

      if (
        couponData.expiresAt &&
        couponData.expiresAt.toDate &&
        new Date() > couponData.expiresAt.toDate()
      ) {
        setDiscount(0)
        showToast("Coupon expired")
        return
      }

      if (cartTotal < Number(couponData.minimumOrder || 0)) {
        setDiscount(0)
        showToast(`Minimum order required: ${couponData.minimumOrder}`)
        return
      }

      if (Number(couponData.usedCount || 0) >= Number(couponData.usageLimit || 1)) {
        setDiscount(0)
        showToast("Coupon usage limit reached")
        return
      }

      const discountAmount =
        (cartTotal * Number(couponData.discount)) / 100

      setDiscount(discountAmount)

      setAppliedCouponId(couponDoc.id)
      setAppliedCouponCode(couponData.code)

      showToast(`${couponData.discount}% coupon applied`)
    } catch (error: any) {
      console.log(error)
      showToast(error.message || toasts.orderFailed)
    } finally {
      setPlacingOrder(false)
    }
  }

  const handlePurchase = async () => {
    if (placingOrder) return

    setPlacingOrder(true)
    if (!isLoggedIn) {
      showToast(toasts.loginBeforeCheckout)
      router.push("/login?redirect=/checkout")
      return

    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.contact
    ) {
      showToast(toasts.checkoutRequiredFields)
      return
    }

    if (cartItems.length === 0) {
      showToast(toasts.cartEmpty)
      return
    }

    if (paymentMethod === "card") {
      if (!formData.cardNumber || !formData.expiry || !formData.cvv) {
        showToast(toasts.cardDetailsRequired)
        return
      }
    }

    if (paymentMethod === "upi") {
      if (!formData.upiId) {
        showToast(toasts.upiRequired)
        return
      }
    }

    try {
      for (const item of cartItems) {
        const productRef = doc(db, "products", item.id)
        const productSnap = await getDoc(productRef)

        if (productSnap.exists()) {
          const productData = productSnap.data()
          const currentStock = productData.stock ?? 0

          if (currentStock < item.quantity) {
            showToast(`${item.name} is out of stock`)
            return
          }
        }
      }

      const orderItems = cartItems.map((item) => ({
        ...item,
        licenseKey:
          (item as any).category === "Game"
            ? `HX-${Math.random()
              .toString(36)
              .substring(2, 7)
              .toUpperCase()}-${Math.random()
                .toString(36)
                .substring(2, 7)
                .toUpperCase()}`
            : null,
      }))

      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser?.uid,
        customerName: formData.name,
        email: formData.email,
        address: formData.address,
        contact: formData.contact,
        paymentMethod,
        items: orderItems,
        total: Math.max(cartTotal - discount, 0),
        discount,
        couponCode: appliedCouponCode || null,
        createdAt: new Date(),
        status: "Packed",
      })

      for (const item of cartItems) {
        const productRef = doc(db, "products", item.id)
        const productSnap = await getDoc(productRef)

        if (productSnap.exists()) {
          const productData = productSnap.data()
          const currentStock = productData.stock ?? 0

          await updateDoc(productRef, {
            stock: Math.max(currentStock - item.quantity, 0),
          })
        }
      }
      if (appliedCouponId) {
        const couponRef = doc(db, "coupons", appliedCouponId)

        const couponSnap = await getDoc(couponRef)

        if (couponSnap.exists()) {
          const couponData = couponSnap.data()

          await updateDoc(couponRef, {
            usedCount: Number(couponData.usedCount || 0) + 1,
          })
        }
      }

      clearCart()
setSuccess(true)
    } catch (error: any) {
      console.log(error)
      showToast(error.message || toasts.orderFailed)
    }
  }
  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl text-[var(--rgb-primary)]">
          Checking login...
        </h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-5 sm:p-8 md:p-10">
          <div className="bg-zinc-900 p-8 rounded-3xl border border-[var(--rgb-primary)] shadow-[0_0_30px_var(--rgb-primary)]">
            <h1 className="text-4xl font-bold bg-[var(--rgb-primary)]/20
 mb-8">
              Checkout
            </h1>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
              />

              <input
                type="text"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
              />

              <input
                type="text"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                className="w-full bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
              />

              <div className="space-y-4">
                <h2 className="text-2xl font-bold bg-[var(--rgb-primary)]/20
">
                  Payment Method
                </h2>

                <label className="flex items-center gap-3 bg-black border border-[var(--rgb-primary)] rounded-xl p-4 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span>Credit / Debit Card</span>
                </label>

                <label className="flex items-center gap-3 bg-black border border-[var(--rgb-primary)] rounded-xl p-4 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                  />
                  <span>UPI Payment</span>
                </label>

                <label className="flex items-center gap-3 bg-black border border-[var(--rgb-primary)] rounded-xl p-4 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 mt-6">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => handleChange("cardNumber", e.target.value)}
                    className="w-full bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => handleChange("expiry", e.target.value)}
                      className="bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
                    />

                    <input
                      type="text"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleChange("cvv", e.target.value)}
                      className="bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="mt-6 bg-black border border-[var(--rgb-primary)] rounded-2xl p-6 text-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay"
                    className="mx-auto rounded-2xl mb-4"
                  />

                  <p className="bg-[var(--rgb-primary)]/20
 text-lg font-bold mb-4">
                    hyperbyte@upi
                  </p>

                  <input
                    type="text"
                    placeholder="Enter Your UPI ID"
                    value={formData.upiId}
                    onChange={(e) => handleChange("upiId", e.target.value)}
                    className="w-full bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
                  />
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="mt-6 bg-black border border-[var(--rgb-primary)] rounded-2xl p-6">
                  <p className="text-lg text-gray-300">
                    Pay with cash when your order arrives.
                  </p>
                </div>
              )}

              <button
                onClick={handlePurchase}
                disabled={placingOrder}
               className="w-full py-4 rounded-2xl bg-[var(--rgb-primary)] text-black font-bold text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_var(--rgb-primary)] disabled:opacity-50 disabled:hover:scale-100"
              >
                {placingOrder ? "Processing..." : "Complete Purchase"}
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-[var(--rgb-primary)] shadow-[0_0_30px_var(--rgb-primary)]">
            <h2 className="text-3xl font-bold bg-[var(--rgb-primary)]/20
 mb-8">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-black p-4 rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="bg-[var(--rgb-primary)]/20
">${Number(item.price).toFixed(2)}</p>
                    <p className="text-gray-400">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                className="flex-1 bg-black border border-[var(--rgb-primary)] rounded-xl p-4 outline-none"
              />

              <button
                onClick={applyCoupon}
                className="px-6 rounded-xl bg-[var(--rgb-primary)] text-black font-bold"
              >
                Apply
              </button>
            </div>

            <div className="border-t border-[var(--rgb-primary)] mt-8 pt-6">
              <div className="flex justify-between text-3xl font-bold">
                <span>Total</span>
                <span className="bg-[var(--rgb-primary)]/20
">
                  ${Math.max(cartTotal - discount, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {success && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[99999]">
          <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-5 sm:p-8 md:p-10 text-center shadow-[0_0_40px_var(--rgb-primary)]">
            <h2 className="text-4xl font-bold bg-[var(--rgb-primary)]/20
 mb-4">
              Order Placed!
            </h2>

            <p className="text-gray-300 mb-6">
              Your gaming gear order has been successfully placed.
            </p>

            <Link
              href="/tracking"
              className="inline-block bg-[var(--rgb-primary)] text-black px-8 py-3 rounded-xl font-bold"
            >
              Track Order
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}