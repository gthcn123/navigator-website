"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Globe, GraduationCap, FileText, Download, ExternalLink, CheckCircle, ArrowRight } from "lucide-react"

const streamData = [
  {
    id: "science",
    name: "Science Stream",
    icon: "🔬",
    description: "Physics, Chemistry, Biology, Mathematics",
    requirements: [
      "High school diploma with science subjects",
      "Minimum 75% in PCM/PCB",
      "Entrance exam qualification (JEE/NEET)",
      "Strong analytical and problem-solving skills",
    ],
    careers: ["Engineering", "Medicine", "Research", "Technology"],
    image: "/science-laboratory-equipment.jpg",
  },
  {
    id: "commerce",
    name: "Commerce Stream",
    icon: "💼",
    description: "Accounting, Economics, Business Studies",
    requirements: [
      "High school diploma",
      "Basic mathematics proficiency",
      "Interest in business and finance",
      "Good communication skills",
    ],
    careers: ["Business", "Finance", "Accounting", "Management"],
    image: "/business-finance-charts.png",
  },
  {
    id: "arts",
    name: "Arts & Humanities",
    icon: "🎨",
    description: "Literature, History, Psychology, Fine Arts",
    requirements: [
      "High school diploma",
      "Creative thinking abilities",
      "Strong language skills",
      "Cultural awareness",
    ],
    careers: ["Teaching", "Media", "Arts", "Social Work"],
    image: "/arts-humanities-books-painting.jpg",
  },
  {
    id: "technical",
    name: "Technical/Vocational",
    icon: "⚙️",
    description: "Engineering, IT, Skilled Trades",
    requirements: [
      "Technical aptitude",
      "Hands-on learning preference",
      "Problem-solving skills",
      "Industry certifications",
    ],
    careers: ["Technical Support", "Manufacturing", "IT Services", "Skilled Trades"],
    image: "/technical-engineering-tools.jpg",
  },
]

const studyAbroadSteps = [
  {
    step: 1,
    title: "Research & Planning",
    description: "Choose your destination country and preferred universities",
    details: ["Research university rankings", "Check program requirements", "Compare costs and scholarships"],
  },
  {
    step: 2,
    title: "Language Proficiency",
    description: "Prepare for IELTS/TOEFL/PTE exams",
    details: ["Book exam dates", "Take preparation courses", "Achieve required scores"],
  },
  {
    step: 3,
    title: "Application Process",
    description: "Submit applications to chosen universities",
    details: ["Prepare documents", "Write personal statements", "Submit before deadlines"],
  },
  {
    step: 4,
    title: "Financial Planning",
    description: "Arrange funding and apply for scholarships",
    details: ["Calculate total costs", "Apply for scholarships", "Arrange education loans"],
  },
  {
    step: 5,
    title: "Visa Application",
    description: "Apply for student visa after admission",
    details: ["Gather required documents", "Schedule visa interview", "Pay visa fees"],
  },
]

const countries = [
  { name: "United States", flag: "🇺🇸", popular: "MIT, Harvard, Stanford" },
  { name: "United Kingdom", flag: "🇬🇧", popular: "Oxford, Cambridge, Imperial" },
  { name: "Canada", flag: "🇨🇦", popular: "Toronto, UBC, McGill" },
  { name: "Australia", flag: "🇦🇺", popular: "Melbourne, Sydney, ANU" },
  { name: "Germany", flag: "🇩🇪", popular: "TUM, Heidelberg, Berlin" },
  { name: "Netherlands", flag: "🇳🇱", popular: "Delft, Amsterdam, Eindhoven" },
]

export default function AdmissionPage() {
  const [selectedStream, setSelectedStream] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <GraduationCap className="h-8 w-8 text-green-600" />
              <h1 className="text-4xl font-bold text-gray-900">Admission & Coaching</h1>
            </motion.div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your comprehensive guide to academic planning, stream selection, and study abroad opportunities
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Stream Selection Section */}
        <section>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <BookOpen className="h-6 w-6 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Stream Selection Guide</h2>
            </motion.div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the right academic path based on your interests, strengths, and career goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {streamData.map((stream, index) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  selectedStream === stream.id ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => setSelectedStream(selectedStream === stream.id ? null : stream.id)}
              >
                <img src={stream.image || "/placeholder.svg"} alt={stream.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{stream.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900">{stream.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{stream.description}</p>

                  {selectedStream === stream.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {stream.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Career Paths:</h4>
                        <div className="flex flex-wrap gap-2">
                          {stream.careers.map((career, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              {career}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Study Abroad Section */}
        <section>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Globe className="h-6 w-6 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Study Abroad Guidelines</h2>
            </motion.div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Step-by-step guide to pursuing international education opportunities
            </p>
          </div>

          {/* Process Steps */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Application Process</h3>
            <div className="space-y-6">
              {studyAbroadSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    activeStep === item.step ? "ring-2 ring-green-500" : ""
                  }`}
                  onClick={() => setActiveStep(activeStep === item.step ? null : item.step)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 mb-3">{item.description}</p>

                      {activeStep === item.step && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          {item.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <ArrowRight className="h-4 w-4 text-green-500" />
                              {detail}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Study Destinations</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country, index) => (
                <motion.div
                  key={country.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{country.flag}</span>
                    <h4 className="text-xl font-bold text-gray-900">{country.name}</h4>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Popular Universities:</span> {country.popular}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <FileText className="h-6 w-6 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Download Resources</h2>
            </motion.div>
            <p className="text-lg text-gray-600">
              Get comprehensive guides and templates to support your academic journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-green-50 rounded-2xl"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Admission Guide</h3>
              <p className="text-gray-600 mb-4">
                Complete guide to college admissions, requirements, and application tips
              </p>
              <a
                href="/resources/admission-guide.pdf"
                download
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 bg-blue-50 rounded-2xl"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Study Abroad Checklist</h3>
              <p className="text-gray-600 mb-4">Step-by-step checklist for international education planning</p>
              <a
                href="/resources/study-abroad-checklist.pdf"
                download
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 bg-purple-50 rounded-2xl"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scholarship Guide</h3>
              <p className="text-gray-600 mb-4">Comprehensive guide to finding and applying for scholarships</p>
              <a
                href="/resources/scholarship-guide.pdf"
                download
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </motion.div>
          </div>

          {/* External Resources */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Useful External Resources</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "IELTS Official", url: "https://ielts.org", desc: "English proficiency test" },
                { name: "TOEFL", url: "https://toefl.org", desc: "Test of English as Foreign Language" },
                { name: "Common App", url: "https://commonapp.org", desc: "US college applications" },
                { name: "UCAS", url: "https://ucas.com", desc: "UK university applications" },
              ].map((resource, index) => (
                <motion.a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <ExternalLink className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-semibold text-gray-900">{resource.name}</div>
                    <div className="text-sm text-gray-600">{resource.desc}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
