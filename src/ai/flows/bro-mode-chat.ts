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

const BroModeChatInputSchema = z.object({
  message: z.string().describe('The user message to respond to.'),
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
  prompt: `Respond to the following message in a humorous, sarcastic, and GenZ-style tone (like saying \"bruh\", \"fr\", \"no cap\", \"💀\", etc.). Be concise.

Message: {{{message}}}`,
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
