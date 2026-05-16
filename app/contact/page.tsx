"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, MapPin, Phone, Send, MessageSquare, Clock, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormState({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-[family-name:var(--font-rajdhani)] text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Get In Touch
          </span>
          <h1 className="font-[family-name:var(--font-orbitron)] text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">CONTACT</span>
            <span className="text-primary neon-text ml-3">US</span>
          </h1>
          <p className="font-[family-name:var(--font-rajdhani)] text-lg text-muted-foreground max-w-xl mx-auto">
            Have questions? Need support? Our team is ready to help you level up your gaming experience.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-12">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass rounded-2xl neon-border p-6 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 glass-strong rounded-xl neon-border">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-orbitron)] text-lg font-bold mb-1">
                      Email Us
                    </h3>
                    <p className="font-[family-name:var(--font-rajdhani)] text-muted-foreground">
                      support@HYPEgaming.com
                    </p>
                    <p className="font-[family-name:var(--font-rajdhani)] text-muted-foreground">
                      sales@HYPEgaming.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl neon-border p-6 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 glass-strong rounded-xl neon-border">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-orbitron)] text-lg font-bold mb-1">
                      Call Us
                    </h3>
                    <p className="font-[family-name:var(--font-rajdhani)] text-muted-foreground">
                      +1 (800) HYPERBYTE-GAME
                    </p>
                    <p className="font-[family-name:var(--font-rajdhani)] text-muted-foreground">
                      +1 (555) 439-4263
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl neon-border p-6 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 glass-strong rounded-xl neon-border">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-orbitron)] text-lg font-bold mb-1">
                      Visit Us
                    </h3>
                    <p className="font-[family-name:var(--font-rajdhani)] text-muted-foreground">
                      1337 Gamer Ave, Suite 420
                    </p>
                    <p className="font-[family-name:var(--font-rajdhani)] text-muted-foreground">
                      Los Angeles, CA 90210
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl neon-border p-6 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 glass-strong rounded-xl neon-border">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-orbitron)] text-lg font-bold mb-1">
                      Support Hours
                    </h3>
                    <p className="font-[family-name:var(--font-rajdhani)] text-muted-foreground">
                      24/7 Live Chat Support
                    </p>
                    <p className="font-[family-name:var(--font-rajdhani)] text-muted-foreground">
                      Phone: Mon-Fri 9AM-9PM PST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 glass rounded-2xl neon-border p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 glass-strong rounded-xl neon-border">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-bold">
                    Send a Message
                  </h2>
                  <p className="font-[family-name:var(--font-rajdhani)] text-muted-foreground">
                    {"We'll"} get back to you within 24 hours
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <div className="p-4 bg-primary/20 rounded-full pulse-glow">
                    <CheckCircle className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-primary">
                    Message Sent!
                  </h3>
                  <p className="font-[family-name:var(--font-rajdhani)] text-muted-foreground text-center max-w-sm">
                    Thank you for reaching out. Our team will respond to your inquiry shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-[family-name:var(--font-rajdhani)] text-sm font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 glass rounded-xl border border-border focus:border-primary focus:outline-none font-[family-name:var(--font-rajdhani)] text-foreground bg-transparent transition-colors duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="font-[family-name:var(--font-rajdhani)] text-sm font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 glass rounded-xl border border-border focus:border-primary focus:outline-none font-[family-name:var(--font-rajdhani)] text-foreground bg-transparent transition-colors duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-[family-name:var(--font-rajdhani)] text-sm font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Subject
                    </label>
                    <select
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-xl border border-border focus:border-primary focus:outline-none font-[family-name:var(--font-rajdhani)] text-foreground bg-transparent transition-colors duration-300"
                    >
                      <option value="">Select a topic</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="warranty">Warranty Claim</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-[family-name:var(--font-rajdhani)] text-sm font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-xl border border-border focus:border-primary focus:outline-none font-[family-name:var(--font-rajdhani)] text-foreground bg-transparent transition-colors duration-300 resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-[family-name:var(--font-rajdhani)] font-bold uppercase tracking-widest rounded-lg neon-box hover:scale-[1.02] transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
