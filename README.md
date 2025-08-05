
# AluChat 🥔

AluChat is a dual-personality AI chatbot built with Next.js and Google Gemini. Inspired by the versatility of a potato ("alu"), it can switch between a helpful "Good Bro" and a sarcastic "Bad Bro," offering a unique and engaging conversational experience.

This project was created by **Hakkan Parbej Shah**.

[![AluChat Demo](/public/images/aluchat_banner.png)]()

## ✨ Features

- **Dual Personalities**: Seamlessly switch between two distinct chat modes:
  - **😇 Good Bro**: A friendly, respectful, and helpful AI that provides supportive answers and useful external links.
  - **😈 Bad Bro**: An edgy, sarcastic, and brutally honest AI that delivers witty roasts and humorous commentary, complete with GenZ slang.
- **Dynamic UI**: The app's theme (colors, fonts, and backgrounds) changes dynamically when switching between modes.
- **User Authentication**: A simple, mock authentication system for user login and signup.
- **Customizable Profiles**: Users can upload and change their profile pictures.
- **Interactive Experience**: Features include a first-time user tutorial, sound effects for messages, and funny easter eggs based on trigger words.
- **Responsive Design**: A clean, modern UI that works flawlessly on both desktop and mobile devices.
- **Web Share API**: Easily share the app with friends using the native share dialog or by copying a link to the clipboard.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **AI Engine**: [Google Gemini](https://deepmind.google/technologies/gemini/) via [Genkit](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **State Management**: React Hooks & Context API

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- An npm package manager (like `npm`, `yarn`, or `pnpm`)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/HakkanShah/AluChat.git
    cd AluChat
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Create a `.env` file in the root of the project.
    - Get a Google AI API Key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    - Add the API key to your `.env` file:
      ```
      GEMINI_API_KEY="YOUR_API_KEY_HERE"
      ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## 🧑‍💻 Creator

This project was conceived, designed, and developed by **Hakkan Parbej Shah**.

- **GitHub**: [@HakkanShah](https://github.com/HakkanShah)
- **LinkedIn**: [Hakkan Parbej Shah](https://www.linkedin.com/in/hakkan)
- **Instagram**: [@hakkanshah](https://www.instagram.com/hakkanshah)
- **Facebook**: [Hakkan](https://www.facebook.com/i.hakkan)
