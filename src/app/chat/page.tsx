"use client"

import { useChat } from "ai/react"
import { useEffect, useRef } from "react"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatInput } from "@/components/chat/chat-input"
import { Message } from "@/components/chat/message"
import { WelcomeMessage } from "@/components/chat/welcome-message"
import { LoadingDots } from "@/components/chat/loading-dots"
import type { Message as MessageType } from "@/types/chat"

export default function ChatPage() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat()

    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const formattedMessages: MessageType[] = messages.map((message) => ({
        id: message.id,
        type: message.role === "user" ? "user" : "bot",
        text: message.content,
        createdAt: new Date(),
    }))

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto md:px-6 lg:px-8 pb-4 pt-2
        scrollbar-thin scrollbar-thumb-rounded-md
        dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800
        scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {formattedMessages.length === 0 ? (
                    <div>
                        <WelcomeMessage />
                    </div>
                ) : (

                    <div className="space-y-5 max-w-3xl mx-auto">
                        {formattedMessages.map((message, index) => {
                            const isNextMessageSamePerson =
                                index < formattedMessages.length - 1 && formattedMessages[index + 1].type === message.type

                            return (
                                <Message
                                    key={message.id}
                                    message={message}
                                    isNextMessageSamePerson={isNextMessageSamePerson}
                                />
                            )
                        })}
                        {isLoading && (
                            <div className="flex items-end ml-2">
                                <div className="relative flex h-9 w-9 items-center justify-center rounded-full 
                  bg-law-secondary/10 dark:bg-law-secondary/20">
                                    <span className="sr-only">Loading</span>
                                </div>
                                <div className="flex flex-col space-y-2 text-base max-w-md mx-2">
                                    <div className="px-4 py-2 rounded-lg inline-block bg-gray-100 dark:bg-gray-800 rounded-bl-none">
                                        <LoadingDots />
                                    </div>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="flex items-center justify-center px-4">
                                <div className="bg-red-50 text-red-800 dark:bg-red-900/40 dark:text-red-200 
                  px-4 py-3 rounded-lg text-sm border border-red-200 dark:border-red-800/50 max-w-3xl w-full">
                                    Error: {error.message || "Something went wrong. Please try again."}
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            <div className="border-t dark:border-gray-800 border-gray-200 p-2 sm:p-4 md:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <ChatInput
                        input={input}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    )
}