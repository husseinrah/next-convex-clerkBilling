import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
  Button,
} from "@react-email/components";

// Professional email template component
export const WelcomeEmail = () => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        {/* Header Section */}
        <Section style={header}>
          <Heading style={h1}>Welcome to My Starter Kit!</Heading>
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Text style={paragraph}>Hi there!</Text>

          <Text style={paragraph}>
            Thank you for trying out our starter kit! We're excited to have you
            on board. This email was sent from our Next.js application using
            Convex and Resend integration.
          </Text>

          <Text style={paragraph}>
            Here's what you can expect from our platform:
          </Text>

          {/* Feature list */}
          <Section style={features}>
            <Text style={featureItem}>
              ✨ Modern React components with TypeScript
            </Text>
            <Text style={featureItem}>🔐 Authentication with Clerk</Text>
            <Text style={featureItem}>💾 Real-time database with Convex</Text>
            <Text style={featureItem}>📧 Email integration with Resend</Text>
            <Text style={featureItem}>
              🎨 Beautiful UI with Tailwind CSS and SHADCN
            </Text>
          </Section>

          {/* Call to action */}
          <Section style={buttonContainer}>
            <Button href="https://your-app-domain.com/dashboard" style={button}>
              Get Started Now
            </Button>
          </Section>

          <Text style={paragraph}>
            Need help getting started? Check out our{" "}
            <Link href="https://github.com/your-repo" style={link}>
              documentation
            </Link>{" "}
            or reply to this email if you have any questions.
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

const features = {
  backgroundColor: "#f8fafc",
  borderRadius: "6px",
  padding: "20px",
  margin: "24px 0",
};

const featureItem = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "1.5",
  margin: "8px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#000000",
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
