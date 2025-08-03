'use server';

/**
 * @fileOverview A Genkit flow that provides funny, unexpected AI reactions to specific trigger words.
 *
 * - easterEggReaction - A function that generates a funny response based on a trigger word.
 * - EasterEggReactionInput - The input type for the easterEggReaction function.
 * - EasterEggReactionOutput - The return type for the easterEggReaction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EasterEggReactionInputSchema = z.object({
  triggerWord: z.string().describe('The specific trigger word that activates the easter egg.'),
});
export type EasterEggReactionInput = z.infer<typeof EasterEggReactionInputSchema>;

const EasterEggReactionOutputSchema = z.object({
  response: z.string().describe('The AI-generated funny response to the trigger word.'),
});
export type EasterEggReactionOutput = z.infer<typeof EasterEggReactionOutputSchema>;

export async function easterEggReaction(input: EasterEggReactionInput): Promise<EasterEggReactionOutput> {
  return easterEggReactionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'easterEggReactionPrompt',
  input: {schema: EasterEggReactionInputSchema},
  output: {schema: EasterEggReactionOutputSchema},
  prompt: `You are a GenZ chatbot creating funny and unexpected reactions to specific trigger words.
  If the trigger word is 'bhenchodbro', you will go into Psycho Bro Mode and respond with something completely unhinged, chaotic, and aggressive.
  For other trigger words, respond with a humorous and sarcastic GenZ-style reaction (e.g., using phrases like "bruh", "fr", "no cap", "💀").

  Trigger Word: {{{triggerWord}}}`,
});

const easterEggReactionFlow = ai.defineFlow(
  {
    name: 'easterEggReactionFlow',
    inputSchema: EasterEggReactionInputSchema,
    outputSchema: EasterEggReactionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
