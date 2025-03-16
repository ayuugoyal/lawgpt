"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, MessageSquare, Search, Trash2, Scale } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
    SidebarSeparator,
    SidebarMenuAction,
    SidebarInput,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useUser, UserButton } from "@clerk/nextjs";
import { ChatSession } from "@/types/chat";

type Chat = {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    unread?: boolean;
    pinned?: boolean;
};

export function ChatSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [chats, setChats] = useState<Chat[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useUser()

    const fetchChats = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/chats");
            const data = await response.json();

            const transformedChats = data.map((chat: ChatSession) => ({
                ...chat,
                createdAt: new Date(chat.createdAt),
                updatedAt: new Date(chat.updatedAt),
            }));

            setChats(transformedChats);
        } catch (error) {
            console.error("Failed to fetch chats:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    const createNewChat = async () => {
        try {
            const response = await fetch("/api/chats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: "New Chat" }),
            });

            const newChat = await response.json();

            fetchChats();

            router.push(`/chat/${newChat.id}`);
        } catch (error) {
            console.error("Failed to create new chat:", error);
        }
    };

    const deleteChat = async (chatId: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (confirm("Are you sure you want to delete this chat?")) {
            try {
                await fetch(`/api/chats/${chatId}`, {
                    method: "DELETE",
                });
                setChats(chats.filter(chat => chat.id !== chatId));

                fetchChats();
                // Redirect to home if deleting the currently active chat
                if (pathname === `/chat/${chatId}`) {
                    router.push("/chat");
                }
            } catch (error) {
                console.error("Failed to delete chat:", error);
            }
        }
    };

    // Filter chats based on search query
    const filteredChats = chats.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Separate pinned and regular chats
    const pinnedChats = filteredChats.filter(chat => chat.pinned);
    const regularChats = filteredChats.filter(chat => !chat.pinned);

    return (
        <div >
            {/* Mobile Trigger */}
            <div className="fixed left-4 top-4 z-40 md:hidden">
                <SidebarTrigger />
            </div>

            {/* Sidebar */}
            <Sidebar>
                <SidebarHeader className="space-y-4 py-4">
                    <Link href="/">
                        <div className="flex items-center px-3">
                            <div className="flex items-center mb-3">
                                <div className="bg-gradient-to-r from-law-primary to-law-secondary p-2.5 rounded-xl shadow-md">
                                    <Scale className="h-5 w-5 text-white" />
                                </div>
                                <div className="ml-2 text-lg font-semibold text-primary">
                                    LawGPT
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="px-3">
                        <Button
                            onClick={createNewChat}
                            className="w-full justify-start bg-law-secondary text-black hover:bg-white"
                            variant="default"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            New Chat
                        </Button>
                    </div>

                    <div className="px-3">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <SidebarInput
                                placeholder="Search chats..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent className="px-3 py-2">
                    {isLoading ? (
                        <div className="flex flex-col gap-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="h-8 w-full animate-pulse rounded-md bg-muted"
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* Pinned Chats Section */}
                            {pinnedChats.length > 0 && (
                                <>
                                    <div className="mb-2 flex items-center px-2">
                                        <span className="text-xs font-semibold text-muted-foreground">
                                            PINNED CHATS
                                        </span>
                                    </div>
                                    <SidebarMenu>
                                        {pinnedChats.map((chat) => (
                                            <ChatItem
                                                key={chat.id}
                                                chat={chat}
                                                isActive={pathname === `/chat/${chat.id}`}
                                                onDelete={(e) => deleteChat(chat.id, e)}
                                            />
                                        ))}
                                    </SidebarMenu>
                                    <SidebarSeparator className="my-4" />
                                </>
                            )}

                            {/* Regular Chats Section */}
                            <div className="mb-2 flex items-center px-2">
                                <span className="text-xs font-semibold text-muted-foreground">
                                    RECENT CHATS
                                </span>
                            </div>
                            <SidebarMenu>
                                {regularChats.length > 0 ? (
                                    regularChats.map((chat) => (
                                        <ChatItem
                                            key={chat.id}
                                            chat={chat}
                                            isActive={pathname === `/chat/${chat.id}`}
                                            onDelete={(e) => deleteChat(chat.id, e)}
                                        />
                                    ))
                                ) : (
                                    <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                                        No chats found
                                    </div>
                                )}
                            </SidebarMenu>
                        </>
                    )}
                </SidebarContent>

                <SidebarFooter>
                    <SidebarSeparator />
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="mr-2 h-8 w-8">
                                    <UserButton />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{user?.fullName}</p>
                                    <p className="text-xs text-muted-foreground">{user?.emailAddresses[0].emailAddress}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarFooter>
            </Sidebar>
        </div >
    );
}

// Chat Item component for cleaner rendering
function ChatItem({ chat, isActive, onDelete }: {
    chat: Chat;
    isActive: boolean;
    onDelete: (e: React.MouseEvent) => void;
}) {
    return (
        <SidebarMenuItem>
            <Link href={`/chat/${chat.id}`} className="w-full">
                <SidebarMenuButton
                    isActive={isActive}
                    className="flex justify-between"
                >
                    <div className="flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span className="truncate">{chat.title}</span>
                    </div>
                    <div className="flex items-center">
                        {chat.unread && (
                            <Badge variant="default" className="ml-2 h-1.5 w-1.5 rounded-full p-0" />
                        )}
                        <span className="ml-2 text-xs text-muted-foreground">
                            {format(chat.updatedAt, "MM/dd")}
                        </span>
                    </div>
                </SidebarMenuButton>
            </Link>
            <SidebarMenuAction
                onClick={onDelete}
                showOnHover
            >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Trash2 className="h-4 w-4 bg-white" />
                    </TooltipTrigger>
                    <TooltipContent>Delete Chat</TooltipContent>
                </Tooltip>
            </SidebarMenuAction>
        </SidebarMenuItem>
    );
}