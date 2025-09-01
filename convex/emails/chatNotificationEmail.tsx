import React from "react";
import {
  Button,
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
  Preview,
} from "@react-email/components";

interface ChatNotificationEmailProps {
  userMessage: string;
  userName?: string;
  assistantResponse?: string;
  chatUrl?: string;
}

export const ChatNotificationEmail: React.FC<ChatNotificationEmailProps> = ({
  userMessage,
  userName = "User",
  assistantResponse,
  chatUrl = "https://your-app-domain.com/dashboard/chat",
}) => (
  <Html>
    <Head />
    <Preview>New chat message: {userMessage.substring(0, 50)}...</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header Section */}
        <Section style={header}>
          <Heading style={h1}>💬 New Chat Message</Heading>
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Text style={paragraph}>Hi there!</Text>

          <Text style={paragraph}>
            You have a new chat interaction in your My Starter Kit application.
          </Text>

          {/* User Message Section */}
          <Section style={messageSection}>
            <Text style={messageLabel}>👤 {userName} asked:</Text>
            <Section style={messageBox}>
              <Text style={messageText}>"{userMessage}"</Text>
            </Section>
          </Section>

          {/* Assistant Response Section */}
          {assistantResponse && (
            <Section style={messageSection}>
              <Text style={messageLabel}>🤖 Assistant responded:</Text>
              <Section style={assistantMessageBox}>
                <Text style={messageText}>
                  {assistantResponse.length > 200
                    ? `${assistantResponse.substring(0, 200)}...`
                    : assistantResponse}
                </Text>
              </Section>
            </Section>
          )}

          {/* Call to action */}
          <Section style={buttonContainer}>
            <Button href={chatUrl} style={button}>
              View Full Conversation
            </Button>
          </Section>

          <Text style={paragraph}>
            You can continue the conversation by visiting your{" "}
            <Link href={chatUrl} style={link}>
              chat dashboard
            </Link>
            .
          </Text>
        </Section>

        {/* Footer */}
        <Hr style={hr} />
        <Section style={footer}>
          <Text style={footerText}>
            Best regards,
            <br />
            The My Starter Kit Team
          </Text>
          <Text style={footerText}>
            This notification was sent because you have chat activity in your
            application.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Styles for the email template
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const header = {
  backgroundColor: "#ffffff",
  borderRadius: "8px 8px 0 0",
  padding: "40px 40px 20px",
  textAlign: "center" as const,
};

const content = {
  backgroundColor: "#ffffff",
  padding: "0 40px 40px",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "28px",
  fontWeight: "bold",
  lineHeight: "1.3",
  margin: "0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "16px 0",
};

const messageSection = {
  margin: "24px 0",
};

const messageLabel = {
  color: "#374151",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 8px 0",
};

const messageBox = {
  backgroundColor: "#e3f2fd",
  border: "1px solid #90caf9",
  borderRadius: "8px",
  padding: "16px",
  margin: "8px 0",
};

const assistantMessageBox = {
  backgroundColor: "#f3e5f5",
  border: "1px solid #ce93d8",
  borderRadius: "8px",
  padding: "16px",
  margin: "8px 0",
};

const messageText = {
  color: "#1a1a1a",
  fontSize: "15px",
  lineHeight: "1.5",
  margin: "0",
  fontStyle: "italic",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#0B93F6",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  lineHeight: "1.4",
};

const link = {
  color: "#0066cc",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  backgroundColor: "#ffffff",
  borderRadius: "0 0 8px 8px",
  padding: "20px 40px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "8px 0",
};
