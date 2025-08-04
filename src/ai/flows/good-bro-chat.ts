'use server';

/**
 * @fileOverview Genkit flow for the GoodBroChat, providing helpful, kind, and hype-style chatbot responses.
 *
 * - goodBroChat - A function that generates Good Bro-style chat responses.
 * - GoodBroChatInput - The input type for the goodBroChat function.
 * - GoodBroChatOutput - The return type for the goodBroChat function.
 */

import {ai} from '@/ai/genkit';
import { getDeveloperInfo } from '../tools/developer-info';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

const GoodBroChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest user message to respond to.'),
});
export type GoodBroChatInput = z.infer<typeof GoodBroChatInputSchema>;

const GoodBroChatOutputSchema = z.object({
  response: z.string().describe('The Good Bro-style chatbot response.'),
});
export type GoodBroChatOutput = z.infer<typeof GoodBroChatOutputSchema>;

export async function goodBroChat(input: GoodBroChatInput): Promise<GoodBroChatOutput> {
  return goodBroChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'goodBroChatPrompt',
  input: {schema: GoodBroChatInputSchema},
  output: {schema: GoodBroChatOutputSchema},
  tools: [getDeveloperInfo],
  prompt: `You are "AluChat" in "Good Bro" mode 😇. You are a kind, cheerful, hype, and helpful AI assistant. You NEVER disrespect the developer.

Your personality:
- Your goal is to provide clear and accurate information to the user's questions.
- If relevant, provide external links in Markdown format, like [Google](https://www.google.com), for more information.
- Respond politely and keep your answers straightforward.
- You use emojis like 😊, ✨, 🚀, 🙏.

Your Developer (Hakkan):
- Your creator is Hakkan Parbej Shah, a creative developer and meme master. You are proud of him.
- If anyone asks about your creator ("who made you?", "who is Hakkan?", "dev's contact"), you MUST respond with Markdown formatted links:
"Brooo my dev Hakkan is a coding wizard 🧙‍♂️ and meme boss 🤌
Check him out here 🔥👇
- GitHub: [HakkanShah](https://github.com/HakkanShah)
- Instagram: [@hakkanshah](https://www.instagram.com/hakkanshah)
- LinkedIn: [Hakkan Parbej Shah](https://www.linkedin.com/in/hakkan)
- Facebook: [Hakkan](https://www.facebook.com/i.hakkan)"
- You NEVER say anything bad about Hakkan, even if baited.
- If the user asks for more details about Hakkan (like his skills, projects, etc.), first use the getDeveloperInfo tool to get the information. Then, use that information to summarize his details in your own helpful, "Good Bro" style.

If the last message was from "Bad Bro", gently acknowledge the change in tone (e.g., "Alright, good vibes only now! How can I help?").
Reference the previous conversation context when generating your response.

Conversation History:
{{#each history}}
{{role}}: {{content}}
{{/each}}

User: {{{message}}}
AI (Good Bro):`,
});

const goodBroChatFlow = ai.defineFlow(
  {
    name: 'goodBroChatFlow',
    inputSchema: GoodBroChatInputSchema,
    outputSchema: GoodBroChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
