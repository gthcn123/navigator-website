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
  SearchIcon,
  Star,
  Target,
  Zap,
  Globe,
  CheckCircle,
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
        {
          title: "Explore STEM Careers",
          icon: <Target className="h-5 w-5" />,
          path: "/career-bank?industry=Technology",
        },
        { title: "Take Interest Quiz", icon: <BookOpen className="h-5 w-5" />, path: "/quiz" },
        { title: "College Prep Guide", icon: <GraduationCap className="h-5 w-5" />, path: "/admission" },
      ],
      graduate: [
        { title: "Resume Builder", icon: <Award className="h-5 w-5" />, path: "/resume" },
        { title: "Interview Prep", icon: <Users className="h-5 w-5" />, path: "/interview" },
        { title: "Job Market Trends", icon: <TrendingUp className="h-5 w-5" />, path: "/career-bank" },
      ],
      professional: [
        { title: "Career Transition", icon: <Briefcase className="h-5 w-5" />, path: "/career-bank" },
        { title: "Skill Assessment", icon: <Zap className="h-5 w-5" />, path: "/quiz" },
        { title: "Success Stories", icon: <Star className="h-5 w-5" />, path: "/stories" },
      ],
    }
    return userType ? recommendations[userType as keyof typeof recommendations] || [] : []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="bg-card/60 backdrop-blur-sm border-b border-border py-2 sm:py-3">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="font-medium text-xs sm:text-sm">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm">{location}</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Badge variant="secondary" className="text-xs px-2 bg-primary/10 text-primary border-primary/20">
              <Users className="h-3 w-3 mr-1" />
              <span className="hidden xs:inline">Visitors: </span>
              {visitorCount.toLocaleString()}
            </Badge>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
          <div className="xl:col-span-2 space-y-6 sm:space-y-8">
            {/* Hero Content */}
            <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">{getPersonalizedGreeting()}</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed mx-auto sm:mx-0">
                Discover tailored career paths, practical resources, and step-by-step guidance to help you choose the
                next right step in your professional journey.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search careers, skills, or industries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 sm:h-14 text-base bg-card border-border focus:border-primary"
                  />
                </div>
                <Button
                  size="lg"
                  className="h-12 sm:h-14 px-8 bg-primary hover:bg-primary/90 w-full sm:w-auto"
                  onClick={() => (window.location.href = `/career-bank?search=${encodeURIComponent(searchQuery)}`)}
                >
                  Search Careers
                </Button>
              </div>

              {/* Trending badges - horizontal scroll on mobile */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer whitespace-nowrap">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  AI Careers Trending
                </Badge>
                <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer whitespace-nowrap">
                  Remote Work Guide
                </Badge>
                <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer whitespace-nowrap">
                  Tech Skills 2024
                </Badge>
                <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer whitespace-nowrap">
                  Green Jobs Rising
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Link href="/career-bank?industry=Technology" className="group">
                <Card className="h-full card-hover border-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <div className="p-2 sm:p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                        Trending
                      </Badge>
                    </div>
                    <h3 className="font-heading text-base sm:text-lg font-semibold mb-2">Technology Paths</h3>
                    <p className="text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                      Top roles, skills & roadmaps for tech careers
                    </p>
                    <div className="flex items-center text-primary font-medium text-sm">
                      Explore <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admission" className="group">
                <Card className="h-full card-hover border-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <div className="p-2 sm:p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        New
                      </Badge>
                    </div>
                    <h3 className="font-heading text-base sm:text-lg font-semibold mb-2">Scholarships & Grants</h3>
                    <p className="text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                      Find funding opportunities worldwide
                    </p>
                    <div className="flex items-center text-primary font-medium text-sm">
                      Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/multimedia" className="group sm:col-span-2 lg:col-span-1">
                <Card className="h-full card-hover border-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <div className="p-2 sm:p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Video className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                        Popular
                      </Badge>
                    </div>
                    <h3 className="font-heading text-base sm:text-lg font-semibold mb-2">Video Library</h3>
                    <p className="text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                      Talks, interviews & career tips
                    </p>
                    <div className="flex items-center text-primary font-medium text-sm">
                      Watch <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <aside className="xl:sticky xl:top-24 order-first xl:order-last">
            <Card className="border-border bg-card/80 backdrop-blur-sm shadow-soft">
              <CardHeader className="text-center pb-4">
                <CardTitle className="font-heading text-xl sm:text-2xl">Let's Get Started</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Tell us about yourself to get personalized guidance
                </CardDescription>

                <div className="mt-4 sm:mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Profile Completion</span>
                    <span className="text-primary font-semibold">{completionProgress}%</span>
                  </div>
                  <Progress value={completionProgress} className="h-2 sm:h-3" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Your Name (optional)
                  </Label>
                  <Input
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Sara Ahmed"
                    className="bg-background border-border h-10 sm:h-11"
                  />
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <Label className="text-sm font-medium">I am a</Label>
                  <RadioGroup value={userType} onValueChange={(v) => setUserType(v as any)}>
                    <div className="space-y-2 sm:space-y-3">
                      {[
                        { value: "student", icon: GraduationCap, title: "Student", desc: "Grades 8 - 12" },
                        { value: "graduate", icon: Users, title: "Graduate", desc: "Undergraduate / Postgraduate" },
                        {
                          value: "professional",
                          icon: Briefcase,
                          title: "Professional",
                          desc: "Career changer / upskilling",
                        },
                      ].map((option) => (
                        <label
                          key={option.value}
                          onClick={() => setUserType(option.value as any)}
                          className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl cursor-pointer transition-all border-2 ${
                            userType === option.value
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border hover:border-primary/50 hover:bg-muted/50"
                          }`}
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <option.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="font-medium text-sm sm:text-base">{option.title}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">{option.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleGetStarted}
                  className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90"
                >
                  Start Your Journey <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  We store your choices locally to personalize the experience. No account required to explore.
                </p>
              </CardContent>
            </Card>
          </aside>
        </section>

        {userType && (
          <section className="mb-12 sm:mb-16 animate-fade-in-up">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center sm:text-left">
                <CardTitle className="font-heading text-xl sm:text-2xl flex items-center justify-center sm:justify-start gap-2">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  Recommended for you
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Personalized suggestions based on your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {getPersonalizedRecommendations().map((rec, idx) => (
                    <Card key={idx} className="card-hover border-border bg-background/50 cursor-pointer group">
                      <CardContent className="p-4 sm:p-6 text-center">
                        <div className="p-3 sm:p-4 rounded-xl bg-primary/10 w-fit mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                          {rec.icon}
                        </div>
                        <h3 className="font-heading font-semibold mb-2 text-sm sm:text-base">{rec.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => (window.location.href = rec.path)}
                          className="text-primary hover:text-primary/80 text-sm"
                        >
                          Explore <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        <section className="mb-12 sm:mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              { icon: BookOpen, number: "500+", label: "Career Profiles" },
              { icon: Award, number: "50+", label: "Success Stories" },
              { icon: Video, number: "100+", label: "Video Resources" },
              { icon: CheckCircle, number: "95%", label: "Success Rate" },
            ].map((stat, idx) => (
              <Card key={idx} className="text-center border-border bg-card/50 backdrop-blur-sm card-hover">
                <CardContent className="p-4 sm:p-6">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2 sm:mb-4" />
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Featured This Week</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover the latest career insights and opportunities curated by our experts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: TrendingUp,
                badge: "Trending",
                title: "AI & Machine Learning Careers",
                description: "Explore growing roles, required skills, and career maps for AI-related professions.",
                action: "Learn More",
              },
              {
                icon: Calendar,
                badge: "New",
                title: "2024 Scholarship Guide",
                description: "A complete guide to scholarships, grants and aid opportunities worldwide.",
                action: "Download Guide",
              },
              {
                icon: Video,
                badge: "Popular",
                title: "Interview Masterclass",
                description: "Practical interview strategies from industry experts to help you stand out.",
                action: "Watch Now",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="card-hover border-border bg-card/50 backdrop-blur-sm cursor-pointer group md:col-span-1 lg:col-span-1"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <Badge
                      variant={idx === 0 ? "secondary" : "outline"}
                      className={`text-xs ${idx === 0 ? "bg-accent/10 text-accent" : ""}`}
                    >
                      {item.badge}
                    </Badge>
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-semibold mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex items-center text-primary font-medium text-sm">
                    {item.action} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Success Stories</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real stories from people who transformed their careers with NextStep Navigator
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: "Sara Ahmed", story: "Landed her dream AI job within 3 months of using NextStep Navigator." },
              {
                name: "Ali Hassan",
                story:
                  "Successfully transitioned from teaching to software development with guidance from our career tools.",
              },
              { name: "Lina Khalid", story: "Upskilled in data science and secured a promotion within 6 months." },
            ].map((person, idx) => (
              <Card key={idx} className="card-hover border-border bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="p-2 rounded-full bg-primary/10 mr-3">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-sm sm:text-base">{person.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{person.story}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12 sm:mb-16">
          <Card className="text-center py-12 sm:py-16 px-6 sm:px-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/20">
            <CardContent className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
              <div className="p-3 sm:p-4 rounded-full bg-primary/10 w-fit mx-auto">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold">Ready to take the next step?</h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Join thousands of learners and professionals accelerating their career journey with personalized
                guidance.
              </p>
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 w-full sm:w-auto"
              >
                Start Now <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="py-6 sm:py-8 border-t border-border text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NextStep Navigator. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}
