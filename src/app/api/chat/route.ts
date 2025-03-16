import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { LangChainAdapter } from "ai";
import type { NextRequest } from "next/server";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are LawGPT, an AI legal assistant designed to provide information and guidance on legal matters.
Your responses should be:
- Professional and clear
- Based on legal principles and precedents
- Educational in nature
- Properly disclaiming that you're not providing legal advice
- Focused on providing general legal information

Always begin your responses with a brief summary of the key points, followed by more detailed information.
When discussing legal concepts, provide context and explain terminology.
If a question is outside your knowledge or requires specific legal advice, clarify your limitations.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    console.log('messages', messages);

    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      modelName: "gemini-1.5-pro",
      temperature: 0.3,
      maxOutputTokens: 2048,
    });

    const formattedMessages = messages.map((message: any) => {
      return {
        role: message.role === "user" ? "human" : "assistant",
        content: message.content,
      };
    });

    formattedMessages.unshift({
      role: "system",
      content: SYSTEM_PROMPT,
    });

    const stream = await model.stream(formattedMessages);

    return LangChainAdapter.toDataStreamResponse(stream);
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(
      JSON.stringify({
        error: "There was an error processing your request",
      }),
      { status: 500 }
    );
  }
}
