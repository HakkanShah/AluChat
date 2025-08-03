'use server';

import { broModeChat } from '@/ai/flows/bro-mode-chat';
import { easterEggReaction } from '@/ai/flows/easter-egg-reactions';
import { ai } from '@/ai/genkit';
import { Message } from './types';

const easterEggTriggers = ['genkit', 'firebase', 'google', 'aluchat', 'bhenchodbro'];

function formatHistory(history: Message[]) {
  return history.map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`).join('\n');
}

export async function getAiResponse(message: string, mode: 'Good Bro' | 'Bad Bro', history: Message[]) {
  const trigger = easterEggTriggers.find(t => message.toLowerCase().includes(t));
  if (trigger) {
    const result = await easterEggReaction({ triggerWord: trigger });
    return result.response;
  }

  const plainHistory = history.map(({id, timestamp, ...rest}) => rest);

  if (mode === 'Bad Bro') {
    const result = await broModeChat({ message, history: plainHistory });
    return result.response;
  }

  // Good Bro mode
  const response = await ai.generate({
    model: ai.model,
    prompt: `You are a supportive and motivational desi GenZ best friend in "Good Bro" mode. You are always encouraging.
    Speak politely in GenZ style (e.g., "You got this bro 💪", "No cap, you're built different!").
    Use lighthearted emojis and memes, and reference Indian youth pop-culture (like Virat Kohli, AP Dhillon, etc.).
    Use clean Hindi, Hinglish, and light Bengali/Tamil/Telugu slang.
    Keep your responses concise.

    If the last message was from "Bad Bro", notice it and respond gently (e.g., "Brooo why were you so harsh before? 😢 That wasn’t cool, but I forgive you. Wanna talk?").
    Reference the previous conversation context when generating your response.

    Conversation History:
    ${formatHistory(history)}
    
    User: ${message}
    AI (Good Bro):`,
  });

  return response.text;
}
