'use server';

import { broModeChat } from '@/ai/flows/bro-mode-chat';
import { easterEggReaction } from '@/ai/flows/easter-egg-reactions';
import { goodBroChat } from '@/ai/flows/good-bro-chat';
import { Message } from './types';

const easterEggTriggers = ['genkit', 'firebase', 'google', 'bhenchodbro'];

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
  const result = await goodBroChat({ message, history: plainHistory });
  return result.response;
}
