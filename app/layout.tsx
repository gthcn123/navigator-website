import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Header } from "@/components/navigation/header"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb"
import { Footer } from "@/components/navigation/footer"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "NextStep Navigator - Career Guidance Platform",
  description:
    "Discover your perfect career path with personalized guidance, resources, and expert insights for students, graduates, and professionals.",
  generator: "NextStep Navigator",
  keywords: "career guidance, career counseling, job search, education, professional development",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "var(--primary)",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <head><script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        try {
          var theme = localStorage.getItem('theme');
          if (!theme) {
            var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDark ? 'dark' : 'light';
          }
          document.documentElement.classList.remove('dark');
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          }
        } catch(e) {}
      })();
    `,
  }}
/>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --font-space-grotesk: ${spaceGrotesk.style?.fontFamily || "Space Grotesk"}, sans-serif;
              --font-dm-sans: ${dmSans.style?.fontFamily || "DM Sans"}, sans-serif;

              --background: var(--background);
              --foreground: var(--foreground);
              --card: var(--card);
              --card-border: var(--border);
              --primary: var(--primary);
              --secondary: var(--secondary);
              --muted: var(--muted);
              --accent: var(--accent);
              --radius: var(--radius);
            }

            body {
              margin: 0;
              font-family: var(--font-dm-sans);
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background-color: var(--background);
              color: var(--foreground);
            }

            .skip-link {
              position: absolute;
              left: 1rem;
              top: 1rem;
              z-index: 9999;
              padding: 0.5rem 0.75rem;
              border-radius: var(--radius);
              background-color: var(--card);
              color: var(--foreground);
              transform: translateY(-120%);
              transition: transform 0.18s ease;
            }
            .skip-link:focus { transform: translateY(0%); outline: 2px solid var(--primary); }

            .container {
              max-width: var(--container-max);
              margin-left: auto;
              margin-right: auto;
              padding-left: 1rem;
              padding-right: 1rem;
            }
          `,
          }}
        />
      </head>

      <body className="font-body min-h-screen flex flex-col">
        <a className="skip-link" href="#main">Skip to content</a>

        <Header />
        <BreadcrumbNav />
        <main id="main" className="flex-1">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
