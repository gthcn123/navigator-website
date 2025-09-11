"use client"

import { FileText, Download, CheckCircle, Star, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ResumePage() {
  const resumeSections = [
    {
      title: "Contact Information",
      description: "Essential details for employers to reach you",
      tips: [
        "Include full name, phone number, and professional email address",
        "Add LinkedIn profile URL and portfolio website if relevant",
        "Use a professional email address (avoid nicknames or unprofessional handles)",
        "Include city and state (full address not necessary for privacy)",
      ],
      example: "John Smith | (555) 123-4567 | john.smith@email.com | linkedin.com/in/johnsmith",
    },
    {
      title: "Professional Summary",
      description: "A compelling overview of your qualifications",
      tips: [
        "Write 2-3 sentences highlighting your key strengths and experience",
        "Tailor it to the specific job you're applying for",
        "Include relevant keywords from the job description",
        "Focus on what you can offer the employer, not what you want",
      ],
      example:
        "Results-driven marketing professional with 5+ years of experience in digital campaigns and brand management. Proven track record of increasing engagement by 40% and driving revenue growth through innovative strategies.",
    },
    {
      title: "Work Experience",
      description: "Your professional history and achievements",
      tips: [
        "List experiences in reverse chronological order (most recent first)",
        "Use strong action verbs to describe your responsibilities and achievements",
        "Quantify results with numbers, percentages, and dollar amounts when possible",
        "Focus on accomplishments rather than just job duties",
      ],
      example:
        "Marketing Specialist | ABC Company | 2020-2023\n• Increased social media engagement by 45% through targeted content strategy\n• Managed $50K annual advertising budget, achieving 25% ROI improvement",
    },
    {
      title: "Education",
      description: "Your academic background and qualifications",
      tips: [
        "Include degree type, major, institution name, and graduation date",
        "List GPA only if it's 3.5 or higher",
        "Include relevant coursework, honors, and academic achievements",
        "Add certifications and professional development courses",
      ],
      example:
        "Bachelor of Science in Marketing | University of California | 2020\nRelevant Coursework: Digital Marketing, Consumer Behavior, Market Research",
    },
    {
      title: "Skills",
      description: "Technical and soft skills relevant to the position",
      tips: [
        "Separate technical skills from soft skills",
        "Include proficiency levels for software and tools",
        "Match skills to job requirements",
        "Use industry-standard terminology",
      ],
      example:
        "Technical: Adobe Creative Suite (Expert), Google Analytics (Advanced), SQL (Intermediate)\nSoft Skills: Project Management, Team Leadership, Strategic Planning",
    },
  ]

  const resumeTemplates = [
    {
      name: "Entry Level Template",
      description: "Perfect for recent graduates and career starters",
      features: ["Clean, professional design", "Education-focused layout", "Skills section emphasis"],
      downloadUrl: "/resources/resume-template-entry-level.pdf",
    },
    {
      name: "Experienced Professional",
      description: "Ideal for professionals with 3+ years experience",
      features: ["Experience-focused layout", "Achievement highlights", "Leadership emphasis"],
      downloadUrl: "/resources/resume-template-experienced.pdf",
    },
    {
      name: "Creative Industries",
      description: "Designed for creative and design professionals",
      features: ["Visual appeal", "Portfolio integration", "Creative layout options"],
      downloadUrl: "/resources/resume-template-creative.pdf",
    },
  ]

  const commonMistakes = [
    "Using an unprofessional email address",
    "Including irrelevant personal information",
    "Making the resume too long (more than 2 pages)",
    "Using passive language instead of action verbs",
    "Failing to quantify achievements",
    "Including outdated or irrelevant skills",
    "Poor formatting and inconsistent styling",
    "Spelling and grammar errors",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Guidelines</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create a professional resume that showcases your skills and gets you noticed by employers.
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">6 seconds</div>
              <p className="text-gray-600">Average time recruiters spend reviewing a resume</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">75%</div>
              <p className="text-gray-600">Of resumes are filtered out by ATS systems</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">1-2 pages</div>
              <p className="text-gray-600">Ideal resume length for most positions</p>
            </CardContent>
          </Card>
        </div>

        {/* Resume Sections Guide */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Essential Resume Sections</CardTitle>
            <CardDescription>Learn how to craft each section of your resume for maximum impact.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {resumeSections.map((section, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Best Practices:</h4>
                      <ul className="space-y-2">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Example:</h4>
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{section.example}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resume Templates */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Professional Resume Templates</CardTitle>
            <CardDescription>Download professionally designed templates to get started quickly.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resumeTemplates.map((template, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {template.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        // Create a downloadable PDF blob
                        const link = document.createElement("a")
                        link.href = template.downloadUrl
                        link.download = template.name.toLowerCase().replace(/\s+/g, "-") + ".pdf"
                        link.click()
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-red-600">Common Resume Mistakes to Avoid</CardTitle>
            <CardDescription>
              Learn from these frequent errors that can hurt your chances of getting an interview.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm font-bold">✗</span>
                  </div>
                  <span className="text-red-800">{mistake}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Next Steps</CardTitle>
            <CardDescription>Ready to create your resume? Follow these steps to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <span>Choose and download a template that matches your experience level</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <span>Gather all your information: work history, education, skills, and achievements</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <span>Customize your resume for each job application</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <span>Proofread carefully and ask someone else to review it</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1">
                <ArrowRight className="h-5 w-5 mr-2" />
                Take Our Career Quiz
              </Button>
              <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                <FileText className="h-5 w-5 mr-2" />
                View Interview Tips
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
