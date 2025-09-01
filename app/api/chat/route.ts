import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Get the latest user message for email notification
  const userMessages = messages.filter((msg: any) => msg.role === "user");
  const latestUserMessage = userMessages[userMessages.length - 1];

  const result = streamText({
    model: openai("gpt-4o"),
    messages,

    onFinish: async (finishResult) => {
      // Send email notification after AI response is complete
      if (latestUserMessage && finishResult.text) {
        try {
          await convex.action(api.emailTemplates.sendChatNotificationEmail, {
            userMessage: latestUserMessage.content,
            userName: "Chat User", // You can get this from auth context
            assistantResponse: finishResult.text,
            userEmail: "milanhenn09@gmail.com", // You can get this from auth context
          });
        } catch (error) {
          console.error("Failed to send chat notification email:", error);
          // Don't fail the chat response if email fails
        }
      }
    },
  });

  return result.toTextStreamResponse();
}
