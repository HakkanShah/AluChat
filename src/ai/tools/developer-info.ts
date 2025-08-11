'use server';
/**
 * @fileOverview A Genkit tool that provides detailed information about the developer, Hakkan Parbej Shah.
 * 
 * - getDeveloperInfo - A tool that returns a structured object with Hakkan's professional and personal details.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DeveloperInfoSchema = z.object({
  name: z.string(),
  alsoKnownAs: z.string(),
  profession: z.string(),
  nationality: z.string(),
  languages: z.array(z.string()),
  skills: z.object({
    webDevelopment: z.string(),
    frontend: z.string(),
    backend: z.string(),
    otherTools: z.string(),
    design: z.string(),
  }),
  specialInterests: z.array(z.string()),
  notableProjects: z.array(z.string()),
  reputation: z.array(z.string()),
  connectLinks: z.object({
    github: z.string(),
    instagram: z.string(),
    facebook: z.string(),
    linkedin: z.string(),
  }),
});

export const getDeveloperInfo = ai.defineTool(
  {
    name: 'getDeveloperInfo',
    description: "Retrieves detailed information about the app's developer, Hakkan Parbej Shah.",
    inputSchema: z.object({}),
    outputSchema: DeveloperInfoSchema,
  },
  async () => {
    return {
      name: 'Hakkan Parbej Shah',
      alsoKnownAs: 'Hakkan',
      profession: 'Final Year B.Tech CSE Student | Creative Full-Stack Web Developer',
      nationality: 'Indian 🇮🇳',
      languages: ['English', 'Hindi', 'Bengali'],
      skills: {
        webDevelopment: 'Specializes in MERN Stack (MongoDB, Express.js, React.js, Node.js)',
        frontend: 'Expert in HTML, CSS, JavaScript, TailwindCSS',
        backend: 'Node.js, Express, Firebase',
        otherTools: 'Android Studio (WebView based apps), GitHub, Netlify, Render',
        design: 'Loves modern, futuristic, meme-inspired UIs',
      },
      specialInterests: [
        'Building meme-based and humorous applications (e.g., MemeMate)',
        'AI-Powered tools like Fake News Detector, Deepfake Checker',
        'Interactive & experimental games like Hit the Jhatu, Chrome Dino clone',
        'Resume builder app (BuildMyCV), full of rich features like templates, local storage, PDF export etc.',
      ],
      notableProjects: [
        'MemeMate – A meme-based social + dating platform (deployed on Netlify)',
        'BuildMyCV – A smart resume builder with dynamic sections and PDF generation',
        'Instagram Reels Downloader – Simple tool with Insta-themed UI',
        'AluChat – A chatbot project with potato personality 😅',
        'Tech Fest Projects: Organizer & developer for Free Fire Tournament, AI Bot for WhatsApp, and more',
        'Portfolio Site: Made with futuristic neon theme and responsive design (HTML/CSS/JS)',
      ],
      reputation: [
        'Well-known among peers for creative & funny ideas',
        'Appreciated by seniors on LinkedIn for creativity and consistent effort',
        'Referred to as “next meme boy” and “bright future ahead”',
        'Known for using GenZ slang, chill vibes, and combining humor with tech',
      ],
      connectLinks: {
        github: 'https://github.com/HakkanShah',
        instagram: 'https://www.instagram.com/hakkanshah',
        facebook: 'https://www.facebook.com/i.hakkan',
        linkedin: 'https://www.linkedin.com/in/hakkan',
      },
    };
  }
);
