"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  DollarSign,
  GraduationCap,
  TrendingUp,
  Bookmark,
  BookmarkCheck,
  Eye,
  BarChart3,
  MapPin,
  Star,
  Download,
  Share2,
  Target,
  Lightbulb,
} from "lucide-react"

interface Career {
  id: string
  title: string
  industry: string
  description: string
  skills: string[]
  education: string[]
  salaryRange: {
    min: number
    max: number
    currency: string
  }
  image: string
  tags: string[]
  level: string[]
  growthRate: string
  jobOutlook: string
  location?: string[]
  workType?: string[]
  experience?: string
  rating?: number
  demandLevel?: "Low" | "Medium" | "High" | "Very High"
}

interface CareerAnalytics {
  totalViews: number
  bookmarkRate: number
  averageRating: number
  trendingCareers: string[]
  popularSkills: string[]
  salaryTrends: { [key: string]: number }
}

export default function CareerBankPage() {
  const [careers, setCareers] = useState<Career[]>([])
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedWorkType, setSelectedWorkType] = useState("all")
  const [salaryRange, setSalaryRange] = useState([0, 200000])
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [userType, setUserType] = useState("")
  const [bookmarkedCareers, setBookmarkedCareers] = useState<string[]>([])
  const [viewedCareers, setViewedCareers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [analytics, setAnalytics] = useState<CareerAnalytics | null>(null)

  useEffect(() => {
    const loadCareers = async () => {
      try {
        const response = await fetch("/data/careers.json")
        const data = await response.json()

        // Enhance careers with additional professional data
        const enhancedCareers = data.map((career: Career) => ({
          ...career,
          location: career.location || ["Remote", "On-site", "Hybrid"],
          workType: career.workType || ["Full-time", "Part-time", "Contract"],
          experience: career.experience || "Entry Level",
          rating: career.rating || Math.random() * 2 + 3, // 3-5 rating
          demandLevel: ["Low", "Medium", "High", "Very High"][Math.floor(Math.random() * 4)] as Career["demandLevel"],
        }))

        setCareers(enhancedCareers)
        setFilteredCareers(enhancedCareers)

        // Generate analytics
        const analyticsData: CareerAnalytics = {
          totalViews: Math.floor(Math.random() * 10000) + 5000,
          bookmarkRate: Math.random() * 30 + 15,
          averageRating: 4.2,
          trendingCareers: enhancedCareers.slice(0, 5).map((c) => c.id),
          popularSkills: ["JavaScript", "Python", "Data Analysis", "Project Management", "Communication"],
          salaryTrends: {
            Technology: 95000,
            Healthcare: 75000,
            Finance: 85000,
            Education: 55000,
            Marketing: 65000,
          },
        }
        setAnalytics(analyticsData)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load careers:", error)
        setIsLoading(false)
      }
    }
    loadCareers()
  }, [])

  // Load user data and preferences
  useEffect(() => {
    const storedUserType = sessionStorage.getItem("userType")
    const storedBookmarks = localStorage.getItem("bookmarkedCareers")
    const storedViewed = localStorage.getItem("viewedCareers")

    if (storedUserType) setUserType(storedUserType)
    if (storedBookmarks) setBookmarkedCareers(JSON.parse(storedBookmarks))
    if (storedViewed) setViewedCareers(JSON.parse(storedViewed))
  }, [])

  // Get unique industries and levels
  const industries = useMemo(() => {
    const uniqueIndustries = [...new Set(careers.map((career) => career.industry))]
    return uniqueIndustries.sort()
  }, [careers])

  const levels = useMemo(() => {
    const allLevels = careers.flatMap((career) => career.level)
    const uniqueLevels = [...new Set(allLevels)]
    return uniqueLevels.sort()
  }, [careers])

  const locations = useMemo(() => {
    const allLocations = careers.flatMap((career) => career.location || [])
    const uniqueLocations = [...new Set(allLocations)]
    return uniqueLocations.sort()
  }, [careers])

  const workTypes = useMemo(() => {
    const allWorkTypes = careers.flatMap((career) => career.workType || [])
    const uniqueWorkTypes = [...new Set(allWorkTypes)]
    return uniqueWorkTypes.sort()
  }, [careers])

  const allSkills = useMemo(() => {
    const skillSet = new Set(careers.flatMap((career) => career.skills))
    return Array.from(skillSet).sort()
  }, [careers])

  useEffect(() => {
    const filtered = careers.filter((career) => {
      const matchesSearch =
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesIndustry = selectedIndustry === "all" || career.industry === selectedIndustry
      const matchesLevel = selectedLevel === "all" || career.level.includes(selectedLevel)
      const matchesLocation =
        selectedLocation === "all" || (career.location && career.location.includes(selectedLocation))
      const matchesWorkType =
        selectedWorkType === "all" || (career.workType && career.workType.includes(selectedWorkType))
      const matchesSalary = career.salaryRange.max >= salaryRange[0] && career.salaryRange.min <= salaryRange[1]
      const matchesSkills = selectedSkills.length === 0 || selectedSkills.some((skill) => career.skills.includes(skill))

      const matchesUserType =
        !userType ||
        career.level.includes(
          userType === "student" ? "Student" : userType === "graduate" ? "Graduate" : "Professional",
        )

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesLevel &&
        matchesLocation &&
        matchesWorkType &&
        matchesSalary &&
        matchesSkills &&
        matchesUserType
      )
    })

    // Enhanced sorting options
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "salary":
          comparison = a.salaryRange.max - b.salaryRange.max
          break
        case "industry":
          comparison = a.industry.localeCompare(b.industry)
          break
        case "rating":
          comparison = (a.rating || 0) - (b.rating || 0)
          break
        case "demand":
          const demandOrder = { Low: 1, Medium: 2, High: 3, "Very High": 4 }
          comparison = demandOrder[a.demandLevel || "Low"] - demandOrder[b.demandLevel || "Low"]
          break
        default:
          comparison = 0
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    setFilteredCareers(filtered)
  }, [
    careers,
    searchTerm,
    selectedIndustry,
    selectedLevel,
    selectedLocation,
    selectedWorkType,
    salaryRange,
    selectedSkills,
    sortBy,
    sortOrder,
    userType,
  ])

  const toggleBookmark = (careerId: string) => {
    const newBookmarks = bookmarkedCareers.includes(careerId)
      ? bookmarkedCareers.filter((id) => id !== careerId)
      : [...bookmarkedCareers, careerId]

    setBookmarkedCareers(newBookmarks)
    localStorage.setItem("bookmarkedCareers", JSON.stringify(newBookmarks))
  }

  const markAsViewed = (careerId: string) => {
    if (!viewedCareers.includes(careerId)) {
      const newViewed = [...viewedCareers, careerId]
      setViewedCareers(newViewed)
      localStorage.setItem("viewedCareers", JSON.stringify(newViewed))
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedIndustry("all")
    setSelectedLevel("all")
    setSelectedLocation("all")
    setSelectedWorkType("all")
    setSalaryRange([0, 200000])
    setSortBy("title")
    setSortOrder("asc")
    setSelectedSkills([])
    setShowAdvancedFilters(false)
  }

  const exportResults = () => {
    const csvContent = [
      ["Title", "Industry", "Salary Min", "Salary Max", "Skills", "Education", "Growth Rate"].join(","),
      ...filteredCareers.map((career) =>
        [
          career.title,
          career.industry,
          career.salaryRange.min,
          career.salaryRange.max,
          career.skills.join("; "),
          career.education.join("; "),
          career.growthRate,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "career-search-results.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const shareResults = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Career Search Results",
          text: `Found ${filteredCareers.length} career opportunities`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      // Could add toast notification here
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading career opportunities...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-2">Career Bank</h1>
            <p className="text-muted-foreground text-lg">
              Explore {careers.length} career opportunities with advanced analytics and insights
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={exportResults}>
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
            <Button variant="outline" size="sm" onClick={shareResults}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Analytics Dashboard */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bookmark className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bookmark Rate</p>
                    <p className="text-2xl font-bold">{analytics.bookmarkRate.toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                    <p className="text-2xl font-bold">{analytics.averageRating}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Trending</p>
                    <p className="text-2xl font-bold">{analytics.trendingCareers.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Tabs defaultValue="explore" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="explore">Explore Careers</TabsTrigger>
          <TabsTrigger value="analytics">Market Analytics</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Filter className="h-5 w-5" />
                    <span>Advanced Filters</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="w-fit">
                      Clear All
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
                      {showAdvancedFilters ? "Basic" : "Advanced"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <Label htmlFor="search">Search Careers</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by title, skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Industry Filter */}
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Industries</SelectItem>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Level Filter */}
                  <div className="space-y-2">
                    <Label>Education Level</Label>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {showAdvancedFilters && (
                    <>
                      {/* Location Filter */}
                      <div className="space-y-2">
                        <Label>Work Location</Label>
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            {locations.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Work Type Filter */}
                      <div className="space-y-2">
                        <Label>Work Type</Label>
                        <Select value={selectedWorkType} onValueChange={setSelectedWorkType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select work type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            {workTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Skills Filter */}
                      <div className="space-y-2">
                        <Label>Required Skills</Label>
                        <div className="max-h-32 overflow-y-auto space-y-2">
                          {allSkills.slice(0, 10).map((skill) => (
                            <div key={skill} className="flex items-center space-x-2">
                              <Checkbox
                                id={skill}
                                checked={selectedSkills.includes(skill)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedSkills([...selectedSkills, skill])
                                  } else {
                                    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
                                  }
                                }}
                              />
                              <Label htmlFor={skill} className="text-sm">
                                {skill}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Salary Range */}
                  <div className="space-y-3">
                    <Label>Salary Range (USD)</Label>
                    <div className="px-2">
                      <Slider
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                        max={200000}
                        min={0}
                        step={5000}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${salaryRange[0].toLocaleString()}</span>
                      <span>${salaryRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>
                    Showing {filteredCareers.length} of {careers.length} careers
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      List
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="sort" className="text-sm">
                    Sort by:
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="industry">Industry</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="demand">Demand</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                    {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Career Cards Grid/List */}
              {filteredCareers.length === 0 ? (
                <Card className="p-8 text-center">
                  <CardContent>
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No careers found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms to find more opportunities.
                    </p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
                  {filteredCareers.map((career) => (
                    <Card
                      key={career.id}
                      className={`group hover:shadow-lg transition-all duration-200 ${
                        viewedCareers.includes(career.id) ? "bg-muted/20" : ""
                      } ${viewMode === "list" ? "flex" : ""}`}
                    >
                      <CardHeader className={`${viewMode === "list" ? "flex-1" : ""} pb-3`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                              {career.title}
                            </CardTitle>
                            <CardDescription className="flex items-center space-x-2 flex-wrap gap-1">
                              <Badge variant="secondary" className="text-xs">
                                {career.industry}
                              </Badge>
                              {career.demandLevel && (
                                <Badge
                                  variant={career.demandLevel === "Very High" ? "default" : "outline"}
                                  className="text-xs"
                                >
                                  {career.demandLevel} Demand
                                </Badge>
                              )}
                              {viewedCareers.includes(career.id) && (
                                <Badge variant="outline" className="text-xs">
                                  <Eye className="h-3 w-3 mr-1" />
                                  Viewed
                                </Badge>
                              )}
                            </CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(career.id)}
                            className="shrink-0"
                          >
                            {bookmarkedCareers.includes(career.id) ? (
                              <BookmarkCheck className="h-4 w-4 text-primary" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className={`${viewMode === "list" ? "flex-1" : ""} space-y-4`}>
                        <p className="text-sm text-muted-foreground line-clamp-2">{career.description}</p>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>
                              ${career.salaryRange.min.toLocaleString()} - ${career.salaryRange.max.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span>Growth: {career.growthRate}</span>
                          </div>
                          {career.rating && (
                            <div className="flex items-center space-x-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{career.rating.toFixed(1)}</span>
                            </div>
                          )}
                          {career.location && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{career.location[0]}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1">
                            {career.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {career.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{career.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <GraduationCap className="h-3 w-3" />
                            <span>{career.level.join(", ")}</span>
                          </div>
                          <Link href={`/career-bank/${career.id}`}>
                            <Button
                              size="sm"
                              onClick={() => markAsViewed(career.id)}
                              className="group-hover:bg-primary group-hover:text-primary-foreground"
                            >
                              Learn More
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Salary Trends by Industry</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analytics && (
                  <div className="space-y-4">
                    {Object.entries(analytics.salaryTrends).map(([industry, salary]) => (
                      <div key={industry} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{industry}</span>
                          <span>${salary.toLocaleString()}</span>
                        </div>
                        <Progress value={(salary / 100000) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>Popular Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analytics && (
                  <div className="flex flex-wrap gap-2">
                    {analytics.popularSkills.map((skill, index) => (
                      <Badge key={skill} variant={index < 2 ? "default" : "secondary"}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>AI-Powered Career Recommendations</span>
              </CardTitle>
              <CardDescription>
                Based on your profile and browsing history, here are personalized career suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCareers.slice(0, 4).map((career) => (
                  <Card key={career.id} className="hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{career.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{career.description.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary">{career.industry}</Badge>
                        <span className="text-sm font-medium">${career.salaryRange.max.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
