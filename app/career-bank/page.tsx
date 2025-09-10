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
}

export default function CareerBankPage() {
  const [careers, setCareers] = useState<Career[]>([])
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [salaryRange, setSalaryRange] = useState([0, 200000])
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [userType, setUserType] = useState("")
  const [bookmarkedCareers, setBookmarkedCareers] = useState<string[]>([])
  const [viewedCareers, setViewedCareers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load careers data
  useEffect(() => {
    const loadCareers = async () => {
      try {
        const response = await fetch("/data/careers.json")
        const data = await response.json()
        setCareers(data)
        setFilteredCareers(data)
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

  // Filter and sort careers
  useEffect(() => {
    const filtered = careers.filter((career) => {
      const matchesSearch =
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesIndustry = selectedIndustry === "all" || career.industry === selectedIndustry

      const matchesLevel = selectedLevel === "all" || career.level.includes(selectedLevel)

      const matchesSalary = career.salaryRange.max >= salaryRange[0] && career.salaryRange.min <= salaryRange[1]

      // Filter by user type if available
      const matchesUserType =
        !userType ||
        career.level.includes(
          userType === "student" ? "Student" : userType === "graduate" ? "Graduate" : "Professional",
        )

      return matchesSearch && matchesIndustry && matchesLevel && matchesSalary && matchesUserType
    })

    // Sort careers
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
        default:
          comparison = 0
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    setFilteredCareers(filtered)
  }, [careers, searchTerm, selectedIndustry, selectedLevel, salaryRange, sortBy, sortOrder, userType])

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
    setSalaryRange([0, 200000])
    setSortBy("title")
    setSortOrder("asc")
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Career Bank</h1>
        <p className="text-muted-foreground text-lg">
          Explore {careers.length} career opportunities tailored to your interests and goals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="w-fit">
                Clear All
              </Button>
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
          {/* Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>
                Showing {filteredCareers.length} of {careers.length} careers
              </span>
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
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Career Cards Grid */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCareers.map((career) => (
                <Card
                  key={career.id}
                  className={`group hover:shadow-lg transition-all duration-200 ${
                    viewedCareers.includes(career.id) ? "bg-muted/20" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                          {career.title}
                        </CardTitle>
                        <CardDescription className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {career.industry}
                          </Badge>
                          {viewedCareers.includes(career.id) && (
                            <Badge variant="outline" className="text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              Viewed
                            </Badge>
                          )}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => toggleBookmark(career.id)} className="shrink-0">
                        {bookmarkedCareers.includes(career.id) ? (
                          <BookmarkCheck className="h-4 w-4 text-primary" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{career.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>
                          ${career.salaryRange.min.toLocaleString()} - ${career.salaryRange.max.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span>Growth: {career.growthRate}</span>
                      </div>
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
    </div>
  )
}
