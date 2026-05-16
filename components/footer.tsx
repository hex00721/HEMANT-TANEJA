"use client"

import Link from "next/link"
import { Hexagon, Twitter, Instagram, Youtube, Twitch } from "lucide-react"

const footerLinks = {
  products: [
    { label: "Keyboards", href: "/shop?category=keyboard" },
    { label: "Mice", href: "/shop?category=mouse" },
    { label: "Headsets", href: "/shop?category=headset" },
    { label: "Gaming PCs", href: "/shop?category=pc" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Warranty", href: "/warranty" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitch, href: "#", label: "Twitch" },
]

export function Footer() {
  return (
    <footer className="relative bg-secondary/50 border-t border-border">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <Hexagon className="w-10 h-10 text-primary fill-primary/20" />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">
                  HX
                </span>
              </div>
              <span className="font-[family-name:var(--font-orbitron)] text-xl font-bold tracking-wider">
                <span className="text-primary neon-text">HYPERBYTE</span>
                <span className="text-foreground ml-1">GAMING</span>
              </span>
            </Link>
            
            <p className="font-[family-name:var(--font-rajdhani)] text-muted-foreground max-w-sm leading-relaxed">
              Elevate your gaming experience with premium RGB peripherals. Built for champions, designed for victory.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 glass rounded-lg neon-border hover:bg-primary/20 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-wider text-foreground">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-rajdhani)] text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-wider text-foreground">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-rajdhani)] text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-rajdhani)] text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-rajdhani)] text-sm text-muted-foreground">
            © {new Date().getFullYear()} HYPERBYTE . All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-[family-name:var(--font-rajdhani)] text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-[family-name:var(--font-rajdhani)] text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
