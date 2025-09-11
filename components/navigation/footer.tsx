import Link from "next/link"
import { TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-[#2A0800] text-[#F4DBD8] mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-[#C09891] rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-[#2A0800]" />
              </div>
              <span className="font-heading font-bold text-xl">NextStep Navigator</span>
            </div>
            <p className="text-[#BEA8A7] text-sm leading-relaxed">
              Empowering students, graduates, and professionals to discover their perfect career path through
              personalized guidance and comprehensive resources.
            </p>
            <div className="flex space-x-2">
              <Button className="bg-[#C09891] text-[#2A0800] hover:bg-[#775144]" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button className="bg-[#C09891] text-[#2A0800] hover:bg-[#775144]" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button className="bg-[#C09891] text-[#2A0800] hover:bg-[#775144]" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button className="bg-[#C09891] text-[#2A0800] hover:bg-[#775144]" size="sm">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-[#C09891]">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/career-bank" className="block text-[#BEA8A7] hover:text-[#F4DBD8] transition-colors">
                Career Bank
              </Link>
              <Link href="/quiz" className="block text-[#BEA8A7] hover:text-[#F4DBD8] transition-colors">
                Interest Quiz
              </Link>
              <Link href="/multimedia" className="block text-[#BEA8A7] hover:text-[#F4DBD8] transition-colors">
                Multimedia Guidance
              </Link>
              <Link href="/stories" className="block text-[#BEA8A7] hover:text-[#F4DBD8] transition-colors">
                Success Stories
              </Link>
              <Link href="/resources" className="block text-[#BEA8A7] hover:text-[#F4DBD8] transition-colors">
                Resource Library
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-[#C09891]">Support</h3>
            <div className="space-y-2 text-sm">
              <Link href="/contact" className="block text-[#BEA8A7] hover:text-[#F4DBD8] transition-colors">
                Contact Us
              </Link>
              <Link href="/about" className="block text-[#BEA8A7] hover:text-[#F4DBD8] transition-colors">
                About Us
              </Link>
              <Link href="/privacy" className="block text-[#BEA8A7] hover:text-[#F4DBD8] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-[#BEA8A7] hover:text-[#F4DBD8] transition-colors">
                Terms of Service
              </Link>
              <Link href="/help" className="block text-[#BEA8A7] hover:text-[#F4DBD8] transition-colors">
                Help Center
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-[#C09891]">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-[#BEA8A7]">
                <Mail className="h-4 w-4" />
                <span>info@nextstepnavigator.com</span>
              </div>
              <div className="flex items-center space-x-2 text-[#BEA8A7]">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-[#BEA8A7]">
                <MapPin className="h-4 w-4" />
                <span>123 Career Street, Future City, FC 12345</span>
              </div>
            </div>

            {/* Newsletter signup */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-[#C09891]">Stay Updated</h4>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  className="text-sm bg-[#F4DBD8] text-[#2A0800] placeholder-[#775144] border border-[#C09891]"
                />
                <Button className="bg-[#C09891] text-[#2A0800] hover:bg-[#775144]" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#775144] mt-8 pt-8 text-center text-sm text-[#BEA8A7]">
          <p>&copy; 2024 NextStep Navigator. All rights reserved. Built with passion for career guidance.</p>
        </div>
      </div>
    </footer>
  )
}
