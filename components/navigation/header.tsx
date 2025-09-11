"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  TrendingUp,
  Clock,
  MapPin,
  Menu,
  User,
  GraduationCap,
  Users,
  Briefcase,
  Search,
  BookOpen,
  Video,
  Star,
  Library,
  Phone,
  Info,
  LogIn,
  FileText,
  MessageSquare,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationItem {
  title: string
  href: string
  description: string
  icon: React.ReactNode
  userTypes: string[]
}

const navigationItems: NavigationItem[] = [
  {
    title: "Career Bank",
    href: "/career-bank",
    description: "Explore career profiles and opportunities",
    icon: <Search className="h-4 w-4" />,
    userTypes: ["student", "graduate", "professional"],
  },
  {
    title: "Interest Quiz",
    href: "/quiz",
    description: "Discover careers that match your interests",
    icon: <BookOpen className="h-4 w-4" />,
    userTypes: ["student", "graduate", "professional"],
  },
  {
    title: "Multimedia Guidance",
    href: "/multimedia",
    description: "Videos and podcasts from professionals",
    icon: <Video className="h-4 w-4" />,
    userTypes: ["student", "graduate", "professional"],
  },
  {
    title: "Success Stories",
    href: "/stories",
    description: "Inspiring journeys from professionals",
    icon: <Star className="h-4 w-4" />,
    userTypes: ["student", "graduate", "professional"],
  },
  {
    title: "Resource Library",
    href: "/resources",
    description: "Articles, eBooks, and guides",
    icon: <Library className="h-4 w-4" />,
    userTypes: ["student", "graduate", "professional"],
  },
  {
    title: "Admission & Coaching",
    href: "/admission",
    description: "Study abroad and interview tips",
    icon: <GraduationCap className="h-4 w-4" />,
    userTypes: ["student", "graduate"],
  },
]

export function Header() {
  const [userName, setUserName] = useState("")
  const [userType, setUserType] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [location, setLocation] = useState("")
  const [visitorCount, setVisitorCount] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const pathname = usePathname()

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName")
    const storedUserType = localStorage.getItem("userType")
    const authToken = localStorage.getItem("authToken")

    if (storedUserName) setUserName(storedUserName)
    if (storedUserType) setUserType(storedUserType)
    if (authToken) setIsAuthenticated(true)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocation("Your Location"),
        () => setLocation("Location unavailable"),
      )
    }
  }, [])

  useEffect(() => {
    const baseCount = 15847
    const sessionVisits = Number.parseInt(localStorage.getItem("sessionVisits") || "0")
    const newCount = baseCount + sessionVisits + Math.floor(Math.random() * 50)
    setVisitorCount(newCount)
  }, [])

  const getUserTypeIcon = () => {
    switch (userType) {
      case "student":
        return <GraduationCap className="h-4 w-4" />
      case "graduate":
        return <Users className="h-4 w-4" />
      case "professional":
        return <Briefcase className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getFilteredNavItems = () => {
    if (!userType) return navigationItems
    return navigationItems.filter((item) => item.userTypes.includes(userType))
  }

  const getPersonalizedGreeting = () => {
    if (!userName && !userType) return "Welcome!"
    if (userName && userType) {
      const typeGreetings = {
        student: `Hello, ${userName}! 🎓`,
        graduate: `Welcome back, ${userName}! 🚀`,
        professional: `Good to see you, ${userName}! 💼`,
      }
      return typeGreetings[userType as keyof typeof typeGreetings] || `Hello, ${userName}!`
    }
    if (userName) return `Hello, ${userName}!`
    return "Welcome!"
  }

  const handleLogin = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.email === email && u.password === password)

    if (user) {
      localStorage.setItem("authToken", "authenticated")
      localStorage.setItem("userName", user.name)
      localStorage.setItem("userType", user.userType)
      setUserName(user.name)
      setUserType(user.userType)
      setIsAuthenticated(true)
      setShowAuthModal(false)
    } else {
      alert("Invalid credentials")
    }
  }

  const handleSignup = (name: string, email: string, password: string, userType: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const newUser = { id: Date.now(), name, email, password, userType }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    localStorage.setItem("authToken", "authenticated")
    localStorage.setItem("userName", name)
    localStorage.setItem("userType", userType)
    setUserName(name)
    setUserType(userType)
    setIsAuthenticated(true)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userName")
    localStorage.removeItem("userType")
    setUserName("")
    setUserType("")
    setIsAuthenticated(false)
  }

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between py-1 sm:py-2 text-xs sm:text-sm border-b">
            <div className="flex items-center space-x-2 sm:space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span className="hidden sm:inline text-xs">{currentTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span className="hidden lg:inline text-xs">{location}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Badge variant="secondary" className="text-xs px-1 sm:px-2">
                <span className="hidden sm:inline">Visitors: </span>
                {visitorCount.toLocaleString()}
              </Badge>
              {isAuthenticated && userName && (
                <div className="flex items-center space-x-1 text-primary">
                  {getUserTypeIcon()}
                  <span className="hidden md:inline text-xs">{getPersonalizedGreeting()}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between py-2 sm:py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="font-heading font-bold text-lg sm:text-xl text-blue-900">
                <span className="hidden sm:inline">NextStep Navigator</span>
                <span className="sm:hidden">NextStep</span>
              </span>
            </Link>

            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {getFilteredNavItems().map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          pathname === item.href && "bg-blue-100 text-blue-800",
                        )}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:bg-blue-50 hover:text-blue-700">More</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <Link href="/bookmarks" className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="font-medium">My Bookmarks</div>
                          <div className="text-sm text-muted-foreground">Saved careers and notes</div>
                        </div>
                      </Link>
                      <Link href="/resume" className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="font-medium">Resume Guidelines</div>
                          <div className="text-sm text-muted-foreground">Professional resume writing tips</div>
                        </div>
                      </Link>
                      <Link href="/interview" className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="font-medium">Interview Tips</div>
                          <div className="text-sm text-muted-foreground">Master your interview skills</div>
                        </div>
                      </Link>
                      <Link href="/contact" className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="font-medium">Contact Us</div>
                          <div className="text-sm text-muted-foreground">Get in touch with our team</div>
                        </div>
                      </Link>
                      <Link href="/about" className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50">
                        <Info className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="font-medium">About Us</div>
                          <div className="text-sm text-muted-foreground">Learn about our mission</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-1 sm:space-x-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:flex">
                      <User className="h-4 w-4 mr-2" />
                      {userName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:flex text-blue-700 hover:bg-blue-50"
                    onClick={() => {
                      setAuthMode("login")
                      setShowAuthModal(true)
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    size="sm"
                    className="hidden sm:flex bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setAuthMode("signup")
                      setShowAuthModal(true)
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}

              <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <DropdownMenuTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {!isAuthenticated && (
                    <>
                      <DropdownMenuItem
                        onClick={() => {
                          setAuthMode("login")
                          setShowAuthModal(true)
                        }}
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setAuthMode("signup")
                          setShowAuthModal(true)
                        }}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign Up
                      </DropdownMenuItem>
                    </>
                  )}
                  {isAuthenticated && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </>
                  )}
                  {getFilteredNavItems().map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="flex items-center space-x-2">
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}
    </>
  )
}

function AuthModal({
  mode,
  onClose,
  onLogin,
  onSignup,
}: {
  mode: "login" | "signup"
  onClose: () => void
  onLogin: (email: string, password: string) => void
  onSignup: (name: string, email: string, password: string, userType: string) => void
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "student",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === "login") {
      onLogin(formData.email, formData.password)
    } else {
      onSignup(formData.name, formData.email, formData.password, formData.userType)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-900">{mode === "login" ? "Login" : "Sign Up"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-md"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full p-2 border rounded-md"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full p-2 border rounded-md"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium mb-1">I am a...</label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.userType}
                onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              >
                <option value="student">Student</option>
                <option value="graduate">Graduate</option>
                <option value="professional">Professional</option>
              </select>
            </div>
          )}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            {mode === "login" ? "Login" : "Sign Up"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-600 hover:underline text-sm"
            onClick={() => (mode === "login" ? setAuthMode("signup") : setAuthMode("login"))}
          >
            {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  )
}
