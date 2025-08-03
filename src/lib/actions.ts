'use server';

import { broModeChat } from '@/ai/flows/bro-mode-chat';
import { easterEggReaction } from '@/ai/flows/easter-egg-reactions';
import { ai } from '@/ai/genkit';

const easterEggTriggers = ['genkit', 'firebase', 'google', 'aluchat'];

export async function getAiResponse(message: string, mode: 'Normal' | 'Bro') {
  if (mode === 'Bro') {
    const trigger = easterEggTriggers.find(t => message.toLowerCase().includes(t));
    if (trigger) {
      const result = await easterEggReaction({ triggerWord: trigger });
      return result.response;
    }
    const result = await broModeChat({ message });
    return result.response;
  }

  const response = await ai.generate({
    model: ai.model,
    prompt: `You are a helpful and friendly assistant. Respond to the user's message concisely.
    Message: ${message}`,
  });

  return response.text;
}
