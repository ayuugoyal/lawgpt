"use client"

import { useState, useEffect } from "react"
import { Scale, Lightbulb, Save, ArrowRight, Sparkles, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WelcomeMessageProps {
  onNewProject?: () => void
}

export function WelcomeMessage({ onNewProject }: WelcomeMessageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSuggestionClick = (text: string) => {
    const textareaElement = document.querySelector("textarea")
    if (textareaElement) {
      // Set the value directly
      textareaElement.value = text

      // Create and dispatch an input event to trigger React's onChange
      const inputEvent = new Event("input", { bubbles: true })
      textareaElement.dispatchEvent(inputEvent)

      // Focus the textarea
      textareaElement.focus()
    }
  }

  if (!mounted) return null

  return (

    <div className="flex flex-col items-center justify-center py-4 sm:py-6 md:py-8 w-full max-w-3xl mx-auto px-2">
      <div className="w-full">
        <Card className="overflow-hidden border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900">
          <CardHeader className="pb-2 relative z-10 bg-white dark:bg-gray-900">
            <div className="flex items-center mb-3">
              <div className="bg-gradient-to-r from-law-primary to-law-secondary p-2.5 rounded-xl shadow-md">
                <Scale className="h-5 w-5 text-white" />
              </div>
              <Sparkles className="h-5 w-5 text-amber-500 ml-2 animate-pulse" />
            </div>

            <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-law-primary to-law-secondary bg-clip-text text-transparent dark:text-transparent">
              Welcome to LawGPT Assistant
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Your AI-powered legal research and information companion
            </CardDescription>
          </CardHeader>

          <CardContent className="text-sm text-gray-700 dark:text-gray-300 pb-6 relative z-10 bg-white dark:bg-gray-900">
            <p className="mb-5">
              I&apos;m here to help you with legal questions, document analysis, case research, and more.
              How can I assist you today?
            </p>

            <div className="grid grid-cols-1 gap-3 mt-4">
              <h3 className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                Try asking about these topics:
              </h3>

              {[
                {
                  title: "What are my rights as a tenant?",
                  description: "Understand rental laws and tenant protections",
                  icon: <BookOpen className="h-4 w-4" />
                },
                {
                  title: "Explain contract law basics",
                  description: "Learn about formation, terms, and enforcement",
                  icon: <BookOpen className="h-4 w-4" />
                },
                {
                  title: "How does copyright protection work?",
                  description: "Coverage for creative works and fair use exceptions",
                  icon: <BookOpen className="h-4 w-4" />
                },
                {
                  title: "What is the difference between a felony and misdemeanor?",
                  description: "Criminal law classifications and consequences",
                  icon: <BookOpen className="h-4 w-4" />
                }
              ].map((suggestion, index) => (
                <SuggestionButton
                  key={index}
                  text={suggestion.title}
                  description={suggestion.description}
                  icon={suggestion.icon}
                  onClick={() => handleSuggestionClick(suggestion.title)}
                  delay={index * 0.1}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 mt-6">
              <CategoryCard title="Legal Research" color="from-blue-500 to-indigo-600" />
              <CategoryCard title="Document Help" color="from-emerald-500 to-teal-600" />
              <CategoryCard title="Case Analysis" color="from-orange-500 to-amber-600" />
              <CategoryCard title="Legal Terms" color="from-purple-500 to-fuchsia-600" />
            </div>

            {onNewProject && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  className="border-dashed border-gray-300 dark:border-gray-700 hover:border-law-primary/50 bg-white dark:bg-gray-900"
                  onClick={onNewProject}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create a New Project
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface SuggestionButtonProps {
  text: string
  description: string
  icon: React.ReactNode
  onClick: () => void
  delay: number
}

const SuggestionButton: React.FC<SuggestionButtonProps> = ({
  text,
  description,
  icon,
  onClick,
  delay
}) => {
  return (
    <div
      className="animate-fadeIn"
      style={{ animationDelay: `${delay}s` }}
    >
      <Button
        variant="outline"
        className="w-full justify-between text-left h-auto py-2.5 px-3 sm:py-3 sm:px-4 
        hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-law-primary/50 transition-all
        group"
        onClick={onClick}
      >
        <div className="flex flex-col items-start">
          <span className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base line-clamp-1">{text}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{description}</span>
        </div>
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-law-primary shrink-0 ml-2" />
      </Button>
    </div>
  )
}

interface CategoryCardProps {
  title: string
  color: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
      rounded-lg p-2 sm:p-3 text-center hover:shadow-md transition-shadow overflow-hidden 
      relative group">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity`} />
      <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{title}</p>
    </div>
  )
}