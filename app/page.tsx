"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"

export default function HomePage() {
  const [userName, setUserName] = useState("")
  const [userType, setUserType] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [location, setLocation] = useState("Loading...")
  const [visitorCount, setVisitorCount] = useState(0)
  const [completionProgress, setCompletionProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate location name (in real app, would use reverse geocoding)
          setLocation("Your Location")
        },
        () => {
          setLocation("Location unavailable")
        },
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

  // Save user data to session storage
  useEffect(() => {
    if (userName) {
      sessionStorage.setItem("userName", userName)
    }
    if (userType) {
      sessionStorage.setItem("userType", userType)
    }
  }, [userName, userType])

  useEffect(() => {
    let progress = 0
    if (userName) progress += 30
    if (userType) progress += 70
    setCompletionProgress(progress)
  }, [userName, userType])

  // Load existing user data
  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName")
    const storedUserType = sessionStorage.getItem("userType")
    if (storedUserName) setUserName(storedUserName)
    if (storedUserType) setUserType(storedUserType)
  }, [])

  const handleGetStarted = () => {
    if (userType) {
      // Navigate to career bank with user context
      window.location.href = "/career-bank"
    }
  }

  const getPersonalizedGreeting = () => {
    if (!userType) return "Welcome to NextStep Navigator!"

    const greetings = {
      student: "Welcome, Future Leader!",
      graduate: "Welcome, Rising Professional!",
      professional: "Welcome, Career Changer!",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="bg-primary/10 border-b border-primary/20 py-2">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-primary" />
            <span>{visitorCount.toLocaleString()} visitors today</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {getPersonalizedGreeting()}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover your perfect career path with personalized guidance, expert insights, and comprehensive resources
            tailored to your journey.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="animate-pulse">
              <TrendingUp className="h-3 w-3 mr-1" />
              AI Careers Trending
            </Badge>
            <Badge variant="outline">Remote Work Guide</Badge>
            <Badge variant="outline">Tech Skills 2024</Badge>
            <Badge variant="outline">Green Jobs Rising</Badge>
          </div>
        </div>

        {/* User Selection Form */}
        <Card className="max-w-2xl mx-auto mb-12 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl">Let's Get Started</CardTitle>
            <CardDescription>Tell us about yourself to receive personalized career guidance</CardDescription>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Profile Completion</span>
                <span>{completionProgress}%</span>
              </div>
              <Progress value={completionProgress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userName" className="font-medium">
                Your Name (Optional)
              </Label>
              <Input
                id="userName"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-4">
              <Label className="font-medium">I am a...</Label>
              <RadioGroup value={userType} onValueChange={setUserType}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${userType === "student" ? "ring-2 ring-primary bg-primary/5" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="student" id="student" />
                        <Label htmlFor="student" className="cursor-pointer flex-1">
                          <div className="flex items-center space-x-3">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">Student</div>
                              <div className="text-sm text-muted-foreground">Grades 8-12</div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${userType === "graduate" ? "ring-2 ring-primary bg-primary/5" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="graduate" id="graduate" />
                        <Label htmlFor="graduate" className="cursor-pointer flex-1">
                          <div className="flex items-center space-x-3">
                            <Users className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">Graduate</div>
                              <div className="text-sm text-muted-foreground">UG/PG</div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${userType === "professional" ? "ring-2 ring-primary bg-primary/5" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="professional" id="professional" />
                        <Label htmlFor="professional" className="cursor-pointer flex-1">
                          <div className="flex items-center space-x-3">
                            <Briefcase className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">Professional</div>
                              <div className="text-sm text-muted-foreground">Career Changer</div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </RadioGroup>
            </div>

            <Button
              onClick={handleGetStarted}
              disabled={!userType}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 animate-pulse-glow"
              size="lg"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        {userType && (
          <Card className="max-w-4xl mx-auto mb-12 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Recommended for You</CardTitle>
              <CardDescription>Based on your profile, here are some suggested next steps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getPersonalizedRecommendations().map((rec, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-all group">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{rec.icon}</div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">{rec.title}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={() => (window.location.href = rec.path)}
                      >
                        Explore <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          <Card className="text-center bg-card/30 border-0 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Career Profiles</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-card/30 border-0 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <Award className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Success Stories</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-card/30 border-0 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <Video className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Video Resources</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-card/30 border-0 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">Featured This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary">Trending</Badge>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  AI & Machine Learning Careers
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Explore the fastest-growing field in technology with comprehensive career paths and skill
                  requirements.
                </p>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  Learn More <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <Badge variant="outline">New</Badge>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  2024 Scholarship Guide
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Complete guide to scholarships, grants, and financial aid opportunities for students worldwide.
                </p>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  Download Guide <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Video className="h-5 w-5 text-secondary" />
                  </div>
                  <Badge variant="secondary">Popular</Badge>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  Interview Masterclass
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Expert tips and strategies from industry professionals to ace your next job interview.
                </p>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  Watch Now <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
