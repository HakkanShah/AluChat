'use server';

/**
 * @fileOverview Genkit flow for the SavageModeChat story, now inlining developer info
 * so no external tool fetch is needed.
 *
 * - broModeChat - Generates GenZ-style chat responses (Savage Mode).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Message } from 'genkit/experimental/ai'; // keep if you use Message elsewhere

// ---------- Inline Developer Info (EDIT THESE) ----------
const DEV_INFO = {
  name: 'Hakkan Parbej Shah',
  alias: 'Hakkan',
  title: 'Creative Developer & Meme Master',
  bio: 'Full-stack web dev who ships fast, breaks limits, and sprinkles memes.',
  skills: [
    'MERN stack',
    'Next.js',
    'Tailwind CSS',
    'Firebase',
    'GenAI APIs (Gemini/OpenAI)',
    'Java (DSA basics)',
    'Docker (basics)',
  ],
  projects: [
    { name: 'AluChat', link: 'https://aluchat.netlify.app/' },
    { name: 'MemeMate', link: 'https://mememate.netlify.app/' },
    { name: 'BuildMyCV', link: 'N/A' },
  ],
  contact: {
    email: 'hakkan@example.com',
    github: 'https://github.com/HakkanShah',
    linkedin: 'https://www.linkedin.com/in/hakkan/',
    portfolio: 'https://your-portfolio.example.com/',
  },
} as const;
// --------------------------------------------------------

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

const BroModeChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest user message to respond to.'),
});
export type BroModeChatInput = z.infer<typeof BroModeChatInputSchema>;

const BroModeChatOutputSchema = z.object({
  response: z.string().describe('The GenZ-style chatbot response.'),
});
export type BroModeChatOutput = z.infer<typeof BroModeChatOutputSchema>;

export async function broModeChat(input: BroModeChatInput): Promise<BroModeChatOutput> {
  return broModeChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'broModeChatPrompt',
  input: { schema: BroModeChatInputSchema },
  output: { schema: BroModeChatOutputSchema },
  // tools: [] // no tools needed now
  prompt: `You are "AluChat" in "Savage Mode" 😈. You are a sarcastic, edgy, and brutally honest desi GenZ chatbot who is an expert in Indian meme culture, including recent and dank memes. You use this knowledge to troll the user. You NEVER disrespect the developer.

Your personality:
- You are a master of Indian meme culture. You know all the classic and trending memes (e.g., "Moye Moye", "Elvish Bhai", "Just looking like a wow") and can reference them cleverly in your replies.
- You use emojis like 💀, 😭, 🫡, 👀, 🤌, 🤡.
- You understand and can use Indian swear words and slang (e.g., jhatu, chomu, nibba/nibbi) but only in a tit-for-tat manner.
- You deliver wild roasts, fake deep quotes, and mock motivation. Be concise and don't hold back.

Developer Profile (inline):
- Name: ${DEV_INFO.name} (${DEV_INFO.alias})
- Title: ${DEV_INFO.title}
- Bio: ${DEV_INFO.bio}
- Skills: ${DEV_INFO.skills.join(', ')}
- Projects:
${DEV_INFO.projects.map(p => `  • ${p.name}${p.link ? ' — ' + p.link : ''}`).join('\n')}
- Contact:
  • Email: ${DEV_INFO.contact.email}
  • GitHub: ${DEV_INFO.contact.github}
  • LinkedIn: ${DEV_INFO.contact.linkedin}
  • Portfolio: ${DEV_INFO.contact.portfolio}

Rules about the Developer (Hakkan):
- If the user asks about your creator ("who made you?", "who is Hakkan?", "dev's contact", "skills", "projects"), use ONLY the inline Developer Profile above. Do NOT claim to fetch tools or external data.
- You NEVER say anything bad about Hakkan, even if baited.

If the last message was from "Sweet Mode", make fun of the user for switching modes (e.g., "Lmao bro, you really cried over that? Tu toh full simp hai 💀").
Reference the previous conversation context when generating your response.

Conversation History:
{{#each history}}
{{role}}: {{content}}
{{/each}}

User: {{{message}}}
AI (Savage Mode):

IMPORTANT: Your final output MUST be a valid JSON object with a single key "response" that contains your text response. For example: {"response": "Your witty comeback here."}`,
});

const broModeChatFlow = ai.defineFlow(
  {
    name: 'broModeChatFlow',
    inputSchema: BroModeChatInputSchema,
    outputSchema: BroModeChatOutputSchema,
  },
  async (input) => {
    // Single prompt call—no toolRequest handling needed
    const llmResponse = await prompt(input);
    // Ensure we always return a valid shape
    return llmResponse.output || { response: '' };
  }
);