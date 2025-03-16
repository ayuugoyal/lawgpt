import type { FC } from "react"

interface LoadingDotsProps {
  color?: string
}

export const LoadingDots: FC<LoadingDotsProps> = ({ color = "" }) => {
  return (
    <div className="flex space-x-1.5 items-center justify-center p-1">
      <div className={`h-2 w-2 rounded-full animate-bounce ${color || 'bg-law-secondary dark:bg-law-secondary/90'}`}
        style={{ animationDelay: "0ms" }} />
      <div className={`h-2 w-2 rounded-full animate-bounce ${color || 'bg-law-secondary dark:bg-law-secondary/90'}`}
        style={{ animationDelay: "150ms" }} />
      <div className={`h-2 w-2 rounded-full animate-bounce ${color || 'bg-law-secondary dark:bg-law-secondary/90'}`}
        style={{ animationDelay: "300ms" }} />
    </div>
  )
}