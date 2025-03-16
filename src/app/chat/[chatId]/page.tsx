"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useChat } from "ai/react";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { Message } from "@/components/chat/message";
import { WelcomeMessage } from "@/components/chat/welcome-message";
import { LoadingDots } from "@/components/chat/loading-dots";
import type { Message as MessageType } from "@/types/chat";

export default function ChatPage() {
  const params = useParams();
  const chatId = params?.chatId as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages, reload } = useChat({
    id: chatId,
    api: "/api/chat",
    onFinish: async (message) => {
      if (chatId) {
        await saveMessage("assistant", message.content);
      }
    }

  });

  const loadMessages = async () => {
    if (chatId) {
      try {
        const response = await fetch(`/api/chats/${chatId}/messages`);
        const chatMessages = await response.json();

        // Convert the DB messages to the format expected by useChat
        const formattedMessages = chatMessages.map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content
        }));

        console.log("formattedMessages", formattedMessages);

        setMessages(formattedMessages);

        // Check if there's exactly one user message and no assistant messages
        const hasOnlyOneUserMessage = formattedMessages.length === 1 &&
          formattedMessages[0].role === "user";

        if (hasOnlyOneUserMessage) {
          reload();
        }

        setInitialLoadComplete(true);
      } catch (error) {
        console.error("Failed to load messages:", error);
        setInitialLoadComplete(true);
      }
    } else {
      setInitialLoadComplete(true);
    }
  };

  // Load existing messages for this chat
  useEffect(() => {
    loadMessages();
  }, [chatId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const saveMessage = async (role: string, content: string) => {
    if (!chatId) return;

    try {
      await fetch(`/api/chats/${chatId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, content }),
      });

      // Update chat title if it's the first user message
      if (role === "user" && messages.length === 0) {
        const title = content.slice(0, 30) + (content.length > 30 ? "..." : "");
        updateChatTitle(title);
      }
    } catch (error) {
      console.error("Failed to save message:", error);
    }
  };

  const updateChatTitle = async (title: string) => {
    if (!chatId) return;

    try {
      await fetch(`/api/chats/${chatId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
    } catch (error) {
      console.error("Failed to update chat title:", error);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Save the user message to the database
    if (chatId) {
      await saveMessage("user", input);
    }

    // Submit to AI
    handleSubmit(e);
  };

  const formattedMessages: MessageType[] = messages.map((message) => ({
    id: message.id,
    type: message.role === "user" ? "user" : "bot",
    text: message.content,
    createdAt: new Date(),
  }));

  return (
    <div className="md:ml-64 flex flex-col flex-1 h-full">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto md:px-6 lg:px-8 pb-4 pt-2
                scrollbar-thin scrollbar-thumb-rounded-md
                dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800
                scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {!initialLoadComplete ? (
          <div className="flex items-center justify-center h-full">
            <LoadingDots />
          </div>
        ) : messages.length === 0 ? (
          <div>
            <WelcomeMessage />
          </div>
        ) : (
          <div className="space-y-5 max-w-3xl mx-auto">
            {formattedMessages.map((message, index) => {
              const isNextMessageSamePerson =
                index < formattedMessages.length - 1 && formattedMessages[index + 1].type === message.type;

              return (
                <Message
                  key={message.id}
                  message={message}
                  isNextMessageSamePerson={isNextMessageSamePerson}
                />
              );
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
            handleSubmit={handleCustomSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}