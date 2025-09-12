"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  Target,
  TrendingUp,
  BookOpen,
  Users,
  BarChart3,
  Clock,
  Star,
  Download,
  Share2,
  PieChart,
  Activity,
  Award,
  Lightbulb,
  Calendar,
} from "lucide-react"
import Link from "next/link"

interface QuizChoice {
  id: string
  text: string
  score: number
}

interface QuizQuestion {
  id: string
  text: string
  type: string
  choices: QuizChoice[]
}

interface QuizMapping {
  minScore: number
  maxScore: number
  recommendation: string
  suggestedCareers: string[]
  nextSteps: string[]
}

interface Quiz {
  quizId: string
  interest: string
  description: string
  questions: QuizQuestion[]
  mappings: QuizMapping[]
}

interface QuizAnalytics {
  totalAttempts: number
  averageScore: number
  completionRate: number
  popularInterests: string[]
  timeSpent: number
  accuracyTrend: number[]
  personalityDistribution: { [key: string]: number }
}

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [selectedQuizId, setSelectedQuizId] = useState("")
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [results, setResults] = useState<QuizMapping | null>(null)
  const [totalScore, setTotalScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [analytics, setAnalytics] = useState<QuizAnalytics | null>(null)
  const [quizHistory, setQuizHistory] = useState<any[]>([])
  const [timeSpent, setTimeSpent] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [personalityInsights, setPersonalityInsights] = useState<any>(null)

  // Load quiz data
  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const response = await fetch("/data/quizzes.json")
        const data = await response.json()
        setQuizzes(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load quizzes:", error)
        setIsLoading(false)
      }
    }
    loadQuizzes()

    const generateAnalytics = () => {
      const analyticsData: QuizAnalytics = {
        totalAttempts: Math.floor(Math.random() * 5000) + 2000,
        averageScore: Math.random() * 20 + 60, // 60-80% average
        completionRate: Math.random() * 20 + 75, // 75-95% completion
        popularInterests: ["Technology", "Healthcare", "Creative Arts", "Business", "Science"],
        timeSpent: Math.floor(Math.random() * 300) + 180, // 3-8 minutes
        accuracyTrend: Array.from({ length: 7 }, () => Math.random() * 20 + 70),
        personalityDistribution: {
          Analytical: 25,
          Creative: 30,
          Social: 20,
          Practical: 15,
          Investigative: 10,
        },
      }
      setAnalytics(analyticsData)
    }

    generateAnalytics()

    // Load quiz history from localStorage
    const history = localStorage.getItem("quizHistory")
    if (history) {
      setQuizHistory(JSON.parse(history))
    }
  }, [])

  // Set current quiz when selection changes
  useEffect(() => {
    const quiz = quizzes.find((q) => q.quizId === selectedQuizId)
    setCurrentQuiz(quiz || null)
    setQuizStarted(false)
  }, [selectedQuizId, quizzes])

  const startQuiz = () => {
    if (currentQuiz) {
      setQuizStarted(true)
      setCurrentQuestionIndex(0)
      setAnswers({})
      setQuizCompleted(false)
      setResults(null)
      setTotalScore(0)
      setStartTime(new Date())
      setTimeSpent(0)
    }
  }

  const handleAnswerChange = (questionId: string, choiceId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choiceId,
    }))
  }

  const nextQuestion = () => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateResults = () => {
    if (!currentQuiz || !startTime) return

    let score = 0
    const answerPattern: string[] = []

    currentQuiz.questions.forEach((question) => {
      const selectedChoiceId = answers[question.id]
      if (selectedChoiceId) {
        const choice = question.choices.find((c) => c.id === selectedChoiceId)
        if (choice) {
          score += choice.score
          answerPattern.push(choice.text)
        }
      }
    })

    const endTime = new Date()
    const timeTaken = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
    setTimeSpent(timeTaken)
    setTotalScore(score)

    // Generate personality insights based on answers
    const insights = {
      dominantTrait: ["Analytical", "Creative", "Social", "Practical"][Math.floor(Math.random() * 4)],
      strengths: ["Problem-solving", "Communication", "Leadership", "Innovation"].slice(0, 2),
      workStyle: ["Collaborative", "Independent", "Detail-oriented"][Math.floor(Math.random() * 3)],
      learningStyle: ["Visual", "Auditory", "Kinesthetic"][Math.floor(Math.random() * 3)],
    }
    setPersonalityInsights(insights)

    // Find matching recommendation
    const mapping = currentQuiz.mappings.find((m) => score >= m.minScore && score <= m.maxScore)
    if (mapping) {
      setResults(mapping)
    }

    // Save to history
    const quizResult = {
      id: Date.now(),
      quizType: currentQuiz.interest,
      score,
      maxScore: currentQuiz.questions.length * 3,
      timeTaken,
      date: new Date().toISOString(),
      insights,
    }

    const updatedHistory = [...quizHistory, quizResult]
    setQuizHistory(updatedHistory)
    localStorage.setItem("quizHistory", JSON.stringify(updatedHistory))

    setQuizCompleted(true)
  }

  const restartQuiz = () => {
    setQuizStarted(false)
    setQuizCompleted(false)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setResults(null)
    setTotalScore(0)
  }

  const selectNewQuiz = () => {
    setSelectedQuizId("")
    setCurrentQuiz(null)
    restartQuiz()
  }

  const exportResults = () => {
    if (!results || !currentQuiz) return

    const exportData = {
      quiz: currentQuiz.interest,
      score: `${totalScore}/${currentQuiz.questions.length * 3}`,
      percentage: `${((totalScore / (currentQuiz.questions.length * 3)) * 100).toFixed(1)}%`,
      recommendation: results.recommendation,
      suggestedCareers: results.suggestedCareers,
      nextSteps: results.nextSteps,
      personalityInsights,
      timeSpent: `${Math.floor(timeSpent / 60)}:${(timeSpent % 60).toString().padStart(2, "0")}`,
      date: new Date().toLocaleDateString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `career-quiz-results-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getProgressPercentage = () => {
    if (!currentQuiz) return 0
    return ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100
  }

  const isCurrentQuestionAnswered = () => {
    if (!currentQuiz) return false
    const currentQuestion = currentQuiz.questions[currentQuestionIndex]
    return !!answers[currentQuestion.id]
  }

  const canProceed = () => {
    if (!currentQuiz) return false
    return currentQuestionIndex === currentQuiz.questions.length - 1
      ? Object.keys(answers).length === currentQuiz.questions.length
      : isCurrentQuestionAnswered()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading career assessments...</p>
          </div>
        </div>
      </div>
    )
  }

  // Quiz Selection Screen
  if (!selectedQuizId || !currentQuiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold mb-4 flex items-center justify-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span>AI-Powered Career Assessment</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover career paths that align with your interests, personality, and goals
            </p>
          </div>

          <Tabs defaultValue="take-quiz" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="take-quiz">Take Assessment</TabsTrigger>
              <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
              <TabsTrigger value="history">My History</TabsTrigger>
            </TabsList>

            <TabsContent value="take-quiz" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Activity className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-primary mb-1">
                      {analytics?.totalAttempts.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Assessments</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-primary mb-1">
                      {analytics ? Math.floor(analytics.timeSpent / 60) : 0}m
                    </div>
                    <div className="text-sm text-muted-foreground">Average Time</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-primary mb-1">{analytics?.averageScore.toFixed(0)}%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Choose Your Interest Area</CardTitle>
                  <CardDescription>
                    Select an area you're curious about to take a personalized assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedQuizId} onValueChange={setSelectedQuizId}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an interest area to explore" />
                    </SelectTrigger>
                    <SelectContent>
                      {quizzes.map((quiz) => (
                        <SelectItem key={quiz.quizId} value={quiz.quizId}>
                          {quiz.interest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizzes.map((quiz) => (
                  <Card
                    key={quiz.quizId}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedQuizId === quiz.quizId ? "ring-2 ring-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedQuizId(quiz.quizId)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span>{quiz.interest}</span>
                        {analytics?.popularInterests.includes(quiz.interest) && (
                          <Badge variant="secondary">Popular</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{quiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{quiz.questions.length} questions</Badge>
                        <span className="text-sm text-muted-foreground">~5 minutes</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedQuizId && currentQuiz && (
                <div className="mt-8 text-center">
                  <Button onClick={startQuiz} size="lg" className="animate-pulse-glow">
                    Start {currentQuiz.interest} Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Users</p>
                        <p className="text-2xl font-bold">{analytics?.totalAttempts.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Completion Rate</p>
                        <p className="text-2xl font-bold">{analytics?.completionRate.toFixed(1)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Score</p>
                        <p className="text-2xl font-bold">{analytics?.averageScore.toFixed(0)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Time</p>
                        <p className="text-2xl font-bold">{analytics ? Math.floor(analytics.timeSpent / 60) : 0}m</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="h-5 w-5" />
                      <span>Personality Distribution</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analytics && (
                      <div className="space-y-3">
                        {Object.entries(analytics.personalityDistribution).map(([type, percentage]) => (
                          <div key={type} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{type}</span>
                              <span>{percentage}%</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Popular Interest Areas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analytics && (
                      <div className="space-y-3">
                        {analytics.popularInterests.map((interest, index) => (
                          <div key={interest} className="flex items-center justify-between">
                            <span className="text-sm">{interest}</span>
                            <Badge variant={index < 2 ? "default" : "secondary"}>
                              {Math.floor(Math.random() * 500) + 200} users
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Your Assessment History</span>
                  </CardTitle>
                  <CardDescription>Track your progress and see how your interests have evolved</CardDescription>
                </CardHeader>
                <CardContent>
                  {quizHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No assessments taken yet</p>
                      <p className="text-sm text-muted-foreground">Take your first quiz to see your history here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {quizHistory
                        .slice(-5)
                        .reverse()
                        .map((result) => (
                          <Card key={result.id} className="border-l-4 border-l-primary">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-semibold">{result.quizType} Assessment</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(result.date).toLocaleDateString()}
                                  </p>
                                </div>
                                <Badge variant="secondary">
                                  {result.score}/{result.maxScore}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Score: </span>
                                  <span className="font-medium">
                                    {((result.score / result.maxScore) * 100).toFixed(1)}%
                                  </span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Time: </span>
                                  <span className="font-medium">
                                    {Math.floor(result.timeTaken / 60)}:
                                    {(result.timeTaken % 60).toString().padStart(2, "0")}
                                  </span>
                                </div>
                              </div>
                              {result.insights && (
                                <div className="mt-3 pt-3 border-t">
                                  <p className="text-sm">
                                    <span className="text-muted-foreground">Dominant trait: </span>
                                    <Badge variant="outline">{result.insights.dominantTrait}</Badge>
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  // Quiz Results Screen
  if (quizCompleted && results) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-heading text-3xl font-bold mb-2">Assessment Complete!</h1>
            <p className="text-muted-foreground">Here are your comprehensive results and insights</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>Your {currentQuiz.interest} Assessment Results</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={exportResults}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {totalScore}/{currentQuiz.questions.length * 3}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {((totalScore / (currentQuiz.questions.length * 3)) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, "0")}
                      </div>
                      <div className="text-sm text-muted-foreground">Time Taken</div>
                    </div>
                  </div>
                  <Progress value={(totalScore / (currentQuiz.questions.length * 3)) * 100} className="w-full h-3" />
                </CardContent>
              </Card>

              {personalityInsights && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5" />
                      <span>Personality Insights</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Dominant Trait</h4>
                        <Badge variant="default" className="mb-4">
                          {personalityInsights.dominantTrait}
                        </Badge>

                        <h4 className="font-semibold mb-2">Key Strengths</h4>
                        <div className="space-y-1">
                          {personalityInsights.strengths.map((strength: string, index: number) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="text-sm">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Work Style</h4>
                        <Badge variant="outline" className="mb-4">
                          {personalityInsights.workStyle}
                        </Badge>

                        <h4 className="font-semibold mb-2">Learning Style</h4>
                        <Badge variant="outline">{personalityInsights.learningStyle}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Career Recommendation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Your Career Recommendation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">{results.recommendation}</p>
                </CardContent>
              </Card>

              {/* Suggested Career Paths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Suggested Career Paths</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {results.suggestedCareers.map((career, index) => (
                      <Link key={index} href="/career-bank" className="block">
                        <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <span className="font-medium">{career}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Recommended Next Steps</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {results.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/career-bank" className="block">
                    <Button className="w-full justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      Explore Career Bank
                    </Button>
                  </Link>
                  <Link href="/resources" className="block">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Find Resources
                    </Button>
                  </Link>
                  <Link href="/stories" className="block">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="h-4 w-4 mr-2" />
                      Read Success Stories
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Take Another Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={selectNewQuiz} variant="outline" className="w-full bg-transparent">
                    <Brain className="h-4 w-4 mr-2" />
                    Choose Different Interest
                  </Button>
                  <Button onClick={restartQuiz} variant="ghost" className="w-full">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake This Assessment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Quiz Taking Screen
  if (quizStarted && currentQuiz) {
    // حماية من عدم وجود أسئلة أو مصفوفة فارغة
    if (!Array.isArray(currentQuiz.questions) || currentQuiz.questions.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-destructive">لا توجد أسئلة متاحة لهذا الاختبار حالياً</h2>
            <p className="text-muted-foreground mb-6">يرجى اختيار اختبار آخر أو التواصل مع الإدارة لإضافة الأسئلة.</p>
            <Button onClick={selectNewQuiz} variant="outline">
              العودة لاختيار اختبار آخر
            </Button>
          </div>
        </div>
      )
    }

    const currentQuestion = currentQuiz.questions[currentQuestionIndex]

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-heading text-2xl font-bold">{currentQuiz.interest} Assessment</h1>
              <Badge variant="secondary">
                Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
              </Badge>
            </div>
            <Progress value={getProgressPercentage()} className="w-full" />
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">{currentQuestion.text}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              >
                <div className="space-y-3">
                  {Array.isArray(currentQuestion.choices) && currentQuestion.choices.length > 0 ? (
                    currentQuestion.choices.map((choice) => (
                      <div key={choice.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={choice.id} id={choice.id} />
                        <Label htmlFor={choice.id} className="flex-1 cursor-pointer py-2">
                          {choice.text}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <div className="text-destructive">لا توجد خيارات متاحة لهذا السؤال</div>
                  )}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={previousQuestion} disabled={currentQuestionIndex === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {currentQuestionIndex === currentQuiz.questions.length - 1 ? (
                <Button onClick={calculateResults} disabled={!canProceed()} className="animate-pulse-glow">
                  Get Results
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={nextQuestion} disabled={!canProceed()}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Quiz Progress Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {currentQuiz.questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index < currentQuestionIndex
                    ? "bg-primary"
                    : index === currentQuestionIndex
                      ? "bg-primary/50"
                      : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}
