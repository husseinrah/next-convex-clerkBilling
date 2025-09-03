---
applyTo: "**/*.{ts,tsx,js,jsx,md,json}"
---

# Next.js + Convex + Clerk Billing Starter Kit - Development Guidelines

## 🎯 Project Overview

This is a production-ready SaaS starter template that demonstrates modern full-stack development patterns with real-time capabilities, authentication, and billing integration.

### Core Technologies

- **Next.js 15**: App Router, Server Components, TypeScript
- **Convex**: Real-time backend, serverless functions, reactive queries
- **Clerk**: Authentication, user management, webhooks
- **shadcn/ui**: Modern component library with Tailwind CSS
- **OpenAI**: AI chat functionality
- **Resend**: Transactional email delivery

## 🏗️ Architecture Patterns

### Provider Hierarchy

The application uses a nested provider pattern for global state:

```tsx
<ClerkProvider>
  <ConvexClientProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </ConvexClientProvider>
</ClerkProvider>
```

### Route Protection Strategy

- Public routes: Landing page, auth pages
- Protected routes: `/dashboard/*` (requires authentication)
- Payment-gated routes: `/dashboard/payment-gated/*` (requires active subscription)

### Data Flow Architecture

1. **Authentication**: Clerk handles auth, syncs to Convex via webhooks
2. **Real-time Data**: Convex provides reactive queries and mutations
3. **Billing**: Payment webhooks update Convex database
4. **UI State**: React state + Convex subscriptions

## 🔧 Development Standards

### TypeScript Configuration

- Strict mode enabled for type safety
- Path aliases configured for clean imports (`@/components`, `@/lib`)
- Proper typing for Convex functions and React components

### Code Organization

```
src/
├── app/                 # Next.js pages and API routes
│   ├── (auth)/         # Authentication pages
│   ├── dashboard/      # Protected application area
│   └── api/           # API endpoints
├── components/         # Reusable React components
│   ├── ui/            # Base shadcn/ui components
│   ├── providers/     # Context providers
│   └── [feature]/     # Feature-specific components
├── convex/            # Backend functions and schema
├── lib/               # Utility functions
└── hooks/             # Custom React hooks
```

### Naming Conventions

- **Files**: kebab-case for pages, PascalCase for components
- **Functions**: camelCase with descriptive names
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase with descriptive suffixes

## 🗃️ Database Schema Design

### Core Tables

```typescript
// users: Links Clerk authentication to application data
{
  name: string,           // Full name from Clerk
  externalId: string,     // Clerk user ID (indexed)
}

// paymentAttempts: Comprehensive billing tracking
{
  payment_id: string,           // Unique payment identifier
  status: string,               // Payment status
  payer: { user_id, email },   // Customer information
  subscription_items: [...],    // Plan details
  totals: { grand_total },     // Payment amounts
  userId?: Id<"users">,        // Link to users table
}
```

### Index Strategy

- Index frequently queried fields (`byExternalId`, `byPaymentId`)
- Use compound indexes for complex queries
- Consider query patterns when designing indexes

## 🔐 Authentication Patterns

### User Session Management

```typescript
// Standard pattern for getting current user
export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  return await userByExternalId(ctx, identity.subject);
}

// For operations requiring authentication
export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const user = await getCurrentUser(ctx);
  if (!user) throw new Error("Authentication required");
  return user;
}
```

### Webhook Synchronization

- Clerk webhooks sync user data to Convex
- Payment webhooks update billing status
- Use `internalMutation` for webhook handlers to ensure security

## 💰 Billing Integration Patterns

### Payment Processing Flow

1. User initiates payment through billing provider
2. Webhook receives payment status updates
3. `savePaymentAttempt` function processes and stores data
4. UI reflects payment status in real-time via Convex subscriptions

### Subscription Status Checking

```typescript
// Query user's active subscriptions
export const getUserSubscriptions = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    return await ctx.db
      .query("paymentAttempts")
      .withIndex("byUserId", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("status"), "paid"))
      .collect();
  },
});
```

## 🎨 UI Development Guidelines

### Component Composition

Build complex interfaces by composing simpler components:

```tsx
// Good: Composable, reusable
<Card>
  <CardHeader>
    <CardTitle>Dashboard</CardTitle>
  </CardHeader>
  <CardContent>
    <DataTable data={tableData} />
  </CardContent>
</Card>

// Better: Extract into feature component
<DashboardOverview data={dashboardData} />
```

### Responsive Design Patterns

- Mobile-first approach with Tailwind breakpoints
- Use CSS Grid and Flexbox for layouts
- Test across device sizes and orientations

### Theme Support

- Support both light and dark modes
- Use CSS custom properties for theme-aware colors
- Test all components in both themes

## 🤖 AI Integration Best Practices

### Chat Implementation

```typescript
// Frontend: Use AI SDK for streaming responses
const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: "/api/chat",
  onFinish: (message) => {
    // Handle completion
  },
});

// Backend: Stream responses with error handling
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai("gpt-4o"),
      messages,
      onFinish: async (result) => {
        // Send notifications, log interactions
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    return new Response("Error processing chat", { status: 500 });
  }
}
```

## 📧 Email System Architecture

### Template Management

- Use React Email for consistent styling
- Store templates in `convex/emails/`
- Support both HTML and plain text versions

### Delivery Pipeline

```typescript
// Convex action for sending emails
export const sendEmail = internalAction({
  args: { to: v.string(), subject: v.string(), template: v.string() },
  handler: async (ctx, { to, subject, template }) => {
    // Render template and send via Resend
  },
});
```

## 🔄 State Management Strategy

### Server State (Convex)

- Use Convex queries for server data
- Leverage real-time subscriptions for live updates
- Handle loading and error states consistently

### Client State (React)

- Use React state for UI-only state
- Prefer controlled components for forms
- Use context sparingly for truly global state

### Data Fetching Patterns

```tsx
function MyComponent() {
  const data = useQuery(api.myModule.getData);
  const updateData = useMutation(api.myModule.updateData);

  if (data === undefined) return <Skeleton />;
  if (data === null) return <EmptyState />;

  return <DataDisplay data={data} onUpdate={updateData} />;
}
```

## 🚀 Performance Optimization

### Code Splitting

- Use dynamic imports for heavy components
- Implement route-based code splitting
- Lazy load non-critical features

### Database Optimization

- Use appropriate indexes for query patterns
- Batch operations when possible
- Implement pagination for large datasets

### Caching Strategy

- Leverage Convex's built-in caching
- Use React.memo for expensive components
- Implement proper cache invalidation

## 🧪 Testing Approach

### Component Testing

```typescript
// Test user interactions
test('user can submit form', async () => {
  render(<MyForm />);

  await user.type(screen.getByLabelText('Name'), 'John Doe');
  await user.click(screen.getByRole('button', { name: 'Submit' }));

  expect(screen.getByText('Success!')).toBeInTheDocument();
});
```

### Integration Testing

- Test complete user workflows
- Mock external services (Clerk, OpenAI, Resend)
- Verify real-time updates work correctly

## 🛡️ Security Considerations

### Input Validation

- Use Convex validators for all function arguments
- Sanitize user input on both client and server
- Implement proper error handling without exposing internals

### Authentication & Authorization

- Always verify user authentication in mutations
- Implement proper role-based access control
- Use Clerk's built-in security features

### Data Protection

- Never expose sensitive data in client queries
- Use internal functions for sensitive operations
- Implement proper audit logging

## 📦 Deployment Guidelines

### Environment Configuration

```bash
# Required environment variables
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
OPENAI_API_KEY=
RESEND_API_KEY=
```

### Build Optimization

- Optimize bundle size with proper imports
- Use environment-specific configurations
- Implement proper error monitoring

### Monitoring & Observability

- Set up error tracking (Sentry, etc.)
- Monitor performance metrics
- Implement proper logging for debugging

## 🔄 Maintenance Workflows

### Adding New Features

1. Design database schema changes
2. Implement Convex functions
3. Build React components
4. Add proper routing and protection
5. Write tests and documentation

### Dependency Updates

- Regular security updates
- Test thoroughly after major version updates
- Update type definitions accordingly

### Database Migrations

- Plan schema changes carefully
- Test migration scripts thoroughly
- Implement backwards compatibility when possible

This starter kit provides a solid foundation for building modern SaaS applications with real-time capabilities, secure authentication, and integrated billing. Follow these guidelines to maintain code quality and ensure scalable architecture as your application grows.
