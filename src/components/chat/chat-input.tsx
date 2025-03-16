"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Send, Save } from "lucide-react"
import { type FC, type KeyboardEvent, useRef } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChatInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  onSaveProject?: () => void
}

export const ChatInput: FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  onSaveProject
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const form = textareaRef.current?.closest("form")
      if (form) {
        const formEvent = new Event("submit", {
          bubbles: true,
          cancelable: true,
        }) as unknown as React.FormEvent<HTMLFormElement>
        handleSubmit(formEvent)
      }
    }
  }

  return (
    <div className="relative mx-4 mb-8 sm:mx-0">
      <form onSubmit={handleSubmit} className="relative flex items-center ">
        <div className="relative w-full">
          <TextareaAutosize
            ref={textareaRef}
            rows={1}
            maxRows={5}
            autoFocus
            placeholder="Ask a question..."
            className={cn(
              "resize-none block w-full rounded-md border border-input bg-background py-3 px-4 pr-14",
              "text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
            )}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
            {onSaveProject && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      onClick={onSaveProject}
                      className={cn(
                        "h-8 w-8 rounded-full",
                        "bg-green-600 text-white hover:bg-green-700",
                      )}
                    >
                      <Save className="h-4 w-4" />
                      <span className="sr-only">Save as project</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Save as project</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || input.trim() === ""}
                    className={cn(
                      "h-8 w-8 rounded-full",
                      "bg-law-primary text-white hover:bg-law-primary/90",
                      "disabled:opacity-50 disabled:pointer-events-none"
                    )}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </form>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>
          Press <kbd className="rounded-md border px-1 py-0.5 text-xs font-semibold">Enter</kbd> to send
        </span>
        <span>
          Press <kbd className="rounded-md border px-1 py-0.5 text-xs font-semibold">Shift + Enter</kbd> for new line
        </span>
      </div>
    </div>
  )
}