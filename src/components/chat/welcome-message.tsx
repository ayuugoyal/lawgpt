"use client"

import { useState, useEffect } from "react"
import { Scale, Lightbulb, Save, ArrowRight, Sparkles, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WelcomeMessageProps {
  onNewProject?: () => void
  handleInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function WelcomeMessage({ onNewProject, handleInputChange }: WelcomeMessageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSuggestionClick = (text: string) => {
    if (handleInputChange) {
      handleInputChange({ target: { value: text } } as React.ChangeEvent<HTMLTextAreaElement>)
    }
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col items-center justify-center py-4 sm:py-6 md:py-8 w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="w-full">
        <Card className="overflow-hidden border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900 w-full">
          <CardHeader className="pb-2 relative bg-white dark:bg-gray-900">
            <div className="flex items-center mb-3">
              <div className="bg-gradient-to-r from-law-primary to-law-secondary p-2.5 rounded-xl shadow-md">
                <Scale className="h-5 w-5 text-white" />
              </div>
              <Sparkles className="h-5 w-5 text-amber-500 ml-2 animate-pulse" />
            </div>

            <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-law-primary to-law-secondary bg-clip-text text-transparent dark:text-transparent">
              Welcome to LawGPT India
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Your AI-powered legal research and information companion for Indian laws
            </CardDescription>
          </CardHeader>

          <CardContent className="text-sm text-gray-700 dark:text-gray-300 pb-6 relative z-10 bg-white dark:bg-gray-900">
            <p className="mb-5">
              I&apos;m here to help you with Indian legal questions, case laws, document drafting, and more.
              How can I assist you today?
            </p>

            <div className="grid grid-cols-1 gap-3 mt-4">
              <h3 className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                Try asking about these topics:
              </h3>

              {[
                {
                  title: "What are the divorce laws in India?",
                  description: "Hindu Marriage Act, Special Marriage Act, grounds for divorce",
                  icon: <BookOpen className="h-4 w-4" />
                },
                {
                  title: "What are my rights in case of dowry harassment?",
                  description: "Dowry Prohibition Act, IPC 498A, legal remedies",
                  icon: <BookOpen className="h-4 w-4" />
                },
                {
                  title: "How does property inheritance work in India?",
                  description: "Hindu Succession Act, Muslim inheritance laws, will execution",
                  icon: <BookOpen className="h-4 w-4" />
                },
                {
                  title: "What are the laws on sexual harassment and rape in India?",
                  description: "IPC 375, POSH Act, legal protections for women",
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
              <CategoryCard title="Family Law" color="from-blue-500 to-indigo-600" />
              <CategoryCard title="Criminal Law" color="from-red-500 to-orange-600" />
              <CategoryCard title="Property Rights" color="from-green-500 to-teal-600" />
              <CategoryCard title="Employment Laws" color="from-purple-500 to-pink-600" />
            </div>

            {onNewProject && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  className="border-dashed border-gray-300 dark:border-gray-700 hover:border-law-primary/50 bg-white dark:bg-gray-900 w-full sm:w-auto"
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

const SuggestionButton: React.FC<SuggestionButtonProps> = ({ text, description, onClick, delay }) => {
  return (
    <div className="animate-fadeIn" style={{ animationDelay: `${delay}s` }}>
      <Button
        variant="outline"
        className="w-full justify-between text-left h-auto py-2.5 px-3 sm:py-3 sm:px-4 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-law-primary/50 transition-all group"
        onClick={onClick}
      >
        <div className="flex flex-col items-start">
          <span className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base break-words whitespace-normal">{text}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 break-words whitespace-normal">{description}</span>
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