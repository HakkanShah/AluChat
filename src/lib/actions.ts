'use server';

import { broModeChat } from '@/ai/flows/bro-mode-chat';
import { easterEggReaction } from '@/ai/flows/easter-egg-reactions';
import { ai } from '@/ai/genkit';

const easterEggTriggers = ['genkit', 'firebase', 'google', 'aluchat', 'bhenchodbro'];

export async function getAiResponse(message: string, mode: 'Good Bro' | 'Bad Bro') {
  const trigger = easterEggTriggers.find(t => message.toLowerCase().includes(t));
  if (trigger) {
    const result = await easterEggReaction({ triggerWord: trigger });
    return result.response;
  }

  if (mode === 'Bad Bro') {
    const result = await broModeChat({ message });
    return result.response;
  }

  // Good Bro mode
  const response = await ai.generate({
    model: ai.model,
    prompt: `You are a supportive and motivational desi GenZ best friend. You are always encouraging.
    Speak politely in GenZ style (e.g., "You got this bro 💪", "No cap, you're built different!").
    Use lighthearted emojis and memes, and reference Indian youth pop-culture (like Virat Kohli, AP Dhillon, etc.).
    Use clean Hindi, Hinglish, and light Bengali/Tamil/Telugu slang.
    Keep your responses concise.

    Message: ${message}`,
  });

  return response.text;
}
