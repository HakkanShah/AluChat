import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/providers/auth-provider';

export const metadata: Metadata = {
  title: 'AluChat - Dual Personality AI Chatbot',
  description:
    'AluChat is a dual personality AI chatbot. Switch between Sweet Mode (friendly) and Savage Mode (sarcastic & bakchodi). Built with Next.js, Tailwind, and Google Gemini.',
  keywords: [
    "AluChat",
    "AI chatbot",
    "dual personality chatbot",
    "sarcastic AI",
    "funny chatbot",
    "Google Gemini chatbot",
    "Next.js chatbot",
    "sweet mode chatbot",
    "savage chatbot",
    "Indian meme chatbot",
    "alu chat",
    "bakchodi AI",
    "bakchod AI chatbot",
    "backchodi",
    "bakchod bot",
    "meme chatbot",
    "Gen Z chatbot",
    "sarcastic AI in Hindi",
    "AI roast bot",
  ],
  authors: [{ name: "Hakkan Shah", url: "https://github.com/HakkanShah" }],
  openGraph: {
    title: "AluChat - Dual Personality AI Chatbot",
    description:
      "Chat in Sweet Mode 🤖 or Savage Mode 😈 with AluChat — the funny, sarcastic, meme-friendly AI chatbot.",
    url: "https://aluchat.netlify.app",
    siteName: "AluChat",
    images: [
      {
        url: "/preview.png", // keep a 1200x630 preview image in /public
        width: 1200,
        height: 630,
        alt: "AluChat Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AluChat - Savage & Sweet AI Chatbot",
    description:
      "AluChat is your funny AI companion — Sweet when you want, savage when you don’t 😎. Perfect for memes & bakchodi!",
    images: ["/preview.png"],
    creator: "@your_twitter_handle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Comic+Neue:wght@400;700&family=Chakra+Petch:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}