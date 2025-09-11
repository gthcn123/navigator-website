"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Download,
  BookOpen,
  FileText,
  CheckSquare,
  Video,
  ExternalLink,
  Bookmark,
  Heart,
  Star,
  TrendingUp,
  Eye,
  Grid,
  List,
  FolderOpen,
  Plus,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Resource {
  id: string
  title: string
  description: string
  type: "Article" | "eBook" | "Checklist" | "Webinar" | "Template" | "Course" | "Podcast"
  category: string
  userType: string[]
  fileUrl?: string
  externalUrl?: string
  size?: string
  format?: string
  downloadCount: number
  featured: boolean
  rating?: number
  duration?: string
  difficulty?: "Beginner" | "Intermediate" | "Advanced"
  tags?: string[]
  author?: string
  publishDate?: string
  lastUpdated?: string
  views?: number
  likes?: number
}

interface Collection {
  id: string
  name: string
  description: string
  resources: string[]
  isPublic: boolean
  createdAt: string
}

interface ResourceStats {
  totalResources: number
  totalDownloads: number
  averageRating: number
  popularCategories: string[]
}

export default function ResourceLibrary() {
  const [resources, setResources] = useState<Resource[]>([])
  const [filteredResources, setFilteredResources] = useState<Resource[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(true)
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>([])
  const [likedResources, setLikedResources] = useState<string[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [resourceStats, setResourceStats] = useState<ResourceStats | null>(null)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [selectedResourceForCollection, setSelectedResourceForCollection] = useState<string | null>(null)

  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await fetch("/data/resources.json")
        const data = await response.json()

        const enhancedResources = data.map((resource: Resource) => ({
          ...resource,
          rating: Math.random() * 2 + 3, // 3-5 star rating
          duration:
            resource.type === "Webinar" || resource.type === "Course"
              ? `${Math.floor(Math.random() * 120) + 30}min`
              : undefined,
          difficulty: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)] as Resource["difficulty"],
          tags: [
            "Career Planning",
            "Interview Skills",
            "Resume Writing",
            "Networking",
            "Leadership",
            "Skill Development",
          ].slice(0, Math.floor(Math.random() * 4) + 2),
          author: ["Dr. Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Kim", "Lisa Thompson"][
            Math.floor(Math.random() * 5)
          ],
          publishDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          views: Math.floor(Math.random() * 5000) + 500,
          likes: Math.floor(Math.random() * 200) + 20,
        }))

        setResources(enhancedResources)
        setFilteredResources(enhancedResources)

        const stats: ResourceStats = {
          totalResources: enhancedResources.length,
          totalDownloads: enhancedResources.reduce((sum, r) => sum + r.downloadCount, 0),
          averageRating: enhancedResources.reduce((sum, r) => sum + (r.rating || 0), 0) / enhancedResources.length,
          popularCategories: [...new Set(enhancedResources.map((r) => r.category))].slice(0, 5),
        }
        setResourceStats(stats)
      } catch (error) {
        console.error("Error loading resources:", error)
      } finally {
        setLoading(false)
      }
    }

    loadResources()

    const bookmarked = localStorage.getItem("bookmarkedResources")
    const liked = localStorage.getItem("likedResources")
    const savedCollections = localStorage.getItem("resourceCollections")

    if (bookmarked) setBookmarkedResources(JSON.parse(bookmarked))
    if (liked) setLikedResources(JSON.parse(liked))
    if (savedCollections) setCollections(JSON.parse(savedCollections))
  }, [])

  useEffect(() => {
    let filtered = resources

    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((resource) => resource.type === typeFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((resource) => resource.category === categoryFilter)
    }

    if (difficultyFilter !== "all") {
      filtered = filtered.filter((resource) => resource.difficulty === difficultyFilter)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "featured":
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return (b.rating || 0) - (a.rating || 0)
        case "newest":
          return new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime()
        case "popular":
          return (b.views || 0) - (a.views || 0)
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredResources(filtered)
  }, [searchTerm, typeFilter, categoryFilter, difficultyFilter, sortBy, resources])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Article":
        return <FileText className="h-5 w-5" />
      case "eBook":
        return <BookOpen className="h-5 w-5" />
      case "Checklist":
        return <CheckSquare className="h-5 w-5" />
      case "Webinar":
        return <Video className="h-5 w-5" />
      case "Template":
        return <FileText className="h-5 w-5" />
      case "Course":
        return <BookOpen className="h-5 w-5" />
      case "Podcast":
        return <Video className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Article":
        return "bg-blue-100 text-blue-800"
      case "eBook":
        return "bg-green-100 text-green-800"
      case "Checklist":
        return "bg-purple-100 text-purple-800"
      case "Webinar":
        return "bg-orange-100 text-orange-800"
      case "Template":
        return "bg-pink-100 text-pink-800"
      case "Course":
        return "bg-indigo-100 text-indigo-800"
      case "Podcast":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDownload = (resource: Resource) => {
    if (resource.fileUrl) {
      const link = document.createElement("a")
      link.href = resource.fileUrl
      link.download = resource.title
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else if (resource.externalUrl) {
      window.open(resource.externalUrl, "_blank")
    }
  }

  const toggleBookmark = (resourceId: string) => {
    const newBookmarked = bookmarkedResources.includes(resourceId)
      ? bookmarkedResources.filter((id) => id !== resourceId)
      : [...bookmarkedResources, resourceId]

    setBookmarkedResources(newBookmarked)
    localStorage.setItem("bookmarkedResources", JSON.stringify(newBookmarked))
  }

  const toggleLike = (resourceId: string) => {
    const newLiked = likedResources.includes(resourceId)
      ? likedResources.filter((id) => id !== resourceId)
      : [...likedResources, resourceId]

    setLikedResources(newLiked)
    localStorage.setItem("likedResources", JSON.stringify(newLiked))
  }

  const createCollection = () => {
    if (!newCollectionName.trim()) return

    const newCollection: Collection = {
      id: Date.now().toString(),
      name: newCollectionName,
      description: newCollectionDescription,
      resources: [],
      isPublic: false,
      createdAt: new Date().toISOString(),
    }

    const updatedCollections = [...collections, newCollection]
    setCollections(updatedCollections)
    localStorage.setItem("resourceCollections", JSON.stringify(updatedCollections))

    setNewCollectionName("")
    setNewCollectionDescription("")
  }

  const addToCollection = (collectionId: string, resourceId: string) => {
    const updatedCollections = collections.map((collection) =>
      collection.id === collectionId ? { ...collection, resources: [...collection.resources, resourceId] } : collection,
    )
    setCollections(updatedCollections)
    localStorage.setItem("resourceCollections", JSON.stringify(updatedCollections))
  }

  const categories = [...new Set(resources.map((r) => r.category))]
  const types = ["Article", "eBook", "Checklist", "Webinar", "Template", "Course", "Podcast"]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading resource library...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Resource Library & Collections</h1>
        <p className="text-muted-foreground text-lg">
          Access our comprehensive collection of career guidance materials and organize them into personal collections
        </p>
      </div>

      {resourceStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Resources</p>
                  <p className="text-2xl font-bold">{resourceStats.totalResources}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Download className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Downloads</p>
                  <p className="text-2xl font-bold">{resourceStats.totalDownloads.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold">{resourceStats.averageRating.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FolderOpen className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">My Collections</p>
                  <p className="text-2xl font-bold">{collections.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="all-resources" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-resources">All Resources</TabsTrigger>
          <TabsTrigger value="bookmarks">My Bookmarks</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="all-resources" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search resources, authors, tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredResources.length} of {resources.length} resources
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Resources */}
          {resources.some((r) => r.featured) && (
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-semibold mb-4 flex items-center space-x-2">
                <Star className="h-6 w-6 text-primary" />
                <span>Featured Resources</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources
                  .filter((r) => r.featured)
                  .slice(0, 3)
                  .map((resource) => (
                    <Card key={resource.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(resource.type)}
                            <Badge className={getTypeColor(resource.type)}>{resource.type}</Badge>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => toggleBookmark(resource.id)}>
                              <Bookmark
                                className={`h-4 w-4 ${bookmarkedResources.includes(resource.id) ? "text-primary fill-current" : ""}`}
                              />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => toggleLike(resource.id)}>
                              <Heart
                                className={`h-4 w-4 ${likedResources.includes(resource.id) ? "text-red-500 fill-current" : ""}`}
                              />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>by {resource.author}</span>
                          <Separator orientation="vertical" className="h-4" />
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-current text-yellow-500" />
                            <span>{resource.rating?.toFixed(1)}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {resource.tags?.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              {resource.size && <span>{resource.size}</span>}
                              {resource.duration && <span> • {resource.duration}</span>}
                              {resource.format && <span> • {resource.format}</span>}
                            </div>
                            <Button
                              onClick={() => handleDownload(resource)}
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Access
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* All Resources */}
          <div>
            {filteredResources.length === 0 ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No resources found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
                </CardContent>
              </Card>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredResources.map((resource) => (
                  <Card
                    key={resource.id}
                    className={`hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex" : ""}`}
                  >
                    <CardHeader className={viewMode === "list" ? "flex-1" : ""}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2 mb-2">
                          {getTypeIcon(resource.type)}
                          <Badge className={getTypeColor(resource.type)}>{resource.type}</Badge>
                          {resource.difficulty && (
                            <Badge variant="outline" className="text-xs">
                              {resource.difficulty}
                            </Badge>
                          )}
                          {resource.featured && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => toggleBookmark(resource.id)}>
                            <Bookmark
                              className={`h-4 w-4 ${bookmarkedResources.includes(resource.id) ? "text-primary fill-current" : ""}`}
                            />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => toggleLike(resource.id)}>
                            <Heart
                              className={`h-4 w-4 ${likedResources.includes(resource.id) ? "text-red-500 fill-current" : ""}`}
                            />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add to Collection</DialogTitle>
                                <DialogDescription>Choose a collection to add "{resource.title}" to</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                {collections.map((collection) => (
                                  <div
                                    key={collection.id}
                                    className="flex items-center justify-between p-3 border rounded-lg"
                                  >
                                    <div>
                                      <h4 className="font-medium">{collection.name}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        {collection.resources.length} resources
                                      </p>
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={() => addToCollection(collection.id, resource.id)}
                                      disabled={collection.resources.includes(resource.id)}
                                    >
                                      {collection.resources.includes(resource.id) ? "Added" : "Add"}
                                    </Button>
                                  </div>
                                ))}
                                {collections.length === 0 && (
                                  <p className="text-muted-foreground text-center py-4">
                                    No collections yet. Create one in the Collections tab.
                                  </p>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>by {resource.author}</span>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          <span>{resource.rating?.toFixed(1)}</span>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{resource.views}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className={viewMode === "list" ? "flex items-center" : ""}>
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap gap-1">
                          {resource.tags?.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {resource.size && <span>{resource.size}</span>}
                            {resource.duration && <span> • {resource.duration}</span>}
                            {resource.format && <span> • {resource.format}</span>}
                            <span> • {resource.downloadCount} downloads</span>
                          </div>
                          <Button onClick={() => handleDownload(resource)} size="sm" variant="outline">
                            {resource.externalUrl ? (
                              <>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="bookmarks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bookmark className="h-5 w-5" />
                <span>My Bookmarks</span>
              </CardTitle>
              <CardDescription>Resources you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              {bookmarkedResources.length === 0 ? (
                <div className="text-center py-8">
                  <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No bookmarks yet</h3>
                  <p className="text-muted-foreground">Start bookmarking resources to see them here</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources
                    .filter((resource) => bookmarkedResources.includes(resource.id))
                    .map((resource) => (
                      <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            {getTypeIcon(resource.type)}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{resource.title}</h4>
                              <p className="text-sm text-muted-foreground">{resource.author}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {resource.type}
                                </Badge>
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                  <Star className="h-3 w-3 fill-current text-yellow-500" />
                                  <span>{resource.rating?.toFixed(1)}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => toggleBookmark(resource.id)}>
                              <Bookmark className="h-4 w-4 text-primary fill-current" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collections">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="h-5 w-5" />
                    <span>My Collections</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Collection
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Collection</DialogTitle>
                        <DialogDescription>Organize your resources into custom collections</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Collection Name</label>
                          <Input
                            placeholder="e.g., Interview Preparation"
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Description (optional)</label>
                          <Textarea
                            placeholder="Describe what this collection is for..."
                            value={newCollectionDescription}
                            onChange={(e) => setNewCollectionDescription(e.target.value)}
                          />
                        </div>
                        <Button onClick={createCollection} className="w-full">
                          Create Collection
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {collections.length === 0 ? (
                  <div className="text-center py-8">
                    <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No collections yet</h3>
                    <p className="text-muted-foreground">Create collections to organize your resources</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {collections.map((collection) => (
                      <Card key={collection.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <FolderOpen className="h-5 w-5 text-primary" />
                              <h4 className="font-medium">{collection.name}</h4>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{collection.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {collection.resources.length} resources
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {collection.isPublic ? "Public" : "Private"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Trending Resources</span>
                </CardTitle>
                <CardDescription>Most popular resources this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resources
                    .sort((a, b) => (b.views || 0) - (a.views || 0))
                    .slice(0, 10)
                    .map((resource, index) => (
                      <div key={resource.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                          <span className="text-sm font-bold text-primary">#{index + 1}</span>
                        </div>
                        {getTypeIcon(resource.type)}
                        <div className="flex-1">
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground">by {resource.author}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            <span>{resource.views}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Download className="h-3 w-3" />
                            <span>{resource.downloadCount}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleDownload(resource)}>
                          Access
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
