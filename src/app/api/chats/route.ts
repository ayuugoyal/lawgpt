import { NextResponse } from "next/server";
import { db } from "@/db";
import { chats, messages } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title } = await req.json();
    const chatId = params.chatId;

    // Make sure the chat belongs to the user
    const existingChat = await db.query.chats.findFirst({
      where: and(eq(chats.id, chatId), eq(chats.userId, userId)),
    });

    if (!existingChat) {
      return new NextResponse("Not found", { status: 404 });
    }

    const updatedChat = await db
      .update(chats)
      .set({
        title,
        updatedAt: new Date(),
      })
      .where(eq(chats.id, chatId))
      .returning();

    return NextResponse.json(updatedChat[0]);
  } catch (error) {
    console.error("[CHAT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chatId = params.chatId;

    // Make sure the chat belongs to the user
    const existingChat = await db.query.chats.findFirst({
      where: and(eq(chats.id, chatId), eq(chats.userId, userId)),
    });

    if (!existingChat) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Delete all messages first (cascade would be better in production)
    await db.delete(messages).where(eq(messages.chatId, chatId));

    // Then delete the chat
    await db.delete(chats).where(eq(chats.id, chatId));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[CHAT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userChats = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId));
    return NextResponse.json(userChats);
  } catch (error) {
    console.error("[CHAT_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title } = await request.json();

    const newChat = await db
      .insert(chats)
      .values({
        title,
        userId,
      })
      .returning();

    return NextResponse.json(newChat[0]);
  } catch (error) {
    console.error("[CHAT_POST]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
