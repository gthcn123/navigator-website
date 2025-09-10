"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GraduationCap, Users, Briefcase, ArrowRight } from "lucide-react"

export default function HomePage() {
  const [userName, setUserName] = useState("")
  const [userType, setUserType] = useState("")

  // Save user data to session storage
  useEffect(() => {
    if (userName) {
      sessionStorage.setItem("userName", userName)
    }
    if (userType) {
      sessionStorage.setItem("userType", userType)
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
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
        </div>

        {/* User Selection Form */}
        <Card className="max-w-2xl mx-auto mb-12 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl">Let's Get Started</CardTitle>
            <CardDescription>Tell us about yourself to receive personalized career guidance</CardDescription>
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center bg-card/30 border-0">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Career Profiles</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-card/30 border-0">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Success Stories</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-card/30 border-0">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Resources</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
