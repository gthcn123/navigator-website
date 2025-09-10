"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Filter, Star, Calendar, ArrowRight, Lightbulb, Target, TrendingUp } from "lucide-react"

interface TimelineEvent {
  year: string
  event: string
}

interface SuccessStory {
  id: string
  name: string
  photo: string
  currentRole: string
  company: string
  domain: string
  previousBackground: string
  storyShort: string
  storyFull: string
  keyLessons: string[]
  timeline: TimelineEvent[]
  inspiration: string
  tags: string[]
  featured: boolean
}

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<SuccessStory[]>([])
  const [filteredStories, setFilteredStories] = useState<SuccessStory[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDomain, setSelectedDomain] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Load success stories data
  useEffect(() => {
    const loadStories = async () => {
      try {
        const response = await fetch("/data/success-stories.json")
        const data = await response.json()
        setStories(data)
        setFilteredStories(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load success stories:", error)
        setIsLoading(false)
      }
    }
    loadStories()
  }, [])

  // Get unique domains for filtering
  const domains = [...new Set(stories.map((story) => story.domain))].sort()

  // Filter stories
  useEffect(() => {
    const filtered = stories.filter((story) => {
      const matchesSearch =
        story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.currentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.storyShort.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesDomain = selectedDomain === "all" || story.domain === selectedDomain

      return matchesSearch && matchesDomain
    })

    // Sort featured stories first
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })

    setFilteredStories(filtered)
  }, [stories, searchTerm, selectedDomain])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedDomain("all")
  }

  const featuredStories = stories.filter((story) => story.featured)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading success stories...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Success Stories</h1>
        <p className="text-muted-foreground text-lg">
          Get inspired by real professionals who transformed their careers and achieved their dreams
        </p>
      </div>

      {/* Featured Stories */}
      {featuredStories.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Star className="h-6 w-6 text-primary" />
            <span>Featured Stories</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.slice(0, 3).map((story) => (
              <Card key={story.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="text-center pb-4">
                  <img
                    src={story.photo || "/placeholder.svg"}
                    alt={story.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-lg">{story.name}</CardTitle>
                  <CardDescription>
                    <div className="space-y-1">
                      <div className="font-medium">{story.currentRole}</div>
                      <div className="text-sm">{story.company}</div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mb-3">
                    {story.domain}
                  </Badge>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{story.storyShort}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                      >
                        Read Full Story
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh]">
                      <StoryModal story={story} />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

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
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="space-y-2">
                <label htmlFor="search" className="text-sm font-medium">
                  Search Stories
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name, role, company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Domain Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Domain</label>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger>
                    <SelectValue placeholder="All domains" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Domains</SelectItem>
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredStories.length} of {stories.length} stories
            </p>
          </div>

          {filteredStories.length === 0 ? (
            <Card className="p-8 text-center">
              <CardContent>
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No stories found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find more stories.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStories.map((story) => (
                <Card key={story.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={story.photo || "/placeholder.svg"}
                        alt={story.name}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg mb-1">{story.name}</CardTitle>
                        <CardDescription>
                          <div className="space-y-1">
                            <div className="font-medium">{story.currentRole}</div>
                            <div className="text-sm">{story.company}</div>
                          </div>
                        </CardDescription>
                      </div>
                      {story.featured && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{story.domain}</Badge>
                      <span className="text-xs text-muted-foreground">From: {story.previousBackground}</span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3">{story.storyShort}</p>

                    <div className="flex flex-wrap gap-1">
                      {story.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full group-hover:bg-primary/90">
                          Read Full Story
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh]">
                        <StoryModal story={story} />
                      </DialogContent>
                    </Dialog>
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

function StoryModal({ story }: { story: SuccessStory }) {
  return (
    <>
      <DialogHeader>
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={story.photo || "/placeholder.svg"}
            alt={story.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <DialogTitle className="text-xl">{story.name}</DialogTitle>
            <DialogDescription>
              <div className="space-y-1">
                <div className="font-medium">
                  {story.currentRole} at {story.company}
                </div>
                <Badge variant="outline">{story.domain}</Badge>
              </div>
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <ScrollArea className="max-h-[60vh] pr-4">
        <div className="space-y-6">
          {/* Full Story */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>The Journey</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">{story.storyFull}</p>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Career Timeline</span>
            </h3>
            <div className="space-y-3">
              {story.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-16 text-sm font-medium text-primary flex-shrink-0">{event.year}</div>
                  <div className="flex-1 text-sm">{event.event}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Lessons */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Lightbulb className="h-5 w-5" />
              <span>Key Lessons</span>
            </h3>
            <div className="space-y-2">
              {story.keyLessons.map((lesson, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{lesson}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inspiration */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Words of Inspiration</span>
            </h3>
            <p className="text-sm italic text-muted-foreground">"{story.inspiration}"</p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-3">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}
