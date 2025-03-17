"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { WelcomeMessage } from "@/components/chat/welcome-message";

export default function NewChatPage() {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        setIsLoading(true);

        try {
            const title = input.slice(0, 30) + (input.length > 30 ? "..." : "");

            const chatResponse = await fetch("/api/chats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: title }),
            });

            if (!chatResponse.ok) {
                throw new Error("Failed to create chat");
            }

            const newChat = await chatResponse.json();

            console.log("New Chat Saved", newChat);

            const saveMsg = await fetch(`/api/chats/${newChat.id}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role: "user", content: input }),
            });

            const mam = await saveMsg.json();

            console.log("saveMsg", mam);

            router.push(`/chat/${newChat.id}`);
        } catch (error) {
            console.error("Failed to create chat:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="md:ml-64 flex flex-col flex-1 h-full">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto md:px-6 lg:px-8 pb-4 pt-2
                scrollbar-thin scrollbar-thumb-rounded-md
                dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800
                scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div>
                    <WelcomeMessage
                        handleInputChange={handleInputChange}
                    />
                </div>
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
    );
}