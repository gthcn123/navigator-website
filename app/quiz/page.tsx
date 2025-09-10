"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowRight, ArrowLeft, RotateCcw, CheckCircle, Target, TrendingUp, BookOpen, Users } from "lucide-react"
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
  }, [])

  // Set current quiz when selection changes
  useEffect(() => {
    if (selectedQuizId && quizzes.length > 0) {
      const quiz = quizzes.find((q) => q.quizId === selectedQuizId)
      setCurrentQuiz(quiz || null)
    }
  }, [selectedQuizId, quizzes])

  const startQuiz = () => {
    if (currentQuiz) {
      setQuizStarted(true)
      setCurrentQuestionIndex(0)
      setAnswers({})
      setQuizCompleted(false)
      setResults(null)
      setTotalScore(0)
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
    if (!currentQuiz) return

    let score = 0
    currentQuiz.questions.forEach((question) => {
      const selectedChoiceId = answers[question.id]
      if (selectedChoiceId) {
        const choice = question.choices.find((c) => c.id === selectedChoiceId)
        if (choice) {
          score += choice.score
        }
      }
    })

    setTotalScore(score)

    // Find matching recommendation
    const mapping = currentQuiz.mappings.find((m) => score >= m.minScore && score <= m.maxScore)

    if (mapping) {
      setResults(mapping)
    }

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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold mb-4 flex items-center justify-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span>Interest-Based Career Quiz</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover career paths that align with your interests and personality
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Choose Your Interest Area</CardTitle>
              <CardDescription>Select an area you're curious about to take a personalized assessment</CardDescription>
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
                  <CardTitle className="text-lg">{quiz.interest}</CardTitle>
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
        </div>
      </div>
    )
  }

  // Quiz Results Screen
  if (quizCompleted && results) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-heading text-3xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground">Here are your personalized results</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Score Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Your {currentQuiz.interest} Score</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {totalScore}/{currentQuiz.questions.length * 3}
                    </div>
                    <Progress value={(totalScore / (currentQuiz.questions.length * 3)) * 100} className="w-full" />
                  </div>
                </CardContent>
              </Card>

              {/* Recommendation */}
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

              {/* Suggested Careers */}
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

              {/* Next Steps */}
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
                  <CardTitle>Take Another Quiz</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={selectNewQuiz} variant="outline" className="w-full bg-transparent">
                    <Brain className="h-4 w-4 mr-2" />
                    Choose Different Interest
                  </Button>
                  <Button onClick={restartQuiz} variant="ghost" className="w-full">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake This Quiz
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
                  {currentQuestion.choices.map((choice) => (
                    <div key={choice.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={choice.id} id={choice.id} />
                      <Label htmlFor={choice.id} className="flex-1 cursor-pointer py-2">
                        {choice.text}
                      </Label>
                    </div>
                  ))}
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
