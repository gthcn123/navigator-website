"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, Search, ArrowLeft, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function NotFound() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    const q = query.trim()
    router.push(q ? `/career-bank?search=${encodeURIComponent(q)}` : "/career-bank")
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full text-center">

        {/* Illustration + 404 */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-7xl md:text-8xl font-extrabold leading-tight mb-2 text-gradient-primary">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-3">
            Page Not Found
          </h2>

          <p className="text-md text-[var(--muted)] max-w-xl mx-auto">
            Oops — the page you tried to reach disappeared off the map. Don&apos;t worry, we have tools to help you get
            back on track to the right career resources.
          </p>
        </div>

        {/* Search card */}
        <Card className="glass-card mb-6 animate-slide-in-left">
          <CardHeader className="text-left">
            <CardTitle>Search Careers & Resources</CardTitle>
            <CardDescription>
              Try searching for a role, skill, or industry (e.g. "data analyst").
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="flex-1 relative">
                <Input
                  aria-label="Search careers"
                  placeholder="Search careers, skills or industries..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 py-3"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                  <Search className="h-5 w-5" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary-600)]"
                >
                  <Search className="h-4 w-4 mr-2" /> Search
                </Button>
                <Button variant="ghost" onClick={() => router.push("/career-bank")}>
                  Browse
                </Button>
              </div>
            </form>

            <div className="mt-4 text-sm text-[var(--muted)]">
              Tip: Try keywords like{" "}
              <span className="text-[var(--foreground)] font-medium">"software engineer"</span>,{" "}
              <span className="text-[var(--foreground)] font-medium">"marketing"</span> or{" "}
              <span className="text-[var(--foreground)] font-medium">"data science"</span>.
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 animate-fade-in-up">
          <Button asChild className="bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary-600)]">
            <Link href="/" aria-label="Go to home">
              <Home className="h-4 w-4 mr-2 inline" /> Home
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/career-bank" aria-label="Explore careers">
              <Search className="h-4 w-4 mr-2 inline" /> Explore Careers
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/quiz" aria-label="Take interest quiz">
              <ArrowLeft className="h-4 w-4 mr-2 inline" /> Take Quiz
            </Link>
          </Button>
        </div>

        {/* Helpful links */}
        <div className="mb-6 text-sm text-[var(--muted)] animate-slide-in-left">
          <p className="mb-2">Helpful links:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/resources" className="px-3 py-2 rounded-md border border-[var(--card-border)] hover:bg-[var(--primary)]/10">
              <BookOpen className="inline h-4 w-4 mr-2" /> Resource Library
            </Link>
            <Link href="/multimedia" className="px-3 py-2 rounded-md border border-[var(--card-border)] hover:bg-[var(--primary)]/10">
              Videos & Podcasts
            </Link>
            <Link href="/stories" className="px-3 py-2 rounded-md border border-[var(--card-border)] hover:bg-[var(--primary)]/10">
              Success Stories
            </Link>
            <Link href="/contact" className="px-3 py-2 rounded-md border border-[var(--card-border)] hover:bg-[var(--primary)]/10 underline text-[var(--foreground)]">
              Contact Support
            </Link>
          </div>
        </div>

        {/* Small footer line */}
        <div className="text-xs text-[var(--muted)] animate-fade-in-up">
          <p>
            If the problem persists, please <Link href="/contact" className="text-[var(--primary)] underline">contact support</Link> or try going back to the{" "}
            <button onClick={() => history.back()} className="text-[var(--primary)] underline">previous page</button>.
          </p>
        </div>
      </div>
    </div>
  )
}
