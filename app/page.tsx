"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  GraduationCap,
  Users,
  Briefcase,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Video,
  Award,
  Clock,
  MapPin,
  Calendar,
  Search as SearchIcon,
} from "lucide-react"

export default function HomePage() {
  const [userName, setUserName] = useState("")
  const [userType, setUserType] = useState<"" | "student" | "graduate" | "professional">("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [location, setLocation] = useState("Loading...")
  const [visitorCount, setVisitorCount] = useState(0)
  const [completionProgress, setCompletionProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocation("Your Location"),
        () => setLocation("Location unavailable"),
      )
    } else {
      setLocation("Geolocation not supported")
    }
  }, [])

  useEffect(() => {
    const baseCount = 15847
    const sessionVisits = Number.parseInt(localStorage.getItem("sessionVisits") || "0")
    const newCount = baseCount + sessionVisits + Math.floor(Math.random() * 50)
    setVisitorCount(newCount)
    localStorage.setItem("sessionVisits", (sessionVisits + 1).toString())
  }, [])

  useEffect(() => {
    if (userName) sessionStorage.setItem("userName", userName)
    if (userType) sessionStorage.setItem("userType", userType)
  }, [userName, userType])

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName")
    const storedUserType = sessionStorage.getItem("userType")
    if (storedUserName) setUserName(storedUserName)
    if (storedUserType === "student" || storedUserType === "graduate" || storedUserType === "professional")
      setUserType(storedUserType)
  }, [])

  useEffect(() => {
    let progress = 0
    if (userName) progress += 30
    if (userType) progress += 70
    setCompletionProgress(progress)
  }, [userName, userType])

  const handleGetStarted = () => {
    if (userType) {
      window.location.href = "/career-bank"
    } else {
      alert("Please select your profile type (Student / Graduate / Professional) to continue.")
    }
  }

  const getPersonalizedGreeting = () => {
    if (!userType) return "Welcome to NextStep Navigator!"
    const greetings = {
      student: "Hello, Future Leader!",
      graduate: "Welcome, Rising Professional!",
      professional: "Hello, Career Changer!",
    }
    return greetings[userType as keyof typeof greetings] || "Welcome to NextStep Navigator!"
  }

  const getPersonalizedRecommendations = () => {
    const recommendations = {
      student: [
        { title: "Explore STEM Careers", icon: "🔬", path: "/career-bank?industry=Technology" },
        { title: "Take Interest Quiz", icon: "🧠", path: "/quiz" },
        { title: "College Prep Guide", icon: "📚", path: "/admission" },
      ],
      graduate: [
        { title: "Resume Builder", icon: "📄", path: "/resume" },
        { title: "Interview Prep", icon: "💼", path: "/interview" },
        { title: "Job Market Trends", icon: "📈", path: "/career-bank" },
      ],
      professional: [
        { title: "Career Transition", icon: "🔄", path: "/career-bank" },
        { title: "Skill Assessment", icon: "⚡", path: "/quiz" },
        { title: "Success Stories", icon: "🌟", path: "/stories" },
      ],
    }
    return userType ? recommendations[userType as keyof typeof recommendations] || [] : []
  }

  const glassCardStyle: React.CSSProperties = {
    background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
    border: "1px solid var(--color-border)",
    backdropFilter: "blur(6px)",
  }

  const accentBgClass = "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"

  return (
    <div
      className="min-h-screen text-[var(--color-foreground)]"
      style={{
        background: "linear-gradient(135deg, var(--color-background), color-mix(in srgb, var(--color-muted) 20%, var(--color-background)))",
      }}
    >
      {/* Top info bar */}
      <div className="bg-[var(--color-background)]/40 border-b border-[var(--color-border)] py-2">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-[var(--color-muted-foreground)]">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[var(--color-primary)]" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
              <span>{location}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
            <Users className="h-4 w-4 text-[var(--color-primary)]" />
            <span>{visitorCount.toLocaleString()} visitors</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Hero Left */}
          <div className="lg:col-span-2">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[color-mix(in srgb, var(--color-primary) 60%, white)]">
                {getPersonalizedGreeting()}
              </span>
            </h1>
            <p className="text-lg text-[var(--color-muted-foreground)] mb-6 max-w-3xl leading-relaxed">
              Discover tailored career paths, practical resources, and step-by-step guidance to help you choose the
              next right step in your professional journey.
            </p>

            {/* Search */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <div className="flex-1 relative">
                <Input
                  id="quickSearch"
                  placeholder="Search careers, skills, or industries (e.g. Data Science)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3"
                  style={glassCardStyle}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]">
                  <SearchIcon className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  className={`${accentBgClass}`}
                  onClick={() => (window.location.href = `/career-bank?search=${encodeURIComponent(searchQuery)}`)}
                >
                  Search
                </Button>
                <Button variant="ghost" className="border border-[var(--color-border)]">
                  <TrendingUp className="h-4 w-4 mr-2" /> Trending
                </Button>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge variant="secondary" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                AI Careers Trending
              </Badge>
              <Badge variant="outline">Remote Work Guide</Badge>
              <Badge variant="outline">Tech Skills 2024</Badge>
              <Badge variant="outline">Green Jobs Rising</Badge>
            </div>

            {/* Featured panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/career-bank?industry=Technology" className="group">
                <Card style={glassCardStyle} className="hover:scale-[1.01] transition-transform">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-md bg-[var(--color-primary)]/10">
                        <BookOpen className="h-5 w-5 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <h3 className="font-medium">Technology Paths</h3>
                        <p className="text-sm text-[var(--color-muted-foreground)]">Top roles, skills & roadmaps</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="p-0">
                      Explore <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/admission" className="group">
                <Card style={glassCardStyle} className="hover:scale-[1.01] transition-transform">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-md bg-[var(--color-primary)]/10">
                        <Calendar className="h-5 w-5 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <h3 className="font-medium">Scholarships & Grants</h3>
                        <p className="text-sm text-[var(--color-muted-foreground)]">Find funding opportunities</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="p-0">
                      Learn More <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/multimedia" className="group">
                <Card style={glassCardStyle} className="hover:scale-[1.01] transition-transform">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-md bg-[var(--color-primary)]/10">
                        <Video className="h-5 w-5 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <h3 className="font-medium">Video Library</h3>
                        <p className="text-sm text-[var(--color-muted-foreground)]">Talks, interviews & tips</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="p-0">
                      Watch <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Profile Right */}
          <aside>
            <Card style={glassCardStyle} className="sticky top-24">
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-xl">Let's Get Started</CardTitle>
                <CardDescription>Tell us a bit about yourself</CardDescription>

                <div className="mt-4">
                  <div className="flex justify-between text-sm text-[var(--color-muted-foreground)] mb-2">
                    <span>Profile Completion</span>
                    <span>{completionProgress}%</span>
                  </div>
                  <Progress value={completionProgress} className="h-2" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm">Your Name (optional)</Label>
                  <Input
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Sara Ahmed"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm">I am a</Label>
                  <RadioGroup value={userType} onValueChange={(v) => setUserType(v as any)} className="mt-3">
                    <div className="grid grid-cols-1 gap-3">
                      <label
                        onClick={() => setUserType("student")}
                        className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-shadow ${userType === "student" ? "ring-2 ring-[var(--color-primary)] bg-[var(--color-primary)]/6" : "hover:shadow-md"}`}
                        role="button"
                        aria-pressed={userType === "student"}
                      >
                        <RadioGroupItem value="student" id="student" />
                        <GraduationCap className="h-5 w-5 text-[var(--color-primary)]" />
                        <div>
                          <div className="font-medium">Student</div>
                          <div className="text-sm text-[var(--color-muted-foreground)]">Grades 8 - 12</div>
                        </div>
                      </label>

                      <label
                        onClick={() => setUserType("graduate")}
                        className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-shadow ${userType === "graduate" ? "ring-2 ring-[var(--color-primary)] bg-[var(--color-primary)]/6" : "hover:shadow-md"}`}
                        role="button"
                        aria-pressed={userType === "graduate"}
                      >
                        <RadioGroupItem value="graduate" id="graduate" />
                        <Users className="h-5 w-5 text-[var(--color-primary)]" />
                        <div>
                          <div className="font-medium">Graduate</div>
                          <div className="text-sm text-[var(--color-muted-foreground)]">Undergraduate / Postgraduate</div>
                        </div>
                      </label>

                      <label
                        onClick={() => setUserType("professional")}
                        className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-shadow ${userType === "professional" ? "ring-2 ring-[var(--color-primary)] bg-[var(--color-primary)]/6" : "hover:shadow-md"}`}
                        role="button"
                        aria-pressed={userType === "professional"}
                      >
                        <RadioGroupItem value="professional" id="professional" />
                        <Briefcase className="h-5 w-5 text-[var(--color-primary)]" />
                        <div>
                          <div className="font-medium">Professional</div>
                          <div className="text-sm text-[var(--color-muted-foreground)]">Career changer / upskilling</div>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleGetStarted}
                  className={`w-full py-3 font-medium ${accentBgClass}`}
                >
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <div className="text-sm text-[var(--color-muted-foreground)] text-center">
                  <span>We store your choices locally to personalize the experience. No account required to explore.</span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </section>

        {/* Recommendations */}
        {userType && (
          <section className="mt-12">
            <Card style={glassCardStyle}>
              <CardHeader>
                <CardTitle className="font-heading text-xl">Recommended for you</CardTitle>
                <CardDescription>Personalized suggestions based on your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getPersonalizedRecommendations().map((rec, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-all cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{rec.icon}</div>
                        <h3 className="font-medium mb-2">{rec.title}</h3>
                        <Button variant="ghost" size="sm" onClick={() => (window.location.href = rec.path)}>
                          Explore <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Stats, Featured, Success Stories, Call to Action, Footer */}
        {/* Stats */}
        <section className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card style={glassCardStyle} className="text-center">
              <CardContent className="p-6">
                <BookOpen className="h-8 w-8 text-[var(--color-primary)] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">500+</div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Career Profiles</div>
              </CardContent>
            </Card>

            <Card style={glassCardStyle} className="text-center">
              <CardContent className="p-6">
                <Award className="h-8 w-8 text-[var(--color-primary)] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">50+</div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Success Stories</div>
              </CardContent>
            </Card>

            <Card style={glassCardStyle} className="text-center">
              <CardContent className="p-6">
                <Video className="h-8 w-8 text-[var(--color-primary)] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">100+</div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Video Resources</div>
              </CardContent>
            </Card>

            <Card style={glassCardStyle} className="text-center">
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-[var(--color-primary)] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">95%</div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Success Rate</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured This Week */}
        <section className="mt-12 max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">Featured This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all cursor-pointer" style={glassCardStyle}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--color-primary)]/10 rounded-md">
                    <TrendingUp className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <Badge variant="secondary">Trending</Badge>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">AI & Machine Learning Careers</h3>
                <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
                  Explore growing roles, required skills, and career maps for AI-related professions.
                </p>
                <Button variant="ghost" size="sm">Learn More <ArrowRight className="ml-1 h-3 w-3" /></Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer" style={glassCardStyle}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--color-primary)]/10 rounded-md">
                    <Calendar className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <Badge variant="outline">New</Badge>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">2024 Scholarship Guide</h3>
                <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
                  A complete guide to scholarships, grants and aid opportunities worldwide.
                </p>
                <Button variant="ghost" size="sm">Download Guide <ArrowRight className="ml-1 h-3 w-3" /></Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer" style={glassCardStyle}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--color-primary)]/10 rounded-md">
                    <Video className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <Badge variant="secondary">Popular</Badge>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Interview Masterclass</h3>
                <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
                  Practical interview strategies from industry experts to help you stand out.
                </p>
                <Button variant="ghost" size="sm">Watch Now <ArrowRight className="ml-1 h-3 w-3" /></Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mt-12 max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all cursor-pointer" style={glassCardStyle}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 text-[var(--color-primary)] mr-2" />
                  <h3 className="font-medium">Sara Ahmed</h3>
                </div>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  Landed her dream AI job within 3 months of using NextStep Navigator.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all cursor-pointer" style={glassCardStyle}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 text-[var(--color-primary)] mr-2" />
                  <h3 className="font-medium">Ali Hassan</h3>
                </div>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  Successfully transitioned from teaching to software development with guidance from our career tools.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all cursor-pointer" style={glassCardStyle}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 text-[var(--color-primary)] mr-2" />
                  <h3 className="font-medium">Lina Khalid</h3>
                </div>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  Upskilled in data science and secured a promotion within 6 months.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center py-12 rounded-xl max-w-4xl mx-auto" style={{ background: "var(--color-sidebar)" }}>
          <h2 className="font-heading text-3xl font-bold mb-4">Ready to take the next step?</h2>
          <p className="text-[var(--color-muted-foreground)] mb-6">
            Join thousands of learners and professionals accelerating their career journey with personalized guidance.
          </p>
          <Button onClick={handleGetStarted} className={`py-3 px-6 font-medium text-lg ${accentBgClass}`}>
            Start Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        {/* Footer */}
        <footer className="mt-12 py-6 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-muted-foreground)]">
          &copy; {new Date().getFullYear()} NextStep Navigator. All rights reserved.
        </footer>
      </main>
    </div>
  )
}
