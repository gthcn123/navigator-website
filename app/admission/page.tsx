"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Globe,
  GraduationCap,
  FileText,
  Download,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react"

type Stream = {
  id: string
  name: string
  icon: string
  description: string
  requirements: string[]
  careers: string[]
  image?: string
}

type Step = { step: number; title: string; description: string; details: string[] }

type Country = {
  name: string
  flag: string
  popular: string
  info?: string
}

type DownloadItem = { label: string; file: string }
type ExternalResource = { name: string; url: string; desc: string }

type AdmissionData = {
  title: string
  subtitle?: string
  streams: Stream[]
  studyAbroadSteps: Step[]
  countries: Country[]
  downloads: DownloadItem[]
  externalResources: ExternalResource[]
}

export default function AdmissionPage() {
  const [data, setData] = useState<AdmissionData | null>(null)
  const [selectedStream, setSelectedStream] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [activeCountry, setActiveCountry] = useState<string | null>(null)

  useEffect(() => {
    fetch("/data/admission.json")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) return null

  const { title, subtitle, streams: streamData, studyAbroadSteps, countries, downloads, externalResources } = data

  const pickDownloadStyle = (label: string, file: string) => {
    const l = (label || "").toLowerCase()
    const f = (file || "").toLowerCase()
    const isAdmission = l.includes("admission") || f.includes("admission")
    const isStudyAbroad = l.includes("study") || l.includes("checklist") || f.includes("study-abroad")
    const isScholarship = l.includes("scholarship") || f.includes("scholarship")

    if (isAdmission) return { wrap: "bg-[var(--color-muted)]", dot: "bg-[var(--color-primary)]", iconColor: "text-[var(--color-primary-foreground)]", btn: "bg-[var(--color-primary)] hover:bg-[var(--color-primary-foreground)]" }
    if (isStudyAbroad) return { wrap: "bg-[var(--color-muted)]", dot: "bg-[var(--color-secondary)]", iconColor: "text-[var(--color-secondary-foreground)]", btn: "bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-foreground)]" }
    if (isScholarship) return { wrap: "bg-[var(--color-muted)]", dot: "bg-[var(--color-accent)]", iconColor: "text-[var(--color-accent-foreground)]", btn: "bg-[var(--color-accent)] hover:bg-[var(--color-accent-foreground)]" }
    return { wrap: "bg-[var(--color-muted)]", dot: "bg-[var(--color-muted-foreground)]", iconColor: "text-[var(--color-foreground)]", btn: "bg-[var(--color-foreground)] hover:bg-[var(--color-muted-foreground)]" }
  }

  const isImage = (v?: string) => !!v && (/^https?:\/\//.test(v) || v.startsWith("/"))

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="bg-[var(--color-card)] shadow-sm border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-[var(--color-primary)]" />
            <h1 className="text-4xl font-bold text-[var(--color-foreground)]">{title}</h1>
          </motion.div>
          {subtitle && <p className="text-xl text-[var(--color-muted-foreground)] max-w-3xl mx-auto">{subtitle}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Stream Selection */}
        <section>
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-6 w-6 text-[var(--color-primary)]" />
              <h2 className="text-3xl font-bold text-[var(--color-foreground)]">Stream Selection Guide</h2>
            </motion.div>
            <p className="text-lg text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
              Choose the right academic path based on your interests, strengths, and career goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {streamData.map((stream, index) => {
              const isOpen = selectedStream === stream.id
              return (
                <motion.div
                  key={stream.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 border border-[var(--color-border)] ${isOpen ? 'ring-2 ring-[var(--color-primary)] shadow-xl' : 'hover:shadow-xl'}`}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedStream(isOpen ? null : stream.id)}
                    className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                    aria-expanded={isOpen}
                    aria-controls={`${stream.id}-details`}
                    type="button"
                  >
                    <img src={stream.image || "/placeholder.svg"} alt={stream.name} loading="lazy" className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{stream.icon}</span>
                        <h3 className="text-xl font-bold text-[var(--color-foreground)]">{stream.name}</h3>
                      </div>
                      <p className="text-[var(--color-muted-foreground)]">{stream.description}</p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
                        <span className="opacity-80">{isOpen ? "Click to collapse" : "Click to see details"}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${stream.id}-details`}
                        key={`${stream.id}-details`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="p-6 space-y-4 border-t border-[var(--color-border)] overflow-hidden"
                      >
                        <div>
                          <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Requirements:</h4>
                          <ul className="space-y-1">
                            {stream.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-[var(--color-muted-foreground)]">
                                <CheckCircle className="h-4 w-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Career Paths:</h4>
                          <div className="flex flex-wrap gap-2">
                            {stream.careers.map((career, idx) => (
                              <span key={idx} className="px-2 py-1 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-xs rounded-full">
                                {career}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Study Abroad */}
        <section>
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
              <Globe className="h-6 w-6 text-[var(--color-primary)]" />
              <h2 className="text-3xl font-bold text-[var(--color-foreground)]">Study Abroad Guidelines</h2>
            </motion.div>
            <p className="text-lg text-[var(--color-muted-foreground)] max-w-2xl mx-auto">Step-by-step guide to pursuing international education opportunities</p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-8 text-center">Application Process</h3>
            <div className="space-y-6">
              {studyAbroadSteps.map((item, index) => {
                const open = activeStep === item.step
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className={`rounded-2xl overflow-hidden transition-all duration-300 border border-[var(--color-border)] ${open ? 'ring-2 ring-[var(--color-primary)] shadow-xl' : 'hover:shadow-xl'}`}
                  >
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setActiveStep(open ? null : item.step)}
                      className="w-full text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                      aria-expanded={open}
                      aria-controls={`step-${item.step}-details`}
                      type="button"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-primary)/10] rounded-full flex items-center justify-center">
                          <span className="text-[var(--color-primary)] font-bold text-lg">{item.step}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-[var(--color-foreground)] mb-2">{item.title}</h4>
                          <p className="text-[var(--color-muted-foreground)] mb-1">{item.description}</p>
                          <div className="mt-1 flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
                            <span className="opacity-80">{open ? "Click to collapse" : "Tap to expand"}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                          </div>
                        </div>
                      </div>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={`step-${item.step}-details`}
                          key={`step-${item.step}-details`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-6 pb-6 space-y-2 overflow-hidden"
                        >
                          {item.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
                              <ArrowRight className="h-4 w-4 text-[var(--color-primary)]" />
                              {detail}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-8 text-center">Popular Study Destinations</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country, index) => {
                const isOpen = activeCountry === country.name
                return (
                  <motion.div
                    key={country.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    className={`group rounded-2xl p-6 transition-all duration-300 border border-[var(--color-border)] cursor-pointer ${isOpen ? 'ring-2 ring-[var(--color-primary)] shadow-xl' : 'hover:shadow-xl'}`}
                    onClick={() => setActiveCountry(isOpen ? null : country.name)}
                    role="button"
                    aria-expanded={isOpen}
                    aria-controls={`country-${index}-info`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {isImage(country.flag) ? (
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          loading="lazy"
                          className="w-12 h-8 object-contain bg-[var(--color-card)] ring-1 ring-[var(--color-border)]"
                        />
                      ) : (
                        <span className="text-3xl">{country.flag}</span>
                      )}
                      <h4 className="text-xl font-bold text-[var(--color-foreground)]">{country.name}</h4>
                    </div>

                    <p className="text-[var(--color-muted-foreground)]">
                      <span className="font-semibold">Popular Universities:</span> {country.popular}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <span className="text-[var(--color-muted-foreground)] opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                        {isOpen ? "Click to collapse" : "Click to see more"}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-[var(--color-muted-foreground)] transition-transform duration-200 ${isOpen ? "rotate-180" : "group-hover:translate-y-0.5"}`}
                      />
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && country.info && (
                        <motion.div
                          id={`country-${index}-info`}
                          key={`country-${index}-info`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-3 text-sm text-[var(--color-muted-foreground)] overflow-hidden"
                        >
                          {country.info}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="rounded-3xl p-8 border border-[var(--color-border)]">
          <div className="text-center mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-[var(--color-primary)]" />
              <h2 className="text-3xl font-bold text-[var(--color-foreground)]">Download Resources</h2>
            </motion.div>
            <p className="text-lg text-[var(--color-muted-foreground)]">Get comprehensive guides and templates to support your academic journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {downloads.map((d, idx) => {
              const style = pickDownloadStyle(d.label, d.file)
              return (
                <motion.div
                  key={d.file}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className={`text-center p-6 rounded-2xl ${style.wrap}`}
                >
                  <div className={`w-16 h-16 ${style.dot} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <FileText className={`h-8 w-8 ${style.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-3">{d.label}</h3>
                  <a href={d.file} download className={`inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl transition-colors ${style.btn}`}>
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
            <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-6 text-center">Useful External Resources</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {externalResources.map((resource, index) => (
                <motion.a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 p-4 rounded-xl transition-colors bg-[var(--color-muted)] hover:bg-[var(--color-card)]"
                >
                  <ExternalLink className="h-5 w-5 text-[var(--color-muted-foreground)]" />
                  <div>
                    <div className="font-semibold text-[var(--color-foreground)]">{resource.name}</div>
                    <div className="text-sm text-[var(--color-muted-foreground)]">{resource.desc}</div>
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
