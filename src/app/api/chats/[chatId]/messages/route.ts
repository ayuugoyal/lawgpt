// app/api/chats/[chatId]/messages/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { chats, messages } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { role, content } = await req.json();
    const chatId = params.chatId;

    const newMessage = await db
      .insert(messages)
      .values({
        chatId: chatId.toString(),
        role,
        content,
      })
      .returning();

    // Update chat's updatedAt timestamp
    await db
      .update(chats)
      .set({ updatedAt: new Date() })
      .where(eq(chats.id, chatId));

    return NextResponse.json(newMessage[0]);
  } catch (error) {
    console.error("[MESSAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chatId = params.chatId;
    console.log("chatId", chatId);

    const chatMessages = await db.query.messages.findMany({
      where: eq(messages.chatId, chatId.toString()),
      orderBy: (messages, { asc }) => [asc(messages.createdAt)],
    });

    return NextResponse.json(chatMessages);
  } catch (error) {
    console.error("[MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
