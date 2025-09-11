"use client"

import { useState } from "react"
import { GraduationCap, Globe, FileText, MessageSquare, CheckCircle, ArrowRight, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CoachingPage() {
  const [activeTab, setActiveTab] = useState("stream-selection")

  const streamOptions = [
    {
      title: "Science Stream",
      description: "Physics, Chemistry, Biology/Mathematics",
      careers: ["Doctor", "Engineer", "Researcher", "Pharmacist"],
      requirements: "Strong analytical skills, interest in scientific concepts",
      icon: "🔬",
    },
    {
      title: "Commerce Stream",
      description: "Accounting, Business Studies, Economics",
      careers: ["Chartered Accountant", "Business Analyst", "Banker", "Entrepreneur"],
      requirements: "Mathematical aptitude, business acumen",
      icon: "💼",
    },
    {
      title: "Arts/Humanities",
      description: "Literature, History, Psychology, Political Science",
      careers: ["Lawyer", "Journalist", "Psychologist", "Civil Servant"],
      requirements: "Strong communication skills, critical thinking",
      icon: "📚",
    },
  ]

  const studyAbroadSteps = [
    {
      step: 1,
      title: "Research & Planning",
      description: "Research universities, programs, and requirements",
      timeline: "12-18 months before",
    },
    {
      step: 2,
      title: "Standardized Tests",
      description: "Take required tests (SAT, GRE, IELTS, TOEFL)",
      timeline: "10-12 months before",
    },
    {
      step: 3,
      title: "Application Preparation",
      description: "Prepare documents, essays, and recommendations",
      timeline: "8-10 months before",
    },
    {
      step: 4,
      title: "Submit Applications",
      description: "Submit applications and pay fees",
      timeline: "6-8 months before",
    },
    {
      step: 5,
      title: "Financial Planning",
      description: "Apply for scholarships and arrange funding",
      timeline: "4-6 months before",
    },
    {
      step: 6,
      title: "Visa Process",
      description: "Apply for student visa and prepare for departure",
      timeline: "2-4 months before",
    },
  ]

  const resumeTips = [
    {
      section: "Contact Information",
      tips: [
        "Include full name, phone number, professional email",
        "Add LinkedIn profile and portfolio website if relevant",
        "Use a professional email address (avoid nicknames)",
      ],
    },
    {
      section: "Professional Summary",
      tips: [
        "Write 2-3 sentences highlighting your key strengths",
        "Tailor it to the specific job you're applying for",
        "Include relevant keywords from the job description",
      ],
    },
    {
      section: "Work Experience",
      tips: [
        "List experiences in reverse chronological order",
        "Use action verbs to describe your achievements",
        "Quantify results with numbers and percentages when possible",
      ],
    },
    {
      section: "Education",
      tips: [
        "Include degree, institution, graduation date, and GPA (if above 3.5)",
        "List relevant coursework, honors, and academic achievements",
        "Include certifications and professional development courses",
      ],
    },
  ]

  const interviewTips = [
    {
      category: "Before the Interview",
      tips: [
        "Research the company thoroughly - mission, values, recent news",
        "Practice common interview questions with a friend or mirror",
        "Prepare specific examples using the STAR method (Situation, Task, Action, Result)",
        "Plan your outfit and route to the interview location",
        "Prepare thoughtful questions to ask the interviewer",
      ],
    },
    {
      category: "During the Interview",
      tips: [
        "Arrive 10-15 minutes early",
        "Maintain good eye contact and confident body language",
        "Listen carefully to questions and ask for clarification if needed",
        "Provide specific examples to support your answers",
        "Show enthusiasm for the role and company",
      ],
    },
    {
      category: "After the Interview",
      tips: [
        "Send a thank-you email within 24 hours",
        "Reiterate your interest in the position",
        "Address any concerns that came up during the interview",
        "Follow up appropriately if you don't hear back within the stated timeframe",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admission & Coaching</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guidance for academic planning, study abroad preparation, and professional development.
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="stream-selection" className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Stream Selection</span>
            </TabsTrigger>
            <TabsTrigger value="study-abroad" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Study Abroad</span>
            </TabsTrigger>
            <TabsTrigger value="resume-tips" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Resume Tips</span>
            </TabsTrigger>
            <TabsTrigger value="interview-prep" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Interview Prep</span>
            </TabsTrigger>
          </TabsList>

          {/* Stream Selection */}
          <TabsContent value="stream-selection" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                  <span>Choosing Your Stream After 10th Grade</span>
                </CardTitle>
                <CardDescription>
                  Make an informed decision about your academic path with our comprehensive stream guide.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {streamOptions.map((stream, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="text-4xl mb-2">{stream.icon}</div>
                        <CardTitle className="text-xl">{stream.title}</CardTitle>
                        <CardDescription>{stream.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Career Options:</h4>
                          <div className="flex flex-wrap gap-1">
                            {stream.careers.map((career, careerIndex) => (
                              <Badge key={careerIndex} variant="secondary" className="text-xs">
                                {career}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                          <p className="text-sm text-gray-600">{stream.requirements}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Pro Tips for Stream Selection</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Consider your interests, strengths, and long-term career goals</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Research job market trends and future opportunities</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Talk to professionals in fields that interest you</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Don't let peer pressure influence your decision</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Abroad */}
          <TabsContent value="study-abroad" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-green-600" />
                  <span>Study Abroad Guidelines</span>
                </CardTitle>
                <CardDescription>Your step-by-step guide to studying abroad successfully.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {studyAbroadSteps.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">{item.step}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <Badge variant="outline">{item.timeline}</Badge>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardHeader>
                      <CardTitle className="text-yellow-800">📋 Required Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="text-yellow-700">
                      <ul className="space-y-1 text-sm">
                        <li>• Academic transcripts and certificates</li>
                        <li>• Standardized test scores (SAT, GRE, etc.)</li>
                        <li>• Letters of recommendation</li>
                        <li>• Statement of purpose/Personal essay</li>
                        <li>• Passport and visa documents</li>
                        <li>• Financial statements</li>
                        <li>• English proficiency test scores</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-800">💰 Funding Options</CardTitle>
                    </CardHeader>
                    <CardContent className="text-green-700">
                      <ul className="space-y-1 text-sm">
                        <li>• Merit-based scholarships</li>
                        <li>• Need-based financial aid</li>
                        <li>• Government scholarships</li>
                        <li>• University assistantships</li>
                        <li>• Education loans</li>
                        <li>• Work-study programs</li>
                        <li>• External funding organizations</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resume Tips */}
          <TabsContent value="resume-tips" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-6 w-6 text-green-600" />
                  <span>Resume Writing Guidelines</span>
                </CardTitle>
                <CardDescription>Create a compelling resume that gets you noticed by employers.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {resumeTips.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.section}</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <ul className="space-y-2">
                          {section.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">📄 Resume Templates & Examples</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="justify-between bg-transparent">
                      <span>Entry Level Template</span>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="justify-between bg-transparent">
                      <span>Experienced Professional</span>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="justify-between bg-transparent">
                      <span>Creative Industries</span>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interview Preparation */}
          <TabsContent value="interview-prep" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                  <span>Interview Preparation Guide</span>
                </CardTitle>
                <CardDescription>
                  Master the art of interviewing with our comprehensive preparation guide.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {interviewTips.map((category, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <ul className="space-y-3">
                          {category.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start space-x-2">
                              <ArrowRight className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-purple-50 border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-800">❓ Common Interview Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="text-purple-700">
                      <ul className="space-y-2 text-sm">
                        <li>• Tell me about yourself</li>
                        <li>• Why do you want this job?</li>
                        <li>• What are your strengths and weaknesses?</li>
                        <li>• Where do you see yourself in 5 years?</li>
                        <li>• Why should we hire you?</li>
                        <li>• Describe a challenging situation you faced</li>
                        <li>• Do you have any questions for us?</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-50 border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-800">🎯 STAR Method</CardTitle>
                    </CardHeader>
                    <CardContent className="text-orange-700 space-y-2">
                      <div>
                        <strong>Situation:</strong> Set the context
                      </div>
                      <div>
                        <strong>Task:</strong> Describe your responsibility
                      </div>
                      <div>
                        <strong>Action:</strong> Explain what you did
                      </div>
                      <div>
                        <strong>Result:</strong> Share the outcome
                      </div>
                      <p className="text-sm mt-3">
                        Use this framework to structure your behavioral interview responses.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
