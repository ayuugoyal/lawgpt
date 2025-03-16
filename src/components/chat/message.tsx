import { cn, formatDate } from "@/lib/utils"
import type { Message as ChatMessage } from "@/types/chat"
import { Scale, User } from "lucide-react"
import { type FC, memo } from "react"
import ReactMarkdown from "react-markdown"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface MessageProps {
  message: ChatMessage
  isNextMessageSamePerson: boolean
}

const MessageComponent: FC<MessageProps> = ({ message, isNextMessageSamePerson }) => {
  return (
    <div
      className={cn("flex items-end", {
        "justify-end": message.type === "user",
      })}
    >
      {!isNextMessageSamePerson && (
        <Avatar
          className={cn("h-8 w-8 sm:h-9 sm:w-9", {
            "order-2 ml-2": message.type === "user",
            "order-1 mr-2": message.type === "bot",
          })}
        >
          <AvatarFallback
            className={cn({
              "bg-law-primary text-white": message.type === "user",
              "bg-law-secondary text-white": message.type === "bot",
            })}
          >
            {message.type === "user" ? <User className="h-4 w-4 sm:h-5 sm:w-5" /> : <Scale className="h-4 w-4 sm:h-5 sm:w-5" />}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn("flex flex-col space-y-1 max-w-[85%] sm:max-w-md mx-1 sm:mx-2", {
          "order-1 items-end": message.type === "user",
          "order-2 items-start": message.type === "bot",
          "ml-10 sm:ml-11": isNextMessageSamePerson && message.type === "bot",
          "mr-10 sm:mr-11": isNextMessageSamePerson && message.type === "user",
        })}
      >
        <div
          className={cn("px-3 py-2 sm:px-4 sm:py-3 rounded-lg", {
            "bg-law-primary text-white dark:bg-law-primary/90": message.type === "user",
            "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100": message.type === "bot",
            "rounded-br-none": !isNextMessageSamePerson && message.type === "user",
            "rounded-bl-none": !isNextMessageSamePerson && message.type === "bot",
          })}
        >
          {message.type === "bot" ? (
            <div
              className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2
                prose-pre:my-2 prose-pre:p-0 prose-pre:bg-transparent
                prose-code:bg-gray-200 dark:prose-code:bg-gray-700 prose-code:rounded prose-code:px-1 prose-code:py-0.5 
                prose-code:text-sm prose-code:before:hidden prose-code:after:hidden"
            >
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {children}
                    </a>
                  ),
                  code: ({ children, className, node, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <pre className="bg-gray-800 text-gray-100 dark:bg-black dark:text-gray-100 p-2 rounded text-sm overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          ) : (
            <p>{message.text}</p>
          )}
        </div>

        {message.createdAt && (
          <div
            className={cn("text-xs select-none px-1", {
              "text-gray-500 dark:text-gray-400": message.type === "bot",
              "text-blue-400 dark:text-blue-300": message.type === "user",
            })}
          >
            {formatDate(message.createdAt)}
          </div>
        )}
      </div>
    </div>
  )
}

export const Message = memo(MessageComponent)