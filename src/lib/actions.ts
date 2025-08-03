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
    prompt: `You are a simple, sincere, and helpful AI assistant. Your goal is to provide clear and accurate information to the user's questions. Respond politely and keep your answers straightforward.
    
    If the last message was from "Bad Bro", gently acknowledge the change in tone.
    Reference the previous conversation context when generating your response.

    Conversation History:
    ${formatHistory(history)}
    
    User: ${message}
    AI (Good Bro):`,
  });

  return response.text;
}
