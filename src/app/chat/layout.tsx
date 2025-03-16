"use client";

import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-900">
        <ChatSidebar />
        {children}
      </div>
    </SidebarProvider>
  );
}