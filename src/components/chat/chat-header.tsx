"use client"

import type { FC, ReactNode } from "react"
import { Scale, Menu, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

interface ChatHeaderProps {
  title?: string
  children?: ReactNode
  projectName?: string
  onSidebarToggle?: () => void
}

export const ChatHeader: FC<ChatHeaderProps> = ({
  title = "AI Assistant",
  children,
  projectName,
  onSidebarToggle
}) => {

  const displayTitle = projectName || title

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 
      flex items-center justify-between px-3 pl-12 sm:pl-0 py-4 sm:px-4 sm:py-3 lg:px-6">
      <div className="flex items-center space-x-2 sm:space-x-3">
        {onSidebarToggle && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onSidebarToggle}
                  className="h-8 w-8 rounded-full"
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle projects sidebar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <Link href={"/"} className="flex items-center space-x-2">
          <div className="bg-law-secondary p-1.5 rounded-md shadow-sm">
            {projectName ? (
              <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            ) : (
              <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            )}
          </div>
          <h1 className="text-lg sm:text-xl font-semibold text-law-primary dark:text-white truncate max-w-[150px] sm:max-w-[200px] md:max-w-xs">
            {displayTitle}
          </h1>
        </Link>

      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <Badge variant="outline" className="hidden sm:flex items-center space-x-1.5 px-2 py-1 bg-green-50 dark:bg-green-900/20">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-green-700 dark:text-green-400">Online</span>
        </Badge>

        {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full h-8 w-8"
        >
          <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button> */}

        <UserButton />

        {children}
      </div>
    </div>
  )
}