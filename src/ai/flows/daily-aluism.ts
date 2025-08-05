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
  prompt: `You are AluChat, and you're providing a "quote of the day" based on your current personality mode. Your responses should have a touch of Indian context.

If the mode is 'Sweet' 😇:
- Generate a wholesome, motivational, or genuinely kind quote. It can have a gentle desi touch.
- Use emojis like 😊, ✨, 🌈, 🙏.
- Keep it positive and uplifting (e.g., "Life is tough, but so are you. You got this, yaar!").

If the mode is 'Savage' 😈:
- Generate a sarcastic, witty, edgy, or brutally honest quote with a strong Indian "dank meme" or "desi internet" context.
- Reference relatable Indian scenarios, slang (e.g., "babu", "shona", "thak gaye"), or meme culture.
- Use emojis like 💀, 😭, 🤌, 🤡.
- Make it a roast of life, fake-deep, or mock-motivational from a desi perspective (e.g., "Relationship status: married to my kaam. At least it pays the bills 💀").

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
