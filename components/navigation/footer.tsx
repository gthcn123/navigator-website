import Link from "next/link"
import { TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl">NextStep Navigator</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering students, graduates, and professionals to discover their perfect career path through
              personalized guidance and comprehensive resources.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/career-bank" className="block text-muted-foreground hover:text-foreground transition-colors">
                Career Bank
              </Link>
              <Link href="/quiz" className="block text-muted-foreground hover:text-foreground transition-colors">
                Interest Quiz
              </Link>
              <Link href="/multimedia" className="block text-muted-foreground hover:text-foreground transition-colors">
                Multimedia Guidance
              </Link>
              <Link href="/stories" className="block text-muted-foreground hover:text-foreground transition-colors">
                Success Stories
              </Link>
              <Link href="/resources" className="block text-muted-foreground hover:text-foreground transition-colors">
                Resource Library
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Support</h3>
            <div className="space-y-2 text-sm">
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/help" className="block text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@nextstepnavigator.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Career Street, Future City, FC 12345</span>
              </div>
            </div>

            {/* Newsletter signup */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Stay Updated</h4>
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" className="text-sm" />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 NextStep Navigator. All rights reserved. Built with passion for career guidance.</p>
        </div>
      </div>
    </footer>
  )
}
