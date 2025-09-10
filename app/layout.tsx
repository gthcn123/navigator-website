import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Header } from "@/components/navigation/header"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb"
import { Footer } from "@/components/navigation/footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "NextStep Navigator - Career Guidance Platform",
  description:
    "Discover your perfect career path with personalized guidance, resources, and expert insights for students, graduates, and professionals.",
  generator: "NextStep Navigator",
  keywords: "career guidance, career counseling, job search, education, professional development",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-body ${GeistSans.variable} ${GeistMono.variable} min-h-screen flex flex-col`}>
        <Header />
        <BreadcrumbNav />
        <main className="flex-1">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
