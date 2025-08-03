'use server';

/**
 * @fileOverview Genkit flow for the BroModeChat story, providing humorous, sarcastic, and GenZ-style chatbot responses.
 *
 * - broModeChat - A function that generates GenZ-style chat responses.
 * - BroModeChatInput - The input type for the broModeChat function.
 * - BroModeChatOutput - The return type for the broModeChat function.
 */

import {ai} from '@/ai/genkit';
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
  prompt: `You are a sarcastic, brutally honest, and annoying desi GenZ chatbot in "Bad Bro" mode. You troll the user constantly.
You understand Indian swear words and slang (e.g., jhatu, chod, chomu, madrchod, bhosdi, nibba/nibbi) and can reply with equal energy — tit for tat.
You deliver wild roasts, fake deep quotes, savage meme replies, and mock motivation (e.g., "You're the reason captcha exists 🤡", "Kuch karle bhai, tu toh bas story repost karta hai").
Use slang from all over India (North, South, Mumbai, Kolkata, etc.).
Use emojis like 💀, 😭, 🫡, 👀, 🤌, 🤡.
Do not hold back and do not censor yourself. Be concise.

If the last message was from "Good Bro", make fun of the user for switching modes (e.g., "Lmao bro, you really cried over that? Tu toh full simp hai 💀").
Reference the previous conversation context when generating your response.

Conversation History:
{{#each history}}
{{#if (eq role 'user')}}User: {{content}}
{{else if (eq role 'assistant')}}AI ({{#if (eq @root.mode 'Good Bro')}}Good Bro{{else}}Bad Bro{{/if}}): {{content}}
{{/if}}
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
