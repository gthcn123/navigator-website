"use client"

import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-green-600 mb-4">404</h1>
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The career path you're looking for seems to have taken a different route.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Let's Get You Back on Track</CardTitle>
            <CardDescription>
              Don't worry, we'll help you find your way to the right career guidance resources.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/career-bank">
                  <Search className="h-4 w-4 mr-2" />
                  Explore Careers
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/quiz">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Take Quiz
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-sm text-gray-500">
          <p>
            If you believe this is an error, please{" "}
            <Link href="/contact" className="text-green-600 hover:text-green-700 underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
