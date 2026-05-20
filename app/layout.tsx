import type { Metadata } from 'next'
import { Orbitron, Rajdhani } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from "@/context/cart-context"
import { PageLoader } from "@/components/page-loader"
import { WishlistProvider } from "@/context/wishlist-context"
import { CursorGlow } from "@/components/cursor-glow"
import { CustomCursor } from "@/components/custom-cursor"
import { ToastProvider } from "@/components/toast"
import { GlobalParticles } from "@/components/global-particles"
import { LivePopup } from "@/components/live-popup"
import { AnimatedBg } from "@/components/animated-bg"
import { ThemeLoader } from "@/components/theme-loader"
import { RecentlyViewedProvider } from "@/context/recently-viewed-context"
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: '--font-orbitron',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

export const metadata: Metadata = {
  title: ' HYPERBYTE | Premium Gaming Gear',
  description: 'Experience the future of gaming with HYPERBYTE - Premium RGB gaming peripherals and gear for elite gamers.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (

    <html lang="en" 
    suppressHydrationWarning
      className={`${orbitron.variable} ${rajdhani.variable} bg-background`}>
      <head>
        <meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1"
/>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function() {
          try {
            var color = localStorage.getItem("rgbColor");
            if (color) {
              document.documentElement.style.setProperty("--rgb-primary", color);
            }
          } catch (e) {}
        })();
      `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <ToastProvider>
                <ThemeLoader />
                <AnimatedBg />
                <PageLoader />
                <CustomCursor />
                <LivePopup />
                <GlobalParticles />

                <div className="relative z-10">
                  {children}
                </div>
              </ToastProvider>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}