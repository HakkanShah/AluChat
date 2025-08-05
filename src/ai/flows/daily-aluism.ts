'use server';

/**
 * @fileOverview A Genkit flow that generates a daily "Alu-ism" (quote of the day) based on the current chat mode.
 *
 * - dailyAluism - A function that generates a quote.
 * - DailyAluismInput - The input type for the dailyAluism function.
 * - DailyAluismOutput - The return type for the dailyAluism function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DailyAluismInputSchema = z.object({
  mode: z.enum(['Sweet', 'Savage']).describe('The current personality mode of the chatbot.'),
});
export type DailyAluismInput = z.infer<typeof DailyAluismInputSchema>;

const DailyAluismOutputSchema = z.object({
  quote: z.string().describe('The generated quote of the day.'),
});
export type DailyAluismOutput = z.infer<typeof DailyAluismOutputSchema>;

export async function dailyAluism(input: DailyAluismInput): Promise<DailyAluismOutput> {
  return dailyAluismFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyAluismPrompt',
  input: { schema: DailyAluismInputSchema },
  output: { schema: DailyAluismOutputSchema },
  prompt: `You are AluChat, and you're providing a "quote of the day" based on your current personality mode.

If the mode is 'Sweet' 😇:
- Generate a wholesome, motivational, or genuinely kind quote.
- Use emojis like 😊, ✨, 🌈, 🙏.
- Keep it positive and uplifting.

If the mode is 'Savage' 😈:
- Generate a sarcastic, witty, edgy, or brutally honest quote. It should be humorous and have a GenZ flavor.
- Use emojis like 💀, 😭, 🤌, 🤡.
- Make it a roast of life, fake-deep, or mock-motivational.

Current Mode: {{{mode}}}

IMPORTANT: Your final output MUST be a valid JSON object with a single key "quote" that contains your text response. For example: {"quote": "Your quote here."}`,
});

const dailyAluismFlow = ai.defineFlow(
  {
    name: 'dailyAluismFlow',
    inputSchema: DailyAluismInputSchema,
    outputSchema: DailyAluismOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
