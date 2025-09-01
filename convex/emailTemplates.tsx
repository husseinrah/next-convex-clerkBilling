// IMPORTANT: this is a Convex Node Action
"use node";
import React from "react";
import { action } from "./_generated/server";
import { render, pretty } from "@react-email/render";
import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { WelcomeEmail } from "./emails/welcomeEmail";
import { ChatNotificationEmail } from "./emails/chatNotificationEmail";
import { v } from "convex/values";

export const resend: Resend = new Resend(components.resend, {
  testMode: false,
});

export const sendEmail = action({
  args: {},
  handler: async (ctx, args) => {
    // Generate the HTML from the professional email template
    const html = await pretty(await render(<WelcomeEmail />));

    // Send the email
    await resend.sendEmail(ctx, {
      from: "My Starter Kit <onboarding@resend.dev>",
      to: "milanhenn09@gmail.com",
      subject: "Welcome to My Starter Kit! 🚀",
      html,
    });
  },
});

export const sendChatNotificationEmail = action({
  args: {
    userMessage: v.string(),
    userName: v.optional(v.string()),
    assistantResponse: v.optional(v.string()),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    // Generate the HTML from the chat notification email template
    const html = await pretty(
      await render(
        <ChatNotificationEmail
          userMessage={args.userMessage}
          userName={args.userName}
          assistantResponse={args.assistantResponse}
          chatUrl="https://your-app-domain.com/dashboard/chat"
        />,
      ),
    );

    // Send the email
    await resend.sendEmail(ctx, {
      from: "My Starter Kit Chat <chat@resend.dev>",
      to: args.userEmail,
      subject: `💬 New chat message: ${args.userMessage.substring(0, 30)}...`,
      html,
    });
  },
});
