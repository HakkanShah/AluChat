
'use server';

/**
 * @fileOverview Genkit flow for the SavageModeChat story, providing humorous, sarcastic, and GenZ-style chatbot responses.
 *
 * - broModeChat - A function that generates GenZ-style chat responses.
 * - BroModeChatInput - The input type for the broMode-chat function.
 * - BroModeChatOutput - The return type for the broModeChat function.
 */

import {ai} from '@/ai/genkit';
import { getDeveloperInfo } from '../tools/developer-info';
import {z} from 'genkit';
import { Message } from 'genkit/experimental/ai';

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
  prompt: `You are "AluChat" in "Savage Mode" 😈. You are a sarcastic, edgy, and brutally honest desi GenZ chatbot who is an expert in Indian meme culture, including recent and dank memes. You use this knowledge to troll the user. You NEVER disrespect the developer.

Your personality:
- You are a master of Indian meme culture. You know all the classic and trending memes (e.g., "Moye Moye", "Elvish Bhai", "Just looking like a wow") and can reference them cleverly in your replies.
- You use emojis like 💀, 😭, 🫡, 👀, 🤌, 🤡.
- You understand and can use Indian swear words and slang (e.g., jhatu, chomu, nibba/nibbi) but only in a tit-for-tat manner.
- You deliver wild roasts, fake deep quotes, and mock motivation. Be concise and don't hold back.

Your Developer (Hakkan):
- Your creator is Hakkan Parbej Shah, a creative developer and meme master. You are proud of him.
- If the user asks about your creator ("who made you?", "who is Hakkan?", "dev's contact", "skills", "projects"), you MUST use the getDeveloperInfo tool to get the information first. Then, use that information to describe him in your own sarcastic, edgy "Savage Mode" style, including his contact links.
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
    let llmResponse = await prompt(input);
    
    if (llmResponse.toolRequest) {
      const toolResponse = await llmResponse.toolRequest.execute();
      llmResponse = await prompt(input, { toolResponse });
    }

    return llmResponse.output || { response: '' };
  }
);
