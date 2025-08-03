# AluChat on Firebase Studio

This is a Next.js starter project for an AI-powered chatbot called AluChat, built in Firebase Studio.

## Getting Started

To get started, take a look at `src/app/page.tsx`. The main chat logic is contained within the `src/components/chat/` directory, and the AI functionality is in `src/ai/`.

## Deploying to Other Platforms (e.g., Netlify, Vercel)

This application uses Genkit to connect to Google's AI models (Gemini), which requires an API key. To deploy this project outside of Firebase Studio, you will need to provide your own.

### Steps:

1.  **Get a Google AI API Key**:
    *   Visit [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Create a new API key in your Google Cloud project.

2.  **Set the Environment Variable**:
    *   In your hosting provider's dashboard (e.g., Netlify, Vercel), navigate to the environment variables settings for your project.
    *   Create a new environment variable named `GEMINI_API_KEY`.
    *   Paste the API key you generated in the previous step as the value.

Once the `GEMINI_API_KEY` is set, your deployed application will be able to connect to the AI backend and will work just like it does in Firebase Studio.
