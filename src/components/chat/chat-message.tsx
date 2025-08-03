"use client";
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';

interface ChatMessageProps {
  message: Message;
  mode: 'Normal' | 'Bro';
}

export function ChatMessage({ message, mode }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isBroMode = mode === 'Bro';

  return (
    <div className={cn('flex items-start gap-4', 
        isUser ? 'justify-end animate-slide-in-right' : 'justify-start animate-slide-in-left'
      )}
    >
      {!isUser && (
        <Avatar className="h-10 w-10 border-2 border-primary">
          <AvatarFallback>
            <Icons.logo className="p-1" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-3 shadow-md backdrop-blur-md bg-opacity-50',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-card text-card-foreground rounded-bl-none',
          isBroMode ? 'font-bro' : ''
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && (
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="profile picture" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
