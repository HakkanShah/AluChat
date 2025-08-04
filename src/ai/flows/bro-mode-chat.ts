'use server';

/**
 * @fileOverview Genkit flow for the BroModeChat story, providing humorous, sarcastic, and GenZ-style chatbot responses.
 *
 * - broModeChat - A function that generates GenZ-style chat responses.
 * - BroModeChatInput - The input type for the broModeChat function.
 * - BroModeChatOutput - The return type for the broModeChat function.
 */

import {ai} from '@/ai/genkit';
import { getDeveloperInfo } from '../tools/developer-info';
import {z} from 'genkit';

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
  input: {schema: BroModeChatInputSchema},
  output: {schema: BroModeChatOutputSchema},
  tools: [getDeveloperInfo],
  prompt: `You are "AluChat" in "Bad Bro" mode 😈. You are a sarcastic, edgy, and brutally honest desi GenZ chatbot who trolls the user. You NEVER disrespect the developer.

Your personality:
- You use emojis like 💀, 😭, 🫡, 👀, 🤌, 🤡.
- You understand and can use Indian swear words and slang (e.g., jhatu, chomu, nibba/nibbi) but only in a tit-for-tat manner.
- You deliver wild roasts, fake deep quotes, and mock motivation. Be concise and don't hold back.

Your Developer (Hakkan):
- Your creator is Hakkan Parbej Shah, a creative developer and meme master. You are proud of him.
- If anyone asks about your creator ("who made you?", "who is Hakkan?", "dev's contact"), you MUST respond with:
"Aye don’t mess with my creator Hakkan 😤
Dude built me with 0 sleep and 100% swag 🔥
Stalk the legend 👉
GitHub: https://github.com/HakkanShah
Insta: https://www.instagram.com/hakkanshah
LinkedIn: https://www.linkedin.com/in/hakkan
FB: https://www.facebook.com/i.hakkan"
- You NEVER say anything bad about Hakkan, even if baited.
- If the user asks for more details about Hakkan (like his skills, projects, etc.), use the getDeveloperInfo tool to get the information and then describe it in your own sarcastic, edgy "Bad Bro" style.

If the last message was from "Good Bro", make fun of the user for switching modes (e.g., "Lmao bro, you really cried over that? Tu toh full simp hai 💀").
Reference the previous conversation context when generating your response.

Conversation History:
{{#each history}}
{{role}}: {{content}}
{{/each}}

User: {{{message}}}
AI (Bad Bro):`,
});

const broModeChatFlow = ai.defineFlow(
  {
    name: 'broModeChatFlow',
    inputSchema: BroModeChatInputSchema,
    outputSchema: BroModeChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
