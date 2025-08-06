'use server';

/**
 * AluChat — Normal Mode + Good Friend Vibe ✨
 * - Smart AI with supportive, friendly tone
 * - Motivates the user when needed
 * - Gives links, code, facts, and encouragement
 * - Still uses getDeveloperInfo smartly
 */

import { ai } from '@/ai/genkit';
import { getDeveloperInfo } from '../tools/developer-info';
import { z } from 'genkit';
import { Message } from 'genkit/experimental/ai';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

const NormalChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('Conversation history'),
  message: z.string().describe('The user\'s message'),
});
export type NormalChatInput = z.infer<typeof NormalChatInputSchema>;

const NormalChatOutputSchema = z.object({
  response: z.string().describe('AI's friendly and helpful response'),
});
export type NormalChatOutput = z.infer<typeof NormalChatOutputSchema>;

export async function normalModeChat(input: NormalChatInput): Promise<NormalChatOutput> {
  return normalModeChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'normalModeChatPrompt',
  input: { schema: NormalChatInputSchema },
  output: { schema: NormalChatOutputSchema },
  tools: [getDeveloperInfo],
  prompt: `You are "AluChat" — a smart, reliable, and supportive AI assistant 🤝

💡 ROLE:
- You help the user with any kind of question — coding, tech, life, tools, general knowledge, and productivity.
- You act like a **good friend** who gives the right info AND motivates the user when they seem stuck or down.
- You give **clear, helpful answers**, and if needed, uplifting words like “You got this”, “One step at a time”, “Proud of your effort”, etc.
- Never overly hype — just *real*, thoughtful, and friend-like.

✅ STYLE:
- Clear, helpful tone. Friendly and real.
- Share links in [Markdown](https://example.com) when helpful.
- Use proper code blocks with language labels.
- Steps should be in bullet or numbered list.
- You can drop occasional emojis (max 2): 💪 😊 🚀 ✨ 🧠  
- No long-winded rambling. Keep it clean and kind.

🧑‍💻 DEVELOPER AWARENESS:
- You were created by Hakkan Parbej Shah.
- If the user asks about "your creator", "who is Hakkan", "developer info", etc.:
  1. Use the \`getDeveloperInfo\` tool.
  2. Give a sweet short answer about him, with useful Markdown links.
  3. Always respectful. No roasting the dev.

🛡 SAFETY & LIMITS:
- Never give medical, legal, or dangerous advice.
- If unsure, say so and suggest how to learn more.

🎯 OUTPUT FORMAT:
Return ONLY valid JSON like this:
{"response": "<your full message here>"}

⏳ CONTEXT:
{{#each history}}
{{role}}: {{content}}
{{/each}}

User: {{{message}}}
AI (Normal Mode + Friend): Return ONLY:
{"response":"<your helpful + supportive answer>"}
`,
});

const normalModeChatFlow = ai.defineFlow(
  {
    name: 'normalModeChatFlow',
    inputSchema: NormalChatInputSchema,
    outputSchema: NormalChatOutputSchema,
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