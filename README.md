# Next.js + Convex + Clerk Billing Starter Kit

A modern full-stack starter template with authentication, real-time database, and billing integration.

## 🚀 Features

- **Next.js 15** with App Router and TypeScript
- **Convex** for real-time backend and database
- **Clerk** for authentication and user management
- **Billing Integration** with payment processing
- **Modern UI** with Tailwind CSS and shadcn/ui components
- **Dashboard** with interactive charts and data tables
- **AI Chat** integration with OpenAI
- **Email** notifications with Resend

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Convex (real-time database & functions)
- **Authentication**: Clerk
- **UI Components**: shadcn/ui
- **Email**: Resend
- **AI**: OpenAI API

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Convex account
- A Clerk account
- An OpenAI API key (optional, for AI features)
- A Resend account (optional, for emails)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/husseinrah/next-convex-clerkBilling.git
   cd next-convex-clerkBilling
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

   Fill in your actual values in `.env.local`:
   - Get Convex keys from [convex.dev](https://convex.dev)
   - Get Clerk keys from [clerk.com](https://clerk.com)
   - Get OpenAI API key from [openai.com](https://openai.com)
   - Get Resend API key from [resend.com](https://resend.com)

4. **Set up Convex**

   ```bash
   npx convex dev
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Convex Setup

1. Create a new project at [convex.dev](https://convex.dev)
2. Run `npx convex dev` and follow the setup wizard
3. Your Convex URL will be automatically added to your environment

### Clerk Setup

1. Create a new application at [clerk.com](https://clerk.com)
2. Configure your sign-in/sign-up redirects to `/dashboard`
3. Add your Clerk keys to `.env.local`

### OpenAI Setup (Optional)

1. Get an API key from [openai.com](https://openai.com)
2. Add it to your `.env.local` for AI chat functionality

## 📁 Project Structure

```
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── providers/        # Context providers
├── convex/               # Convex backend functions
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This project can be deployed to any platform that supports Next.js, such as:

- Netlify
- Railway
- Render
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License

---

Made with ❤️
