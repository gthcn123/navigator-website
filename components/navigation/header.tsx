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
    href: "/coaching",
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
  const pathname = usePathname()

  // Load user data from session storage
  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName")
    const storedUserType = sessionStorage.getItem("userType")
    if (storedUserName) setUserName(storedUserName)
    if (storedUserType) setUserType(storedUserType)
  }, [])

  // Real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocation("Your Location"),
        () => setLocation("Location unavailable"),
      )
    }
  }, [])

  // Simulated visitor counter
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

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top info bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span className="hidden sm:inline">{currentTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span className="hidden md:inline">{location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="text-xs">
              Visitors: {visitorCount.toLocaleString()}
            </Badge>
            {userName && (
              <div className="flex items-center space-x-1 text-primary">
                {getUserTypeIcon()}
                <span className="hidden sm:inline">{getPersonalizedGreeting()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl">NextStep Navigator</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {getFilteredNavItems().map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                        pathname === item.href && "bg-accent text-accent-foreground",
                      )}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {/* Static pages dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>More</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link href="/bookmarks" className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                      <BookOpen className="h-4 w-4" />
                      <div>
                        <div className="font-medium">My Bookmarks</div>
                        <div className="text-sm text-muted-foreground">Saved careers and notes</div>
                      </div>
                    </Link>
                    <Link href="/contact" className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                      <Phone className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Contact Us</div>
                        <div className="text-sm text-muted-foreground">Get in touch with our team</div>
                      </div>
                    </Link>
                    <Link href="/about" className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                      <Info className="h-4 w-4" />
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

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm" className="hidden md:flex">
              Sign Up
            </Button>

            {/* Mobile menu button */}
            <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DropdownMenuTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {getFilteredNavItems().map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center space-x-2">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link href="/bookmarks" className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>My Bookmarks</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Contact Us</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about" className="flex items-center space-x-2">
                    <Info className="h-4 w-4" />
                    <span>About Us</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
