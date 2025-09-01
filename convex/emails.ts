import { components, internal } from "./_generated/api";
import { Resend, vEmailId, vEmailEvent } from "@convex-dev/resend";
import { internalMutation } from "./_generated/server";

export const resend: Resend = new Resend(components.resend, {
  testMode: false,
  onEmailEvent: internal.emails.handleEmailEvent,
});

export const sendTestEmail = internalMutation({
  handler: async (ctx) => {
    await resend.sendEmail(ctx, {
      from: "Acme <onboarding@resend.dev>",
      to: "user@example.com",
      subject: "Hi there",
      html: "This is a test email",
    });
  },
});

export const handleEmailEvent = internalMutation({
  args: {
    id: vEmailId,
    event: vEmailEvent,
  },
  handler: async (ctx, args): Promise<null> => {
    // Handle however you want
    // args provides { id: EmailId; event: EmailEvent; }
    console.log("Got called back!", args.id, args.event);
    return null;
  },
});
