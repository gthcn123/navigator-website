"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Filter,
  Star,
  Calendar,
  ArrowRight,
  Lightbulb,
  Target,
  TrendingUp,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Download,
  Heart,
  Bookmark,
  Eye,
  Clock,
  Award,
  Video,
  Headphones,
} from "lucide-react"

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
  videoUrl?: string
  audioUrl?: string
  readingTime?: number
  likes?: number
  views?: number
  difficulty?: "Beginner" | "Intermediate" | "Advanced"
  careerChange?: boolean
}

interface MediaStats {
  totalViews: number
  totalLikes: number
  averageRating: number
  completionRate: number
}

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<SuccessStory[]>([])
  const [filteredStories, setFilteredStories] = useState<SuccessStory[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDomain, setSelectedDomain] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedMediaType, setSelectedMediaType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [likedStories, setLikedStories] = useState<string[]>([])
  const [bookmarkedStories, setBookmarkedStories] = useState<string[]>([])
  const [viewedStories, setViewedStories] = useState<string[]>([])
  const [mediaStats, setMediaStats] = useState<MediaStats | null>(null)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  // Load success stories data
  useEffect(() => {
    const loadStories = async () => {
      try {
        const response = await fetch("/data/success-stories.json")
        const data = await response.json()

        const enhancedStories = data.map((story: SuccessStory) => ({
          ...story,
          videoUrl:
            Math.random() > 0.6
              ? `/placeholder.svg?height=400&width=600&query=professional interview video for ${story.name}`
              : undefined,
          audioUrl:
            Math.random() > 0.7 ? `/placeholder.svg?height=100&width=300&query=audio podcast interview` : undefined,
          readingTime: Math.floor(Math.random() * 8) + 3, // 3-10 minutes
          likes: Math.floor(Math.random() * 500) + 50,
          views: Math.floor(Math.random() * 2000) + 200,
          difficulty: ["Beginner", "Intermediate", "Advanced"][
            Math.floor(Math.random() * 3)
          ] as SuccessStory["difficulty"],
          careerChange: Math.random() > 0.5,
        }))

        setStories(enhancedStories)
        setFilteredStories(enhancedStories)

        // Generate media statistics
        const stats: MediaStats = {
          totalViews: enhancedStories.reduce((sum, story) => sum + (story.views || 0), 0),
          totalLikes: enhancedStories.reduce((sum, story) => sum + (story.likes || 0), 0),
          averageRating: 4.3,
          completionRate: 78.5,
        }
        setMediaStats(stats)

        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load success stories:", error)
        setIsLoading(false)
      }
    }
    loadStories()

    // Load user preferences
    const liked = localStorage.getItem("likedStories")
    const bookmarked = localStorage.getItem("bookmarkedStories")
    const viewed = localStorage.getItem("viewedStories")

    if (liked) setLikedStories(JSON.parse(liked))
    if (bookmarked) setBookmarkedStories(JSON.parse(bookmarked))
    if (viewed) setViewedStories(JSON.parse(viewed))
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
      const matchesDifficulty = selectedDifficulty === "all" || story.difficulty === selectedDifficulty
      const matchesMediaType =
        selectedMediaType === "all" ||
        (selectedMediaType === "video" && story.videoUrl) ||
        (selectedMediaType === "audio" && story.audioUrl) ||
        (selectedMediaType === "text" && !story.videoUrl && !story.audioUrl)

      return matchesSearch && matchesDomain && matchesDifficulty && matchesMediaType
    })

    // Sort featured stories first, then by engagement
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return (b.likes || 0) - (a.likes || 0)
    })

    setFilteredStories(filtered)
  }, [stories, searchTerm, selectedDomain, selectedDifficulty, selectedMediaType])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedDomain("all")
    setSelectedDifficulty("all")
    setSelectedMediaType("all")
  }

  const toggleLike = (storyId: string) => {
    const newLiked = likedStories.includes(storyId)
      ? likedStories.filter((id) => id !== storyId)
      : [...likedStories, storyId]

    setLikedStories(newLiked)
    localStorage.setItem("likedStories", JSON.stringify(newLiked))
  }

  const toggleBookmark = (storyId: string) => {
    const newBookmarked = bookmarkedStories.includes(storyId)
      ? bookmarkedStories.filter((id) => id !== storyId)
      : [...bookmarkedStories, storyId]

    setBookmarkedStories(newBookmarked)
    localStorage.setItem("bookmarkedStories", JSON.stringify(newBookmarked))
  }

  const markAsViewed = (storyId: string) => {
    if (!viewedStories.includes(storyId)) {
      const newViewed = [...viewedStories, storyId]
      setViewedStories(newViewed)
      localStorage.setItem("viewedStories", JSON.stringify(newViewed))
    }
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
        <h1 className="font-heading text-3xl font-bold mb-2">Success Stories & Multimedia</h1>
        <p className="text-muted-foreground text-lg">
          Get inspired by real professionals through videos, podcasts, and detailed career journeys
        </p>
      </div>

      {mediaStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{mediaStats.totalViews.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Likes</p>
                  <p className="text-2xl font-bold">{mediaStats.totalLikes.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold">{mediaStats.averageRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Completion</p>
                  <p className="text-2xl font-bold">{mediaStats.completionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="all-stories" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-stories">All Stories</TabsTrigger>
          <TabsTrigger value="video-stories">Video Stories</TabsTrigger>
          <TabsTrigger value="audio-stories">Podcasts</TabsTrigger>
          <TabsTrigger value="my-collection">My Collection</TabsTrigger>
        </TabsList>

        <TabsContent value="all-stories" className="space-y-6">
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
                      <div className="relative">
                        <img
                          src={story.photo || "/placeholder.svg"}
                          alt={story.name}
                          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                        />
                        {story.videoUrl && (
                          <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-1">
                            <Video className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                        {story.audioUrl && (
                          <div className="absolute -bottom-2 -left-2 bg-secondary rounded-full p-1">
                            <Headphones className="h-3 w-3 text-secondary-foreground" />
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-lg">{story.name}</CardTitle>
                      <CardDescription>
                        <div className="space-y-1">
                          <div className="font-medium">{story.currentRole}</div>
                          <div className="text-sm">{story.company}</div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{story.domain}</Badge>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          <span>{story.views}</span>
                          <Heart className="h-3 w-3" />
                          <span>{story.likes}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{story.storyShort}</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                            onClick={() => markAsViewed(story.id)}
                          >
                            {story.videoUrl ? "Watch Story" : story.audioUrl ? "Listen to Story" : "Read Full Story"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh]">
                          <StoryModal
                            story={story}
                            onLike={() => toggleLike(story.id)}
                            onBookmark={() => toggleBookmark(story.id)}
                            isLiked={likedStories.includes(story.id)}
                            isBookmarked={bookmarkedStories.includes(story.id)}
                            currentlyPlaying={currentlyPlaying}
                            setCurrentlyPlaying={setCurrentlyPlaying}
                          />
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Difficulty Level</label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="All levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Media Type</label>
                    <Select value={selectedMediaType} onValueChange={setSelectedMediaType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="video">Video Stories</SelectItem>
                        <SelectItem value="audio">Audio/Podcasts</SelectItem>
                        <SelectItem value="text">Text Stories</SelectItem>
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
                          <div className="relative">
                            <img
                              src={story.photo || "/placeholder.svg"}
                              alt={story.name}
                              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                            />
                            {story.videoUrl && (
                              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                                <Video className="h-3 w-3 text-primary-foreground" />
                              </div>
                            )}
                            {story.audioUrl && (
                              <div className="absolute -bottom-1 -left-1 bg-secondary rounded-full p-1">
                                <Headphones className="h-3 w-3 text-secondary-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg mb-1">{story.name}</CardTitle>
                            <CardDescription>
                              <div className="space-y-1">
                                <div className="font-medium">{story.currentRole}</div>
                                <div className="text-sm">{story.company}</div>
                              </div>
                            </CardDescription>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            {story.featured && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            {story.careerChange && (
                              <Badge variant="outline" className="text-xs">
                                Career Change
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{story.domain}</Badge>
                            {story.difficulty && (
                              <Badge variant="secondary" className="text-xs">
                                {story.difficulty}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{story.readingTime}m</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{story.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{story.likes}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-3">{story.storyShort}</p>

                        <div className="flex flex-wrap gap-1">
                          {story.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                className="flex-1 group-hover:bg-primary/90"
                                onClick={() => markAsViewed(story.id)}
                              >
                                {story.videoUrl ? "Watch" : story.audioUrl ? "Listen" : "Read"}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh]">
                              <StoryModal
                                story={story}
                                onLike={() => toggleLike(story.id)}
                                onBookmark={() => toggleBookmark(story.id)}
                                isLiked={likedStories.includes(story.id)}
                                isBookmarked={bookmarkedStories.includes(story.id)}
                                currentlyPlaying={currentlyPlaying}
                                setCurrentlyPlaying={setCurrentlyPlaying}
                              />
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLike(story.id)}
                            className={likedStories.includes(story.id) ? "text-red-500" : ""}
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(story.id)}
                            className={bookmarkedStories.includes(story.id) ? "text-primary" : ""}
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="video-stories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories
              .filter((story) => story.videoUrl)
              .map((story) => (
                <Card key={story.id} className="group hover:shadow-lg transition-all">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={story.videoUrl || "/placeholder.svg"}
                        alt={`${story.name} video story`}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="lg" className="rounded-full">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <Badge className="absolute top-2 left-2">Video Story</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{story.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {story.currentRole} at {story.company}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{story.domain}</Badge>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          <span>{story.views}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="audio-stories">
          <div className="space-y-4">
            {stories
              .filter((story) => story.audioUrl)
              .map((story) => (
                <Card key={story.id} className="hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={story.photo || "/placeholder.svg"}
                        alt={story.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{story.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {story.currentRole} at {story.company}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{story.domain}</Badge>
                          <Badge variant="secondary">Podcast</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentlyPlaying(currentlyPlaying === story.id ? null : story.id)}
                        >
                          {currentlyPlaying === story.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <div className="text-xs text-muted-foreground">{story.readingTime}m</div>
                      </div>
                    </div>
                    {currentlyPlaying === story.id && (
                      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Headphones className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Now Playing</span>
                        </div>
                        <Progress value={Math.random() * 100} className="mb-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>2:34</span>
                          <span>{story.readingTime}:00</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="my-collection">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bookmark className="h-5 w-5" />
                  <span>Bookmarked Stories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookmarkedStories.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No bookmarked stories yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stories
                      .filter((story) => bookmarkedStories.includes(story.id))
                      .map((story) => (
                        <div key={story.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <img
                            src={story.photo || "/placeholder.svg"}
                            alt={story.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{story.name}</h4>
                            <p className="text-sm text-muted-foreground">{story.currentRole}</p>
                          </div>
                          <Badge variant="outline">{story.domain}</Badge>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Liked Stories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {likedStories.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No liked stories yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stories
                      .filter((story) => likedStories.includes(story.id))
                      .map((story) => (
                        <div key={story.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <img
                            src={story.photo || "/placeholder.svg"}
                            alt={story.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{story.name}</h4>
                            <p className="text-sm text-muted-foreground">{story.currentRole}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Heart className="h-3 w-3 text-red-500" />
                            <span>{story.likes}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StoryModal({
  story,
  onLike,
  onBookmark,
  isLiked,
  isBookmarked,
  currentlyPlaying,
  setCurrentlyPlaying,
}: {
  story: SuccessStory
  onLike: () => void
  onBookmark: () => void
  isLiked: boolean
  isBookmarked: boolean
  currentlyPlaying: string | null
  setCurrentlyPlaying: (id: string | null) => void
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <>
      <DialogHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
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
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{story.domain}</Badge>
                    {story.difficulty && <Badge variant="secondary">{story.difficulty}</Badge>}
                  </div>
                </div>
              </DialogDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={onLike}>
              <Heart className={`h-4 w-4 ${isLiked ? "text-red-500 fill-current" : ""}`} />
              <span className="ml-1">{story.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onBookmark}>
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "text-primary fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogHeader>

      <ScrollArea className="max-h-[60vh] pr-4">
        <div className="space-y-6">
          {/* Video/Audio Player */}
          {(story.videoUrl || story.audioUrl) && (
            <div className="bg-muted/30 rounded-lg p-4">
              {story.videoUrl && (
                <div className="relative mb-4">
                  <img
                    src={story.videoUrl || "/placeholder.svg"}
                    alt="Video thumbnail"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Button size="lg" className="rounded-full" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                  </div>
                </div>
              )}

              {story.audioUrl && (
                <div className="flex items-center space-x-4 mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentlyPlaying(currentlyPlaying === story.id ? null : story.id)}
                  >
                    {currentlyPlaying === story.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <div className="flex-1">
                    <Progress value={Math.random() * 100} className="mb-1" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>2:34</span>
                      <span>{story.readingTime}:00</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>The Journey</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">{story.storyFull}</p>
          </div>

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

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Words of Inspiration</span>
            </h3>
            <p className="text-sm italic text-muted-foreground">"{story.inspiration}"</p>
          </div>

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
