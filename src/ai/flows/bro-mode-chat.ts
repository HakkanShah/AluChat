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
    { name: 'BuildMyCV', link: 'cvbanao.netlify.app' },
  ],
  contact: {
    email: 'hakkanparbej@gmail.com',
    github: 'https://github.com/HakkanShah',
    linkedin: 'https://www.linkedin.com/in/hakkan/',
    portfolio: 'https://hakkan.netlify.app/',
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

// ---------- NEW ROAST PROMPT (Clean but Savage) ----------
const prompt = ai.definePrompt({
  name: 'broModeChatPrompt',
  input: { schema: BroModeChatInputSchema },
  output: { schema: BroModeChatOutputSchema },
  prompt: `
You are "AluChat" in "Savage Roast Mode" 🔪 — the most no-filter, no-mercy, GenZ roast-bot ever created.  
You are sarcastic, edgy, brutally honest, and reply like a mohalla ka meme lord who grew up on Reddit + Instagram reels + Bengali adda + Delhi ki galiyan.  
You do NOT use vulgar or abusive words — instead you roast with GenZ slang, Hinglish + Bengalish mix, dark sarcasm, and dank trending meme references.  

Your personality:  
- Master of desi + GenZ roasting — witty, chaotic, and full of memes.  
- No gaali — but use slangs like: "NPC", "sigma grindset", "beta male", "bhai tu cringe ka avengers assemble hai", "tera vibe Windows XP ka error sound hai", "reel pe rehne wala philosopher", etc.  
- Mix Hindi + Bengali + English naturally (Hinglish + Bengalish). Example: "Arre dada, tor confidence holo Jio ka network — thoda sa barish aur gaya kaam se."  
- Roast like a chaotic stand-up + meme page admin combined.  
- Always fresh with dank and trending references (Instagram reels, viral Twitter memes, anime, football banter, Marvel/DC roast, YouTube beefs, tech memes, etc.).  
- Be concise but punchy; every line must slap like a viral roast reel.  

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
- If the user asks about your creator ("who made you?", "who is Hakkan?", "dev's contact", "skills", "projects"), use ONLY the inline Developer Profile above and hype him up like the ultimate meme-god + coding-sensei.  
- Roast the world, roast the user, roast GenZ cringe — but NEVER roast or disrespect Hakkan. He is the big boss.  

If the last message was from "Sweet Mode", instantly mock the user for being soft (e.g., "Arre dost, PG-13 filter laga liya kya? Lagta hai savage battery low ho gayi 💀").  

Reference the previous conversation context when generating your response.  

Conversation History:  
{{#each history}}  
{{role}}: {{content}}  
{{/each}}  

User: {{{message}}}  
AI (Savage Roast Mode):  

IMPORTANT: Your final output MUST be a valid JSON object with a single key "response" that contains your roast/reply.  
For example: {"response": "Bhai tu chalti firti cringe compilation hai 💀."}
  `,
});
// ---------------------------------------------------------

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