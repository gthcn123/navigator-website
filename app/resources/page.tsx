"use client"

import { useState, useEffect } from "react"
import { Search, Download, BookOpen, FileText, CheckSquare, Video, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Resource {
  id: string
  title: string
  description: string
  type: "Article" | "eBook" | "Checklist" | "Webinar"
  category: string
  userType: string[]
  fileUrl?: string
  externalUrl?: string
  size?: string
  format?: string
  downloadCount: number
  featured: boolean
}

export default function ResourceLibrary() {
  const [resources, setResources] = useState<Resource[]>([])
  const [filteredResources, setFilteredResources] = useState<Resource[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await fetch("/data/resources.json")
        const data = await response.json()
        setResources(data)
        setFilteredResources(data)
      } catch (error) {
        console.error("Error loading resources:", error)
      } finally {
        setLoading(false)
      }
    }

    loadResources()
  }, [])

  useEffect(() => {
    let filtered = resources

    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((resource) => resource.type === typeFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((resource) => resource.category === categoryFilter)
    }

    setFilteredResources(filtered)
  }, [searchTerm, typeFilter, categoryFilter, resources])

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
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDownload = (resource: Resource) => {
    if (resource.fileUrl) {
      // Simulate download
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

  const categories = [...new Set(resources.map((r) => r.category))]
  const types = ["Article", "eBook", "Checklist", "Webinar"]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resources...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resource Library</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive collection of career guidance materials, from articles and eBooks to checklists and
            webinars.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
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
                <SelectValue placeholder="Filter by category" />
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
          </div>
        </div>

        {/* Featured Resources */}
        {resources.some((r) => r.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources
                .filter((r) => r.featured)
                .slice(0, 3)
                .map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(resource.type)}
                          <Badge className={getTypeColor(resource.type)}>{resource.type}</Badge>
                        </div>
                        <Badge variant="secondary">Featured</Badge>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {resource.size && <span>{resource.size}</span>}
                          {resource.format && <span> • {resource.format}</span>}
                        </div>
                        <Button
                          onClick={() => handleDownload(resource)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Access
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Resources ({filteredResources.length})</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    {getTypeIcon(resource.type)}
                    <Badge className={getTypeColor(resource.type)}>{resource.type}</Badge>
                    <Badge variant="outline">{resource.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {resource.userType.map((type) => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {resource.size && <span>{resource.size}</span>}
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

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
