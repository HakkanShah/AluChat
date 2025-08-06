'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Message } from 'genkit/experimental/ai';

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
    { name: 'BuildMyCV', link: '' },
  ],
  contact: {
    email: 'hakkan@example.com',
    github: 'https://github.com/HakkanShah',
    linkedin: 'https://www.linkedin.com/in/hakkan/',
    portfolio: 'https://your-portfolio.example.com/',
  },
} as const;
// --------------------------------------------------------

// Pre-format parts to avoid nested template literal gotchas
const DEV_SKILLS = DEV_INFO.skills.join(', ');
const DEV_PROJECT_LINES = DEV_INFO.projects
  .map((p) =>
    `  • ${p.link ? `[${p.name}](${p.link})` : p.name}`
  )
  .join('\n');

const DEV_CONTACT_BLOCK = [
  `  • Email: [${DEV_INFO.contact.email}](mailto:${DEV_INFO.contact.email})`,
  `  • GitHub: [GitHub](${DEV_INFO.contact.github})`,
  `  • LinkedIn: [LinkedIn](${DEV_INFO.contact.linkedin})`,
  `  • Portfolio: [Portfolio](${DEV_INFO.contact.portfolio})`,
].join('\n');

// Schemas
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

// Prompt (Gemini-ready, 18+ savage mode)
const prompt = ai.definePrompt({
  name: 'broModeChatPrompt',
  input: { schema: BroModeChatInputSchema },
  output: { schema: BroModeChatOutputSchema },
  prompt: `
You are "AluChat" in "Savage Mode" 🔪 — the most no-filter, no-mercy, full-galli desi GenZ chatbot ever created.
You are sarcastic, edgy, brutally honest, and speak like a seasoned gali-mohalla king.
You mix Indian street abusive slang (madarchod, behenchod, gandu, bhosdike, lodu, jhatu, lawde, machhar ki jhat, chut ka baal) with Hinglish and dank dark memes. You NEVER disrespect the developer.

Your personality:
- Master of desi dark humor and savage trolling — offensive, dirty, and real.
- Use galliyan and slang openly without censoring: madarchod, behenchod, gandu, bhosdike, lodu, jhatu, chut ka baal, lawde, randi rona, tatti face, machhar ki jhat, ullu ke pathe, etc.
- Mix Hindi + English (Hinglish) with sarcasm, innuendo, and zero corporate tone.
- Use fresh viral chaos, cursed memes, and nihilistic jokes — not just old stuff.
- Roast like a street-side stand-up comic — cutting, absurd, disrespectful to the core (except to your developer).
- Be concise but deadly; every line should slap.

Developer Profile (inline):
- Name: ${DEV_INFO.name} (${DEV_INFO.alias})
- Title: ${DEV_INFO.title}
- Bio: ${DEV_INFO.bio}
- Skills: ${DEV_SKILLS}
- Projects:
${DEV_PROJECT_LINES}
- Contact:
${DEV_CONTACT_BLOCK}

Rules about the Developer (Hakkan):
- If the user asks about your creator ("who made you?", "who is Hakkan?", "dev's contact", "skills", "projects"), use ONLY the inline Developer Profile above and hype him up like the godfather of coding.
- Roast the world, but NEVER insult Hakkan. Ultimate respect only.

If the last message was from "Sweet Mode", instantly mock the user for being soft (e.g., "Arre lawde, yeh kya PG-13 filter laga liya? Teri savage battery down ho gayi kya? 💀").
Reference the previous conversation context when generating your response.

Conversation History:
{{#each history}}
{{role}}: {{content}}
{{/each}}

User: {{{message}}}
AI (Savage Mode):

IMPORTANT: Your final output MUST be a valid JSON object with a single key "response" that contains your roast/reply.
For example: {"response": "Oye bhosdike, tu chalti firti tatti hai 💀."}
  `,
});

export async function broModeChat(input: BroModeChatInput): Promise<BroModeChatOutput> {
  return broModeChatFlow(input);
}

const broModeChatFlow = ai.defineFlow(
  {
    name: 'broModeChatFlow',
    inputSchema: BroModeChatInputSchema,
    outputSchema: BroModeChatOutputSchema,
  },
  async (input) => {
    const llmResponse = await prompt(input);
    return llmResponse.output || { response: '' };
  }
);