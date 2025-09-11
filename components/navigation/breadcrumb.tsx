"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const routeLabels: Record<string, string> = {
  "": "Home",
  "career-bank": "Career Bank",
  quiz: "Interest Quiz",
  multimedia: "Multimedia Guidance",
  stories: "Success Stories",
  resources: "Resource Library",
  coaching: "Admission & Coaching",
  bookmarks: "My Bookmarks",
  contact: "Contact Us",
  about: "About Us",
}

export function BreadcrumbNav() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  if (pathname === "/") {
    return null // Don't show breadcrumb on home page
  }

  return (
    <div
      className="container mx-auto px-4 py-3 border-b"
      style={{ backgroundColor: "#F4DBD8", borderColor: "#775144" }}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                className="flex items-center space-x-1 text-[#775144] hover:text-[#2A0800] transition-colors"
              >
                <Home className="h-4 w-4 text-[#775144]" />
                <span className="text-sm">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/")
            const isLast = index === pathSegments.length - 1
            const label =
              routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

            return (
              <div key={segment} className="flex items-center">
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4 text-[#775144]" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>
                      <span className="text-[#2A0800] font-medium text-sm">{label}</span>
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={href}
                        className="text-sm text-[#775144] hover:text-[#2A0800] transition-colors"
                      >
                        {label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
